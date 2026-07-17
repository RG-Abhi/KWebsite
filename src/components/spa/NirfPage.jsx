import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import PageShell from './PageShell'
import SafePdfViewer from '../SafePdfViewer'
import ScrollReveal from '../ScrollReveal'

export default function NirfPage() {
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

  // Helper to get direct pdf url
  const getViewerUrl = (path) => {
    return getAbsoluteUrl(path)
  }

  const parameterMetrics = [
    {
      title: 'Teaching & Resources',
      code: 'TLR',
      icon: 'fa-graduation-cap',
      desc: 'Focuses on student enrollment, faculty credentials, faculty-student ratio, and financial resource allocation.',
      badge: 'Top Tier'
    },
    {
      title: 'Research & Practice',
      code: 'RPC',
      icon: 'fa-circle-nodes',
      desc: 'Reflects scientific publications, citations, sponsored projects, and active patent intellectual properties.',
      badge: '150+ Patents'
    },
    {
      title: 'Graduation Outcomes',
      code: 'GO',
      icon: 'fa-award',
      desc: 'Measures university placement rates, graduation percentages, and median salary package outcomes.',
      badge: 'Top 200 India'
    },
    {
      title: 'Outreach & Inclusivity',
      code: 'OI',
      icon: 'fa-globe',
      desc: 'Assesses gender diversity, student representation, regional balance, and facilities for challenged students.',
      badge: '100% Compliant'
    }
  ]

  const submissions = [
    {
      title: 'NIRF Submission 2026',
      url: '/nirf/nirf_2026.pdf',
      year: '2026',
      desc: 'Official institutional submission data report filed with the National Institutional Ranking Framework for 2026.',
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
            <text x="0" y="6" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="16px" letterSpacing="0.5px">2026</text>
          </g>
        </svg>
      )
    },
    {
      title: 'NIRF Submission 2025',
      url: '/nirf/nirf_2025.pdf',
      year: '2025',
      desc: 'Official institutional submission data report filed with the National Institutional Ranking Framework for 2025.',
      illustration: (
        <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', display: 'block' }}>
          <rect x="0" y="0" width="200" height="120" fill="#f8fafc" />
          <g transform="translate(100, 60)" filter="url(#svgShadow)">
            <circle cx="0" cy="0" r="40" fill="var(--navy)" stroke="var(--vibrant-accent)" strokeWidth="2.5" />
            <text x="0" y="6" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="16px" letterSpacing="0.5px">2025</text>
          </g>
        </svg>
      )
    },
    {
      title: 'NIRF Submission 2024',
      url: '/nirf/nirf_2024.pdf',
      year: '2024',
      desc: 'Official institutional submission data report filed with the National Institutional Ranking Framework for 2024.',
      illustration: (
        <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', display: 'block' }}>
          <rect x="0" y="0" width="200" height="120" fill="#f8fafc" />
          <g transform="translate(100, 60)" filter="url(#svgShadow)">
            <circle cx="0" cy="0" r="40" fill="var(--navy)" stroke="var(--vibrant-accent)" strokeWidth="2.5" />
            <text x="0" y="6" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="16px" letterSpacing="0.5px">2024</text>
          </g>
        </svg>
      )
    },
    {
      title: 'NIRF Submission 2023',
      url: '/nirf/nirf_2023.pdf',
      year: '2023',
      desc: 'Official institutional submission data report filed with the National Institutional Ranking Framework for 2023.',
      illustration: (
        <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', display: 'block' }}>
          <rect x="0" y="0" width="200" height="120" fill="#f8fafc" />
          <g transform="translate(100, 60)" filter="url(#svgShadow)">
            <circle cx="0" cy="0" r="40" fill="var(--navy)" stroke="var(--vibrant-accent)" strokeWidth="2.5" />
            <text x="0" y="6" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="16px" letterSpacing="0.5px">2023</text>
          </g>
        </svg>
      )
    },
    {
      title: 'NIRF Submission 2022',
      url: '/nirf/nirf_2022.pdf',
      year: '2022',
      desc: 'Official institutional submission data report filed with the National Institutional Ranking Framework for 2022.',
      illustration: (
        <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', display: 'block' }}>
          <rect x="0" y="0" width="200" height="120" fill="#f8fafc" />
          <g transform="translate(100, 60)" filter="url(#svgShadow)">
            <circle cx="0" cy="0" r="40" fill="var(--navy)" stroke="var(--vibrant-accent)" strokeWidth="2.5" />
            <text x="0" y="6" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="16px" letterSpacing="0.5px">2022</text>
          </g>
        </svg>
      )
    },
    {
      title: 'NIRF Submission 2021',
      url: '/nirf/nirf_2021.pdf',
      year: '2021',
      desc: 'Official institutional submission data report filed with the National Institutional Ranking Framework for 2021.',
      illustration: (
        <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', display: 'block' }}>
          <rect x="0" y="0" width="200" height="120" fill="#f8fafc" />
          <g transform="translate(100, 60)" filter="url(#svgShadow)">
            <circle cx="0" cy="0" r="40" fill="var(--navy)" stroke="var(--vibrant-accent)" strokeWidth="2.5" />
            <text x="0" y="6" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="16px" letterSpacing="0.5px">2021</text>
          </g>
        </svg>
      )
    },
    {
      title: 'NIRF Submission 2020',
      url: '/nirf/nirf_2020.pdf',
      year: '2020',
      desc: 'Official institutional submission data report filed with the National Institutional Ranking Framework for 2020.',
      illustration: (
        <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', display: 'block' }}>
          <rect x="0" y="0" width="200" height="120" fill="#f8fafc" />
          <g transform="translate(100, 60)" filter="url(#svgShadow)">
            <circle cx="0" cy="0" r="40" fill="var(--navy)" stroke="var(--vibrant-accent)" strokeWidth="2.5" />
            <text x="0" y="6" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="16px" letterSpacing="0.5px">2020</text>
          </g>
        </svg>
      )
    },
    {
      title: 'NIRF Submission 2019',
      url: '/nirf/nirf_2019.pdf',
      year: '2019',
      desc: 'Official institutional submission data report filed with the National Institutional Ranking Framework for 2019.',
      illustration: (
        <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', display: 'block' }}>
          <rect x="0" y="0" width="200" height="120" fill="#f8fafc" />
          <g transform="translate(100, 60)" filter="url(#svgShadow)">
            <circle cx="0" cy="0" r="40" fill="var(--navy)" stroke="var(--vibrant-accent)" strokeWidth="2.5" />
            <text x="0" y="6" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="16px" letterSpacing="0.5px">2019</text>
          </g>
        </svg>
      )
    },
    {
      title: 'NIRF Submission 2018',
      url: '/nirf/nirf_2018.pdf',
      year: '2018',
      desc: 'Official institutional submission data report filed with the National Institutional Ranking Framework for 2018.',
      illustration: (
        <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', display: 'block' }}>
          <rect x="0" y="0" width="200" height="120" fill="#f8fafc" />
          <g transform="translate(100, 60)" filter="url(#svgShadow)">
            <circle cx="0" cy="0" r="40" fill="var(--navy)" stroke="var(--vibrant-accent)" strokeWidth="2.5" />
            <text x="0" y="6" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="16px" letterSpacing="0.5px">2018</text>
          </g>
        </svg>
      )
    }
  ]

  return (
    <PageShell
      eyebrow="Rankings & Quality"
      title="NIRF"
      titleEm="Rankings"
      description="National Institutional Ranking Framework — KMIT's institutional data submissions verifying core performance metrics."
      breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'NIRF' }]}
      actions={
        <a href="https://www.nirfindia.org" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.8rem 1.6rem', borderRadius: '10px', fontWeight: '800', border: 'none', textDecoration: 'none' }}>
          View on NIRF India <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.9em' }} />
        </a>
      }
    >
      {/* ── SECTION: PERFORMANCE KPI DASHBOARD ────────────────── */}
      <section className="page-section" style={{ borderBottom: '1px solid var(--light-grey)', paddingBottom: '3.5rem' }}>
        <div className="container">
          <ScrollReveal>
            <div className="section-header centered" style={{ marginBottom: '3rem' }}>
              <div className="section-eyebrow" style={{ justifyContent: 'center' }}><i className="fa-solid fa-chart-simple" /> Evaluation Parameters</div>
              <h2>Core Quality <em>Indicators</em></h2>
              <div className="section-divider" style={{ margin: '0.75rem auto' }} />
              <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '1rem auto 0 auto', fontSize: '0.98rem', lineHeight: '1.6' }}>
                NIRF ranking scores are calculated by aggregating five fundamental parameter pillars that verify institutional standards, assets, and outcomes.
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
              <div className="section-eyebrow" style={{ justifyContent: 'center' }}><i className="fa-solid fa-file-pdf" /> Submission Archives</div>
              <h2>NIRF Official <em>Reports</em></h2>
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
                    ACADEMIC YEAR: {sub.year}
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
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.45)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingTop: '3rem',
          zIndex: 999999,
          cursor: 'pointer'
        }} onClick={() => setSelectedPdf(null)}>
          <div style={{
            background: '#ffffff',
            width: '94%',
            maxWidth: '850px',
            height: '88vh',
            borderRadius: '0px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
            cursor: 'default',
            overflow: 'hidden',
            border: '1px solid #d1d5db'
          }} onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div style={{
              padding: '1rem 1.5rem',
              background: '#ffffff',
              color: '#1e293b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #e2e8f0',
              borderRadius: '0px'
            }}>
              <span style={{ fontWeight: '800', fontSize: '1.05rem', color: 'var(--navy)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '85%' }}>
                {selectedPdf.title}
              </span>
              
              <button
                onClick={() => setSelectedPdf(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#9ca3af',
                  fontSize: '1.75rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: '0px',
                  transition: 'all 0.2s'
                }}
              >
                &times;
              </button>
            </div>

            {/* Modal Body Wrapping Custom PDFJS Viewer */}
            <div style={{ flex: '1', background: '#f3f4f6', position: 'relative', borderRadius: '0px' }}>
              <SafePdfViewer
                src={getViewerUrl(selectedPdf.url)}
                title={selectedPdf.title}
                style={{ width: '100%', height: '100%', border: 'none', borderRadius: '0px' }}
              />
            </div>
            
          </div>
        </div>,
        document.body
      )}
    </PageShell>
  )
}
