import PageShell from './PageShell'
import { useNavigate } from 'react-router-dom'

export default function AcademicsPage() {
  const navigate = useNavigate()

  const depts = [
    { key: 'cse', code: 'CSE', name: 'Computer Science & Engineering', intake: 300, est: 2007, nba: true, icon: 'fa-laptop-code', desc: 'Core software engineering, algorithms, and systems design with an emphasis on industry readiness and research.' },
    { key: 'csm', code: 'AI & ML', name: 'CSE — Artificial Intelligence & Machine Learning', intake: 120, est: 2020, nba: false, icon: 'fa-robot', desc: 'Deep learning, neural networks, computer vision, NLP, and intelligent systems for the AI-driven future.' },
    { key: 'csd', code: 'Data Science', name: 'CSE — Data Science', intake: 60, est: 2020, nba: false, icon: 'fa-database', desc: 'Big data, analytics, statistical modelling, and data engineering to transform raw data into insights.' },
    { key: 'it', code: 'IT', name: 'Information Technology', intake: 60, est: 2007, nba: true, icon: 'fa-network-wired', desc: 'Full-stack development, cloud computing, cybersecurity, and information systems management.' },
    { key: 'hs', code: 'H&S', name: 'Humanities & Sciences', intake: null, est: 2007, nba: false, icon: 'fa-flask-vial', desc: 'Mathematics, Physics, Communication Skills — the academic foundation for all B.Tech programmes at KMIT.' },
  ]

  const initiatives = [
    { icon: 'fa-computer', title: 'TESSELLATOR', desc: 'KMIT\'s custom Learning Management System built on Moodle. Enables digital learning, assignments, assessments, and activity tracking.' },
    { icon: 'fa-school', title: 'Finishing School', desc: 'A comprehensive career-readiness program for final-year students — covering communication, aptitude, coding, and mock interviews.' },
    { icon: 'fa-rocket', title: 'UDAAN R&D Center', desc: 'KMIT\'s dedicated research and development centre supporting faculty and student research in emerging technology domains.' },
    { icon: 'fa-flask', title: 'Project School', desc: 'Real-world industry projects for 2nd-year students across Biomedical, Agri, Defence, and GSoC domains, with monthly stipends.' },
    { icon: 'fa-certificate', title: 'BEC Cambridge', desc: 'Cambridge Business English Certificate program preparing students for global professional communication standards.' },
    { icon: 'fa-layer-group', title: 'SWAYAM NPTEL', desc: 'KMIT ranked #1 across India in the SWAYAM NPTEL Best Institute category for two consecutive years — the highest distinction.' },
    { icon: 'fa-lightbulb', title: 'UTTKARSH', desc: 'An advanced learning assistance program providing structured coaching to students for academic excellence and beyond.' },
    { icon: 'fa-building-columns', title: 'COE Labs', desc: 'Centres of Excellence for coordinated research, focused technology trainings, and industry consultancy projects.' },
  ]

  return (
    <PageShell
      eyebrow="Academic Programmes"
      title="Departments &"
      titleEm="Programmes"
      description="KMIT offers four undergraduate B.Tech programmes affiliated to JNTU Hyderabad, designed to meet the demands of today's technology-driven global industry."
      breadcrumbs={[{ label: 'Academics' }]}
    >
      {/* Departments */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-graduation-cap"></i> Departments</div>
            <h2>Our <em>Departments</em></h2>
            <div className="section-divider"></div>
            <p>Choose your path from four cutting-edge engineering disciplines, each designed for the careers of tomorrow.</p>
          </div>
          <div className="dept-cards-grid">
            {depts.map((d, i) => (
              <div key={i} className="dept-card" onClick={() => navigate(`/academics/${d.key}`)}>
                <div className="dept-card-header">
                  <div className="dept-badge">{d.code}{d.nba ? ' — NBA ✓' : ''}</div>
                  <h3>{d.name}</h3>
                </div>
                <div className="dept-card-body">
                  <p>{d.desc}</p>
                  <div className="dept-meta">
                    {d.intake && <div className="dept-meta-item"><i className="fa-solid fa-users"></i> Intake: <strong>{d.intake}</strong></div>}
                    <div className="dept-meta-item"><i className="fa-solid fa-calendar"></i> Est. <strong>{d.est}</strong></div>
                  </div>
                  <button className="dept-card-link">
                    Explore Department <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-sparkles"></i> Unique Initiatives</div>
            <h2>Beyond the <em>Classroom</em></h2>
            <div className="section-divider"></div>
            <p>KMIT's signature programs that go far beyond the standard curriculum, creating industry-ready, globally competitive graduates.</p>
          </div>
          <div className="info-cards-grid">
            {initiatives.map((init, i) => (
              <div key={i} className="info-card">
                <div className="info-card-icon"><i className={`fa-solid ${init.icon}`}></i></div>
                <h3>{init.title}</h3>
                <p>{init.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources section */}
      <section className="page-section">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-book-open"></i> Academic Resources</div>
            <h2>Tools for <em>Learning</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="programme-table-wrap">
            {[
              { code: 'KR-23', title: 'Current Regulation', features: ['4-year B.Tech', '8 semesters', 'CBCS pattern', 'Industry projects'], link: '/academics/syllabus' },
              { code: 'KR-21', title: 'Previous Regulation', features: ['4-year B.Tech', 'JNTUH pattern', 'Lateral entry support', 'Elective subjects'], link: '/academics/syllabus' },
              { code: 'Calendar', title: 'Academic Calendar', features: ['Semester schedule', 'Exam timetables', 'Holiday list', 'Event schedule'], link: '/academics/calendar' },
              { code: 'Evaluation', title: 'Assessment System', features: ['30% Internal Marks', '70% External Exam', 'Threshold policy', 'Backlog support'], link: '/academics/evaluation' },
            ].map((r, i) => (
              <div key={i} className="programme-card">
                <div className="programme-card-top">
                  <span className="prog-code">{r.code}</span>
                  <h4>{r.title}</h4>
                </div>
                <div className="programme-card-body">
                  {r.features.map((f, j) => (
                    <div key={j} className="programme-meta-row">
                      <span>{f}</span>
                      <i className="fa-solid fa-check" style={{color: 'var(--brand-orange-text)'}}></i>
                    </div>
                  ))}
                  <button className="dept-card-link" style={{marginTop:'1rem'}} onClick={() => navigate(r.link)}>
                    View Details <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section-dark">
        <div className="container" style={{textAlign:'center'}}>
          <div className="section-eyebrow" style={{margin:'0 auto 1.5rem', display:'inline-flex'}}>
            <i className="fa-solid fa-chart-line"></i> Placement Success
          </div>
          <h2 style={{fontFamily:'var(--font-serif)', fontSize:'clamp(1.8rem, 3vw, 2.6rem)', marginBottom:'1rem', color:'#fff'}}>
            Academics That <em style={{color:'var(--vibrant-accent)', fontStyle:'normal'}}>Deliver Results</em>
          </h2>
          <p style={{color:'rgba(255,255,255,0.7)', marginBottom:'2rem', maxWidth:'600px', margin:'0 auto 2rem'}}>
            KMIT graduates have been placed with 300+ companies including Google, Microsoft, Amazon, Goldman Sachs, Salesforce and more.
          </p>
          <button className="btn-white" onClick={() => navigate('/placements')}>
            <i className="fa-solid fa-briefcase"></i> View Placement Record
          </button>
        </div>
      </section>
    </PageShell>
  )
}
