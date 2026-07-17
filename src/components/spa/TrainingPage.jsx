import PageShell from './PageShell'
import { useNavigate } from 'react-router-dom'

export default function TrainingPage() {
  const navigate = useNavigate()

  const modules = [
    { icon: 'fa-brain', title: 'Aptitude Training', desc: 'Quantitative Aptitude, Logical Reasoning, and Verbal Ability — structured weekly sessions using proven material covering all major company test patterns.' },
    { icon: 'fa-code', title: 'Technical & Coding Skills', desc: 'Data Structures, Algorithms, SQL, and system design. Weekly coding challenges on HackerRank, LeetCode, and competitive programming platforms.' },
    { icon: 'fa-comments', title: 'Communication & Soft Skills', desc: 'Group Discussions, Presentation Skills, Email Etiquette, and Business Communication — aligned with the BEC Cambridge program.' },
    { icon: 'fa-user-tie', title: 'Mock Interviews', desc: 'Regular one-on-one mock interviews simulating HR and Technical rounds, with detailed feedback from industry-experienced evaluators.' },
    { icon: 'fa-chalkboard-teacher', title: 'Resume & LinkedIn', desc: 'Resume writing workshops, LinkedIn profile building, and professional branding sessions for final-year students.' },
    { icon: 'fa-industry', title: 'Industry Interaction', desc: 'Weekly guest lectures, panel discussions, and Q&A sessions with senior professionals from top MNCs across various technology domains.' },
  ]

  return (
    <PageShell
      eyebrow="Career Readiness"
      title="Training"
      titleEm="Programs"
      description="KMIT's comprehensive training ecosystem ensures every student is interview-ready, technically proficient, and professionally confident by the time they step into the industry."
      breadcrumbs={[{ label: 'Placements', to: '/placements' }, { label: 'Training Programs' }]}
    >
      {/* Stats */}
      <section className="page-section">
        <div className="container">
          <div className="stats-strip">
            <div className="stat-block">
              <span className="stat-value">3<span className="accent">rd</span></span>
              <span className="stat-label">Year Training Starts</span>
            </div>
            <div className="stat-block">
              <span className="stat-value">100<span className="accent">+</span></span>
              <span className="stat-label">Hours of Training</span>
            </div>
            <div className="stat-block">
              <span className="stat-value"><span className="accent">Live</span></span>
              <span className="stat-label">Industry Mentors</span>
            </div>
            <div className="stat-block">
              <span className="stat-value">90<span className="accent">%+</span></span>
              <span className="stat-label">Placement Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Training Modules */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-graduation-cap"></i> Program Modules</div>
            <h2>What We <em>Cover</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="info-cards-grid">
            {modules.map((m, i) => (
              <div key={i} className="info-card">
                <div className="info-card-icon"><i className={`fa-solid ${m.icon}`}></i></div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Genesis School */}
      <section className="page-section">
        <div className="container">
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center'}}>
            <div>
              <div className="section-header">
                <div className="section-eyebrow"><i className="fa-solid fa-bolt"></i> Industry Partner</div>
                <h2>Genesis <em>School</em></h2>
                <div className="section-divider"></div>
              </div>
              <p style={{color:'var(--text-muted)', lineHeight:'1.8', marginBottom:'1.5rem'}}>
                KMIT is co-promoted by <strong>Genesis Solutions Pvt. Ltd</strong> — a premier technology training institute in Hyderabad with 25+ years of expertise in industry-focused software education.
              </p>
              <p style={{color:'var(--text-muted)', lineHeight:'1.8', marginBottom:'2rem'}}>
                Genesis School provides specialised technology training batches for KMIT final-year students in high-demand domains: Full Stack Development, Data Science, Cloud, and DevOps — with direct industry placement support.
              </p>
              <button className="btn-primary" onClick={() => navigate('/placements/genesis')}>
                <i className="fa-solid fa-arrow-right"></i> Learn About Genesis School
              </button>
            </div>
            <div className="info-cards-grid" style={{gridTemplateColumns:'1fr 1fr'}}>
              {[
                {icon:'fa-layer-stack', title:'Full Stack Dev', desc:'MERN/MEAN stack with live project development'},
                {icon:'fa-chart-bar', title:'Data Science', desc:'Python, ML, DL, Tableau, Power BI'},
                {icon:'fa-cloud', title:'Cloud & DevOps', desc:'AWS, Azure, Docker, Kubernetes, CI/CD'},
                {icon:'fa-shield-halved', title:'Cybersecurity', desc:'Ethical hacking, security audits, VAPT basics'},
              ].map((item, i) => (
                <div key={i} className="info-card" style={{padding:'1.2rem'}}>
                  <div className="info-card-icon" style={{width:'40px', height:'40px', fontSize:'1rem'}}>
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                  <h3 style={{fontSize:'0.88rem'}}>{item.title}</h3>
                  <p style={{fontSize:'0.8rem'}}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Finishing School */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-school-flag"></i> Flagship Program</div>
            <h2>The Finishing <em>School</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="highlight-quote">
            <p>"KMIT instituted a comprehensive Finishing School program for its Final year students — a structured, intensive program that combines technical skill building, soft skills training, and industry interaction to maximize placement outcomes."</p>
            <cite>— KMIT Training & Placement Cell</cite>
          </div>
          <div style={{marginTop:'2rem', textAlign:'center'}}>
            <button className="btn-outline-nav" onClick={() => navigate('/student-life/finishing-school')}>
              <i className="fa-solid fa-school"></i> View Finishing School Details
            </button>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
