import { useState } from 'react'
import PageShell from './PageShell'
import SafePdfViewer from '../SafePdfViewer'

// ── PDF documents — exact source from kmit.in/academics/tlevaluation.php ──────
const DOCUMENTS = [
  {
    id: 'attainments',
    label: 'Attainments',
    icon: 'fa-chart-line',
    desc: 'Program Outcome Attainments — CO/PO attainment levels for all programmes.',
    pdfPath: '/academics/ATTAINMENTS.pdf',
    color: 'var(--navy)',
    bg: 'rgba(15,23,42,0.08)',
  },
  {
    id: 'outcomes',
    label: 'Course Outcomes',
    icon: 'fa-bullseye',
    desc: 'Course Outcome documents — defined learning outcomes for each course.',
    pdfPath: '/academics/Course Outcomes.pdf',
    color: 'var(--brand-orange-text)',
    bg: 'rgba(165,28,48,0.08)',
  },
  {
    id: 'tlprocess',
    label: 'Teaching Learning Process',
    icon: 'fa-chalkboard-user',
    desc: 'Teaching–Learning Process support documentation — methods, strategies, and evidence.',
    pdfPath: '/academics/TLP SUPPORTT DOCUMENT.pdf',
    color: '#0e7490',
    bg: 'rgba(14,116,144,0.08)',
  },
]

const BASE = 'https://kmit.in'

function getViewerUrl(path) {
  const abs = `${BASE}${path}`
  return `${BASE}/pdfjs/web/viewer_with_download.html?file=${encodeURIComponent(abs)}`
}

function getDirectUrl(path) {
  return `${BASE}${encodeURI(path)}`
}

// ── PDF Viewer Modal ──────────────────────────────────────────────────────────
function PdfModal({ doc, onClose }) {
  if (!doc) return null
  const viewerUrl = getViewerUrl(doc.pdfPath)
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.75)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
        backdropFilter: 'blur(6px)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '1000px',
          height: '90vh',
          background: 'var(--white)',
          borderRadius: '20px',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
        }}
      >
        {/* Modal header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1rem 1.5rem',
          borderBottom: '1px solid var(--light-grey)',
          background: 'var(--navy)',
          color: '#fff',
          gap: '1rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className={`fa-solid ${doc.icon}`} style={{ color: 'var(--vibrant-accent)' }} />
            <span style={{ fontWeight: '800', fontSize: '1rem' }}>{doc.label}</span>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <a
              href={getDirectUrl(doc.pdfPath)}
              target="_blank"
              rel="noopener noreferrer"
              download
              title="Download PDF"
              style={{
                color: '#fff', textDecoration: 'none',
                background: 'rgba(255,255,255,0.15)',
                padding: '6px 14px', borderRadius: '8px',
                fontSize: '0.85rem', fontWeight: '700',
                display: 'flex', alignItems: 'center', gap: '6px',
                transition: 'background 0.2s',
              }}
            >
              <i className="fa-solid fa-download" /> Download
            </a>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: 'none', color: '#fff',
                width: '36px', height: '36px',
                borderRadius: '8px', cursor: 'pointer',
                fontSize: '1.1rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s',
              }}
              title="Close"
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
        </div>

        {/* PDF iframe */}
        <SafePdfViewer
          src={viewerUrl}
          style={{ flex: 1, border: 'none', width: '100%' }}
          title={doc.label}
          allow="fullscreen"
        />
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function TeachingLearningEvaluationPage() {
  const [activeTab, setActiveTab] = useState('attainments')
  const [modalDoc, setModalDoc] = useState(null)

  const activeDoc = DOCUMENTS.find(d => d.id === activeTab)

  return (
    <PageShell
      eyebrow="Academics"
      title="Teaching Learning"
      titleEm="Evaluation"
      description="Access KMIT's official Teaching–Learning Evaluation documents including CO/PO attainments, course outcomes, and the teaching–learning process support document."
      breadcrumbs={[
        { label: 'Academics', to: '/academics' },
        { label: 'Teaching Learning Evaluation' },
      ]}
    >
      {/* ── Tab Pill Navigation — exact structure from tlevaluation.php ─────── */}
      <section className="page-section">
        <div className="container">

          {/* Section heading */}
          <div className="section-header" style={{ textAlign: 'center', alignItems: 'center', marginBottom: '3rem' }}>
            <div className="section-eyebrow">
              <i className="fa-solid fa-book-open-reader" /> Documents
            </div>
            <h2>TL Evaluation <em>Documents</em></h2>
            <div className="section-divider" />
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.75' }}>
              The following documents form part of KMIT's Teaching–Learning Evaluation framework as mandated by NBA and NAAC accreditation guidelines.
            </p>
          </div>

          {/* Pill Tab Buttons — mirrors the original nav-pills newsandbulletins */}
          <div style={{
            display: 'flex', gap: '0', flexWrap: 'nowrap',
            borderRadius: '14px', overflow: 'hidden',
            border: '1.5px solid var(--light-grey)',
            background: 'var(--off-white)',
            maxWidth: '700px', margin: '0 auto 3rem auto',
            boxShadow: 'var(--shadow-sm)',
          }}>
            {DOCUMENTS.map(doc => {
              const isActive = activeTab === doc.id
              return (
                <button
                  key={doc.id}
                  id={`tl-tab-${doc.id}`}
                  onClick={() => setActiveTab(doc.id)}
                  style={{
                    flex: 1,
                    padding: '1rem 0.75rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '800',
                    fontSize: '0.82rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '7px',
                    background: isActive ? 'var(--navy)' : 'transparent',
                    color: isActive ? '#fff' : 'var(--text-muted)',
                    borderRight: doc.id !== 'tlprocess' ? '1.5px solid var(--light-grey)' : 'none',
                    transition: 'all 0.25s',
                  }}
                >
                  <i className={`fa-solid ${doc.icon}`} style={{ fontSize: '0.9rem' }} />
                  <span style={{ display: 'block', textAlign: 'center', lineHeight: 1.3 }}>
                    {doc.label}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Active document card */}
          {activeDoc && (
            <div
              key={activeDoc.id}
              style={{
                maxWidth: '700px', margin: '0 auto',
                background: 'var(--white)',
                borderRadius: '24px',
                border: '1.5px solid var(--light-grey)',
                boxShadow: 'var(--shadow-lift)',
                overflow: 'hidden',
                animation: 'fadeInUp 0.3s ease',
              }}
            >
              {/* Card colour band */}
              <div style={{
                height: '6px',
                background: activeDoc.color,
              }} />

              <div style={{ padding: '3rem' }}>
                {/* Icon + label */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div style={{
                    flexShrink: 0,
                    width: '70px', height: '70px',
                    background: activeDoc.bg,
                    borderRadius: '18px',
                    display: 'grid', placeItems: 'center',
                    color: activeDoc.color,
                    fontSize: '1.8rem',
                  }}>
                    <i className={`fa-solid ${activeDoc.icon}`} />
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '1.5rem', fontWeight: '850',
                      color: 'var(--navy)', marginBottom: '0.5rem',
                    }}>{activeDoc.label}</h3>
                    <p style={{
                      fontSize: '1rem', color: 'var(--text-muted)',
                      lineHeight: '1.75', margin: 0,
                    }}>{activeDoc.desc}</p>
                  </div>
                </div>

                {/* File info row */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  background: 'var(--off-white)',
                  border: '1px solid var(--light-grey)',
                  borderRadius: '12px',
                  padding: '1rem 1.5rem',
                  marginBottom: '2rem',
                  flexWrap: 'wrap',
                }}>
                  <i className="fa-regular fa-file-pdf" style={{ color: 'var(--brand-orange-text)', fontSize: '1.5rem', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: '150px' }}>
                    <div style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '0.9rem' }}>
                      {activeDoc.pdfPath.split('/').pop()}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      PDF Document · Source: kmit.in
                    </div>
                  </div>
                  <span style={{
                    background: 'rgba(34,197,94,0.1)',
                    color: '#166534',
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    flexShrink: 0,
                  }}>
                    <i className="fa-solid fa-circle-check" style={{ marginRight: '4px' }} />
                    Available
                  </span>
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button
                    id={`view-pdf-${activeDoc.id}`}
                    onClick={() => setModalDoc(activeDoc)}
                    style={{
                      flex: 1, minWidth: '160px',
                      background: 'var(--navy)',
                      color: '#fff',
                      border: 'none',
                      padding: '1rem 1.5rem',
                      borderRadius: '12px',
                      fontWeight: '800',
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', gap: '10px',
                      transition: 'all 0.25s',
                      boxShadow: '0 4px 12px rgba(15,23,42,0.25)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#1e3a5f'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.transform = 'none' }}
                  >
                    <i className="fa-solid fa-eye" /> View PDF
                  </button>

                  <a
                    href={getViewerUrl(activeDoc.pdfPath)}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`open-pdf-${activeDoc.id}`}
                    style={{
                      flex: 1, minWidth: '160px',
                      background: 'transparent',
                      color: 'var(--navy)',
                      border: '2px solid var(--navy)',
                      padding: '1rem 1.5rem',
                      borderRadius: '12px',
                      fontWeight: '800',
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', gap: '10px',
                      textDecoration: 'none',
                      transition: 'all 0.25s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--navy)' }}
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square" /> Open in New Tab
                  </a>

                  <a
                    href={getDirectUrl(activeDoc.pdfPath)}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    id={`download-pdf-${activeDoc.id}`}
                    style={{
                      flexShrink: 0,
                      background: 'rgba(165,28,48,0.08)',
                      color: 'var(--brand-orange-text)',
                      border: '2px solid rgba(165,28,48,0.2)',
                      padding: '1rem 1.25rem',
                      borderRadius: '12px',
                      fontWeight: '800',
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', gap: '8px',
                      textDecoration: 'none',
                      transition: 'all 0.25s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--crimson)'; e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(165,28,48,0.08)'; e.currentTarget.style.color = 'var(--crimson)' }}
                    title="Download PDF"
                  >
                    <i className="fa-solid fa-download" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── All 3 documents grid (overview) ─────────────────────────────────── */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', alignItems: 'center' }}>
            <div className="section-eyebrow">
              <i className="fa-solid fa-folder-open" /> All Documents
            </div>
            <h2>Document <em>Repository</em></h2>
            <div className="section-divider" />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
            marginTop: '3rem',
          }}>
            {DOCUMENTS.map((doc, i) => (
              <div
                key={doc.id}
                style={{
                  background: 'var(--white)',
                  borderRadius: '20px',
                  border: '1.5px solid var(--light-grey)',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.3s',
                  display: 'flex', flexDirection: 'column', gap: '1.25rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = doc.color; e.currentTarget.style.boxShadow = 'var(--shadow-lift)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--light-grey)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
              >
                {/* Serial number badge */}
                <div style={{
                  position: 'absolute', top: '1.25rem', right: '1.25rem',
                  width: '28px', height: '28px',
                  background: doc.bg, borderRadius: '50%',
                  display: 'grid', placeItems: 'center',
                  fontSize: '0.75rem', fontWeight: '900',
                  color: doc.color,
                }}>
                  {i + 1}
                </div>

                {/* Icon */}
                <div style={{
                  width: '52px', height: '52px',
                  background: doc.bg, borderRadius: '14px',
                  display: 'grid', placeItems: 'center',
                  color: doc.color, fontSize: '1.4rem',
                }}>
                  <i className={`fa-solid ${doc.icon}`} />
                </div>

                {/* Label & desc */}
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '0.4rem' }}>
                    {doc.label}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.65', margin: 0 }}>
                    {doc.desc}
                  </p>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.6rem', marginTop: 'auto', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => { setActiveTab(doc.id); setModalDoc(doc) }}
                    style={{
                      flex: 1,
                      background: doc.color,
                      color: '#fff',
                      border: 'none',
                      padding: '0.65rem 1rem',
                      borderRadius: '9px',
                      fontWeight: '800',
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', gap: '6px',
                      transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    <i className="fa-solid fa-eye" /> View
                  </button>
                  <a
                    href={getDirectUrl(doc.pdfPath)}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: '9px',
                      background: doc.bg,
                      color: doc.color,
                      border: 'none',
                      fontWeight: '800',
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '5px',
                      textDecoration: 'none',
                      transition: 'opacity 0.2s',
                    }}
                    title="Download"
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    <i className="fa-solid fa-download" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Info Note ────────────────────────────────────────────────────────── */}
      <section className="page-section">
        <div className="container">
          <div style={{
            maxWidth: '700px', margin: '0 auto',
            background: 'rgba(14,116,144,0.06)',
            border: '1.5px solid rgba(14,116,144,0.2)',
            borderRadius: '16px',
            padding: '1.5rem 2rem',
            display: 'flex', gap: '1rem', alignItems: 'flex-start',
          }}>
            <i className="fa-solid fa-circle-info" style={{ color: '#0e7490', fontSize: '1.25rem', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontWeight: '800', color: '#0e7490', marginBottom: '0.4rem' }}>About These Documents</div>
              <p style={{ fontSize: '0.9rem', color: '#374151', lineHeight: '1.75', margin: 0 }}>
                These documents are maintained by KMIT as part of its NBA/NAAC accreditation framework.
                They outline the Course Outcome (CO) attainment levels, Program Outcome (PO) mapping, and the
                overall Teaching–Learning Process adopted across all B.Tech programmes.
                All documents are sourced directly from the official KMIT website.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PDF Viewer Modal ─────────────────────────────────────────────────── */}
      {modalDoc && <PdfModal doc={modalDoc} onClose={() => setModalDoc(null)} />}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </PageShell>
  )
}
