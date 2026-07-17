import { useState, useEffect, useCallback, useRef } from 'react'
import { useData } from '../context/websiteData'
import { resolveImageUrl } from '../utils/resolveImage'
import { useNavigate } from 'react-router-dom'

const FALLBACK = 'https://api.dicebear.com/9.x/initials/svg?seed=KMIT&backgroundColor=0f172a,dc143c&textColor=ffffff'
const SLIDE_DURATION = 4500 // ms per slide

/** Glassmorphism stat pills shown on the hero */
const HERO_PILLS = [
  { icon: 'fa-award', color: 'lime',   text: "NAAC 'A' Grade" },
  { icon: 'fa-graduation-cap', color: 'orange', text: '95%+ Placement Rate' },
  { icon: 'fa-indian-rupee-sign', color: 'gold', text: '₹1.22 Cr Highest CTC' },
  { icon: 'fa-building', color: 'green', text: '350+ Top Recruiters' },
]

export default function HeroSlider({ onNavigate }) {
  const { data } = useData()
  const navigate  = useNavigate()
  const SLIDES    = data.heroSlides || []
  const total     = SLIDES.length

  const [active,    setActive]    = useState(0)
  const progressRef = useRef(null)
  const [paused,    setPaused]    = useState(false)

  const intervalRef  = useRef(null)
  const rafRef       = useRef(null)
  const startTimeRef = useRef(null)
  const elapsedRef   = useRef(0)      // how many ms into the current slide

  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  // ── Advance to next slide ──────────────────────────────────────────
  const advance = useCallback((dir = 1) => {
    setActive(prev => (prev + dir + total) % total)
    if (progressRef.current) progressRef.current.style.backgroundPosition = '100% 0'
    elapsedRef.current  = 0
    startTimeRef.current = null
  }, [total])

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50
    if (isLeftSwipe) {
      advance(1)
    }
    if (isRightSwipe) {
      advance(-1)
    }
  }

  // ── RAF-based smooth progress bar ──────────────────────────────────
  useEffect(() => {
    if (total === 0) return

    const tick = (now) => {
      if (!startTimeRef.current) startTimeRef.current = now
      let delta = now - startTimeRef.current
      if (delta > 100) delta = 16.6
      
      if (!paused) {
        elapsedRef.current += delta
      }
      startTimeRef.current = now

      const pct = Math.min((elapsedRef.current / SLIDE_DURATION) * 100, 100)
      if (progressRef.current) progressRef.current.style.backgroundPosition = `${100 - pct}% 0`

      if (pct >= 100) {
        elapsedRef.current  = 0
        startTimeRef.current = null
        setActive(prev => (prev + 1) % total)
        if (progressRef.current) progressRef.current.style.backgroundPosition = '100% 0'
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [total, paused])

  // ── Keyboard navigation ────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') advance(1)
      if (e.key === 'ArrowLeft')  advance(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [advance])

  if (total === 0) return null

  const goTo = (idx) => {
    setActive(idx)
    if (progressRef.current) progressRef.current.style.backgroundPosition = '100% 0'
    elapsedRef.current  = 0
    startTimeRef.current = null
  }

  const handleExplore = (e) => {
    e.preventDefault()
    if (onNavigate) onNavigate('admissions/coursesoffered')
    else navigate('/admissions/coursesoffered')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleTour = (e) => {
    e.preventDefault()
    if (onNavigate) onNavigate('about/campus')
    else navigate('/about/campus')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <section
      className="hero"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEndHandler}
      aria-label="KMIT Hero Slider"
    >
      {/* ── Slide Progress Bar ── */}
      <div className="hero-progress-bar" aria-hidden="true">
        <div className="hero-progress-fill" ref={progressRef} style={{ backgroundPosition: '100% 0' }} />
      </div>

      {/* ── Background Image Slides ── */}
      <div className="hero-slider" aria-hidden="true">
        {SLIDES.map((slide, i) => (
          <div key={i} className={`hero-slide${active === i ? ' active' : ''}`}>
            <img
              src={resolveImageUrl(slide, true) || resolveImageUrl(slide) || FALLBACK}
              alt={slide.alt || `KMIT Slide ${i + 1}`}
              width="1600"
              height="900"
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              fetchpriority={i === 0 ? 'high' : 'auto'}
              onError={(e) => {
                const img = e.target
                if (slide.unsplash && img.src !== slide.unsplash) { img.src = slide.unsplash; return }
                if (slide.src && img.src !== slide.src && slide.src.startsWith('/')) { img.src = slide.src; return }
                img.onerror = null
                img.src = FALLBACK
              }}
            />
          </div>
        ))}
      </div>

      {/* ── Gradient Overlay ── */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* ── Geometric Decorations ── */}
      <div className="gm-deco gm-square" style={{ top: '15%', right: '5%', opacity: 0.08, borderColor: 'rgba(255,255,255,0.3)' }} aria-hidden="true" />
      <div className="gm-deco gm-ring"   style={{ bottom: '22%', left: '4%', opacity: 0.07, border: '12px solid rgba(255,255,255,0.15)' }} aria-hidden="true" />

      {/* ── Main Content ── */}
      <div className="container hero-content-wrap">
        <div className="hero-content-grid">

          {/* ── LEFT COLUMN — Main messaging ── */}
          <div className="hero-left">

            {/* Eyebrow badge */}
            <div className="hero-eyebrow">
              <i className="fa-solid fa-award" aria-hidden="true" />
              NAAC 'A' Grade &nbsp;·&nbsp; Admissions 2026 Open
            </div>

            {/* Headline */}
            <h1>
              Empowering Future<br />
              <em>Tech Leaders</em><br />
              in Hyderabad
            </h1>

            {/* Sub-headline */}
            <p>
              Join KMIT's 19-year legacy of engineering excellence. Drive innovation,
              embrace cutting-edge research, and achieve your career dreams.
            </p>

            {/* Glassmorphism stat pills */}
            <div className="hero-stat-pills" role="list" aria-label="Key highlights">
              {HERO_PILLS.map((pill, i) => (
                <span key={i} className="hero-stat-pill" role="listitem">
                  <span className={`hero-stat-pill-icon ${pill.color}`} aria-hidden="true">
                    <i className={`fa-solid ${pill.icon}`} />
                  </span>
                  {pill.text}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hero-btns">
              <a
                href="#"
                className="btn-vibrant"
                id="hero-cta-apply"
                onClick={handleExplore}
                aria-label="Explore B.Tech programs"
              >
                <i className="fa-solid fa-graduation-cap" aria-hidden="true" />
                &nbsp; Explore Programs
              </a>
              <a
                href="#"
                className="btn-hero-outline"
                id="hero-cta-tour"
                onClick={handleTour}
                aria-label="Take a virtual campus tour"
              >
                <i className="fa-solid fa-play" aria-hidden="true" />
                &nbsp; Campus Tour
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ── Slide Dot Indicators ── */}
      <div className="hero-dots" role="tablist" aria-label="Slides">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`dot${active === i ? ' active' : ''}`}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={active === i}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Slide Counter ── */}
      <div className="hero-slide-counter" aria-live="polite" aria-atomic="true">
        <strong>{String(active + 1).padStart(2, '0')}</strong>&nbsp;/&nbsp;{String(total).padStart(2, '0')}
      </div>

      {/* ── Prev/Next Arrows ── */}
      <button
        className="hero-arrow hero-arrow-prev"
        onClick={() => advance(-1)}
        aria-label="Previous slide"
      >
        <i className="fa-solid fa-chevron-left" aria-hidden="true" />
      </button>
      <button
        className="hero-arrow hero-arrow-next"
        onClick={() => advance(1)}
        aria-label="Next slide"
      >
        <i className="fa-solid fa-chevron-right" aria-hidden="true" />
      </button>

    </section>
  )
}
