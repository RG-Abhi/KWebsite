import PageShell from './PageShell'
import ScrollReveal from '../ScrollReveal'
export default function FinishingSchoolPage() {
  const modules = [
    { icon: 'fa-brain', title: 'Aptitude & Reasoning', desc: 'Quantitative aptitude, logical reasoning, verbal ability — using latest company-specific test patterns and mock papers.', weeks: 'Weeks 1–4' },
    { icon: 'fa-code', title: 'Technical Fundamentals', desc: 'Data Structures, Algorithms, DBMS, OS, OOP concepts — quick revision and deep practice for technical interview rounds.', weeks: 'Weeks 5–8' },
    { icon: 'fa-laptop-code', title: 'Coding Proficiency', desc: 'HackerRank, LeetCode, and competitive coding practice focusing on interview-grade problem solving and clean code writing.', weeks: 'Weeks 9–12' },
    { icon: 'fa-comments', title: 'Communication Skills', desc: 'Group Discussion practice, presentation skills, email etiquette, and professional communication — linked to BEC Cambridge training.', weeks: 'Weeks 13–16' },
    { icon: 'fa-user-tie', title: 'Mock Interviews', desc: '3 rounds of mock interviews (1 technical + 1 HR + 1 managerial) simulated with real industry professionals and detailed feedback.', weeks: 'Weeks 17–18' },
    { icon: 'fa-file-contract', title: 'Resume & Professional Build', desc: 'Resume writing, LinkedIn profile optimisation, career branding, and portfolio development workshops.', weeks: 'Weeks 19–20' },
  ]

  const outcomes = [
    { icon: 'fa-trophy', title: '90%+ Placement Rate', desc: 'Students who complete the full Finishing School program have a significantly higher placement rate.' },
    { icon: 'fa-certificate', title: 'Industry Certification', desc: 'Participation certificate issued by KMIT T&P Cell and Genesis Solutions upon completion.' },
    { icon: 'fa-handshake', title: 'Direct Industry Access', desc: 'Finishing School alumni get priority access to KMIT\'s industry partner network for interview calls.' },
    { icon: 'fa-star', title: 'Confidence & Readiness', desc: 'Students emerge with real interview confidence — technically sharp and professionally articulate.' },
  ]

  return (
    <PageShell
      eyebrow="Career Readiness"
      title="KMIT"
      titleEm="Finishing School"
      description="A comprehensive, structured career-readiness program designed exclusively for KMIT final-year students — combining technical preparation, soft skills training, and intensive interview practice over 20 weeks."
      breadcrumbs={[{ label: 'Student Life', to: '/student-life' }, { label: 'Finishing School' }]}
    >
      {/* Stats */}
      <section className="page-section">
        <div className="container">
          <div className="stats-strip">
            <div className="stat-block">
              <span className="stat-value">20</span>
              <span className="stat-label">Week Program</span>
            </div>
            <div className="stat-block">
              <span className="stat-value">100<span className="accent">+</span></span>
              <span className="stat-label">Training Hours</span>
            </div>
            <div className="stat-block">
              <span className="stat-value">3</span>
              <span className="stat-label">Mock Interview Rounds</span>
            </div>
            <div className="stat-block">
              <span className="stat-value">90<span className="accent">%+</span></span>
              <span className="stat-label">Participant Placement Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-list-check"></i> Curriculum</div>
            <h2>Program <em>Modules</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="timeline">
            {modules.map((m, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 100} className="timeline-item">
                <div className="timeline-marker"><i className={`fa-solid ${m.icon}`}></i></div>
                <div className="timeline-content">
                  <div className="timeline-year">{m.weeks}</div>
                  <h4>{m.title}</h4>
                  <p>{m.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="page-section">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-star"></i> Outcomes</div>
            <h2>What You <em>Gain</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="info-cards-grid">
            {outcomes.map((o, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 100} style={{ height: '100%' }}>
                <div className="info-card" style={{ height: '100%' }}>
                <div className="info-card-icon"><i className={`fa-solid ${o.icon}`}></i></div>
                <h3>{o.title}</h3>
                <p>{o.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="page-section-alt">
        <div className="container" style={{maxWidth:'900px'}}>
          <div className="highlight-quote">
            <p>"KMIT instituted a comprehensive Finishing School program for its Final year students — designed to bridge the gap between academic learning and industry expectations, ensuring no student leaves KMIT unprepared."</p>
            <cite>— KMIT Finishing School Initiative</cite>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
