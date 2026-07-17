import PageShell from './PageShell'

export default function PlacementsUnderConstructionPage() {
  return (
    <PageShell
      eyebrow="Placements"
      title="Placements"
      titleEm="Portal"
      description="The official Placement and Recruitment Portal of Keshav Memorial Institute of Technology."
      breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Placements' }]}
    >
      <section className="page-section" style={{ minHeight: '65vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            background: 'var(--white)',
            borderRadius: '32px',
            border: '1px solid var(--light-grey)',
            padding: '4rem 2.5rem',
            textAlign: 'center',
            boxShadow: 'var(--shadow-lift)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background decorative glow */}
            <div style={{
              position: 'absolute',
              top: '-10%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(252, 119, 0, 0.08) 0%, rgba(255,255,255,0) 70%)',
              borderRadius: '50%',
              zIndex: 0,
              pointerEvents: 'none'
            }} />

            {/* Premium Animated Under Construction Icon */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '96px',
              height: '96px',
              borderRadius: '24px',
              background: 'rgba(252, 119, 0, 0.1)',
              color: 'var(--vibrant-accent, #fc7700)',
              fontSize: '3rem',
              marginBottom: '2.5rem',
              boxShadow: '0 12px 20px -8px rgba(252, 119, 0, 0.25)'
            }}
              className="pulse-icon"
            >
              <i className="fa-solid fa-screwdriver-wrench" />
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: '2.25rem', color: 'var(--navy)', fontWeight: '850', marginBottom: '1rem' }}>
                Portal Under <em>Construction</em>
              </h2>
              
              <div className="section-divider" style={{ margin: '1rem auto 1.5rem auto' }} />

              <p style={{
                color: '#4b5563',
                fontSize: '1.05rem',
                lineHeight: '1.7',
                maxWidth: '620px',
                margin: '0 auto 2.5rem auto'
              }}>
                Our Academic Placements & Genesis Recruitment portals are currently undergoing scheduled upgrades to incorporate the latest <strong>2025-2026 graduation records and analytics</strong>. We are building a richer dashboard experience for recruiters and students alike!
              </p>
            </div>

            {/* Highlights Grid */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem'
            }}>
              <div style={{
                background: '#f8fafc',
                padding: '1.5rem',
                borderRadius: '16px',
                border: '1px solid #f1f5f9',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
              }}>
                <div style={{ color: 'var(--vibrant-accent, #fc7700)', fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.25rem' }}>90%+</div>
                <div style={{ color: '#475569', fontSize: '0.85rem', fontWeight: '600' }}>Placement Rate</div>
              </div>
              <div style={{
                background: '#f8fafc',
                padding: '1.5rem',
                borderRadius: '16px',
                border: '1px solid #f1f5f9',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
              }}>
                <div style={{ color: 'var(--navy)', fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.25rem' }}>40+ LPA</div>
                <div style={{ color: '#475569', fontSize: '0.85rem', fontWeight: '600' }}>Highest Package</div>
              </div>
              <div style={{
                background: '#f8fafc',
                padding: '1.5rem',
                borderRadius: '16px',
                border: '1px solid #f1f5f9',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
              }}>
                <div style={{ color: 'var(--vibrant-accent, #fc7700)', fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.25rem' }}>300+</div>
                <div style={{ color: '#475569', fontSize: '0.85rem', fontWeight: '600' }}>Top Recruiters</div>
              </div>
            </div>

            {/* Contact details */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              paddingTop: '2rem',
              borderTop: '1px solid #f1f5f9'
            }}>
              <p style={{ color: '#64748b', fontSize: '0.88rem', margin: 0 }}>
                Need immediate placement coordinates or recruitment credentials?
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a href="mailto:placements@kmit.in" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--navy)',
                  fontWeight: '750',
                  fontSize: '0.92rem',
                  textDecoration: 'none',
                  background: 'rgba(15, 23, 42, 0.05)',
                  padding: '8px 16px',
                  borderRadius: '30px',
                  transition: 'background 0.2s'
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(15, 23, 42, 0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(15, 23, 42, 0.05)'}
                >
                  <i className="fa-solid fa-envelope" /> placements@kmit.in
                </a>
                <a href="tel:+914023261407" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--navy)',
                  fontWeight: '750',
                  fontSize: '0.92rem',
                  textDecoration: 'none',
                  background: 'rgba(15, 23, 42, 0.05)',
                  padding: '8px 16px',
                  borderRadius: '30px',
                  transition: 'background 0.2s'
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(15, 23, 42, 0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(15, 23, 42, 0.05)'}
                >
                  <i className="fa-solid fa-phone" /> 040-23261407
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Styled pulse micro-animation */}
      <style>{`
        @keyframes pulseGlow {
          0% {
            box-shadow: 0 0 0 0 rgba(252, 119, 0, 0.4);
          }
          70% {
            box-shadow: 0 0 0 16px rgba(252, 119, 0, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(252, 119, 0, 0);
          }
        }
        .pulse-icon {
          animation: pulseGlow 2s infinite;
        }
      `}</style>
    </PageShell>
  )
}
