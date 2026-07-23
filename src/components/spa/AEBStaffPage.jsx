import { useState, useMemo } from 'react'
import PageShell from './PageShell'

// ── Data — sourced 100% from kmit.in/examination/aebstaff.php ──────────
const staff = [
  { sno: 1,  name: 'Dr B L Malleswari',          designation: 'Principal',    role: 'Chief Controller of Examinations', photo: '/photos/principal/principal.jpg', phone: '9391614325' },
  { sno: 2,  name: 'Dr S Udaya Laxmi',           designation: 'Asst. Prof',   role: 'Controller of Examinations',       photo: '', phone: '9391614325' },
  { sno: 3,  name: 'Dr S J S Antony',            designation: 'Asst. Prof',   role: 'Addl. Controller of Examinations',  photo: '', phone: '9391614325' },
  { sno: 4,  name: 'Mrs. B Swapna',              designation: 'Asst. Prof',   role: 'Addl. Controller of Examinations',  photo: '', phone: '9391614325' },
  { sno: 5,  name: 'Mr. Sateesh Ravuri',         designation: 'Asst. Prof',   role: 'Addl. Controller of Examinations',  photo: '', phone: '9391614325' },
  { sno: 6,  name: 'Mr A N Sai Chakravarthy',    designation: 'Asst. Prof',   role: 'Examination Branch Member',        photo: '', phone: '9391614325' },
  { sno: 7,  name: 'Mrs. G Naga Sree Suma',      designation: 'Asst. Prof',   role: 'Examination Branch Member',        photo: '', phone: '9391614325' },
  { sno: 8,  name: 'Mr. Shailesh Bhosekar',      designation: 'Asst. Prof',   role: 'Examination Branch Member',        photo: '', phone: '9391614325' },
  { sno: 9,  name: 'Mr N Lalitha Manohar',       designation: 'Non Teaching', role: 'Asst. Admin',                      photo: '', phone: '9391614325' },
  { sno: 10, name: 'Mr C Naveen Kumar',          designation: 'Non Teaching', role: 'Asst. Admin',                      photo: '', phone: '9391614325' },
  { sno: 11, name: 'Mrs. S Sunitha',             designation: 'Non Teaching', role: 'Asst. Admin',                      photo: '', phone: '9391614325' },
  { sno: 12, name: 'Mrs. L Spoorthi Reddy',      designation: 'Non Teaching', role: 'Asst. Admin',                      photo: '', phone: '9391614325' },
  { sno: 13, name: 'Mrs. A Ravali',              designation: 'Non Teaching', role: 'Asst. Admin',                      photo: '', phone: '9391614325' },
]

const roleBadge = {
  'Chief Controller of Examinations': { bg: 'rgba(165,28,48,0.1)',   color: 'var(--brand-orange-text)', icon: 'fa-crown' },
  'Controller of Examinations':       { bg: 'rgba(255,107,0,0.12)',  color: 'var(--vibrant-accent)', icon: 'fa-star' },
  'Addl. Controller of Examinations':  { bg: 'rgba(14, 116, 144, 0.1)', color: '#0e7490', icon: 'fa-user-shield' },
  'Examination Branch Member':        { bg: 'rgba(10,22,40,0.06)',   color: 'var(--navy)',    icon: 'fa-user-tie' },
  'Asst. Admin':                      { bg: 'rgba(74, 85, 104, 0.08)', color: '#4a5568', icon: 'fa-user-gear' }
}

function Avatar({ name, photo }) {
  const initials = name.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('')
  return photo
    ? <img src={photo} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none' }} />
    : <span style={{ fontWeight: '800', fontSize: '1.1rem', color: 'var(--white)', letterSpacing: '1px' }}>{initials}</span>
}

export default function AEBStaffPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredStaff = useMemo(() => {
    if (!searchQuery) return staff
    const q = searchQuery.toLowerCase().trim()
    const words = q.split(/\s+/).filter(Boolean)
    return staff.filter(m => {
      const name = m.name.toLowerCase()
      const designation = m.designation.toLowerCase()
      const role = m.role.toLowerCase()
      return words.every(word => name.includes(word) || designation.includes(word) || role.includes(word))
    })
  }, [searchQuery])

  return (
    <PageShell
      eyebrow="Examinations"
      title="AEB Staff"
      titleEm="Directory"
      description="Faculty and staff details for KMIT's Autonomous Examination Branch (AEB)."
      breadcrumbs={[{ label: 'Examinations', to: '/exams/notifications' }, { label: 'AEB Staff' }]}
    >
      {/* ── Intro Banner ─────────────────────────────────────── */}
      <section className="page-section">
        <div className="container">
          <div className="acc-intro-banner" style={{
            background: 'linear-gradient(135deg, var(--navy) 0%, #1a4080 100%)',
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
                Academic Examination Branch
              </div>
              <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '1rem', fontWeight: '800' }}>
                Autonomous Examination Branch &nbsp;<span style={{ color: 'var(--vibrant-accent)' }}>(AEB)</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', lineHeight: '1.8', maxWidth: '680px', margin: 0 }}>
                Autonomous Examination Branch (AEB) manages semester registrations, mid-term/end-term examinations scheduling, evaluation policies, and score reporting.
              </p>
            </div>
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: '900', color: 'var(--vibrant-accent)' }}>{staff.length}</div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.5)', fontWeight: '700' }}>Faculty & Staff</div>
            </div>
          </div>

          {/* Timings Box */}
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem 2rem',
            background: 'rgba(239, 68, 68, 0.04)',
            borderRadius: '16px',
            border: '1px dashed rgba(239, 68, 68, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <i className="fa-solid fa-clock" style={{ color: 'var(--brand-orange-text)', fontSize: '1.3rem' }}></i>
            <div>
              <span style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Official Timings: </span>
              <span style={{ fontWeight: '700', color: '#4b5563', fontSize: '0.92rem' }}>TIMINGS FROM 09:30AM TO 04:00PM (ONLY ON WORKING DAYS)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Staff List Table ────────────────────────────────── */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', alignItems: 'center' }}>
            <div className="section-eyebrow"><i className="fa-solid fa-address-book" /> Directory</div>
            <h2>Faculty &amp; Staff <em>Details</em></h2>
            <div className="section-divider" />
          </div>

          {/* Search Controls */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2.5rem',
            marginTop: '1.5rem'
          }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '600px' }}>
              <i className="fa-solid fa-magnifying-glass" style={{
                position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)',
                color: '#9ca3af'
              }}></i>
              <input
                type="text"
                placeholder="Search staff members by name, designation, or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                style={{
                  width: '100%',
                  padding: '0.95rem 1rem 0.95rem 3.25rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '14px',
                  outline: 'none',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s',
                  background: '#ffffff',
                  boxShadow: 'var(--shadow-sm)'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)',
                    border: 'none', background: 'transparent', cursor: 'pointer', color: '#9ca3af'
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>
          </div>

          <div className="data-table-container shadow-premium" style={{ marginTop: '2.5rem' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '10%' }}>S.NO</th>
                  <th style={{ width: '30%' }}>NAME OF THE FACULTY</th>
                  <th style={{ width: '20%' }}>DESIGNATION</th>
                  <th style={{ width: '25%' }}>ROLE</th>
                  <th style={{ width: '15%' }}>MOBILE NUMBER</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((m, i) => {
                    const badge = roleBadge[m.role] || { bg: 'rgba(10,22,40,0.06)', color: 'var(--navy)', icon: 'fa-user-tie' }
                    return (
                      <tr key={i}>
                        <td>{String(m.sno).padStart(2, '0')}</td>
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
                        <td>{m.designation}</td>
                        <td>
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                            background: badge.bg, color: badge.color,
                            padding: '5px 14px', borderRadius: '20px',
                            fontSize: '0.72rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px'
                          }}>
                            <i className={`fa-solid ${badge.icon}`} style={{ fontSize: '0.6rem' }} />
                            {m.role}
                          </span>
                        </td>
                        <td className="bold text-navy">
                          <i className="fa-solid fa-phone" style={{ marginRight: '6px', fontSize: '0.8rem', color: 'var(--vibrant-accent)' }} />
                          {m.phone}
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan="5" style={{ padding: '3.5rem', textAlign: 'center', color: '#9ca3af', fontWeight: '700' }}>
                      No staff members found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
