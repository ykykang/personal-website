export function parseProjectMd(raw) {
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!fmMatch) return null

  const fm = {}
  fmMatch[1].split('\n').forEach((line) => {
    const colon = line.indexOf(':')
    if (colon === -1) return
    const key = line.slice(0, colon).trim()
    const val = line.slice(colon + 1).trim()
    if (key) fm[key] = val
  })

  const body = fmMatch[2]
  const parts = body.split(/^## /m)
  const description = parts[0].trim()

  const sections = {}
  parts.slice(1).forEach((part) => {
    const newline = part.indexOf('\n')
    if (newline === -1) return
    const heading = part.slice(0, newline).trim().toLowerCase()
    sections[heading] = part.slice(newline + 1).trim()
  })

  const achievements = sections.achievements
    ? sections.achievements
        .split('\n')
        .filter((l) => l.startsWith('- '))
        .map((l) => l.slice(2).trim())
    : []

  return {
    title: fm.title || '',
    tech: fm.tech ? fm.tech.split(',').map((t) => t.trim()) : [],
    status: fm.status || '',
    link: fm.link || '#',
    year: fm.year || '',
    featured: fm.featured === 'true',
    description,
    background: sections.background || '',
    bottleneck: sections.bottleneck || '',
    achievements,
  }
}
