import PageShell from './PageShell'

export default function EvaluationPage() {
  return (
    <PageShell
      eyebrow="Academic Policy"
      title="Teaching &"
      titleEm="Evaluation"
      description="KMIT follows a well-defined Teaching-Learning-Evaluation (TLE) framework that ensures consistent, fair, and transparent assessment of student learning outcomes."
      breadcrumbs={[{ label: 'Academics', to: '/academics' }, { label: 'Teaching & Evaluation' }]}
    >
      {/* Assessment Weightage */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-scale-balanced"></i> Assessment Split</div>
            <h2>Marks <em>Distribution</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="stats-strip">
            <div className="stat-block">
              <span className="stat-value">30<span className="accent">%</span></span>
              <span className="stat-label">Internal Assessment (IA)</span>
            </div>
            <div className="stat-block">
              <span className="stat-value">70<span className="accent">%</span></span>
              <span className="stat-label">Semester End Exam (SEE)</span>
            </div>
            <div className="stat-block">
              <span className="stat-value">40<span className="accent">%</span></span>
              <span className="stat-label">Min to Pass (SEE)</span>
            </div>
            <div className="stat-block">
              <span className="stat-value">10<span className="accent">+</span></span>
              <span className="stat-label">Grade Points Scale</span>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Assessment */}
      <section className="page-section-alt">
        <div className="container">
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3rem'}}>
            <div>
              <div className="section-header">
                <div className="section-eyebrow"><i className="fa-solid fa-edit"></i> Continuous Assessment</div>
                <h2>Internal <em>Assessment (IA)</em></h2>
                <div className="section-divider"></div>
              </div>
              <div className="data-table-wrap">
                <table className="data-table">
                  <thead><tr><th>Component</th><th>Marks</th></tr></thead>
                  <tbody>
                    {[
                      { item: 'IA-I (Written Test)', marks: '10' },
                      { item: 'IA-II (Written Test)', marks: '10' },
                      { item: 'Assignments / Activities', marks: '5' },
                      { item: 'Attendance & Participation', marks: '5' },
                      { item: 'Total Internal Marks', marks: '30' },
                    ].map((r, i) => (
                      <tr key={i} style={i === 4 ? {fontWeight:800, background:'rgba(11,31,58,0.04)'} : {}}>
                        <td><strong>{r.item}</strong></td>
                        <td><span className="tag tag-blue">{r.marks}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <div className="section-header">
                <div className="section-eyebrow"><i className="fa-solid fa-file-alt"></i> End Semester Exam</div>
                <h2>Semester End <em>Exam (SEE)</em></h2>
                <div className="section-divider"></div>
              </div>
              <div className="faq-list">
                {[
                  { q: 'Total Marks', a: '70 marks per subject in the external semester end examination.' },
                  { q: 'Minimum to Pass', a: 'Students must score a minimum of 40% (28/70) in the SEE to pass the subject.' },
                  { q: 'Question Pattern', a: 'Generally divided into short answer, medium, and long answer question sections covering the full syllabus.' },
                  { q: 'Duration', a: '3 hours for most theory papers. Lab practicals are evaluated separately with internal and external examiners.' },
                  { q: 'Backlog Policy', a: 'Students who fail can appear for supplementary/backlog exams conducted after the regular SEE cycle.' },
                ].map((item, i) => (
                  <div key={i} className="info-card" style={{padding:'1rem 1.5rem', gap:'0.4rem'}}>
                    <h3 style={{fontSize:'0.88rem', color: 'var(--brand-orange-text)'}}>{item.q}</h3>
                    <p style={{margin:0, fontSize:'0.85rem'}}>{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grading System */}
      <section className="page-section">
        <div className="container" style={{maxWidth:'700px'}}>
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-star"></i> Grading</div>
            <h2>Grading <em>System</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="data-table-wrap">
            <table className="data-table">
              <thead><tr><th>Grade</th><th>Grade Points</th><th>Marks Range</th><th>Description</th></tr></thead>
              <tbody>
                {[
                  { grade: 'O', points: '10', range: '90–100', desc: 'Outstanding' },
                  { grade: 'A+', points: '9', range: '80–89', desc: 'Excellent' },
                  { grade: 'A', points: '8', range: '70–79', desc: 'Very Good' },
                  { grade: 'B+', points: '7', range: '60–69', desc: 'Good' },
                  { grade: 'B', points: '6', range: '50–59', desc: 'Above Average' },
                  { grade: 'C', points: '5', range: '40–49', desc: 'Average' },
                  { grade: 'F', points: '0', range: 'Below 40', desc: 'Fail' },
                ].map((r, i) => (
                  <tr key={i}>
                    <td><strong style={{color: r.grade === 'F' ? 'var(--crimson)' : 'var(--navy)'}}>{r.grade}</strong></td>
                    <td><span className="tag tag-blue">{r.points}</span></td>
                    <td>{r.range}</td>
                    <td style={{color:'var(--text-muted)'}}>{r.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
