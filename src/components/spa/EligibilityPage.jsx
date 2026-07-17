import PageShell from './PageShell'
import { useNavigate } from 'react-router-dom'

export default function EligibilityPage() {
  const navigate = useNavigate()

  return (
    <PageShell
      eyebrow="Eligibility"
      title="Admission"
      titleEm="Eligibility"
      description="Check if you meet the requirements to apply for B.Tech programmes at KMIT through EAPCET or ECET (Lateral Entry)."
      breadcrumbs={[{ label: 'Admissions', to: '/admissions' }, { label: 'Eligibility' }]}
    >
      {/* Regular Entry */}
      <section className="page-section">
        <div className="container">
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3rem'}}>
            <div>
              <div className="section-header">
                <div className="section-eyebrow"><i className="fa-solid fa-door-open"></i> Regular Entry</div>
                <h2>EAPCET <em>Eligibility</em></h2>
                <div className="section-divider"></div>
              </div>
              <div className="faq-list">
                {[
                  { q: 'Academic Qualification', a: 'Must have passed Intermediate (10+2) or equivalent with Mathematics, Physics, and Chemistry/Computer Science as core subjects.' },
                  { q: 'Minimum Marks', a: 'General category: 45% aggregate in PCM/PCS. SC/ST/OBC: 40% aggregate as per government norms.' },
                  { q: 'Entrance Exam', a: 'Must have a valid EAPCET (Telangana State) rank. Candidates from other states must obtain inter-state counselling eligibility.' },
                  { q: 'Age Limit', a: 'Minimum 17 years as on 31st December of the year of admission. No upper age limit.' },
                  { q: 'Number of Attempts', a: 'No restriction on the number of attempts for EAPCET. Best rank across valid attempts will be considered.' },
                ].map((item, i) => (
                  <div key={i} className="info-card" style={{padding:'1.2rem 1.5rem', gap:'0.6rem'}}>
                    <h3 style={{fontSize:'0.9rem', color: 'var(--brand-orange-text)'}}>{item.q}</h3>
                    <p style={{margin:0, fontSize:'0.88rem'}}>{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="section-header">
                <div className="section-eyebrow"><i className="fa-solid fa-arrow-right-to-bracket"></i> Lateral Entry</div>
                <h2>ECET <em>Eligibility</em></h2>
                <div className="section-divider"></div>
              </div>
              <div className="faq-list">
                {[
                  { q: 'Qualification', a: 'Must hold a Diploma in Engineering from a recognised polytechnic OR B.Sc. degree with Mathematics as one of the subjects.' },
                  { q: 'Minimum Marks', a: 'Must have passed the qualifying exam with at least 45% aggregate marks (40% for SC/ST).' },
                  { q: 'ECET Rank', a: 'Must have appeared and obtained a rank in the TS ECET. Lateral entry is directly into the 2nd year (III Semester) of B.Tech.' },
                  { q: 'Branches Available', a: 'Lateral entry into CSE, IT, CSM, and CSD branches subject to seat availability as per TSCHE norms.' },
                ].map((item, i) => (
                  <div key={i} className="info-card" style={{padding:'1.2rem 1.5rem', gap:'0.6rem'}}>
                    <h3 style={{fontSize:'0.9rem', color:'var(--navy)'}}>{item.q}</h3>
                    <p style={{margin:0, fontSize:'0.88rem'}}>{item.a}</p>
                  </div>
                ))}
              </div>
              <div className="highlight-quote" style={{marginTop:'2rem', padding:'2rem'}}>
                <p style={{fontSize:'1rem'}}>"KMIT's EAPCET code is <strong style={{color:'var(--vibrant-accent)'}}>KMIT</strong>. Keep this ready during web counselling."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-folder"></i> Documents</div>
            <h2>Required <em>Documents</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="info-cards-grid">
            {[
              { icon: 'fa-id-card', title: 'Identity Proof', desc: 'Aadhaar Card, PAN Card, or Passport as valid photo identification.' },
              { icon: 'fa-graduation-cap', title: 'Academic Certificates', desc: 'SSC (Class X), Intermediate (Class XII) marksheets and certificates.' },
              { icon: 'fa-star', title: 'EAPCET/ECET Rank Card', desc: 'Original rank card issued by TSCHE for the current admission year.' },
              { icon: 'fa-users', title: 'Category Certificate', desc: 'Caste certificate (if applicable) for SC/ST/OBC reservation benefits.' },
              { icon: 'fa-home', title: 'Residence Certificate', desc: 'Local area certificate or domicile proof as applicable under Telangana norms.' },
              { icon: 'fa-image', title: 'Photographs', desc: 'Recent passport-size photographs (white background) — minimum 6 copies.' },
            ].map((d, i) => (
              <div key={i} className="info-card">
                <div className="info-card-icon"><i className={`fa-solid ${d.icon}`}></i></div>
                <h3>{d.title}</h3>
                <p>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="cta-banner">
            <div>
              <h3>Ready to Apply? Take the Next Step.</h3>
              <p>Check out the complete admission process or view the fee structure to plan your admission.</p>
            </div>
            <div style={{display:'flex', gap:'1rem', flexWrap:'wrap', flexShrink:0}}>
              <button className="btn-white" onClick={() => navigate('/admissions')}>
                <i className="fa-solid fa-list-ol"></i> Admission Process
              </button>
              <button className="btn-primary" onClick={() => navigate('/admissions/fees')}>
                <i className="fa-solid fa-indian-rupee-sign"></i> Fee Structure
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
