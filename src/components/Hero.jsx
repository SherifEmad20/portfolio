import { useState, useEffect } from 'react'
import { Github, Linkedin, Mail, ChevronDown, ArrowRight, Download, Terminal } from 'lucide-react'
import { personal } from '../data/resume'
import StatusDash from './StatusDash'

const ROLES = [
  'Senior DevOps Engineer',
  'Kubernetes Administrator',
  'Cloud Infrastructure Architect',
  'CI/CD Pipeline Engineer',
  'DevSecOps Practitioner',
]

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [text, setText] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const role = ROLES[roleIdx]
    if (typing) {
      if (text.length < role.length) {
        const t = setTimeout(() => setText(role.slice(0, text.length + 1)), 52)
        return () => clearTimeout(t)
      }
      const t = setTimeout(() => setTyping(false), 2400)
      return () => clearTimeout(t)
    } else {
      if (text.length > 0) {
        const t = setTimeout(() => setText(text.slice(0, -1)), 26)
        return () => clearTimeout(t)
      }
      setRoleIdx(i => (i + 1) % ROLES.length)
      setTyping(true)
    }
  }, [text, typing, roleIdx])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden
                 bg-white dark:bg-terminal-bg"
    >
      {/* Grid */}
      <div className="absolute inset-0 hero-grid opacity-100" />

      {/* Radial glow — k8s blue top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -5%, rgba(50,108,229,0.10), transparent 70%)',
        }}
      />
      {/* Neon glow — bottom subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 30% at 50% 105%, rgba(0,255,65,0.05), transparent)',
        }}
      />

      <div className="relative z-10 section-wrapper text-center">
        {/* Terminal badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full
                        bg-gray-100 dark:bg-terminal-card
                        border border-gray-200 dark:border-terminal-border
                        animate-fade-in">
          <Terminal size={13} className="text-neon" />
          <span className="font-mono text-xs text-neon tracking-wide">$ whoami</span>
        </div>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-3 leading-none">
          <span className="text-gray-900 dark:text-terminal-text">
            Sherif Emad{' '}
          </span>
          <span className="text-k8s">Taha</span>
        </h1>

        {/* Typing role */}
        <div className="h-10 flex items-center justify-center mb-6">
          <p className="font-mono text-lg md:text-xl text-gray-500 dark:text-terminal-muted">
            <span className="text-docker">{text}</span>
            <span className="inline-block w-0.5 h-5 bg-neon align-middle ml-0.5 animate-blink" />
          </p>
        </div>

        {/* Summary */}
        <p className="max-w-xl mx-auto text-base md:text-lg text-gray-600 dark:text-terminal-muted leading-relaxed mb-10">
          3+ years engineering Kubernetes clusters, secure CI/CD pipelines,
          and full-stack observability across enterprise banking environments.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <a href="#projects" className="btn-primary">
            View Projects <ArrowRight size={15} />
          </a>
          <a
            href="/resume.pdf"
            download="sherif_emad_devops_engineer.pdf"
            className="btn-neon"
          >
            <Download size={15} /> Resume
          </a>
          <a href="#contact" className="btn-outline">
            Get in Touch
          </a>
        </div>

        {/* Social */}
        <div className="flex items-center justify-center gap-3 mb-12">
          {[
            { href: personal.github,            icon: Github,   label: 'GitHub',   cls: 'hover:text-gray-900 dark:hover:text-terminal-text' },
            { href: personal.linkedin,           icon: Linkedin, label: 'LinkedIn', cls: 'hover:text-k8s' },
            { href: `mailto:${personal.email}`,  icon: Mail,     label: 'Email',    cls: 'hover:text-neon' },
          ].map(({ href, icon: Icon, label, cls }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className={`p-2.5 rounded-lg border text-gray-500 dark:text-terminal-muted ${cls}
                          border-gray-200 dark:border-terminal-border
                          hover:bg-gray-100 dark:hover:bg-terminal-elevated
                          transition-all duration-200`}
            >
              <Icon size={19} />
            </a>
          ))}
        </div>

        {/* Status dashboard */}
        <StatusDash />
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce
                   text-gray-400 dark:text-terminal-muted hover:text-neon transition-colors"
      >
        <ChevronDown size={22} />
      </a>
    </section>
  )
}
