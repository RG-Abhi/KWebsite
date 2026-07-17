import PageShell from './PageShell'
import ScrollReveal from '../ScrollReveal'

const activities = [
  {
    title: 'COVID-19 Relief: Mask Distribution',
    category: 'Pandemic Relief',
    icon: 'fa-mask-face',
    date: 'June 2020',
    desc: 'Street Cause KMIT members took the initiative to supply high-quality protective masks to underprivileged communities and orphanages to help them combat the spread of COVID-19.',
    details: [
      'Beneficiary: Spurthi Boys Home',
      'Phase I (Led by Vyomakesh): 40 kits distributed',
      'Phase II (Led by Tanya Prashad Pandey, President): 40 additional kits distributed',
      'Impact: Provided critical safety equipment to children and support staff during the height of the pandemic.'
    ],
    stats: [
      { label: 'Masks Distributed', value: '80+' },
      { label: 'Impacted Lives', value: '80+' }
    ]
  },
  {
    title: 'COVID-19 Relief: Groceries Donation',
    category: 'Community Support',
    icon: 'fa-basket-shopping',
    date: 'July 2020',
    desc: 'Distributed comprehensive essential grocery kits designed to support families and orphanages fighting an uphill battle with meagre earnings during lockdown. Each kit contained ingredients sufficient to sustain a family for one full month.',
    details: [
      'Distributed essential kits including Rice (25kg), Toor Dal (2kg), Cooking Oil (1L), Atta, Sugar, Tamarind, Tea Powder, Spices, and hygiene essentials like Soaps and Detergents.',
      'Strict adherence to COVID-19 safety guidelines and social distancing norms during distribution.',
      'Total Project Budget: ₹24,700/-'
    ],
    stats: [
      { label: 'Families Supported', value: '75+' },
      { label: 'Total Budget', value: '₹24.7k' }
    ]
  },
  {
    title: 'Plantation Drive (#PlantForAChange)',
    category: 'Environmental Initiative',
    icon: 'fa-seedling',
    date: 'August 2020',
    desc: 'Initiated a viral green campaign titled "#Plantforachange" to promote afforestation and ecological awareness. The challenge utilized social media nomination dynamics to create a domino effect of tree planting across Hyderabad.',
    details: [
      'Launched on Street Cause KMIT\'s official Instagram channel.',
      'Nomination model: Each participant plants a sapling, shares video proof, and nominates 5 others to continue the chain.',
      'Massive student engagement with participants submitting active planting logs.'
    ],
    stats: [
      { label: 'Active Participants', value: '300+' },
      { label: 'Saplings Planted', value: '300+' }
    ]
  }
]

export default function StreetCausePage() {
  return (
    <PageShell
      eyebrow="Student Life"
      title="Street"
      titleEm="Cause"
      description="Street Cause KMIT is a prominent division of Street Cause Hyderabad, the largest student-run NGO in Telangana. We empower young leaders to execute impactful social service, community welfare, and environmental projects."
      breadcrumbs={[{ label: 'Student Life', to: '/student-life' }, { label: 'Street Cause' }]}
    >
      {/* Intro section */}
      <section className="page-section">
        <div className="container">
          <ScrollReveal animation="fade-up">
          <div className="section-header centered">
            <div className="section-eyebrow">
              <i className="fa-solid fa-hands-holding-child" /> Social Responsibility
            </div>
            <h2>A Life of <em>Purpose & Service</em></h2>
            <div className="section-divider" />
            <p>
              Street Cause is an NGO comprising passionate students who intend to bring about a positive change in society. 
              Our KMIT chapter acts as a crucible of social action, giving students a platform to address civic, environmental, 
              and humanitarian challenges across our local communities.
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <a 
                href="https://www.instagram.com/streetcause.kmit/" 
                target="_blank" 
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  color: '#fff',
                  background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  padding: '0.6rem 1.5rem',
                  borderRadius: '50px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  boxShadow: '0 4px 15px rgba(220, 39, 67, 0.3)',
                  transition: 'transform 0.2s ease'
                }}
                className="hover-scale"
              >
                <i className="fa-brands fa-instagram" style={{ fontSize: '1.2rem' }} /> Follow Street Cause KMIT
              </a>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Main activities */}
      <section className="page-section-alt">
        <div className="container">
          <ScrollReveal animation="fade-up">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-heart-circle-check" /> Initiatives</div>
            <h2>Key <em>Social Projects</em></h2>
            <div className="section-divider" />
          </div>
          </ScrollReveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginTop: '2.5rem' }}>
            {activities.map((act, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 50}>
              <div 
                style={{
                  background: 'var(--glass-bg, rgba(255,255,255,0.05))',
                  border: '1px solid var(--glass-border, rgba(255,255,255,0.08))',
                  borderRadius: '24px',
                  padding: '2.5rem',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  display: 'grid',
                  gridTemplateColumns: '1fr 300px',
                  gap: '2.5rem',
                }}
              >
                {/* Information */}
                <div>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--accent, #f77f00)',
                    display: 'block',
                    marginBottom: '0.5rem'
                  }}>
                    {act.category} &bull; {act.date}
                  </span>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.5rem', marginBottom: '1.2rem' }}>
                    <i className={`fa-solid ${act.icon}`} style={{ color: 'var(--accent, #f77f00)', opacity: 0.9 }} />
                    {act.title}
                  </h3>
                  <p style={{ fontSize: '0.95rem', opacity: 0.9, lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {act.desc}
                  </p>
                  
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.8rem', opacity: 0.95 }}>Project Details & Deliverables:</h4>
                  <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {act.details.map((detail, idx) => (
                      <li key={idx} style={{ fontSize: '0.9rem', opacity: 0.85, lineHeight: 1.5 }}>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sidebar Stats */}
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '1.5rem',
                  textAlign: 'center'
                }}>
                  {act.stats.map((stat, idx) => (
                    <div key={idx}>
                      <span style={{
                        display: 'block',
                        fontSize: '2rem',
                        fontWeight: 700,
                        color: 'var(--accent-primary, #14777F)',
                        lineHeight: 1
                      }}>
                        {stat.value}
                      </span>
                      <span style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        opacity: 0.75,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginTop: '0.3rem'
                      }}>
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="page-section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <ScrollReveal animation="fade-up">
          <div className="highlight-quote">
            <p>"A life not lived for others is not a life. Through Street Cause KMIT, we inspire engineers not just to build efficient machines or software, but to build a better, kinder society."</p>
            <cite>— Street Cause KMIT President</cite>
          </div>
          </ScrollReveal>
        </div>
      </section>
    </PageShell>
  )
}
