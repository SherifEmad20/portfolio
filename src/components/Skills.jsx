import { useState } from 'react'
import { Cloud, GitBranch, Shield, Activity, Network, Code2, LayoutGrid, Terminal } from 'lucide-react'
import { skills } from '../data/resume'

const ICONS = {
  'Cloud & Kubernetes':    Cloud,
  'CI/CD & Automation':    GitBranch,
  'DevSecOps & Security':  Shield,
  'Monitoring & Logging':  Activity,
  'Networking & Ingress':  Network,
  'Languages & Tools':     Code2,
}

const FEATURED = [
  { name: 'Kubernetes', color: '#326CE5' },
  { name: 'Docker',     color: '#0DB7ED' },
  { name: 'Azure',      color: '#0078D4' },
  { name: 'Terraform',  color: '#7B42BC' },
  { name: 'GitHub Actions', color: '#6E40C9' },
  { name: 'ArgoCD',     color: '#EF7B4D' },
  { name: 'Helm',       color: '#0F1689' },
  { name: 'Prometheus', color: '#E6522C' },
  { name: 'Grafana',    color: '#F46800' },
  { name: 'Ansible',    color: '#EE0000' },
  { name: 'OpenShift',  color: '#EE0000' },
  { name: 'Vault',      color: '#FFD814' },
]

// Terminal view: render skills as a YAML document
function TerminalView() {
  return (
    <div className="term-window">
      <div className="term-titlebar">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-3 font-mono text-xs text-terminal-muted">skills.yaml</span>
      </div>
      <div className="term-body overflow-y-auto" style={{ minHeight: 'auto', maxHeight: '600px' }}>
        {skills.map((group, gi) => (
          <div key={gi} className="mb-5">
            <span className="term-hdr">
              {group.category.toLowerCase().replace(/[^a-z0-9]+/g, '_')}:
            </span>
            {group.items.map((skill, si) => (
              <div key={si} className="pl-4">
                <span className="term-prompt">  - tool: </span>
                <span style={{ color: skill.color }}>{skill.name.toLowerCase().replace(/ /g, '_')}</span>
              </div>
            ))}
          </div>
        ))}
        <div className="mt-4 term-out">
          # {skills.reduce((n, g) => n + g.items.length, 0)} technologies · {skills.length} categories
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="term-prompt">[sherif@devops ~]$</span>
          <span className="term-cmd">_</span>
          <span className="inline-block w-2 h-4 bg-neon animate-blink ml-0.5" />
        </div>
      </div>
    </div>
  )
}

// Grid view: category cards with bigger tags
function GridView() {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {skills.map(group => {
        const Icon = ICONS[group.category] || Code2
        return (
          <div key={group.category} className="card card-hover border-l-4"
               style={{ borderLeftColor: group.color }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-lg flex-shrink-0"
                   style={{ backgroundColor: group.color + '20' }}>
                <Icon size={17} style={{ color: group.color }} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-terminal-text tracking-wide uppercase">
                  {group.category}
                </h3>
                <p className="text-xs text-gray-400 dark:text-terminal-muted font-mono">
                  {group.items.length} tools
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map(skill => (
                <span
                  key={skill.name}
                  className="skill-tag-lg"
                  style={{
                    color:           skill.color,
                    borderColor:     skill.color + '55',
                    backgroundColor: skill.color + '15',
                  }}
                >
                  <span className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: skill.color }} />
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Skills() {
  const [view, setView] = useState('grid')   // 'grid' | 'terminal'

  return (
    <section id="skills" className="bg-gray-50 dark:bg-terminal-bg">
      <div className="section-wrapper">
        <p className="section-label">// skills — {skills.reduce((n, g) => n + g.items.length, 0)} tools</p>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-1">
          <h2 className="section-title">Technical Skills</h2>

          {/* View toggle */}
          <div className="flex items-center gap-1 p-1 rounded-lg
                          bg-gray-100 dark:bg-terminal-elevated border border-gray-200 dark:border-terminal-border">
            <button
              onClick={() => setView('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all
                ${view === 'grid'
                  ? 'bg-white dark:bg-terminal-card text-gray-900 dark:text-terminal-text shadow-sm'
                  : 'text-gray-500 dark:text-terminal-muted hover:text-gray-700 dark:hover:text-terminal-text'
                }`}
            >
              <LayoutGrid size={13} /> Grid
            </button>
            <button
              onClick={() => setView('terminal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all
                ${view === 'terminal'
                  ? 'bg-terminal-black text-neon shadow-sm border border-neon/30'
                  : 'text-gray-500 dark:text-terminal-muted hover:text-gray-700 dark:hover:text-terminal-text'
                }`}
            >
              <Terminal size={13} /> Terminal
            </button>
          </div>
        </div>
        <div className="section-bar bg-neon" />

        {/* Featured skills marquee */}
        <div className="overflow-hidden mb-10 py-4 border-y border-gray-200 dark:border-terminal-border">
          <div className="flex animate-marquee whitespace-nowrap gap-4">
            {[...FEATURED, ...FEATURED].map((skill, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono font-medium
                           border flex-shrink-0 select-none"
                style={{
                  color:           skill.color,
                  borderColor:     skill.color + '55',
                  backgroundColor: skill.color + '12',
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: skill.color }} />
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* Swappable view */}
        {view === 'grid' ? <GridView /> : <TerminalView />}
      </div>
    </section>
  )
}
