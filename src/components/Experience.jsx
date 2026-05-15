import { MapPin, Calendar, CheckCircle2 } from 'lucide-react'
import { experience } from '../data/resume'

export default function Experience() {
  return (
    <section id="experience" className="bg-gray-50 dark:bg-terminal-card/30">
      <div className="section-wrapper">
        <p className="section-label">// experience.log</p>
        <h2 className="section-title">Experience</h2>
        <div className="section-bar bg-grafana" />

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-gray-200 dark:bg-terminal-border ml-[8px]" />

          <div className="space-y-8 pl-8">
            {experience.map((job, i) => (
              <div key={i} className="relative">
                {/* Dot */}
                {job.current ? (
                  <>
                    <span className="timeline-dot-current" />
                    <span className="absolute -left-[9px] top-6 w-[18px] h-[18px] rounded-full bg-terminal-green opacity-40 animate-ping" />
                  </>
                ) : (
                  <span className="timeline-dot" />
                )}

                <div className="card card-hover">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-terminal-text">
                        {job.role}
                      </h3>
                      <p className="text-k8s text-sm font-medium mt-0.5">{job.company}</p>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      {job.current && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium
                                         bg-terminal-green/10 text-terminal-green
                                         border border-terminal-green/30">
                          Current
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-terminal-muted">
                        <Calendar size={11} />
                        {job.period}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-terminal-muted">
                        <MapPin size={11} />
                        {job.location}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {job.highlights.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-terminal-muted leading-relaxed"
                      >
                        <CheckCircle2
                          size={14}
                          className="text-terminal-green flex-shrink-0 mt-0.5"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
