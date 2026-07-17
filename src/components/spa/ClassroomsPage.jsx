import { useState, useEffect, useRef } from 'react'
import PageShell from './PageShell'

export default function ClassroomsPage() {
  const slides = [
    {
      src: 'https://kmit.in/infrastructure/assets/banner/classroom/Classroom%201.jpg',
      title: 'Classroom — View 1',
      type: 'Classroom',
    },
    {
      src: 'https://kmit.in/infrastructure/assets/banner/classroom/Classroom%202.jpg',
      title: 'Classroom — View 2',
      type: 'Classroom',
    },
    {
      src: 'https://kmit.in/infrastructure/assets/banner/classroom/Classroom%203.jpg',
      title: 'Classroom — View 3',
      type: 'Classroom',
    },
    {
      src: 'https://kmit.in/infrastructure/assets/banner/classroom/Classroom%204.jpg',
      title: 'Classroom — View 4',
      type: 'Classroom',
    },
    {
      src: 'https://kmit.in/infrastructure/assets/banner/classroom/Classroom%205.jpg',
      title: 'Classroom — View 5',
      type: 'Classroom',
    },
    {
      src: 'https://kmit.in/infrastructure/assets/banner/classroom/Classroom%206.jpg',
      title: 'Classroom — View 6',
      type: 'Classroom',
    },
    {
      src: 'https://kmit.in/infrastructure/assets/banner/classroom/Seminar%20Hall%201.jpg',
      title: 'Seminar Hall — View 1',
      type: 'Seminar Hall',
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const timerRef = useRef(null)

  // Autoplay functionality with loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % slides.length)
      }, 3500)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying, slides.length])

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const getSlideClass = (index) => {
    if (index === activeIndex) return 'slide-active'
    
    const prevIdx = (activeIndex - 1 + slides.length) % slides.length
    if (index === prevIdx) return 'slide-prev'

    const nextIdx = (activeIndex + 1) % slides.length
    if (index === nextIdx) return 'slide-next'

    return 'slide-hidden'
  }

  return (
    <PageShell
      eyebrow="Infrastructure"
      title="Classroom &"
      titleEm="Seminar Hall"
      description="Classrooms and Seminar Halls at Keshav Memorial Institute of Technology."
      breadcrumbs={[
        { label: 'Campus & Infra', to: '/campus/library' },
        { label: 'Classrooms' },
      ]}
    >
      {/* 3D Coverflow Showcase Section */}
      <section className="page-section">
        <div className="container">
          <div className="section-header centered">
            <h2>
              Classroom &amp; <em>Seminar Hall</em>
            </h2>
            <div className="section-divider"></div>
          </div>

          {/* 3D Coverflow Container */}
          <div
            className="fade-in-up"
            style={{
              maxWidth: '960px',
              margin: '3rem auto 0',
              position: 'relative',
            }}
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
          >
            {/* Slider Viewport */}
            <div
              style={{
                height: '380px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                perspective: '1200px',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '16px',
                background: 'rgba(15, 23, 42, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.2)',
              }}
            >
              {/* Slides Grid */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '350px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {slides.map((slide, i) => {
                  const slideClass = getSlideClass(i)
                  const isActive = slideClass === 'slide-active'
                  const isPrev = slideClass === 'slide-prev'
                  const isNext = slideClass === 'slide-next'

                  let transformStyle = ''
                  let opacityStyle = 0
                  let zIndexStyle = 1
                  let visibility = 'hidden'

                  if (isActive) {
                    transformStyle = 'scale(1.08) translateZ(100px)'
                    opacityStyle = 1
                    zIndexStyle = 10
                    visibility = 'visible'
                  } else if (isPrev) {
                    transformStyle = 'scale(0.85) translateX(-280px) rotateY(32deg)'
                    opacityStyle = 0.55
                    zIndexStyle = 5
                    visibility = 'visible'
                  } else if (isNext) {
                    transformStyle = 'scale(0.85) translateX(280px) rotateY(-32deg)'
                    opacityStyle = 0.55
                    zIndexStyle = 5
                    visibility = 'visible'
                  } else {
                    transformStyle = 'scale(0.6) translateZ(-200px)'
                    opacityStyle = 0
                    zIndexStyle = 1
                    visibility = 'hidden'
                  }

                  return (
                    <div
                      key={i}
                      style={{
                        position: 'absolute',
                        width: '480px',
                        maxWidth: '85vw',
                        height: '290px',
                        transition: 'all 0.55s cubic-bezier(0.25, 1, 0.5, 1)',
                        transform: transformStyle,
                        opacity: opacityStyle,
                        zIndex: zIndexStyle,
                        visibility: visibility,
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: isActive ? '0 15px 35px rgba(0,0,0,0.5)' : '0 5px 15px rgba(0,0,0,0.2)',
                        border: isActive ? '1px solid rgba(252, 119, 0, 0.25)' : '1px solid rgba(255,255,255,0.06)',
                        cursor: isActive ? 'default' : 'pointer',
                      }}
                      onClick={() => {
                        if (!isActive) setActiveIndex(i)
                      }}
                    >
                      <img
                        src={slide.src}
                        alt={slide.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                      {/* Active Caption Panel */}
                      {isActive && (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            insetInline: 0,
                            background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95), transparent)',
                            padding: '24px 20px 15px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                          }}
                        >
                          <div>
                            <span
                              style={{
                                display: 'inline-block',
                                fontSize: '0.75rem',
                                textTransform: 'uppercase',
                                fontWeight: 700,
                                color: 'var(--vibrant-accent, #fc7700)',
                                letterSpacing: '1px',
                                marginBottom: '2px',
                              }}
                            >
                              {slide.type}
                            </span>
                            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                              {slide.title}
                            </h3>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Slider Manual Arrows */}
              <button
                onClick={prevSlide}
                title="Previous Slide"
                style={{
                  position: 'absolute',
                  left: '20px',
                  border: 'none',
                  background: 'rgba(15, 23, 42, 0.7)',
                  color: '#ffffff',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 20,
                  border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--vibrant-accent, #fc7700)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(15, 23, 42, 0.7)')}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>

              <button
                onClick={nextSlide}
                title="Next Slide"
                style={{
                  position: 'absolute',
                  right: '20px',
                  border: 'none',
                  background: 'rgba(15, 23, 42, 0.7)',
                  color: '#ffffff',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 20,
                  border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--vibrant-accent, #fc7700)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(15, 23, 42, 0.7)')}
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>

            {/* Photo Credits & Navigation Bullet Bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '1.2rem',
                fontSize: '0.85rem',
                color: '#94a3b8',
                opacity: 0.8,
              }}
            >
              <span>
                <i className="fa-solid fa-circle-info" style={{ marginRight: '5px' }}></i> Click adjacent slide to swap focus
              </span>

              {/* Navigation Bullets */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    style={{
                      border: 'none',
                      background: idx === activeIndex ? 'var(--vibrant-accent, #fc7700)' : 'rgba(255,255,255,0.18)',
                      width: idx === activeIndex ? '20px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </div>

              <span>
                Photos by: <em>Traces of Lenses club</em>
              </span>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
