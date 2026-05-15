import { useState, useRef, useEffect, useCallback } from 'react'

const CMDS = {
  'kubectl get nodes': {
    hdr: 'NAME                STATUS   ROLES           AGE   VERSION',
    rows: [
      'master-node-01      Ready    control-plane   47d   v1.29.3',
      'worker-node-01      Ready    <none>          47d   v1.29.3',
      'worker-node-02      Ready    <none>          47d   v1.29.3',
    ],
  },
  'kubectl get pods': {
    hdr: 'NAME                                   READY   STATUS    RESTARTS   AGE',
    rows: [
      'nginx-ingress-ctrl-7d8f9-x2k4p   1/1     Running   0          12d',
      'prometheus-0                     2/2     Running   0          12d',
      'grafana-6d4b8c7f9-m8znp         1/1     Running   0          12d',
      'argocd-server-5f4b8c-j9pqr      1/1     Running   0          12d',
      'cert-manager-76d948d-kqr4t      1/1     Running   0          12d',
    ],
  },
  'kubectl get namespaces': {
    hdr: 'NAME              STATUS   AGE',
    rows: [
      'default           Active   47d',
      'monitoring        Active   45d',
      'ingress           Active   45d',
      'argocd            Active   40d',
      'cert-manager      Active   44d',
      'big-data          Active   30d',
    ],
  },
  'docker ps': {
    hdr: 'CONTAINER ID   IMAGE                     STATUS',
    rows: [
      'a1b2c3d4e5f6   nginx:latest              Up 2 hours',
      'b2c3d4e5f6a1   grafana/grafana:latest    Up 12 days',
      'c3d4e5f6a1b2   prom/prometheus:latest    Up 12 days',
      'd4e5f6a1b2c3   quay.io/argoproj/argocd   Up 12 days',
    ],
  },
  'docker images': {
    hdr: 'REPOSITORY              TAG        SIZE',
    rows: [
      'quarkus-app             1.4.2      187MB',
      'angular-frontend        2.1.0      124MB',
      'python-microservice     3.0.1       98MB',
      'nginx                   latest      44MB',
    ],
  },
  'helm list': {
    hdr: 'NAME            NAMESPACE    REVISION   STATUS     CHART',
    rows: [
      'nginx-ingress   ingress      3          deployed   ingress-nginx-4.8.3',
      'prometheus      monitoring   2          deployed   kube-prometheus-0.68.1',
      'grafana         monitoring   1          deployed   grafana-7.0.0',
      'argocd          argocd       4          deployed   argo-cd-5.51.0',
      'cert-manager    cert-mgr     2          deployed   cert-manager-v1.13.3',
    ],
  },
  'git log --oneline': {
    hdr: null,
    rows: [
      'f3a8b2c feat: dynamic agent pool provisioning on OpenShift',
      'e2b7a1d fix: helm chart templating in prod namespace',
      'd1a6f9e feat: NeuVector scanning integrated into CI/CD',
      'c9e5d8b chore: upgrade kube-prometheus-stack to v0.68.1',
      'b8d4c7a feat: EFK stack for centralised logging',
      'a7c3b6f fix: cert-manager renewal timeout in staging',
      '96b2a5e feat: deploy big data platform (Airflow + Spark)',
    ],
  },
  'whoami': {
    hdr: null,
    rows: [
      'sherif-emad  |  Senior DevOps Engineer',
      'Location  :  Cairo, Egypt',
      'GitHub    :  github.com/SherifEmad20',
      'Skills    :  kubectl · helm · terraform · docker · ansible',
      'Clusters  :  OpenShift · K3s · AKS',
    ],
  },
  'help': {
    hdr: 'Available commands:',
    rows: [
      { cmd: 'kubectl get nodes',      desc: 'List Kubernetes cluster nodes' },
      { cmd: 'kubectl get pods',       desc: 'List all running pods' },
      { cmd: 'kubectl get namespaces', desc: 'List all namespaces' },
      { cmd: 'docker ps',              desc: 'Show running containers' },
      { cmd: 'docker images',          desc: 'Show local Docker images' },
      { cmd: 'helm list',              desc: 'List deployed Helm releases' },
      { cmd: 'git log --oneline',      desc: 'Show recent commit history' },
      { cmd: 'whoami',                 desc: 'Show current user info' },
      { cmd: 'clear',                  desc: 'Clear the terminal' },
    ],
  },
}

const SUGGESTIONS = [
  'kubectl get nodes',
  'kubectl get pods',
  'docker ps',
  'helm list',
  'git log --oneline',
  'whoami',
  'help',
]

function OutputLine({ entry }) {
  if (entry.type === 'cmd') {
    return (
      <div className="flex gap-2 items-start mt-2">
        <span className="term-prompt flex-shrink-0">[sherif@k8s ~]$</span>
        <span className="term-cmd">{entry.text}</span>
      </div>
    )
  }
  if (entry.type === 'hdr') {
    return <div className="term-hdr mt-1">{entry.text}</div>
  }
  if (entry.type === 'row') {
    return <div className="term-out">{entry.text}</div>
  }
  if (entry.type === 'help-row') {
    return (
      <div className="flex items-baseline gap-0 mt-0.5">
        <span className="term-hdr w-52 flex-shrink-0">{entry.cmd}</span>
        <span className="term-out opacity-60 mx-2">—</span>
        <span className="term-out">{entry.desc}</span>
      </div>
    )
  }
  if (entry.type === 'err') {
    return <div className="term-err mt-1 mb-2">{entry.text}</div>
  }
  if (entry.type === 'welcome') {
    return <div className="term-out mb-3 whitespace-pre-line">{entry.text}</div>
  }
  return null
}

export default function TerminalSection() {
  const [history, setHistory] = useState([
    {
      type: 'welcome',
      text: 'Welcome to Sherif\'s DevOps terminal.\nType "help" to see available commands, or click a suggestion below.',
    },
  ])
  const [input, setInput] = useState('')
  const [cmdStack, setCmdStack] = useState([])
  const [stackIdx, setStackIdx] = useState(-1)
  const inputRef = useRef(null)
  const termBodyRef = useRef(null)

  // Scroll the terminal container, not the whole page
  useEffect(() => {
    if (termBodyRef.current) {
      termBodyRef.current.scrollTop = termBodyRef.current.scrollHeight
    }
  }, [history])

  const runCmd = useCallback((raw) => {
    const cmd = raw.trim()
    if (!cmd) return

    if (cmd === 'clear') {
      setHistory([])
      setInput('')
      return
    }

    const def = CMDS[cmd.toLowerCase()]
    const entries = [{ type: 'cmd', text: cmd }]

    if (def) {
      if (def.hdr) entries.push({ type: 'hdr', text: def.hdr })
      def.rows.forEach(r =>
        typeof r === 'object'
          ? entries.push({ type: 'help-row', cmd: r.cmd, desc: r.desc })
          : entries.push({ type: 'row', text: r })
      )
    } else {
      entries.push({
        type: 'err',
        text: `bash: ${cmd}: command not found  (try "help")`,
      })
    }

    setHistory(h => [...h, ...entries])
    setCmdStack(s => [cmd, ...s])
    setStackIdx(-1)
    setInput('')
  }, [])

  const onKey = (e) => {
    if (e.key === 'Enter') { runCmd(input); return }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const idx = Math.min(stackIdx + 1, cmdStack.length - 1)
      setStackIdx(idx)
      setInput(cmdStack[idx] ?? '')
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const idx = Math.max(stackIdx - 1, -1)
      setStackIdx(idx)
      setInput(idx === -1 ? '' : cmdStack[idx])
    }
  }

  return (
    <section id="terminal" className="bg-terminal-bg">
      <div className="section-wrapper">
        <p className="section-label">// interactive terminal</p>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-1">
          <h2 className="text-3xl font-bold text-terminal-text">
            Live Terminal
          </h2>
          <span className="font-mono text-xs text-terminal-muted">
            ↑↓ command history · Enter to run
          </span>
        </div>
        <div className="section-bar bg-neon" />

        <div className="term-window max-w-4xl">
          {/* Title bar */}
          <div className="term-titlebar">
            <span className="w-3 h-3 rounded-full bg-red-500/90" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/90" />
            <span className="w-3 h-3 rounded-full bg-green-500/90" />
            <span className="ml-4 font-mono text-xs text-terminal-muted select-none">
              sherif@devops-cluster: ~
            </span>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="status-dot" />
              <span className="font-mono text-xs text-neon">connected</span>
            </div>
          </div>

          {/* Output area */}
          <div
            ref={termBodyRef}
            className="term-body"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((entry, i) => (
              <OutputLine key={i} entry={entry} />
            ))}

            {/* Active input line */}
            <div className="flex gap-2 items-center mt-2">
              <span className="term-prompt flex-shrink-0 neon-glow">[sherif@k8s ~]$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKey}
                className="flex-1 bg-transparent outline-none term-cmd"
                style={{ caretColor: '#00FF41' }}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                aria-label="Terminal input"
              />
            </div>
          </div>

          {/* Quick-run suggestions */}
          <div className="bg-terminal-elevated border-t border-terminal-border px-4 py-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map(cmd => (
              <button
                key={cmd}
                onClick={() => runCmd(cmd)}
                className="px-3 py-1 rounded-md font-mono text-xs
                           text-terminal-muted border border-terminal-border
                           hover:text-neon hover:border-neon/50 hover:bg-neon/5
                           transition-all duration-150"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
