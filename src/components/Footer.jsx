export default function Footer() {
  return (
    <footer className="border-t border-mist/40 dark:border-white/5">
      <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
        <p className="font-mono text-xs text-stone/40">
          Ahmad Haidar Albaqir · {new Date().getFullYear()}
        </p>
        <p className="font-mono text-xs text-stone/30">Jakarta, WIB UTC+7</p>
      </div>
    </footer>
  )
}
