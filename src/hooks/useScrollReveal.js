import { useEffect, useRef } from 'react'

export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('animate-fade-up')
          el.classList.remove('opacity-0-init')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, ...options }
    )

    el.classList.add('opacity-0-init')
    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return ref
}
