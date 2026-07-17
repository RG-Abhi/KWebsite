import PageShell from './PageShell'
import { useNavigate } from 'react-router-dom'

export default function ScholarshipsPage() {
  const navigate = useNavigate()

  const govtScholarships = [
    {
      name: 'TS ePass Scholarship',
      body: 'Telangana State Government',
      icon: 'fa-landmark',
      category: 'SC / ST / BC / EWS',
      coverage: 'Full Tuition Fee',
      desc: 'The Telangana Post Matric Scholarship (ePass) covers full tuition fees for eligible students from SC, ST, BC, and EWS categories. Apply at tsepass.cgg.gov.in using your income certificate and caste certificate.',
      steps: ['Register at tsepass.cgg.gov.in', 'Submit income & caste certificates', 'Link Aadhaar and bank account', 'Track disbursement annually']
    },
    {
      name: 'Post Matric Scholarship (Central)',
      body: 'Ministry of Social Justice & Empowerment',
      icon: 'fa-building-columns',
      category: 'SC / ST / OBC / Minorities',
      coverage: 'Tuition + Maintenance',
      desc: 'Central Government scholarship for socially backward categories. Disbursed through NSP (National Scholarship Portal). Amount includes tuition reimbursement and monthly maintenance allowance.',
      steps: ['Apply on scholarships.gov.in', 'Upload income certificate', 'Institution verification required', 'Disbursed directly to bank']
    },
    {
      name: 'National Scholarship Portal (NSP)',
      body: 'Ministry of Electronics & IT, GOI',
      icon: 'fa-computer',
      category: 'Multiple Categories',
      coverage: 'Varies by scheme',
      desc: 'The NSP hosts 50+ central and state scholarship schemes. KMIT students can access all applicable scholarships through the single-window NSP portal at scholarships.gov.in.',
      steps: ['Visit scholarships.gov.in', 'Select applicable scheme', 'Complete profile and upload documents', 'Track application status online']
    },
  ]

  const kmitScholarships = [
    {
      name: 'Merit Scholarship',
      icon: 'fa-trophy',
      desc: 'KMIT institutes fee concessions for students who rank in the top 1% of their EAPCET category in the state, recognising exceptional academic performance at the entry level.',
      criteria: 'Top 1% EAPCET rank (category-wise)'
    },
    {
      name: 'Sports Excellence Award',
      icon: 'fa-medal',
      desc: 'Students representing KMIT at state or national level sports events are eligible for fee concessions and certificate recognition based on performance and achievement.',
      criteria: 'State / National level sports representation'
    },
    {
      name: 'Special Category Support',
      icon: 'fa-hand-holding-heart',
      desc: 'Fee relief for children of armed forces personnel, physically challenged students, and wards of deceased government servants as per Telangana government norms.',
      criteria: 'Armed forces / Physically challenged / Govt. wards'
    },
    {
      name: 'Research Stipend',
      icon: 'fa-flask',
      desc: 'Students enrolled in the KMIT Project School or UDAAN R&D initiative receive a monthly stipend. This is not a scholarship but direct compensation for research contribution.',
      criteria: 'Selected via Project School / UDAAN process'
    },
  ]

  return (
    <PageShell
      eyebrow="Financial Aid"
      title="Scholarships &"
      titleEm="Financial Support"
      description="KMIT is committed to making quality engineering education accessible. Multiple government scholarships and institutional support mechanisms are available for eligible students."
      breadcrumbs={[{ label: 'Admissions', to: '/admissions' }, { label: 'Scholarships' }]}
    >
      {/* Quick Stats */}
      <section className="page-section">
        <div className="container">
          <div className="stats-strip">
            <div className="stat-block">
              <span className="stat-value">3<span className="accent">+</span></span>
              <span className="stat-label">Govt. Scholarship Schemes</span>
            </div>
            <div className="stat-block">
              <span className="stat-value"><span className="accent">100%</span></span>
              <span className="stat-label">ePass Coverage (Eligible)</span>
            </div>
            <div className="stat-block">
              <span className="stat-value">4</span>
              <span className="stat-label">KMIT Special Awards</span>
            </div>
            <div className="stat-block">
              <span className="stat-value"><span className="accent">NSP</span></span>
              <span className="stat-label">Central Portal Access</span>
            </div>
          </div>
        </div>
      </section>

      {/* Government Scholarships */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-landmark"></i> Government Schemes</div>
            <h2>Government <em>Scholarships</em></h2>
            <div className="section-divider"></div>
            <p>These are fully government-managed scholarships. KMIT facilitates the application process and verifies documents for all eligible students.</p>
          </div>
          <div className="dept-cards-grid">
            {govtScholarships.map((s, i) => (
              <div key={i} className="dept-card">
                <div className="dept-card-header">
                  <div className="dept-badge"><i className={`fa-solid ${s.icon}`}></i> {s.category}</div>
                  <h3>{s.name}</h3>
                </div>
                <div className="dept-card-body">
                  <div style={{fontSize:'0.72rem', fontWeight:800, color:'var(--vibrant-accent)', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'0.5rem'}}>{s.body}</div>
                  <p style={{fontSize:'0.85rem', marginBottom:'1rem'}}>{s.desc}</p>
                  <div style={{background:'var(--off-white)', borderRadius:'10px', padding:'1rem', marginBottom:'1rem'}}>
                    <div style={{fontSize:'0.72rem', fontWeight:800, color: 'var(--brand-orange-text)', textTransform:'uppercase', marginBottom:'0.6rem'}}>How to Apply:</div>
                    {s.steps.map((step, j) => (
                      <div key={j} style={{display:'flex', gap:'8px', alignItems:'flex-start', fontSize:'0.8rem', color:'var(--text-muted)', marginBottom:'0.3rem'}}>
                        <span style={{width:'18px', height:'18px', background:'var(--navy)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:'0.62rem', fontWeight:800, flexShrink:0}}>{j+1}</span>
                        {step}
                      </div>
                    ))}
                  </div>
                  <div className="dept-meta">
                    <div className="dept-meta-item"><i className="fa-solid fa-indian-rupee-sign"></i> Coverage: <strong>{s.coverage}</strong></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KMIT Scholarships */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-award"></i> Institutional Awards</div>
            <h2>KMIT <em>Special Awards</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="info-cards-grid">
            {kmitScholarships.map((s, i) => (
              <div key={i} className="info-card">
                <div className="info-card-icon"><i className={`fa-solid ${s.icon}`}></i></div>
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
                <div style={{marginTop:'auto', padding:'0.6rem 1rem', background:'rgba(165,28,48,0.06)', borderRadius:'8px', border:'1px solid rgba(165,28,48,0.15)'}}>
                  <span style={{fontSize:'0.72rem', color: 'var(--brand-orange-text)', fontWeight:700}}>
                    <i className="fa-solid fa-check-circle"></i> Criteria: {s.criteria}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="page-section-alt">
        <div className="container" style={{maxWidth:'900px'}}>
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-list-ol"></i> General Process</div>
            <h2>How to <em>Apply</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="process-steps">
            {[
              { title: 'Check Eligibility', desc: 'Verify your caste/income category, EAPCET rank, and family income against the scheme criteria.' },
              { title: 'Gather Documents', desc: 'Income certificate, caste certificate, Aadhaar, bank passbook, and academic marksheets.' },
              { title: 'Register Online', desc: 'Apply on tsepass.cgg.gov.in or scholarships.gov.in (NSP) before the published deadline.' },
              { title: 'KMIT Verification', desc: 'Visit the KMIT accounts office with original documents for institutional verification and signatures.' },
              { title: 'Disbursement', desc: 'Scholarship amounts are credited directly to your linked bank account after government processing.' },
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

      <section className="page-section">
        <div className="container">
          <div className="cta-banner">
            <div>
              <h3>Need Help with Your Scholarship?</h3>
              <p>Contact the KMIT accounts office or admissions cell for scholarship verification, documentation, and guidance.</p>
            </div>
            <button className="btn-white" onClick={() => navigate('/contact')}>
              <i className="fa-solid fa-phone"></i> Contact Us
            </button>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
