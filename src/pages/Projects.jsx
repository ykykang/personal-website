import { ExternalLink } from 'lucide-react'
import { projects } from '../data/content'
import { useScrollReveal } from '../hooks/useScrollReveal'

function ProjectCard({ project }) {
  const ref = useScrollReveal()
  return (
    <div
      ref={ref}
      className="border border-mist/40 dark:border-white/5 p-8 hover:border-ink/30 dark:hover:border-white/20 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <span className="font-mono text-xs text-stone/60 tracking-widest">{project.year}</span>
          <span className="font-mono text-xs text-stone/40 mx-2">·</span>
          <span className="font-mono text-xs text-stone/60">{project.status}</span>
        </div>
        {project.link !== '#' && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone hover:text-ink dark:hover:text-chalk transition-colors"
          >
            <ExternalLink size={14} />
          </a>
        )}
      </div>

      <h3 className="font-display text-2xl mb-3 group-hover:text-stone transition-colors">
        {project.title}
      </h3>
      <p className="font-body text-sm text-stone leading-relaxed mb-6">{project.description}</p>

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

export default function Projects() {
  return (
    <main className="max-w-5xl mx-auto px-6 pt-36 pb-32">
      <p className="font-mono text-xs text-stone/60 tracking-widest uppercase mb-4">Work</p>
      <h1 className="font-display text-5xl md:text-6xl mb-4">Projects</h1>
      <p className="font-body text-stone mb-16 max-w-md">
        A selection of systems I've built, architected, or contributed to — from open-source
        tools to production workloads.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </main>
  )
}
