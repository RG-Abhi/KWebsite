import PageShell from './PageShell'
import { useNavigate } from 'react-router-dom'

export default function ProjectSchoolPage() {
  const navigate = useNavigate()

  const domains = [
    { icon: 'fa-heart-pulse', code: 'BIO', title: 'Biomedical Informatics', desc: 'Cancer genomics, bioinformatics, biomedical imaging, and clinical data systems — solving real healthcare problems with software and AI.' },
    { icon: 'fa-wheat-awn', code: 'AGRI', title: 'Agri-Informatics', desc: 'Agri-genomics, crop yield prediction, smart irrigation systems, and agricultural data analytics using ML and IoT.' },
    { icon: 'fa-shield-halved', code: 'DEF', title: 'Defence Technology', desc: 'Defence-grade software solutions, CFD (Computational Fluid Dynamics) simulations, GPU/NVIDIA C++ programming, and simulation systems.' },
    { icon: 'fa-brands fa-google', code: 'GSOC', title: 'Google Summer of Code', desc: 'Guided preparation for GSoC — open source contributions, mentor pairing, proposal writing, and international project collaboration.' },
  ]

  const techStack = [
    { icon: 'fa-brands fa-js', title: 'JavaScript / Frameworks', desc: 'React, Angular, Vue.js for front-end development' },
    { icon: 'fa-brands fa-android', title: 'Android Development', desc: 'Kotlin and Java for mobile solutions' },
    { icon: 'fa-brands fa-python', title: 'Python & AI/ML', desc: 'For ML, Deep Learning, AI/Data Science' },
    { icon: 'fa-file-code', title: 'C++ & GPU', desc: 'High-performance computing and NVIDIA CUDA' },
    { icon: 'fa-database', title: 'Databases & MongoDB', desc: 'SQL, NoSQL, and distributed data systems' },
    { icon: 'fa-microchip', title: 'IoT & Embedded', desc: 'Arduino, Raspberry Pi, sensor systems' },
  ]

  return (
    <PageShell
      eyebrow="Real-World Projects"
      title="KMIT"
      titleEm="Project School"
      description="Project School provides 2nd-year KMIT students with the opportunity to work on real-time, industry-scale problems across Biomedical, Agriculture, Defence, and Open Source (GSoC) domains — with monthly stipends and publication credits."
      breadcrumbs={[{ label: 'Student Life', to: '/student-life' }, { label: 'Project School' }]}
    >
      {/* Stats */}
      <section className="page-section">
        <div className="container">
          <div className="stats-strip">
            <div className="stat-block">
              <span className="stat-value">4</span>
              <span className="stat-label">Project Domains</span>
            </div>
            <div className="stat-block">
              <span className="stat-value">2<span className="accent">nd</span></span>
              <span className="stat-label">Year Entry (B.Tech)</span>
            </div>
            <div className="stat-block">
              <span className="stat-value">9<span className="accent">–12</span></span>
              <span className="stat-label">Month Commitment</span>
            </div>
            <div className="stat-block">
              <span className="stat-value"><span className="accent">₹</span></span>
              <span className="stat-label">Monthly Stipend</span>
            </div>
          </div>
        </div>
      </section>

      {/* Domains */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-flask"></i> Project Domains</div>
            <h2>Four <em>Domains</em></h2>
            <div className="section-divider"></div>
            <p>Each domain solves global-scale, real-time problems—not simulations. Students build production-grade software systems.</p>
          </div>
          <div className="dept-cards-grid">
            {domains.map((d, i) => (
              <div key={i} className="dept-card">
                <div className="dept-card-header">
                  <div className="dept-badge">{d.code}</div>
                  <h3>{d.title}</h3>
                </div>
                <div className="dept-card-body">
                  <p>{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-microchip"></i> Technologies</div>
            <h2>Tech Stack <em>Covered</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="info-cards-grid">
            {techStack.map((t, i) => (
              <div key={i} className="info-card">
                <div className="info-card-icon"><i className={`${t.icon}`}></i></div>
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selection Process */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-file-signature"></i> How to Apply</div>
            <h2>Selection <em>Process</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="process-steps">
            {[
              { title: 'Submit EoI', desc: 'Expression of Interest submitted via the Google Form (link shared by department), typically in 2nd year.' },
              { title: 'GPA Check', desc: 'Consistent high GPAs across all subjects/semesters — academic performance is a key selection criterion.' },
              { title: 'Interview', desc: 'Technical aptitude interview with the Project School mentor team to assess coding passion and domain interest.' },
              { title: 'Domain Assignment', desc: 'Selected students are assigned to a project domain with a dedicated mentor and project team.' },
              { title: 'Project Work Begins', desc: '15 hrs/week commitment on campus. Monthly stipend. Work published and acknowledged in research papers.' },
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

      {/* Benefits */}
      <section className="page-section">
        <div className="container" style={{maxWidth:'900px'}}>
          <div className="highlight-quote">
            <p>"Selected students receive a fixed monthly stipend with periodic revision, publication authorship recognition, access to industry-grade software infrastructure, and 9–12 months of deep hands-on engineering experience — a launchpad for exceptional careers."</p>
            <cite>— KMIT Project School Initiative</cite>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
