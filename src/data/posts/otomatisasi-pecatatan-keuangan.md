---
title: Otomasi Pencatatan Keuangan dari Email BCA ke Notion dengan Google Apps Script dan Claude AI
excerpt: Bangun sistem pencatatan keuangan otomatis yang membaca email notifikasi BCA, mengkategorisasikannya pakai AI, dan menyimpannya ke Notion — lengkap dengan laporan bulanan dan tracking saldo akun.
category: finance
date: Jun 1, 2026
readTime: 12 min read
slug: otomasi-bca-notion-apps-script
featured: false
---

# Otomasi Pencatatan Keuangan dari Email BCA ke Notion dengan Google Apps Script dan Claude AI

> Capek catat pengeluaran manual? Gue juga. Makanya gue bikin sistem yang baca email notifikasi BCA, kategorisasi otomatis pakai AI, terus masukin ke Notion — semua tanpa input manual sama sekali.

---

## Awal Cerita

Jadi gini, setiap kali transaksi lewat myBCA, pasti ada email masuk ke Gmail. Isinya lengkap — tanggal, nominal, nama merchant, nomor referensi. Tapi email-email itu cuma numpuk di inbox, nggak kepake buat apa-apa.

Dari situ gue mikir: *gimana kalau email ini otomatis kebaca, datanya keambil, terus masuk ke Notion sebagai catatan keuangan?*

Setelah beberapa waktu ngulik, jadilah sistem yang sekarang jalan otomatis. Tinggal transaksi seperti biasa, semua kecatat sendiri. Nggak perlu buka aplikasi, nggak perlu input manual.

---

## Kira-kira Sistem Ini Ngapain?

Alurnya simpel:

```
Email BCA masuk ke Gmail
        ↓
Google Apps Script jalan tiap 15 menit
        ↓
Ambil data: tanggal, nominal, merchant
        ↓
Cek cache merchant
  ├── Udah pernah → pakai hasil cache (gratis!)
  └── Belum pernah → tanya Claude AI
                         ↓
                    Dapat budget, kategori,
                    dan nama yang lebih enak dibaca
        ↓
Simpan ke Notion
        ↓
Email di-mark as read
```

Setiap transaksi masuk ke Notion dengan info:
- **Nama** yang readable — "Makan di Marugame" bukan "MARUGAME UDON MALL XYZ 12345"
- **Budget** — Need, Social, Goal, atau Saving
- **Kategori** — Makanan & Minuman, Transportasi, Belanja, dll
- **Akun sumber** — BCA, GoPay, ShopeePay, dll
- **Nama merchant asli** — tersimpan di body halaman sebagai referensi

Dan tiap tanggal 1, laporan bulanan otomatis muncul di Notion:

```
📊 Laporan Mei 2026
💼 Total Income (dari April): Rp 14.442.956

💰 Budget
Need   (50%)  → Rp 1.250.000 / Rp 7.221.478  ✅
Social (2.5%) → Rp   620.000 / Rp   361.074  ⚠️ OVER
Goal   (2.5%) → Rp   349.000 / Rp   361.074  ✅
Saving (45%)  → Rp 20.000.000 / Rp 6.499.330 ✅ OVER TARGET

🗂️ Kategori
Makanan & Minuman  → Rp 750.000
Transportasi       → Rp 200.000
Belanja            → Rp 500.000
Tagihan & Utilitas → Rp 450.000

📈 Ringkasan
Total Keluar → Rp 2.219.000 / Rp 7.582.552  ✅
Sisa Budget  → Rp 5.363.552
```

---

## Yang Perlu Disiapkan

Nggak banyak kok, dan hampir semuanya gratis:

| Yang dibutuhkan | Keterangan | Biaya |
|---|---|---|
| Akun Google (Gmail) | Buat baca email BCA | Gratis |
| Akun Notion | Database pencatatan | Gratis |
| Google Apps Script | Buat jalanin script | Gratis |
| Anthropic API | AI buat kategorisasi | ~$0.00006/transaksi |

Buat Anthropic API, top up $5 aja udah cukup buat puluhan ribu transaksi. Dan makin lama dipake, makin murah — karena merchant yang sama nggak di-charge ulang (udah ke-cache).

---

## Setup Notion

### Database yang Perlu Dibuat

Bikin empat database di Notion. Nama databasenya harus persis sama karena script bakal nyari otomatis berdasarkan nama.

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

Formula `Current Balance`-nya:
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

Bikin halaman kosong bernama `Laporan Bulanan`. Script yang bakal isi otomatis dengan struktur `2026 → Mei 2026`.

### Isi Database Accounts

Tambah semua akun yang kamu punya. Mau sebanyak apapun — BCA, e-wallet, investasi, sampai akun untuk nyimpen piutang juga bisa:

| Name | Type |
|---|---|
| BCA | Checking Account |
| GoPay | Virtual Account |
| ShopeePay | Virtual Account |
| OVO | Virtual Account |
| Bibit | Investment |
| Dana Liburan | Goal |
| Daniar Sri | Receivable |
| Tunai | Cash |

### Connect Notion Integration

1. Buka [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Bikin integration baru, kasih nama `BCA Tracker`
3. Copy **Internal Integration Token**
4. Connect integration ke semua database dan halaman di atas (klik `...` → `Connect to` di setiap database)

---

## Setup Google Apps Script

1. Buka [script.google.com](https://script.google.com)
2. Bikin project baru
3. Hapus semua kode yang ada
4. Paste script dari GitHub (link di bawah)
5. Isi dua baris ini di bagian konfigurasi:

```js
const NOTION_TOKEN      = 'secret_xxx...'; // dari Notion Integration
const ANTHROPIC_API_KEY = 'sk-ant-xxx...'; // dari console.anthropic.com
```

Cuma dua baris itu. Database ID, account ID, semua ditemukan otomatis oleh script.

---

## Cara Kerjanya

### Baca Email BCA

Email BCA datang dalam beberapa format tergantung jenis transaksinya:

**QRIS:**
```
Pembayaran Ke     : MARUGAME UDON MALL
Total Bayar       : IDR 151,000.00
Tanggal Transaksi : 29 Mei 2026 12:30:00
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

Script pakai regex buat ekstrak semua field ini — nggak perlu AI, lebih cepat, dan gratis.

### Top Up E-Wallet Otomatis Jadi Transfer

Ini yang gue suka. Top up GoPay nggak dicatat sebagai pengeluaran, tapi sebagai **transfer dari BCA ke GoPay**. Saldo BCA berkurang, saldo GoPay bertambah. Script udah punya mapping-nya:

```
PT DOMPET ANAK BANGSA / GOPAY TOPUP      → GoPay
PT AIRPAY INTERNATIONAL INDONE / SHOPEEPAY → ShopeePay
PT VISIONET INTERNASIONAL / OVO           → OVO
PT ESPAY DEBIT INDONESIA KOE / DANA       → DANA
```

### AI yang Hemat Token

Setiap merchant baru, script nanya ke Claude Haiku buat dapet tiga hal:

1. **Budget** — Need / Social / Goal / Saving
2. **Kategori** — Makanan & Minuman / Transportasi / dll
3. **Deskripsi** — yang enak dibaca manusia

Hasilnya di-cache. Transaksi ke INDOMARET yang kedua, ketiga, dst — langsung dari cache, nggak kena charge API. Ini yang bikin biayanya super murah.

### Sistem Budget

Budget dihitung dari persentase income bulan sebelumnya:

| Budget | Persentase | Artinya |
|---|---|---|
| Need | 50% | Kebutuhan sehari-hari |
| Saving | 45% | Tabungan & investasi |
| Social | 2.5% | Jajan, nongkrong, hadiah |
| Goal | 2.5% | Beli barang mahal jangka panjang |

Kenapa pakai income bulan sebelumnya? Karena gaji biasanya masuk tanggal 25 — jadi gaji April jadi dasar budget Mei. Lebih realistis dibanding pakai income bulan yang sama.

---

## Jalankan Pertama Kali

Di Apps Script, jalankan fungsi-fungsi ini secara berurutan:

```
1. debugDiscovery()     → pastikan semua database ketemu
2. resetAll()           → bersihin semua cache
3. checkExpenseEmails() → sync email pertama kali
```

### Set Trigger Otomatis

Buka menu **Triggers** di Apps Script, bikin dua trigger:

| Fungsi | Jadwal |
|---|---|
| `checkExpenseEmails` | Setiap 15 menit |
| `generateLaporanBulanan` | Tanggal 1 tiap bulan |

### Fungsi Maintenance

Sesekali mungkin butuh ini:

| Fungsi | Kapan dipake |
|---|---|
| `resetAll()` | Reset semua cache dari awal |
| `resetAccountCache()` | Habis tambah akun baru di Notion |
| `resetMerchantCache()` | Mau update kategorisasi AI |
| `resetDbCache()` | Habis rename database di Notion |

---

## Goal dan Piutang

### Nabung untuk Goal Finansial

Bikin akun baru di Accounts dengan tipe `Goal`:

```
Dana Liburan Jepang | Goal
Dana Laptop Baru    | Goal
Dana DP Rumah       | Goal
```

Mau lihat progress? Tambah kolom `Target Amount` (Number) dan formula:

```
round(prop("Current Balance") / prop("Target Amount") * 100) & "%"
```

Setiap transfer ke akun Goal, saldonya otomatis bertambah.

### Catat Piutang

Bikin akun baru dengan tipe `Receivable` per orang:

```
Daniar Sri | Receivable
Aldi       | Receivable
```

Transfer ke akun Receivable = piutang bertambah. Transfer dari akun Receivable = dibayar balik. Saldo 0 = lunas. Simpel!

---

## Berapa Biayanya?

Dengan Claude Haiku (model paling murah dari Anthropic):

| Kondisi | Biaya |
|---|---|
| Merchant baru (belum di-cache) | ~$0.00006 per transaksi |
| Merchant yang udah di-cache | $0 |
| 1000 transaksi campuran | ~$0.03 |
| Top up $5 | Cukup >80.000 transaksi baru |

Makin lama dipake, makin murah. Cache merchant terus bertambah, API makin jarang dipanggil.

---

## Kekurangan yang Perlu Tahu

Sebelum nyoba, ada beberapa hal yang perlu diketahui:

- **Khusus BCA** — sistem ini cuma bisa baca format email notifikasi BCA. Bank lain punya format yang beda dan perlu parser sendiri.
- **Harus pakai Gmail** — kalau emailnya di provider lain, perlu penyesuaian.
- **Transaksi tunai nggak ke-record** — cuma transaksi digital yang ada email notifikasinya.
- **AI nggak 100% akurat** — terutama merchant yang namanya ambigu. Tapi bisa di-override manual di Notion kapanpun.
- **Default lookback 30 hari** — email lebih dari sebulan nggak diproses. Bisa diubah di konstanta `LOOKBACK_DAYS`.

---

## Tips Biar Makin Optimal

**Update prompt kalau ada merchant yang sering salah** — tinggal tambahin contoh di bagian prompt Claude. Misalnya: `WARTEG BAHARI => Need, Makanan & Minuman, "Makan di Warteg"`. Habis itu jalanin `resetMerchantCache()`.

**Isi Saldo Awal akun** — kalau akun udah punya saldo sebelum sistem ini dipasang, isi kolom `Initial Balance` di Accounts biar saldonya akurat.

**Input income rutin** — laporan bulanan butuh data di database Income. Pastikan income tiap bulan selalu diinput, minimal sekali sebulan habis gajian.

---

## Penutup

Sistem ini gue bangun buat nyelesain masalah yang sangat spesifik: males catat keuangan manual tapi tetap mau tahu kemana uang pergi.

Yang menarik dari pendekatan ini adalah kombinasi antara **regex** dan **AI**. Regex dipake buat hal yang formatnya konsisten seperti tanggal dan nominal — cepat, akurat, gratis. AI dipake cuma buat hal yang butuh pemahaman konteks, yaitu kategorisasi merchant. Dan dengan cache, AI makin jarang dipanggil seiring waktu.

Masih banyak yang bisa dikembangin: support bank lain, notifikasi over budget via Telegram, dashboard visual, atau mobile app. Tapi untuk kebutuhan sehari-hari, yang ada sekarang udah lebih dari cukup.

Kalau kamu nyoba implementasi ini dan nemuin masalah, feel free reach out!

---

*Script lengkap tersedia di [GitHub](#). Kalau ada pertanyaan atau improvement, open issue aja.*