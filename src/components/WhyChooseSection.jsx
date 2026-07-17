import { useEffect, useRef, useState } from 'react'
import { useData } from '../context/websiteData'
import { resolveImageUrl } from '../utils/resolveImage'
import ScrollReveal from './ScrollReveal'

function TiltTile({ tile, idx, onNavigate, tilesRef, extraClass }) {
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
        if (tile.section && onNavigate) {
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
                />
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
