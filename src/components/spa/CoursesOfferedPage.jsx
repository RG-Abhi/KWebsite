import PageShell from './PageShell'

const INTRO = `KMIT, established in the year 2007, is one of the premier engineering colleges in the state of Telangana. KMIT is Accredited with 'A' Grade by National Assessment and Accreditation Council (NAAC) and also accredited by National Board of Accreditation (NBA). KMIT is approved by All India Council for Technical Education (AICTE), New Delhi and is affiliated to Jawaharlal Nehru Technological University Hyderabad (JNTUH), Hyderabad. It is recognized by the Govt of Telangana. KMIT is co-promoted and powered by Genesis Solutions PVT LTD.`

const TABLE_ROWS = [
  ['1', 'B.Tech', 'Computer Science & Engineering (CSE)', '540', '162', '378'],
  ['2', 'B.Tech**', 'Computer Science & Engineering (Artificial Intelligence & Machine Learning) (CSM)', '300', '90', '210'],
]

export default function CoursesOfferedPage() {
  return (
    <PageShell
      eyebrow="Admissions"
      title="Courses"
      titleEm=""
      description="KMIT offers B.Tech programmes approved by AICTE and affiliated to JNTUH Hyderabad."
      breadcrumbs={[{ label: 'Admissions', to: '/admissions/coursesoffered' }, { label: 'Courses Offered' }]}
    >
      <section className="page-section">
        <div className="container">
          <p className="section-text">{INTRO}</p>
        </div>
      </section>

      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">B.Tech Programmes</div>
            <h2>KMIT offers the following B.Tech Programs</h2>
            <div className="section-divider" />
          </div>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Name of the Degree</th>
                  <th>Course</th>
                  <th>Total Intake</th>
                  <th>Management Seats/NRI Seats</th>
                  <th>Convenor seats</th>
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} data-label={['S.No.', 'Name of the Degree', 'Course', 'Total Intake', 'Management Seats/NRI Seats', 'Convenor seats'][j]}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="section-text" style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            ** Obtained AICTE approval to start from 2020-21.
          </p>
        </div>
      </section>
    </PageShell>
  )
}
