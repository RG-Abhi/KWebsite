import PageShell from './PageShell'
import { useNavigate } from 'react-router-dom'
import ScrollReveal from '../ScrollReveal'

export default function AboutPage() {
  const navigate = useNavigate()

  const milestones = [
    { year: '2007', title: 'KMIT Established', desc: 'Founded under KMES with initial intake of CSE (60) and IT (60), affiliated to JNTU Hyderabad and approved by AICTE, New Delhi.' },
    { year: '2010', title: 'NBA Accreditation', desc: 'CSE and IT programmes received National Board of Accreditation — marking global recognition of engineering education standards.' },
    { year: '2015', title: 'Autonomous Status', desc: 'KMIT granted autonomous institution status by JNTU Hyderabad and UGC, gaining academic flexibility to design its own curriculum.' },
    { year: '2018', title: "NAAC 'A' Grade", desc: "KMIT accredited by NAAC with the coveted 'A' Grade — affirming its commitment to quality education and institutional excellence." },
    { year: '2020', title: 'AI & ML and Data Science Launched', desc: 'New-age programmes — CSE (AI & ML) with intake of 120 and CSE (Data Science) with intake of 60 — commenced.' },
    { year: '2023', title: 'SWAYAM NPTEL #1', desc: 'KMIT ranked Number One across India in the SWAYAM NPTEL Best Institute category for two consecutive years.' },
    { year: '2025', title: 'SIH & GSoC Winners', desc: 'Team ASHTOJ wins Smart India Hackathon Grand Finale. 4 students selected for Google Summer of Code 2025.' },
  ]

  const coreValues = [
    { icon: 'fa-scale-balanced', title: 'Ethical Practice', desc: 'Commitment to integrity, transparency, and ethical conduct in all academic and administrative activities.' },
    { icon: 'fa-handshake', title: 'Mutual Respect', desc: 'Fostering a culture of dignity, inclusivity, and mutual respect for all members of the institution.' },
    { icon: 'fa-bullseye', title: 'Accountability', desc: 'Taking ownership of outcomes and being responsible to students, society, and all stakeholders.' },
    { icon: 'fa-book-open', title: 'Lifelong Learning', desc: 'Encouraging continuous intellectual curiosity and professional growth in students and faculty alike.' },
    { icon: 'fa-lightbulb', title: 'Innovation', desc: 'Nurturing creative thinking, applied research, and entrepreneurial spirit across all disciplines.' },
  ]

  const accreditations = [
    { icon: 'fa-award', title: 'NAAC A Grade', body: 'National Assessment & Accreditation Council', desc: 'Highest grade for educational quality' },
    { icon: 'fa-certificate', title: 'NBA', body: 'National Board of Accreditation', desc: 'CSE & IT programmes accredited' },
    { icon: 'fa-ranking-star', title: 'NIRF', body: 'National Institutional Ranking Framework', desc: 'Listed among top engineering institutes' },
    { icon: 'fa-shield-halved', title: 'IQAC', body: 'Internal Quality Assurance Cell', desc: 'Continuous quality improvement system' },
    { icon: 'fa-graduation-cap', title: 'AICTE', body: 'All India Council for Technical Education', desc: 'Approved by AICTE, New Delhi' },
    { icon: 'fa-university', title: 'JNTUH', body: 'Jawaharlal Nehru Technological University', desc: 'Affiliated & recognised university' },
  ]

  const achievements = [
    { icon: 'fa-trophy', year: '2023 & 2024', title: 'SWAYAM NPTEL Top-100', desc: 'Ranked among the Top-100 NPTEL Chapters in India for two consecutive years — a nation-wide recognition of student excellence in online learning.' },
    { icon: 'fa-medal', year: '2025', title: 'Smart India Hackathon', desc: 'Team ASHTOJ won the Smart India Hackathon 2024 Grand Finale — the country\'s most prestigious student innovation competition.' },
    { icon: 'fa-flask', year: '2024', title: 'BIRAC Research Grant', desc: 'Received a research grant of INR 50 Lakhs from BIRAC (Biotechnology Industry Research Assistance Council) for an innovative project.' },
    { icon: 'fa-code', year: '2025', title: 'Google Summer of Code', desc: '4 KMIT students selected for Google Summer of Code 2025 — one of the most competitive open-source programs globally.' },
  ]

  return (
    <PageShell
      eyebrow="About KMIT"
      title="Our Legacy &"
      titleEm="Vision"
      description="Keshav Memorial Institute of Technology, established in 2007, stands as one of Telangana's premier engineering institutions — driven by a mission to produce world-class engineers through innovation, research, and industry-focused education."
      breadcrumbs={[{ label: 'About' }]}
    >

      {/* Stats Strip */}
      <section className="page-section">
        <div className="container">
          <ScrollReveal animation="fade-up">
            <div className="stats-strip">
              <div className="stat-block">
                <span className="stat-value">2007</span>
                <span className="stat-label">Year Established</span>
              </div>
              <div className="stat-block">
                <span className="stat-value">4<span className="accent">K+</span></span>
                <span className="stat-label">Students Enrolled</span>
              </div>
              <div className="stat-block">
                <span className="stat-value"><span className="accent">A</span></span>
                <span className="stat-label">NAAC Grade</span>
              </div>
              <div className="stat-block">
                <span className="stat-value">75<span className="accent">+</span></span>
                <span className="stat-label">Years KMES Legacy</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Story + Vision/Mission */}
      <section className="page-section-alt">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
            <ScrollReveal animation="fade-right">
              <div>
                <div className="section-header">
                  <div className="section-eyebrow"><i className="fa-solid fa-book-open"></i> Our Story</div>
                  <h2>A Legacy Built on <em>Excellence</em></h2>
                  <div className="section-divider"></div>
                </div>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.85', marginBottom: '1.4rem', fontSize: '0.97rem' }}>
                  Keshav Memorial Institute of Technology (KMIT), established in 2007, is one of the premier engineering colleges in Telangana. KMIT is sponsored by Keshav Memorial Education Society (KMES) — well known in Hyderabad for over 75 years of educational excellence across multiple institutions.
                </p>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.85', marginBottom: '1.4rem', fontSize: '0.97rem' }}>
                  KMIT is approved by AICTE, New Delhi, and affiliated to JNTU Hyderabad. It is co-promoted and powered by Genesis Solutions Pvt. Ltd., a premier institute imparting industry-focused software training in emerging technologies.
                </p>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.85', fontSize: '0.97rem' }}>
                  Located in Narayanaguda — a central locality in the heart of Hyderabad — KMIT offers easy connectivity to students from across the city, with the metro station and bus stop situated in close proximity to the campus.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={200}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Vision */}
                <div style={{ background: 'var(--navy)', borderRadius: '16px', padding: '2rem', color: '#fff', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }}></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                    <div style={{ width: '36px', height: '36px', background: 'rgba(255,107,0,0.2)', borderRadius: '8px', display: 'grid', placeItems: 'center', color: 'var(--vibrant-accent)', flexShrink: 0 }}>
                      <i className="fa-solid fa-eye"></i>
                    </div>
                    <span style={{ fontSize: '0.68rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.5)' }}>Our Vision</span>
                  </div>
                  <p style={{ fontSize: '0.97rem', lineHeight: '1.75', color: 'rgba(255,255,255,0.88)', fontStyle: 'italic', margin: 0, position: 'relative', zIndex: 1 }}>
                    "To be a fountainhead in producing highly skilled, globally competent engineers and making India a world leader in software."
                  </p>
                </div>

                {/* Mission */}
                <div style={{ background: 'var(--crimson)', borderRadius: '16px', padding: '2rem', color: '#fff', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }}></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                    <div style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.15)', borderRadius: '8px', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                      <i className="fa-solid fa-rocket"></i>
                    </div>
                    <span style={{ fontSize: '0.68rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.7)' }}>Our Mission</span>
                  </div>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.75', color: 'rgba(255,255,255,0.9)', margin: 0, position: 'relative', zIndex: 1 }}>
                    To provide a dynamic learning environment that fosters problem-solving skills, ethical responsibility, industry interaction, research aptitude, and entrepreneurial thinking — preparing graduates for a rapidly evolving global landscape.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Quality Policy */}
      <section className="page-section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '4rem', alignItems: 'center' }}>
            <ScrollReveal animation="fade-right">
              <div className="section-header">
                <div className="section-eyebrow"><i className="fa-solid fa-star"></i> Quality</div>
                <h2>Quality <em>Policy</em></h2>
                <div className="section-divider"></div>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-left" delay={200}>
              <div style={{ background: 'linear-gradient(135deg, var(--off-white), #fff)', border: '1px solid var(--light-grey)', borderLeft: '4px solid var(--vibrant-accent)', borderRadius: '12px', padding: '2rem 2.5rem' }}>
                <p style={{ fontSize: '1.05rem', color: 'var(--navy)', lineHeight: '1.85', fontWeight: '500', margin: 0 }}>
                  KMIT is committed to achieving <strong>global excellence in teaching, research, and placements</strong> — through continuous improvement, ethical practices, robust industry partnerships, and an unwavering focus on holistic student development and professional readiness.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="page-section-alt">
        <div className="container">
          <ScrollReveal animation="fade-up">
            <div className="section-header centered">
              <div className="section-eyebrow"><i className="fa-solid fa-heart"></i> Our Foundation</div>
              <h2>Core <em>Values</em></h2>
              <div className="section-divider"></div>
              <p>The principles that guide every decision, action, and relationship at KMIT.</p>
            </div>
          </ScrollReveal>
          <div className="info-cards-grid">
            {coreValues.map((v, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 100} style={{ height: '100%' }}>
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

      {/* Recent Achievements */}
      <section className="page-section">
        <div className="container">
          <ScrollReveal animation="fade-up">
            <div className="section-header">
              <div className="section-eyebrow"><i className="fa-solid fa-trophy"></i> Recognition</div>
              <h2>Recent <em>Achievements</em></h2>
              <div className="section-divider"></div>
              <p>KMIT students and faculty continue to excel on national and global stages.</p>
            </div>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            {achievements.map((a, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 150} style={{ height: '100%' }}>
                <div style={{ height: '100%', background: 'var(--white)', border: '1px solid var(--light-grey)', borderRadius: '14px', padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start', transition: 'all 0.3s ease', boxShadow: 'var(--shadow-card)' }}>
                  <div style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg, var(--crimson), var(--vibrant-accent))', borderRadius: '12px', display: 'grid', placeItems: 'center', color: '#fff', fontSize: '1.3rem', flexShrink: 0 }}>
                    <i className={`fa-solid ${a.icon}`}></i>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--vibrant-accent)' }}>{a.year}</span>
                    <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', fontWeight: '700', color: 'var(--navy)', margin: '0.4rem 0 0.6rem' }}>{a.title}</h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>{a.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="page-section-alt">
        <div className="container">
          <ScrollReveal animation="fade-up">
            <div className="section-header">
              <div className="section-eyebrow"><i className="fa-solid fa-timeline"></i> Our Journey</div>
              <h2>Key <em>Milestones</em></h2>
              <div className="section-divider"></div>
              <p>From a small campus in 2007 to one of Telangana's most celebrated engineering colleges.</p>
            </div>
          </ScrollReveal>
          <div className="timeline">
            {milestones.map((m, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 100} className="timeline-item">
                <div className="timeline-marker">{m.year.slice(2)}</div>
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

      {/* Accreditations */}
      <section className="page-section">
        <div className="container">
          <ScrollReveal animation="fade-up">
            <div className="section-header centered">
              <div className="section-eyebrow"><i className="fa-solid fa-certificate"></i> Recognition</div>
              <h2>Accreditations & <em>Approvals</em></h2>
              <div className="section-divider"></div>
            </div>
          </ScrollReveal>
          <div className="badge-strip">
            {accreditations.map((a, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 100} style={{ height: '100%' }}>
                <div className="accred-badge" style={{ height: '100%' }}>
                  <i className={`fa-solid ${a.icon}`}></i>
                  <strong>{a.title}</strong>
                  <span>{a.body}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--vibrant-accent)', fontWeight: 700 }}>{a.desc}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-section-alt">
        <div className="container">
          <ScrollReveal animation="fade-up">
            <div className="cta-banner">
              <div>
                <h3>Explore KMIT's World-Class Programmes</h3>
                <p>Discover our departments, research initiatives, and what makes KMIT the right choice for your future.</p>
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', flexShrink: 0 }}>
                <button className="btn-white" onClick={() => navigate('/about/kmes')}>
                  <i className="fa-solid fa-landmark"></i> About KMES
                </button>
                <button className="btn-primary" onClick={() => navigate('/academics')}>
                  <i className="fa-solid fa-graduation-cap"></i> Academics
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </PageShell>
  )
}
