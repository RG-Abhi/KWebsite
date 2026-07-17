import PageShell from './PageShell'
import { useNavigate } from 'react-router-dom'

export default function StudentLifePage() {
  const navigate = useNavigate()

  const clubs = [
    { icon: 'fa-code', title: 'Coding Club', desc: 'Competitive programming, hackathons, open-source contribution, and tech projects.' },
    { icon: 'fa-robot', title: 'AI & ML Club', desc: 'Machine learning workshops, AI paper reading, and Kaggle competitions.' },
    { icon: 'fa-database', title: 'Data Science Club', desc: 'Data analytics projects, visualisation competitions, and dataset exploration.' },
    { icon: 'fa-guitar', title: 'Music Club', desc: 'Instrumental and vocal training, campus performances, and annual music night.' },
    { icon: 'fa-palette', title: 'Arts & Design Club', desc: 'Drawing, digital art, poster design, and fine-arts exhibitions.' },
    { icon: 'fa-futbol', title: 'Sports Club', desc: 'Cricket, basketball, volleyball, badminton, chess, and table tennis teams.' },
    { icon: 'fa-hand-holding-heart', title: 'NSS — Street Cause', desc: 'National Service Scheme unit focused on community outreach, blood drives, and social campaigns.' },
    { icon: 'fa-newspaper', title: 'Literary Club', desc: 'Debates, quizzes, creative writing, and the campus newsletter publishing team.' },
    { icon: 'fa-camera', title: 'Photography Club', desc: 'Workshops, photo walks, editing masterclasses, and campus documentation.' },
    { icon: 'fa-drama-masks', title: 'Drama Club', desc: 'Stage plays, skits, street theatre, and annual cultural drama performances.' },
    { icon: 'fa-globe', title: 'Entrepreneurship Cell', desc: 'Startup ideation, mentorship sessions, business plan competitions, and investor meets.' },
    { icon: 'fa-microchip', title: 'IEEE Student Branch', desc: 'Technical paper presentations, IEEE quiz competitions, and professional networking events.' },
  ]

  const events = [
    { month: 'Apr', year: '2026', tag: 'Technical', title: 'Samarasetu \'26', desc: 'Annual inter-college technical symposium organised by the Department of CSE, featuring paper presentations, coding contests, and workshops.' },
    { month: 'Mar', year: '2026', tag: 'Sports', title: 'ATHENA \'26', desc: 'KMIT\'s grand annual sports festival featuring 15+ sports events, track & field, team sports, and individual championships.' },
    { month: 'Feb', year: '2026', tag: 'Social', title: 'NSS Blood Donation Camp', desc: 'NSS unit and Street Cause organise the annual inter-college blood donation drive in association with area hospitals.' },
    { month: 'Jan', year: '2026', tag: 'Cultural', title: 'Patang Utsav \'26', desc: 'Vibrant kite-flying festival on the terrace — featuring live music, food stalls, and the joy of soaring colours on a January sky.' },
    { month: 'Dec', year: '2025', tag: 'Alumni', title: 'Annual Alumni Meet 2025', desc: 'KMIT\'s annual alumni gathering bringing back graduates from across the world for networking, panel discussions, and fond memories.' },
    { month: 'Nov', year: '2025', tag: 'Technical', title: '24-Hour Hackathon', desc: 'KMIT\'s flagship 24-hour coding sprint — teams of 3–5 students tackle real-world problems with prizes up to ₹50,000.' },
    { month: 'Sep', year: '2025', tag: 'Cultural', title: 'NAVRAAS \'25', desc: 'KMIT\'s electrifying Dandiya night — traditional garba, live DJ, colourful attire, and a celebration of Navratri on campus.' },
    { month: 'Sep', year: '2025', tag: 'National', title: 'SIH 2025 Internal Hackathon', desc: 'Smart India Hackathon internal selection round at KMIT, with Team ASHTOJ going on to win the national grand finale.' },
  ]

  return (
    <PageShell
      eyebrow="Student Life"
      title="A Vibrant"
      titleEm="Campus Life"
      description="Life at KMIT extends far beyond the classroom. From technical clubs and cultural fests to sports and community service, every student finds their passion at KMIT."
      breadcrumbs={[{ label: 'Student Life' }]}
    >
      {/* Clubs */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-users"></i> Student Clubs</div>
            <h2>Clubs & <em>Communities</em></h2>
            <div className="section-divider"></div>
            <p>12+ student-led clubs across technical, cultural, sports, and social domains — there's a place for everyone.</p>
          </div>
          <div className="clubs-grid">
            {clubs.map((c, i) => (
              <div 
                key={i} 
                className="club-card"
                onClick={() => navigate('/student-life/clubs')}
                style={{ cursor: 'pointer' }}
              >
                <div className="club-icon"><i className={`fa-solid ${c.icon}`}></i></div>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-calendar-star"></i> Calendar</div>
            <h2>Events & <em>Fests</em></h2>
            <div className="section-divider"></div>
            <p>A packed calendar of technical symposia, cultural fests, sports tournaments, and social drives.</p>
          </div>
          <div className="events-list">
            {events.map((e, i) => (
              <div key={i} className="event-card">
                <div className="event-date-box">
                  <span className="e-month">{e.month}</span>
                  <span className="e-year">{e.year}</span>
                </div>
                <div className="event-info">
                  <span className="event-tag">{e.tag}</span>
                  <h4>{e.title}</h4>
                  <p>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center', marginTop:'2rem'}}>
            <button className="btn-outline-nav" onClick={() => navigate('/student-life/events')}>
              <i className="fa-solid fa-calendar"></i> View All Events
            </button>
          </div>
        </div>
      </section>

      {/* Special Programs */}
      <section className="page-section">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-star"></i> Unique Programs</div>
            <h2>Beyond the <em>Ordinary</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="info-cards-grid">
            <div className="info-card" style={{cursor:'pointer'}} onClick={() => navigate('/student-life/finishing-school')}>
              <div className="info-card-icon"><i className="fa-solid fa-school-flag"></i></div>
              <h3>Finishing School</h3>
              <p>A comprehensive career-readiness program for final-year students. Covers aptitude, coding, communication, and mock HR rounds with industry professionals.</p>
              <p style={{color: 'var(--brand-orange-text)', fontWeight:700, fontSize:'0.85rem'}}>Learn More →</p>
            </div>
            <div className="info-card" style={{cursor:'pointer'}} onClick={() => navigate('/student-life/project-school')}>
              <div className="info-card-icon"><i className="fa-solid fa-flask"></i></div>
              <h3>Project School</h3>
              <p>Real-world engineering projects for 2nd-year students across Biomedical, Agri, Defence, and GSoC domains — with monthly stipends and publication opportunities.</p>
              <p style={{color: 'var(--brand-orange-text)', fontWeight:700, fontSize:'0.85rem'}}>Learn More →</p>
            </div>
            <div className="info-card" style={{cursor:'pointer'}} onClick={() => navigate('/student-life/nss')}>
              <div className="info-card-icon"><i className="fa-solid fa-hand-holding-heart"></i></div>
              <h3>NSS — Social Impact</h3>
              <p>National Service Scheme unit conducting blood donation drives, environmental campaigns, village adoption, and literacy programs throughout the year.</p>
              <p style={{color: 'var(--brand-orange-text)', fontWeight:700, fontSize:'0.85rem'}}>Learn More →</p>
            </div>
            <div className="info-card">
              <div className="info-card-icon"><i className="fa-solid fa-lightbulb"></i></div>
              <h3>Imagineering School</h3>
              <p>Innovation centre in collaboration with T-HUB Telangana, providing students access to startup mentors, prototyping resources, and entrepreneurship guidance.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section-dark">
        <div className="container" style={{textAlign:'center'}}>
          <div className="section-eyebrow" style={{margin:'0 auto 1.5rem', display:'inline-flex'}}>
            <i className="fa-solid fa-users"></i> Be Part of the Story
          </div>
          <h2 style={{fontFamily:'var(--font-serif)', color:'#fff', marginBottom:'1rem', fontSize:'2rem'}}>
            Your Journey Begins <em style={{color:'var(--vibrant-accent)', fontStyle:'normal'}}>Here</em>
          </h2>
          <p style={{color:'rgba(255,255,255,0.7)', marginBottom:'2rem', maxWidth:'600px', margin:'0 auto 2rem'}}>
            Join thousands of KMIT students who've built lifelong friendships, discovered their passions, and launched their careers — all on this vibrant campus.
          </p>
          <button className="btn-white" onClick={() => navigate('/admissions')}>
            <i className="fa-solid fa-graduation-cap"></i> Admissions Information
          </button>
        </div>
      </section>
    </PageShell>
  )
}
