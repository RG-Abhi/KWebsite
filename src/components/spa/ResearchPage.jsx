import { useNavigate } from 'react-router-dom'
import PageShell from './PageShell'
import ResearchPublicationsSection from './ResearchPublicationsSection'
import ScrollReveal from '../ScrollReveal'

export default function ResearchPage() {
  const navigate = useNavigate()

  const centres = [
    { 
      icon: 'fa-rocket', 
      title: 'UDAAN R&D Center', 
      subtitle: 'Research & Development', 
      desc: 'KMIT\'s flagship R&D center supporting faculty and student research in emerging technological domains. Hosts collaborative projects, international publications, and doctoral-level research activities.',
      to: '/research/labs'
    },
    { 
      icon: 'fa-building-columns', 
      title: 'COE — Centre of Excellence', 
      subtitle: 'Technology Excellence Labs', 
      desc: 'Coordinated research, focused technology training programs, and industry consultancy projects. Each COE is aligned with a specific technology domain: AI, Cloud, Cybersecurity, or IoT.',
      to: '/research/coe'
    },
    { 
      icon: 'fa-industry', 
      title: 'IIC — Industry Interaction Cell', 
      subtitle: 'Industry–Academia Bridge', 
      desc: 'Recognized by the Ministry of Education\'s Innovation Cell. IIC facilitates MoUs with companies, organises innovation challenges, and connects students with startup ecosystems and incubators.',
      to: '/administration/innovation-council'
    },
    { 
      icon: 'fa-lightbulb', 
      title: 'SONET Research Centre', 
      subtitle: 'Advanced Computing', 
      desc: 'SONET focuses on advanced computing, networking, and applied science research. Faculty and PhD students collaborate on projects funded by DST, AICTE, and industry sponsors.',
      to: '/research/labs'
    },
    { 
      icon: 'fa-building', 
      title: 'Imagineering School', 
      subtitle: 'T-HUB Partnership', 
      desc: 'KMIT\'s Innovation Centre in collaboration with T-HUB Telangana — India\'s largest startup incubator. Provides students mentorship from startup founders, prototyping resources, and entrepreneurship sessions.',
      to: '/student-life/co-curricular'
    },
  ]

  const achievements = [
    { icon: 'fa-brands fa-google', title: 'GSoC 2025 — 4 Students', desc: 'Nischal, Srinivas, Akash, and Sai Varshith selected for Google Summer of Code 2025 — one of the world\'s most prestigious open-source research programs.' },
    { icon: 'fa-trophy', title: 'SIH 2025 Grand Finale Victory', desc: 'Team ASHTOJ won the Smart India Hackathon 2025 Grand Finale — solving a Defence Ministry problem statement in the national-level competition.' },
    { icon: 'fa-layer-group', title: 'SWAYAM NPTEL #1 in India', desc: 'KMIT ranked Number One in India in the SWAYAM NPTEL Best Institute category for two consecutive years — a testament to faculty and student commitment to learning.' },
    { icon: 'fa-cricket-bat-ball', title: 'National Sports Achievement', desc: 'Ms. G. Hasini (3rd Year AIML) selected for the BCCI Senior Women\'s One Day Cricket Team — representing KMIT on the national sports stage.' },
  ]

  return (
    <PageShell
      eyebrow="Research & Innovation"
      title="Research &"
      titleEm="Development"
      description="KMIT fosters a strong culture of research, innovation, and entrepreneurship through dedicated centres, industry partnerships, and nationally recognized student achievements."
      breadcrumbs={[{ label: 'Academics', to: '/academics' }, { label: 'Research' }]}
    >
      {/* Research Centres */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-flask"></i> Research Ecosystem</div>
            <h2>Our <em>Research Ecosystem</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="info-cards-grid">
            {centres.map((c, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 100} style={{ height: '100%' }}>
              <div 
                className="info-card"
                style={{ 
                  cursor: c.to ? 'pointer' : 'default', 
                  transition: 'all 0.3s ease',
                  border: '1px solid var(--light-grey)',
                  borderRadius: '12px'
                }}
                onClick={() => c.to && navigate(c.to)}
              >
                <div className="info-card-icon"><i className={`fa-solid ${c.icon}`}></i></div>
                <div>
                  <div style={{fontSize:'0.7rem', fontWeight:800, color:'var(--vibrant-accent)', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'0.3rem'}}>{c.subtitle}</div>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--navy)', fontWeight: '800' }}>{c.title}</h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>{c.desc}</p>
                  {c.to && (
                    <div style={{ marginTop: '1.25rem', color: 'var(--vibrant-accent)', fontWeight: '800', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      Explore Section <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.85em' }} />
                    </div>
                  )}
                </div>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-trophy"></i> Achievements</div>
            <h2>Research <em>Highlights</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="info-cards-grid">
            {achievements.map((a, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 100} style={{ height: '100%' }}>
              <div className="info-card" style={{ height: '100%' }}>
                <div className="info-card-icon"><i className={`${a.icon}`}></i></div>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Publication & Stats */}
      <section className="page-section-dark">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow" style={{background:'rgba(255,107,0,0.15)', borderColor:'rgba(255,107,0,0.3)', color:'var(--vibrant-accent)'}}>
              <i className="fa-solid fa-chart-bar"></i> At a Glance
            </div>
            <h2>Research <em style={{color:'var(--vibrant-accent)', fontStyle:'normal'}}>Impact</em></h2>
            <div className="section-divider" style={{background:'linear-gradient(90deg, var(--vibrant-accent), #fff)'}}></div>
          </div>
          <ScrollReveal animation="fade-up">
          <div className="stats-strip" style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)'}}>
            <div className="stat-block">
              <span className="stat-value">4<span className="accent">+</span></span>
              <span className="stat-label">GSoC Selections (2025)</span>
            </div>
            <div className="stat-block">
              <span className="stat-value"><span className="accent">#1</span></span>
              <span className="stat-label">SWAYAM NPTEL (2 Years)</span>
            </div>
            <div className="stat-block">
              <span className="stat-value">5</span>
              <span className="stat-label">Research Centres</span>
            </div>
            <div className="stat-block">
              <span className="stat-value"><span className="accent">SIH</span></span>
              <span className="stat-label">National Winners 2025</span>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Publications Menu Footer */}
      <ResearchPublicationsSection />
    </PageShell>
  )
}

