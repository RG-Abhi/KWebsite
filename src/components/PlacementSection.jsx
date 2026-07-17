import { useEffect, useRef } from 'react'
import { useData } from '../context/websiteData'
import { placementsData } from '../context/placementsData'

function useCountUp(target, enabled, speedMultiplier = 1) {
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    if (!enabled || !ref.current) return
    const el = ref.current
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 2000 * speedMultiplier
        let startTime = null
        const targetNum = parseFloat(target) || 0
        const isFloat = target.toString().includes('.')
        
        const update = (now) => {
          if (!startTime) startTime = now
          const progress = Math.min((now - startTime) / duration, 1)
          const currentVal = progress * targetNum
          
          el.textContent = isFloat ? currentVal.toFixed(2) : Math.floor(currentVal)
          
          if (progress < 1) requestAnimationFrame(update)
          else el.textContent = target
        }
        requestAnimationFrame(update)
        observer.unobserve(el)
      }
    }, { threshold: 0.2 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, enabled, speedMultiplier])

  return ref
}

function PSCard({ card, index }) {
  // Extract number from string, e.g. "1.22 Cr" -> "1.22", "8.26 LPA" -> "8.26", "702" -> "702"
  const numericPart = card.val.replace(/[^\d.]/g, '')
  const suffix = card.val.replace(/[\d.]/g, '')
  const countRef = useCountUp(numericPart, true, 0.8 + index * 0.2)

  return (
    <div 
      className="ps-card" 
      style={{ '--i': index }}
      onClick={() => { window.location.href = '/placements' }}
    >
      <i className={`fa-solid ${card.icon} ps-icon`}></i>
      <div style={{ flexGrow: 1 }}>
        <span className="ps-val">
          <span ref={countRef}>0</span>{suffix}
        </span>
        <span className="ps-lbl">{card.lbl}</span>
      </div>
      <span className="ps-hover-arrow">
        View Full Report <i className="fa-solid fa-arrow-right-long"></i>
      </span>
    </div>
  )
}

export default function PlacementSection() {
  const { data } = useData()
  
  // Dynamic stats mapping from context
  const PS_CARDS = data.placementStats || [
    { icon: 'fa-chart-line', val: '1.22 Cr', lbl: 'Highest Package' },
    { icon: 'fa-medal', val: '8.26 LPA', lbl: 'Average Package' },
    { icon: 'fa-users', val: '702', lbl: 'Offers (2025-26)' },
  ]

  // Create rolling ticker placements from real data
  const latestPlacements = placementsData["2025-26"] || []
  // Slice top 12 placements for high-impact ticker display
  const tickerPlacements = latestPlacements.slice(0, 15)

  return (
    <section className="placement-section">
      <div className="gm-deco gm-stripe" style={{ top: '8%', right: '4%', opacity: 0.15 }}></div>
      <div className="gm-deco gm-dots" style={{ top: '20%', left: '3%', opacity: 0.1 }}></div>
      <div className="gm-deco gm-ring" style={{ bottom: '5%', left: '12%', opacity: 0.15, transform: 'rotate(110deg)' }}></div>
      
      <div className="container placement-grid" style={{ position: 'relative', zIndex: 2 }}>
        <div className="placement-text">
          <p className="section-eyebrow">Career Excellence</p>
          <h2 className="section-title">Placement Success</h2>
          <p>
            KMIT has consistently delivered one of the highest placement rates among engineering colleges
            in Telangana, with industry giants visiting campus year after year. Our graduates have secured
            roles at global giants like Amazon, Microsoft, Salesforce, and Google.
          </p>

          <div className="genesis-box">
            <i className="fa-solid fa-bolt"></i>
            <div>
              <h4>Genesis Finishing School</h4>
              <p>
                A premier finishing school program preparing students for lucrative careers in emerging
                technologies — powered by Genesis Solutions. Included as a standard part of KMIT's premium B.Tech experience.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <a 
              href="/placements" 
              className="btn-vibrant"
              onClick={(e) => {
                e.preventDefault()
                window.location.href = '/placements'
              }}
            >
              <i className="fa-solid fa-file-pdf"></i> View Placement Report
            </a>
          </div>
        </div>

        <div className="ps-cards">
          {PS_CARDS.map((card, i) => (
            <PSCard key={i} card={card} index={i} />
          ))}
        </div>
      </div>

      {/* Dynamic Placements Rolling Ticker */}
      {tickerPlacements.length > 0 && (
        <div className="placement-ticker-wrap">
          <div className="placement-ticker-label">
            <i className="fa-solid fa-bolt"></i> Live Placement Selects
          </div>
          <div className="placement-ticker-scroll">
            <div className="placement-ticker-track">
              {/* Duplicate list to make infinite horizontal marquee loop seamless */}
              {[...tickerPlacements, ...tickerPlacements].map((item, idx) => (
                <div key={idx} className="placement-ticker-item">
                  <span className="ticker-comp">{item.company}</span>
                  <span className="ticker-divider">·</span>
                  <span className="ticker-selects">{item.selects} Select{item.selects > 1 ? 's' : ''}</span>
                  <span className="ticker-divider">·</span>
                  <span className="ticker-ctc">₹{item.ctc} {item.ctc.includes('LPA') || item.ctc.includes('Post') ? '' : 'LPA'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
