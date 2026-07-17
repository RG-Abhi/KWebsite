import PageShell from './PageShell'
import ScrollReveal from '../ScrollReveal'

const awards = [
  { icon: 'fa-trophy',   label: 'Best Mentor',  body: 'Awarded "Best Mentor" by IBM, Google, and Virtusa for outstanding student guidance.' },
  { icon: 'fa-medal',    label: 'Acharya Award', body: 'Conferred the "Acharya" title by IBM, Google, and Virtusa recognising teaching excellence.' },
  { icon: 'fa-star',     label: 'Drona Award',   body: 'Recipient of the prestigious "Drona Award" for mentorship and academic leadership.' },
  { icon: 'fa-book',     label: 'Author',        body: 'Author of "JAVA spoken Tutorials" — an initiative by IIT Bombay for accessible tech education.' },
]

const corporateClients = ['Verizon', 'HP', 'CA Global', 'DRDL', 'RCI']

const mentorships = [
  { icon: 'fa-windows',   label: 'Microsoft Imagine Cup' },
  { icon: 'fa-brain',     label: "IBM's Great Mind Challenge" },
  { icon: 'fa-code',      label: 'Google Summer of Code (GSoC)' },
  { icon: 'fa-amazon',    label: 'Amazon Campus Mentorship Series' },
]

export default function DirectorPage() {
  return (
    <PageShell
      eyebrow="Administration"
      title="Director —"
      titleEm="Academics"
      description="Ms. Deepa Ganu is a proactive educational leader committed to the academic progress of both students and staff at KMIT."
      breadcrumbs={[{ label: 'Administration & Committees', to: '/administration/hod' }, { label: 'Director Academic' }]}
    >
      {/* ── Profile Section ────────────────────────────────────── */}
      <section className="page-section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '5rem', alignItems: 'center' }}>

            {/* Identity Card */}
            <ScrollReveal animation="fade-right">
              <div style={{
                background: 'linear-gradient(145deg, var(--navy) 0%, #1a4080 100%)',
                borderRadius: '28px',
                padding: '3rem 2.5rem',
                color: '#fff',
                textAlign: 'center',
                boxShadow: 'var(--shadow-lift)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* decorative circles */}
                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '180px', height: '180px', background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', bottom: '-30px', left: '-30px', width: '120px', height: '120px', background: 'rgba(255,107,0,0.08)', borderRadius: '50%' }} />

                {/* Photo */}
                <div style={{
                  width: '200px', height: '200px',
                  borderRadius: '50%',
                  border: '5px solid rgba(255,255,255,0.2)',
                  margin: '0 auto 1.8rem',
                  overflow: 'hidden',
                  background: '#1e3a6e',
                  position: 'relative', zIndex: 1
                }}>
                  <img
                    src="/photos/director-academic/deepa-ganu.png"
                    alt="Ms. Deepa Ganu"
                    onError={e => { e.target.style.display = 'none' }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <h3 style={{ fontSize: '1.7rem', fontWeight: '800', marginBottom: '0.4rem', position: 'relative', zIndex: 1 }}>
                  Ms. Deepa Ganu
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--vibrant-accent)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
                  Director — Academics, KMIT
                </p>

                {/* Qualifications */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', letterSpacing: '1.5px', marginBottom: '0.8rem', fontWeight: '700' }}>
                    Qualifications
                  </div>
                  {[
                    { deg: 'B.Tech (ECE)', uni: 'Pune University' },
                    { deg: 'M.Tech',       uni: 'JNTU Hyderabad'  },
                  ].map((q, i) => (
                    <div key={i} style={{
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      padding: '0.9rem 1.2rem',
                      marginBottom: '0.6rem',
                      textAlign: 'left',
                      display: 'flex', alignItems: 'center', gap: '0.8rem'
                    }}>
                      <i className="fa-solid fa-graduation-cap" style={{ color: 'var(--vibrant-accent)', fontSize: '1rem', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{q.deg}</div>
                        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)' }}>{q.uni}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Biography */}
            <ScrollReveal animation="fade-left" delay={200}>
              <div>
                <div className="section-header">
                  <div className="section-eyebrow"><i className="fa-solid fa-person-chalkboard" /> Academic Leadership</div>
                  <h2>Shaping the <em>Next Generation</em></h2>
                  <div className="section-divider" />
                </div>

                <div style={{ fontSize: '1.05rem', lineHeight: '1.9', color: 'var(--text-dark)' }}>
                  <p style={{ marginBottom: '1.4rem', textAlign: 'justify' }}>
                    Ms. Deepa Ganu is a proactive educational leader committed to the academic progress of both students and staff. Her depth of knowledge and innovative pedagogical methods have positioned KMIT as one of Hyderabad's foremost engineering institutions.
                  </p>
                  <p style={{ marginBottom: '1.4rem', textAlign: 'justify' }}>
                    She has extensive expertise in mentoring students for prestigious competitions, including the <strong>Microsoft Imagine Cup</strong>, <strong>IBM's The Great Mind Challenge</strong>, <strong>Google Summer of Code (GSoC)</strong>, and the <strong>Amazon Campus Mentorship Series</strong>.
                  </p>
                  <p style={{ textAlign: 'justify' }}>
                    An accomplished author, she wrote <strong>"JAVA spoken Tutorials"</strong> — an IIT Bombay initiative — and has delivered corporate training programmes for leading organisations including <strong>Verizon, HP, CA Global, DRDL</strong>, and <strong>RCI</strong>.
                  </p>
                </div>

                {/* Mentorship Competitions */}
                <div style={{ marginTop: '2.5rem' }}>
                  <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: '800' }}>
                    Student Mentorship — Global Competitions
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                    {mentorships.map((m, i) => (
                      <div key={i} style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                        background: 'var(--off-white)', borderRadius: '10px',
                        padding: '0.8rem 1rem', border: '1px solid var(--light-grey)'
                      }}>
                        <i className={`fa-brands ${m.icon}`} style={{ color: 'var(--vibrant-accent)', fontSize: '1.1rem', width: '20px', textAlign: 'center' }} />
                        <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--navy)' }}>{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Corporate Training */}
                <div style={{ marginTop: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: '800' }}>
                    Corporate Training — Client Organisations
                  </h4>
                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                    {corporateClients.map((c, i) => (
                      <span key={i} style={{
                        background: 'var(--navy)', color: '#fff',
                        padding: '5px 14px', borderRadius: '6px',
                        fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.5px'
                      }}>{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Awards & Recognition ───────────────────────────────── */}
      <section className="page-section-alt">
        <div className="container">
          <ScrollReveal animation="fade-up">
            <div className="section-header" style={{ textAlign: 'center', alignItems: 'center' }}>
              <div className="section-eyebrow"><i className="fa-solid fa-award" /> Honours</div>
              <h2>Awards & <em>Recognition</em></h2>
              <div className="section-divider" />
            </div>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            {awards.map((a, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 100} style={{ height: '100%' }}>
                <div style={{
                  height: '100%',
                  background: 'var(--white)', borderRadius: '20px',
                  padding: '2rem', border: '1px solid var(--light-grey)',
                  boxShadow: 'var(--shadow-card)', transition: 'all 0.3s'
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'var(--vibrant-accent)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--light-grey)' }}
                >
                  <div style={{ width: '52px', height: '52px', background: 'rgba(255,107,0,0.1)', borderRadius: '14px', display: 'grid', placeItems: 'center', color: 'var(--vibrant-accent)', fontSize: '1.3rem', marginBottom: '1.2rem' }}>
                    <i className={`fa-solid ${a.icon}`} />
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '0.6rem' }}>{a.label}</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.65', margin: 0 }}>{a.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Director's Message ─────────────────────────────────── */}
      <section className="page-section">
        <div className="container">
          <ScrollReveal animation="fade-up">
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <div style={{
                background: 'linear-gradient(135deg, var(--navy) 0%, #1a4080 100%)',
                borderRadius: '28px', padding: '4rem',
                color: '#fff', position: 'relative', overflow: 'hidden'
              }}>
                {/* decorative quote icon */}
                <i className="fa-solid fa-quote-left" style={{ position: 'absolute', top: '2rem', right: '3rem', fontSize: '6rem', opacity: 0.06, color: '#fff' }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
                  <div style={{ width: '70px', height: '70px', borderRadius: '50%', overflow: 'hidden', border: '3px solid rgba(255,255,255,0.2)', flexShrink: 0 }}>
                    <img src="/photos/director-academic/deepa-ganu.png" alt="Ms. Deepa Ganu"
                      onError={e => { e.target.style.display = 'none' }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>Ms. Deepa Ganu</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--vibrant-accent)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Director — Academics</div>
                  </div>
                </div>

                <p style={{
                  fontFamily: 'var(--font-serif)', fontStyle: 'italic',
                  fontSize: '1.15rem', lineHeight: '2', color: 'rgba(255,255,255,0.88)',
                  textAlign: 'justify', position: 'relative', zIndex: 1
                }}>
                  "Welcome to KMIT, the revered sanctuary of learning. With a proven track record of ace placements and students achieving stellar results in academics, we would like to invite you to explore the learning opportunities here and pursue a disciplined learning path that will lead to a beautiful career ahead. The campus, its instructors await with open arms to nourish your talents and witness your unstoppable success, all of which will be written in golden letters in the history of KMIT."
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="page-section-alt">
        <div className="container">
          <ScrollReveal animation="fade-up">
            <div className="cta-banner">
              <div>
                <h3>Explore Our Innovative Learning Models</h3>
                <p>Discover the Finishing School, Project School, and value-added programmes introduced under our academic leadership.</p>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn-white" onClick={() => window.location.href = '/student-life/finishing-school'}>
                  <i className="fa-solid fa-school" /> Finishing School
                </button>
                <button className="btn-primary" onClick={() => window.location.href = '/student-life/project-school'}>
                  <i className="fa-solid fa-diagram-project" /> Project School
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageShell>
  )
}
