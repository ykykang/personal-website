import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { projects } from '../data/content'
import { trackEvent } from '../utils/analytics'

function CodeBlock({ inline, className, children, ...props }) {
  const match = /language-(\w+)/.exec(className || '')
  const lang = match ? match[1] : ''

  if (inline) {
    return (
      <code
        className="font-mono text-sm bg-chalk-dark dark:bg-ink-light px-1.5 py-0.5 text-ink dark:text-chalk"
        {...props}
      >
        {children}
      </code>
    )
  }

  return (
    <div className="my-6 overflow-x-auto">
      {lang && (
        <div className="px-4 py-2 bg-ink dark:bg-chalk/5 border-b border-white/10">
          <span className="font-mono text-xs text-stone/70">{lang}</span>
        </div>
      )}
      <pre className="p-4 bg-ink dark:bg-chalk/5 overflow-x-auto">
        <code className="font-mono text-sm text-chalk dark:text-chalk/90 leading-relaxed">
          {children}
        </code>
      </pre>
    </div>
  )
}

const mdComponents = {
  code: CodeBlock,
  h2: ({ children }) => (
    <h2 className="font-display text-2xl mt-10 mb-4">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-body font-medium text-lg mt-8 mb-3">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="font-body text-base text-stone leading-relaxed mb-5">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="space-y-2 mb-5 ml-4">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="space-y-2 mb-5 ml-4 list-decimal">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="font-body text-sm text-stone leading-relaxed flex items-start gap-2">
      <span className="text-accent mt-1.5 shrink-0">—</span>
      <span>{children}</span>
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-accent pl-4 my-6 italic text-stone">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => (
    <strong className="font-medium text-ink dark:text-chalk">{children}</strong>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full font-mono text-xs border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="text-left px-4 py-2 bg-chalk-dark dark:bg-ink-light font-medium border border-mist/40 dark:border-white/5">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2 border border-mist/40 dark:border-white/5 text-stone">{children}</td>
  ),
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  useEffect(() => {
    if (!project) return
    trackEvent('project_page_view', { project_slug: project.slug, project_title: project.title })
  }, [project?.slug])

  if (!project) {
    return (
      <main className="max-w-3xl mx-auto px-6 pt-36 pb-32 text-center">
        <p className="font-body text-stone mb-6">Project not found.</p>
        <Link to="/projects" className="font-mono text-xs text-ink dark:text-chalk underline">
          Back to Projects
        </Link>
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto px-6 pt-36 pb-32">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 font-mono text-xs text-stone hover:text-ink dark:hover:text-chalk transition-colors mb-16"
      >
        <ArrowLeft size={12} /> Back to Projects
      </Link>

      <header className="mb-12 animate-fade-up">
        <div className="flex items-center gap-3 mb-5">
          <span className="font-mono text-xs text-stone/50">{project.year}</span>
          <span className="font-mono text-xs text-stone/30">·</span>
          <span className="font-mono text-xs text-stone/50">{project.status}</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl leading-tight mb-6">{project.title}</h1>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="font-mono text-xs px-2 py-1 bg-chalk-dark dark:bg-ink-light text-stone">
                {t}
              </span>
            ))}
          </div>
          {project.link !== '#' && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('project_link_click', { project_title: project.title, url: project.link })}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-stone hover:text-accent transition-colors"
            >
              View project <ExternalLink size={11} />
            </a>
          )}
        </div>
      </header>

      <article className="animate-fade-up animate-delay-100">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
          {project.body}
        </ReactMarkdown>
      </article>
    </main>
  )
}
