/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // DevOps tool brand colors
        k8s:        '#326CE5',
        docker:     '#0DB7ED',
        azure:      '#0078D4',
        terraform:  '#7B42BC',
        argocd:     '#EF7B4D',
        jenkins:    '#D33833',
        ansible:    '#EE0000',
        grafana:    '#F46800',
        prometheus: '#E6522C',
        vault:      '#FFD814',
        git:        '#F05032',
        sonar:      '#4E9BCD',
        // Accent colour #4 — neon terminal green
        neon:       '#00FF41',
        // Terminal / GitHub dark palette
        terminal: {
          bg:       '#0D1117',
          card:     '#161B22',
          elevated: '#21262D',
          border:   '#30363D',
          text:     '#E6EDF3',
          muted:    '#8B949E',
          green:    '#3FB950',
          blue:     '#58A6FF',
          orange:   '#F0883E',
          // pure-black terminal canvas
          black:    '#020D08',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
      },
      animation: {
        blink:      'blink 1s step-end infinite',
        'fade-up':  'fadeUp 0.7s ease-out forwards',
        'fade-in':  'fadeIn 0.5s ease-out forwards',
        marquee:    'marquee 28s linear infinite',
        'pulse-dot':'pulseDot 2s ease-in-out infinite',
        ping:       'ping 1.5s cubic-bezier(0,0,0.2,1) infinite',
        'flow':     'flow 2s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.5', transform: 'scale(0.85)' },
        },
        flow: {
          '0%':   { transform: 'translateX(-8px)', opacity: '0' },
          '50%':  { opacity: '1' },
          '100%': { transform: 'translateX(8px)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
