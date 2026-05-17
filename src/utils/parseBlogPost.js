export function parseBlogPostMd(raw, filepath) {
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

  const slug = fm.slug || filepath.replace(/^.*[\\/]/, '').replace(/\.md$/, '')

  return {
    slug,
    title: fm.title || '',
    excerpt: fm.excerpt || '',
    category: fm.category || 'tech',
    date: fm.date || '',
    readTime: fm.readTime || '',
    featured: fm.featured === 'true',
    body: fmMatch[2].trim(),
  }
}
