// Markdown files diimport langsung sebagai raw string via Vite's ?raw suffix.
// Untuk tambah artikel baru:
//   1. Buat file .md di src/data/posts/
//   2. Import di sini dengan ?raw
//   3. Tambah entry di array blogPosts

import retryPatternsGo from './posts/retry-patterns-go.md?raw'
import reksadanaVsEtf from './posts/reksadana-vs-etf.md?raw'
import contextPropagationGo from './posts/context-propagation-go.md?raw'
import danaDaruratEngineer from './posts/dana-darurat-software-engineer.md?raw'
import postgresExplainAnalyze from './posts/postgres-explain-analyze.md?raw'
import dcaPasarVolatil from './posts/dca-pasar-volatil.md?raw'

export const projects = [
  {
    id: 1,
    title: 'GoFlow — Event-Driven Microservices Framework',
    description:
      'A lightweight framework built in Go for orchestrating event-driven microservices. Features automatic retry, dead-letter queues, and distributed tracing out of the box.',
    tech: ['Go', 'Kafka', 'Redis', 'PostgreSQL', 'Docker'],
    status: 'Open Source',
    link: 'https://github.com',
    year: '2024',
    featured: true,
  },
  {
    id: 2,
    title: 'Kasir — Real-time POS & Inventory API',
    description:
      'High-throughput REST + WebSocket API serving a nationwide retail chain. Handles 50k+ concurrent connections with sub-10ms p99 latency using Go and Redis.',
    tech: ['Go', 'PostgreSQL', 'Redis', 'WebSocket', 'gRPC'],
    status: 'Production',
    link: '#',
    year: '2023',
    featured: true,
  },
  {
    id: 3,
    title: 'Vaultify — Secrets & Config Manager',
    description:
      'Internal tooling for centralized secret rotation and environment config management across cloud environments. Integrates with Vault and AWS SSM.',
    tech: ['Go', 'HashiCorp Vault', 'AWS SSM', 'CLI', 'YAML'],
    status: 'Internal Tool',
    link: '#',
    year: '2023',
    featured: false,
  },
  {
    id: 4,
    title: 'AnalyticsStream — Real-time Data Pipeline',
    description:
      'End-to-end streaming data pipeline that ingests millions of user events daily. Built with Go consumers, schema validation, and ClickHouse for analytics.',
    tech: ['Go', 'Kafka', 'ClickHouse', 'Protobuf', 'Grafana'],
    status: 'Production',
    link: '#',
    year: '2022',
    featured: false,
  },
]

export const experiences = [
  {
    id: 1,
    company: 'TechCorp Indonesia',
    role: 'Senior Backend Engineer',
    period: 'Jan 2023 — Present',
    description:
      'Leading the backend guild, architecting microservices handling millions of daily transactions. Reduced API latency by 40% through strategic caching and query optimization.',
    tech: ['Go', 'PostgreSQL', 'Kafka', 'Redis', 'Kubernetes'],
  },
  {
    id: 2,
    company: 'Fintech Startup (Stealth)',
    role: 'Backend Engineer',
    period: 'Jun 2021 — Dec 2022',
    description:
      'Built core payment processing engine from scratch. Implemented idempotent transaction flows and real-time fraud detection hooks compliant with OJK regulations.',
    tech: ['Go', 'MySQL', 'RabbitMQ', 'Docker', 'AWS'],
  },
  {
    id: 3,
    company: 'Digital Agency X',
    role: 'Junior Software Engineer',
    period: 'Aug 2019 — May 2021',
    description:
      'Developed REST APIs and internal dashboards for various clients across e-commerce, healthcare, and logistics domains.',
    tech: ['Go', 'Node.js', 'PostgreSQL', 'REST', 'Vue.js'],
  },
]

export const blogPosts = [
  {
    id: 1,
    title: 'Designing for Failure: Retry Patterns in Go Microservices',
    excerpt:
      'How to implement robust retry logic with exponential backoff, jitter, and circuit breakers without drowning your downstream services.',
    category: 'tech',
    date: 'Apr 12, 2025',
    readTime: '8 min read',
    slug: 'retry-patterns-go',
    featured: true,
    body: retryPatternsGo,
  },
  {
    id: 2,
    title: 'Reksadana vs ETF: Mana yang Cocok untuk Kamu?',
    excerpt:
      'Perbandingan mendalam antara reksa dana konvensional dan ETF — dari biaya, likuiditas, hingga strategi alokasi portofolio jangka panjang.',
    category: 'finance',
    date: 'Mar 28, 2025',
    readTime: '6 min read',
    slug: 'reksadana-vs-etf',
    featured: true,
    body: reksadanaVsEtf,
  },
  {
    id: 3,
    title: 'Context Propagation in Go: The Right Way',
    excerpt:
      'A deep dive into how Go contexts should flow through your application layers — and the subtle bugs that happen when they do not.',
    category: 'tech',
    date: 'Mar 5, 2025',
    readTime: '10 min read',
    slug: 'context-propagation-go',
    featured: false,
    body: contextPropagationGo,
  },
  {
    id: 4,
    title: 'Membangun Dana Darurat dengan Gaji Software Engineer',
    excerpt:
      'Strategi praktis mengalokasikan sebagian penghasilan untuk dana darurat yang cukup — tanpa harus mengorbankan investasi jangka panjang.',
    category: 'finance',
    date: 'Feb 14, 2025',
    readTime: '5 min read',
    slug: 'dana-darurat-software-engineer',
    featured: false,
    body: danaDaruratEngineer,
  },
  {
    id: 5,
    title: 'PostgreSQL Query Planning: Reading EXPLAIN ANALYZE',
    excerpt:
      'How to actually read query plans and use them to eliminate slow queries — with real examples from production Go applications.',
    category: 'tech',
    date: 'Jan 30, 2025',
    readTime: '12 min read',
    slug: 'postgres-explain-analyze',
    featured: false,
    body: postgresExplainAnalyze,
  },
  {
    id: 6,
    title: 'Dollar-Cost Averaging di Pasar yang Volatil',
    excerpt:
      'Mengapa DCA tetap menjadi strategi yang relevan bahkan di tengah volatilitas pasar — dan bagaimana mengotomatisasinya.',
    category: 'finance',
    date: 'Jan 10, 2025',
    readTime: '7 min read',
    slug: 'dca-pasar-volatil',
    featured: false,
    body: dcaPasarVolatil,
  },
]
