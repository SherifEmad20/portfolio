import { useEffect, useState } from 'react'
import { Activity, GitMerge, Clock, Layers } from 'lucide-react'

const BASE_DEPLOYS = 847
const UPTIME = 99.98

function useCounter(target, duration = 1800) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      setVal(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    const id = requestAnimationFrame(step)
    return () => cancelAnimationFrame(id)
  }, [target, duration])
  return val
}

export default function StatusDash() {
  const deploys = useCounter(BASE_DEPLOYS)
  const uptime  = useCounter(Math.round(UPTIME * 100), 1400)

  const stats = [
    {
      icon: Activity,
      label: 'System Status',
      value: 'Operational',
      sub: 'All clusters healthy',
      color: '#00FF41',
      dot: true,
    },
    {
      icon: GitMerge,
      label: 'Total Deployments',
      value: deploys.toLocaleString(),
      sub: 'across all pipelines',
      color: '#0DB7ED',
    },
    {
      icon: Layers,
      label: 'Uptime',
      value: (uptime / 100).toFixed(2) + '%',
      sub: '30-day rolling average',
      color: '#326CE5',
    },
    {
      icon: Clock,
      label: 'Last Deploy',
      value: '2h ago',
      sub: 'nginx-ingress v4.8.3',
      color: '#EF7B4D',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
      {stats.map(({ icon: Icon, label, value, sub, color, dot }) => (
        <div
          key={label}
          className="rounded-xl border p-4
                     bg-gray-50/80 border-gray-200
                     dark:bg-terminal-card dark:border-terminal-border
                     backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 mb-2">
            {dot && <span className="status-dot scale-75" />}
            <Icon size={13} style={{ color }} className="flex-shrink-0" />
            <span className="text-xs text-gray-500 dark:text-terminal-muted font-mono">
              {label}
            </span>
          </div>
          <p className="text-lg font-bold font-mono" style={{ color }}>
            {value}
          </p>
          <p className="text-xs text-gray-400 dark:text-terminal-muted mt-0.5 truncate">
            {sub}
          </p>
        </div>
      ))}
    </div>
  )
}
