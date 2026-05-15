# Portfolio Handoff

## Goal

Build a personal portfolio website for **Sherif Emad Taha — Senior DevOps Engineer** that:

- Reflects the DevOps/terminal/dev-tool aesthetic (dark, monospace, console vibe)
- Uses tool brand colours (Kubernetes blue, Docker cyan, Terraform purple, neon green) as the visual language
- Showcases skills prominently — previously they were buried in small cards
- Has interactive elements that demonstrate personality and technical depth
- Supports dark and light mode
- Is built with **React + Vite + Tailwind CSS** — fast, modern, zero framework lock-in

---

## Current State

The site is **fully scaffolded and builds cleanly** (`npm run build` — 0 errors, 0 warnings). All sections are implemented and wired together. Resume PDF is in `public/` and downloads correctly.

### Sections live

| Section | Component | Notes |
|---|---|---|
| Hero | `Hero.jsx` | Typing animation cycling 5 role titles, neon cursor, StatusDash embedded |
| Status Dashboard | `StatusDash.jsx` | 4 metric cards: Operational · 847 deploys (animated counter) · 99.98% uptime · Last deploy 2h ago |
| About | `About.jsx` | Summary + 4-stat grid (years, companies, projects, location) |
| Skills | `Skills.jsx` | Scrolling marquee of top 12 tools + Grid/Terminal view toggle |
| Interactive Terminal | `Terminal.jsx` | Fully functional fake shell — kubectl, docker, helm, git log, whoami, help, clear · Arrow-key history · Neon green native caret |
| Experience | `Experience.jsx` | Vertical timeline — pulsing neon dot for current role (Suez Canal Bank), solid k8s blue for previous (Banque Misr) |
| Projects | `Projects.jsx` | 2 cards with brand-coloured tech badges and GitHub links |
| Contact | `Contact.jsx` | Copy-to-clipboard email, phone, location, GitHub + LinkedIn buttons |
| Footer | `Footer.jsx` | `<SE/>` logo, copyright |

### Theme system

- Toggle: sun/moon in Navbar, persisted to `localStorage`, respects `prefers-color-scheme` on first visit
- Anti-flash inline script in `index.html` sets `.dark` class before React hydrates
- Dark palette: GitHub-dark (`#0D1117` base) with neon green (`#00FF41`) as accent #4
- Light palette: white/gray-50 with Azure blue accents

### Resume download

- File lives at `public/resume.pdf`
- Button in Hero: `href="/resume.pdf" download="sherif_emad_devops_engineer.pdf"`
- Browser saves it as `sherif_emad_devops_engineer.pdf`

---

## Files in Flight

```
portfolio/
├── index.html                         # Anti-flash theme script, Google Fonts
├── package.json                       # React 18, Vite 6, Tailwind 3, Lucide React
├── vite.config.js
├── tailwind.config.js                 # Custom DevOps colours + marquee/blink animations
├── postcss.config.js
├── public/
│   ├── favicon.svg                    # <SE/> terminal icon — k8s blue + docker cyan
│   └── resume.pdf                     # Sherif_Emad_DevOps_Engineer_2__Copy_ (1).pdf
└── src/
    ├── main.jsx
    ├── App.jsx                        # Imports all sections in order
    ├── index.css                      # Tailwind layers + .term-window/.term-body/.hero-grid
    ├── data/
    │   └── resume.js                  # Single source of truth — all text, skills, experience, projects
    ├── hooks/
    │   └── useTheme.js                # localStorage + system preference + .dark class on <html>
    └── components/
        ├── Navbar.jsx                 # Fixed, blur-on-scroll, mobile hamburger, theme toggle
        ├── Hero.jsx                   # Typing animation + CTAs + StatusDash
        ├── StatusDash.jsx             # 4 live metric cards with animated counters
        ├── About.jsx                  # Summary paragraph + stat grid
        ├── Skills.jsx                 # Marquee ticker + Grid/Terminal view toggle
        ├── Terminal.jsx               # Interactive fake shell
        ├── Experience.jsx             # Timeline with animated dot for current role
        ├── Projects.jsx               # Project cards with brand-coloured tags
        ├── Contact.jsx                # Copy-to-clipboard + social links
        └── Footer.jsx
```

---

## Things Tried and Failed / Bugs Fixed

| Issue | Root cause | Fix applied |
|---|---|---|
| Page loaded scrolled to the middle | `scrollIntoView()` in `Terminal.jsx` fired on mount (initial `history` state triggered the effect) and pulled the entire page viewport down to the terminal section | Switched to `termBodyRef.current.scrollTop = scrollHeight` to scroll only inside the terminal container |
| Terminal cursor appeared far to the right | A `<span>` fake cursor was rendered as a separate flex child after the `<input>`, always floating to the right edge | Removed the fake span; used native `caret-color: #00FF41` on the input instead |
| `help` command output was hard to read — command and description ran together as one muted string | All rows were plain strings rendered in the same `term-out` colour | Changed help rows to `{ cmd, desc }` objects; added a `help-row` type rendered as blue command + dimmed `—` + muted description |

---

## Next Steps

These were requested or implied but not yet implemented:

### High priority
- **Blog / Writing section** — placeholder section with 2-3 fake post cards (title, date, tag, read-time). Can wire up to a CMS (Contentlayer, Sanity, or plain MDX) later.
- **Certifications section** — add to `resume.js` + render as badge cards. Sherif's certs were not in the resume; needs to be filled in.
- **Animated CI/CD pipeline diagram** — SVG-based flow: `Code Push → Build → Test → Scan → Deploy → Monitor` with animated particles between stages. Was scoped but deferred.

### Medium priority
- **Active nav highlight** — highlight the current section's nav link as the user scrolls (IntersectionObserver watching all section IDs).
- **Scroll-reveal animations** — fade-up each section on entry using IntersectionObserver. Currently all content is visible immediately.
- **Mobile layout pass** — the terminal and status dashboard need extra testing on small screens; the terminal `w-52` column in `help-row` may overflow on narrow viewports.
- **`/og-image.png`** — add an Open Graph image to `public/` and `<meta>` tags in `index.html` for link previews on LinkedIn/Twitter.

### Low priority / polish
- **2-colour theme variants** — user asked for "2 directions side-by-side". One interpretation: add a second dark theme (Grafana-orange palette) as a third theme option alongside Light and Terminal Dark.
- **Projects — add more entries** — only 2 GitHub projects are listed. Add more as they are published.
- **Domain + deploy** — deploy to Vercel/Netlify. `npm run build` produces `dist/` which is ready to ship. Just `vercel --prod` or drag `dist/` to Netlify.
- **Remove `Sherif_Emad_DevOps_Engineer_2__Copy_ (1).pdf` from repo root** — it was copied to `public/resume.pdf`; the original in the project root can be deleted.

---

## How to Run

```bash
npm install       # first time only
npm run dev       # http://localhost:5173 (or next available port)
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

All resume content lives in `src/data/resume.js` — edit that file to update any text, add skills, or add new projects without touching component code.
