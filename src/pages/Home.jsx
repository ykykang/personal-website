import { Link } from 'react-router-dom'
import { ArrowRight, GitFork, Link2, Mail, ArrowUpRight, ExternalLink } from 'lucide-react'
import { projects, blogPosts } from '../data/content'
import { useScrollReveal } from '../hooks/useScrollReveal'

const featuredProjects = projects.filter((p) => p.featured)
const featuredPosts = blogPosts.filter((p) => p.featured)

function FeaturedProjectCard({ project }) {
  const ref = useScrollReveal()
  return (
    <div
      ref={ref}
      className="border border-mist/40 dark:border-white/5 p-7 hover:border-ink/30 dark:hover:border-white/20 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-stone/60">{project.year}</span>
          <span className="font-mono text-xs text-stone/40">·</span>
          <span className="font-mono text-xs text-stone/60">{project.status}</span>
        </div>
        {project.link !== '#' && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone hover:text-ink dark:hover:text-chalk transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={13} />
          </a>
        )}
      </div>
      <h3 className="font-display text-xl mb-3 group-hover:text-stone transition-colors">
        {project.title}
      </h3>
      <p className="font-body text-sm text-stone leading-relaxed mb-5">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="font-mono text-xs px-2 py-1 bg-chalk-dark dark:bg-ink-light text-stone"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

function FeaturedPostCard({ post }) {
  const ref = useScrollReveal()
  return (
    <Link
      to={`/blog/${post.slug}`}
      ref={ref}
      className="group block p-7 border border-mist/40 dark:border-white/5 hover:border-ink/30 dark:hover:border-white/20 transition-all duration-300"
    >
      <div className="flex items-center gap-2 mb-4">
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
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl mb-2 group-hover:text-stone transition-colors">
            {post.title}
          </h3>
          <p className="font-body text-sm text-stone leading-relaxed">{post.excerpt}</p>
        </div>
        <ArrowUpRight
          size={15}
          className="text-mist group-hover:text-ink dark:group-hover:text-chalk transition-colors mt-1 flex-shrink-0"
        />
      </div>
    </Link>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-40 pb-32">
        <div className="grid md:grid-cols-[1fr_auto] gap-16 items-start">
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-xs text-stone tracking-widest uppercase">
                Available for opportunities
              </span>
            </div>

            {/* Name */}
            <h1 className="font-display text-5xl md:text-7xl leading-[1.05] tracking-tight mb-6 animate-fade-up">
              Ahmad
              <br />
              Haidar
              <br />
              <span className="text-stone">Albaqir</span>
            </h1>

            {/* Role */}
            <p className="font-mono text-sm text-stone mb-8 animate-fade-up animate-delay-100">
              Software Engineer -- Go Backend Developer
            </p>

            {/* Description */}
            <p className="font-body text-base text-stone leading-relaxed max-w-md mb-12 animate-fade-up animate-delay-200">
              I build scalable, high-performance backend systems that handle millions of requests
              without breaking a sweat. Clean code, clean architecture, meaningful abstractions.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-fade-up animate-delay-300">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 bg-ink dark:bg-chalk text-chalk dark:text-ink px-6 py-3 text-sm font-body font-medium hover:opacity-80 transition-opacity"
              >
                View Projects <ArrowRight size={14} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-mist dark:border-white/10 text-ink dark:text-chalk px-6 py-3 text-sm font-body hover:border-ink dark:hover:border-chalk transition-colors"
              >
                Get in Touch
              </Link>
            </div>

            {/* Social */}
            <div className="flex items-center gap-5 mt-12 animate-fade-up animate-delay-400">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone hover:text-ink dark:hover:text-chalk transition-colors"
              >
                <GitFork size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone hover:text-ink dark:hover:text-chalk transition-colors"
              >
                <Link2 size={18} />
              </a>
              <a
                href="mailto:haidar@example.com"
                className="text-stone hover:text-ink dark:hover:text-chalk transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Avatar placeholder */}
          <div className="hidden md:block animate-fade-in animate-delay-300">
            <div className="w-64 h-64 bg-chalk-dark dark:bg-ink-light border border-mist/40 dark:border-white/5 relative">
              <div className="absolute inset-4 border border-mist/40 dark:border-white/5" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-mono text-xs text-stone text-center">AH</p>
              </div>
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t border-r border-ink dark:border-chalk" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b border-l border-ink dark:border-chalk" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-mist/40 dark:border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: '5+', label: 'Years of Experience' },
            { num: '20+', label: 'Projects Shipped' },
            { num: '50k+', label: 'Concurrent Users Served' },
            { num: '3', label: 'Open Source Repos' },
          ].map(({ num, label }) => (
            <div key={label}>
              <p className="font-display text-4xl mb-1">{num}</p>
              <p className="font-body text-sm text-stone">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-mono text-xs text-stone/60 tracking-widest uppercase mb-2">
              Selected Work
            </p>
            <h2 className="font-display text-3xl md:text-4xl">Featured Projects</h2>
          </div>
          <Link
            to="/projects"
            className="hidden md:inline-flex items-center gap-2 font-mono text-xs text-stone hover:text-ink dark:hover:text-chalk transition-colors"
          >
            All Projects <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {featuredProjects.map((project) => (
            <FeaturedProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-6 md:hidden">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs text-stone hover:text-ink dark:hover:text-chalk transition-colors"
          >
            All Projects <ArrowRight size={12} />
          </Link>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="border-t border-mist/40 dark:border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-mono text-xs text-stone/60 tracking-widest uppercase mb-2">
                From the Blog
              </p>
              <h2 className="font-display text-3xl md:text-4xl">Artikel Pilihan</h2>
            </div>
            <Link
              to="/blog"
              className="hidden md:inline-flex items-center gap-2 font-mono text-xs text-stone hover:text-ink dark:hover:text-chalk transition-colors"
            >
              All Posts <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {featuredPosts.map((post) => (
              <FeaturedPostCard key={post.id} post={post} />
            ))}
          </div>

          <div className="mt-6 md:hidden">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 font-mono text-xs text-stone hover:text-ink dark:hover:text-chalk transition-colors"
            >
              All Posts <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* Tech strip */}
      <section className="border-t border-mist/40 dark:border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p className="font-mono text-xs text-stone/60 tracking-widest uppercase mb-8">
            Core Stack
          </p>
          <div className="flex flex-wrap gap-3">
            {['Go', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'Kubernetes', 'gRPC', 'REST', 'AWS', 'Grafana'].map(
              (tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs px-3 py-1.5 border border-mist/60 dark:border-white/10 text-stone hover:border-ink dark:hover:border-chalk hover:text-ink dark:hover:text-chalk transition-all cursor-default"
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
