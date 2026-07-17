import PageShell from './PageShell'
import { useNavigate } from 'react-router-dom'

export default function GenesisPage() {
  const navigate = useNavigate()

  const tracks = [
    { icon: 'fa-globe', title: 'Full Stack Development', desc: 'MERN (MongoDB, Express, React, Node.js) and MEAN stack with live project development and deployment on cloud platforms.', duration: '6 months', outcome: 'Junior Full Stack Developer' },
    { icon: 'fa-chart-bar', title: 'Data Science & ML', desc: 'Python for Data Science, Machine Learning, Deep Learning, Tableau, Power BI — with real-world datasets and industry projects.', duration: '6 months', outcome: 'Data Analyst / ML Engineer' },
    { icon: 'fa-cloud', title: 'Cloud & DevOps', desc: 'AWS, Azure, Docker, Kubernetes, Jenkins, CI/CD pipelines, and Infrastructure as Code (IaC) with Terraform.', duration: '4 months', outcome: 'Cloud Associate / DevOps Engineer' },
    { icon: 'fa-shield-halved', title: 'Cybersecurity', desc: 'Ethical hacking fundamentals, vulnerability assessment, penetration testing basics, and security audit operations.', duration: '4 months', outcome: 'Security Analyst' },
  ]

  return (
    <PageShell
      eyebrow="Industry Partner"
      title="Genesis"
      titleEm="School"
      description="Genesis Solutions Pvt. Ltd — KMIT's industry partner with 25+ years of experience in technology training — offers specialised tech certification programs to KMIT final-year and graduate students."
      breadcrumbs={[{ label: 'Placements', to: '/placements' }, { label: 'Genesis School' }]}
    >
      {/* About Genesis */}
      <section className="page-section">
        <div className="container">
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center'}}>
            <div>
              <div className="section-header">
                <div className="section-eyebrow"><i className="fa-solid fa-bolt"></i> About Genesis</div>
                <h2>25+ Years of <em>Excellence</em></h2>
                <div className="section-divider"></div>
              </div>
              <p style={{color:'var(--text-muted)', lineHeight:'1.8', marginBottom:'1.5rem'}}>
                Genesis Solutions Pvt. Ltd is a premier technology training and consulting company based in Hyderabad, co-promoting KMIT. With over 25 years of industry expertise, Genesis has been instrumental in grooming thousands of software professionals across India.
              </p>
              <p style={{color:'var(--text-muted)', lineHeight:'1.8', marginBottom:'2rem'}}>
                The Genesis School at KMIT offers focused technology programs designed for placement — with live industry projects, direct mentorship from senior professionals, and strong recruitment linkages.
              </p>
              <div className="stats-strip" style={{borderRadius:'12px', overflow:'hidden'}}>
                {[
                  {val:'25+', label:'Years of Training'},
                  {val:'10K+', label:'Alumni Placed'},
                  {val:'4', label:'Tech Tracks'},
                ].map((s, i) => (
                  <div key={i} className="stat-block">
                    <span className="stat-value"><span className="accent">{s.val}</span></span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="highlight-quote">
              <p>"Genesis Solutions is a technology-focused training and services company that has been handholding software engineers for 25+ years. The Genesis partnership gives KMIT students a direct edge in the job market."</p>
              <cite>— Genesis Solutions Pvt. Ltd</cite>
            </div>
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-road"></i> Programmes</div>
            <h2>Technology <em>Tracks</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="dept-cards-grid">
            {tracks.map((t, i) => (
              <div key={i} className="dept-card">
                <div className="dept-card-header">
                  <div className="dept-badge"><i className={`fa-solid ${t.icon}`}></i></div>
                  <h3>{t.title}</h3>
                </div>
                <div className="dept-card-body">
                  <p>{t.desc}</p>
                  <div className="dept-meta">
                    <div className="dept-meta-item"><i className="fa-solid fa-clock"></i> Duration: <strong>{t.duration}</strong></div>
                    <div className="dept-meta-item"><i className="fa-solid fa-briefcase"></i> <strong>{t.outcome}</strong></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="page-section">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-list-ol"></i> How to Join</div>
            <h2>Admission <em>Process</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="process-steps">
            {[
              { title: 'Expression of Interest', desc: 'Submit your EoI during the 3rd year of B.Tech. Selection is based on CGPA and aptitude.' },
              { title: 'Aptitude Test', desc: 'A written aptitude and programming test to assess readiness for the chosen technology track.' },
              { title: 'Track Selection', desc: 'Choose your technology domain — Full Stack, Data Science, Cloud, or Cybersecurity.' },
              { title: 'Training Begins', desc: 'Intensive 4–6 month training program combining theoretical sessions with live project work.' },
              { title: 'Placement Support', desc: 'Genesis connects you directly with its network of hiring partners for interview and placement.' },
            ].map((s, i) => (
              <div key={i} className="process-step">
                <div className="step-number">{i + 1}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section-alt">
        <div className="container">
          <div className="cta-banner">
            <div>
              <h3>Interested in Genesis School?</h3>
              <p>Contact the Training & Placement Cell for batch schedules, eligibility, and the next enrollment date.</p>
            </div>
            <button className="btn-white" onClick={() => navigate('/contact')}>
              <i className="fa-solid fa-envelope"></i> Contact T&P Cell
            </button>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
