import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import PageShell from './PageShell'
import SafePdfViewer from '../SafePdfViewer'
import ScrollReveal from '../ScrollReveal'

export default function AriiaPage() {
  const [selectedPdf, setSelectedPdf] = useState(null)

  // Prevent background scrolling when PDF viewer modal is active
  useEffect(() => {
    if (selectedPdf) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedPdf])

  // Helper to resolve absolute URLs
  const getAbsoluteUrl = (path) => {
    if (!path) return ''
    if (path.startsWith('http')) return path
    return `https://kmit.in${path}`
  }

  // Helper to get PDFJS viewer url
  const getViewerUrl = (path) => {
    const absolute = getAbsoluteUrl(path)
    return `https://kmit.in/pdfjs/web/viewer_with_download.html?file=${encodeURIComponent(absolute)}`
  }

  const parameterMetrics = [
    {
      title: 'IIC & Start-up Support',
      code: 'IIC-STARTUP',
      icon: 'fa-lightbulb',
      desc: 'Focuses on establishing dynamic Institution\'s Innovation Councils (IICs), pre-incubation/incubation centers, and startup mentoring.',
      badge: 'IIC 4-Star'
    },
    {
      title: 'IP & Tech Transfer',
      code: 'IP-TRANSFER',
      icon: 'fa-key',
      desc: 'Measures intellectual property generation, patent filings, copyrights, and successful commercialization/tech transfer.',
      badge: '150+ Patents'
    },
    {
      title: 'Courses & Co-curricular',
      code: 'COURSES-COCURR',
      icon: 'fa-book-open',
      desc: 'Evaluates curriculum offerings on entrepreneurship, design thinking, hackathons, and innovative workshops.',
      badge: 'Active Hub'
    },
    {
      title: 'Funding & Angel Support',
      code: 'FUNDING-ANGEL',
      icon: 'fa-hand-holding-dollar',
      desc: 'Assesses institutional financial resources, seed funding, and angel investments allocated to innovators.',
      badge: 'Sustained Seed'
    }
  ]

  const submissions = [
    {
      title: 'ARIIA Official Submission 2021',
      url: '/ariia/ariia_2021.pdf',
      year: '2021',
      desc: 'Official institutional submission data report filed with the Atal Ranking of Institutions on Innovation Achievements for 2021.',
      illustration: (
        <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', display: 'block' }}>
          <defs>
            <filter id="svgShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.06" />
            </filter>
          </defs>
          <rect x="0" y="0" width="200" height="120" fill="#f8fafc" />
          <g transform="translate(100, 60)" filter="url(#svgShadow)">
            <circle cx="0" cy="0" r="40" fill="var(--navy)" stroke="var(--vibrant-accent)" strokeWidth="2.5" />
            <text x="0" y="6" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="16px" letterSpacing="0.5px">2021</text>
          </g>
        </svg>
      )
    },
    {
      title: 'ARIIA Certificate of Recognition (CoR)',
      url: '/ariia/ariia-cor.pdf',
      year: 'Certificate of Recognition',
      desc: 'Official Certificate of Recognition highlighting KMIT\'s Excellent Band performance in the ARIIA rankings.',
      illustration: (
        <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', display: 'block' }}>
          <rect x="0" y="0" width="200" height="120" fill="#f8fafc" />
          <g transform="translate(100, 60)" filter="url(#svgShadow)">
            <circle cx="0" cy="0" r="40" fill="var(--navy)" stroke="var(--vibrant-accent)" strokeWidth="2.5" />
            <text x="0" y="6" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="15px" letterSpacing="0.2px">CoR</text>
          </g>
        </svg>
      )
    }
  ]

  return (
    <PageShell
      eyebrow="Rankings & Innovation"
      title="ARIIA"
      titleEm="Rankings"
      description="Atal Ranking of Institutions on Innovation Achievements — KMIT's performance metrics verifying innovation ecosystem, intellectual properties, and start-up frameworks."
      breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'ARIIA' }]}
      actions={
        <a href="https://www.ariia.gov.in/" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.8rem 1.6rem', borderRadius: '10px', fontWeight: '800', border: 'none', textDecoration: 'none' }}>
          View on ARIIA India <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.9em' }} />
        </a>
      }
    >
      {/* ── SECTION: PERFORMANCE KPI DASHBOARD ────────────────── */}
      <section className="page-section" style={{ borderBottom: '1px solid var(--light-grey)', paddingBottom: '3.5rem' }}>
        <div className="container">
          <ScrollReveal>
            <div className="section-header centered" style={{ marginBottom: '3rem' }}>
              <div className="section-eyebrow" style={{ justifyContent: 'center' }}><i className="fa-solid fa-chart-simple" /> Evaluation Parameters</div>
              <h2>Innovation &amp; <em>Achievements</em></h2>
              <div className="section-divider" style={{ margin: '0.75rem auto' }} />
              <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '1rem auto 0 auto', fontSize: '0.98rem', lineHeight: '1.6' }}>
                ARIIA ranking indices are calculated by aggregating critical parameters that assess institutional entrepreneurship programs, patenting operations, and start-up support assets.
              </p>
            </div>
          </ScrollReveal>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {parameterMetrics.map((param, index) => (
              <ScrollReveal key={index} delay={index * 100} style={{ height: '100%' }}>
                <div 
                  style={{
                  background: 'var(--white)',
                  borderRadius: '10px',
                  border: '1px solid var(--light-grey)',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.2rem',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.3s ease'
                }}
                className="param-card"
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--vibrant-accent)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lift)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--light-grey)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '10px',
                    background: 'rgba(15, 23, 42, 0.05)',
                    color: 'var(--navy)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem'
                  }}>
                    <i className={`fa-solid ${param.icon}`} />
                  </div>
                  <span style={{
                    background: 'rgba(252, 119, 0, 0.1)',
                    color: 'var(--vibrant-accent)',
                    padding: '4px 12px',
                    borderRadius: '30px',
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    letterSpacing: '0.5px'
                  }}>
                    {param.badge}
                  </span>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--navy)', fontWeight: '850', marginBottom: '0.2rem' }}>
                    {param.title}
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--brand-orange-text)', fontWeight: '800', letterSpacing: '0.5px' }}>
                    PARAMETER: {param.code}
                  </span>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.6', margin: 0 }}>
                  {param.desc}
                </p>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: CHRONOLOGICAL SUBMISSION CARDS ───────────── */}
      <section className="page-section-alt" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
        <div className="container">
          <ScrollReveal>
            <div className="section-header centered" style={{ marginBottom: '3.5rem' }}>
              <div className="section-eyebrow" style={{ justifyContent: 'center' }}><i className="fa-solid fa-file-pdf" /> Achievement Archives</div>
              <h2>ARIIA Official <em>Reports</em></h2>
              <div className="section-divider" style={{ margin: '0.75rem auto' }} />
            </div>
          </ScrollReveal>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {submissions.map((sub, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div
                  className="info-card"
                style={{
                  width: '350px',
                  padding: 0,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  borderRadius: '10px',
                  border: '1px solid var(--light-grey)',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setSelectedPdf({ url: sub.url, title: sub.title })}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'var(--vibrant-accent)'; e.currentTarget.style.boxShadow = 'var(--shadow-lift)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--light-grey)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
              >
                {/* Illustration Header Area */}
                <div style={{ height: '180px', width: '100%', borderBottom: '1px solid var(--light-grey)' }}>
                  {sub.illustration}
                </div>

                {/* Card Body */}
                <div style={{ padding: '1.5rem', textAlign: 'center', background: '#fff', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h3 style={{ fontSize: '1.05rem', color: 'var(--navy)', fontWeight: '850', marginBottom: '0.4rem' }}>
                    {sub.title}
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--brand-orange-text)', fontWeight: '800', marginBottom: '1rem', letterSpacing: '0.5px' }}>
                    STATUS: {sub.year}
                  </span>
                  <div style={{ color: 'var(--vibrant-accent)', fontWeight: '750', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    View Report <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.8em' }} />
                  </div>
                </div>
              </div>
            </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTAL MODAL PDF OVERLAY ──────────────────────────── */}
      {selectedPdf && createPortal(
        <div className="pdf-modal-backdrop" onClick={() => setSelectedPdf(null)}>
          <div className="pdf-modal-card" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="pdf-modal-header">
              <span className="pdf-modal-title">
                {selectedPdf.title}
              </span>
              
              <div className="pdf-modal-actions">
                <a
                  href={getAbsoluteUrl(selectedPdf.url)}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pdf-download-btn"
                >
                  <i className="fa-solid fa-download"></i>
                  <span className="pdf-download-btn-text">Download PDF</span>
                </a>

                <button
                  onClick={() => setSelectedPdf(null)}
                  className="pdf-close-btn"
                >
                  &times;
                </button>
              </div>
            </div>

            {/* Modal Body Wrapping Custom PDFJS Viewer */}
            <div style={{ flex: '1', background: '#f3f4f6', position: 'relative' }}>
              <SafePdfViewer
                src={getViewerUrl(selectedPdf.url)}
                title={selectedPdf.title}
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
            </div>
            
          </div>
        </div>,
        document.body
      )}
    </PageShell>
  )
}
