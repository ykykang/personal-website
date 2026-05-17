import { useState } from 'react'
import { Link } from 'react-router-dom'
import { blogPosts } from '../data/content'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { ArrowUpRight } from 'lucide-react'

function PostCard({ post }) {
  const ref = useScrollReveal()
  return (
    <Link
      to={`/blog/${post.slug}`}
      ref={ref}
      className="group block py-8 border-b border-mist/40 dark:border-white/5 hover:pl-2 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-3">
        <span
          className={`font-mono text-xs px-2 py-0.5 ${
            post.category === 'tech'
              ? 'bg-accent text-white'
              : 'bg-ink dark:bg-chalk text-chalk dark:text-ink'
          }`}
        >
          {post.category === 'tech' ? 'Tech' : 'Finance'}
        </span>
        {post.featured && (
          <span className="font-mono text-xs px-2 py-0.5 border border-mist/60 dark:border-white/10 text-stone/60">
            Featured
          </span>
        )}
        <span className="font-mono text-xs text-stone/50">{post.date}</span>
        <span className="font-mono text-xs text-stone/40">·</span>
        <span className="font-mono text-xs text-stone/50">{post.readTime}</span>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl mb-2 group-hover:text-stone transition-colors">{post.title}</h3>
          <p className="font-body text-sm text-stone leading-relaxed">{post.excerpt}</p>
        </div>
        <ArrowUpRight
          size={16}
          className="text-mist group-hover:text-ink dark:group-hover:text-chalk transition-colors mt-1 flex-shrink-0"
        />
      </div>
    </Link>
  )
}

export default function Blog() {
  const [filter, setFilter] = useState('all')
  const filtered = blogPosts.filter((p) => filter === 'all' || p.category === filter)

  return (
    <main className="max-w-5xl mx-auto px-6 pt-36 pb-32">
      <p className="font-mono text-xs text-stone/60 tracking-widest uppercase mb-4">Writing</p>
      <h1 className="font-display text-5xl md:text-6xl mb-4">Blog</h1>
      <p className="font-body text-stone mb-12 max-w-md">
        Thoughts on software engineering, distributed systems, personal finance, and the occasional
        rant about code review culture.
      </p>

      {/* Filter */}
      <div className="flex gap-2 mb-10">
        {[
          { key: 'all', label: 'All Posts' },
          { key: 'tech', label: 'Tech' },
          { key: 'finance', label: 'Finance' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`font-mono text-xs px-4 py-2 border transition-all ${
              filter === key
                ? 'bg-ink dark:bg-chalk text-chalk dark:text-ink border-ink dark:border-chalk'
                : 'border-mist/60 dark:border-white/10 text-stone hover:border-ink dark:hover:border-chalk hover:text-ink dark:hover:text-chalk'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div>
        {filtered.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="font-body text-stone text-center py-20">No posts found.</p>
      )}
    </main>
  )
}
