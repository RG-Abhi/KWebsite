import PageShell from './PageShell'

export default function TeleunivPage() {
  return (
    <PageShell
      eyebrow="Uniqueness"
      title="Tele"
      titleEm="Univ"
      description="TeleUniv is KMIT's technological leveraging platform, revolutionizing digital education through interactive modes of delivery and cloud-based assessment structures."
      breadcrumbs={[{ label: 'Uniqueness', to: '/campus/library' }, { label: 'TeleUniv' }]}
    >
      <section className="page-section">
        <div className="container">
          <div className="section-header" style={{ marginBottom: '2.5rem' }}>
            <div className="section-eyebrow"><i className="fa-solid fa-satellite-dish"></i> Interactive Classroom</div>
            <h2>What is <em>TeleUniv</em>?</h2>
            <div className="section-divider"></div>
          </div>

          <div style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-dark, #374151)', marginBottom: '3.5rem', maxWidth: '900px' }}>
            <p style={{ margin: 0, textAlign: 'justify' }}>
              TeleUniv is a Technological Leveraging platform which is engaging and immersive at its best. It replaces the traditional method of teaching and revolutionizes the digital space by providing a unique interactive mode of delivery.
            </p>
          </div>

          <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'start' }}>
            {/* Left: Original TeleUniv Image */}
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
                  src="/assets/tessellator2.jpg" 
                  alt="KMIT TeleUniv Platform" 
                  style={{ width: '100%', height: 'auto', borderRadius: '12px', display: 'block' }}
                />
              </div>
            </div>

            {/* Right: Vision, Mission & Seeding */}
            <div className="content-text-block fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              
              {/* Vision Card */}
              <div style={{
                background: 'var(--white, #ffffff)',
                border: '1px solid var(--light-grey, #e5e7eb)',
                borderLeft: '4px solid var(--deep-teal, #14777F)',
                borderRadius: '8px',
                padding: '24px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
              }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0 0 10px 0', fontSize: '1.2rem', fontWeight: '800', color: 'var(--navy, #0f172a)' }}>
                  <i className="fa-solid fa-eye" style={{ color: 'var(--deep-teal, #14777F)' }}></i>
                  Vision
                </h4>
                <p style={{ margin: 0, fontSize: '1rem', lineHeight: '1.7', color: 'var(--text-dark, #4b5563)', textAlign: 'justify' }}>
                  To reduce the productivity and employ ability skills gap in India through a dynamic and Interactive digital process.
                </p>
              </div>

              {/* Mission Card */}
              <div style={{
                background: 'var(--white, #ffffff)',
                border: '1px solid var(--light-grey, #e5e7eb)',
                borderLeft: '4px solid var(--vibrant-accent, #fc7700)',
                borderRadius: '8px',
                padding: '24px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
              }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0 0 10px 0', fontSize: '1.2rem', fontWeight: '800', color: 'var(--navy, #0f172a)' }}>
                  <i className="fa-solid fa-bullseye" style={{ color: 'var(--vibrant-accent, #fc7700)' }}></i>
                  Mission
                </h4>
                <p style={{ margin: 0, fontSize: '1rem', lineHeight: '1.7', color: 'var(--text-dark, #4b5563)', textAlign: 'justify' }}>
                  To innovate and create differentiating factors, for an all-inclusive learning experience with live Cloud based Labs providing instant assessment.
                </p>
              </div>

              {/* The Seeding */}
              <div>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0 0 15px 0', fontSize: '1.3rem', fontWeight: '800', color: 'var(--navy, #0f172a)' }}>
                  <i className="fa-solid fa-seedling" style={{ color: '#22c55e' }}></i>
                  The Seeding
                </h4>
                <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: '1.85', color: 'var(--text-dark, #4b5563)', textAlign: 'justify' }}>
                  The seeds of curiosity took a path less trodden and creativity took form of a focused idea -- A Digital University. Solutions to the problems of brick and mortar method of teaching were long awaited. A conscious journey towards seeking information and making efforts to improve methods of imparting knowledge began. Bloated ideas were in abundance. However the need of the hour was depth in content and practical work several rounds of brain storming translated into a verified, realistic and useful platform, The TeleUniv.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
