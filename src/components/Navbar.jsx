import { useState, useEffect } from 'react'
import { Sun, Moon, Menu, X } from 'lucide-react'

const links = [
  { href: '#about',      label: 'About' },
  { href: '#skills',     label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects',   label: 'Projects' },
  { href: '#contact',    label: 'Contact' },
]

export default function Navbar({ theme, onToggle }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-terminal-bg/90 backdrop-blur-md border-b border-gray-200 dark:border-terminal-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-mono text-base font-semibold tracking-tight group">
          <span className="text-k8s group-hover:text-docker transition-colors duration-200">&lt;</span>
          <span className="text-gray-900 dark:text-terminal-text">SE</span>
          <span className="text-k8s group-hover:text-docker transition-colors duration-200">/&gt;</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="px-3 py-1.5 rounded-md text-sm font-medium
                         text-gray-600 dark:text-terminal-muted
                         hover:text-gray-900 dark:hover:text-terminal-text
                         hover:bg-gray-100 dark:hover:bg-terminal-elevated
                         transition-all duration-150"
            >
              {label}
            </a>
          ))}

          <button
            onClick={onToggle}
            aria-label="Toggle colour theme"
            className="ml-2 p-2 rounded-md
                       text-gray-500 dark:text-terminal-muted
                       hover:text-gray-900 dark:hover:text-terminal-text
                       hover:bg-gray-100 dark:hover:bg-terminal-elevated
                       transition-all duration-150"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-1">
          <button
            onClick={onToggle}
            aria-label="Toggle colour theme"
            className="p-2 rounded-md text-gray-500 dark:text-terminal-muted"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
            className="p-2 rounded-md text-gray-500 dark:text-terminal-muted"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-terminal-card border-b border-gray-200 dark:border-terminal-border px-6 py-3 flex flex-col gap-1">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded-md text-sm font-medium
                         text-gray-700 dark:text-terminal-muted
                         hover:bg-gray-100 dark:hover:bg-terminal-elevated
                         transition-all"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
