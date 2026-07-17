export const SITE_DATA_VERSION = 'KMIT_v9_RESEARCH'
const POLL_MS = 45_000

function isValidSitePayload(data) {
  if (!data || typeof data !== 'object') return false
  const hasNav = Array.isArray(data.navItems) && data.navItems.length > 0
  const hasMeta = data.siteMeta && typeof data.siteMeta === 'object'
  const hasPages = data.pages && typeof data.pages === 'object'
  return Boolean(data.version && (hasNav || hasMeta || hasPages))
}

export async function fetchSiteData(signal) {
  const res = await fetch('/api/data', { signal })
  if (!res.ok) throw new Error(`Site data fetch failed (${res.status})`)
  const data = await res.json()
  if (!isValidSitePayload(data)) {
    throw new Error('Invalid site data payload')
  }
  return data
}

export function subscribeSiteDataStream(onUpdate) {
  let es
  let reconnectTimeout

  const connect = () => {
    try {
      es = new EventSource('/api/data/stream')
      es.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data)
          if (payload.type === 'updated') onUpdate(payload)
        } catch {
          /* ignore malformed events */
        }
      }
      es.onerror = () => {
        es?.close()
        // Reconnect after 3 seconds
        clearTimeout(reconnectTimeout)
        reconnectTimeout = setTimeout(connect, 3000)
      }
    } catch {
      /* EventSource unavailable */
    }
  }

  connect()

  return () => {
    clearTimeout(reconnectTimeout)
    es?.close()
  }
}

export function startSiteDataPolling(onPoll) {
  const id = setInterval(onPoll, POLL_MS)
  return () => clearInterval(id)
}
