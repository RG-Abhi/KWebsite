import PageShell from './PageShell'
import { useNavigate } from 'react-router-dom'

export default function PlacementStatsPage() {
  const navigate = useNavigate()

  const yearData = [
    { year: '2024–25', highest: '54 LPA', international: '₹1.2 Cr', companies: '80+', placed: '90%+', highlight: 'Microsoft 54 LPA, ServiceNow 42.3 LPA, Salesforce 39.5 LPA' },
    { year: '2023–24', highest: '48 LPA', international: '—', companies: '75+', placed: '88%+', highlight: 'Amazon 48 LPA, Google, Cisco, Goldman Sachs' },
    { year: '2022–23', highest: '42 LPA', international: '—', companies: '70+', placed: '87%+', highlight: 'Microsoft, Adobe, Salesforce, Intuit top offers' },
    { year: '2021–22', highest: '38 LPA', international: '—', companies: '60+', placed: '85%+', highlight: 'Capgemini, Accenture, TCS, Infosys, Wipro' },
  ]

  const branchStats = [
    { branch: 'CSE', placed: '92%+', companies: 'Google, MS, Amazon, Goldman Sachs, Adobe', avgPkg: '~8 LPA' },
    { branch: 'CSM (AI & ML)', placed: '90%+', companies: 'ServiceNow, Salesforce, Darwinbox, Micron', avgPkg: '~9 LPA' },
    { branch: 'CSD (Data Science)', placed: '88%+', companies: 'Cisco, IBM, Oracle, Optum, Experian', avgPkg: '~8 LPA' },
    { branch: 'IT', placed: '90%+', companies: 'Wipro, Cognizant, TCS, Hexaware, ValueLabs', avgPkg: '~7.5 LPA' },
  ]

  return (
    <PageShell
      eyebrow="Placement Statistics"
      title="Year-wise"
      titleEm="Placement Data"
      description="A transparent view of KMIT's placement performance over the past four years — company-wise, branch-wise, and year-wise."
      breadcrumbs={[{ label: 'Placements', to: '/placements' }, { label: 'Statistics & Records' }]}
    >
      {/* Overall Stats Strip */}
      <section className="page-section">
        <div className="container">
          <div className="stats-strip">
            <div className="stat-block">
              <span className="stat-value"><span className="accent">54</span></span>
              <span className="stat-label">Highest LPA (2025)</span>
            </div>
            <div className="stat-block">
              <span className="stat-value">300<span className="accent">+</span></span>
              <span className="stat-label">Total Recruiters</span>
            </div>
            <div className="stat-block">
              <span className="stat-value">90<span className="accent">%+</span></span>
              <span className="stat-label">Average Placement Rate</span>
            </div>
            <div className="stat-block">
              <span className="stat-value">4<span className="accent">K+</span></span>
              <span className="stat-label">Graduates Placed (All-time)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Year-wise Table */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-chart-line"></i> Annual Records</div>
            <h2>Year-wise <em>Performance</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Academic Year</th>
                  <th>Highest Package</th>
                  <th>International</th>
                  <th>Companies</th>
                  <th>Placement Rate</th>
                  <th>Notable Offers</th>
                </tr>
              </thead>
              <tbody>
                {yearData.map((y, i) => (
                  <tr key={i}>
                    <td><strong>{y.year}</strong></td>
                    <td><span className="tag tag-orange">{y.highest}</span></td>
                    <td><span className="tag tag-green">{y.international}</span></td>
                    <td>{y.companies}</td>
                    <td><span className="tag tag-blue">{y.placed}</span></td>
                    <td style={{fontSize:'0.82rem', color:'var(--text-muted)'}}>{y.highlight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Branch-wise Breakdown */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-sitemap"></i> Branch-wise</div>
            <h2>Department <em>Breakdown</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="dept-cards-grid">
            {branchStats.map((b, i) => (
              <div key={i} className="dept-card">
                <div className="dept-card-header">
                  <div className="dept-badge">{b.branch}</div>
                  <h3>Placement Rate: {b.placed}</h3>
                </div>
                <div className="dept-card-body">
                  <p style={{fontSize:'0.85rem', marginBottom:'0.8rem'}}><strong>Key Recruiters:</strong> {b.companies}</p>
                  <div className="dept-meta" style={{gap:'1rem'}}>
                    <div className="dept-meta-item"><i className="fa-solid fa-indian-rupee-sign"></i> Avg: <strong>{b.avgPkg}</strong></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section-alt">
        <div className="container">
          <div className="cta-banner">
            <div>
              <h3>See All 300+ Recruiters</h3>
              <p>Browse the complete list of companies that have recruited from KMIT across all years.</p>
            </div>
            <button className="btn-white" onClick={() => navigate('/placements/recruiters')}>
              <i className="fa-solid fa-building"></i> View Recruiters
            </button>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
