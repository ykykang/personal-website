import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { projects, blogPosts } from '../data/content'
import { siteConfig } from '../data/config'
import { useScrollReveal } from '../hooks/useScrollReveal'

const featuredProjects = projects.filter((p) => p.featured)
const featuredPosts = blogPosts.filter((p) => p.featured)

function ProjectRow({ project, index }) {
  const ref = useScrollReveal()
  return (
    <div
      ref={ref}
      className="group grid grid-cols-[2rem_1fr_auto] gap-6 border-t border-mist/40 dark:border-white/5 py-7 items-start"
    >
      <span className="font-mono text-xs text-accent pt-0.5">0{index}</span>
      <div>
        <h3 className="font-display text-xl mb-1.5 group-hover:text-stone transition-colors duration-200">
          {project.title}
        </h3>
        <p className="font-body text-sm text-stone leading-relaxed mb-3">{project.description}</p>
        <div className="flex flex-wrap gap-3">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="font-mono text-xs text-stone/50">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="text-right shrink-0 pt-0.5">
        <p className="font-mono text-xs text-stone/50">{project.year}</p>
        <p className="font-mono text-xs text-stone/35 mt-1">{project.status}</p>
      </div>
    </div>
  )
}

function PostRow({ post }) {
  const ref = useScrollReveal()
  return (
    <div ref={ref} className="border-t border-mist/40 dark:border-white/5">
      <Link
        to={`/blog/${post.slug}`}
        className="group grid grid-cols-[auto_1fr_auto] gap-6 py-5 items-center"
      >
        <span className="font-mono text-xs text-stone/40 w-14 shrink-0">{post.date.split(',')[0]}</span>
        <div className="flex items-center gap-3 min-w-0">
          <span
            className={`font-mono text-[10px] px-1.5 py-0.5 shrink-0 ${
              post.category === 'tech'
                ? 'bg-accent text-white'
                : 'bg-ink dark:bg-chalk text-chalk dark:text-ink'
            }`}
          >
            {post.category.toUpperCase()}
          </span>
          <span className="font-body text-sm group-hover:text-stone transition-colors duration-200 truncate">
            {post.title}
          </span>
        </div>
        <ArrowUpRight
          size={13}
          className="text-mist group-hover:text-accent transition-colors duration-200 shrink-0"
        />
      </Link>
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-40 pb-0">
        <div className="mb-8 flex items-center justify-between">
          <p className="font-mono text-xs text-stone/50 tracking-widest uppercase animate-fade-in">
            Backend engineer · Go · Jakarta, Indonesia
          </p>
          <div className="flex items-center gap-2 animate-fade-in">
            <span
              className={`w-1.5 h-1.5 rounded-full ${siteConfig.available ? 'bg-green-400' : 'bg-stone/40'}`}
            />
            <span className="font-mono text-xs text-stone/50">
              {siteConfig.availabilityNote}
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-b border-mist/40 dark:border-white/5 pb-16">
          <h1
            className="font-display leading-[0.88] tracking-tight opacity-0-init animate-fade-up animate-delay-100"
            style={{ fontSize: 'clamp(4.5rem, 11vw, 7.5rem)' }}
          >
            Ahmad
            <br />
            Haidar
            <br />
            <span className="text-stone">Albaqir</span>
          </h1>

          <div className="flex flex-row md:flex-col gap-6 md:gap-3 pb-1 opacity-0-init animate-fade-up animate-delay-200">
            <Link
              to="/projects"
              className="font-mono text-xs text-stone hover:text-ink dark:hover:text-chalk transition-colors flex items-center gap-1.5"
            >
              View work <ArrowUpRight size={11} />
            </Link>
            <Link
              to="/contact"
              className="font-mono text-xs text-stone hover:text-ink dark:hover:text-chalk transition-colors flex items-center gap-1.5"
            >
              Get in touch <ArrowUpRight size={11} />
            </Link>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-20">
        <div className="flex items-baseline justify-between mb-2">
          <p className="font-mono text-xs text-stone/40 tracking-widest uppercase">01 — Projects</p>
          <Link
            to="/projects"
            className="font-mono text-xs text-stone/40 hover:text-ink dark:hover:text-chalk transition-colors"
          >
            All →
          </Link>
        </div>
        {featuredProjects.map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i + 1} />
        ))}
        <div className="border-t border-mist/40 dark:border-white/5" />
      </section>

      {/* Writing */}
      <section className="max-w-5xl mx-auto px-6 pb-32 border-t border-mist/40 dark:border-white/5 pt-16">
        <div className="flex items-baseline justify-between mb-2">
          <p className="font-mono text-xs text-stone/40 tracking-widest uppercase">02 — Writing</p>
          <Link
            to="/blog"
            className="font-mono text-xs text-stone/40 hover:text-ink dark:hover:text-chalk transition-colors"
          >
            All →
          </Link>
        </div>
        {featuredPosts.map((post) => (
          <PostRow key={post.id} post={post} />
        ))}
        <div className="border-t border-mist/40 dark:border-white/5" />
      </section>
    </main>
  )
}
