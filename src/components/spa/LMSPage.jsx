import PageShell from './PageShell'

export default function LMSPage() {
  const apps = [
    {
      name: 'Sanjaya App',
      role: 'Parent Portal',
      image: '/assets/sanjaya.png',
      desc: 'Sanjaya is an Android App built to give parents all the details that they need to about their ward’s progress at KMIT. From Sanjaya App parents can not only check the attendance, time-table, performance, events and results, but also look at the class room. The live-class room feature in Sanjaya App has been a big hit among parents. From Sanjaya one can also check as to how their ward has been rated for discipline. Parents also receive notifications from KMIT, in cases like class cancellations. Parents can also contact KMIT directly using the ‘Contact KMIT’ feature.',
      link: 'http://kmit-sanjaya.teleuniv.in/',
      btnText: 'Download SanjayaApp',
      accentColor: '#14777F',
      bgColor: 'rgba(20, 119, 127, 0.08)'
    },
    {
      name: 'Drona App',
      role: 'Faculty Portal',
      image: '/assets/drona.png',
      desc: 'Drona is an Android App that was specifically built for the teaching faculty at KMIT. Not only does the app ease the process of marking attendance, it also allows teachers to add disciplinary points, easily access timetables, receive important notifications, messages with respect to college events and other important news.',
      link: 'http://kmit-drona.teleuniv.in/',
      btnText: 'Download DronaApp',
      accentColor: '#fc7700',
      bgColor: 'rgba(252, 119, 0, 0.08)'
    },
    {
      name: 'Netra App',
      role: 'Student Portal',
      image: '/assets/netra.png',
      desc: 'Netra is an Android App built for KMIT students. From Netra App they have access to all the details that they need to know while they are at KMIT. From Netra App students can not only cross-check the attendance, time-table, performance, events and results, but also access Konversations- Technical and General videos built by KMIT to help students stay updated with the latest in the industry. Students also receive notifications from KMIT, in cases like class cancellations.',
      link: 'http://kmit-netra.teleuniv.in/',
      btnText: 'Download NetraApp',
      accentColor: '#0f172a',
      bgColor: 'rgba(15, 23, 42, 0.08)'
    }
  ]

  return (
    <PageShell
      eyebrow="Uniqueness"
      title="Learning Management"
      titleEm="System"
      description="KMIT empowers students, parents, and faculty through dedicated mobile portals designed to deliver real-time insights, performance metrics, and simplified academic administration."
      breadcrumbs={[{ label: 'Uniqueness', to: '/campus/library' }, { label: 'LMS' }]}
    >
      <section className="page-section">
        <div className="container">
          <div className="section-header centered" style={{ marginBottom: '4rem' }}>
            <div className="section-eyebrow"><i className="fa-solid fa-mobile-screen-button"></i> Mobile Ecosystem</div>
            <h2>The KMIT <em>App Suite</em></h2>
            <div className="section-divider"></div>
          </div>

          {/* Three column card layout */}
          <div className="grid-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
            {apps.map((app, index) => (
              <div 
                key={index} 
                className="fade-in-up"
                style={{
                  background: 'var(--white, #ffffff)',
                  border: '1px solid var(--light-grey, #e5e7eb)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = app.accentColor
                  e.currentTarget.style.transform = 'translateY(-6px)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--light-grey, #e5e7eb)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)'
                }}
              >
                {/* Visual Image Header */}
                <div style={{
                  padding: '24px 24px 0',
                  background: '#f8fafc',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottom: '1px solid #f1f5f9',
                  minHeight: '220px'
                }}>
                  <div style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                    maxWidth: '100%',
                    maxHeight: '180px'
                  }}>
                    <img 
                      src={app.image} 
                      alt={app.name} 
                      style={{ maxWidth: '100%', maxHeight: '180px', display: 'block', objectFit: 'contain' }}
                    />
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  {/* Badge */}
                  <span style={{
                    alignSelf: 'flex-start',
                    background: app.bgColor,
                    color: app.accentColor,
                    padding: '4px 12px',
                    borderRadius: '30px',
                    fontSize: '0.8rem',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '1rem'
                  }}>
                    {app.role}
                  </span>

                  <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.4rem', fontWeight: '800', color: 'var(--navy, #0f172a)' }}>
                    {app.name}
                  </h3>

                  <p style={{
                    margin: '0 0 2rem 0',
                    fontSize: '0.95rem',
                    lineHeight: '1.75',
                    color: 'var(--text-dark, #4b5563)',
                    textAlign: 'justify',
                    flexGrow: 1
                  }}>
                    {app.desc}
                  </p>

                  {/* CTA Download Button */}
                  <a
                    href={app.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      background: app.accentColor,
                      color: 'white',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                      transition: 'opacity 0.2s',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    <i className="fa-brands fa-android" style={{ fontSize: '1.2rem' }}></i>
                    {app.btnText}
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </PageShell>
  )
}
