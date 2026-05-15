import { MapPin, Briefcase, Award, GraduationCap } from 'lucide-react'
import { personal, education } from '../data/resume'

const stats = [
  { value: '3+',    label: 'Years Experience',   icon: Briefcase  },
  { value: '2',     label: 'Banks Served',        icon: Award      },
  { value: '10+',   label: 'Projects Deployed',   icon: MapPin     },
  { value: 'Cairo', label: 'Egypt',               icon: GraduationCap },
]

export default function About() {
  return (
    <section id="about" className="bg-gray-50 dark:bg-terminal-card/40">
      <div className="section-wrapper">
        <p className="section-label">// about.md</p>
        <h2 className="section-title">About Me</h2>
        <div className="section-bar bg-k8s" />

        <div className="grid md:grid-cols-3 gap-10 items-start">
          {/* Text */}
          <div className="md:col-span-2 space-y-5">
            <p className="text-gray-600 dark:text-terminal-muted leading-relaxed">
              {personal.summary}
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm
                            text-gray-500 dark:text-terminal-muted">
              <GraduationCap size={15} className="text-k8s flex-shrink-0" />
              <span className="font-medium text-gray-700 dark:text-terminal-text">
                {education.degree}
              </span>
              <span className="hidden sm:inline text-gray-300 dark:text-terminal-border">·</span>
              <span>{education.institution.split('—')[0].trim()}</span>
              <span className="hidden sm:inline text-gray-300 dark:text-terminal-border">·</span>
              <span>{education.period}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="card text-center py-5 hover:border-k8s/40 dark:hover:border-k8s/40 transition-colors"
              >
                <Icon size={18} className="text-k8s mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-terminal-text mb-0.5">
                  {value}
                </div>
                <div className="text-xs text-gray-500 dark:text-terminal-muted leading-tight">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
