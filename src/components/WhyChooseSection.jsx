import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useData } from '../context/websiteData'
import { resolveImageUrl } from '../utils/resolveImage'
import ScrollReveal from './ScrollReveal'
import { programDetails } from './spa/CoCurricularsPage'

function TiltTile({ tile, idx, onNavigate, tilesRef, extraClass, onOpenModal }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    // Max 12 deg tilt
    const rotateX = -(y / (rect.height / 2)) * 12
    const rotateY = (x / (rect.width / 2)) * 12
    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <div
      className={`choose-tile ${extraClass}`}
      style={{
        '--i': tile.i,
        cursor: tile.section ? 'pointer' : 'default',
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
        height: '100%',
        width: '100%'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        if (tile.modalKey && onOpenModal) {
          onOpenModal(tile.modalKey)
        } else if (tile.section && onNavigate) {
          onNavigate(tile.section)
        }
      }}
    >
      {resolveImageUrl(tile) && (
        <img
          className="tile-bg-img"
          src={resolveImageUrl(tile)}
          alt={tile.title}
          loading="lazy"
          onError={(e) => {
            const img = e.target
            const alt = resolveImageUrl(tile, true)
            if (alt && img.src !== alt && !img.dataset.failedFallback) {
              img.src = alt
              img.dataset.failedFallback = 'true'
            }
          }}
        />
      )}
      <div className="tile-icon"><i className={`fa-solid ${tile.icon}`}></i></div>
      <div className="tile-content">
        <h4>{tile.title}</h4>
      </div>
      <div className="tile-hover-overlay">
        <p>{tile.desc}</p>
      </div>
      <div className="tile-arrow"><i className="fa-solid fa-arrow-right"></i></div>
    </div>
  )
}

export default function WhyChooseSection({ onNavigate }) {
  const { data } = useData()
  const TILES = data.whyChoose
  const [activeProgramModal, setActiveProgramModal] = useState(null)

  useEffect(() => {
    if (activeProgramModal) {
      document.body.classList.add('modal-open')
      document.documentElement.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
      document.documentElement.classList.remove('modal-open')
    }
    return () => {
      document.body.classList.remove('modal-open')
      document.documentElement.classList.remove('modal-open')
    }
  }, [activeProgramModal])

  return (
    <section className="why-choose-section">
      <div className="gm-deco gm-dots" style={{ bottom: '15%', left: '3%', opacity: 0.1 }}></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <ScrollReveal animation="fade-up" threshold={0.3}>
          <div className="choose-header">
            <p className="section-eyebrow">{data.homeContent?.whyChoose?.eyebrow || 'Academic Excellence'}</p>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: data.homeContent?.whyChoose?.title || 'WHY CHOOSE <em>KMIT</em>' }}></h2>
            <p className="choose-description">
              {data.homeContent?.whyChoose?.text}
            </p>
          </div>
        </ScrollReveal>

        <div className="choose-grid">
          {TILES.map((tile, idx) => {
            const classes = (tile.cls || '').split(' ')
            const gridClass = classes.filter(c => c.startsWith('tile-')).join(' ')
            const gradClass = classes.filter(c => c.startsWith('grad-')).join(' ')
            return (
              <ScrollReveal 
                key={idx} 
                animation="fade-up" 
                delay={idx * 100 + 100} 
                threshold={0.2}
                className={gridClass}
              >
                <TiltTile 
                  tile={tile} 
                  idx={idx}
                  onNavigate={onNavigate}
                  extraClass={gradClass}
                  onOpenModal={setActiveProgramModal}
                />
              </ScrollReveal>
            )
          })}
        </div>
      </div>

      {/* ── PORTAL MODAL LIGHTBOX OVERLAY ──────────────────────── */}
      {(() => {
        const selectedDetails = activeProgramModal ? programDetails[activeProgramModal] : null;
        if (!selectedDetails) return null;
        const handleClose = () => setActiveProgramModal(null);
        return createPortal(
          <div className="premium-modal-overlay" onClick={handleClose}>
            <div className="premium-modal-card" onClick={(e) => e.stopPropagation()}>
              <button 
                className="modal-close-btn"
                onClick={handleClose}
                style={{
                  background: 'rgba(11, 31, 58, 0.05)',
                  border: '1px solid rgba(11, 31, 58, 0.08)',
                  borderRadius: '50%',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'rgba(11, 31, 58, 0.65)',
                  fontSize: '0.95rem',
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  zIndex: 10
                }}
              >
                <i className="fa-solid fa-xmark" />
              </button>
              <div className="premium-modal-sidebar">
                <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(11, 31, 58, 0.02)', border: '2px solid rgba(11, 31, 58, 0.08)', boxShadow: '0 8px 24px rgba(11, 31, 58, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.8rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '-10px', left: '-10px', right: '-10px', bottom: '-10px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(165, 28, 48, 0.08) 0%, transparent 75%)', zIndex: 0 }} />
                  <i className={`fa-solid ${selectedDetails.icon}`} style={{ fontSize: '3.2rem', color: 'var(--navy)', textShadow: '0 0 20px rgba(11, 31, 58, 0.15)', zIndex: 1 }} />
                </div>
                <span style={{ background: 'rgba(197, 160, 89, 0.12)', border: '1px solid rgba(197, 160, 89, 0.3)', color: 'var(--gold, #C5A059)', fontSize: '0.72rem', fontWeight: 800, padding: '0.35rem 0.9rem', borderRadius: '50px', display: 'inline-block', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {selectedDetails.badge}
                </span>
                <h2 style={{ fontSize: '1.65rem', fontWeight: 800, margin: '0 0 0.8rem', color: 'var(--navy)', lineHeight: 1.25 }}>
                  {selectedDetails.title}
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1.5, margin: '0 0 2.5rem 0' }}>
                  KMIT Co-Curricular Excellence Program
                </p>
                <div style={{ marginTop: 'auto', width: '100%' }}>
                  <button 
                    className="modal-action-btn modal-close-navy-btn"
                    onClick={handleClose}
                    style={{ background: 'var(--navy)', border: 'none', borderRadius: '50px', padding: '0.75rem 2rem', color: '#fff', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(11, 31, 58, 0.2)', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  >
                    <i className="fa-solid fa-circle-check" /> Close Window
                  </button>
                </div>
              </div>
              <div className="premium-modal-content">
                <div style={{ position: 'relative' }}>
                  <p style={{ fontSize: '1.02rem', lineHeight: 1.75, color: 'var(--text-dark)', margin: 0, borderLeft: '4px solid var(--crimson)', paddingLeft: '1.2rem', textAlign: 'justify' }}>
                    {selectedDetails.desc}
                  </p>
                </div>
                {selectedDetails.sections && selectedDetails.sections.map((sect, sIdx) => (
                  <div key={sIdx} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--navy)', borderLeft: '3px solid var(--gold)', paddingLeft: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.03em' }}>{sect.title}</h4>
                    {sect.content && <p style={{ fontSize: '0.96rem', lineHeight: 1.65, color: 'var(--text-muted)', margin: 0, textAlign: 'justify' }}>{sect.content}</p>}
                    {sect.list && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1rem', marginTop: '0.3rem' }}>
                        {sect.list.map((li, lIdx) => (
                          <div key={lIdx} className="modal-item-card" style={{ background: '#ffffff', border: '1px solid rgba(11, 31, 58, 0.08)', borderRadius: '14px', padding: '1.2rem', display: 'flex', gap: '0.8rem', alignItems: 'flex-start', boxShadow: '0 4px 12px rgba(11, 31, 58, 0.02)' }}>
                            <i className="fa-solid fa-circle-chevron-right" style={{ color: 'var(--brand-orange-text)', marginTop: '0.2rem', fontSize: '0.95rem', filter: 'drop-shadow(0 0 3px rgba(165, 28, 48, 0.2))' }} />
                            <span style={{ fontSize: '0.92rem', lineHeight: 1.5, color: 'var(--text-dark)', opacity: 0.9 }}>{li}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>,
          document.body
        );
      })()}
    </section>
  )
}
