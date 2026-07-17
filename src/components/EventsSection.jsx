import { useData } from '../context/websiteData'
import { useNavigate } from 'react-router-dom'
import ScrollReveal from './ScrollReveal'

// Bold badge colors matching CMR exactly
const BADGE = {
  latest:     { bg: '#FF3E9D', label: 'NEWS' },      // Hot pink
  exams:      { bg: '#22C55E', label: 'EXAMS' },     // Green
  placements: { bg: '#F97316', label: 'PLACEMENTS' }, // Orange
}

const SLOT_IMAGES = {
  card0: {
    unsplash: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
    local: '/photos/annualevents/patang_2026.webp'
  },
  card1: {
    unsplash: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
    local: '/photos/annualevents/Graduation_day_25.webp'
  },
  card2: {
    unsplash: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
    local: '/photos/hero/Screenshot%202026-03-28%20003423.png'
  },
  card3: {
    unsplash: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
    local: '/photos/annualevents/prakalp_expo.webp'
  }
}

export default function EventsSection({ onNavigate }) {
  const { data } = useData()
  const navigate = useNavigate()
  const board = data.noticeBoard || {}

  const latestItems = board.latest || []
  const examItems = board.exams || []
  const placementItems = board.placements || []

  // Safely extract notice items and assign their categories
  const card0 = latestItems[0] ? { ...latestItems[0], cat: 'latest' } : null
  const card1 = examItems[0] ? { ...examItems[0], cat: 'exams' } : null
  const card2 = placementItems[0] ? { ...placementItems[0], cat: 'placements' } : null
  const card3 = latestItems[1] ? { ...latestItems[1], cat: 'latest' } : null
  const card4 = examItems[1] ? { ...examItems[1], cat: 'exams' } : null
  const card5 = placementItems[1] ? { ...placementItems[1], cat: 'placements' } : null

  const handleCardClick = (card) => {
    if (!card.link) return;
    
    if (card.link.startsWith('http')) {
      window.open(card.link, '_blank', 'noopener,noreferrer');
    } else {
      const target = card.link.replace(/^\//, '');
      if (onNavigate) {
        onNavigate(target);
      } else {
        navigate('/' + target);
      }
    }
  }

  const goEvents = () => {
    if (onNavigate) onNavigate('student-life/events')
    else navigate('/student-life/events')
  }

  const getCardStyle = (card) => ({
    cursor: card && card.link ? 'pointer' : 'default',
    marginBottom: '1.5rem' // Used for card1
  })

  return (
    <section className="trending-section">
      <div className="tr-dark-band"></div>

      {/* ── Premium CSS Geometric Shapes ── */}
      <div className="gm-deco gm-ring" style={{ top: '15%', left: '5%', opacity: 0.1, transform: 'scale(0.8)' }}></div>
      <div className="gm-deco gm-stripe" style={{ top: '60%', left: '12%', opacity: 0.15, transform: 'rotate(-15deg)' }}></div>
      <div className="gm-deco gm-dots" style={{ bottom: '10%', right: '8%', opacity: 0.12 }}></div>

      <div className="container trending-inner">
        {/* ── Section Header (Left) ── */}
        <ScrollReveal animation="fade-right" delay={100} threshold={0.3}>
          <div className="trending-header">
            <h2 className="trending-title">What's<br />trending</h2>
            <button className="trending-pill-btn" onClick={goEvents}>
              NEWS &amp; BLOGS &nbsp;<i className="fa-solid fa-arrow-right" />
            </button>
          </div>
        </ScrollReveal>

        {/* ── Card Grid (Right) ── */}
        <div className="trending-grid">
          {/* Col 1 */}
          <div className="tr-col tr-col-left">
            {card0 && (
              <ScrollReveal animation="fade-up" delay={200}>
                <div className="tr-card" onClick={() => handleCardClick(card0)} style={{ cursor: card0.link ? 'pointer' : 'default' }}>
                  <div className="tr-card-img" style={{ aspectRatio: '1/1.5', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <img 
                      src={SLOT_IMAGES.card0.unsplash} 
                      onError={(e) => { e.target.src = SLOT_IMAGES.card0.local; e.target.onerror = null; }}
                      alt={card0.cat} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    <span className="tr-badge" style={{ background: BADGE[card0.cat]?.bg || '#FF3E9D' }}>
                      {BADGE[card0.cat]?.label || 'NEWS'}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            )}
            {card3 && (
              <ScrollReveal animation="fade-up" delay={300}>
                <div className="tr-card" onClick={() => handleCardClick(card3)} style={{ cursor: card3.link ? 'pointer' : 'default' }}>
                  <div className="tr-card-img" style={{ aspectRatio: '1/1.2', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <img 
                      src={SLOT_IMAGES.card3.unsplash} 
                      onError={(e) => { e.target.src = SLOT_IMAGES.card3.local; e.target.onerror = null; }}
                      alt={card3.cat} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    <span className="tr-badge" style={{ background: BADGE[card3.cat]?.bg || '#FF3E9D' }}>
                      {BADGE[card3.cat]?.label || 'NEWS'}
                    </span>
                  </div>
                  <div className="tr-card-info">
                     <p className="tr-card-title">{card3.title}</p>
                     {card3.body && <p className="tr-card-desc" style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px', lineHeight: '1.4' }}>{card3.body}</p>}
                     <span className="tr-card-date">{card3.date}</span>
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Col 2 */}
          <div className="tr-col tr-col-mid">
            {card1 && (
              <ScrollReveal animation="fade-up" delay={400}>
                <div className="tr-card" onClick={() => handleCardClick(card1)} style={getCardStyle(card1)}>
                  <div className="tr-card-img" style={{ aspectRatio: '1/1', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <img 
                      src={SLOT_IMAGES.card1.unsplash} 
                      onError={(e) => { e.target.src = SLOT_IMAGES.card1.local; e.target.onerror = null; }}
                      alt={card1.cat} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    <span className="tr-badge" style={{ background: BADGE[card1.cat]?.bg || '#22C55E' }}>
                      {BADGE[card1.cat]?.label || 'EXAMS'}
                    </span>
                  </div>
                  <div className="tr-card-info">
                     <p className="tr-card-title" style={{ fontSize: '0.85rem' }}>{card1.title}</p>
                     {card1.body && <p className="tr-card-desc" style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px', lineHeight: '1.4' }}>{card1.body}</p>}
                  </div>
                </div>
              </ScrollReveal>
            )}
            {card4 && (
              <ScrollReveal animation="fade-up" delay={500}>
                <div className="tr-card" onClick={() => handleCardClick(card4)} style={{ cursor: card4.link ? 'pointer' : 'default' }}>
                  <div className="tr-card-info">
                     <span className="tr-badge" style={{ background: BADGE[card4.cat]?.bg || '#F59E0B', position: 'static', marginBottom: '0.5rem' }}>
                      {BADGE[card4.cat]?.label || 'EXAMS'}
                    </span>
                     <p className="tr-card-title">{card4.title}</p>
                     {card4.body && <p className="tr-card-desc" style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px', lineHeight: '1.4' }}>{card4.body}</p>}
                     <span className="tr-card-date">{card4.date}</span>
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Col 3 */}
          <div className="tr-col tr-col-right" style={{ paddingTop: '4rem' }}>
            {card2 && (
              <ScrollReveal animation="fade-up" delay={600}>
                <div className="tr-card" onClick={() => handleCardClick(card2)} style={{ cursor: card2.link ? 'pointer' : 'default' }}>
                  <div className="tr-card-img" style={{ aspectRatio: '1/1', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <img 
                      src={SLOT_IMAGES.card2.unsplash} 
                      onError={(e) => { e.target.src = SLOT_IMAGES.card2.local; e.target.onerror = null; }}
                      alt={card2.cat} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    <span className="tr-badge" style={{ background: BADGE[card2.cat]?.bg || '#F97316' }}>
                      {BADGE[card2.cat]?.label || 'PLACEMENTS'}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            )}
            {card5 && (
              <ScrollReveal animation="fade-up" delay={700}>
                <div className="tr-card" onClick={() => handleCardClick(card5)} style={{ cursor: card5.link ? 'pointer' : 'default' }}>
                  <div className="tr-card-info">
                     <span className="tr-badge" style={{ background: BADGE[card5.cat]?.bg || '#F97316', position: 'static', marginBottom: '0.5rem' }}>
                      {BADGE[card5.cat]?.label || 'PLACEMENTS'}
                    </span>
                     <p className="tr-card-title">{card5.title}</p>
                     {card5.body && <p className="tr-card-desc" style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px', lineHeight: '1.4' }}>{card5.body}</p>}
                     <span className="tr-card-date">{card5.date}</span>
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
