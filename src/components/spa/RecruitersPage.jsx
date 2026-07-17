import PageShell from './PageShell'
import { useNavigate } from 'react-router-dom'

export default function RecruitersPage() {
  const navigate = useNavigate()

  const allRecruiters = [
    'google.com','microsoft.com','amazon.com','adobe.com','salesforce.com','intuit.com',
    'servicenow.com','cisco.com','goldmansachs.com','infosys.com','wipro.com','tcs.com',
    'cognizant.com','accenture.com','deloitte.com','capgemini.com','techmahindra.com',
    'virtusa.com','zensar.com','ibm.com','oracle.com','sap.com','epam.com','hexaware.com',
    'persistent.com','adp.com','dxc.com','lumen.com','opentext.com','hsbc.com','dbs.com',
    'experian.com','ey.com','pwc.com','darwinbox.com','valuelabs.com','valuemomentum.com',
    'ivanti.com','interactivebrokers.com','autorabit.com','nowcom.com','hitachi.com',
    'flipkart.com','dell.com','micron.com','ncr.com','optum.com','medplusindia.com','lenskart.com'
  ]

  const names = {
    'google.com':'Google','microsoft.com':'Microsoft','amazon.com':'Amazon','adobe.com':'Adobe',
    'salesforce.com':'Salesforce','intuit.com':'Intuit','servicenow.com':'ServiceNow','cisco.com':'Cisco',
    'goldmansachs.com':'Goldman Sachs','infosys.com':'Infosys','wipro.com':'Wipro','tcs.com':'TCS',
    'cognizant.com':'Cognizant','accenture.com':'Accenture','deloitte.com':'Deloitte','capgemini.com':'Capgemini',
    'techmahindra.com':'Tech Mahindra','virtusa.com':'Virtusa','zensar.com':'Zensar','ibm.com':'IBM',
    'oracle.com':'Oracle','sap.com':'SAP','epam.com':'EPAM','hexaware.com':'Hexaware',
    'persistent.com':'Persistent','adp.com':'ADP','dxc.com':'DXC','lumen.com':'Lumen',
    'opentext.com':'OpenText','hsbc.com':'HSBC','dbs.com':'DBS Bank','experian.com':'Experian',
    'ey.com':'EY','pwc.com':'PwC','darwinbox.com':'Darwinbox','valuelabs.com':'ValueLabs',
    'valuemomentum.com':'Value Momentum','ivanti.com':'Ivanti','interactivebrokers.com':'Interactive Brokers',
    'autorabit.com':'AutoRabit','nowcom.com':'Nowcom','hitachi.com':'Hitachi','flipkart.com':'Flipkart',
    'dell.com':'Dell','micron.com':'Micron','ncr.com':'NCR','optum.com':'Optum',
    'medplusindia.com':'MedPlus','lenskart.com':'Lenskart'
  }

  const tiers = {
    'Dream (>15 LPA)': ['google.com','microsoft.com','amazon.com','goldmansachs.com','salesforce.com','servicenow.com','intuit.com','adobe.com'],
    'Super (8–15 LPA)': ['cisco.com','darwinbox.com','interactivebrokers.com','ibm.com','oracle.com','micron.com','dell.com','experian.com'],
    'Core (4–8 LPA)': ['infosys.com','wipro.com','tcs.com','cognizant.com','accenture.com','capgemini.com','hexaware.com','persistent.com'],
  }

  return (
    <PageShell
      eyebrow="Our Recruiters"
      title="300+ Top"
      titleEm="Recruiters"
      description="KMIT has built strong relationships with 300+ leading companies across India and globally. Here is a comprehensive look at the organizations that recruit from KMIT."
      breadcrumbs={[{ label: 'Placements', to: '/placements' }, { label: 'Top Recruiters' }]}
    >
      {/* Stats */}
      <section className="page-section">
        <div className="container">
          <div className="stats-strip">
            <div className="stat-block">
              <span className="stat-value">300<span className="accent">+</span></span>
              <span className="stat-label">Total Recruiters</span>
            </div>
            <div className="stat-block">
              <span className="stat-value"><span className="accent">54</span></span>
              <span className="stat-label">Highest LPA</span>
            </div>
            <div className="stat-block">
              <span className="stat-value">5<span className="accent">+</span></span>
              <span className="stat-label">Product Companies</span>
            </div>
            <div className="stat-block">
              <span className="stat-value"><span className="accent">Global</span></span>
              <span className="stat-label">International Offers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tier-wise Recruiters */}
      {Object.entries(tiers).map(([tierName, companies], ti) => (
        <section key={ti} className={ti % 2 === 0 ? 'page-section-alt' : 'page-section'}>
          <div className="container">
            <div className="section-header">
              <div className="section-eyebrow">
                <i className="fa-solid fa-trophy"></i> {tierName}
              </div>
              <h2>{tierName.split('(')[0].trim()} <em>Recruiters</em></h2>
              <div className="section-divider"></div>
            </div>
            <div className="recruiters-logo-grid">
              {companies.map((domain, i) => (
                <div key={i} className="recruiter-logo-card">
                  <img
                    src={`https://logo.clearbit.com/${domain}`}
                    alt={names[domain]}
                    onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                  />
                  <span style={{display:'none'}}>{names[domain]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* All Recruiters Grid */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-building"></i> All Recruiters</div>
            <h2>Complete <em>Recruiter List</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="recruiters-logo-grid" style={{gridTemplateColumns:'repeat(auto-fill, minmax(140px, 1fr))'}}>
            {allRecruiters.map((domain, i) => (
              <div key={i} className="recruiter-logo-card">
                <img
                  src={`https://logo.clearbit.com/${domain}`}
                  alt={names[domain]}
                  onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                  style={{display:'block'}}
                />
                <span style={{display:'none', alignItems:'center', justifyContent:'center', fontSize:'0.8rem', fontWeight:700, color:'var(--navy)', textAlign:'center', width:'100%'}}>
                  {names[domain]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="cta-banner">
            <div>
              <h3>Is Your Company Interested in Recruiting?</h3>
              <p>Connect with KMIT's Training & Placement Cell to schedule a recruitment drive for the 2025–26 batch.</p>
            </div>
            <button className="btn-white" onClick={() => navigate('/contact')}>
              <i className="fa-solid fa-handshake"></i> Contact T&P Cell
            </button>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
