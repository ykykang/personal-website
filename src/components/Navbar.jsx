import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Moon, Sun, Menu, X } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar({ dark, setDark }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-chalk/90 dark:bg-ink/90 backdrop-blur-md border-b border-mist/40 dark:border-white/5'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          className="font-display text-lg tracking-tight text-ink dark:text-chalk hover:opacity-70 transition-opacity"
        >
          AH<span className="text-stone">.</span>
        </NavLink>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `font-body text-sm tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'text-ink dark:text-chalk'
                      : 'text-stone hover:text-ink dark:hover:text-chalk'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Dark Mode + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full text-stone hover:text-ink dark:hover:text-chalk transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-stone hover:text-ink dark:hover:text-chalk transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-chalk dark:bg-ink border-t border-mist/30 dark:border-white/5 px-6 py-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `font-body text-sm block transition-colors ${
                      isActive ? 'text-ink dark:text-chalk' : 'text-stone'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
