import { useState, useEffect, useRef } from 'react'
import ScrollReveal from './ScrollReveal'

const ACHIEVEMENTS_DATA = [
  {
    icon: 'fa-building-columns',
    badgeClass: 'badge-crimson',
    value: "NAAC 'A' Grade",
    label: 'Accreditation',
    desc: 'Top national accreditation for educational excellence, curriculum design, and institutional quality.'
  },
  {
    icon: 'fa-award',
    badgeClass: 'badge-gold',
    value: 'NBA Accredited',
    label: 'Accredited Programmes',
    desc: 'B.Tech programmes accredited by National Board of Accreditation, aligning with global engineering standards.'
  },
  {
    icon: 'fa-globe',
    badgeClass: 'badge-blue',
    value: '₹1.22 Crore',
    label: 'Highest International CTC',
    desc: 'Offered to Ms. SreeLaya at Amazon, Dublin (Ireland) — showcasing the global competency of KMIT students.'
  },
  {
    icon: 'fa-graduation-cap',
    badgeClass: 'badge-orange',
    value: '95%+',
    label: 'Placement Success Rate',
    desc: 'Consistent year-on-year placement record across all engineering branches with top MNCs.'
  },
  {
    icon: 'fa-building',
    badgeClass: 'badge-green',
    value: '350+',
    label: 'Top Recruiters',
    desc: 'Leading global technology giants and Fortune 500 companies visiting campus for recruitment annual cycles.'
  },
  {
    icon: 'fa-laptop-code',
    badgeClass: 'badge-crimson',
    value: '4 GSoC Selections',
    label: 'Google Summer of Code',
    desc: 'Nischal, Srinivas, Akash, and Sai Varshith selected for Google Summer of Code 2025, a prestigious global program.'
  },
  {
    icon: 'fa-trophy',
    badgeClass: 'badge-orange',
    value: 'SIH 2025 Winners',
    label: 'National Hackathon',
    desc: 'Team ASHTOJ won the Smart India Hackathon 2025 Grand Finale, solving a Defence Ministry challenge.'
  },
  {
    icon: 'fa-star',
    badgeClass: 'badge-gold',
    value: 'NPTEL Rank #1',
    label: 'National Ranking',
    desc: 'Ranked Number One across India in the SWAYAM NPTEL Best Institute category for two consecutive years.'
  },
  {
    icon: 'fa-hand-holding-dollar',
    badgeClass: 'badge-blue',
    value: '₹25 Cr+',
    label: 'Research Funding',
    desc: 'Grants and research projects funded by national bodies including AICTE, DST, SERB, and key tech industries.'
  },
  {
    icon: 'fa-calendar-days',
    badgeClass: 'badge-green',
    value: '19+ Years',
    label: 'Educational Legacy',
    desc: 'Sustaining high-quality professional learning, backed by the 70+ year legacy of Keshav Memorial Education Society.'
  },
  {
    icon: 'fa-brain',
    badgeClass: 'badge-crimson',
    value: 'T-Hub AI Champions',
    label: 'Technical Innovation',
    desc: 'KMIT team won the Telangana AI Innovation Challenge organized by T-Hub, competing against 200+ statewide teams.'
  },
  {
    icon: 'fa-briefcase',
    badgeClass: 'badge-orange',
    value: 'ServiceNow 42.3 LPA',
    label: 'High-Value Placements',
    desc: 'Multiple students secured packages of 42.3 LPA at ServiceNow during the 2025 placement recruitment drive.'
  },
  {
    icon: 'fa-shield-halved',
    badgeClass: 'badge-blue',
    value: 'Salesforce 39.5 LPA',
    label: 'Tier-1 Placements',
    desc: '8 students selected by Salesforce at 39.5 LPA each, validating our outstanding technical training standards.'
  },
  {
    icon: 'fa-medal',
    badgeClass: 'badge-gold',
    value: 'BCCI Women Cricket',
    label: 'Sports Excellence',
    desc: 'Ms. G. Hasini (CSE AI&ML) selected for BCCI Senior Women One Day Cricket Team, representing at the national stage.'
  }
]

export default function InfiniteAchievements() {
  const [visibleCount, setVisibleCount] = useState(4)
  const [isLoading, setIsLoading] = useState(false)
  const loaderRef = useRef(null)

  useEffect(() => {
    if (visibleCount >= ACHIEVEMENTS_DATA.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target.isIntersecting && !isLoading) {
          setIsLoading(true)
          
          // Simulate dynamic data fetching delay for a smooth experience
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + 3, ACHIEVEMENTS_DATA.length))
            setIsLoading(false)
          }, 600)
        }
      },
      {
        rootMargin: '100px', // start loading before the user reaches the absolute bottom
        threshold: 0.1
      }
    )

    const currentLoader = loaderRef.current
    if (currentLoader) {
      observer.observe(currentLoader)
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader)
      }
    }
  }, [visibleCount, isLoading])

  const visibleItems = ACHIEVEMENTS_DATA.slice(0, visibleCount)

  return (
    <section className="infinite-achievements-sec">
      <div className="container">
        {/* Subsection Header matching the design */}
        <ScrollReveal animation="fade-up">
          <div className="achievements-section-header">
            <span className="achievements-eyebrow">Institutional Achievements</span>
            <h2 className="achievements-title">Excellence at a <em>Glance</em></h2>
            <div className="achievements-title-bar"></div>
          </div>
        </ScrollReveal>

        {/* Dynamic Achievements Grid */}
        <div className="achievements-grid">
          {visibleItems.map((item, idx) => {
            const isDarkCard = (idx + 1) % 4 === 0
            
            const handleShare = (e) => {
              e.stopPropagation()
              const text = `KMIT Achievement: ${item.value} (${item.label}) - ${item.desc}`
              navigator.clipboard.writeText(text).then(() => {
                const btn = e.currentTarget
                const originalHtml = btn.innerHTML
                btn.innerHTML = '<i class="fa-solid fa-check" style="color: var(--lime)"></i>'
                btn.title = 'Copied!'
                setTimeout(() => {
                  btn.innerHTML = originalHtml
                  btn.title = 'Copy achievement'
                }, 2000)
              })
            }

            return (
              <ScrollReveal key={idx} animation="fade-up" delay={(idx % 3) * 100} style={{ height: '100%' }}>
                <div 
                  className={`achievement-card${isDarkCard ? ' card-dark' : ''}`}
                  style={{ height: '100%' }}
                >
                  <button 
                    className="achievement-share-btn" 
                    onClick={handleShare}
                    title="Copy achievement info"
                    aria-label="Share achievement"
                  >
                    <i className="fa-solid fa-share-nodes"></i>
                  </button>
                  <div className={`achievement-badge ${item.badgeClass}`}>
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                  <span className="achievement-val">{item.value}</span>
                  <span className="achievement-lbl">{item.label}</span>
                  <p className="achievement-desc">{item.desc}</p>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Dynamic Scroll Loader */}
        {visibleCount < ACHIEVEMENTS_DATA.length ? (
          <div ref={loaderRef} className="achievements-loader-wrap">
            {isLoading && (
              <>
                <div className="achievements-spinner"></div>
                <span className="achievements-loader-text">Loading more milestones...</span>
              </>
            )}
          </div>
        ) : (
          <div className="achievements-loader-wrap" style={{ minHeight: 'auto', marginTop: '2rem' }}>
            <span className="achievements-loader-text" style={{ color: 'var(--gold)', fontSize: '0.9rem' }}>
              <i className="fa-solid fa-circle-check" style={{ marginRight: '6px' }}></i>
              You have viewed all institutional achievements.
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
