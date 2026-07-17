import PageShell from './PageShell'

export default function AchievementsPage() {
  const achievements2025 = [
    { icon: 'fa-brands fa-google', title: 'GSoC 2025 — 4 Students', category: 'Google Programme', tag: 'tag-green', desc: 'Nischal, Srinivas, Akash, and Sai Varshith selected for Google Summer of Code 2025 — one of the world\'s most prestigious open-source research and development programmes.' },
    { icon: 'fa-trophy', title: 'SIH 2025 Grand Finale Winners', category: 'National Hackathon', tag: 'tag-orange', desc: 'Team ASHTOJ from KMIT won the Smart India Hackathon 2025 Grand Finale, solving a Defence Ministry problem statement and defeating hundreds of teams from across India.' },
    { icon: 'fa-cricket-bat-ball', title: 'BCCI Women\'s Cricket', category: 'National Sports', tag: 'tag-blue', desc: 'Ms. G. Hasini (3rd Year, CSE AI & ML) was selected for the BCCI Senior Women\'s One Day Cricket Team — representing KMIT on the national sports stage.' },
    { icon: 'fa-brands fa-microsoft', title: 'Microsoft 54 LPA', category: 'Placement Record', tag: 'tag-orange', desc: 'A KMIT student from the 2025 batch was offered 54 LPA by Microsoft India — the highest domestic salary package in KMIT\'s placement history.' },
    { icon: 'fa-globe', title: 'Amazon Dublin — ₹1.2 Crore', category: 'International Placement', tag: 'tag-green', desc: 'Ms. SreeLaya was offered an international position at Amazon, Dublin (Ireland) with a total compensation of ₹1.2 Crore — the highest international offer from KMIT.' },
    { icon: 'fa-layer-group', title: 'SWAYAM NPTEL #1 in India', category: 'Continuous Achievement', tag: 'tag-blue', desc: 'KMIT has been ranked Number One across India in the SWAYAM NPTEL Best Institute category for two consecutive years (2023 and 2024) — an unmatched achievement among engineering colleges.' },
  ]

  const achievements2024 = [
    { icon: 'fa-code', title: 'GSoC 2024 – Multiple Students', category: 'Google Programme', tag: 'tag-green', desc: 'KMIT students were selected for Google Summer of Code 2024, continuing the tradition of excellence in international open-source research programs.' },
    { icon: 'fa-medal', title: 'ServiceNow 42.3 LPA', category: 'Placement', tag: 'tag-orange', desc: '7 students placed at ServiceNow with a package of 42.3 LPA each — one of the highest batch-wise placements at KMIT.' },
    { icon: 'fa-robot', title: 'AI Innovation Challenge Winners', category: 'Technical', tag: 'tag-blue', desc: 'KMIT students won the Telangana AI Innovation Challenge organised by T-Hub, competing against 200+ teams statewide.' },
    { icon: 'fa-star', title: 'Salesforce 39.5 LPA', category: 'Placement', tag: 'tag-orange', desc: '8 students were selected by Salesforce with a package of 39.5 LPA — among the strongest batched offers in the 2025 placement season.' },
  ]

  return (
    <PageShell
      eyebrow="Student Excellence"
      title="Achievements &"
      titleEm="Recognitions"
      description="KMIT students consistently excel at the national and international level — in coding, research, placements, sports, and innovation. Here are some of our proudest moments."
      breadcrumbs={[{ label: 'Student Life', to: '/student-life' }, { label: 'Achievements' }]}
    >
      {/* Stats */}
      <section className="page-section">
        <div className="container">
          <div className="stats-strip">
            <div className="stat-block">
              <span className="stat-value">4</span>
              <span className="stat-label">GSoC Selections (2025)</span>
            </div>
            <div className="stat-block">
              <span className="stat-value"><span className="accent">₹1.2</span>Cr</span>
              <span className="stat-label">International Offer</span>
            </div>
            <div className="stat-block">
              <span className="stat-value"><span className="accent">SIH</span></span>
              <span className="stat-label">National Grand Finale Win</span>
            </div>
            <div className="stat-block">
              <span className="stat-value">#<span className="accent">1</span></span>
              <span className="stat-label">NPTEL India (2 Years)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2025 Achievements */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-trophy"></i> 2024–25</div>
            <h2>Highlights of <em>2024–25</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="info-cards-grid">
            {achievements2025.map((a, i) => (
              <div key={i} className="info-card">
                <div className="info-card-icon" style={{background: a.tag === 'tag-green' ? 'linear-gradient(135deg, #15803d, #16a34a)' : a.tag === 'tag-orange' ? 'linear-gradient(135deg, var(--crimson), #7a0f1f)' : 'linear-gradient(135deg, #1d4ed8, #2563eb)'}}>
                  <i className={`${a.icon}`}></i>
                </div>
                <div>
                  <div style={{fontSize:'0.7rem', fontWeight:800, color:'var(--vibrant-accent)', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'0.3rem'}}>{a.category}</div>
                  <h3>{a.title}</h3>
                  <p>{a.desc}</p>
                  <span className={`tag ${a.tag}`} style={{marginTop:'0.5rem'}}>{a.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2024 Achievements */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-folder-open"></i> 2023–24</div>
            <h2>Highlights of <em>2023–24</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="info-cards-grid">
            {achievements2024.map((a, i) => (
              <div key={i} className="info-card">
                <div className="info-card-icon">
                  <i className={`${a.icon}`}></i>
                </div>
                <div>
                  <div style={{fontSize:'0.7rem', fontWeight:800, color:'var(--vibrant-accent)', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'0.3rem'}}>{a.category}</div>
                  <h3>{a.title}</h3>
                  <p>{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="page-section-alt">
        <div className="container" style={{maxWidth:'900px'}}>
          <div className="highlight-quote">
            <p>"These achievements are not accidents. They are the result of a culture where students are pushed beyond limits, guided by passionate mentors, and given every resource to succeed — at KMIT."</p>
            <cite>— KMIT Institute Culture</cite>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
