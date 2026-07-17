import PageShell from './PageShell'

const ELIGIBILITY = [
  'Admissions to the B.Tech Program are made along with the other Engineering colleges in the state through a common entrance test (EAPCET) conducted by the Govt. of Telangana State.',
  'The admission pattern to B. Tech is as follows: The minimum qualification for admission to first year of the B. Tech course is a pass in the Intermediate (10 + 2) conducted by the board of Intermediate education, Govt. of Telangana State or any other examination recognized as equivalent thereto with Mathematics, Physics and Chemistry as optional subjects.',
]

const ADMISSION_ITEMS = [
  '70 % of the seats are allotted based on the merit in the EAPCET.',
  '30 % of the seats are earmarked for Management/NRI candidates.',
  'In addition to the above, Diploma holders are admitted in second year of B. Tech to the extent of 20% of intake based on the merit in the ECET, under lateral entry scheme.',
]

const FEE_ROWS = [
  ['Tuition Fee', '₹ 1,29,200', '₹ 1,29,200', '₹ 1,29,200', '₹ 1,29,200'],
  ['Special Fee', '₹ 5,500', '₹ 2,500', '₹ 2,500', '₹ 2,500'],
  ['NBA Fee', '₹ 3,000', '₹ 3,000', '₹ 3,000', '₹ 3,000'],
]

export default function AdmissionProcedurePage() {
  return (
    <PageShell
      eyebrow="Admissions"
      title="Admission"
      titleEm="Procedure"
      description="Admissions to B.Tech programmes are conducted through EAPCET and management quota as per TSCHE guidelines."
      breadcrumbs={[{ label: 'Admissions', to: '/admissions/coursesoffered' }, { label: 'Admission Procedure' }]}
    >
      <section className="page-section">
        <div className="container">
          <h2 className="admission-block-title">B.Tech Programs</h2>

          <h3 className="admission-block-title">The Eligibility Criteria for Admission to B.Tech Program</h3>
          {ELIGIBILITY.map((p, i) => (
            <p key={i} className="section-text">{p}</p>
          ))}

          <h3 className="admission-block-title" style={{ marginTop: '2rem' }}>Admission</h3>
          <ul className="admission-bullets">
            {ADMISSION_ITEMS.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">Fee Structure</div>
            <h2>Fee Structure — Year of Admission 2025-26</h2>
            <div className="section-divider" />
          </div>
          <div className="table-responsive-desktop">
            <table className="data-table">
              <thead>
                <tr>
                  <th>B.Tech (four year duration)</th>
                  <th>(2025-26) I Year</th>
                  <th>(2026-27) II Year</th>
                  <th>(2027-28) III Year</th>
                  <th>(2028-29) IV Year</th>
                </tr>
              </thead>
              <tbody>
                {FEE_ROWS.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="section-text" style={{ marginTop: '1.5rem' }}>
            For more information, please contact the Admissions Department at{' '}
            <a href="tel:6302180205">6302180205</a>
          </p>
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <img
              src="https://kmit.in/admissions/kmit2025.jpg"
              alt="Cat-B 2025-26 Admissions"
              loading="lazy"
              decoding="async"
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </div>
        </div>
      </section>
    </PageShell>
  )
}
