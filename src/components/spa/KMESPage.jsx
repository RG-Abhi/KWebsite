import PageShell from './PageShell'
import { useNavigate } from 'react-router-dom'
import ScrollReveal from '../ScrollReveal'

export default function KMESPage() {
  const navigate = useNavigate()

  const institutions = [
    { icon: 'fa-microchip', name: 'Keshav Memorial Institute of Technology', type: 'B.Tech Engineering College', year: '2007', highlight: true },
    { icon: 'fa-graduation-cap', name: 'Keshav Memorial Degree College', type: 'Undergraduate Degree College', year: '1970', highlight: false },
    { icon: 'fa-book', name: 'Keshav Memorial P.G. College', type: 'Post-Graduate College', year: '1985', highlight: false },
    { icon: 'fa-school', name: 'Keshav Memorial High School', type: 'Secondary Education', year: '1940', highlight: false },
    { icon: 'fa-building-columns', name: 'Keshav Memorial Junior College', type: 'Intermediate / Pre-University', year: '1968', highlight: false },
  ]

  const milestones = [
    { year: '1940', title: 'KMES Founded', desc: 'Keshav Memorial Education Society established by Pandit Vinayak Rao Vidyalanker in memory of Justice Keshav Rao Koratkar, starting with a small middle school with 10–15 students.' },
    { year: '1968', title: 'Junior College Established', desc: 'KMES expanded to offer intermediate / pre-university education, serving students from across Hyderabad.' },
    { year: '1970', title: 'Degree College Launched', desc: 'Keshav Memorial Degree College commenced, providing undergraduate programmes in science, arts and commerce.' },
    { year: '1985', title: 'Post-Graduate College', desc: 'KMES established Keshav Memorial P.G. College, extending its academic reach to post-graduate level education.' },
    { year: '2007', title: 'KMIT Established', desc: 'Keshav Memorial Institute of Technology (KMIT) was founded — the crown jewel of KMES, now one of Telangana\'s most sought-after engineering colleges.' },
    { year: '2014–15', title: 'Platinum Jubilee', desc: 'KMES celebrated 75 glorious years of service through education — the Platinum Jubilee — marking its enduring legacy in shaping generations of professionals.' },
  ]

  const values = [
    { icon: 'fa-hand-holding-heart', title: 'Service to Society', desc: 'Education as the greatest form of social service — the founding principle of KMES since 1940.' },
    { icon: 'fa-people-group', title: 'Inclusivity', desc: 'Providing quality education to all sections of society, regardless of background or economic status.' },
    { icon: 'fa-leaf', title: 'Sustained Excellence', desc: 'Maintaining consistently high academic standards across all institutions under KMES for over eight decades.' },
    { icon: 'fa-seedling', title: 'Community Growth', desc: 'Investing in the educational ecosystem of Hyderabad and Telangana through long-term institutional commitment.' },
  ]

  return (
    <PageShell
      eyebrow="About KMES"
      title="Keshav Memorial"
      titleEm="Education Society"
      description="Founded in 1940 with the motto 'Service through Education', KMES has been a pillar of educational excellence in Hyderabad for over 85 years — nurturing generations of students across school, degree, and professional engineering education."
      breadcrumbs={[{ label: 'About', to: '/about' }, { label: 'KMES' }]}
    >

      {/* Stats Strip */}
      <section className="page-section">
        <div className="container">
          <ScrollReveal animation="fade-up">
            <div className="stats-strip">
              <div className="stat-block">
                <span className="stat-value">1940</span>
                <span className="stat-label">Year Founded</span>
              </div>
              <div className="stat-block">
                <span className="stat-value">85<span className="accent">+</span></span>
                <span className="stat-label">Years of Legacy</span>
              </div>
              <div className="stat-block">
                <span className="stat-value">5<span className="accent">+</span></span>
                <span className="stat-label">Institutions</span>
              </div>
              <div className="stat-block">
                <span className="stat-value"><span className="accent">10K+</span></span>
                <span className="stat-label">Alumni Worldwide</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* History & Motto */}
      <section className="page-section-alt">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '4rem', alignItems: 'start' }}>
            <ScrollReveal animation="fade-right">
              <div>
                <div className="section-header">
                  <div className="section-eyebrow"><i className="fa-solid fa-landmark"></i> Our History</div>
                  <h2>85 Years of <em>Service Through Education</em></h2>
                  <div className="section-divider"></div>
                </div>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.85', marginBottom: '1.4rem', fontSize: '0.97rem' }}>
                  Keshav Memorial Education Society (KMES) was established in <strong>1940</strong> by <strong>Pandit Vinayak Rao Vidyalanker</strong>. It was founded in honour of <strong>Justice Keshav Rao Koratkar</strong> — a distinguished jurist, social reformer, and close associate of Bal Gangadhar Tilak — who devoted his life to justice and the service of society.
                </p>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.85', marginBottom: '1.4rem', fontSize: '0.97rem' }}>
                  What began as a small middle school with just 10–15 students has blossomed into one of Hyderabad's most respected educational societies, running multiple institutions that together serve thousands of students every year across various levels of education.
                </p>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.85', fontSize: '0.97rem' }}>
                  In <strong>2014–15</strong>, KMES celebrated its <strong>Platinum Jubilee</strong> — a milestone that showcased 75 years of commitment to educational excellence, ethical governance, and social service.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={200}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                {/* Motto Card */}
                <div style={{ background: 'var(--navy)', borderRadius: '16px', padding: '2.5rem', color: '#fff', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
                  <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }}></div>
                  <i className="fa-solid fa-quote-left" style={{ fontSize: '2.5rem', color: 'var(--gold)', display: 'block', marginBottom: '1.2rem' }}></i>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', lineHeight: '1.6', color: '#fff', fontWeight: '700', margin: '0 0 1rem', position: 'relative', zIndex: 1 }}>
                    "Service through Education"
                  </p>
                  <cite style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', fontStyle: 'normal', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                    — Motto of KMES, Since 1940
                  </cite>
                </div>

                {/* Founder Card */}
                <div style={{ background: 'var(--white)', border: '1px solid var(--light-grey)', borderRadius: '16px', padding: '1.8rem', boxShadow: 'var(--shadow-card)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg, var(--crimson), #8b1c30)', borderRadius: '50%', display: 'grid', placeItems: 'center', color: '#fff', fontSize: '1.3rem', flexShrink: 0 }}>
                      <i className="fa-solid fa-user-tie"></i>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.68rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>Founder</span>
                      <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: '800', color: 'var(--navy)', margin: 0 }}>Pandit Vinayak Rao Vidyalanker</h4>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.65', margin: 0 }}>
                    Established KMES in 1940 to honour the legacy of Justice Keshav Rao Koratkar and to provide education as a means of social upliftment — starting with a handful of students and growing into a trusted institution over eight decades.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* In Memory of Justice Keshav Rao Koratkar */}
      <section className="page-section">
        <div className="container">
          <ScrollReveal animation="fade-up">
            <div className="kmes-intro-banner" style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--blue) 100%)', borderRadius: '20px', padding: '3.5rem', color: '#fff', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '3rem', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '110px', height: '110px', background: 'rgba(255,255,255,0.07)', borderRadius: '50%', display: 'grid', placeItems: 'center', margin: '0 auto 1rem', border: '2px solid rgba(255,255,255,0.12)' }}>
                  <i className="fa-solid fa-scale-balanced" style={{ fontSize: '2.8rem', color: 'var(--gold)' }}></i>
                </div>
                <span style={{ fontSize: '0.68rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.4)' }}>In Honour Of</span>
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', fontWeight: '700', color: 'var(--gold)', marginBottom: '0.8rem', lineHeight: '1.2' }}>
                  Justice Keshav Rao Koratkar
                </h3>
                <p style={{ fontSize: '0.97rem', color: 'rgba(255,255,255,0.82)', lineHeight: '1.85', marginBottom: '1.5rem' }}>
                  A distinguished jurist, social reformer, and close associate of Bal Gangadhar Tilak — Justice Keshav Rao Koratkar devoted his life to the service of justice and the upliftment of society. KMES was founded in his honour to perpetuate his belief that education is the highest form of service to humanity.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {['Distinguished Jurist', 'Social Reformer', 'Associate of Bal Gangadhar Tilak'].map((tag, i) => (
                    <span key={i} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', padding: '6px 16px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '600', color: 'rgba(255,255,255,0.8)' }}>
                      <i className="fa-solid fa-star" style={{ marginRight: '6px', color: 'var(--gold)', fontSize: '0.65rem' }}></i>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Core Values */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-heart"></i> Our Principles</div>
            <h2>Values That <em>Drive Us</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="info-cards-grid">
            {values.map((v, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                <div className="info-card" style={{ height: '100%' }}>
                  <div className="info-card-icon"><i className={`fa-solid ${v.icon}`}></i></div>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-timeline"></i> 85 Years of Growth</div>
            <h2>Our <em>Milestones</em></h2>
            <div className="section-divider"></div>
            <p>Eight decades of expanding educational horizons — from a humble school to a premier engineering institution.</p>
          </div>
            <div className="timeline">
              {milestones.map((m, i) => (
                <ScrollReveal key={i} animation="fade-up" delay={i * 100} className="timeline-item">
                  <div className="timeline-marker">{m.year.includes('–') ? '✦' : m.year.slice(2)}</div>
                  <div className="timeline-content">
                    <div className="timeline-year">{m.year}</div>
                    <h4>{m.title}</h4>
                    <p>{m.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
        </div>
      </section>

      {/* Institutions Under KMES */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-building-columns"></i> Our Institutions</div>
            <h2>Institutions Under <em>KMES</em></h2>
            <div className="section-divider"></div>
            <p>From school to post-graduate and professional engineering — KMES serves students at every stage of learning.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {institutions.map((inst, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                <div style={{
                  background: inst.highlight ? 'linear-gradient(135deg, var(--navy) 0%, var(--blue) 100%)' : 'var(--white)',
                  border: inst.highlight ? 'none' : '1px solid var(--light-grey)',
                  borderRadius: '14px',
                  padding: '1.8rem 2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  boxShadow: inst.highlight ? '0 8px 24px rgba(10,22,40,0.2)' : 'var(--shadow-card)',
                  transition: 'transform 0.3s',
                }}>
                  <div style={{
                    width: '52px', height: '52px',
                    background: inst.highlight ? 'rgba(255,255,255,0.12)' : 'linear-gradient(135deg, var(--navy), var(--blue))',
                    borderRadius: '12px', display: 'grid', placeItems: 'center',
                    color: inst.highlight ? '#fff' : '#fff', fontSize: '1.3rem', flexShrink: 0
                  }}>
                    <i className={`fa-solid ${inst.icon}`}></i>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.02rem', fontWeight: '700', color: inst.highlight ? '#fff' : 'var(--navy)', margin: '0 0 4px' }}>
                      {inst.name}
                      {inst.highlight && <span style={{ background: 'var(--vibrant-accent)', color: '#fff', fontSize: '0.65rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '2px 10px', borderRadius: '20px', marginLeft: '10px', verticalAlign: 'middle' }}>Flagship</span>}
                    </h4>
                    <p style={{ fontSize: '0.87rem', color: inst.highlight ? 'rgba(255,255,255,0.65)' : 'var(--text-muted)', margin: 0 }}>{inst.type}</p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', color: inst.highlight ? 'var(--gold)' : 'var(--vibrant-accent)' }}>Est. {inst.year}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-section">
        <div className="container">
          <ScrollReveal animation="fade-up">
            <div className="cta-banner">
              <div>
                <h3>Explore KMIT — KMES's Flagship Institution</h3>
                <p>Discover the engineering excellence, research innovation, and placement success that define KMIT today.</p>
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', flexShrink: 0 }}>
                <button className="btn-white" onClick={() => navigate('/about')}>
                  <i className="fa-solid fa-building-columns"></i> About KMIT
                </button>
                <button className="btn-primary" onClick={() => navigate('/academics')}>
                  <i className="fa-solid fa-graduation-cap"></i> Programmes
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </PageShell>
  )
}
