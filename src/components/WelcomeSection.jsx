import { useState, useRef, useEffect } from 'react'
import { useData } from '../context/websiteData'
import ScrollReveal from './ScrollReveal'

/** News marquee inner track — items duplicated for seamless infinite upward loop */
function NewsMarquee({ items, onNavigate, category }) {
  const trackRef = useRef(null)
  const animRef = useRef(null)
  const posRef = useRef(0)
  const pausedRef = useRef(false)

  // Speed in px per second
  const SPEED = 40

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Reset position when tab changes
    posRef.current = 0
    track.style.transform = 'translateY(0px)'

    let lastTime = null

    const step = (timestamp) => {
      if (!lastTime) lastTime = timestamp
      const delta = timestamp - lastTime
      lastTime = timestamp

      if (!pausedRef.current) {
        posRef.current += (SPEED * delta) / 1000
        // Half the total height = height of one set of items (original, non-duplicated)
        const halfH = track.scrollHeight / 2
        if (posRef.current >= halfH) {
          posRef.current -= halfH
        }
        track.style.transform = `translateY(-${posRef.current}px)`
      }

      animRef.current = requestAnimationFrame(step)
    }

    animRef.current = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(animRef.current)
    }
  }, [items])

  // Duplicate items for seamless loop
  const doubled = [...items, ...items]

  const handleClick = (item) => {
    if (!item.link) return
    if (item.link.startsWith('http')) {
      window.open(item.link, '_blank', 'noopener,noreferrer')
    } else {
      const target = item.link.replace(/^\//, '')
      if (onNavigate) onNavigate(target)
      else window.location.href = '/' + target
    }
  }

  // Badge mapping
  const BADGES = {
    latest: { text: 'Latest', class: 'badge-latest' },
    exams: { text: 'Exams', class: 'badge-exams' },
    placements: { text: 'Career', class: 'badge-placements' }
  }
  const badgeInfo = BADGES[category] || { text: 'Info', class: 'badge-latest' }

  return (
    <div
      className="news-marquee-viewport"
      onMouseEnter={() => { pausedRef.current = true }}
      onMouseLeave={() => { pausedRef.current = false }}
    >
      <div className="news-marquee-track" ref={trackRef}>
        {doubled.map((item, i) => (
          <div
            key={i}
            className="news-item"
            style={{ cursor: item.link ? 'pointer' : 'default' }}
            onClick={() => handleClick(item)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className={`news-badge ${badgeInfo.class}`}>{badgeInfo.text}</span>
              <span className="news-date">{item.date}</span>
            </div>
            <div className="news-title">{item.title}</div>
            {item.body && (
              <div className="news-desc" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: '1.4' }}>
                {item.body}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function WelcomeSection({ onNavigate }) {
  const { data } = useData()
  const TABS = data.noticeBoard || {}
  const [activeTab, setActiveTab] = useState('latest')

  const handlePrincipalRedirect = (e) => {
    e.preventDefault()
    if (onNavigate) onNavigate('administration/principal')
    else window.location.href = '/administration/principal'
  }

  return (
    <section className="welcome-section">
      <div className="gm-deco gm-ring" style={{ bottom: '10%', right: '5%', opacity: 0.05 }} aria-hidden="true"></div>
      
      <div className="container welcome-grid" style={{ position: 'relative', zIndex: 1 }}>
        {/* Left: Principal Info & Welcoming Message */}
        <ScrollReveal animation="fade-right" delay={100} threshold={0.3}>
          <div className="welcome-left">
            <div className="welcome-principal-card">
            <div className="principal-img-wrap">
              <img 
                src="/photos/principal/principal.jpg" 
                alt="Dr. B L Malleswari" 
                onError={e => {
                  e.target.onerror = null
                  e.target.src = 'https://api.dicebear.com/9.x/initials/svg?seed=BLM&backgroundColor=0B1F3A&textColor=ffffff'
                }}
              />
            </div>
            <div className="principal-quote-box">
              <i className="fa-solid fa-quote-left quote-mark"></i>
              <p className="principal-quote">
                "KMIT is distinguished by its well-designed campus, outstanding management, and qualified faculty, fostering an enriching academic atmosphere."
              </p>
              <div className="principal-meta">
                <strong>Dr. B L Malleswari</strong>
                <span>Principal, KMIT</span>
              </div>
            </div>
          </div>

          <div className="welcome-text" style={{ marginTop: '2rem' }}>
            <p className="section-eyebrow">{data.homeContent?.welcome?.eyebrow || 'Our Heritage'}</p>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: data.homeContent?.welcome?.title || 'Welcome to KMIT' }}></h2>
            {(data.homeContent?.welcome?.text || '').split('\n\n').map((p, i) => (
              <p key={i} className="welcome-para">{p}</p>
            ))}
            
            <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', marginTop: '1.8rem' }}>
              <a
                href="#"
                className="btn-outline-navy"
                onClick={e => {
                  e.preventDefault()
                  if (onNavigate) onNavigate('administration/academic-director')
                  else window.location.href = '/administration/academic-director'
                }}
              >
                Director&apos;s Message <i className="fa-solid fa-arrow-right"></i>
              </a>
              <a
                href="#"
                className="btn-outline-navy-sec"
                onClick={handlePrincipalRedirect}
              >
                Principal's Message <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
        </ScrollReveal>

        {/* Right: News Tabs */}
        <ScrollReveal animation="fade-left" delay={300} threshold={0.3}>
          <div className="news-tabs">
          <div className="tab-nav">
            {Object.keys(TABS).map(key => {
              const isActive = activeTab === key
              const isLatest = key === 'latest'
              return (
                <div
                  key={key}
                  className={`tab-btn${isActive ? ' active' : ''}`}
                  onClick={() => setActiveTab(key)}
                >
                  {isLatest && <span className="live-pulse-dot" />}
                  {key === 'latest' ? 'Latest News' : key.charAt(0).toUpperCase() + key.slice(1)}
                </div>
              )
            })}
          </div>
          <div className="tab-content">
            <NewsMarquee
              key={activeTab}
              items={TABS[activeTab] || []}
              onNavigate={onNavigate}
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
