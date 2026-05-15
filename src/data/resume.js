
export const personal = {
  name: 'Sherif Emad Taha',
  title: 'Senior DevOps Engineer',
  email: 'sherif.emad1092@gmail.com',
  phone: '+20 155-672-5551',
  location: 'Cairo, Egypt',
  linkedin: 'https://linkedin.com/in/sherifemad21',
  github: 'https://github.com/SherifEmad20',
  summary:
    'Senior DevOps Engineer with 3+ years of experience administering Kubernetes clusters (OpenShift, K3s, AKS), designing scalable cloud infrastructure on Azure, and building secure CI/CD pipelines with Azure DevOps and GitHub Actions. Demonstrated expertise in DevSecOps, Helm-based deployments, container orchestration, and full-stack observability across enterprise banking environments. Proven ability to reduce deployment time, eliminate critical vulnerabilities, and improve incident response time at scale.',
}

export const skills = [
  {
    category: 'Cloud & Kubernetes',
    color: '#326CE5',
    items: [
      { name: 'Azure',      color: '#0078D4' },
      { name: 'AWS',        color: '#FF9900' },
      { name: 'Kubernetes', color: '#326CE5' },
      { name: 'OpenShift',  color: '#EE0000' },
      { name: 'AKS',        color: '#0078D4' },
      { name: 'K3s',        color: '#FFC61C' },
      { name: 'Helm',       color: '#0F1689' },
      { name: 'Terraform',  color: '#7B42BC' },
    ],
  },
  {
    category: 'CI/CD & Automation',
    color: '#F46800',
    items: [
      { name: 'Azure DevOps',     color: '#0078D4' },
      { name: 'Azure Pipelines',  color: '#0078D4' },
      { name: 'GitHub Actions',   color: '#6E40C9' },
      { name: 'Jenkins',          color: '#D33833' },
      { name: 'ArgoCD',           color: '#EF7B4D' },
      { name: 'GitOps',           color: '#F05032' },
      { name: 'Docker',           color: '#0DB7ED' },
    ],
  },
  {
    category: 'DevSecOps & Security',
    color: '#EE0000',
    items: [
      { name: 'SonarQube',       color: '#4E9BCD' },
      { name: 'Trivy',           color: '#1904DA' },
      { name: 'Prisma Cloud',    color: '#00AEEF' },
      { name: 'NeuVector',       color: '#1B5FAB' },
      { name: 'Twistlock',       color: '#00AEEF' },
      { name: 'HashiCorp Vault', color: '#FFD814' },
    ],
  },
  {
    category: 'Monitoring & Logging',
    color: '#E6522C',
    items: [
      { name: 'Prometheus',    color: '#E6522C' },
      { name: 'Grafana',       color: '#F46800' },
      { name: 'Elasticsearch', color: '#00BFB3' },
      { name: 'Fluentd',       color: '#0E83C8' },
      { name: 'Kibana',        color: '#F04E98' },
    ],
  },
  {
    category: 'Networking & Ingress',
    color: '#009639',
    items: [
      { name: 'NGINX',         color: '#009639' },
      { name: 'HA-Proxy',      color: '#6495ED' },
      { name: 'cert-manager',  color: '#326CE5' },
      { name: 'SSL/TLS',       color: '#5C6BC0' },
      { name: 'DNS',           color: '#607D8B' },
      { name: 'OpenShift Router', color: '#EE0000' },
    ],
  },
  {
    category: 'Languages & Tools',
    color: '#8B949E',
    items: [
      { name: 'Bash',    color: '#4EAA25' },
      { name: 'Python',  color: '#3776AB' },
      { name: 'YAML',    color: '#CB171E' },
      { name: 'Git',     color: '#F05032' },
      { name: 'Ansible', color: '#EE0000' },
      { name: 'Linux',   color: '#FCC624' },
    ],
  },
]

export const experience = [
  {
    role: 'Senior DevOps Engineer',
    company: 'Suez Canal Bank — Digital Factory',
    location: 'New Cairo (El-Rehab), Egypt',
    period: 'October 2024 – Present',
    current: true,
    highlights: [
      'Designed dynamic agent pool provisioning on OpenShift and K3s, eliminating static VMs and improving pipeline scalability and cost efficiency.',
      'Engineered reusable Azure DevOps pipeline templates with environment approvals and service connection governance, reducing production incidents.',
      'Achieved zero critical vulnerabilities by integrating SonarQube and NeuVector security scanning into all CI/CD pipelines.',
      'Automated a production-grade big data platform (Airflow, Spark, MinIO, Trino, Lakekeeper) using Helm on OpenShift.',
      'Implemented end-to-end observability with Prometheus and Grafana across all Kubernetes clusters, improving MTTR.',
      'Deployed EFK stack (Elasticsearch, Fluentd, Kibana) for centralised log management and faster incident resolution.',
      'Managed DevOps support tickets and provided mentorship to junior engineers.',
    ],
  },
  {
    role: 'DevOps Engineer',
    company: 'Banque Misr — Digital Factory',
    location: 'New Cairo (Fifth Settlement), Egypt',
    period: 'October 2022 – October 2024',
    current: false,
    highlights: [
      'Built and maintained Azure DevOps pipelines and reusable templates, reducing deployment time and increasing release frequency.',
      'Integrated Prisma Cloud, NeuVector, and Twistlock to automate vulnerability detection, achieving zero critical container vulnerabilities.',
      'Developed standardised Dockerfiles and build processes, improving build times and ensuring cross-environment consistency on Kubernetes.',
      'Managed version control workflows and release governance via Azure DevOps, improving deployment stability.',
      'Collaborated directly with development teams to align CI/CD workflows with evolving business requirements.',
    ],
  },
]

export const projects = [
  {
    title: 'Azure AKS Python Microservices DevOps',
    description:
      'End-to-end Azure cloud infrastructure for deploying Python microservices on AKS with full CI/CD automation and observability.',
    highlights: [
      'Provisioned AKS and ACR using Terraform, automating the full cluster lifecycle.',
      'Deployed self-hosted GitHub Actions runners on K3s via StatefulSets for isolated CI/CD.',
      'Built complete pipeline: Docker build → push to ACR → deploy to AKS on every code push.',
      'Configured NGINX Ingress + cert-manager for automated SSL/TLS via Let\'s Encrypt.',
      'Deployed kube-prometheus-stack with Grafana dashboards exposed via secured ingress.',
    ],
    tags: ['AKS', 'Terraform', 'GitHub Actions', 'Docker', 'K3s', 'NGINX', 'cert-manager', 'Prometheus', 'Grafana'],
    url: 'https://github.com/SherifEmad20/Azure-AKS-Python-Microservices-DevOps',
  },
  {
    title: 'Jenkins & Ansible Automation',
    description:
      'Multi-node CI/CD automation system integrating Jenkins, Ansible, and Gogs for infrastructure provisioning and server configuration.',
    highlights: [
      'Designed multibranch Jenkins pipeline with Gogs webhook integration for automatic triggering.',
      'Configured remote Jenkins agent on a dedicated VM using SSH-based authentication.',
      'Authored Ansible playbook for automated NGINX installation and service configuration.',
      'Automated Linux user provisioning using Bash scripts with Jenkins credential injection.',
      'Implemented post-pipeline email notifications for execution visibility and auditability.',
    ],
    tags: ['Jenkins', 'Ansible', 'Gogs', 'Docker', 'Bash', 'NGINX', 'Linux'],
    url: 'https://github.com/SherifEmad20/Jenkins-Ansbile-Automation',
  },
]

export const education = {
  degree: 'Bachelor of Science in Software Engineering',
  institution: 'Cairo University — Faculty of Computer Science and Artificial Intelligence',
  period: '2019 – 2023',
}
