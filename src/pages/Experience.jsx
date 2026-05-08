import { experiences } from '../data/content'
import { useScrollReveal } from '../hooks/useScrollReveal'

function ExpItem({ exp, index }) {
  const ref = useScrollReveal()
  return (
    <div ref={ref} className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-12 py-10 border-b border-mist/40 dark:border-white/5 last:border-0">
      <div>
        <p className="font-mono text-xs text-stone/60 tracking-wide">{exp.period}</p>
      </div>
      <div>
        <p className="font-body font-medium text-base mb-1">{exp.role}</p>
        <p className="font-body text-stone text-sm mb-4">{exp.company}</p>
        <p className="font-body text-sm text-stone leading-relaxed mb-5">{exp.description}</p>
        <div className="flex flex-wrap gap-2">
          {exp.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-xs px-2 py-1 bg-chalk-dark dark:bg-ink-light text-stone"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <main className="max-w-5xl mx-auto px-6 pt-36 pb-32">
      <p className="font-mono text-xs text-stone/60 tracking-widest uppercase mb-4">Career</p>
      <h1 className="font-display text-5xl md:text-6xl mb-4">Experience</h1>
      <p className="font-body text-stone mb-16 max-w-md">
        Five years of building and shipping backend infrastructure across fintech, retail, and analytics.
      </p>

      <div>
        {experiences.map((exp, i) => (
          <ExpItem key={exp.id} exp={exp} index={i} />
        ))}
      </div>

      {/* Resume CTA */}
      <div className="mt-16 pt-16 border-t border-mist/40 dark:border-white/5">
        <p className="font-body text-stone mb-6">Want the full picture?</p>
        <a
          href="#"
          className="inline-flex items-center gap-2 border border-mist dark:border-white/10 text-ink dark:text-chalk px-6 py-3 text-sm font-body hover:border-ink dark:hover:border-chalk transition-colors"
        >
          Download CV / Résumé
        </a>
      </div>
    </main>
  )
}
