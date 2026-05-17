const GA_ID = 'G-XXXXXXXXXX'

export function trackPageView(path) {
  if (typeof window.gtag !== 'function') return
  window.gtag('config', GA_ID, { page_path: path })
}

export function trackEvent(eventName, params = {}) {
  if (typeof window.gtag !== 'function') return
  window.gtag('event', eventName, params)
}
