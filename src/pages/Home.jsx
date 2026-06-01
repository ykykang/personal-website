import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { projects, blogPosts } from '../data/content'
import { siteConfig } from '../data/config'
import { useScrollReveal } from '../hooks/useScrollReveal'

const featuredProjects = projects.filter((p) => p.featured)
const featuredPosts = blogPosts.filter((p) => p.featured)

const projectAccents = [
  'bg-accent-muted text-accent',
  'bg-[#FFF4D6] text-[#8A5A00] dark:bg-[#3A2D10] dark:text-[#F5D06F]',
  'bg-[#E8F7F1] text-[#1F7A55] dark:bg-[#123228] dark:text-[#8DE0BC]',
]

const postAccents = {
  tech: 'bg-accent text-white',
  finance: 'bg-[#F3E8FF] text-[#6D28D9] dark:bg-[#2A173D] dark:text-[#D8B4FE]',
}

const postLabels = {
  tech: 'Engineering',
  finance: 'Finance',
}

const currentLearning = ['Kafka internals', 'Database indexing', 'Financial planning']

function ProjectRow({ project, index }) {
  const ref = useScrollReveal()
  const accent = projectAccents[(index - 1) % projectAccents.length]

  return (
    <Link
      to={`/projects/${project.slug}`}
      ref={ref}
      className="group grid grid-cols-[2rem_1fr_auto] gap-6 border-t border-mist/40 dark:border-white/5 py-7 items-start transition-colors duration-200 hover:border-accent/40"
    >
      <span className={`font-mono text-xs pt-0.5 h-fit px-1.5 py-0.5 ${accent}`}>0{index}</span>
      <div>
        <h3 className="font-display text-xl mb-1.5 group-hover:text-accent transition-colors duration-200">
          {project.title}
        </h3>
        <p className="font-body text-sm text-stone leading-relaxed mb-3">{project.description}</p>
        <div className="flex flex-wrap gap-3">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="font-mono text-xs text-stone/50 transition-colors duration-200 group-hover:text-stone">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="text-right shrink-0 pt-0.5">
        <p className="font-mono text-xs text-stone/50">{project.year}</p>
        <p className="font-mono text-xs text-stone/35 mt-1">{project.status}</p>
      </div>
    </Link>
  )
}

function PostRow({ post }) {
  const ref = useScrollReveal()
  const badgeClass = postAccents[post.category] || 'bg-ink dark:bg-chalk text-chalk dark:text-ink'
  const label = postLabels[post.category] || post.category

  return (
    <div ref={ref} className="border-t border-mist/40 dark:border-white/5">
      <Link
        to={`/blog/${post.slug}`}
        className="group grid grid-cols-[auto_1fr_auto] gap-6 py-5 items-center transition-colors duration-200 hover:border-accent"
      >
        <span className="font-mono text-xs text-stone/40 w-14 shrink-0">{post.date.split(',')[0]}</span>
        <div className="flex items-center gap-3 min-w-0">
          <span className={`font-mono text-[10px] px-1.5 py-0.5 shrink-0 ${badgeClass}`}>
            {label}
          </span>
          <span className="font-body text-sm group-hover:text-accent transition-colors duration-200 truncate">
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

        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-b border-mist/40 dark:border-white/5 pb-16">
          <div className="absolute -left-4 top-4 h-24 w-24 rounded-full bg-accent-muted blur-3xl dark:bg-accent/20" />
          <div className="absolute left-40 bottom-16 h-20 w-20 rounded-full bg-[#FFF4D6] blur-3xl dark:bg-[#3A2D10]" />
          <h1
            className="relative font-display leading-[0.88] tracking-tight opacity-0-init animate-fade-up animate-delay-100"
            style={{ fontSize: 'clamp(4.5rem, 11vw, 7.5rem)' }}
          >
            Ahmad
            <br />
            Haidar
            <br />
            <span className="text-accent">Albaqir</span>
          </h1>

          <div className="relative flex flex-col gap-3 pb-1 opacity-0-init animate-fade-up animate-delay-200">
           
            <Link
              to="/projects"
              className="group/link font-mono text-xs text-stone hover:text-accent transition-colors flex items-center gap-1.5"
            >
              View work
              <ArrowUpRight
                size={11}
                className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
              />
            </Link>
            <Link
              to="/contact"
              className="group/link font-mono text-xs text-stone hover:text-accent transition-colors flex items-center gap-1.5"
            >
              Get in touch
              <ArrowUpRight
                size={11}
                className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-6 opacity-0-init animate-fade-up animate-delay-300">
          <span className="font-mono text-xs text-stone/50">Currently learning</span>
          {currentLearning.map((item, index) => (
            <span
              key={item}
              className="learning-chip font-mono text-[10px] px-2 py-1 bg-accent-muted text-accent dark:bg-accent/20 dark:text-blue-200"
              style={{ animationDelay: `${420 + index * 90}ms` }}
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-20">
        <div className="flex items-baseline justify-between mb-2">
          <p className="font-mono text-xs text-accent tracking-widest uppercase">01 — Projects</p>
          <Link
            to="/projects"
            className="group/link font-mono text-xs text-stone/40 hover:text-accent transition-colors inline-flex items-center gap-1"
          >
            All
            <ArrowUpRight
              size={11}
              className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
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
          <p className="font-mono text-xs text-[#6D28D9] dark:text-[#D8B4FE] tracking-widest uppercase">02 — Writing</p>
          <Link
            to="/blog"
            className="group/link font-mono text-xs text-stone/40 hover:text-accent transition-colors inline-flex items-center gap-1"
          >
            All
            <ArrowUpRight
              size={11}
              className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
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
