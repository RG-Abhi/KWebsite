import { useData } from '../context/websiteData'

const FALLBACK_BASE = 'https://api.dicebear.com/9.x/initials/svg?backgroundColor=0f172a,1e293b&textColor=ffffff&seed='

function LogoRow({ logos, names, className }) {
  const doubled = [...logos, ...logos]
  return (
    <div className="marquee-container" style={{ marginTop: '2.5rem' }}>
      <div className={`marquee-track ${className}`}>
        {doubled.map((slug, i) => {
          let companyName = names[slug] || slug;
          if (companyName === slug) {
            companyName = companyName.split('.')[0]; // e.g. google.com -> google
            companyName = companyName.charAt(0).toUpperCase() + companyName.slice(1);
          }
          return (
            <div key={i} className="recruiter-logo-card">
              <div className="logo-wrap">
                <img
                  src={`https://icon.horse/icon/${slug}`}
                  alt={companyName}
                  onError={e => {
                    e.target.onerror = null
                    e.target.src = `${FALLBACK_BASE}${encodeURIComponent(companyName)}`
                  }}
                />
              </div>
              <span className="logo-name">{companyName}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function RecruitersSection() {
  const { data } = useData()
  const { fwd = [], rev = [], names = {} } = data.recruiters || {}

  if (!fwd.length && !rev.length) return null

  return (
    <section className="recruiters-section">
      {/* Geometric Decos */}
      <div className="gm-deco gm-square" style={{ top: '8%', left: '3%', opacity: 0.06 }}></div>
      <div className="gm-deco gm-cross" style={{ top: '15%', right: '5%', opacity: 0.05, transform: 'rotate(15deg)' }}></div>
      
      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <p className="section-eyebrow">Industry Partners</p>
        <h2 className="section-title">{data.homeContent?.recruiters?.title || 'Our Top Recruiters'}</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>
          {data.homeContent?.recruiters?.text || 'KMIT students are consistently recruited by global technology leaders and Fortune 500 companies.'}
        </p>
      </div>
      <LogoRow logos={fwd} names={names} className="fwd" />
      <LogoRow logos={rev} names={names} className="rev" />
    </section>
  )
}
