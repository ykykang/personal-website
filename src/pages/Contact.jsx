import { Mail, GitFork, Link2, AtSign } from 'lucide-react'
import { trackEvent } from '../utils/analytics'

const socials = [
  {
    icon: GitFork,
    label: 'GitHub',
    handle: '@ykykang',
    href: 'https://github.com/ykykang',
  },
  {
    icon: Link2,
    label: 'LinkedIn',
    handle: 'Ahmad Haidar Albaqir',
    href: 'https://www.linkedin.com/in/ahmadhaidaralbaqir',
  },
  {
    icon: AtSign,
    label: 'Twitter / X',
    handle: '@ahaidar_dev',
    href: 'https://twitter.com',
  },
  {
    icon: Mail,
    label: 'Email',
    handle: 'ahmadhaidaralbaqir.official@gmail.com',
    href: 'mailto:ahmadhaidaralbaqir.official@gmail.com',
  },
]

export default function Contact() {
  return (
    <main className="max-w-5xl mx-auto px-6 pt-36 pb-32">
      <p className="font-mono text-xs text-stone/60 tracking-widest uppercase mb-4 opacity-0-init animate-fade-up">
        Contact
      </p>
      <h1 className="font-display text-5xl md:text-6xl mb-4 opacity-0-init animate-fade-up animate-delay-100">
        Let's Talk
      </h1>
      <p className="font-body text-stone mb-20 max-w-md opacity-0-init animate-fade-up animate-delay-200">
        Whether you have a project in mind, a job offer, or just want to geek out about Go
        concurrency patterns — my inbox is open.
      </p>

      {/* Primary CTA */}
      <a
        href="mailto:ahmadhaidaralbaqir.official@gmail.com"
        onClick={() => trackEvent('contact_click', { platform: 'email', location: 'hero' })}
        className="group inline-flex items-center gap-4 mb-20 opacity-0-init animate-fade-up animate-delay-300"
      >
        <span className="font-display text-3xl md:text-4xl group-hover:text-stone transition-colors">
          ahmadhaidaralbaqir.official@gmail.com
        </span>
        <Mail className="text-stone group-hover:text-ink dark:group-hover:text-chalk transition-colors" size={24} />
      </a>

      {/* Social Links */}
      <div className="border-t border-mist/40 dark:border-white/5 pt-16 opacity-0-init animate-fade-up animate-delay-400">
        <p className="font-mono text-xs text-stone/60 tracking-widest uppercase mb-8">Find me online</p>
        <div className="grid md:grid-cols-2 gap-4">
          {socials.map(({ icon: Icon, label, handle, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              onClick={() => trackEvent('contact_click', { platform: label.toLowerCase(), location: 'socials' })}
              className="flex items-center gap-5 p-5 border border-mist/40 dark:border-white/5 hover:border-ink/30 dark:hover:border-white/20 transition-all group"
            >
              <div className="w-9 h-9 border border-mist/60 dark:border-white/10 flex items-center justify-center text-stone group-hover:text-ink dark:group-hover:text-chalk group-hover:border-ink dark:group-hover:border-chalk transition-all">
                <Icon size={15} />
              </div>
              <div>
                <p className="font-body text-sm font-medium">{label}</p>
                <p className="font-mono text-xs text-stone">{handle}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Closing note */}
      <div className="mt-20 border-t border-mist/40 dark:border-white/5 pt-16 opacity-0-init animate-fade-up animate-delay-500">
        <p className="font-body text-stone text-sm leading-relaxed max-w-md">
          I typically respond within 48 hours. For time-sensitive matters, LinkedIn or email
          works best. I'm based in Jakarta (WIB, UTC+7) if we need to schedule a call.
        </p>
      </div>
    </main>
  )
}
