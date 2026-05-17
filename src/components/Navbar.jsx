import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Moon, Sun, Menu, X } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
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
        <NavLink
          to="/"
          className="font-mono text-sm tracking-tight text-ink dark:text-chalk hover:text-stone transition-colors"
        >
          AH<span className="text-stone">.</span>
        </NavLink>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `font-mono text-xs tracking-wide transition-colors duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-ink dark:text-chalk'
                      : 'text-stone hover:text-ink dark:hover:text-chalk'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="w-1 h-1 rounded-full bg-accent inline-block" />
                    )}
                    {label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark(!dark)}
            className="p-1.5 text-stone hover:text-ink dark:hover:text-chalk transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-1.5 text-stone hover:text-ink dark:hover:text-chalk transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-chalk dark:bg-ink border-t border-mist/30 dark:border-white/5 px-6 py-5">
          <ul className="flex flex-col gap-5">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `font-mono text-xs flex items-center gap-2 transition-colors ${
                      isActive ? 'text-ink dark:text-chalk' : 'text-stone'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="w-1 h-1 rounded-full bg-accent inline-block" />
                      )}
                      {label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
