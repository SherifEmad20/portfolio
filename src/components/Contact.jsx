import { useState } from 'react'
import { Mail, Phone, MapPin, Github, Linkedin, Copy, Check } from 'lucide-react'
import { personal } from '../data/resume'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="bg-gray-50 dark:bg-terminal-card/30">
      <div className="section-wrapper">
        <p className="section-label">// contact.sh</p>
        <h2 className="section-title">Get in Touch</h2>
        <div className="section-bar bg-terminal-green" />

        <div className="max-w-2xl">
          <p className="text-gray-600 dark:text-terminal-muted mb-8 leading-relaxed">
            Open to new opportunities, collaborations, and interesting DevOps challenges.
            Feel free to reach out — I typically respond within 24 hours.
          </p>

          <div className="space-y-3">
            {/* Email */}
            <div className="card card-hover flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-lg bg-k8s/10 flex-shrink-0">
                  <Mail size={17} className="text-k8s" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-terminal-muted mb-0.5">Email</p>
                  <a
                    href={`mailto:${personal.email}`}
                    className="text-sm font-mono text-gray-900 dark:text-terminal-text hover:text-k8s transition-colors"
                  >
                    {personal.email}
                  </a>
                </div>
              </div>
              <button
                onClick={copyEmail}
                aria-label="Copy email address"
                className="p-2 rounded-lg text-gray-400 hover:text-k8s hover:bg-k8s/10 transition-all flex-shrink-0"
              >
                {copied
                  ? <Check size={15} className="text-terminal-green" />
                  : <Copy size={15} />
                }
              </button>
            </div>

            {/* Phone */}
            <div className="card flex items-center gap-4">
              <div className="p-2.5 rounded-lg bg-docker/10 flex-shrink-0">
                <Phone size={17} className="text-docker" />
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-terminal-muted mb-0.5">Phone</p>
                <a
                  href={`tel:${personal.phone}`}
                  className="text-sm font-mono text-gray-900 dark:text-terminal-text hover:text-docker transition-colors"
                >
                  {personal.phone}
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="card flex items-center gap-4">
              <div className="p-2.5 rounded-lg bg-terminal-green/10 flex-shrink-0">
                <MapPin size={17} className="text-terminal-green" />
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-terminal-muted mb-0.5">Location</p>
                <span className="text-sm font-mono text-gray-900 dark:text-terminal-text">
                  {personal.location}
                </span>
              </div>
            </div>

            {/* Social */}
            <div className="card flex items-center gap-3 flex-wrap">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                           text-gray-700 dark:text-terminal-muted
                           border border-gray-200 dark:border-terminal-border
                           hover:border-gray-400 dark:hover:border-terminal-muted
                           hover:bg-gray-50 dark:hover:bg-terminal-elevated
                           transition-all"
              >
                <Github size={15} />
                GitHub
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                           text-k8s border border-k8s/30
                           hover:bg-k8s hover:text-white hover:border-k8s
                           transition-all"
              >
                <Linkedin size={15} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
