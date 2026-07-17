import PageShell from './PageShell'
import { useNavigate } from 'react-router-dom'

export default function LeadershipPage() {
  const navigate = useNavigate()

  const hods = [
    { name: 'Department of CSE', title: 'Head of Department', dept: 'Computer Science & Engineering', icon: 'fa-laptop-code' },
    { name: 'Department of IT', title: 'Head of Department', dept: 'Information Technology', icon: 'fa-network-wired' },
    { name: 'Department of CSE (AI & ML)', title: 'Head of Department', dept: 'Artificial Intelligence & Machine Learning', icon: 'fa-robot' },
    { name: 'Department of CSE (DS)', title: 'Head of Department', dept: 'Data Science', icon: 'fa-database' },
    { name: 'Department of H&S', title: 'Head of Department', dept: 'Humanities & Sciences', icon: 'fa-flask-vial' },
  ]

  const committees = [
    { icon: 'fa-clipboard-check', title: 'Academic Core Committee (AAC)', desc: 'Oversees curriculum design, academic quality, and institutional learning outcomes.' },
    { icon: 'fa-industry', title: 'Industry Interaction Cell (IIC)', desc: 'Bridges the gap between academia and industry through MoUs, guest lectures, and internships.' },
    { icon: 'fa-scale-balanced', title: 'IDMC', desc: 'Institutional Development and Monitoring Committee ensuring regulatory compliance and institutional growth.' },
    { icon: 'fa-people-group', title: 'Other Committees', desc: 'Grievance Cell, Women\'s Cell, Anti-Ragging Committee, and Internal Complaints Committee.' },
  ]

  return (
    <PageShell
      eyebrow="Administration"
      title="Our"
      titleEm="Leadership"
      description="KMIT is guided by an experienced and visionary leadership team committed to academic excellence, institutional growth, and student success."
      breadcrumbs={[{ label: 'About', to: '/about' }, { label: 'Leadership' }]}
    >
      {/* Senior Leadership */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-star"></i> Senior Leadership</div>
            <h2>Guiding <em>Visionaries</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="leadership-grid" style={{gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))'}}>
            {[
              { icon: 'fa-building-columns', title: 'KMES Society', role: 'Governing Body', desc: 'Keshav Memorial Education Society — 75+ years of educational leadership in Hyderabad, the founding body of KMIT.' },
              { icon: 'fa-user-tie', title: 'Principal', role: 'Academic Head', desc: 'Leads all academic, administrative and strategic operations of the institution, ensuring alignment with KMIT\'s mission and accreditation standards.' },
              { icon: 'fa-chalkboard-teacher', title: 'Director — Academics', role: 'Academic Director', desc: 'Oversees curriculum development, teaching-learning processes, faculty development programs, and student outcomes.' },
            ].map((l, i) => (
              <div key={i} className="info-card" style={{alignItems:'center', textAlign:'center'}}>
                <div className="info-card-icon" style={{margin:'0 auto', width:'64px', height:'64px', fontSize:'1.6rem'}}>
                  <i className={`fa-solid ${l.icon}`}></i>
                </div>
                <div>
                  <div style={{fontSize:'0.72rem', color:'var(--vibrant-accent)', fontWeight:800, textTransform:'uppercase', letterSpacing:'1px', marginBottom:'0.3rem'}}>{l.role}</div>
                  <h3 style={{marginBottom:'0.5rem'}}>{l.title}</h3>
                  <p style={{fontSize:'0.86rem'}}>{l.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Heads of Departments */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-users-viewfinder"></i> Departments</div>
            <h2>Heads of <em>Departments</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="dept-cards-grid">
            {hods.map((h, i) => (
              <div key={i} className="dept-card">
                <div className="dept-card-header">
                  <div className="dept-badge"><i className={`fa-solid ${h.icon}`}></i></div>
                  <h3>{h.name}</h3>
                </div>
                <div className="dept-card-body">
                  <div className="dept-meta">
                    <div className="dept-meta-item"><i className="fa-solid fa-user-tie"></i> <strong>{h.title}</strong></div>
                    <div className="dept-meta-item"><i className="fa-solid fa-graduation-cap"></i> {h.dept}</div>
                  </div>
                  <button className="dept-card-link" onClick={() => navigate(`/academics/${h.dept.toLowerCase().includes('ai') ? 'csm' : h.dept.toLowerCase().includes('data') ? 'csd' : h.dept.toLowerCase().includes('it') ? 'it' : h.dept.toLowerCase().includes('human') ? 'hs' : 'cse'}`)}>
                    View Department <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Committees */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-sitemap"></i> Governance</div>
            <h2>Administrative <em>Committees</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="info-cards-grid">
            {committees.map((c, i) => (
              <div key={i} className="info-card">
                <div className="info-card-icon"><i className={`fa-solid ${c.icon}`}></i></div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section-alt">
        <div className="container">
          <div className="cta-banner">
            <div>
              <h3>Explore Our World-Class Campus</h3>
              <p>State-of-the-art labs, library, sports facilities and more — all designed to support your learning journey.</p>
            </div>
            <button className="btn-white" onClick={() => navigate('/about/campus')}>
              <i className="fa-solid fa-tree-city"></i> See Campus
            </button>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
