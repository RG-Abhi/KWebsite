import PageShell from './PageShell'

export default function CalendarPage() {
  const semesters = [
    { label: 'Odd Semester (I, III, V, VII)', start: 'July / August', end: 'November / December', duration: '~22 weeks', internals: 'Sep & Oct', externals: 'Nov–Dec' },
    { label: 'Even Semester (II, IV, VI, VIII)', start: 'January / February', end: 'May / June', duration: '~22 weeks', internals: 'Mar & Apr', externals: 'May–Jun' },
  ]

  const keyDates = [
    { event: 'Academic Year Begins (Odd Sem)', date: 'July – August' },
    { event: 'Internal Assessment – I (IA-I)', date: 'September' },
    { event: 'Mid-Semester Examinations', date: 'October' },
    { event: 'Internal Assessment – II (IA-II)', date: 'October – November' },
    { event: 'Semester End Examinations (Odd)', date: 'November – December' },
    { event: 'Even Semester Commences', date: 'January – February' },
    { event: 'Internal Assessment – I (IA-I)', date: 'March' },
    { event: 'Internal Assessment – II (IA-II)', date: 'April' },
    { event: 'Semester End Examinations (Even)', date: 'May – June' },
    { event: 'Summer Project / Internship', date: 'June – July' },
    { event: 'Supplementary Examinations', date: 'July – August' },
    { event: 'Result Declaration', date: 'Within 30 days of SEE' },
  ]

  return (
    <PageShell
      eyebrow="Academic Calendar"
      title="Academic"
      titleEm="Calendar"
      description="The KMIT academic year follows the JNTU Hyderabad academic schedule for affiliated autonomous institutions. Below is the general semester structure and key dates."
      breadcrumbs={[{ label: 'Academics', to: '/academics' }, { label: 'Academic Calendar' }]}
    >
      {/* Semester Structure */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-calendar"></i> Semester Pattern</div>
            <h2>Semester <em>Structure</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="dept-cards-grid">
            {semesters.map((s, i) => (
              <div key={i} className="dept-card">
                <div className="dept-card-header">
                  <div className="dept-badge">Semester {i + 1}</div>
                  <h3>{s.label}</h3>
                </div>
                <div className="dept-card-body">
                  <div className="dept-meta" style={{flexDirection:'column', gap:'0.8rem'}}>
                    <div className="dept-meta-item"><i className="fa-solid fa-hourglass-start"></i> Starts: <strong>{s.start}</strong></div>
                    <div className="dept-meta-item"><i className="fa-solid fa-hourglass-end"></i> Ends: <strong>{s.end}</strong></div>
                    <div className="dept-meta-item"><i className="fa-solid fa-clock"></i> Duration: <strong>{s.duration}</strong></div>
                    <div className="dept-meta-item"><i className="fa-solid fa-edit"></i> Internals: <strong>{s.internals}</strong></div>
                    <div className="dept-meta-item"><i className="fa-solid fa-file-alt"></i> Externals: <strong>{s.externals}</strong></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Dates Table */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-calendar-check"></i> Key Events</div>
            <h2>Important <em>Academic Dates</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Academic Event</th>
                  <th>Approximate Period</th>
                </tr>
              </thead>
              <tbody>
                {keyDates.map((d, i) => (
                  <tr key={i}>
                    <td style={{color:'var(--text-muted)', fontWeight:700}}>{i+1}</td>
                    <td><strong>{d.event}</strong></td>
                    <td><span className="tag tag-blue">{d.date}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="info-card" style={{marginTop:'1.5rem', flexDirection:'row', gap:'1rem', alignItems:'flex-start', background:'rgba(255,107,0,0.04)', borderColor:'rgba(255,107,0,0.2)'}}>
            <i className="fa-solid fa-circle-info" style={{color:'var(--vibrant-accent)', fontSize:'1.3rem', flexShrink:0, marginTop:'2px'}}></i>
            <p style={{margin:0, fontSize:'0.88rem'}}>
              <strong>Note:</strong> The exact academic calendar is published at the start of each academic year and shared via the TESSELLATOR LMS and notice boards. Dates are subject to revision by the university/institution. For the official current-year calendar, please contact the Academic Office or visit the college website.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
