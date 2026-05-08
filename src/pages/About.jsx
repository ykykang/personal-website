import { useScrollReveal } from '../hooks/useScrollReveal'

export default function About() {
  const r1 = useScrollReveal()
  const r2 = useScrollReveal()
  const r3 = useScrollReveal()

  return (
    <main className="max-w-5xl mx-auto px-6 pt-36 pb-32">
      <p className="font-mono text-xs text-stone/60 tracking-widest uppercase mb-4">About</p>
      <h1 className="font-display text-5xl md:text-6xl mb-20">About Me</h1>

      <div className="grid md:grid-cols-2 gap-20">
        {/* Bio */}
        <div ref={r1} className="space-y-5">
          <p className="font-body text-base leading-relaxed text-ink/80 dark:text-chalk/80">
            Hi, I'm <strong>Ahmad Haidar Albaqir</strong> — a software engineer based in Indonesia with a
            deep focus on backend systems. I've been writing Go professionally for over 4 years,
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
            <p className="font-body font-medium">S1 Teknik Informatika</p>
            <p className="font-body text-sm text-stone">Universitas Indonesia · 2015 — 2019</p>
          </div>
          <div>
            <p className="font-mono text-xs text-stone/60 tracking-widest uppercase mb-4">Location</p>
            <p className="font-body">Jakarta, Indonesia</p>
          </div>
          <div>
            <p className="font-mono text-xs text-stone/60 tracking-widest uppercase mb-4">Languages</p>
            <p className="font-body text-sm text-stone">Indonesian (native) · English (professional)</p>
          </div>
          <div>
            <p className="font-mono text-xs text-stone/60 tracking-widest uppercase mb-4">Interests</p>
            <p className="font-body text-sm text-stone">Distributed systems · Personal finance · Running · Reading</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-mist/40 dark:border-white/5 my-20" />

      {/* Skills */}
      <div ref={r3}>
        <p className="font-mono text-xs text-stone/60 tracking-widest uppercase mb-8">Technical Skills</p>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              area: 'Languages',
              items: ['Go', 'SQL', 'Bash', 'TypeScript (basic)'],
            },
            {
              area: 'Infrastructure',
              items: ['Docker', 'Kubernetes', 'AWS', 'Terraform'],
            },
            {
              area: 'Data & Messaging',
              items: ['PostgreSQL', 'Redis', 'Kafka', 'ClickHouse'],
            },
            {
              area: 'APIs & Protocols',
              items: ['REST', 'gRPC', 'WebSocket', 'GraphQL'],
            },
            {
              area: 'Observability',
              items: ['Prometheus', 'Grafana', 'Jaeger', 'OpenTelemetry'],
            },
            {
              area: 'Practices',
              items: ['DDD', 'CQRS', 'TDD', 'Clean Architecture'],
            },
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
    </main>
  )
}
