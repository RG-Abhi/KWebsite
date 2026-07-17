import { useState, useEffect } from 'react'

export default function SafePdfViewer({ src, title, style, ...props }) {
  const [isBlocked, setIsBlocked] = useState(false)

  useEffect(() => {
    // Check if the current origin is not kmit.in
    if (window.location.hostname !== 'kmit.in') {
      setIsBlocked(true)
    }
  }, [])

  const getRawPdfUrl = (viewerUrl) => {
    try {
      if (!viewerUrl) return ''
      if (viewerUrl.startsWith('http') || viewerUrl.startsWith('//')) {
        const urlObj = new URL(viewerUrl.startsWith('//') ? 'https:' + viewerUrl : viewerUrl)
        const fileParam = urlObj.searchParams.get('file')
        if (fileParam) return decodeURIComponent(fileParam)
      } else if (viewerUrl.includes('?file=')) {
        const parts = viewerUrl.split('?file=')
        if (parts.length > 1) {
          const fileParam = parts[1].split('&')[0]
          return decodeURIComponent(fileParam)
        }
      }
    } catch (e) {
      console.error('Error parsing PDF URL:', e)
    }
    return viewerUrl
  }

  const rawUrl = getRawPdfUrl(src)

  // Auto-open the PDF in a new tab as soon as blocked state is confirmed —
  // no second click required from the user.
  useEffect(() => {
    if (isBlocked && rawUrl) {
      window.open(rawUrl, '_blank', 'noopener,noreferrer')
    }
  }, [isBlocked, rawUrl])

  if (isBlocked) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2.5rem 2rem',
          textAlign: 'center',
          background: '#f9fafb',
          borderRadius: '20px',
          gap: '1.25rem',
          boxSizing: 'border-box',
          width: '100%',
          ...style,
          height: style?.height || '100%',
        }}
      >
        {/* Animated spinner with PDF icon */}
        <div style={{ position: 'relative', width: '72px', height: '72px' }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '3px solid rgba(15, 23, 42, 0.08)',
            borderTopColor: 'var(--navy, #0f172a)',
            animation: 'pdfSpin 0.9s linear infinite',
          }} />
          <div style={{
            position: 'absolute',
            inset: '10px',
            borderRadius: '50%',
            background: 'rgba(220, 20, 60, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--crimson, #dc143c)',
            fontSize: '1.5rem',
          }}>
            <i className="fa-solid fa-file-pdf" />
          </div>
        </div>

        <div>
          <h4 style={{ margin: '0 0 0.4rem 0', fontWeight: '800', fontSize: '1.15rem', color: 'var(--navy, #0f172a)' }}>
            Opening PDF…
          </h4>
          <p style={{ margin: 0, fontSize: '0.88rem', color: '#6b7280', maxWidth: '340px', lineHeight: '1.65' }}>
            The document is opening in a new tab. If it didn't open,{' '}
            <a
              href={rawUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--crimson, #dc143c)', fontWeight: '700', textDecoration: 'underline' }}
            >
              click here
            </a>.
          </p>
        </div>

        <style>{`@keyframes pdfSpin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <iframe
      src={src}
      title={title}
      style={style}
      allow="fullscreen"
      {...props}
    />
  )
}
