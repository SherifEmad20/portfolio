import { Heart, Terminal } from 'lucide-react'
import { personal } from '../data/resume'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-terminal-border bg-white dark:bg-terminal-bg">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Terminal size={13} className="text-k8s" />
          <span className="font-mono text-sm text-gray-500 dark:text-terminal-muted">
            <span className="text-k8s">&lt;</span>SE<span className="text-k8s">/&gt;</span>
            {' '}· {personal.name}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-terminal-muted">
          <span>Built with</span>
          <Heart size={11} className="text-red-500 fill-red-500" />
          <span>React + Vite · © {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}
