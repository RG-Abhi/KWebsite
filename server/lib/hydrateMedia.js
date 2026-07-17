import { INITIAL_DATA } from '../defaults.js'

/** Ensure asset paths work from site root (Vite public/) */
export function normalizeAssetUrl(url) {
  if (!url || typeof url !== 'string') return ''
  const trimmed = url.trim()
  if (!trimmed) return ''
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
  if (trimmed.startsWith('/')) return trimmed
  if (trimmed.startsWith('photos/')) return `/${trimmed}`
  return `/${trimmed}`
}

function mergeByIndex(live = [], defaults = [], mergeItem) {
  const max = Math.max(live.length, defaults.length)
  const result = []
  for (let i = 0; i < max; i++) {
    result.push(mergeItem(defaults[i] || {}, live[i] || {}))
  }
  return result
}

export function hydrateHomeMedia(data) {
  if (!data || typeof data !== 'object') return data

  const ref = INITIAL_DATA

  if (ref.heroSlides) {
    data.heroSlides = mergeByIndex(data.heroSlides, ref.heroSlides, (def, live) => ({
      ...def,
      ...live,
      src: normalizeAssetUrl(live.src) || def.src || def.unsplash || '',
      unsplash: live.unsplash || def.unsplash || '',
      alt: live.alt || def.alt || 'KMIT Campus',
    }))
  }

  if (ref.whyChoose) {
    data.whyChoose = mergeByIndex(data.whyChoose, ref.whyChoose, (def, live) => ({
      ...def,
      ...live,
      unsplash: live.unsplash || def.unsplash || '',
      local: normalizeAssetUrl(live.local) || def.local || '',
    }))
  }

  if (ref.explore) {
    data.explore = mergeByIndex(data.explore, ref.explore, (def, live) => ({
      ...def,
      ...live,
      unsplash: live.unsplash || def.unsplash || '',
      local: normalizeAssetUrl(live.local) || def.local || '',
    }))
  }

  return data
}
