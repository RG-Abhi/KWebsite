import PageShell from './PageShell'
import { useNavigate } from 'react-router-dom'

export default function VisionPage() {
  const navigate = useNavigate()

  const values = [
    { icon: 'fa-lightbulb', title: 'Innovation', desc: 'Fostering creative thinking and technological innovation through project-based, research-driven learning environments.' },
    { icon: 'fa-scale-balanced', title: 'Ethics & Integrity', desc: 'Building engineers who demonstrate strong ethical responsibility and professional integrity in all their endeavors.' },
    { icon: 'fa-globe', title: 'Global Competitiveness', desc: 'Preparing graduates to excel in international arenas through industry-focused curriculum and global exposure.' },
    { icon: 'fa-users', title: 'Holistic Development', desc: 'Nurturing well-rounded individuals through co-curricular activities, sports, leadership, and community service.' },
  ]

  return (
    <PageShell
      eyebrow="Our Philosophy"
      title="Vision &"
      titleEm="Mission"
      description="KMIT's guiding philosophy is centered on producing world-class engineers who are technically proficient, ethically grounded, and globally competitive."
      breadcrumbs={[{ label: 'About', to: '/about' }, { label: 'Vision & Mission' }]}
    >
      {/* Vision */}
      <section className="page-section">
        <div className="container">
          <div className="leadership-grid">
            <div>
              <div className="section-header">
                <div className="section-eyebrow"><i className="fa-solid fa-eye"></i> Vision</div>
                <h2>Our <em>Vision</em></h2>
                <div className="section-divider"></div>
              </div>
              <div className="quote-block" style={{ margin: '2rem 0' }}>
                <i className="fa-solid fa-quote-left"></i>
                <p>"To become a globally recognised institution of technical excellence, nurturing innovative engineers who contribute meaningfully to society and industry."</p>
              </div>
              <p style={{fontSize:'1.05rem', color:'var(--text-muted)', lineHeight:'1.8'}}>
                KMIT aspires to be a premier engineering institution that not only imparts technical knowledge but fosters a culture of continuous learning, ethical behaviour, and societal responsibility. We aim to produce graduates who are not just job-ready, but future-ready.
              </p>
            </div>
            <div>
              <div className="section-header">
                <div className="section-eyebrow"><i className="fa-solid fa-bullseye"></i> Mission</div>
                <h2>Our <em>Mission</em></h2>
                <div className="section-divider"></div>
              </div>
              <div className="faq-list">
                {[
                  'Provide high-quality technical education aligned with global industry standards.',
                  'Foster a research-oriented environment through dedicated R&D centres and labs.',
                  'Enable industry partnerships for real-world learning and placement excellence.',
                  'Cultivate leadership, communication, and professional skills through holistic programs.',
                  'Promote social responsibility through NSS, co-curriculars, and community initiatives.',
                ].map((item, i) => (
                  <div key={i} className="info-card" style={{flexDirection:'row', alignItems:'center', padding:'1.5rem', gap:'1.5rem'}}>
                    <div style={{width:'32px', height:'32px', background:'var(--crimson)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, color:'#fff', fontSize:'0.8rem', fontWeight:800}}>{i+1}</div>
                    <p style={{margin:0, fontSize:'1rem', fontWeight: 600, color: 'var(--navy)'}}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-heart"></i> Core Values</div>
            <h2>What We <em>Stand For</em></h2>
            <div className="section-divider"></div>
            <p>These four pillars define the KMIT experience and shape every student's journey.</p>
          </div>
          <div className="info-cards-grid">
            {values.map((v, i) => (
              <div key={i} className="info-card">
                <div className="info-card-icon"><i className={`fa-solid ${v.icon}`}></i></div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Policy */}
      <section className="page-section">
        <div className="container" style={{maxWidth:'1000px'}}>
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-shield-halved"></i> Quality Policy</div>
            <h2>Commitment to <em>Excellence</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="quote-block">
            <i className="fa-solid fa-quote-left"></i>
            <p>"KMIT is committed to providing quality technical education by continuously improving the teaching-learning process, promoting research, ensuring industry relevance, and creating an environment that nurtures academic, personal, and professional development of students and staff."</p>
            <div className="quote-author">— KMIT Quality Policy</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-section-alt">
        <div className="container">
          <div className="cta-banner">
            <div>
              <h3>See These Values in Action</h3>
              <p>Explore how KMIT's vision translates into exceptional academic programmes and student outcomes.</p>
            </div>
            <button className="btn-white" onClick={() => navigate('/about/leadership')}>
              <i className="fa-solid fa-users"></i> Meet Our Leadership
            </button>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
