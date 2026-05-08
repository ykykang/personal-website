import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { blogPosts } from '../data/content'

// Syntax highlighting via highlight.js (loaded from CDN in index.html)
// We use a simple inline approach to keep dependencies minimal
function CodeBlock({ inline, className, children, ...props }) {
  const match = /language-(\w+)/.exec(className || '')
  const lang = match ? match[1] : ''

  if (inline) {
    return (
      <code
        className="font-mono text-sm bg-chalk-dark dark:bg-ink-light px-1.5 py-0.5 rounded text-ink dark:text-chalk"
        {...props}
      >
        {children}
      </code>
    )
  }

  return (
    <div className="my-6 overflow-x-auto">
      {lang && (
        <div className="flex items-center justify-between px-4 py-2 bg-ink dark:bg-chalk/5 border-b border-white/10">
          <span className="font-mono text-xs text-stone/70">{lang}</span>
        </div>
      )}
      <pre className="bg-ink-light dark:bg-[#0a0a0a] p-5 overflow-x-auto">
        <code className="font-mono text-sm text-chalk/90 leading-relaxed" {...props}>
          {children}
        </code>
      </pre>
    </div>
  )
}

const components = {
  code: CodeBlock,
  h2: ({ children }) => (
    <h2 className="font-display text-2xl md:text-3xl mt-12 mb-4 text-ink dark:text-chalk">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-body font-medium text-xl mt-8 mb-3 text-ink dark:text-chalk">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="font-body text-base leading-[1.85] text-ink/80 dark:text-chalk/80 mb-5">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="my-4 space-y-2 pl-5">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 space-y-2 pl-5 list-decimal">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="font-body text-base text-ink/80 dark:text-chalk/80 leading-relaxed flex gap-2">
      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-stone flex-shrink-0" />
      <span>{children}</span>
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-ink dark:border-chalk pl-5 my-6 italic text-stone">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse font-body text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-mist dark:border-white/10">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="text-left py-2 pr-6 font-medium text-ink dark:text-chalk font-body">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="py-2 pr-6 text-stone border-b border-mist/30 dark:border-white/5">
      {children}
    </td>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-ink dark:text-chalk underline underline-offset-2 hover:text-stone transition-colors"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-medium text-ink dark:text-chalk">{children}</strong>
  ),
  hr: () => <hr className="border-mist/40 dark:border-white/5 my-10" />,
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-6 pt-36 pb-32 text-center">
        <p className="font-body text-stone mb-6">Post not found.</p>
        <Link to="/blog" className="font-mono text-xs text-ink dark:text-chalk underline">
          Back to Blog
        </Link>
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto px-6 pt-36 pb-32">
      {/* Back */}
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 font-mono text-xs text-stone hover:text-ink dark:hover:text-chalk transition-colors mb-16"
      >
        <ArrowLeft size={12} /> Back to Blog
      </Link>

      {/* Header */}
      <header className="mb-12 animate-fade-up">
        <div className="flex items-center gap-3 mb-5">
          <span
            className={`font-mono text-xs px-2 py-0.5 ${
              post.category === 'tech'
                ? 'bg-chalk-dark dark:bg-ink-light text-stone'
                : 'bg-ink dark:bg-chalk text-chalk dark:text-ink'
            }`}
          >
            {post.category === 'tech' ? 'Tech' : 'Finance'}
          </span>
          <span className="font-mono text-xs text-stone/50">{post.date}</span>
          <span className="font-mono text-xs text-stone/40">·</span>
          <span className="font-mono text-xs text-stone/50">{post.readTime}</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl leading-[1.1] mb-6">{post.title}</h1>
        <p className="font-body text-base text-stone leading-relaxed">{post.excerpt}</p>
        <div className="border-t border-mist/40 dark:border-white/5 mt-10" />
      </header>

      {/* Markdown Body */}
      <article className='animate-fade-up'>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {post.body}
        </ReactMarkdown>
      </article>

      {/* Footer nav */}
      <div className="border-t border-mist/40 dark:border-white/5 mt-16 pt-10 flex items-center justify-between">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs text-stone hover:text-ink dark:hover:text-chalk transition-colors"
        >
          <ArrowLeft size={12} /> All Posts
        </Link>
        <span className="font-mono text-xs text-stone/40">{post.readTime}</span>
      </div>
    </main>
  )
}
