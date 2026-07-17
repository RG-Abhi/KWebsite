import PageShell from './PageShell'

export default function ValueAddedPage() {
  const programs = [
    {
      icon: 'fa-computer', title: 'TESSELLATOR LMS', tag: 'Digital Learning',
      desc: 'KMIT\'s custom-built Learning Management System, developed on the Moodle platform and co-sponsored by Google. TESSELLATOR enables digital assignment submission, online assessments, activity tracking, course management, and real-time learning analytics.',
      features: ['Digital assignments & submissions', 'Online quizzes & assessments', 'Activity & attendance tracking', 'Resource library & course content', 'Faculty–student interaction portal', 'Grade tracking & result analytics']
    },
    {
      icon: 'fa-certificate', title: 'BEC — Business English', tag: 'Cambridge Certification',
      desc: 'KMIT offers coaching for the Cambridge Business English Certificate (BEC) to all B.Tech students. This globally recognised certification equips students with professional communication skills required in MNCs and international workplaces.',
      features: ['Cambridge-certified coaching', 'Business writing & email skills', 'Professional presentation skills', 'BEC Preliminary / Vantage levels', 'Mock tests with official material', 'Certificate on successful completion']
    },
    {
      icon: 'fa-layer-group', title: 'SWAYAM NPTEL', tag: '#1 Institute in India',
      desc: 'KMIT is ranked Number One across India in the SWAYAM NPTEL Best Institute category for two consecutive years. Students are encouraged to enroll in NPTEL courses and earn verified certificates in core and elective subjects.',
      features: ['NPTEL course enrollment support', 'Faculty coordination for NPTEL', 'Ranked #1 nationally (2 years)', 'Recognised certificates from IITs/IISc', 'Swayam credits toward CGPA', 'Online & proctored exam centre']
    },
    {
      icon: 'fa-rocket', title: 'UDAAN R&D / UTTKARSH', tag: 'Research Programs',
      desc: 'UDAAN is KMIT\'s dedicated R&D center supporting faculty-led and student research in emerging tech. UTTKARSH is a structured learning advancement program providing additional academic coaching for students to improve understanding and grades.',
      features: ['Faculty-guided research projects', 'Student R&D stipend support', 'UTTKARSH remedial coaching', 'International journal publications', 'Patent filing support', 'Industry-collaborated research']
    },
  ]

  return (
    <PageShell
      eyebrow="Academic Programmes"
      title="Value Added"
      titleEm="Programs"
      description="KMIT's unique value-added programs go beyond the regular syllabus — building global competitive skills, digital learning, research aptitude, and professional excellence in every student."
      breadcrumbs={[{ label: 'Academics', to: '/academics' }, { label: 'Value Added Programs' }]}
    >
      {programs.map((prog, idx) => (
        <section key={idx} className={idx % 2 === 0 ? 'page-section' : 'page-section-alt'}>
          <div className="container">
            <div style={{display:'grid', gridTemplateColumns: idx % 2 === 0 ? '1fr 1fr' : '1fr 1fr', gap:'4rem', alignItems:'center', direction: idx % 2 !== 0 ? 'rtl' : 'ltr'}}>
              <div style={{direction:'ltr'}}>
                <div className="section-header">
                  <div className="section-eyebrow"><i className={`fa-solid ${prog.icon}`}></i> {prog.tag}</div>
                  <h2>{prog.title.split(' ').slice(0,1).join(' ')} <em>{prog.title.split(' ').slice(1).join(' ')}</em></h2>
                  <div className="section-divider"></div>
                </div>
                <p style={{color:'var(--text-muted)', lineHeight:'1.8', marginBottom:'1.5rem'}}>{prog.desc}</p>
              </div>
              <div style={{direction:'ltr'}}>
                <div className="faq-list">
                  {prog.features.map((f, i) => (
                    <div key={i} className="info-card" style={{flexDirection:'row', padding:'1rem 1.5rem', gap:'1rem', alignItems:'center'}}>
                      <i className="fa-solid fa-check-circle" style={{color: 'var(--brand-orange-text)', fontSize:'1.1rem', flexShrink:0}}></i>
                      <p style={{margin:0, fontSize:'0.9rem', fontWeight:500}}>{f}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </PageShell>
  )
}
