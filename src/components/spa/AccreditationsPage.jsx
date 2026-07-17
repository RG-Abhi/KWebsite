import PageShell from './PageShell'
import { useNavigate } from 'react-router-dom'

export default function AccreditationsPage() {
  const navigate = useNavigate()

  const accreditations = [
    {
      code: 'NAAC', name: 'National Assessment & Accreditation Council', grade: 'A+',
      icon: 'fa-award', color: 'var(--brand-orange-text)',
      desc: 'KMIT has been accredited by NAAC with the prestigious \'A+\' Grade, recognising its commitment to quality education, research output, faculty development, infrastructure, and institutional governance.',
      details: ['Grade: A+', 'Cycle: 2nd Cycle', 'Accreditation Body: UGC', 'Valid for 5 Years'],
    },
    {
      code: 'NBA', name: 'National Board of Accreditation', grade: 'Accredited',
      icon: 'fa-certificate', color: '#0B1F3A',
      desc: 'NBA has accredited KMIT\'s CSE and IT programmes, recognising them as meeting the highest global standards for engineering education in terms of curriculum, outcomes, and graduate competence.',
      details: ['Programmes: CSE & IT', 'Body: AICTE / NBA', 'Status: Accredited', 'Renewing Cycle'],
    },
    {
      code: 'NIRF', name: 'National Institutional Ranking Framework', grade: 'Ranked',
      icon: 'fa-ranking-star', color: '#2d5a27',
      desc: 'KMIT participates in the NIRF Rankings published by the Ministry of Education, Government of India. The framework evaluates institutions across Teaching, Research, Outreach, Perception, and Graduation Outcomes.',
      details: ['Framework: Ministry of Education', 'Category: Engineering', 'Parameters: 5 Pillars', 'Annual Ranking'],
    },
    {
      code: 'IQAC', name: 'Internal Quality Assurance Cell', grade: 'Active',
      icon: 'fa-shield-halved', color: '#6b2d8b',
      desc: 'KMIT\'s IQAC (Internal Quality Assurance Cell) continuously monitors and enhances academic quality across all departments. It coordinates accreditation processes, faculty development, audit cycles, and institutional surveys.',
      details: ['Status: Fully Functional', 'Reports: Annual AQAR', 'Compliance: UGC Norms', 'Reviews: Semester-wise'],
    },
    {
      code: 'AICTE', name: 'All India Council for Technical Education', grade: 'Approved',
      icon: 'fa-building-columns', color: '#7a4f00',
      desc: 'KMIT is approved by AICTE, New Delhi — the statutory body for technical education in India. AICTE approval ensures that the institution meets the prescribed standards for engineering programmes, faculty, and infrastructure.',
      details: ['Approval: AICTE, New Delhi', 'Category: Degree Level', 'Scope: All Programmes', 'Annual Compliance'],
    },
    {
      code: 'JNTUH', name: 'Jawaharlal Nehru Technological University Hyderabad', grade: 'Affiliated',
      icon: 'fa-graduation-cap', color: '#003366',
      desc: 'KMIT is affiliated to JNTU Hyderabad and has also received Autonomous Status from JNTUH. This allows KMIT to design its own curriculum, conduct internal examinations, and innovate in course delivery beyond the university framework.',
      details: ['Affiliation: JNTU Hyderabad', 'Status: Autonomous', 'Granted: 2015', 'Degree: B.Tech (JNTUH)'],
    },
  ]

  const documents = [
    { label: 'NAAC SSR (Self Study Report)', icon: 'fa-file-pdf' },
    { label: 'NBA Accreditation Certificate — CSE', icon: 'fa-file-certificate' },
    { label: 'NBA Accreditation Certificate — IT', icon: 'fa-file-certificate' },
    { label: 'AICTE Approval Letter 2025–26', icon: 'fa-file-shield' },
    { label: 'IQAC Annual Quality Assurance Report (AQAR)', icon: 'fa-file-lines' },
    { label: 'Affiliation Certificate — JNTU Hyderabad', icon: 'fa-file-signature' },
  ]

  return (
    <PageShell
      eyebrow="Quality Assurance"
      title="Accreditations &"
      titleEm="Rankings"
      description="KMIT holds multiple prestigious national accreditations that certify its academic excellence, infrastructure quality, research output, and institutional governance."
      breadcrumbs={[{ label: 'About', to: '/about' }, { label: 'Accreditations & Rankings' }]}
    >
      {/* Stats Strip */}
      <section className="page-section">
        <div className="container">
          <div className="stats-strip">
            <div className="stat-block">
              <span className="stat-value"><span className="accent">A+</span></span>
              <span className="stat-label">NAAC Grade</span>
            </div>
            <div className="stat-block">
              <span className="stat-value"><span className="accent">NBA</span></span>
              <span className="stat-label">CSE & IT Accredited</span>
            </div>
            <div className="stat-block">
              <span className="stat-value"><span className="accent">NIRF</span></span>
              <span className="stat-label">Nationally Ranked</span>
            </div>
            <div className="stat-block">
              <span className="stat-value">6</span>
              <span className="stat-label">Recognitions & Approvals</span>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditation Cards */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-certificate"></i> Accreditations</div>
            <h2>Our <em>Recognitions</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="dept-cards-grid">
            {accreditations.map((a, i) => (
              <div key={i} className="dept-card">
                <div className="dept-card-header" style={{background:`linear-gradient(135deg, ${a.color} 0%, ${a.color}bb 100%)`}}>
                  <div className="dept-badge" style={{background:'rgba(255,255,255,0.2)', border:'1px solid rgba(255,255,255,0.4)'}}>
                    <i className={`fa-solid ${a.icon}`}></i> {a.grade}
                  </div>
                  <h3 style={{fontSize:'1rem'}}>{a.code} — {a.name.split(' ').slice(0,3).join(' ')}</h3>
                </div>
                <div className="dept-card-body">
                  <p style={{fontSize:'0.85rem', marginBottom:'1rem'}}>{a.desc}</p>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.4rem'}}>
                    {a.details.map((d, j) => (
                      <div key={j} style={{fontSize:'0.75rem', color:'var(--text-muted)', display:'flex', alignItems:'center', gap:'5px'}}>
                        <i className="fa-solid fa-check" style={{color: 'var(--brand-orange-text)', fontSize:'0.65rem'}}></i>
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditation Documents */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-folder-open"></i> Official Documents</div>
            <h2>Certificates & <em>Reports</em></h2>
            <div className="section-divider"></div>
            <p>All official accreditation certificates and quality assurance reports are available on request from the IQAC office.</p>
          </div>
          <div className="info-cards-grid">
            {documents.map((d, i) => (
              <div key={i} className="info-card" style={{flexDirection:'row', alignItems:'center', padding:'1.2rem 1.5rem', gap:'1rem', cursor:'pointer'}}
                onMouseEnter={e => e.currentTarget.style.borderColor='var(--navy)'}
                onMouseLeave={e => e.currentTarget.style.borderColor='var(--light-grey)'}
              >
                <div className="info-card-icon" style={{width:'44px', height:'44px', fontSize:'1.1rem', flexShrink:0, background:'linear-gradient(135deg, var(--crimson), #7a0f1f)'}}>
                  <i className="fa-solid fa-file-pdf"></i>
                </div>
                <div>
                  <h3 style={{fontSize:'0.88rem', marginBottom:'0.2rem'}}>{d.label}</h3>
                  <span style={{fontSize:'0.72rem', color: 'var(--brand-orange-text)', fontWeight:700}}>Available on request from IQAC office</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section-alt">
        <div className="container">
          <div className="cta-banner">
            <div>
              <h3>Quality is at the Heart of KMIT</h3>
              <p>Learn how KMIT's IQAC cell drives continuous academic improvement across all departments.</p>
            </div>
            <button className="btn-white" onClick={() => navigate('/contact')}>
              <i className="fa-solid fa-envelope"></i> Contact IQAC Office
            </button>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
