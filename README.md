# Sherif Emad — Portfolio

Personal portfolio website for **Sherif Emad Taha**, Senior DevOps Engineer based in Cairo, Egypt. Built with React + Vite + Tailwind CSS and deployed via Docker/Kubernetes.

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Lucide React
- **Containerization:** Docker (multi-stage build → nginx:alpine)
- **Deployment:** Kubernetes (Deployment, Service, Ingress)

## Sections

- **Hero** — intro and summary
- **About** — background and profile
- **Skills** — Cloud & Kubernetes, CI/CD, DevSecOps, Monitoring, and more
- **Experience** — work history
- **Projects** — featured projects
- **Contact** — contact information

## Getting Started

```bash
npm install
npm run dev
```

## Build & Docker

```bash
# Production build
npm run build

# Build Docker image
docker build -t portfolio .

# Run container
docker run -p 8080:80 portfolio
```

## Kubernetes Deployment

Manifests are in the `k8s/` directory:

```bash
kubectl apply -f k8s/
```

## Contact

- **Email:** sherif.emad1092@gmail.com
- **LinkedIn:** [linkedin.com/in/sherifemad21](https://linkedin.com/in/sherifemad21)
- **GitHub:** [github.com/SherifEmad20](https://github.com/SherifEmad20)
