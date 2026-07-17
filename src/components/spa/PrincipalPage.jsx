import PageShell from './PageShell'
import ScrollReveal from '../ScrollReveal'

export default function PrincipalPage() {
  const achievements = [
    { icon: 'fa-trophy', title: 'Women in Education', body: 'Conferred by Dewang Mehta National Education Awards in 2018.' },
    { icon: 'fa-medal', title: 'Bharat Vikas Award', body: 'Awarded for loyalty and excellence in Bharat Vikas activity in 2017.' },
    { icon: 'fa-award', title: 'Excellent Principal', body: 'Received at the 11th National Education Summit in 2017.' },
    { icon: 'fa-book-open', title: 'Research Publications', body: 'Published 51 research papers in National and International Journals & Conferences.' }
  ]

  const affiliations = ['MIEEE', 'MISTE', 'MIE', 'FIETE', 'MCRSI']

  return (
    <PageShell
      eyebrow="Administration"
      title="Message from the"
      titleEm="Principal"
      description="Dr. B L Malleswari leads KMIT with a focus on academic discipline, research innovation, and holistic student development."
      breadcrumbs={[{ label: 'Administration', to: '/administration/management' }, { label: 'Principal' }]}
    >
      <section className="page-section">
        <div className="container">
          <div className="leadership-grid">
            {/* Principal Photo & Identity */}
            <ScrollReveal animation="fade-right">
              <div className="identity-card">
                <div className="identity-photo-wrap">
                  <img 
                      src="/photos/principal/principal.jpg" 
                     alt="Dr. B L Malleswari" 
                     loading="lazy"
                     onError={e => { e.target.style.display = 'none' }}
                     style={{ width: '100%', display: 'block', opacity: '1' }}
                  />
                </div>
                <div className="identity-details">
                  <h3>Dr. B L Malleswari</h3>
                  <p className="designation">Principal, KMIT</p>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '1.2rem', flexWrap: 'wrap' }}>
                    {affiliations.map((a, i) => (
                      <span key={i} className="tag tag-blue">{a}</span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Biography Content Only */}
            <ScrollReveal animation="fade-left" delay={200}>
              <div>
              <div className="section-header">
                <div className="section-eyebrow"><i className="fa-solid fa-graduation-cap"></i> Academic Leadership</div>
                <h2>A Vision for <em>Excellence</em></h2>
                <div className="section-divider"></div>
              </div>
              
              <div style={{ fontSize: '1.1rem', lineHeight: '1.85', color: 'var(--text-dark)' }}>
                <p style={{ marginBottom: '1.5rem', textAlign: 'justify' }}>
                  Dr. B L Malleswari, currently serving as the Principal at KMIT, Hyderabad, boasts an impressive 28-year career in teaching at the engineering level, with prior roles including Principal at Sridevi Women’s Engineering College. Holding a Ph.D. from JNTUH and an M.S. in Electronics and Control Systems from BITS Pilani, she brings with her a wealth of academic expertise. 
                </p>
                <p style={{ textAlign: 'justify' }}>
                  With over 130 publications, her research contributions span international and national journals, earning recognition with various IDs like Vidwan, Orcid, Scopus, and Google Scholar. Dr. Malleswari has received notable awards, including the Women in Education Award and Bharat Vikas Award. A seasoned professional, she has guided numerous Ph.D. and postgraduate projects, displaying a commitment to academic excellence.
                </p>
              </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Quote Block (Full Width) */}
          <ScrollReveal animation="fade-up">
            <div className="quote-block" style={{ marginTop: '4rem' }}>
              <i className="fa-solid fa-quote-left"></i>
              <p>
                "Education, for me, signifies a journey of self-discovery and the acquisition of life's wisdom. I take pride in my association with Keshav Memorial Institute of Technology (KMIT), where I, as the Principal, lead a dedicated team. KMIT is distinguished by its well-designed campus, outstanding management, and qualified faculty, fostering an enriching academic atmosphere."
              </p>
              <div className="quote-author">— Dr. B L Malleswari</div>
            </div>
          </ScrollReveal>

          <div style={{ marginTop: '5rem' }}>
            <ScrollReveal animation="fade-up">
              <h3 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2rem', color: 'var(--navy)' }}>Awards & <span style={{ color: 'var(--vibrant-accent)' }}>Recognitions</span></h3>
            </ScrollReveal>
            {/* Achievements Grid - Full Width */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {achievements.map((a, i) => (
                <ScrollReveal key={i} animation="fade-up" delay={i * 100} style={{ height: '100%' }}>
                  <div style={{ height: '100%', background: 'var(--white)', border: '1px solid var(--light-grey)', padding: '2rem', borderRadius: '16px', transition: 'all 0.3s', boxShadow: 'var(--shadow-sm)' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--vibrant-accent)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--light-grey)'}
                  >
                    <div style={{ width: '48px', height: '48px', background: 'rgba(255,107,0,0.1)', borderRadius: '10px', display: 'grid', placeItems: 'center', color: 'var(--vibrant-accent)', marginBottom: '1.2rem', fontSize: '1.2rem' }}>
                      <i className={`fa-solid ${a.icon}`}></i>
                    </div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '0.8rem' }}>{a.title}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>{a.body}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="page-section-alt">
        <div className="container">
          <ScrollReveal animation="fade-up">
            <div className="cta-banner">
              <div>
                <h3>Academic Excellence & Innovation</h3>
                <p>Join a community committed to research, holistic education, and continuous learning.</p>
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', flexShrink: 0 }}>
                <a href="/academics" className="btn-primary">
                  <i className="fa-solid fa-book"></i> Academics
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageShell>
  )
}
