import { parseProjectMd } from '../utils/parseProject'
import { parseBlogPostMd } from '../utils/parseBlogPost'

const projectFiles = import.meta.glob('./projects/*.md', { query: '?raw', import: 'default', eager: true })

export const projects = Object.entries(projectFiles)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, raw], i) => ({ id: i + 1, ...parseProjectMd(raw) }))
  .filter(Boolean)

export const experiences = [
  {
    id: 1,
    company: 'LOKET',
    role: 'Software Engineer',
    period: 'July 2021 — Present',
    description:
      'Contributed to backend systems powering one of Indonesia\'s leading event ticketing platforms. Re-architected the search service using Golang and Elasticsearch, built a virtual waiting room to handle traffic spikes, and designed a payment recharge mechanism to recover failed transactions during gateway timeouts. Migrated legacy PHP monolith services to Golang-based microservices.',
    tech: ['Go', 'Elasticsearch', 'Apache Kafka', 'Vue.js', 'Python', 'Laravel'],
  },
  {
    id: 2,
    company: 'Lenna.ai',
    role: 'Fullstack Developer',
    period: 'April 2020 — July 2021',
    description:
      'Built omnichannel communication and AI-powered chatbot platforms for enterprise clients. Reduced critical chat API response time from ~3s to under 100ms through query optimization and caching. Implemented real-time WebSocket features, expanded unit test coverage, and developed frontend applications including a smart KIOSK app and IKEA booking system.',
    tech: ['Go', 'Vue.js', 'Nuxt.js', 'React.js', 'GraphQL', 'WebSocket', 'REST API'],
  },
]

const postFiles = import.meta.glob('./posts/*.md', { query: '?raw', import: 'default', eager: true })

export const blogPosts = Object.entries(postFiles)
  .map(([path, raw]) => parseBlogPostMd(raw, path))
  .filter(Boolean)
  .sort((a, b) => new Date(b.date) - new Date(a.date))
