import PageShell from './PageShell'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../context/websiteData'

export default function PlacementArchivePage({ year }) {
  const navigate = useNavigate()
  const { data: globalData } = useData()
  const data = globalData.archives[year] || globalData.archives['2025']

  return (
    <PageShell
      eyebrow={`Placement Archive`}
      title={`Placements`}
      titleEm={data.year}
      description={`Complete placement data for the ${data.year} academic year — company-wise results, highest packages, and key statistics.`}
      breadcrumbs={[{ label: 'Placements', to: '/placements' }, { label: data.year }]}
    >
      {/* Stats */}
      <section className="page-section">
        <div className="container">
          <div className="stats-strip">
            <div className="stat-block">
              <span className="stat-value"><span className="accent">{data.highest}</span></span>
              <span className="stat-label">Highest Package</span>
            </div>
            <div className="stat-block">
              <span className="stat-value">{data.avg}</span>
              <span className="stat-label">Average Package</span>
            </div>
            <div className="stat-block">
              <span className="stat-value">{data.companies}<span className="accent">+</span></span>
              <span className="stat-label">Companies Visited</span>
            </div>
            <div className="stat-block">
              <span className="stat-value"><span className="accent">{data.placed}</span></span>
              <span className="stat-label">Placement Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Placement Drives */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-newspaper"></i> Recruitment Drives</div>
            <h2>Notable <em>Placements</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Company</th>
                  <th>Students Selected</th>
                  <th>Package</th>
                </tr>
              </thead>
              <tbody>
                {data.drives.map((d, i) => (
                  <tr key={i}>
                    <td style={{color:'var(--text-muted)', fontWeight:700}}>{i+1}</td>
                    <td><strong>{d.company}</strong></td>
                    <td>{d.students}</td>
                    <td><span className="tag tag-orange">{d.pkg}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Other Years */}
      <section className="page-section">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-folder-open"></i> Other Years</div>
            <h2>More <em>Archives</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="archive-grid">
            {Object.keys(globalData.archives).map((yr, i) => {
              const a = globalData.archives[yr]
              return (
                <div key={i} className="archive-card" onClick={() => navigate(`/placements/${yr}`)} style={{cursor:'pointer', opacity: year === yr ? 0.5 : 1}}>
                  <span className="archive-year">{a.year}</span>
                  <span className="archive-subtitle">{year === yr ? 'Viewing Now' : 'View Archive'}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
