import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-mist/40 dark:border-white/5 mt-32">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-body text-sm text-stone">
          © {new Date().getFullYear()} Ahmad Haidar Albaqir
        </p>
        <p className="font-mono text-xs text-mist dark:text-stone/50">
          Built with React + Tailwind
        </p>
      </div>
    </footer>
  )
}
