import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import PageShell from './PageShell'

const DEPT_FILTERS = ['All', 'CSE', 'IT', 'CSM', 'CSD', 'H&S']

export default function HODPage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const hods = [
    { name: 'Dr. Vemula Aruna', dept: 'CSE', role: 'HOD, CSE', image: 'https://www.kmit.in/assets/Dr%20Aruna.jpeg' },
    { name: 'Ms. T. Rupa Devi', dept: 'CSE', role: 'Incharge-HOD, CSE', image: 'https://www.kmit.in/assets/MS.T%20RUPA%20DEVI.jpeg' },
    { name: 'Ms. Priyanka Saxena', dept: 'CSE', role: 'Incharge-HOD, CSE', image: 'https://www.kmit.in/administration/assets/Ms%20Priyanka%20Saxena.jpeg' },
    { name: 'Mr. Para Upendar', dept: 'CSE', role: 'Incharge-HOD, CSE', image: 'https://www.kmit.in/assets/MR.P.UPENDER.jpeg' },
    { name: 'Dr. G. Narender', dept: 'IT', role: 'HOD, IT', image: 'https://www.kmit.in/assets/DR.G.NARENDER.jpeg' },
    { name: 'Dr. T.V.G. Sridevi', dept: 'CSE (AI & ML)', role: 'HOD, CSE (AI & ML)', image: 'https://www.kmit.in/assets/DR.%20T%20V%20G%20SRIDEVI.jpeg' },
    { name: 'Mr. K. Anil', dept: 'CSE (Data Science)', role: 'HOD, CSE (Data Science)', image: 'https://www.kmit.in/assets/MR.K.ANIL.jpeg' },
    { name: 'Ms. Saritha Gone', dept: 'H & S', role: 'HOD, H & S', image: 'https://www.kmit.in/assets/MS.%20SARITHA%20GONE.jpeg' },
    { name: 'Dr. Balakrishna Ushakoyala', dept: 'H & S', role: 'HOD, H & S', image: 'https://www.kmit.in/assets/MR.%20BALAKRSIHNA%20USHAKOYALA.jpeg' }
  ]

  const getDeptColor = (dept) => {
    if (dept.includes('(AI & ML)')) return '#534AB7'
    if (dept.includes('(Data Science)')) return '#0F6E56'
    if (dept.includes('CSE')) return '#185FA5'
    if (dept.includes('IT')) return '#3B6D11'
    return '#854F0B'
  }

  const deptKeyMap = {
    'CSE': 'cse',
    'IT': 'it',
    'CSM': 'csm',
    'CSD': 'csd',
    'H&S': 'hs',
  }

  const filtered = useMemo(() => {
    return hods.filter(h => {
      const matchFilter = filter === 'All' ||
        (filter === 'CSE' && h.dept === 'CSE') ||
        (filter === 'IT' && h.dept === 'IT') ||
        (filter === 'CSM' && h.dept.includes('AI')) ||
        (filter === 'CSD' && h.dept.includes('Data')) ||
        (filter === 'H&S' && h.dept.includes('H & S'))
      const q = search.trim().toLowerCase()
      const matchSearch = !q || h.name.toLowerCase().includes(q) || h.role.toLowerCase().includes(q)
      return matchFilter && matchSearch
    })
  }, [hods, filter, search])

  return (
    <PageShell
      eyebrow="Administration"
      title="Heads of"
      titleEm="Departments"
      description="The academic departments at KMIT are led by experienced faculty members committed to student success, research, and technical excellence."
      breadcrumbs={[{ label: 'Administration' }, { label: 'HODs' }]}
    >
      <section className="page-section">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-users-viewfinder"></i> Academic Leaders</div>
            <h2>Meet Our <em>HODs</em></h2>
            <div className="section-divider"></div>
          </div>

          <div className="hod-toolbar" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
            <div className="year-tabs">
              {DEPT_FILTERS.map(f => (
                <button key={f} type="button" className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>
            <input
              type="search"
              placeholder="Search by name or role…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ padding: '0.6rem 1rem', borderRadius: 999, border: '1px solid var(--border-subtle)', minWidth: 220 }}
              aria-label="Search HODs"
            />
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '2rem',
            marginTop: '2.5rem' 
          }}>
            {filtered.map((h, i) => (
              <div 
                key={i} 
                className="leader-card" 
                style={{ 
                  textAlign: 'left', 
                  padding: '1.8rem', 
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '2rem',
                  borderRadius: '16px',
                  background: '#fff',
                  border: '1px solid var(--light-grey)',
                  borderLeft: '5px solid ' + getDeptColor(h.dept),
                  boxShadow: 'var(--shadow-card)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <div style={{ 
                  height: '140px', 
                  width: '140px', 
                  borderRadius: '50%',
                  overflow: 'hidden',
                  flexShrink: 0,
                  border: '4px solid ' + getDeptColor(h.dept),
                  padding: '4px',
                  background: '#fff'
                }}>
                    <img 
                      src={h.image} 
                      alt={h.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', transition: 'transform 0.5s' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      onError={e => { e.target.onerror = null; e.target.src = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(h.name)}&backgroundColor=0f172a,185FA5&textColor=ffffff` }}
                    />
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ 
                      fontSize: '0.7rem', 
                      color: getDeptColor(h.dept), 
                      fontWeight: '800', 
                      textTransform: 'uppercase', 
                      letterSpacing: '1px', 
                      marginBottom: '0.4rem',
                      background: `${getDeptColor(h.dept)}15`,
                      padding: '4px 10px',
                      borderRadius: '20px',
                      display: 'inline-block',
                      width: 'max-content'
                    }}>
                      {h.dept.replace('CSE ', '')}
                    </div>
                    <h4 style={{ fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '0.3rem', fontWeight: '800', letterSpacing: '-0.5px' }}>{h.name}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '1.2rem' }}>{h.role}</p>
                    
                    <div style={{ 
                      marginTop: 'auto', 
                      display: 'flex', 
                      gap: '0.8rem', 
                      paddingTop: '1rem', 
                      borderTop: '1px solid var(--light-grey)' 
                    }}>
                       <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1rem', cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color='var(--vibrant-accent)'} onMouseLeave={e => e.currentTarget.style.color='var(--text-muted)'}><i className="fa-solid fa-envelope"></i></button>
                       <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1rem', cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color='#0077b5'} onMouseLeave={e => e.currentTarget.style.color='var(--text-muted)'}><i className="fa-brands fa-linkedin"></i></button>
                       <button 
                        type="button"
                        onClick={() => {
                          const key = h.dept.includes('AI') ? 'csm' : h.dept.includes('Data') ? 'csd' : h.dept.includes('H & S') ? 'hs' : h.dept === 'IT' ? 'it' : 'cse'
                          navigate(`/academics/${key}`)
                        }}
                        style={{ 
                          marginLeft: 'auto', 
                          background: 'none', 
                          border: 'none', 
                          color: 'var(--navy)', 
                          fontSize: '0.75rem', 
                          fontWeight: '800', 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '6px',
                          cursor: 'pointer',
                          padding: '0',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                       >
                         View Department <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.65rem' }}></i>
                       </button>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section-alt">
        <div className="container">
          <div className="cta-banner" style={{ background: 'linear-gradient(135deg, var(--navy) 0%, #1a4080 100%)', borderRadius: '20px', padding: '3rem', color: '#fff', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '1rem' }}>Our Distinguished Faculty</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto 2rem' }}>Explore the full directory of professors, associate professors, and researchers across all academic departments at KMIT.</p>
            <button className="btn-white" style={{ border: 'none', padding: '0.8rem 2rem', borderRadius: '10px', fontWeight: '800', cursor: 'pointer' }}>
                Full Faculty Directory
            </button>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
