import { useState, useEffect, useRef } from 'react'
import PageShell from './PageShell'
import ScrollReveal from '../ScrollReveal'

export default function AuditoriumPage() {
  const [loading, setLoading] = useState(true)
  const [autoRotate, setAutoRotate] = useState(true)
  const viewerRef = useRef(null)

  useEffect(() => {
    // 1. Add Pannellum CSS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css'
    document.head.appendChild(link)

    // 2. Add Pannellum Script
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js'
    script.async = true
    script.onload = () => {
      if (window.pannellum) {
        // Initialize the 360 viewer
        const pViewer = window.pannellum.viewer('panorama-frame', {
          type: 'equirectangular',
          // Resolved locally to bypass remote CORS restrictions
          panorama: '/assets/Audi_360_View_1.webp',
          autoRotate: -2,
          autoLoad: true,
          showZoomCtrl: false,
          showFullscreenCtrl: false,
          compass: false,
          mouseZoom: true,
          title: 'KMIT Auditorium Stage View',
          author: 'Traces of Lenses Club',
        })
        viewerRef.current = pViewer
        setLoading(false)
      }
    }
    document.body.appendChild(script)

    // Cleanup scripts and stylesheets on unmount to prevent leaks
    return () => {
      document.head.removeChild(link)
      document.body.removeChild(script)
      if (viewerRef.current) {
        viewerRef.current.destroy()
      }
    }
  }, [])

  // Interactive control functions
  const toggleRotation = () => {
    if (viewerRef.current) {
      if (autoRotate) {
        viewerRef.current.stopAutoRotate()
      } else {
        viewerRef.current.startAutoRotate(-2)
      }
      setAutoRotate(!autoRotate)
    }
  }

  const zoomIn = () => {
    if (viewerRef.current) {
      const currentHfov = viewerRef.current.getHfov()
      viewerRef.current.setHfov(Math.max(currentHfov - 12, 30))
    }
  }

  const zoomOut = () => {
    if (viewerRef.current) {
      const currentHfov = viewerRef.current.getHfov()
      viewerRef.current.setHfov(Math.min(currentHfov + 12, 120))
    }
  }

  const resetView = () => {
    if (viewerRef.current) {
      viewerRef.current.setPitch(0)
      viewerRef.current.setYaw(0)
      viewerRef.current.setHfov(100)
    }
  }

  const toggleFullscreen = () => {
    if (viewerRef.current) {
      viewerRef.current.toggleFullscreen()
    }
  }

  const specs = [
    {
      value: '400+',
      label: 'Seating Capacity',
      icon: 'fa-chair',
      desc: 'Centrally air-conditioned tiered theater seating styled with pristine comfort and optimal sightlines.',
    },
    {
      value: 'Acoustic',
      label: 'Wall Treatments',
      icon: 'fa-volume-high',
      desc: 'Soundproof geometric panels and soft acoustic materials designed for speech intelligibility.',
    },
    {
      value: 'Full HD',
      label: 'Digital Projection',
      icon: 'fa-video',
      desc: 'High-intensity widescreen projection setups perfect for high-resolution visual presentations.',
    },
    {
      value: 'Pro Audio',
      label: 'Line Array Speakers',
      icon: 'fa-sliders',
      desc: 'Multi-channel wireless mic routing, DSP controllers, and high-fidelity sound reinforcement.',
    },
  ]

  const keyHighlights = [
    {
      title: 'Centrally Air-Conditioned',
      desc: 'Maintains a pleasant climate under peak occupancies for long technical workshops or guest lectures.',
      icon: 'fa-snowflake',
    },
    {
      title: 'Motorized Main Curtains',
      desc: 'Professional stage curtains with centralized automated controls for dynamic visual reveal.',
      icon: 'fa-sheet-plastic',
    },
    {
      title: 'High-Efficiency Spotlights',
      desc: 'Flexible stage lighting and dimmable halogen rigs fully customizable for plays, awards, and fests.',
      icon: 'fa-lightbulb',
    },
    {
      title: 'Backstage Green Rooms',
      desc: 'Fully equipped rest and dressing rooms for guests, speakers, and student performers.',
      icon: 'fa-door-open',
    },
    {
      title: 'Reliable Power Backup',
      desc: 'Dedicated high-capacity diesel generators ensure zero interruption during flagship events.',
      icon: 'fa-bolt',
    },
    {
      title: 'Traces of Lenses Hub',
      desc: 'Integrated camera mounts and cable ports enabling direct high-definition webcasting by KMIT TV.',
      icon: 'fa-camera',
    },
  ]

  return (
    <PageShell
      eyebrow="Infrastructure"
      title="KMIT"
      titleEm="Auditorium"
      description="Experience KMIT's state-of-the-art fully air-conditioned auditorium, equipped with modern virtual tours, pro acoustics, and professional stage lighting."
      breadcrumbs={[
        { label: 'Campus & Infra', to: '/campus/library' },
        { label: 'Auditorium' },
      ]}
    >
      {/* 360° Virtual Tour Section */}
      <section className="page-section">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow">
              <i className="fa-solid fa-rotate"></i> Interactive 360° View
            </div>
            <h2>
              Virtual <em>Campus Tour</em>
            </h2>
            <div className="section-divider"></div>
            <p>
              Step inside and explore our state-of-the-art auditorium. Click and drag the viewer below to look around in a fully immersive 360-degree panorama.
            </p>
          </div>

          {/* Virtual Tour Container */}
          <ScrollReveal animation="fade-up" delay={200}>
          <div style={{ maxWidth: '960px', margin: '2rem auto 0' }}>
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                background: 'rgba(15, 23, 42, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35)',
                position: 'relative',
              }}
            >
              {/* Pannellum Frame */}
              <div
                id="panorama-frame"
                style={{
                  width: '100%',
                  height: '480px',
                  background: '#0B1528',
                }}
              />

              {/* Custom Overlay Controls */}
              {!loading && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'rgba(15, 23, 42, 0.85)',
                    padding: '8px 16px',
                    borderRadius: '30px',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 10,
                  }}
                >
                  <button
                    onClick={toggleRotation}
                    title={autoRotate ? 'Stop Auto-Rotate' : 'Start Auto-Rotate'}
                    style={{
                      border: 'none',
                      background: autoRotate ? 'var(--vibrant-accent, #fc7700)' : 'transparent',
                      color: '#ffffff',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <i className={`fa-solid ${autoRotate ? 'fa-pause' : 'fa-play'}`}></i>
                  </button>
                  <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.15)' }} />
                  <button
                    onClick={zoomIn}
                    title="Zoom In"
                    style={{
                      border: 'none',
                      background: 'transparent',
                      color: '#ffffff',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <i className="fa-solid fa-magnifying-glass-plus"></i>
                  </button>
                  <button
                    onClick={zoomOut}
                    title="Zoom Out"
                    style={{
                      border: 'none',
                      background: 'transparent',
                      color: '#ffffff',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <i className="fa-solid fa-magnifying-glass-minus"></i>
                  </button>
                  <button
                    onClick={resetView}
                    title="Reset View"
                    style={{
                      border: 'none',
                      background: 'transparent',
                      color: '#ffffff',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <i className="fa-solid fa-arrow-rotate-left"></i>
                  </button>
                  <button
                    onClick={toggleFullscreen}
                    title="Fullscreen"
                    style={{
                      border: 'none',
                      background: 'transparent',
                      color: '#ffffff',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <i className="fa-solid fa-expand"></i>
                  </button>
                </div>
              )}

              {/* Loading Indicator */}
              {loading && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: '#0B1528',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '15px',
                    zIndex: 5,
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      border: '4px solid rgba(252, 119, 0, 0.15)',
                      borderTopColor: 'var(--vibrant-accent, #fc7700)',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                    }}
                  />
                  <p style={{ margin: 0, fontSize: '0.95rem', color: '#94a3b8', fontWeight: 500 }}>
                    Assembling 360° Virtual Tour...
                  </p>
                  <style>
                    {`
                      @keyframes spin {
                        to { transform: rotate(360deg); }
                      }
                    `}
                  </style>
                </div>
              )}
            </div>

            {/* Photo Credits */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '1rem',
                fontSize: '0.85rem',
                color: '#94a3b8',
                opacity: 0.8,
              }}
            >
              <span>
                <i className="fa-solid fa-circle-info" style={{ marginRight: '5px' }}></i> Drag to explore the stage viewpoint
              </span>
              <span>
                Photos by: <strong style={{ color: '#ffffff' }}>Traces of Lenses Club</strong>
              </span>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Auditorium Specifications */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow">
              <i className="fa-solid fa-chart-simple"></i> Specifications
            </div>
            <h2>
              Technical <em>Capabilities</em>
            </h2>
            <div className="section-divider"></div>
            <p>
              The KMIT Auditorium is structurally and electronically designed to meet the demands of top-tier corporate events, guest keynotes, and student performances.
            </p>
          </div>

          <div className="info-cards-grid" style={{ marginTop: '2rem' }}>
            {specs.map((item, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 50} style={{ height: '100%' }}>
              <div className="info-card" style={{ borderRadius: '8px', height: '100%' }}>
                <div
                  className="info-card-icon"
                  style={{
                    fontSize: '1.8rem',
                    color: 'var(--vibrant-accent, #fc7700)',
                    background: 'rgba(252, 119, 0, 0.08)',
                    width: '60px',
                    height: '60px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <i className={`fa-solid ${item.icon}`}></i>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff' }}>{item.value}</span>
                    <strong style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--vibrant-accent, #fc7700)' }}>
                      {item.label}
                    </strong>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.5 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Details */}
      <section className="page-section">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow">
              <i className="fa-solid fa-cubes"></i> Features
            </div>
            <h2>
              Key Infrastructure <em>Highlights</em>
            </h2>
            <div className="section-divider"></div>
            <p>
              Every element of our auditorium is crafted to provide a highly interactive, comfortable, and professional experience.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              marginTop: '2.5rem',
            }}
          >
            {keyHighlights.map((feat, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 50}>
              <div
                style={{
                  background: 'var(--glass-bg, rgba(255, 255, 255, 0.02))',
                  border: '1px solid var(--glass-border, rgba(255, 255, 255, 0.06))',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  height: '100%',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(252, 119, 0, 0.25)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--glass-border, rgba(255, 255, 255, 0.06))'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div
                  style={{
                    color: 'var(--vibrant-accent, #fc7700)',
                    fontSize: '1.3rem',
                    marginBottom: '0.8rem',
                  }}
                >
                  <i className={`fa-solid ${feat.icon}`}></i>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>
                  {feat.title}
                </h3>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  {feat.desc}
                </p>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
