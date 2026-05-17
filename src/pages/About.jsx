import { useScrollReveal } from '../hooks/useScrollReveal'
import { experiences } from '../data/content'
import { trackEvent } from '../utils/analytics'

function ExpItem({ exp }) {
  const ref = useScrollReveal()
  return (
    <div
      ref={ref}
      className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-12 py-10 border-b border-mist/40 dark:border-white/5 last:border-0"
    >
      <div>
        <p className="font-mono text-xs text-stone/60 tracking-wide">{exp.period}</p>
      </div>
      <div>
        <p className="font-body font-medium text-base mb-1">{exp.role}</p>
        <p className="font-body text-stone text-sm mb-4">{exp.company}</p>
        <p className="font-body text-sm text-stone leading-relaxed mb-5">{exp.description}</p>
        <div className="flex flex-wrap gap-2">
          {exp.tech.map((t) => (
            <span key={t} className="font-mono text-xs px-2 py-1 bg-chalk-dark dark:bg-ink-light text-stone">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function About() {
  const r1 = useScrollReveal()
  const r2 = useScrollReveal()
  const r3 = useScrollReveal()

  return (
    <main className="max-w-5xl mx-auto px-6 pt-36 pb-32">
      <p className="font-mono text-xs text-stone/60 tracking-widest uppercase mb-4 opacity-0-init animate-fade-up">
        About
      </p>
      <h1 className="font-display text-5xl md:text-6xl mb-20 opacity-0-init animate-fade-up animate-delay-100">
        About Me
      </h1>

      <div className="grid md:grid-cols-2 gap-20">
        {/* Bio */}
        <div ref={r1} className="space-y-5">
          <p className="font-body text-base leading-relaxed text-ink/80 dark:text-chalk/80">
            Hi, I'm <strong>Ahmad Haidar Albaqir</strong> — a software engineer based in Indonesia with a
            deep focus on backend systems. I've been programming professionally for over 4 years,
            and I still find it the most satisfying tool for building reliable, fast infrastructure.
          </p>
          <p className="font-body text-base leading-relaxed text-stone">
            My engineering philosophy centers around simplicity. I believe complex problems can
            almost always be solved with well-structured, readable code — and that premature
            optimization is the real enemy of good systems.
          </p>
          <p className="font-body text-base leading-relaxed text-stone">
            Beyond the terminal, I write about software, personal finance, and the intersection
            of both — because building wealth and building software have more in common than you'd
            think.
          </p>
        </div>

        {/* Details */}
        <div ref={r2} className="space-y-10">
          <div>
            <p className="font-mono text-xs text-stone/60 tracking-widest uppercase mb-4">Education</p>
            <div className="space-y-4">
              <div>
                <p className="font-body font-medium">S1 Teknik Informatika</p>
                <p className="font-body text-sm text-stone">Universitas Pamulang · 2020 — 2024</p>
              </div>
              <div>
                <p className="font-body font-medium">Software Engineering</p>
                <p className="font-body text-sm text-stone">SMK Negeri 1 Karawang · 2016 — 2019</p>
              </div>
            </div>
          </div>
          <div>
            <p className="font-mono text-xs text-stone/60 tracking-widest uppercase mb-4">Location</p>
            <p className="font-body">Jakarta, Indonesia</p>
          </div>
          <div>
            <p className="font-mono text-xs text-stone/60 tracking-widest uppercase mb-4">Languages</p>
            <p className="font-body text-sm text-stone">Indonesian (native) · English (Limited working proficiency)</p>
          </div>
          <div>
            <p className="font-mono text-xs text-stone/60 tracking-widest uppercase mb-4">Interests</p>
            <p className="font-body text-sm text-stone">Backend Engineering · Personal Finance - Writing</p>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="border-t border-mist/40 dark:border-white/5 my-20" />
      <div ref={r3}>
        <p className="font-mono text-xs text-stone/60 tracking-widest uppercase mb-8">Technical Skills</p>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { area: 'Languages', items: ['Go', 'PHP', 'Python', 'TypeScript', 'JavaScript'] },
            { area: 'Backend & Architecture', items: ['Microservices', 'REST API', 'GraphQL', 'WebSocket', 'Event-Driven Architecture'] },
            { area: 'Data & Messaging', items: ['Elasticsearch', 'Apache Kafka', 'MySQL', 'Redis'] },
            { area: 'Frontend', items: ['Vue.js', 'Nuxt.js', 'React.js'] },
            { area: 'Frameworks', items: ['Laravel', 'CodeIgniter'] },
            { area: 'Practices', items: ['Clean Code', 'SOLID Principles', 'Unit Testing', 'System Design', 'TSD'] },
          ].map(({ area, items }) => (
            <div key={area}>
              <p className="font-body font-medium text-sm mb-3">{area}</p>
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={item} className="font-body text-sm text-stone flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-mist dark:bg-stone/50 inline-block" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="border-t border-mist/40 dark:border-white/5 my-20" />
      <p className="font-mono text-xs text-accent tracking-widest uppercase mb-12">Experience</p>
      <div>
        {experiences.map((exp) => (
          <ExpItem key={exp.id} exp={exp} />
        ))}
      </div>

      {/* CV */}
      <div className="mt-16 pt-16 border-t border-mist/40 dark:border-white/5">
        <p className="font-body text-stone mb-6">Want the full picture?</p>
        <a
          target="_blank"
          href="https://docs.google.com/document/d/12qDdMS3eRL0wrpRWYSu-cb2fdXRVFwVo"
          onClick={() => trackEvent('cv_download')}
          className="inline-flex items-center gap-2 border border-mist dark:border-white/10 text-ink dark:text-chalk px-6 py-3 text-sm font-body hover:border-ink dark:hover:border-chalk transition-colors"
        >
          Download CV / Résumé
        </a>
      </div>
    </main>
  )
}
