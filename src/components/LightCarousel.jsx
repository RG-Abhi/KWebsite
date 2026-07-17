import { useState, useEffect, useCallback } from 'react'

/**
 * Lightweight image carousel — no Swiper/CDN. Only mounts 3 slides at a time.
 */
export default function LightCarousel({ images, altPrefix = 'Slide', height = 320, autoMs = 4000 }) {
  const [index, setIndex] = useState(0)
  const n = images.length

  const go = useCallback((dir) => {
    setIndex(i => (i + dir + n) % n)
  }, [n])

  useEffect(() => {
    if (n <= 1 || autoMs <= 0) return
    const id = setInterval(() => go(1), autoMs)
    return () => clearInterval(id)
  }, [n, autoMs, go])

  if (!n) return null

  const visible = [-1, 0, 1].map(offset => {
    const i = (index + offset + n) % n
    return { i, offset, src: images[i] }
  })

  return (
    <div className="light-carousel" style={{ '--carousel-h': `${height}px` }}>
      <div className="light-carousel-track">
        {visible.map(({ i, offset, src }) => (
          <div
            key={`${i}-${offset}`}
            className={`light-carousel-slide${offset === 0 ? ' is-active' : ''}`}
            data-offset={offset}
          >
            <img
              src={src}
              alt={`${altPrefix} ${i + 1}`}
              loading={offset === 0 ? 'eager' : 'lazy'}
              decoding="async"
              draggable={false}
            />
          </div>
        ))}
      </div>
      <button type="button" className="light-carousel-btn prev" onClick={() => go(-1)} aria-label="Previous">
        <i className="fa-solid fa-chevron-left" />
      </button>
      <button type="button" className="light-carousel-btn next" onClick={() => go(1)} aria-label="Next">
        <i className="fa-solid fa-chevron-right" />
      </button>
      <div className="light-carousel-dots">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            className={i === index ? 'active' : ''}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
