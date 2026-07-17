import PageShell from './PageShell'

export default function KMITTVPage() {
  const highlights = [
    { icon: 'fa-video', title: '500+ Hours of Recorded Content', desc: 'Ranging from comprehensive academic curricula to specialized industry-focused technical courses.' },
    { icon: 'fa-chalkboard-user', title: 'Live Classroom Lectures', desc: 'Direct capture of live in-classroom sessions, providing students with realistic, real-time learning references.' },
    { icon: 'fa-user-graduate', title: 'Subject Matter Experts', desc: 'Acquire insights and conceptual depth straight from experienced teachers and industry professionals.' },
    { icon: 'fa-infinity', title: 'Free & Unlimited Access', desc: 'Study at your own pace. Watch any lecture as many times as needed to secure absolute conceptual clarity at zero cost.' }
  ]

  return (
    <PageShell
      eyebrow="Uniqueness"
      title="KMIT"
      titleEm="TV"
      description="KMIT TV is our premier digital video lecture portal, bridging classroom lectures and independent study with hundreds of hours of expert-delivered learning material."
      breadcrumbs={[{ label: 'Uniqueness', to: '/campus/library' }, { label: 'KMIT TV' }]}
    >
      <section className="page-section">
        <div className="container">
          <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center' }}>
            
            {/* Left: Original KMIT TV Image */}
            <div className="fade-in-up">
              <div style={{
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
                border: '1px solid var(--light-grey, #e5e7eb)',
                background: 'var(--white, #ffffff)',
                padding: '8px'
              }}>
                <img 
                  src="/assets/kmittv.png" 
                  alt="KMIT TV Platform Screenshot" 
                  style={{ width: '100%', height: 'auto', borderRadius: '12px', display: 'block' }}
                />
              </div>
            </div>

            {/* Right: Original KMIT TV Description */}
            <div className="content-text-block fade-in-up">
              <div className="section-header" style={{ marginBottom: '1.5rem' }}>
                <div className="section-eyebrow"><i className="fa-solid fa-tv"></i> Digital Video Library</div>
                <h2>Explore <em>KMIT TV</em></h2>
                <div className="section-divider"></div>
              </div>
              
              <div style={{ fontSize: '1.1rem', lineHeight: '1.9', color: 'var(--text-dark, #374151)', textAlign: 'justify', marginBottom: '2rem' }}>
                <p>
                  500 Hours of recorded content ranging from academic to industry related courses is available for usage on KMITTV. Students can listen to any session any number of times till he/she is confident about that concept. It has Videos of live class room lectures. One can learn from subject matter experts. What more, it is Free and has Unlimited access!
                </p>
              </div>

              {/* CTA Action button linking to original site */}
              <div>
                <a
                  href="http://www.kmittv.com/"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'var(--deep-teal, #14777F)',
                    color: 'white',
                    padding: '12px 28px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    boxShadow: '0 4px 12px rgba(20, 119, 127, 0.25)',
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <i className="fa-solid fa-external-link"></i>
                  Access KMIT TV Portal
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Feature cards derived from the paragraph */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-circle-play"></i> Key Platforms</div>
            <h2>Video <em>Capabilities</em></h2>
            <div className="section-divider"></div>
          </div>

          <div className="info-cards-grid fade-in-up" style={{ marginTop: '2.5rem' }}>
            {highlights.map((h, i) => (
              <div key={i} className="info-card">
                <div className="info-card-icon">
                  <i className={`fa-solid ${h.icon}`}></i>
                </div>
                <h3>{h.title}</h3>
                <p>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
