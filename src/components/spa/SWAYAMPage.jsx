import PageShell from './PageShell'
import { useNavigate } from 'react-router-dom'

export default function SWAYAMPage() {
  const navigate = useNavigate()

  const stats = [
    { val: '#1', label: 'India NPTEL Rank (2 Years)', accent: true },
    { val: '500+', label: 'Enrollments Per Year', accent: false },
    { val: '50+', label: 'NPTEL Courses Available', accent: false },
    { val: 'Elite+Gold', label: 'Topper Category', accent: true },
  ]

  const courses = [
    { dept: 'Computer Science', courses: ['Data Structures & Algorithms', 'Operating Systems', 'Database Management Systems', 'Software Engineering', 'Computer Networks', 'Machine Learning'] },
    { dept: 'AI & Data Science', courses: ['Introduction to Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Data Science for Engineers', 'AI Fundamentals', 'Python for Data Science'] },
    { dept: 'Mathematics & Sciences', courses: ['Discrete Mathematics', 'Engineering Mathematics', 'Probability & Statistics', 'Linear Algebra', 'Numerical Methods'] },
    { dept: 'Management & Soft Skills', courses: ['Business Communication', 'Project Management', 'Entrepreneurship', 'English for Career Development', 'Leadership Skills'] },
  ]

  return (
    <PageShell
      eyebrow="Online Learning"
      title="SWAYAM"
      titleEm="NPTEL #1 India"
      description="KMIT has been ranked Number One across India in the SWAYAM NPTEL Best Institute category for two consecutive years — the highest honour in online learning for any engineering college."
      breadcrumbs={[{ label: 'Academics', to: '/academics' }, { label: 'SWAYAM NPTEL' }]}
    >
      {/* Stats */}
      <section className="page-section">
        <div className="container">
          <div className="stats-strip">
            {stats.map((s, i) => (
              <div key={i} className="stat-block">
                <span className="stat-value">{s.accent ? <span className="accent">{s.val}</span> : s.val}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is SWAYAM NPTEL */}
      <section className="page-section-alt">
        <div className="container">
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center'}}>
            <div>
              <div className="section-header">
                <div className="section-eyebrow"><i className="fa-solid fa-graduation-cap"></i> About the Platform</div>
                <h2>What is <em>SWAYAM NPTEL?</em></h2>
                <div className="section-divider"></div>
              </div>
              <p style={{color:'var(--text-muted)', lineHeight:'1.8', marginBottom:'1.5rem'}}>
                <strong>SWAYAM</strong> (Study Webs of Active Learning for Young Aspiring Minds) is India's national online education platform, jointly developed by the Ministry of Education and IITs/IISc. NPTEL (National Programme on Technology Enhanced Learning) offers free university-level courses taught by IIT and IISc professors.
              </p>
              <p style={{color:'var(--text-muted)', lineHeight:'1.8', marginBottom:'1.5rem'}}>
                Students can earn verified certificates by clearing the NPTEL proctored exam. KMIT is an approved NPTEL Local Chapter and exam centre — making participation convenient for all students.
              </p>
              <p style={{color:'var(--text-muted)', lineHeight:'1.8'}}>
                KMIT actively encourages enrollment and has topped India's NPTEL Best Institute rankings — reflecting our students' dedication to continuous, self-paced learning beyond the regular curriculum.
              </p>
            </div>
            <div className="highlight-quote">
              <p>"KMIT ranked <span style={{color:'var(--vibrant-accent)'}}>Number One across India</span> in the SWAYAM NPTEL Best Institute category — consecutively for two years. A distinction that reflects both student commitment and institutional support."</p>
              <cite>— KMIT NPTEL Chapter Award, 2023 & 2024</cite>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="page-section">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-list-ol"></i> Process</div>
            <h2>How to <em>Get Certified</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="process-steps">
            {[
              { title: 'Register on NPTEL', desc: 'Create an account at nptel.ac.in. Browse free courses across 200+ subjects taught by IIT and IISc faculty.' },
              { title: 'Enroll in a Course', desc: 'Select any NPTEL course relevant to your branch or interests. Courses are 4–12 weeks long with weekly video lectures.' },
              { title: 'Complete Assignments', desc: 'Complete weekly graded assignments on the NPTEL portal. These count for 25% of your final score.' },
              { title: 'Appear for Proctored Exam', desc: 'Register for the semester-end proctored exam (conducted at KMIT as a registered NPTEL exam centre). Exam counts for 75%.' },
              { title: 'Earn Certificate', desc: 'Score 40%+ overall to earn a verified certificate. Elite and Elite+Gold certificates given for top scores. Counts for CGPA credit.' },
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

      {/* Courses */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-book-open"></i> Popular Courses</div>
            <h2>Courses by <em>Domain</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="dept-cards-grid">
            {courses.map((cat, i) => (
              <div key={i} className="dept-card">
                <div className="dept-card-header">
                  <h3>{cat.dept}</h3>
                </div>
                <div className="dept-card-body">
                  {cat.courses.map((c, j) => (
                    <div key={j} style={{display:'flex', gap:'8px', alignItems:'center', fontSize:'0.85rem', color:'var(--text-muted)', padding:'0.4rem 0', borderBottom:'1px solid var(--light-grey)'}}>
                      <i className="fa-solid fa-circle" style={{fontSize:'0.4rem', color: 'var(--brand-orange-text)', flexShrink:0}}></i>
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section-dark">
        <div className="container" style={{textAlign:'center'}}>
          <div className="section-eyebrow" style={{margin:'0 auto 1.5rem', display:'inline-flex'}}>
            <i className="fa-solid fa-trophy"></i> India's #1 NPTEL Institute
          </div>
          <h2 style={{fontFamily:'var(--font-serif)', color:'#fff', marginBottom:'1rem', fontSize:'2rem'}}>
            Start Your <em style={{color:'var(--vibrant-accent)', fontStyle:'normal'}}>Free Course</em> Today
          </h2>
          <p style={{color:'rgba(255,255,255,0.7)', marginBottom:'2rem', maxWidth:'600px', margin:'0 auto 2rem'}}>
            NPTEL certificates are recognised by top companies and boost your academic profile. KMIT helps you register and provides exam centre access.
          </p>
          <a href="https://nptel.ac.in" target="_blank" rel="noreferrer" className="btn-white">
            <i className="fa-solid fa-graduation-cap"></i> Visit NPTEL Portal
          </a>
        </div>
      </section>
    </PageShell>
  )
}
