import PageShell from './PageShell'

export default function SyllabusPage() {
  const regulations = [
    {
      code: 'KR-23', label: 'Current (2023–)', desc: 'Latest regulation for students admitted from 2023–24 onwards.',
      subjects: [
        { branch: 'CSE', url: '/academics/syllabus' },
        { branch: 'CSM (AI & ML)', url: '/academics/syllabus' },
        { branch: 'CSD (Data Science)', url: '/academics/syllabus' },
        { branch: 'IT', url: '/academics/syllabus' },
      ]
    },
    {
      code: 'KR-21', label: 'Previous (2021–23)', desc: 'Applicable to students admitted in 2021–22 and 2022–23 batches.',
      subjects: [
        { branch: 'CSE', url: '/academics/syllabus' },
        { branch: 'CSM (AI & ML)', url: '/academics/syllabus' },
        { branch: 'CSD (Data Science)', url: '/academics/syllabus' },
        { branch: 'IT', url: '/academics/syllabus' },
      ]
    },
    {
      code: 'KR-20', label: 'Archive (2020–21)', desc: 'Applicable to students admitted in the 2020–21 batch.',
      subjects: [
        { branch: 'CSE', url: '/academics/syllabus' },
        { branch: 'IT', url: '/academics/syllabus' },
      ]
    },
  ]

  return (
    <PageShell
      eyebrow="Academic Resources"
      title="Regulations &"
      titleEm="Syllabus"
      description="KMIT follows a structured regulatory framework for its B.Tech programmes. Syllabus documents for each regulation and branch are available below."
      breadcrumbs={[{ label: 'Academics', to: '/academics' }, { label: 'Regulations & Syllabus' }]}
    >
      {/* Regulation overview */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-book-open"></i> Regulations</div>
            <h2>Regulation-wise <em>Syllabus</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="dept-cards-grid">
            {regulations.map((reg, i) => (
              <div key={i} className="dept-card">
                <div className="dept-card-header">
                  <div className="dept-badge">{reg.code}</div>
                  <h3>{reg.label}</h3>
                </div>
                <div className="dept-card-body">
                  <p style={{marginBottom:'1.2rem'}}>{reg.desc}</p>
                  <div style={{display:'flex', flexDirection:'column', gap:'0.5rem'}}>
                    {reg.subjects.map((s, j) => (
                      <a key={j} href={s.url}
                        style={{display:'flex', alignItems:'center', gap:'8px', padding:'0.7rem 1rem', background:'var(--off-white)', borderRadius:'8px', fontSize:'0.85rem', fontWeight:600, color:'var(--navy)', transition:'all 0.3s'}}
                        onMouseEnter={e => { e.currentTarget.style.background='var(--navy)'; e.currentTarget.style.color='#fff'; }}
                        onMouseLeave={e => { e.currentTarget.style.background='var(--off-white)'; e.currentTarget.style.color='var(--navy)'; }}
                      >
                        <i className="fa-solid fa-file-pdf" style={{color: 'var(--brand-orange-text)'}}></i>
                        {s.branch} Syllabus (PDF)
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Semester Structure */}
      <section className="page-section-alt">
        <div className="container" style={{maxWidth:'900px'}}>
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-layer-group"></i> Programme Structure</div>
            <h2>B.Tech Semester <em>Overview</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Semester</th>
                  <th>Key Focus Areas</th>
                  <th>Credits</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { year: 'I', sem: 'I & II', focus: 'Mathematics, Physics, Chemistry, Programming Fundamentals, Engineering Drawing', credits: '~40' },
                  { year: 'II', sem: 'III & IV', focus: 'Data Structures, DBMS, OS, COA, OOP, Web Technologies', credits: '~44' },
                  { year: 'III', sem: 'V & VI', focus: 'Algorithms, Networks, ML/AI, Cloud, Mini Projects, Electives', credits: '~44' },
                  { year: 'IV', sem: 'VII & VIII', focus: 'Major Project, Internship, Advanced Electives, Industry Training', credits: '~32' },
                ].map((r, i) => (
                  <tr key={i}>
                    <td><strong>Year {r.year}</strong></td>
                    <td><span className="tag tag-blue">{r.sem}</span></td>
                    <td style={{fontSize:'0.85rem', color:'var(--text-muted)'}}>{r.focus}</td>
                    <td><strong>{r.credits}</strong></td>
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
