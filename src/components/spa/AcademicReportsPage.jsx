import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import PageShell from './PageShell'
import SafePdfViewer from '../SafePdfViewer'

export default function AcademicReportsPage() {
  const [selectedPdf, setSelectedPdf] = useState(null)

  // Prevent background page scrolling when PDF viewer modal is active
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
  const getAbsoluteUrl = (url) => {
    if (!url) return ''
    if (url.startsWith('http')) return encodeURI(url)
    return encodeURI(`https://kmit.in/examination/${url}`)
  }

  // Helper to get PDFJS viewer url
  const getViewerUrl = (url) => {
    const absolute = getAbsoluteUrl(url)
    return `https://kmit.in/pdfjs/web/viewer_with_download.html?file=${encodeURIComponent(absolute)}`
  }

  const reports = [
    {
      year: '2023-24',
      title: 'Academic Report 2023-24.pdf',
      pdfUrl: 'Academic Report 2023-24.pdf',
      imageUrl: 'https://kmit.in/examination/ar-2023-24.jpg',
      desc: 'Annual Academic and Operational Performance Report for the academic year 2023-2024, detailing department expansions, syllabus updates, and student achievements.',
      highlights: ['Autonomous evaluation frameworks', 'Key faculty research milestones', 'Sports and co-curricular highlights']
    },
    {
      year: '2022-23',
      title: 'Academic Report 2022-23.pdf',
      pdfUrl: 'Academic Report 2022-23.pdf',
      imageUrl: 'https://kmit.in/examination/ar-2022-23.jpg',
      desc: 'Annual Academic and Operational Performance Report for the academic year 2022-2023, showcasing major highlights, placement analytics, and institutional audits.',
      highlights: ['EAPCET last rank trends', 'Student council and clubs updates', 'NAAC quality compliance matrices']
    }
  ]

  return (
    <PageShell
      eyebrow="Examinations"
      title="Academic"
      titleEm="Reports"
      description="Access and view KMIT's official annual Academic and Operational Performance Reports."
      breadcrumbs={[{ label: 'Examinations', to: '/exams/notifications' }, { label: 'Academic Reports' }]}
    >
      <section className="page-section">
        <div className="container">
          <div className="section-header" style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
              <i className="fa-solid fa-file-chart-line" /> Official Publications
            </div>
            <h2 style={{ fontSize: '2rem' }}>Institutional <em>Academic Reports</em></h2>
            <div className="section-divider" style={{ margin: '0.75rem auto' }} />
            <p style={{ color: '#6b7280', maxWidth: '600px', margin: '1rem auto 0 auto', fontSize: '0.98rem', lineHeight: '1.6' }}>
              Select an academic report below to read the comprehensive institutional reviews, key achievements, departmental assessments, and academic audits.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '3rem',
            justifyContent: 'center',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {reports.map((report, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--white)',
                  borderRadius: '24px',
                  border: '1px solid var(--light-grey)',
                  boxShadow: 'var(--shadow-sm)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                className="report-card"
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.boxShadow = 'var(--shadow-lift)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                }}
              >
                {/* Image Cover container */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1.4 / 1',
                  background: '#f3f4f6',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                  onClick={() => setSelectedPdf({ url: report.pdfUrl, title: report.title })}
                >
                  <img
                    src={report.imageUrl}
                    alt={`Academic Report Cover ${report.year}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    onError={e => {
                      e.target.src = 'https://api.dicebear.com/9.x/initials/svg?seed=KMIT+AR&backgroundColor=0f172a&textColor=ffffff'
                    }}
                    className="report-image"
                  />
                  {/* Plus Icon Overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(15, 23, 42, 0.45)',
                    opacity: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'opacity 0.3s ease'
                  }}
                    className="report-overlay"
                  >
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: 'var(--white)',
                      color: 'var(--navy)',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: '1.3rem',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                    }}>
                      <i className="fa-solid fa-eye" />
                    </div>
                  </div>
                </div>

                {/* Report Content Details */}
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--navy)', fontWeight: '800', margin: 0 }}>
                      Academic Report {report.year}
                    </h3>
                    <span style={{
                      background: 'rgba(252, 119, 0, 0.1)',
                      color: 'var(--vibrant-accent, #fc7700)',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '0.72rem',
                      fontWeight: '800',
                      letterSpacing: '0.5px'
                    }}>
                      PDF REPORT
                    </span>
                  </div>

                  <p style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                    {report.desc}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {report.highlights.map((highlight, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.85rem' }}>
                        <i className="fa-solid fa-circle-check" style={{ color: '#10b981', fontSize: '0.88rem' }} />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions buttons */}
                  <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #f3f4f6' }}>
                    <button
                      onClick={() => setSelectedPdf({ url: report.pdfUrl, title: report.title })}
                      style={{
                        flex: 1,
                        background: 'var(--navy)',
                        color: 'var(--white)',
                        border: 'none',
                        padding: '0.8rem',
                        borderRadius: '10px',
                        fontWeight: '800',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'background 0.2s'
                      }}
                    >
                      <i className="fa-solid fa-book-open" /> Read Report
                    </button>
                    <a
                      href={getAbsoluteUrl(report.pdfUrl)}
                      download
                      style={{
                        background: '#f3f4f6',
                        color: 'var(--navy)',
                        border: '1px solid #e5e7eb',
                        padding: '0.8rem 1.1rem',
                        borderRadius: '10px',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#e5e7eb'}
                      onMouseLeave={e => e.currentTarget.style.background = '#f3f4f6'}
                    >
                      <i className="fa-solid fa-download" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Styled inline card overlay transitions */}
      <style>{`
        .report-card:hover .report-image {
          transform: scale(1.05);
        }
        .report-card:hover .report-overlay {
          opacity: 1 !important;
        }
      `}</style>

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
