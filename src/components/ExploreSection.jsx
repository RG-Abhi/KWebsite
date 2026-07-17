import { useData } from '../context/websiteData'
import { resolveImageUrl } from '../utils/resolveImage'
import ScrollReveal from './ScrollReveal'

export default function ExploreSection({ onNavigate }) {
  const { data } = useData()
  const CARDS = data.explore
  return (
    <section className="explore-section">
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <ScrollReveal animation="fade-up">
          <div className="explore-header">
            <h2 className="section-title">Explore KMIT</h2>
            <p className="section-subtitle">Discover opportunities, resources, and student life at KMIT</p>
          </div>
        </ScrollReveal>
        <div className="explore-grid">
          {CARDS?.map((card, i) => (
            <ScrollReveal key={i} animation="fade-up" delay={i * 100 + 100} style={{ height: '100%' }}>
              <div
                className="explore-card"
                onClick={() => card?.section && onNavigate(card.section)}
                style={{ cursor: card?.section ? 'pointer' : 'default', '--i': i, height: '100%' }}
              >
                {resolveImageUrl(card) && (
                  <img
                    className="explore-bg-img"
                    src={resolveImageUrl(card)}
                    alt={card.title}
                    loading="lazy"
                    onError={(e) => {
                      const img = e.target
                      const alt = resolveImageUrl(card, true)
                      if (alt && img.src !== alt && !img.dataset.failedFallback) {
                        img.src = alt
                        img.dataset.failedFallback = 'true'
                      }
                    }}
                  />
                )}
                <div className="ec-icon"><i className={`fa-solid ${card?.icon ?? 'fa-star'}`}></i></div>
                <h3 className="ec-title">{card?.title ?? 'Untitled'}</h3>
                <p className="ec-desc">{card?.desc ?? ''}</p>
                {card?.section && (
                  <span className="ec-link">
                    Learn More <i className="fa-solid fa-arrow-right"></i>
                  </span>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
