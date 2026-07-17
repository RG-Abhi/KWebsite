import PageShell from './PageShell'
import SafePdfViewer from '../SafePdfViewer'

export default function DocViewerPage({ eyebrow, title, titleEm, description, breadcrumbs, pdfUrl, icon, introText }) {
  const getAbsoluteUrl = (url) => {
    if (!url) return ''
    if (url.startsWith('http')) return encodeURI(url)
    if (url.startsWith('/')) return encodeURI(`https://kmit.in${url}`)
    return encodeURI(`https://kmit.in/${url}`)
  }

  const getViewerUrl = (url) => {
    const absolute = getAbsoluteUrl(url)
    if (absolute.toLowerCase().endsWith('.pdf')) {
      return `https://kmit.in/pdfjs/web/viewer_with_download.html?file=${encodeURIComponent(absolute)}`
    }
    return absolute
  }
  return (
    <PageShell
      eyebrow={eyebrow}
      title={title}
      titleEm={titleEm}
      description={description}
      breadcrumbs={breadcrumbs}
    >
      <section className="page-section">
        <div className="container">
          {introText && (
            <div style={{ maxWidth: '900px', marginBottom: '3.5rem' }}>
              {Array.isArray(introText) ? (
                introText.map((p, i) => (
                  <p key={i} style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-dark)', marginBottom: '1.5rem', textAlign: 'justify' }}>{p}</p>
                ))
              ) : (
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-dark)', textAlign: 'justify' }}>{introText}</p>
              )}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '3rem' }}>
            <div className="document-container shadow-premium" style={{ background: '#fff', borderRadius: '24px', overflow: 'hidden', height: '900px', border: '1px solid var(--light-grey)' }}>
              <div style={{ padding: '1rem 2rem', background: 'var(--navy)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <i className={`fa-solid ${icon || 'fa-file-pdf'}`}></i>
                    <span style={{ fontWeight: '700', fontSize: '0.9rem', letterSpacing: '0.5px' }}>{title} {titleEm}</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <a href={getViewerUrl(pdfUrl)} target="_blank" rel="noreferrer" style={{ color: '#fff', background: 'rgba(255,255,255,0.1)', padding: '5px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', textDecoration: 'none' }}>
                       <i className="fa-solid fa-expand"></i> OPEN FULL
                    </a>
                </div>
              </div>
              <SafePdfViewer 
                src={getViewerUrl(pdfUrl)} 
                title={`${title} ${titleEm}`}
                style={{ width: '100%', height: 'calc(100% - 48px)', border: 'none' }}
              />
            </div>

            <div className="doc-sidebar">
                <div className="sidebar-card" style={{ background: 'var(--light-grey)', padding: '2rem', borderRadius: '24px', position: 'sticky', top: '100px' }}>
                    <h5 style={{ color: 'var(--navy)', fontWeight: '800', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <i className="fa-solid fa-circle-info" style={{ color: 'var(--brand-orange-text)' }}></i> Document Info
                    </h5>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                        This official document outlines the institutional policies and strategic directives of Keshav Memorial Institute of Technology.
                    </p>
                    
                    <div className="info-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--navy)' }}>FORMAT</span>
                            <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--brand-orange-text)' }}>PDF</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--navy)' }}>STATUS</span>
                            <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#10b981' }}>OFFICIAL</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--navy)' }}>LATEST REV.</span>
                            <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-muted)' }}>2024-25</span>
                        </div>
                    </div>

                    <button 
                        onClick={() => window.open(getViewerUrl(pdfUrl))}
                        style={{ 
                            width: '100%', 
                            marginTop: '2rem', 
                            padding: '1rem', 
                            background: 'var(--navy)', 
                            color: '#fff', 
                            border: 'none', 
                            borderRadius: '12px', 
                            fontWeight: '800', 
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px'
                        }}
                    >
                        <i className="fa-solid fa-download"></i> DOWNLOAD PDF
                    </button>
                    
                    <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#fff', borderRadius: '16px', border: '1px dashed var(--navy)' }}>
                        <p style={{ fontSize: '0.75rem', color: 'var(--navy)', fontWeight: '600', textAlign: 'center', margin: '0' }}>
                           For any queries regarding institutional policies, please contact the <span className="text-crimson">Administrative Office</span>.
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
