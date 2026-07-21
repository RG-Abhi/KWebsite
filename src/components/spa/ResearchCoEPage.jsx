import React, { useRef, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PageShell from './PageShell'
import './ResearchLabsPage.css' // Reuse cards classes
import './ResearchCoEPage.css'
import ResearchPublicationsSection from './ResearchPublicationsSection'
import ScrollReveal from '../ScrollReveal'

export default function ResearchCoEPage() {
  const location = useLocation()
  const navigate = useNavigate()

  // Helper to extract active CoE key from pathname or search parameter
  const getCoEKeyFromUrl = (pathname, search) => {
    const params = new URLSearchParams(search)
    const coeQuery = params.get('coe')
    if (coeQuery && ['nvidia', 'virtusa'].includes(coeQuery)) {
      return coeQuery
    }
    const path = pathname.toLowerCase()
    if (path.includes('nvidia')) return 'nvidia'
    if (path.includes('virtusa')) return 'virtusa'
    return null
  }

  // Initialize active CoE state from URL coordinates
  const [activeCoEKey, setActiveCoEKey] = useState(() => {
    return getCoEKeyFromUrl(window.location.pathname, window.location.search)
  })

  // Synchronize state dynamically when the URL changes (e.g. forward/back browser buttons)
  useEffect(() => {
    const matchedKey = getCoEKeyFromUrl(location.pathname, location.search)
    if (matchedKey !== activeCoEKey) {
      setActiveCoEKey(matchedKey)
    }
  }, [location.pathname, location.search])

  // Smooth scroll to top of details area when switching CoEs
  useEffect(() => {
    if (activeCoEKey) {
      const el = document.getElementById('active-coe-details-view')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [activeCoEKey])

  const handleCoESelect = (key) => {
    if (key) {
      navigate(`/research/coe/${key}`)
    } else {
      navigate('/research/coe')
    }
  }

  const photos = [
    { src: '/assets/coe/uttkarsh1.webp', alt: 'Uttkarsh VR Mannequin & Robotics Lab View' },
    { src: '/assets/coe/uttkarsh2.webp', alt: 'Uttkarsh IT & Computing Lab Panoramic View' },
    { src: '/assets/coe/uttkarsh3.webp', alt: 'Uttkarsh High-Performance Lab with Yellow Ceiling Stripes' },
    { src: '/assets/coe/uttkarsh4.webp', alt: 'Uttkarsh Lab Panoramic Workspace View' }
  ]

  const partners = [
    {
      key: 'nvidia',
      title: 'NVIDIA',
      image: '/assets/coe/nvidia.jpg',
      icon: 'fa-microchip',
      badge: 'Advanced AI & GPU Lab',
      desc: 'NVidia’s AI CoE (Center of Excellence) was instituted for Deep Learning, Machine Learning, Data Science and Analytics Lab with NVIDIA GPUs.'
    },
    {
      key: 'virtusa',
      title: 'Virtusa',
      image: '/assets/coe/virtusa.jpg',
      icon: 'fa-code-branch',
      badge: 'Full-Stack Software Engineering',
      desc: 'Virtusa’s Center of Excellence focusing on advanced software engineering paradigms, full-stack technologies, and industry-readiness training.'
    }
  ]

  const coeDetails = {
    nvidia: {
      title: 'NVIDIA AI Centre of Excellence',
      badge: 'Advanced AI & GPU Lab',
      icon: 'fa-microchip',
      desc: 'NVidia’s AI CoE was instituted for Deep Learning, Machine Learning, Data Science, and Analytics Lab utilizing high-performance NVIDIA GPUs.',
      about: [
        'The NVIDIA AI Center of Excellence (CoE) at KMIT is established to drive deep engineering proficiency in high-performance parallel computing, machine learning, and artificial intelligence.',
        'This CoE is equipped with state-of-the-art workstations powered by powerful NVIDIA GPUs. The infrastructure allows faculty, researchers, and advanced engineering students to train large-scale neural networks, run heavy computational fluid dynamics simulations, and deploy digital biomedical imaging diagnostic CAD tools.',
        'KMIT works in collaboration with premier national defense research organizations (such as DRDO) and industry leaders (like Teleparadigm Networks) to address computationally intensive real-world challenges.'
      ],
      focus: [
        'Deep Learning Foundations & Neural Network Optimisations',
        'High-Performance C++ CUDA Parallel Programming',
        'Computer Vision & Automated Pathology Biomarkers Detection',
        'Edge AI Deployments on NVIDIA Jetson Nano Embedded Hardware'
      ],
      infrastructure: [
        { label: 'Workstations', val: 'NVIDIA Turing & Pascal GPU-powered clusters' },
        { label: 'Development Kits', val: 'NVIDIA Jetson Nano Developer Kits' },
        { label: 'Primary Tech Stack', val: 'CUDA C++, Python, TensorFlow, PyTorch' },
        { label: 'Operating Systems', val: 'Linux Ubuntu Workstations' }
      ]
    },
    virtusa: {
      title: 'Virtusa Software Engineering CoE',
      badge: 'Full-Stack Software Engineering',
      icon: 'fa-code-branch',
      desc: 'Virtusa’s Center of Excellence focusing on advanced software engineering paradigms, full-stack technologies, and industry-readiness training.',
      about: [
        'The Virtusa Center of Excellence is KMIT\'s flagship industry-bridge training facility designed to emulate corporate enterprise software engineering practices.',
        'Through this program, students are trained in agile development methodology, microservices, containerisation, automated testing, and CI/CD pipelines. This ensures that KMIT graduates are immediately equipped for fast-paced, high-impact software engineering roles in global enterprises.',
        'Virtusa supports and co-runs competitive hackathons (such as Virtusa Neural Hack and Virtusa Codelite) to identify top programming talents and provide direct corporate placements.'
      ],
      focus: [
        'Full-Stack Technologies (React, Node.js, Spring Boot, MongoDB)',
        'Enterprise Software Design Paradigms & Microservices',
        'Automated CI/CD Pipelines & Agile Sprint Emulation',
        'Industry-Standard Quality Assurance & Automated Testing'
      ],
      infrastructure: [
        { label: 'Collaborative Space', val: 'Agile Team sprint layouts with 24/7 power backup' },
        { label: 'Project Platforms', val: 'GitLab CI, Docker, Kubernetes, AWS Sandbox' },
        { label: 'Industry Training', val: 'Virtusa Neural Hack & Codelite frameworks' },
        { label: 'Lab Capacity', val: '120+ High-end computing terminals' }
      ]
    }
  }

  const activeCoE = coeDetails[activeCoEKey]

  const gridRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)

  // Sync active dot on scroll
  const handleScroll = () => {
    if (!gridRef.current) return
    const grid = gridRef.current
    const cards = grid.querySelectorAll('.coe-carousel-card')
    let closestIdx = 0
    let minDiff = Infinity
    const gridCenter = grid.getBoundingClientRect().left + grid.offsetWidth / 2

    cards.forEach((card, idx) => {
      const rect = card.getBoundingClientRect()
      const cardCenter = rect.left + rect.width / 2
      const diff = Math.abs(cardCenter - gridCenter)
      if (diff < minDiff) {
        minDiff = diff
        closestIdx = idx
      }
    })

    setActiveIdx(closestIdx)
  }

  const scrollToSlide = (idx) => {
    if (!gridRef.current) return
    const grid = gridRef.current
    const cards = grid.querySelectorAll('.coe-carousel-card')
    if (cards[idx]) {
      const card = cards[idx]
      const offset = card.offsetLeft - (grid.offsetWidth - card.offsetWidth) / 2
      grid.scrollTo({
        left: offset,
        behavior: 'smooth'
      })
      setActiveIdx(idx)
    }
  }

  const handleNext = () => {
    const nextIdx = (activeIdx + 1) % photos.length
    scrollToSlide(nextIdx)
  }

  const handlePrev = () => {
    const prevIdx = (activeIdx - 1 + photos.length) % photos.length
    scrollToSlide(prevIdx)
  }

  // Center the first slide on initial render
  useEffect(() => {
    setTimeout(() => {
      scrollToSlide(0)
    }, 100)
  }, [])

  return (
    <PageShell
      eyebrow="Facilities"
      title="Center of Excellence"
      description="Driving innovation and advanced research through industry-backed centers of excellence at KMIT."
      breadcrumbs={[
        { label: 'Research', to: '/research' },
        { label: 'Center of Excellence' }
      ]}
    >
      <style>{`
        .coe-sidebar-container {
          display: flex;
          gap: 2.5rem;
          margin-top: 2rem;
          align-items: start;
        }
        .coe-sidebar {
          width: 320px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: #ffffff;
          border: 1px solid var(--light-grey);
          border-radius: 8px;
          padding: 1.25rem;
          box-shadow: var(--shadow-sm);
        }
        .coe-tab-btn {
          width: 100%;
          border: none;
          background: transparent;
          padding: 1.1rem 1.25rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 800;
          font-size: 0.92rem;
          display: flex;
          align-items: center;
          gap: 12px;
          text-align: left;
          color: var(--text-muted);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .coe-tab-btn i {
          font-size: 1.2rem;
          width: 24px;
          text-align: center;
        }
        .coe-tab-btn.active {
          background: var(--navy);
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(11, 31, 58, 0.2);
        }
        .coe-tab-btn.active i {
          color: var(--vibrant-accent);
        }
        .coe-tab-btn:hover:not(.active) {
          background: #f8fafc;
          color: var(--navy);
        }
        .coe-content-area {
          flex-grow: 1;
          background: #ffffff;
          border: 1px solid var(--light-grey);
          border-radius: 8px;
          padding: 3rem;
          box-shadow: var(--shadow-sm);
        }
        .coe-detail-badge {
          background: rgba(252, 119, 0, 0.1);
          color: var(--vibrant-accent);
          padding: 6px 14px;
          border-radius: 30px;
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .coe-focus-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .coe-focus-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.96rem;
          color: var(--text-dark);
          font-weight: 650;
        }
        .coe-focus-item i {
          color: #10b981;
          font-size: 1.1rem;
        }
        
        .coe-partners-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2.5rem;
          margin-top: 2rem;
        }

        /* Swipable Row on Mobiles */
        @media (max-width: 1024px) {
          .coe-sidebar-container {
            flex-direction: column;
            gap: 1.5rem;
          }
          .coe-sidebar {
            width: 100%;
            flex-direction: row;
            overflow-x: auto;
            white-space: nowrap;
            scrollbar-width: none;
            -ms-overflow-style: none;
            padding: 8px;
            border-radius: 8px;
          }
          .coe-sidebar::-webkit-scrollbar {
            display: none;
          }
          .coe-tab-btn {
            flex: 0 0 auto;
            width: auto;
            padding: 0.8rem 1.2rem;
            border-radius: 6px;
            font-size: 0.85rem;
          }
          .coe-content-area {
            padding: 2rem 1.5rem;
            border-radius: 8px;
          }
        }
      `}</style>

      {/* ── VIEW 1: OVERVIEW HUB (No active selection) ────────────────── */}
      {!activeCoEKey ? (
        <>
          {/* Photography Carousel */}
          <section className="page-section-alt">
            <div className="container">
              <ScrollReveal animation="fade-up">
              <div className="coe-carousel-wrapper">
                <button className="coe-nav-btn coe-prev" onClick={handlePrev} aria-label="Previous slide">
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button className="coe-nav-btn coe-next" onClick={handleNext} aria-label="Next slide">
                  <i className="fa-solid fa-chevron-right"></i>
                </button>

                <div 
                  className="coe-carousel-grid"
                  ref={gridRef}
                  onScroll={handleScroll}
                >
                  {photos.map((photo, idx) => (
                    <div 
                      key={idx} 
                      className={`coe-carousel-card ${idx === activeIdx ? 'active' : ''}`}
                      onClick={() => scrollToSlide(idx)}
                    >
                      <img src={photo.src} alt={photo.alt} />
                      <div className="coe-carousel-caption">
                        <span>{photo.alt}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="coe-carousel-dots">
                  {photos.map((_, idx) => (
                    <button
                      key={idx}
                      className={`coe-dot ${idx === activeIdx ? 'active' : ''}`}
                      onClick={() => scrollToSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
                
                <p className="coe-carousel-credits">Photos by : <em>Traces of Lenses club</em></p>
              </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Partners Grid */}
          <section className="page-section" style={{ paddingTop: '1rem' }}>
            <div className="container">
              <div className="section-header centered">
                <div className="section-eyebrow">Industry Partners</div>
                <h2>Centers of Excellence</h2>
                <div className="section-divider"></div>
              </div>

              <div className="coe-partners-grid">
                {partners.map((partner, idx) => (
                  <ScrollReveal key={idx} animation="fade-up" style={{ height: '100%' }}>
                  <div className="research-lab-card" style={{ cursor: 'pointer', height: '100%' }} onClick={() => handleCoESelect(partner.key)}>
                    <div className="research-lab-img-wrapper" style={{ width: '100%', height: '220px', aspectRatio: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff', borderBottom: '1px solid var(--light-grey)', padding: '1.5rem', boxSizing: 'border-box' }}>
                      <img src={partner.image} alt={partner.title} className="research-lab-img" style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                      <div className="research-lab-overlay">
                        <img src="/assets/plus.png" alt="View Details" className="research-lab-plus" />
                      </div>
                    </div>
                    {partner.desc && (
                      <div className="research-lab-content" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: '1.75rem' }}>
                        <span className="status-badge bg-crimson" style={{ alignSelf: 'start', fontSize: '0.65rem', padding: '3px 8px', fontWeight: '800', marginBottom: '0.75rem', letterSpacing: '0.5px' }}>
                          {partner.badge}
                        </span>
                        <h3 style={{ fontSize: '1.25rem', color: 'var(--navy)', fontWeight: '850', marginBottom: '0.75rem' }}>{partner.title} COE</h3>
                        <p className="research-lab-desc" style={{ flexGrow: 1, fontSize: '0.88rem', lineHeight: '1.6' }}>{partner.desc}</p>
                        <div style={{ marginTop: '1.5rem', color: 'var(--vibrant-accent)', fontWeight: '750', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          Explore COE Portfolio <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.85em' }} />
                        </div>
                      </div>
                    )}
                  </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        /* ── VIEW 2: INTERACTIVE DETAILED SWITCHER ────────────────── */
        <section className="page-section fade-in" id="active-coe-details-view" style={{ paddingTop: '1.5rem' }}>
          <div className="container">
            {/* Back Button */}
            <div style={{ marginBottom: '1.5rem' }}>
              <button 
                onClick={() => handleCoESelect(null)}
                className="back-labs-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'var(--navy)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '6px',
                  fontWeight: '800',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.2s ease'
                }}
              >
                <i className="fa-solid fa-arrow-left" /> Back to COE Overview
              </button>
            </div>

            <div className="coe-sidebar-container">
              {/* Left Panel Sidebar Switcher */}
              <ScrollReveal animation="fade-right">
              <div className="coe-sidebar">
                {partners.map(p => (
                  <button
                    key={p.key}
                    onClick={() => handleCoESelect(p.key)}
                    className={`coe-tab-btn ${activeCoEKey === p.key ? 'active' : ''}`}
                  >
                    <i className={`fa-solid ${p.icon}`} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {p.title} COE
                    </span>
                  </button>
                ))}
              </div>
              </ScrollReveal>

              {/* Right Panel Content */}
              <ScrollReveal animation="fade-left" style={{ flexGrow: 1 }}>
              <div className="coe-content-area fade-in">
                {activeCoE && (
                  <div className="fade-in" key={activeCoEKey}>
                    {/* Header Block */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--light-grey)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
                      <div>
                        <h2 style={{ fontSize: '1.8rem', color: 'var(--navy)', fontWeight: '900', margin: 0, fontFamily: 'var(--font-serif)' }}>
                          {activeCoE.title}
                        </h2>
                      </div>
                      <span className="coe-detail-badge">{activeCoE.badge}</span>
                    </div>

                    {/* About Content */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      <h4 style={{ color: 'var(--navy)', fontWeight: '850', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
                        <i className="fa-solid fa-circle-info" style={{ color: 'var(--vibrant-accent)' }} /> Lab Profile &amp; Research Abstract
                      </h4>
                      {activeCoE.about.map((para, pIdx) => (
                        <p key={pIdx} style={{ fontSize: '0.96rem', color: 'var(--text-dark)', lineHeight: '1.8', margin: 0, textAlign: 'justify' }}>
                          {para}
                        </p>
                      ))}
                    </div>

                    {/* Core Focus Areas */}
                    <div style={{ marginTop: '3.5rem' }}>
                      <h4 style={{ color: 'var(--navy)', fontWeight: '850', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
                        <i className="fa-solid fa-graduation-cap" style={{ color: 'var(--brand-orange-text)' }} /> Core Focus Areas &amp; Syllabus
                      </h4>
                      <ul className="coe-focus-list">
                        {activeCoE.focus.map((item, idx) => (
                          <li key={idx} className="coe-focus-item">
                            <i className="fa-solid fa-circle-check" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Lab Infrastructure Configurations Table */}
                    <div style={{ marginTop: '3.5rem' }}>
                      <h4 style={{ color: 'var(--navy)', fontWeight: '850', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
                        <i className="fa-solid fa-network-wired" style={{ color: '#10b981' }} /> Lab Infrastructure Specifications
                      </h4>
                      <div className="table-responsive" style={{ border: '1px solid var(--light-grey)', borderRadius: '8px', overflowX: 'auto', boxShadow: 'var(--shadow-sm)' }}>
                        <table className="table table-striped" style={{ margin: 0 }}>
                          <thead>
                            <tr style={{ background: 'var(--navy)', color: '#ffffff', borderBottom: 'none' }}>
                              <th style={{ padding: '1rem 1.25rem', fontWeight: '800', fontSize: '0.88rem', border: 'none', width: '220px' }}>Specification Parameter</th>
                              <th style={{ padding: '1rem 1.25rem', fontWeight: '800', fontSize: '0.88rem', border: 'none' }}>Deployed Infrastructure Details</th>
                            </tr>
                          </thead>
                          <tbody>
                            {activeCoE.infrastructure.map((spec, sIdx) => (
                              <tr key={sIdx} style={{ borderBottom: '1px solid var(--light-grey)', background: sIdx % 2 === 0 ? '#fcfcfd' : '#ffffff' }}>
                                <td style={{ padding: '0.95rem 1.25rem', color: 'var(--navy)', fontWeight: '800', fontSize: '0.92rem' }}>{spec.label}</td>
                                <td style={{ padding: '0.95rem 1.25rem', color: 'var(--text-dark)', fontWeight: '650', fontSize: '0.92rem' }}>{spec.val}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      )}

      {/* Publications Footer */}
      <ResearchPublicationsSection />
    </PageShell>
  )
}
