import PageShell from './PageShell'

export default function EventsPage() {
  const events = [
    { month: 'Apr', year: '2026', tag: 'Technical', cat: 'CSE Symposium', title: 'Samarasetu \'26', desc: 'Annual inter-college technical symposium organised by the Department of CSE. Features paper presentations, coding contests, project exhibitions, and workshops conducted by industry professionals.', participants: '500+' },
    { month: 'Mar', year: '2026', tag: 'Sports', cat: 'Annual Festival', title: 'ATHENA \'26', desc: 'KMIT\'s grand annual sports festival, featuring 15+ events including cricket, basketball, volleyball, badminton, athletics, chess, carrom, and table tennis. All branches participate in a week-long inter-department championship.', participants: '600+' },
    { month: 'Feb', year: '2026', tag: 'Social', cat: 'NSS Drive', title: 'Blood Donation Camp', desc: 'Annual inter-college blood donation drive organised by KMIT\'s NSS unit and the Street Cause chapter. Conducted in partnership with area hospitals and blood banks, this event has collected 1,000+ units of blood across its editions.', participants: '200+ Donors' },
    { month: 'Jan', year: '2026', tag: 'Cultural', cat: 'Campus Festival', title: 'Patang Utsav \'26', desc: 'A vibrant kite-flying festival on the KMIT rooftop terrace. Featuring live music, food stalls, photography competitions, and the blue Hyderabad sky filled with hundreds of colourful kites.', participants: '300+' },
    { month: 'Dec', year: '2025', tag: 'Alumni', cat: 'Annual Gathering', title: 'KMIT Alumni Meet 2025', desc: 'The annual reunion bringing together KMIT graduates from across India and abroad. Features panel discussions, networking sessions, speaker talks, and the KMIT Alumni Awards recognising distinguished graduates.', participants: '400+' },
    { month: 'Nov', year: '2025', tag: 'Technical', cat: '24-Hour Sprint', title: 'KMIT Hackathon \'25', desc: 'KMIT\'s flagship 24-hour coding hackathon — teams of 3–5 compete to build solutions for real-world problems across health tech, agri-tech, and civic tech. Total prize pool ₹50,000+.', participants: '150+ Teams' },
    { month: 'Oct', year: '2025', tag: 'Cultural', cat: 'Festive Celebration', title: 'NAVRAAS \'25', desc: 'KMIT\'s electrifying Dandiya and Garba night — traditional attire, live folk music, energetic group dances, and a campus transformed into a Gujarati festival ground for the night. One of KMIT\'s most attended cultural events.', participants: '700+' },
    { month: 'Sep', year: '2025', tag: 'National', cat: 'Government Initiative', title: 'SIH 2025 — Internal Round', desc: 'Smart India Hackathon internal selection at KMIT. 30+ teams competed in the internal round, with Team ASHTOJ selected to represent KMIT at the national finale, where they went on to WIN.', participants: '100+ Teams' },
    { month: 'Aug', year: '2025', tag: 'Academic', cat: 'Research Presentation', title: 'UDAAN Research Presentation Day', desc: 'Annual showcase of ongoing research by Project School and UDAAN R&D students. Industry experts, faculty, and investors attend to evaluate research outputs and provide mentorship.', participants: '200+' },
    { month: 'Jun', year: '2025', tag: 'Orientation', cat: 'Welcome Event', title: 'Freshman Orientation 2025', desc: 'The grand welcome event for the B.Tech 2025 incoming batch — featuring introductions to all clubs, departments, facilities, and KMIT\'s initiatives. A day for new students to discover their home for the next 4 years.', participants: '540 Freshers' },
  ]

  return (
    <PageShell
      eyebrow="Events & Fests"
      title="Campus"
      titleEm="Events"
      description="KMIT's calendar is packed with technical symposia, cultural fests, sports tournaments, social drives, and alumni meets — there's always something happening on campus."
      breadcrumbs={[{ label: 'Student Life', to: '/student-life' }, { label: 'Events & Fests' }]}
    >
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-calendar-star"></i> All Events</div>
            <h2>2025–26 <em>Events Calendar</em></h2>
            <div className="section-divider"></div>
            <p>A year-round calendar of events across technical, cultural, sports, and social domains.</p>
          </div>
          {/* Summary Stats */}
          <div className="stats-strip" style={{marginBottom:'3rem'}}>
            <div className="stat-block">
              <span className="stat-value">10<span className="accent">+</span></span>
              <span className="stat-label">Major Annual Events</span>
            </div>
            <div className="stat-block">
              <span className="stat-value">5<span className="accent">K+</span></span>
              <span className="stat-label">Annual Participants</span>
            </div>
            <div className="stat-block">
              <span className="stat-value">4</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="stat-block">
              <span className="stat-value"><span className="accent">Year</span></span>
              <span className="stat-label">Round Events</span>
            </div>
          </div>
          <div className="events-list">
            {events.map((e, i) => (
              <div key={i} className="event-card">
                <div className="event-date-box">
                  <span className="e-month">{e.month}</span>
                  <span className="e-year">{e.year}</span>
                </div>
                <div className="event-info" style={{flex: 1}}>
                  <div style={{display:'flex', gap:'0.5rem', marginBottom:'0.6rem', flexWrap:'wrap'}}>
                    <span className="event-tag">{e.tag}</span>
                    <span style={{fontSize:'0.7rem', color:'var(--text-muted)', display:'flex', alignItems:'center', gap:'4px'}}>
                      <i className="fa-solid fa-users"></i> {e.participants}
                    </span>
                  </div>
                  <div style={{fontSize:'0.72rem', fontWeight:600, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'0.3rem'}}>{e.cat}</div>
                  <h4>{e.title}</h4>
                  <p>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
