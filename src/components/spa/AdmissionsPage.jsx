import PageShell from './PageShell'
import { useNavigate } from 'react-router-dom'

export default function AdmissionsPage() {
  const navigate = useNavigate()

  const courses = [
    { code: 'CSE', name: 'Computer Science & Engineering', seats: 300, duration: '4 Years', nba: true },
    { code: 'CSM', name: 'CSE — AI & Machine Learning', seats: 120, duration: '4 Years', nba: false },
    { code: 'CSD', name: 'CSE — Data Science', seats: 60, duration: '4 Years', nba: false },
    { code: 'IT', name: 'Information Technology', seats: 60, duration: '4 Years', nba: true },
  ]

  const steps = [
    { title: 'Appear for EAPCET/ECET', desc: 'Write the Telangana State EAPCET (Engineering, Agriculture & Pharmacy Common Entrance Test) or ECET for lateral entry. Results are published by TSCHE.' },
    { title: 'Web Counselling', desc: 'Participate in TSCHE web counselling to select KMIT. Allotment is based on merit rank, caste category, and your preferred branch order.' },
    { title: 'Report to KMIT', desc: 'Visit KMIT for certificate verification with your original documents. A tentative list of documents is provided at the time of counselling.' },
    { title: 'Fee Payment', desc: 'Pay the required tuition fee as per government regulations. Scholarships available for eligible categories (SC/ST/BC/EWS).' },
    { title: 'Enrollment & Orientation', desc: 'Complete enrollment formalities, receive your student ID, and attend the mandatory orientation programme to get started at KMIT.' },
  ]

  return (
    <PageShell
      eyebrow="Admissions 2026"
      title="Join KMIT via"
      titleEm="EAPCET"
      description="Admissions to B.Tech programmes are through EAPCET / ECET ranks. KMIT follows a transparent, merit-based process with dedicated counselling support. Admissions are open for the 2026–27 academic year."
      breadcrumbs={[{ label: 'Admissions' }]}
      actions={
        <>
          <button className="btn-white" onClick={() => navigate('/admissions/admission-procedure')}>
            <i className="fa-solid fa-file-signature"></i> Admission Procedure
          </button>
          <button className="btn-primary" onClick={() => navigate('/contact')}>
            <i className="fa-solid fa-phone"></i> Ask Admissions
          </button>
        </>
      }
    >
      {/* Courses Offered */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-book-open"></i> Programmes</div>
            <h2>Courses <em>Offered</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Programme</th>
                  <th>Code</th>
                  <th>Duration</th>
                  <th>Seats</th>
                  <th>Affiliation</th>
                  <th>Accreditation</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c, i) => (
                  <tr key={i}>
                    <td><strong>{c.name}</strong></td>
                    <td><span className="tag tag-blue">{c.code}</span></td>
                    <td>{c.duration}</td>
                    <td><strong>{c.seats}</strong></td>
                    <td>JNTU Hyderabad</td>
                    <td>{c.nba ? <span className="tag tag-green">NBA ✓</span> : <span className="tag tag-orange">NAAC A+</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-list-ol"></i> Process</div>
            <h2>Admission <em>Process</em></h2>
            <div className="section-divider"></div>
            <p>5 simple steps from entrance exam to enrollment at KMIT.</p>
          </div>
          <div className="process-steps">
            {steps.map((s, i) => (
              <div key={i} className="process-step">
                <div className="step-number">{i + 1}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Cards */}
      <section className="page-section">
        <div className="container">
          <div className="info-cards-grid">
            <div className="info-card" style={{cursor:'pointer'}} onClick={() => navigate('/admissions/eligibility')}>
              <div className="info-card-icon"><i className="fa-solid fa-check-circle"></i></div>
              <h3>Eligibility Criteria</h3>
              <p>Check EAPCET / ECET rank requirements, minimum marks in 10+2, and category-wise details.</p>
              <p style={{color: 'var(--brand-orange-text)', fontWeight:700, fontSize:'0.85rem'}}>View Eligibility →</p>
            </div>
            <div className="info-card" style={{cursor:'pointer'}} onClick={() => navigate('/admissions/fees')}>
              <div className="info-card-icon"><i className="fa-solid fa-indian-rupee-sign"></i></div>
              <h3>Fee Structure</h3>
              <p>Year-wise tuition fees, scholarship information, and payment methods accepted by KMIT.</p>
              <p style={{color: 'var(--brand-orange-text)', fontWeight:700, fontSize:'0.85rem'}}>View Fees →</p>
            </div>
            <div className="info-card" style={{cursor:'pointer'}} onClick={() => navigate('/admissions/faq')}>
              <div className="info-card-icon"><i className="fa-solid fa-clipboard-question"></i></div>
              <h3>FAQs</h3>
              <p>Answers to the most common questions about KMIT admissions, hostel, deadlines, and more.</p>
              <p style={{color: 'var(--brand-orange-text)', fontWeight:700, fontSize:'0.85rem'}}>See FAQs →</p>
            </div>
            <div className="info-card">
              <div className="info-card-icon"><i className="fa-solid fa-award"></i></div>
              <h3>Scholarships</h3>
              <p>KMIT supports all government-sanctioned scholarships for SC/ST/BC/EWS eligible students.</p>
              <a href="https://kmit.in/academics/scholarships.php" target="_blank" rel="noreferrer" style={{color: 'var(--brand-orange-text)', fontWeight:700, fontSize:'0.85rem'}}>Learn More →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="page-section-dark">
        <div className="container" style={{textAlign:'center'}}>
          <div className="section-eyebrow" style={{margin:'0 auto 1.5rem', display:'inline-flex'}}>
            <i className="fa-solid fa-phone"></i> Admissions Contact
          </div>
          <h2 style={{fontFamily:'var(--font-serif)', color:'#fff', marginBottom:'1rem', fontSize:'2rem'}}>
            Have Questions? <em style={{color:'var(--vibrant-accent)', fontStyle:'normal'}}>We're Here.</em>
          </h2>
          <p style={{color:'rgba(255,255,255,0.7)', marginBottom:'2rem'}}>Contact our admissions cell for guidance on eligibility, documents, and the application process.</p>
          <div style={{display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap'}}>
            <a href="tel:04023261407" className="btn-white"><i className="fa-solid fa-phone"></i> 040-23261407</a>
            <a href="mailto:info@kmit.in" className="btn-primary"><i className="fa-solid fa-envelope"></i> info@kmit.in</a>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
