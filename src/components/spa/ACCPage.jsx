import PageShell from './PageShell'
import ScrollReveal from '../ScrollReveal'

// ── Data — sourced 100% from kmit.in/administration/aac.php ──────────
const members = [
  { sno: 1,  name: 'Dr. B L Malleswari',    dept: 'Principal, KMIT',         role: 'Chairperson', photo: '/photos/principal/principal.jpg' },
  { sno: 2,  name: 'Dr. K. Bhargavi',        dept: 'CSE (AI & ML)',            role: 'Convenor',    photo: '' },
  { sno: 3,  name: 'Dr. S. Udaya Lakshmi',   dept: 'CoE',                     role: 'Member',      photo: '' },
  { sno: 4,  name: 'Mr. G. Rakesh Reddy',    dept: 'CSE',                     role: 'Member',      photo: '' },
  { sno: 5,  name: 'Mr. A L. Narsimha Rao',  dept: 'H & S',                   role: 'Member',      photo: '' },
  { sno: 6,  name: 'Ms. M. Saradamani',      dept: 'H & S',                   role: 'Member',      photo: '' },
  { sno: 7,  name: 'Dr. M. Anuradha',        dept: 'CSE',                     role: 'Member',      photo: '' },
  { sno: 8,  name: 'Dr. Vishal Reddy',       dept: 'CSE (Data Science)',       role: 'Member',      photo: '' },
]

const roleBadge = {
  Chairperson: { bg: 'rgba(165,28,48,0.1)',   color: 'var(--brand-orange-text)', icon: 'fa-crown'  },
  Convenor:    { bg: 'rgba(255,107,0,0.12)',  color: 'var(--vibrant-accent)', icon: 'fa-star' },
  Member:      { bg: 'rgba(10,22,40,0.06)',   color: 'var(--navy)',    icon: 'fa-user-tie' },
}

const objectives = [
  { icon: 'fa-clipboard-check', title: 'NBA Compliance',         desc: 'Ensures curriculum compliance with NBA attributes — POs, PSOs, PEOs, and COs through direct and indirect assessment.' },
  { icon: 'fa-chart-line',      title: 'Academic Performance',   desc: 'Monitors semester-wise academic performance of students and suggests remedial measures for improvement.' },
  { icon: 'fa-book-open',       title: 'Curriculum Review',      desc: 'Reviews and finalises lesson plans, lab manuals, and teaching materials for the upcoming semester.' },
  { icon: 'fa-magnifying-glass-chart', title: 'Result Analysis', desc: 'Conducts detailed analysis of examination results (internal & external) to maintain quality standards.' },
  { icon: 'fa-calendar-check',  title: 'Attendance Monitoring',  desc: 'Reviews attendance patterns and ensures strict compliance with JNTUH norms and institutional regulations.' },
  { icon: 'fa-server',          title: 'Resource Planning',      desc: 'Evaluates requirements for laboratory equipment, library resources, and software tools for academic delivery.' },
]

function Avatar({ name, photo }) {
  const initials = name.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('')
  return photo
    ? <img src={photo} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none' }} />
    : <span style={{ fontWeight: '800', fontSize: '1.1rem', color: 'var(--white)', letterSpacing: '1px' }}>{initials}</span>
}

export default function ACCPage() {
  return (
    <PageShell
      eyebrow="Administration & Committees"
      title="Academic Core"
      titleEm="Committee"
      description="The Academic Core Committee (ACC) 2023–24 oversees compliance of the university curriculum with NBA attributes through direct and indirect assessment of POs, PSOs, PEOs and COs."
      breadcrumbs={[{ label: 'Administration & Committees', to: '/administration/hod' }, { label: 'Academic Core Committee' }]}
    >
      {/* ── Intro Banner ─────────────────────────────────────── */}
      <section className="page-section">
        <div className="container">
          <ScrollReveal animation="fade-up">
            <div className="acc-intro-banner" style={{
              background: 'linear-gradient(135deg, #16535a 0%, #248980 100%)',
              borderRadius: '24px', padding: '3.5rem',
              display: 'grid', gridTemplateColumns: '1fr auto',
              gap: '3rem', alignItems: 'center',
              position: 'relative', overflow: 'hidden',
              boxShadow: 'var(--shadow-lift)'
            }}>
              <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '220px', height: '220px', background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }} />
              <div style={{ position: 'absolute', bottom: '-40px', left: '40%', width: '160px', height: '160px', background: 'rgba(255,107,0,0.06)', borderRadius: '50%' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.5)', marginBottom: '0.6rem', fontWeight: '800' }}>
                  Academic Session 2023–24
                </div>
                <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '1rem', fontWeight: '800' }}>
                  Academic Core Committee &nbsp;<span style={{ color: 'var(--vibrant-accent)' }}>(ACC)</span>
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', lineHeight: '1.8', maxWidth: '680px', margin: 0 }}>
                  The ACC is responsible for ensuring that the university curriculum is in compliance with NBA attributes, including Programme Outcomes (POs), Programme Specific Outcomes (PSOs), Programme Educational Objectives (PEOs), and Course Outcomes (COs) through both direct and indirect assessment methods.
                </p>
              </div>
              <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: '3.5rem', fontWeight: '900', color: 'var(--vibrant-accent)' }}>{members.length}</div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.5)', fontWeight: '700' }}>Committee Members</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Committee Members ────────────────────────────────── */}
      <section className="page-section-alt">
        <div className="container">
          <ScrollReveal animation="fade-up">
            <div className="section-header" style={{ textAlign: 'center', alignItems: 'center' }}>
              <div className="section-eyebrow"><i className="fa-solid fa-users" /> Composition</div>
              <h2>Committee <em>Members</em></h2>
              <div className="section-divider" />
            </div>
          </ScrollReveal>

          <div className="data-table-container shadow-premium" style={{ marginTop: '2.5rem' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '10%' }}>S.NO</th>
                  <th style={{ width: '40%' }}>NAME OF THE MEMBER</th>
                  <th style={{ width: '25%' }}>DEPARTMENT</th>
                  <th style={{ width: '25%' }}>DESIGNATION</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m, i) => (
                  <tr key={i}>
                    <td>{m.sno}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                          width: '36px', height: '36px', borderRadius: '50%',
                          background: `linear-gradient(135deg, var(--navy), #1a4080)`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          overflow: 'hidden', flexShrink: 0
                        }}>
                          <Avatar name={m.name} photo={m.photo} />
                        </div>
                        <span className="bold text-navy">{m.name}</span>
                      </div>
                    </td>
                    <td>{m.dept}</td>
                    <td>
                      <span className={`status-badge ${m.role === 'Chairperson' ? 'bg-navy' : m.role === 'Convenor' ? 'bg-crimson' : ''}`}>
                        {m.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Objectives ────────────────────────────────────────── */}
      <section className="page-section">
        <div className="container">
          <ScrollReveal animation="fade-up">
            <div className="section-header" style={{ textAlign: 'center', alignItems: 'center' }}>
              <div className="section-eyebrow"><i className="fa-solid fa-clipboard-list" /> Mandates</div>
              <h2>Key <em>Objectives</em></h2>
              <div className="section-divider" />
            </div>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            {objectives.map((o, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 100} style={{ height: '100%' }}>
                <div style={{
                  height: '100%',
                  background: 'var(--white)', borderRadius: '20px',
                  padding: '2rem', border: '1px solid var(--light-grey)',
                  boxShadow: 'var(--shadow-sm)', transition: 'all 0.3s',
                  display: 'flex', flexDirection: 'column', gap: '1rem'
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'var(--vibrant-accent)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--light-grey)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
                >
                  <div style={{ width: '52px', height: '52px', background: 'rgba(255,107,0,0.1)', borderRadius: '14px', display: 'grid', placeItems: 'center', color: 'var(--vibrant-accent)', fontSize: '1.2rem' }}>
                    <i className={`fa-solid ${o.icon}`} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '0.5rem' }}>{o.title}</h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.7', margin: 0 }}>{o.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Meeting frequency note */}
          <ScrollReveal animation="fade-up">
            <div style={{
              marginTop: '4rem', background: 'linear-gradient(135deg, var(--off-white), #fff)',
              borderRadius: '16px', padding: '2.5rem',
              border: '1px solid var(--light-grey)',
              display: 'flex', gap: '1.5rem', alignItems: 'flex-start',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(10,22,40,0.08)', borderRadius: '12px', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <i className="fa-solid fa-calendar-days" style={{ color: 'var(--navy)', fontSize: '1.1rem' }} />
              </div>
              <div>
                <h4 style={{ color: 'var(--navy)', fontSize: '1rem', fontWeight: '800', marginBottom: '0.4rem' }}>Meeting Frequency</h4>
                <p style={{ color: 'var(--text-dark)', fontSize: '0.92rem', lineHeight: '1.75', margin: 0 }}>
                  The Academic Core Committee convenes at least <strong>twice per semester</strong> — once before the commencement of the semester to finalise academic planning and resource preparation, and once mid-semester to review progress, analyse results, and recommend corrective actions.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageShell>
  )
}
