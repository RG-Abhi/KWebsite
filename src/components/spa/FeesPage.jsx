import PageShell from './PageShell'
import { useNavigate } from 'react-router-dom'

export default function FeesPage() {
  const navigate = useNavigate()

  const feeRows = [
    { branch: 'CSE', year1: '₹1,30,000', year2: '₹1,30,000', year3: '₹1,30,000', year4: '₹1,30,000', note: 'NBA Accredited' },
    { branch: 'CSE (AI & ML)', year1: '₹1,30,000', year2: '₹1,30,000', year3: '₹1,30,000', year4: '₹1,30,000', note: '' },
    { branch: 'CSE (Data Science)', year1: '₹1,30,000', year2: '₹1,30,000', year3: '₹1,30,000', year4: '₹1,30,000', note: '' },
    { branch: 'IT', year1: '₹1,30,000', year2: '₹1,30,000', year3: '₹1,30,000', year4: '₹1,30,000', note: 'NBA Accredited' },
  ]

  const scholarships = [
    { icon: 'fa-star', title: 'TS ePass Scholarship', desc: 'Telangana State government scholarship covering full tuition for eligible SC/ST/EWS students. Apply at tsepass.cgg.gov.in.' },
    { icon: 'fa-award', title: 'Post Matric Scholarship (PMS)', desc: 'Central government scholarship for BC, SC, and ST students. Amount varies by category and income criteria.' },
    { icon: 'fa-medal', title: 'Merit Scholarship', desc: 'KMIT awards merit-based fee concessions to students who rank in the top 1% of their EAPCET category.' },
    { icon: 'fa-hand-holding-heart', title: 'Special Category', desc: 'Fee waivers and concessions for children of armed forces personnel, physically challenged students, and sports achievers.' },
  ]

  return (
    <PageShell
      eyebrow="Fee Structure"
      title="Tuition Fees &"
      titleEm="Scholarships"
      description="KMIT follows fees as regulated by the Telangana Fee Regulatory Committee (TFRC). Financial assistance is available for eligible students through government and institution scholarships."
      breadcrumbs={[{ label: 'Admissions', to: '/admissions' }, { label: 'Fee Structure' }]}
    >
      {/* Fee Table */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-indian-rupee-sign"></i> Annual Fees</div>
            <h2>Programme-wise <em>Fee Structure</em></h2>
            <div className="section-divider"></div>
            <p>Fees are defined as per the Telangana government-regulated structure and are subject to revision by the Admission & Fee Regulatory Committee (AFRC).</p>
          </div>
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Programme</th>
                  <th>Year I</th>
                  <th>Year II</th>
                  <th>Year III</th>
                  <th>Year IV</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {feeRows.map((r, i) => (
                  <tr key={i}>
                    <td><strong>{r.branch}</strong></td>
                    <td>{r.year1}</td>
                    <td>{r.year2}</td>
                    <td>{r.year3}</td>
                    <td>{r.year4}</td>
                    <td>{r.note ? <span className="tag tag-green">{r.note}</span> : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="info-card" style={{marginTop:'1.5rem', background:'rgba(255,107,0,0.05)', borderColor:'rgba(255,107,0,0.2)', flexDirection:'row', gap:'1rem', alignItems:'flex-start'}}>
            <i className="fa-solid fa-circle-info" style={{color:'var(--vibrant-accent)', fontSize:'1.3rem', flexShrink:0, marginTop:'3px'}}></i>
            <div>
              <p style={{margin:0, fontSize:'0.88rem', color:'var(--text-dark)'}}>
                <strong>Disclaimer:</strong> The fee structure listed above is indicative and based on government-regulated norms. Actual fees are finalized by the Telangana Fee Regulatory Committee (TFRC). For the most up-to-date fee structure, please contact the KMIT admissions office or visit <a href="https://kmit.in" target="_blank" rel="noreferrer" style={{color: 'var(--brand-orange-text)'}}>kmit.in</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Other Charges */}
      <section className="page-section-alt">
        <div className="container">
          <div className="fees-two-col-grid">
            <div>
              <div className="section-header">
                <div className="section-eyebrow"><i className="fa-solid fa-receipt"></i> Other Charges</div>
                <h2>Additional <em>Expenses</em></h2>
                <div className="section-divider"></div>
              </div>
              <div className="data-table-wrap">
                <table className="data-table">
                  <thead><tr><th>Item</th><th>Approximate Amount</th></tr></thead>
                  <tbody>
                    {[
                      { item: 'Examination Fee (per semester)', amt: '₹3,000 – ₹5,000' },
                      { item: 'Lab & Practical Fee', amt: '₹2,000 – ₹4,000 / year' },
                      { item: 'Student Activity Fund', amt: '₹2,000 / year' },
                      { item: 'Library Deposit (refundable)', amt: '₹1,000' },
                      { item: 'Identity Card & Diary', amt: '₹200' },
                      { item: 'Bus Pass (if applicable)', amt: 'As per TSRTC routes' },
                    ].map((r, i) => (
                      <tr key={i}>
                        <td>{r.item}</td>
                        <td><strong>{r.amt}</strong></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <div className="section-header">
                <div className="section-eyebrow"><i className="fa-solid fa-credit-card"></i> Payment Modes</div>
                <h2>How to <em>Pay</em></h2>
                <div className="section-divider"></div>
              </div>
              <div className="faq-list">
                {[
                  { icon: 'fa-building-columns', title: 'Bank DD / Challan', desc: 'Demand Draft in favour of KMIT. Collected at the college admissions office at the time of enrollment.' },
                  { icon: 'fa-mobile-screen', title: 'Online Payment Portal', desc: 'Fee payment through KMIT\'s official online portal post-admission, via net banking / UPI / debit card.' },
                  { icon: 'fa-university', title: 'Scholarship Adjustment', desc: 'For students with TS ePass or other scholarships, the sanctioned amount is directly adjusted against tuition.' },
                ].map((item, i) => (
                  <div key={i} className="info-card" style={{flexDirection:'row', padding:'1rem 1.5rem', gap:'1rem'}}>
                    <div className="info-card-icon" style={{width:'40px', height:'40px', fontSize:'1rem', flexShrink:0}}>
                      <i className={`fa-solid ${item.icon}`}></i>
                    </div>
                    <div>
                      <h3 style={{fontSize:'0.9rem', marginBottom:'0.3rem'}}>{item.title}</h3>
                      <p style={{margin:0, fontSize:'0.83rem'}}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scholarships */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-award"></i> Financial Aid</div>
            <h2>Scholarships & <em>Concessions</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="info-cards-grid">
            {scholarships.map((s, i) => (
              <div key={i} className="info-card">
                <div className="info-card-icon"><i className={`fa-solid ${s.icon}`}></i></div>
                <h3>{s.title}</h3>
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
              <h3>Have Questions About Fees?</h3>
              <p>Our admissions team will help clarify fee details and scholarship eligibility specific to your profile.</p>
            </div>
            <button className="btn-white" onClick={() => navigate('/contact')}>
              <i className="fa-solid fa-phone"></i> Contact Admissions
            </button>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
