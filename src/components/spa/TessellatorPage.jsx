import PageShell from './PageShell'

export default function TessellatorPage() {
  const highlights = [
    { icon: 'fa-cubes', title: 'Customized Moodle Foundation', desc: 'A custom deployment of the open-source Moodle LMS, adapted and tailored specifically to KMIT\'s academic workflow.' },
    { icon: 'fa-list-check', title: 'Two-Module Evaluation', desc: 'Integrated post-class assessment featuring an immediate conceptual quiz followed by structured hands-on coding tests.' },
    { icon: 'fa-route', title: 'Adaptive Learning Tracks', desc: 'Enables tailored pacing where slow learners focus on solidifying core logic while fast learners advance to higher tier programs.' },
    { icon: 'fa-terminal', title: 'Integrated Code Compilation', desc: 'Extended standard LMS capabilities by building custom compiler pipelines supporting live execution in Java, C, and other programming languages.' }
  ]

  return (
    <PageShell
      eyebrow="Uniqueness"
      title="KMIT"
      titleEm="Tessellator"
      description="Tessellator is KMIT’s specialized Learning Management System, extending standard LMS frameworks with real-time compilation pipelines."
      breadcrumbs={[{ label: 'Uniqueness', to: '/campus/library' }, { label: 'Tessellator' }]}
    >
      <section className="page-section">
        <div className="container">
          <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center' }}>
            
            {/* Left: Original Tessellator Image */}
            <div className="fade-in-up">
              <div style={{
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
                border: '1px solid var(--light-grey, #e5e7eb)',
                background: 'var(--white, #ffffff)',
                padding: '8px'
              }}>
                <img 
                  src="/assets/tessellator.jpg" 
                  alt="KMIT Tessellator Learning Management System" 
                  style={{ width: '100%', height: 'auto', borderRadius: '12px', display: 'block' }}
                />
              </div>
            </div>

            {/* Right: Original KMIT Context Text */}
            <div className="content-text-block fade-in-up">
              <div className="section-header" style={{ marginBottom: '1.5rem' }}>
                <div className="section-eyebrow"><i className="fa-solid fa-graduation-cap"></i> KMIT LMS Platform</div>
                <h2>The <em>Tessellator</em> System</h2>
                <div className="section-divider"></div>
              </div>
              
              <div style={{ fontSize: '1.1rem', lineHeight: '1.9', color: 'var(--text-dark, #374151)', textAlign: 'justify' }}>
                <p style={{ marginBottom: '1.5rem' }}>
                  Tessellator is KMIT’s learning management system. It is customized version of <strong>Moodle</strong>, an open source learning management system provided by Google. We at KMIT have customized it as per our needs and have been using it on multiple networks.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  It provides an option of 2 different modules. After each programming class, students are required to take a quiz which is a collection of multiple choice questions. Once they submit the quiz, they are presented with a form where they have guidelines to write code( program Eg: JAVA, C) pertaining to the class held.
                </p>
                <p>
                  There are usually three programs given to the students as a part of the test. If the student is a slow learner, he/ she might be able to work on a single program. The fast learners may go to the 3rd program. Google’s platform Moodle by itself doesn’t have the code compilation technique but we at KMIT have extended its capabilities to suffice our needs and have added code compilation techniques for JAVA, C and few other programming languages.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Feature / Highlight Cards built purely from the original text */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-star"></i> Core Architecture</div>
            <h2>Key <em>Features</em></h2>
            <div className="section-divider"></div>
          </div>

          <div className="info-cards-grid fade-in-up" style={{ marginTop: '2.5rem' }}>
            {highlights.map((h, i) => (
              <div key={i} className="info-card">
                <div className="info-card-icon">
                  <i className={`fa-solid ${h.icon}`}></i>
                </div>
                <h3>{h.title}</h3>
                <p>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
