---
title: Otomasi Pencatatan Keuangan dari Email BCA ke Notion dengan Google Apps Script dan Claude AI
excerpt: Bangun sistem pencatatan keuangan otomatis yang membaca email notifikasi BCA, mengkategorisasikannya pakai AI, dan menyimpannya ke Notion — lengkap dengan laporan bulanan dan tracking saldo akun.
category: finance
date: Jun 1, 2026
readTime: 12 min read
slug: otomasi-bca-notion-apps-script
featured: true 
---

# Otomasi Pencatatan Keuangan dari Email BCA ke Notion dengan Google Apps Script dan Claude AI

> Capek catat pengeluaran manual? Artikel ini membahas cara membangun sistem pencatatan keuangan otomatis yang membaca email notifikasi transaksi BCA, mengkategorisasikannya pakai AI, dan menyimpannya ke Notion — lengkap dengan laporan bulanan dan tracking saldo akun.

---

## Latar Belakang

Setiap kali transaksi lewat myBCA, BCA selalu kirim email notifikasi ke Gmail. Email itu berisi semua informasi yang dibutuhkan: tanggal, nominal, nama merchant, dan nomor referensi. Masalahnya, informasi ini terpendam di inbox dan tidak pernah dipakai untuk apapun.

Dari situ muncul ide: bagaimana kalau email-email ini otomatis terbaca, datanya diekstrak, dikategorisasi, lalu disimpan ke Notion sebagai catatan keuangan?

Hasilnya adalah sistem yang sepenuhnya otomatis — tanpa perlu input manual, tanpa perlu buka aplikasi khusus. Cukup bertransaksi seperti biasa, semua tercatat sendiri.

---

## Apa yang Dibangun

Sistem ini terdiri dari beberapa komponen yang bekerja bersama:

```
Email BCA masuk ke Gmail
        ↓
Google Apps Script (jalan tiap 15 menit)
        ↓
Ekstrak data: tanggal, nominal, merchant
        ↓
Cek cache merchant
  ├── Cache HIT  → pakai hasil cache (gratis)
  └── Cache MISS → Claude Haiku API
                       ↓
                  Tentukan budget, kategori,
                  dan deskripsi yang readable
        ↓
Simpan ke Notion Database
        ↓
Mark email as read
```

Di Notion, setiap transaksi tersimpan dengan:
- **Nama** yang readable ("Makan di Marugame" bukan "MARUGAME UDON MALL XYZ 12345")
- **Budget** — Need, Social, Goal, atau Saving
- **Kategori** — Makanan & Minuman, Transportasi, Belanja, dll
- **Relasi ke akun** — BCA, GoPay, ShopeePay, dll
- **Merchant asli** tersimpan di body halaman sebagai referensi

Setiap tanggal 1, laporan bulanan otomatis dibuat di Notion:

```
📊 Laporan Mei 2026
💼 Total Income (dari April): Rp 14.442.956

💰 Budget
Need   (50%)  → Rp 1.250.000 / Rp 7.221.478  ✅
Social (2.5%) → Rp   620.000 / Rp   361.074  ⚠️ OVER
Goal   (2.5%) → Rp   349.000 / Rp   361.074  ✅
Saving (45%)  → Rp 20.000.000 / Rp 6.499.330 ✅ OVER TARGET

🗂️ Kategori
Makanan & Minuman    → Rp 750.000
Transportasi         → Rp 200.000
Belanja              → Rp 500.000
Tagihan & Utilitas   → Rp 450.000

📈 Ringkasan
Total Keluar → Rp 2.219.000 / Rp 7.582.552  ✅
Sisa Budget  → Rp 5.363.552
```

---

## Komponen yang Dibutuhkan

Sebelum mulai, pastikan sudah punya:

| Komponen | Keterangan | Biaya |
|---|---|---|
| Akun Google (Gmail) | Untuk baca email BCA | Gratis |
| Akun Notion | Sebagai database | Gratis |
| Google Apps Script | Untuk menjalankan script | Gratis |
| Anthropic API | Untuk kategorisasi AI | ~$0.00006/transaksi |

Untuk Anthropic API, top up minimum $5 sudah cukup untuk puluhan ribu transaksi. Dengan sistem cache, merchant yang sama tidak akan di-charge ulang.

---

## Setup Notion

### Database yang Dibutuhkan

Buat empat database di Notion dengan nama persis seperti berikut (nama ini penting karena script akan mencarinya otomatis):

**1. Transactions**

| Kolom | Tipe |
|---|---|
| Name | Title |
| Transaction Date | Date |
| Amount | Number |
| Transaction Type | Select (`Expense` / `Transfer`) |
| Budget | Select |
| Kategori | Select |
| Nomor Referensi | Text |
| Account | Relation → Accounts |
| Transfer Source | Relation → Accounts |
| Transfer Destination | Relation → Accounts |

**2. Accounts**

| Kolom | Tipe |
|---|---|
| Name | Title |
| Type | Select |
| Initial Balance | Number |
| Current Balance | Formula |
| $fromExpenses | Relation ← Transactions |
| $fromTransferSource | Relation ← Transactions |
| $fromTransferDestination | Relation ← Transactions |
| $fromIncome | Relation ← Income |
| Total Expenses | Rollup |
| Total Income | Rollup |
| Total Sent | Rollup |
| Total Received | Rollup |

Formula `Current Balance`:
```
prop("Initial Balance") + prop("Total Income") + prop("Total Received") - prop("Total Expenses") - prop("Total Sent")
```

**3. Income**

| Kolom | Tipe |
|---|---|
| Name | Title |
| Income Type | Select |
| Amount | Number |
| Date | Date |
| Account | Relation → Accounts |

**4. Halaman Laporan Bulanan**

Buat halaman kosong bernama `Laporan Bulanan`. Script akan otomatis isi dengan struktur `2026 → Mei 2026`.

### Isi Database Accounts

Tambahkan semua akun yang dimiliki:

| Name | Type |
|---|---|
| BCA | Checking Account |
| GoPay | Virtual Account |
| ShopeePay | Virtual Account |
| OVO | Virtual Account |
| DANA | Virtual Account |
| Bibit | Investment |
| Dana Liburan | Goal |
| Daniar Sri | Receivable |
| Tunai | Cash |
| ... | ... |

### Connect Notion Integration

1. Buka [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Buat integration baru, beri nama `BCA Tracker`
3. Copy **Internal Integration Token**
4. Connect integration ke semua database dan halaman di atas

---

## Setup Google Apps Script

1. Buka [script.google.com](https://script.google.com)
2. Buat project baru
3. Hapus semua kode yang ada
4. Paste script (lihat bagian [Script Lengkap](#script-lengkap))
5. Isi bagian konfigurasi:

```js
const NOTION_TOKEN      = 'secret_xxx...'; // dari Notion Integration
const ANTHROPIC_API_KEY = 'sk-ant-xxx...'; // dari console.anthropic.com
```

Hanya dua baris itu yang perlu diisi. Semua database ID, account ID, dan konfigurasi lainnya akan ditemukan otomatis oleh script.

---

## Cara Kerja Detail

### Ekstraksi Data Email

Email notifikasi BCA hadir dalam beberapa format tergantung jenis transaksi:

**QRIS:**
```
Pembayaran Ke     : MARUGAME UDON MALL
Total Bayar       : IDR 151,000.00
Tanggal Transaksi : 29 Mei 2026 12:30:00
Nomor Referensi   : 9527120260529...
```

**Transfer:**
```
Nama Penerima     : DANIAR SRI WULANDARI
Nominal Tujuan    : IDR 65,000.00
Tanggal Transaksi : 20 Mei 2026 14:24:06
```

**Virtual Account / Top Up:**
```
Nama Perusahaan/Produk : PT DOMPET ANAK BANGSA / GOPAY TOPUP
Total Bayar            : IDR 200,000.00
```

Script menggunakan regex untuk mengekstrak semua field ini tanpa perlu AI — lebih cepat dan gratis.

### Deteksi Transfer E-Wallet

Top up e-wallet otomatis terdeteksi sebagai `Transfer`, bukan `Expense`. Script punya mapping merchant ke akun tujuan:

```
PT DOMPET ANAK BANGSA / GOPAY TOPUP     → GoPay
PT AIRPAY INTERNATIONAL INDONE / SHOPEEPAY → ShopeePay
PT VISIONET INTERNASIONAL / OVO          → OVO
PT ESPAY DEBIT INDONESIA KOE / DANA      → DANA
```

Jadi top up GoPay Rp200.000 akan tercatat sebagai transfer dari BCA ke GoPay, dan saldo keduanya terupdate otomatis.

### Kategorisasi AI dengan Cache

Untuk setiap transaksi baru, script mengirim nama merchant ke Claude Haiku dengan prompt yang berisi aturan kategorisasi dan contoh-contoh spesifik. Claude akan mengembalikan tiga hal:

1. **Budget** — Need / Social / Goal / Saving
2. **Kategori** — Makanan & Minuman / Transportasi / dll
3. **Deskripsi** — teks yang mudah dibaca manusia

Hasilnya di-cache berdasarkan nama merchant. Transaksi INDOMARET kedua, ketiga, dan seterusnya tidak akan hit API — langsung ambil dari cache. Ini membuat biaya API sangat efisien.

### Sistem Budget

Budget dihitung berdasarkan persentase income bulan sebelumnya:

| Budget | Persentase | Deskripsi |
|---|---|---|
| Need | 50% | Kebutuhan primer |
| Saving | 45% | Tabungan & investasi |
| Social | 2.5% | Pengeluaran sosial |
| Goal | 2.5% | Pembelian jangka panjang |

Logika waktu: gaji masuk tanggal 25 April → digunakan sebagai dasar budget Mei. Ini mengikuti siklus keuangan yang lebih realistis dibanding menggunakan income bulan yang sama.

### Auto-Discovery Database

Script tidak memerlukan hardcode database ID. Saat pertama kali jalan, script akan mencari semua database dan halaman yang sudah di-connect ke integration, lalu menyimpan hasilnya ke cache. Jika nama database di Notion berubah atau ada database baru, cukup jalankan `resetDbCache()`.

---

## Menjalankan Script

### Pertama Kali

Jalankan fungsi-fungsi ini secara berurutan di Apps Script:

```
1. debugDiscovery()     → verifikasi semua database ditemukan
2. resetAll()           → bersihkan semua cache
3. checkExpenseEmails() → sync email pertama kali
```

### Setup Trigger Otomatis

Di Apps Script, buka menu **Triggers** dan buat tiga trigger:

| Fungsi | Jadwal |
|---|---|
| `checkExpenseEmails` | Setiap 15 menit |
| `generateLaporanBulanan` | Tanggal 1 setiap bulan |

### Fungsi Maintenance

| Fungsi | Kapan Dijalankan |
|---|---|
| `resetAll()` | Reset semua cache dari awal |
| `resetAccountCache()` | Setelah tambah akun baru di Notion |
| `resetMerchantCache()` | Kalau kategorisasi AI perlu diperbaharui |
| `resetDbCache()` | Setelah rename database di Notion |
| `resetPageCache()` | Setelah hapus halaman laporan di Notion |

---

## Mengelola Goal dan Piutang

### Goal Finansial

Buat akun baru di database Accounts dengan tipe `Goal`:

```
Dana Liburan Jepang  | Goal | Target: Rp 15.000.000
Dana Laptop Baru     | Goal | Target: Rp 8.000.000
```

Setiap transfer ke akun Goal akan menambah saldonya secara otomatis via Rollup. Tambahkan kolom `Target Amount` (Number) dan formula `Progress`:

```
round(prop("Current Balance") / prop("Target Amount") * 100) & "%"
```

### Piutang

Buat akun baru dengan tipe `Receivable` untuk setiap orang yang punya hutang:

```
Daniar Sri | Receivable
Aldi       | Receivable
```

Transfer ke akun Receivable = uang keluar (piutang bertambah). Transfer dari akun Receivable = uang balik (piutang berkurang). Saldo 0 artinya sudah lunas.

---

## Estimasi Biaya

Dengan Anthropic Claude Haiku:

| Kondisi | Biaya |
|---|---|
| Transaksi merchant baru | ~$0.00006 per transaksi |
| Transaksi merchant yang sudah di-cache | $0 |
| 1000 transaksi (campuran) | ~$0.03 |
| Top up $5 | Cukup untuk >80.000 transaksi baru |

Semakin lama sistem berjalan, semakin banyak merchant yang ter-cache, semakin kecil biaya API-nya.

---

## Keterbatasan

Beberapa hal yang perlu diketahui:

- **Hanya BCA** — sistem ini dirancang khusus untuk email notifikasi BCA (myBCA). Bank lain memiliki format email yang berbeda dan perlu parser tersendiri.
- **Gmail saja** — email harus masuk ke Gmail. Jika menggunakan provider email lain, perlu penyesuaian.
- **Transaksi tunai tidak tercatat** — sistem hanya bisa membaca transaksi digital yang menghasilkan notifikasi email.
- **Kategorisasi AI tidak 100% akurat** — terutama untuk merchant yang ambigu. Selalu bisa di-override manual di Notion.
- **Lookback 30 hari** — secara default script hanya memproses email 30 hari terakhir. Bisa diubah via konstanta `LOOKBACK_DAYS`.

---

## Tips Penggunaan

**Tambah merchant ke prompt AI** — kalau ada merchant yang sering salah dikategorisasi, tambahkan sebagai contoh di prompt Claude. Contoh: `WARTEG BAHARI => Need, Makanan & Minuman, "Makan di Warteg"`.

**Reset cache setelah update prompt** — jalankan `resetMerchantCache()` supaya semua merchant dikategorisasi ulang dengan prompt yang baru.

**Isi Saldo Awal akun** — untuk akun yang sudah punya saldo sebelum sistem ini dipasang, isi kolom `Initial Balance` di database Accounts.

**Input income rutin** — sistem laporan bulanan bergantung pada data di database Income. Pastikan income setiap bulan selalu diinput agar budget terhitung dengan benar.

---

## Penutup

Sistem ini dibangun untuk menyelesaikan masalah yang sangat spesifik: terlalu malas catat keuangan manual tapi tetap ingin tahu kemana uang pergi. Dengan memanfaatkan infrastruktur yang sudah ada — Gmail, Notion, dan Google Apps Script — biaya operasional hampir nol.

Yang menarik dari pendekatan ini adalah kombinasi antara regex (untuk ekstraksi data yang deterministik) dan AI (untuk kategorisasi yang fleksibel). Regex tidak salah untuk field yang formatnya konsisten seperti tanggal dan nominal. AI dipakai hanya untuk hal yang memang membutuhkan pemahaman konteks — yaitu menentukan apakah "INDOMARET D 12345" itu belanja kebutuhan atau bukan.

Sistem ini masih bisa dikembangkan lebih jauh: support bank lain, notifikasi over budget via email/Telegram, dashboard visual, atau bahkan mobile app. Tapi untuk kebutuhan sehari-hari, yang ada sekarang sudah lebih dari cukup.

---

*Script lengkap dan panduan instalasi tersedia di [GitHub](#).*