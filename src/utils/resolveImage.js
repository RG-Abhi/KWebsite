/** Pick best image URL: prefer local public assets, then remote/CDN, normalized */
export function resolveImageUrl(item, preferLocal = false) {
  if (!item) return ''
  const local = item.local?.trim?.() || ''
  const remote = item.unsplash?.trim?.() || item.src?.trim?.() || ''
  const normalizedLocal = local && !local.startsWith('http')
    ? (local.startsWith('/') ? local : `/${local}`)
    : local
  if (preferLocal) return normalizedLocal || remote
  return remote || normalizedLocal
}
