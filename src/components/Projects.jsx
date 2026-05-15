import { Github, ExternalLink, ChevronRight } from 'lucide-react'
import { projects } from '../data/resume'

const TAG_COLORS = {
  AKS:              '#0078D4',
  Terraform:        '#7B42BC',
  'GitHub Actions': '#6E40C9',
  Docker:           '#0DB7ED',
  K3s:              '#FFC61C',
  NGINX:            '#009639',
  'cert-manager':   '#326CE5',
  Prometheus:       '#E6522C',
  Grafana:          '#F46800',
  Jenkins:          '#D33833',
  Ansible:          '#EE0000',
  Gogs:             '#6CC644',
  Bash:             '#4EAA25',
  Linux:            '#FCC624',
}

function TagBadge({ tag }) {
  const color = TAG_COLORS[tag] || '#8B949E'
  return (
    <span
      className="px-2 py-0.5 rounded-md text-xs font-mono border"
      style={{
        color,
        borderColor:     color + '4d',
        backgroundColor: color + '12',
      }}
    >
      {tag}
    </span>
  )
}

export default function Projects() {
  return (
    <section id="projects">
      <div className="section-wrapper">
        <p className="section-label">// projects.yaml</p>
        <h2 className="section-title">Projects</h2>
        <div className="section-bar bg-terraform" />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div key={i} className="card card-hover flex flex-col">
              {/* Title row */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-base font-semibold text-gray-900 dark:text-terminal-text leading-snug">
                  {project.title}
                </h3>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 p-1.5 rounded-md
                             text-gray-400 dark:text-terminal-muted
                             hover:text-gray-900 dark:hover:text-terminal-text
                             hover:bg-gray-100 dark:hover:bg-terminal-elevated
                             transition-all"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <Github size={17} />
                </a>
              </div>

              <p className="text-sm text-gray-600 dark:text-terminal-muted mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Highlights */}
              <ul className="space-y-1.5 mb-5 flex-1">
                {project.highlights.map((h, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-xs text-gray-500 dark:text-terminal-muted leading-relaxed"
                  >
                    <ChevronRight size={12} className="text-k8s flex-shrink-0 mt-0.5" />
                    {h}
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map(tag => (
                  <TagBadge key={tag} tag={tag} />
                ))}
              </div>

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium
                           text-k8s hover:text-docker transition-colors duration-200"
              >
                View on GitHub <ExternalLink size={13} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
