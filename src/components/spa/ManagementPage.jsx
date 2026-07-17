import PageShell from './PageShell'
import ScrollReveal from '../ScrollReveal'

export default function ManagementPage() {
  const management = [
    {
      name: 'Justice L. Narasimha Reddy',
      title: 'President',
      image: '/photos/president/president.jpg',
      role: 'Chief Patron',
      bio: 'Hon\'ble Justice L. Narasimha Reddy is a former Chief Justice of the Patna High Court and a distinguished legal luminary. Under his visionary leadership as President of Keshav Memorial Education Society, KMIT has achieved significant benchmarks in academic and administrative excellence.'
    },
    {
      name: 'Shri Neil Gogte',
      title: 'Founder & Secretary',
      image: '/photos/founder/founder.png',
      role: 'Visionary & Tech Evangelist',
      bio: 'A technocrat and educationist with degrees from NIT, IIT Bombay, and the USA. Shri Neil Gogte is the driving force behind KMIT\'s innovation culture. His expertise in software training and emerging technologies has shaped KMIT into a premier destination for software engineering.'
    },
    {
      name: 'Shri Nitin Sahasrabudhe',
      title: 'Director',
      image: '/photos/director/director.png',
      role: 'Strategic Operations',
      bio: 'An alumnus of IIT Bombay, Shri Nitin Sahasrabudhe brings deep industrial and academic insights to KMIT. He focuses on institutional strategy, industrial collaborations, and operational excellence, ensuring students are industry-ready upon graduation.',
      message: 'The prestigious, Keshav Memorial Institute of Technology, since its inception in 2007 has made remarkable progress by following the mantra of student centric approach, whether it is in academics or in extra co-curricular activities. The institute possess a state of art infrastructure with equipped laboratories, well stocked library and highly qualified faculty. We at, KMIT introduce our students to the Outcome Based Education and trained with skills in various disciplines. In addition to developing excellent scientific and engineering skills, the students are motivated not only to dream big but also encouraged to think unconventionally to face the challenges of the future, incorporating employability skills in tune with the industry requirement and provide platform for Entrepreneurship. It has been our constant endeavour to instill in our students ethical values hereby making them socially responsible citizens. The institution has stood for quality and excellence and still thriving to be the best in the years to come. Keeping our vision and mission of the institution, we believe in Imagine-Invent-Inspire. In the making of dynamic individuals in the society.'
    }
  ]

  return (
    <PageShell
      eyebrow="Administration"
      title="Board of"
      titleEm="Management"
      description="KMIT is steered by a distinguished board of legal luminaries, technocrats, and educationists committed to institutional integrity and academic excellence."
      breadcrumbs={[{ label: 'About', to: '/about' }, { label: 'Management' }]}
    >
      <section className="page-section">
        <div className="container">
          <ScrollReveal animation="fade-up">
            <div className="section-header centered">
              <div className="section-eyebrow"><i className="fa-solid fa-users-gear"></i> Leadership</div>
              <h2>Architects of <em>Excellence</em></h2>
              <div className="section-divider"></div>
            </div>
          </ScrollReveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', marginTop: '3rem' }}>
            {management.map((m, i) => (
              <ScrollReveal key={i} animation={i % 2 === 0 ? "fade-right" : "fade-left"}>
                <div 
                  style={{ 
                    display: 'grid', 
                    gridTemplateColumns: i % 2 === 0 ? '1fr 2.5fr' : '2.5fr 1fr', 
                    gap: '4rem', 
                    alignItems: 'center',
                    background: 'var(--white)',
                    borderRadius: '24px',
                    padding: '3.5rem',
                    boxShadow: 'var(--shadow-card)',
                    border: '1px solid var(--light-grey)',
                    transition: 'transform 0.3s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  {i % 2 === 0 ? (
                    <>
                      <div style={{ position: 'relative' }}>
                        <div style={{ 
                          width: '100%', 
                          aspectRatio: '1', 
                          borderRadius: '20px', 
                          overflow: 'hidden', 
                          border: '4px solid var(--off-white)',
                          boxShadow: 'var(--shadow-card)',
                          background: '#f1f5f9'
                        }}>
                          <img 
                            src={m.image} 
                            alt={m.name} 
                            loading="lazy"
                            onLoad={e => e.target.style.opacity = '1'}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: '0', transition: 'opacity 0.8s ease-in' }} 
                          />
                        </div>
                        <div style={{ 
                          position: 'absolute', 
                          bottom: '-15px', 
                          right: '-15px', 
                          background: 'var(--crimson)', 
                          color: '#fff', 
                          padding: '12px 24px', 
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          fontWeight: '800',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          boxShadow: '0 8px 24px rgba(165,28,48,0.2)'
                        }}>
                          {m.title}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--vibrant-accent)', marginBottom: '0.5rem' }}>{m.role}</div>
                        <h3 style={{ fontSize: '2rem', color: 'var(--navy)', marginBottom: '1.5rem', fontFamily: 'var(--font-sans)', fontWeight: 800 }}>{m.name}</h3>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: m.message ? '2rem' : 0 }}>{m.bio}</p>
                        
                        {m.message && (
                          <div style={{ 
                            marginTop: '2rem', 
                            padding: '2.5rem', 
                            background: '#f1f5f955', 
                            borderLeft: '5px solid #2d7a77', 
                            borderRadius: '0 12px 12px 0',
                            position: 'relative'
                          }}>
                            <div style={{ 
                              fontSize: '1.5rem', 
                              color: '#2d7a77', 
                              fontWeight: '800', 
                              marginBottom: '1rem',
                              borderBottom: '2px solid #2d7a7722',
                              paddingBottom: '10px',
                              fontFamily: 'var(--font-sans)'
                            }}>
                              Message
                            </div>
                            <i className="fa-solid fa-quote-left" style={{ position:'absolute', top: '1.5rem', right: '2rem', fontSize: '3rem', opacity: 0.1, color: '#2d7a77' }}></i>
                            <p style={{ 
                              fontFamily: 'var(--font-serif)', 
                              fontStyle: 'italic', 
                              fontSize: '1.1rem', 
                              lineHeight: '1.9', 
                              color: '#334155',
                              marginBottom: '1.5rem',
                              fontWeight: 500
                            }}>
                              "{m.message}"
                            </p>
                            <div style={{ fontWeight: '900', color: '#0f172a', fontSize: '1rem' }}>{m.name}</div>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--vibrant-accent)', marginBottom: '0.5rem' }}>{m.role}</div>
                        <h3 style={{ fontSize: '2rem', color: 'var(--navy)', marginBottom: '1.5rem', fontFamily: 'var(--font-sans)', fontWeight: 800 }}>{m.name}</h3>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: m.message ? '2rem' : 0 }}>{m.bio}</p>

                        {m.message && (
                          <div style={{ 
                            marginTop: '2rem', 
                            padding: '2.5rem', 
                            background: '#f1f5f955', 
                            borderLeft: '5px solid #2d7a77', 
                            borderRadius: '0 12px 12px 0',
                            position: 'relative'
                          }}>
                            <div style={{ 
                              fontSize: '1.5rem', 
                              color: '#2d7a77', 
                              fontWeight: '800', 
                              marginBottom: '1rem',
                              borderBottom: '2px solid #2d7a7722',
                              paddingBottom: '10px',
                              fontFamily: 'var(--font-sans)'
                            }}>
                              Message
                            </div>
                            <i className="fa-solid fa-quote-left" style={{ position:'absolute', top: '1.5rem', right: '2rem', fontSize: '3rem', opacity: 0.1, color: '#2d7a77' }}></i>
                            <p style={{ 
                              fontFamily: 'var(--font-serif)', 
                              fontStyle: 'italic', 
                              fontSize: '1.1rem', 
                              lineHeight: '1.9', 
                              color: '#334155',
                              marginBottom: '1.5rem',
                              fontWeight: 500
                            }}>
                              "{m.message}"
                            </p>
                            <div style={{ fontWeight: '900', color: '#0f172a', fontSize: '1rem' }}>{m.name}</div>
                          </div>
                        )}
                      </div>
                      <div style={{ position: 'relative' }}>
                        <div style={{ 
                          width: '100%', 
                          aspectRatio: '1', 
                          borderRadius: '20px', 
                          overflow: 'hidden', 
                          border: '4px solid var(--off-white)',
                          boxShadow: 'var(--shadow-card)',
                          background: '#f1f5f9'
                        }}>
                          <img 
                            src={m.image} 
                            alt={m.name} 
                            loading="lazy"
                            onLoad={e => e.target.style.opacity = '1'}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: '0', transition: 'opacity 0.8s ease-in' }} 
                          />
                        </div>
                        <div style={{ 
                          position: 'absolute', 
                          bottom: '-15px', 
                          left: '-15px', 
                          background: 'var(--navy)', 
                          color: '#fff', 
                          padding: '12px 24px', 
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          fontWeight: '800',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          boxShadow: '0 8px 24px rgba(10,22,40,0.2)'
                        }}>
                          {m.title}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      <section className="page-section-alt">
        <div className="container">
          <ScrollReveal animation="fade-up">
            <div className="cta-banner">
              <div>
                <h3>Driven by 85 Years of Legacy</h3>
                <p>Learn more about the Keshav Memorial Education Society and its impact on Hyderabad's educational landscape.</p>
              </div>
              <button className="btn-white" onClick={() => window.location.href='/about/kmes'}>
                  <i className="fa-solid fa-landmark"></i> About KMES
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageShell>
  )
}
