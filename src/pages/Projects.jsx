import { useState } from 'react'
import { ExternalLink, ChevronDown } from 'lucide-react'
import { projects } from '../data/content'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { trackEvent } from '../utils/analytics'

function ProjectCard({ project }) {
  const ref = useScrollReveal()
  const [expanded, setExpanded] = useState(false)

  function handleToggle() {
    const next = !expanded
    setExpanded(next)
    if (next) {
      trackEvent('project_detail_expand', { project_title: project.title })
    }
  }

  function handleExternalLink() {
    trackEvent('project_link_click', { project_title: project.title, url: project.link })
  }

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
            className="text-stone hover:text-accent transition-colors"
            onClick={handleExternalLink}
          >
            <ExternalLink size={14} />
          </a>
        )}
      </div>

      <h3 className="font-display text-2xl mb-3 group-hover:text-stone transition-colors">
        {project.title}
      </h3>
      <p className="font-body text-sm text-stone leading-relaxed mb-6">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((t) => (
          <span
            key={t}
            className="font-mono text-xs px-2 py-1 bg-chalk-dark dark:bg-ink-light text-stone"
          >
            {t}
          </span>
        ))}
      </div>

      {(project.background || project.bottleneck || project.achievements) && (
        <>
          <button
            onClick={handleToggle}
            className="flex items-center gap-1.5 font-mono text-xs text-stone/60 hover:text-accent transition-colors"
          >
            <ChevronDown
              size={13}
              className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            />
            {expanded ? 'Hide details' : 'Project details'}
          </button>

          {expanded && (
            <div className="mt-6 space-y-5 border-t border-mist/30 dark:border-white/5 pt-6">
              {project.background && (
                <div>
                  <p className="font-mono text-xs text-stone/50 tracking-widest uppercase mb-2">
                    Background
                  </p>
                  <p className="font-body text-sm text-stone leading-relaxed">
                    {project.background}
                  </p>
                </div>
              )}

              {project.bottleneck && (
                <div>
                  <p className="font-mono text-xs text-stone/50 tracking-widest uppercase mb-2">
                    Bottleneck
                  </p>
                  <p className="font-body text-sm text-stone leading-relaxed">
                    {project.bottleneck}
                  </p>
                </div>
              )}

              {project.achievements && project.achievements.length > 0 && (
                <div>
                  <p className="font-mono text-xs text-stone/50 tracking-widest uppercase mb-2">
                    Achievements
                  </p>
                  <ul className="space-y-1.5">
                    {project.achievements.map((a, i) => (
                      <li key={i} className="flex items-start gap-2 font-body text-sm text-stone">
                        <span className="font-mono text-stone/40 mt-0.5 shrink-0">—</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </>
      )}
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

      <div className="grid md:grid-cols-2 gap-6 items-start">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </main>
  )
}
