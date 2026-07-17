import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import PageShell from './PageShell'
import ScrollReveal from '../ScrollReveal'

const clubDetails = {
  oc: {
    title: 'OC — Oratory Club',
    badge: 'Communication & Leadership',
    icon: 'fa-microphone-lines',
    instagram: 'https://www.instagram.com/oc.kmit/',
    desc: 'The Oratory Club at KMIT hones students\' public speaking, debate, and communication skills through regular practice sessions, inter-college competitions, and workshops led by industry speakers.',
    members: [
      { name: 'VIRAJ PALNITKAR', roll: '23BD1A057P', role: 'HEAD OF OC' },
      { name: 'M V V S RAJEEV', roll: '23BD1A054M', role: 'SIC OF OC' },
      { name: 'CHAVI SINGH', roll: '23BD1A05C6', role: 'MEMBER OF OC' },
      { name: 'MOHAMMED ZAHEED', roll: '23BD1A663P', role: 'MEMBER OF OC' },
      { name: 'RANGA SRINIDHI', roll: '23BD1A053X', role: 'MEMBER OF OC' },
      { name: 'RANIYA RIDA', roll: '23BD1A665G', role: 'MEMBER OF OC' },
      { name: 'VISHNU PRIYA', roll: '23BD1A0575', role: 'MEMBER OF OC' },
      { name: 'RONIT JATANIA', roll: '23BD1A12B8', role: 'MEMBER OF OC' },
      { name: 'RUTHVEEJ RAO', roll: '23BD1A661V', role: 'MEMBER OF OC' }
    ]
  },
  pr: {
    title: 'PR — Public Relations',
    badge: 'Media & Outreach',
    icon: 'fa-bullhorn',
    instagram: 'https://www.instagram.com/pr.kmit/',
    desc: 'The PR Club manages media outreach, event publicity, and branding for all college activities. Members gain hands-on experience in content creation, social media management, and professional communication.',
    members: [
      { name: 'RISHAB DESHPANDE', roll: '23BD1A056G', role: 'HEAD OF PR' },
      { name: 'RYTHMA REDDY LAKKADY', roll: '23BD1A056K', role: 'SIC OF PR' },
      { name: 'A.RISHIK', roll: '23BD1A1205', role: 'CR MANAGER' },
      { name: 'RISHIKA JALA', roll: '23BD1A056H', role: 'DOCUMENTATION INCHARGE' },
      { name: 'K.SYANTHAN KUMAR REDDY', roll: '23BD1A0534', role: 'CONTENT CREATOR' },
      { name: 'ARNAV AGARWAL', roll: '23BD1A6602', role: 'DEVELOPER' },
      { name: 'B SAI RUSHIK', roll: '23BD1A050Q', role: 'VIDEO EDITOR' },
      { name: 'G ABHINANDAN GOUD', roll: '23BD1A05CD', role: 'VIDEO EDITOR' }
    ]
  },
  aakarshan: {
    title: 'Aakarshan',
    badge: 'Arts & Fashion',
    icon: 'fa-palette',
    instagram: 'https://instagram.com/aakarshanofficial?igshid=19hbj9yekivop',
    desc: 'Aakarshan is KMIT\'s arts and fashion club, celebrating creativity through fashion shows, art exhibitions, and design events. The club provides a platform for students to express their artistic talents.',
    members: [
      { name: 'ANURAG SRIKRISHNA', roll: '23BD1A050G', role: 'SENIOR CLUB HEAD' },
      { name: 'MARATI SAINATH MAHENDRA', roll: '23BD1A67A4', role: 'JUNIOR CLUB HEAD' }
    ]
  },
  aalap: {
    title: 'Aalap',
    badge: 'Music',
    icon: 'fa-music',
    instagram: 'https://instagram.com/aalapofficial?igshid=1qqx8id76fz9u',
    desc: 'Aalap is the music club of KMIT, bringing together vocalists and instrumentalists. The club organizes jam sessions, music nights, inter-college music competitions, and live performances at college events.',
    members: [
      { name: 'ABHIRAM', roll: '23BD1A6632', role: 'SENIOR CLUB HEAD' },
      { name: 'SANKEERTANA', roll: '23BD1A665J', role: 'JUNIOR CLUB HEAD' }
    ]
  },
  abhinaya: {
    title: 'Abhinaya',
    badge: 'Theatre & Dramatics',
    icon: 'fa-masks-theater',
    instagram: 'https://www.instagram.com/abhinaya_thedramaclub/',
    desc: 'Abhinaya is the dramatics and theatre club of KMIT. Members explore acting, scriptwriting, directing, and stage design through street plays, skits, and full-length theatrical productions.',
    members: [
      { name: 'SWARAN', roll: '23BD1A051G', role: 'SENIOR CLUB HEAD' },
      { name: 'SUMA', roll: '23BD1A6779', role: 'JUNIOR CLUB HEAD' }
    ]
  },
  riti: {
    title: 'Riti',
    badge: 'Cultural Heritage',
    icon: 'fa-hand-sparkles',
    instagram: 'https://www.instagram.com/riti._.official/',
    desc: 'Riti is KMIT\'s cultural traditions club that preserves and celebrates India\'s diverse heritage through traditional dance, folk performances, cultural fests, and heritage awareness programs.',
    members: [
      { name: 'KOTHA SATHWIK', roll: '23BD1A6611', role: 'CO-CLUB HEAD' },
      { name: 'ISHITHA KULKARNI', roll: '23BD1A0521', role: 'CO-CLUB HEAD' }
    ]
  },
  kmitra: {
    title: 'Kmitra',
    badge: 'Social Service',
    icon: 'fa-handshake-angle',
    instagram: 'https://www.instagram.com/kmitofficial/?hl=en',
    desc: 'Kmitra is the social service and community outreach club of KMIT. Members engage in blood donation drives, orphanage visits, environmental campaigns, and awareness programs to give back to society.',
    members: [
      { name: 'PRASANNA KUMAR KOTA', roll: '23BD1A05BD', role: 'REPRESENTATIVE' },
      { name: 'NIDHI SACHIN SHAH', roll: '24BD1A051A', role: 'REPRESENTATIVE' }
    ]
  },
  kreeda: {
    title: 'Kreeda',
    badge: 'Sports',
    icon: 'fa-futbol',
    instagram: 'https://instagram.com/kreedaofficial?igshid=6g2m7fw7vptj',
    desc: 'Kreeda is the official sports club of KMIT, organizing intra-college and inter-college sports tournaments across cricket, football, basketball, badminton, throwball, and athletics.',
    members: [
      { name: 'M.A. BASITH', roll: '22BD1A6656', role: 'CO-CLUB HEAD' },
      { name: 'M. JAVALI', roll: '23BD1A051W', role: 'CO-CLUB HEAD' }
    ]
  },
  mudra: {
    title: 'Mudra',
    badge: 'Dance',
    icon: 'fa-person-running',
    instagram: 'https://instagram.com/mudraofficial?igshid=548yik15iass',
    desc: 'Mudra is the dance club of KMIT, bringing together dancers of all styles — classical, contemporary, hip-hop, and folk. The club performs at college events and competes in inter-college dance competitions.',
    members: [
      { name: 'SHRI KEERTHI A', roll: '22BD1A05BN', role: 'SENIOR CLUB HEAD' },
      { name: 'SREESHMA GURRAM', roll: '23BD1A059T', role: 'JUNIOR CLUB HEAD' }
    ]
  },
  recurse: {
    title: 'Recurse',
    badge: 'Technology & Coding',
    icon: 'fa-laptop-code',
    instagram: 'https://instagram.com/recurse.official?igshid=1tl3wgrwdikvh',
    desc: 'Recurse is the coding and technology club of KMIT. The club organizes hackathons, coding contests, tech talks, and workshop sessions to sharpen students\' programming and problem-solving skills.',
    members: [
      { name: 'JAI A PARMAR', roll: '22BD1A0517', role: 'CO-CLUB HEAD' },
      { name: 'GREESHMA', roll: '23BD1A054U', role: 'CO-CLUB HEAD' }
    ]
  },
  tol: {
    title: 'TOL — The Open Laughter',
    badge: 'Comedy & Entertainment',
    icon: 'fa-face-laugh-beam',
    instagram: 'https://instagram.com/tracesoflenses?igshid=1fiscb7b89trl',
    desc: 'TOL (The Open Laughter) is KMIT\'s stand-up comedy and humor club. Members perform open mics, comedy nights, and improv shows, creating a vibrant space for laughter and entertainment on campus.',
    members: [
      { name: 'BANURI SAGARIKA', roll: '22BD1A0568', role: 'CO-CLUB HEAD' },
      { name: 'AKHILESH KUMKUMA', roll: '23BD1A05B1', role: 'CO-CLUB HEAD' }
    ]
  },
  vachan: {
    title: 'Vachan',
    badge: 'Literature & Writing',
    icon: 'fa-book-open-reader',
    instagram: 'https://instagram.com/vachan.official?igshid=108t4vb5wt49c',
    desc: 'Vachan is the literary club of KMIT, fostering a love for reading, creative writing, and literary discussions. The club conducts book reviews, poetry slams, quiz competitions, and publishes a college magazine.',
    members: [
      { name: 'SHAIK MOHAMMED OMAR', roll: '24BD1A051J', role: 'CO-CLUB HEAD' },
      { name: 'M. SHUBHANG', roll: '24BD1A05D9', role: 'CO-CLUB HEAD' }
    ]
  }
}

export default function ClubsPage() {
  const [activeClub, setActiveClub] = useState(null)

  const selectedDetails = activeClub ? clubDetails[activeClub] : null

  useEffect(() => {
    if (activeClub) {
      document.body.classList.add('modal-open')
      document.documentElement.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
      document.documentElement.classList.remove('modal-open')
    }
    return () => {
      document.body.classList.remove('modal-open')
      document.documentElement.classList.remove('modal-open')
    }
  }, [activeClub])

  const clubs = [
    {
      key: 'oc',
      name: 'OC — Oratory Club',
      logo: 'https://kmit.in/intiatives/LOGOs/OC-Logo.jpg',
      icon: 'fa-microphone-lines',
      description: 'The Oratory Club at KMIT hones students\' public speaking, debate, and communication skills through regular practice sessions, inter-college competitions, and workshops led by industry speakers.',
      category: 'Communication & Leadership',
    },
    {
      key: 'pr',
      name: 'PR — Public Relations',
      logo: 'https://kmit.in/intiatives/LOGOs/PR-Logo.jpg',
      icon: 'fa-bullhorn',
      description: 'The PR Club manages media outreach, event publicity, and branding for all college activities. Members gain hands-on experience in content creation, social media management, and professional communication.',
      category: 'Media & Outreach',
    },
    {
      key: 'aakarshan',
      name: 'Aakarshan',
      logo: 'https://kmit.in/intiatives/LOGOs/Aakarshan-logo.jpg',
      icon: 'fa-palette',
      description: 'Aakarshan is KMIT\'s arts and fashion club, celebrating creativity through fashion shows, art exhibitions, and design events. The club provides a platform for students to express their artistic talents.',
      category: 'Arts & Fashion',
    },
    {
      key: 'aalap',
      name: 'Aalap',
      logo: 'https://kmit.in/intiatives/LOGOs/Aalap-Logo.jpg',
      icon: 'fa-music',
      description: 'Aalap is the music club of KMIT, bringing together vocalists and instrumentalists. The club organizes jam sessions, music nights, inter-college music competitions, and live performances at college events.',
      category: 'Music',
    },
    {
      key: 'abhinaya',
      name: 'Abhinaya',
      logo: 'https://kmit.in/intiatives/LOGOs/AbhinayaLogo.jpg',
      icon: 'fa-masks-theater',
      description: 'Abhinaya is the dramatics and theatre club of KMIT. Members explore acting, scriptwriting, directing, and stage design through street plays, skits, and full-length theatrical productions.',
      category: 'Theatre & Dramatics',
    },
    {
      key: 'riti',
      name: 'Riti',
      logo: 'https://kmit.in/intiatives/LOGOs/Riti-Logo.jpg',
      icon: 'fa-hand-sparkles',
      description: 'Riti is KMIT\'s cultural traditions club that preserves and celebrates India\'s diverse heritage through traditional dance, folk performances, cultural fests, and heritage awareness programs.',
      category: 'Cultural Heritage',
    },
    {
      key: 'kmitra',
      name: 'Kmitra',
      logo: 'https://kmit.in/intiatives/LOGOs/Kmitra-Logo.jpg',
      icon: 'fa-handshake-angle',
      description: 'Kmitra is the social service and community outreach club of KMIT. Members engage in blood donation drives, orphanage visits, environmental campaigns, and awareness programs to give back to society.',
      category: 'Social Service',
    },
    {
      key: 'kreeda',
      name: 'Kreeda',
      logo: 'https://kmit.in/intiatives/LOGOs/Kreeda-Logo.jpg',
      icon: 'fa-futbol',
      description: 'Kreeda is the official sports club of KMIT, organizing intra-college and inter-college sports tournaments across cricket, football, basketball, badminton, throwball, and athletics.',
      category: 'Sports',
    },
    {
      key: 'mudra',
      name: 'Mudra',
      logo: 'https://kmit.in/intiatives/LOGOs/Mudra-Logo.jpg',
      icon: 'fa-person-running',
      description: 'Mudra is the dance club of KMIT, bringing together dancers of all styles — classical, contemporary, hip-hop, and folk. The club performs at college events and competes in inter-college dance competitions.',
      category: 'Dance',
    },
    {
      key: 'recurse',
      name: 'Recurse',
      logo: 'https://kmit.in/intiatives/LOGOs/Recurse-Logo.jpg',
      icon: 'fa-laptop-code',
      description: 'Recurse is the coding and technology club of KMIT. The club organizes hackathons, coding contests, tech talks, and workshop sessions to sharpen students\' programming and problem-solving skills.',
      category: 'Technology & Coding',
    },
    {
      key: 'tol',
      name: 'TOL — The Open Laughter',
      logo: 'https://kmit.in/intiatives/LOGOs/TOL-Logo.png',
      icon: 'fa-face-laugh-beam',
      description: 'TOL (The Open Laughter) is KMIT\'s stand-up comedy and humor club. Members perform open mics, comedy nights, and improv shows, creating a vibrant space for laughter and entertainment on campus.',
      category: 'Comedy & Entertainment',
    },
    {
      key: 'vachan',
      name: 'Vachan',
      logo: 'https://kmit.in/intiatives/LOGOs/Vachan-Logo.jpg',
      icon: 'fa-book-open-reader',
      description: 'Vachan is the literary club of KMIT, fostering a love for reading, creative writing, and literary discussions. The club conducts book reviews, poetry slams, quiz competitions, and publishes a college magazine.',
      category: 'Literature & Writing',
    }
  ]

  const activeClubData = activeClub ? clubs.find(c => c.key === activeClub) : null

  return (
    <PageShell
      eyebrow="Student Life"
      title="Student"
      titleEm="Clubs"
      description="KMIT nurtures well-rounded individuals through a vibrant ecosystem of student-run clubs spanning technology, arts, sports, literature, social service, and more — ensuring every student finds their passion beyond the classroom."
      breadcrumbs={[{ label: 'Student Life', to: '/student-life' }, { label: 'Clubs' }]}
    >
      {/* Stats Strip */}
      <section className="page-section">
        <div className="container">
          <div className="stats-strip">
            <div className="stat-block">
              <span className="stat-value">12</span>
              <span className="stat-label">Active Clubs</span>
            </div>
            <div className="stat-block">
              <span className="stat-value">1000<span className="accent">+</span></span>
              <span className="stat-label">Student Members</span>
            </div>
            <div className="stat-block">
              <span className="stat-value">50<span className="accent">+</span></span>
              <span className="stat-label">Events Per Year</span>
            </div>
            <div className="stat-block">
              <span className="stat-value">100<span className="accent">%</span></span>
              <span className="stat-label">Student-Led</span>
            </div>
          </div>
        </div>
      </section>

      {/* All Clubs Grid */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-users" /> Our Clubs</div>
            <h2>Explore Our <em>Student Clubs</em></h2>
            <div className="section-divider" />
            <p>From coding marathons to classical performances, KMIT's clubs offer something for everyone. Each club is entirely student-managed and faculty-mentored. Click any card to see student coordinators and Instagram pages.</p>
          </div>

          <div className="info-cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {clubs.map((club, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 50} style={{ height: '100%' }}>
              <div 
                className="info-card hover-lift" 
                onClick={() => setActiveClub(club.key)}
                style={{ 
                  textAlign: 'center',
                  cursor: 'pointer',
                  height: '100%'
                }}
              >
                <div style={{
                  width: '140px',
                  height: '140px',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  margin: '0 auto 1.2rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
                  background: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <img
                    src={club.logo}
                    alt={club.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>
                <span style={{
                  display: 'inline-block',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--accent, #f77f00)',
                  marginBottom: '0.5rem',
                }}>
                  {club.category}
                </span>
                <h3 style={{ marginBottom: '0.5rem' }}>
                  <i className={`fa-solid ${club.icon}`} style={{ marginRight: '0.5rem', opacity: 0.7 }} />
                  {club.name}
                </h3>
                <p>{club.description}</p>
                <span style={{ fontSize: '0.8rem', color: 'var(--primary-color, #008080)', fontWeight: 600, marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  View details <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.75rem' }} />
                </span>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Club Categories Overview */}
      <section className="page-section">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-layer-group" /> Categories</div>
            <h2>Club <em>Categories</em></h2>
            <div className="section-divider" />
          </div>
          <div className="info-cards-grid">
            <div className="info-card">
              <div className="info-card-icon"><i className="fa-solid fa-code" /></div>
              <h3>Technical</h3>
              <p>Recurse drives technology culture on campus with hackathons, competitive programming contests, and hands-on workshops in emerging technologies.</p>
            </div>
            <div className="info-card">
              <div className="info-card-icon"><i className="fa-solid fa-guitar" /></div>
              <h3>Performing Arts</h3>
              <p>Aalap (Music), Mudra (Dance), and Abhinaya (Theatre) give students a stage to express themselves through diverse performing art forms.</p>
            </div>
            <div className="info-card">
              <div className="info-card-icon"><i className="fa-solid fa-paintbrush" /></div>
              <h3>Arts & Culture</h3>
              <p>Aakarshan and Riti celebrate visual arts, fashion, and India's rich cultural heritage through exhibitions, shows, and traditional events.</p>
            </div>
            <div className="info-card">
              <div className="info-card-icon"><i className="fa-solid fa-trophy" /></div>
              <h3>Sports & Fitness</h3>
              <p>Kreeda organizes a full calendar of inter-college and intra-college sports tournaments, promoting fitness and team spirit across campus.</p>
            </div>
            <div className="info-card">
              <div className="info-card-icon"><i className="fa-solid fa-pen-fancy" /></div>
              <h3>Literary & Communication</h3>
              <p>Vachan (Literary), OC (Oratory), and TOL (Comedy) sharpen students' communication, creative writing, and public speaking abilities.</p>
            </div>
            <div className="info-card">
              <div className="info-card-icon"><i className="fa-solid fa-heart" /></div>
              <h3>Social Impact</h3>
              <p>Kmitra and PR drive community outreach, volunteering, social awareness campaigns, and the college's public relations efforts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="page-section-alt">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="highlight-quote">
            <p>"Student clubs at KMIT are not just extra-curricular — they are an integral part of our holistic education model. Every club is a laboratory for leadership, teamwork, creativity, and real-world problem solving."</p>
            <cite>— KMIT Student Activities Cell</cite>
          </div>
        </div>
      </section>

      {/* Premium Detail Modal Overlay */}
      {selectedDetails && createPortal(
        <div 
          className="premium-modal-overlay"
          onClick={() => setActiveClub(null)}
        >
          <div 
            className="premium-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button Top Right */}
            <button 
              className="modal-close-btn"
              onClick={() => setActiveClub(null)}
              style={{
                background: 'rgba(11, 31, 58, 0.05)',
                border: '1px solid rgba(11, 31, 58, 0.08)',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'rgba(11, 31, 58, 0.65)',
                fontSize: '0.95rem',
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                zIndex: 10
              }}
            >
              <i className="fa-solid fa-xmark" />
            </button>

            {/* Sidebar Column */}
            <div className="premium-modal-sidebar">
              {/* Centered Circular Logo Container */}
              <div 
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: '#fff',
                  border: '2px solid rgba(11, 31, 58, 0.08)',
                  boxShadow: '0 8px 24px rgba(11, 31, 58, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.8rem',
                  overflow: 'hidden',
                  position: 'relative',
                  padding: '5px'
                }}
              >
                {activeClubData?.logo ? (
                  <img
                    src={activeClubData.logo}
                    alt={selectedDetails.title}
                    style={{ width: '90%', height: '90%', objectFit: 'contain' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div 
                  className="logo-fallback" 
                  style={{ 
                    display: activeClubData?.logo ? 'none' : 'flex', 
                    width: '100%', 
                    height: '100%', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}
                >
                  <i 
                    className={`fa-solid ${selectedDetails.icon}`} 
                    style={{ 
                      fontSize: '3rem', 
                      color: 'var(--navy)'
                    }} 
                  />
                </div>
              </div>

              {/* Category Badge */}
              <span 
                style={{
                  background: 'rgba(197, 160, 89, 0.12)',
                  border: '1px solid rgba(197, 160, 89, 0.3)',
                  color: 'var(--gold, #C5A059)',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '0.35rem 0.9rem',
                  borderRadius: '50px',
                  display: 'inline-block',
                  marginBottom: '1.2rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em'
                }}
              >
                {selectedDetails.badge}
              </span>

              {/* Title */}
              <h2 
                style={{ 
                  fontSize: '1.65rem', 
                  fontWeight: 800, 
                  margin: '0 0 0.8rem', 
                  color: 'var(--navy)', 
                  lineHeight: 1.25 
                }}
              >
                {selectedDetails.title}
              </h2>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1.5, margin: '0 0 2.5rem 0' }}>
                KMIT Official Student Activity Club
              </p>

              {/* Action buttons (Follow and Close) */}
              <div style={{ marginTop: 'auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {selectedDetails.instagram && (
                  <a 
                    className="modal-action-btn modal-instagram-btn"
                    href={selectedDetails.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                      borderRadius: '50px',
                      padding: '0.75rem 1.8rem',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 4px 15px rgba(220, 39, 67, 0.25)',
                      width: '100%',
                      boxSizing: 'border-box',
                      justifyContent: 'center'
                    }}
                  >
                    <i className="fa-brands fa-instagram" style={{ fontSize: '1.1rem' }} /> Follow on Instagram
                  </a>
                )}
                
                <button 
                  className="modal-action-btn modal-close-navy-btn"
                  onClick={() => setActiveClub(null)}
                  style={{
                    background: 'var(--navy)',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '0.75rem 2rem',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(11, 31, 58, 0.2)',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <i className="fa-solid fa-circle-check" /> Close Window
                </button>
              </div>
            </div>

            {/* Content Column */}
            <div className="premium-modal-content">
              {/* Description Banner */}
              <div style={{ position: 'relative' }}>
                <p 
                  style={{ 
                    fontSize: '1.02rem', 
                    lineHeight: 1.75, 
                    color: 'var(--text-dark)', 
                    margin: 0, 
                    borderLeft: '4px solid var(--crimson)', 
                    paddingLeft: '1.2rem',
                    textAlign: 'justify'
                  }}
                >
                  {selectedDetails.desc}
                </p>
              </div>

              {/* Student Coordinators / Committee members list */}
              {selectedDetails.members && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <h4 
                    style={{ 
                      fontSize: '1.15rem', 
                      fontWeight: 800, 
                      margin: 0, 
                      color: 'var(--navy)', 
                      borderLeft: '3px solid var(--gold)', 
                      paddingLeft: '0.8rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.03em'
                    }}
                  >
                    Student Coordinating Committee
                  </h4>
                  
                  <div 
                    style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', 
                      gap: '1rem' 
                    }}
                  >
                    {selectedDetails.members.map((member, mIdx) => {
                      // Get student initials
                      const initials = member.name
                        .split(' ')
                        .filter(n => n.length > 0)
                        .map(n => n[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase();
                        
                      // Check if member is a Head or SIC or Senior/Co-Club Head
                      const isHead = member.role.toLowerCase().includes('head') || member.role.toLowerCase().includes('sic') || member.role.toLowerCase().includes('manager') || member.role.toLowerCase().includes('incharge');
                      
                      return (
                        <div 
                          key={mIdx} 
                          className={`modal-member-card ${isHead ? 'is-head' : 'is-member'}`}
                          style={{
                            background: '#ffffff',
                            border: '1px solid rgba(11, 31, 58, 0.08)',
                            borderRadius: '16px',
                            padding: '1.1rem 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: '0 4px 12px rgba(11, 31, 58, 0.03)'
                          }}
                        >
                          {/* Inner glowing radial blur inside the card */}
                          <div 
                            style={{
                              position: 'absolute',
                              top: '-30px',
                              right: '-30px',
                              width: '90px',
                              height: '90px',
                              background: isHead 
                                ? 'radial-gradient(circle, rgba(165, 28, 48, 0.05) 0%, transparent 70%)' 
                                : 'radial-gradient(circle, rgba(197, 160, 89, 0.05) 0%, transparent 70%)',
                              pointerEvents: 'none'
                            }}
                          />

                          {/* Initials avatar circle with glowing gradient */}
                          <div 
                            style={{
                              width: '46px',
                              height: '46px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.95rem',
                              fontWeight: 700,
                              color: '#fff',
                              background: isHead 
                                ? 'linear-gradient(135deg, var(--crimson) 0%, #d32f2f 100%)' 
                                : 'linear-gradient(135deg, var(--gold) 0%, #b8860b 100%)',
                              boxShadow: isHead 
                                ? '0 4px 12px rgba(165, 28, 48, 0.25)' 
                                : '0 4px 12px rgba(197, 160, 89, 0.25)',
                              flexShrink: 0
                            }}
                          >
                            {initials}
                          </div>

                          {/* Student Details Info */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', overflow: 'hidden', width: '100%' }}>
                            <div 
                              style={{ 
                                fontWeight: 800, 
                                color: 'var(--navy)', 
                                fontSize: '0.92rem', 
                                whiteSpace: 'nowrap', 
                                overflow: 'hidden', 
                                textOverflow: 'ellipsis' 
                              }}
                            >
                              {member.name}
                            </div>
                            
                            <span 
                              style={{ 
                                alignSelf: 'flex-start', 
                                background: isHead ? 'rgba(165, 28, 48, 0.08)' : 'rgba(197, 160, 89, 0.08)', 
                                border: isHead ? '1px solid rgba(165, 28, 48, 0.2)' : '1px solid rgba(197, 160, 89, 0.2)', 
                                color: isHead ? 'var(--crimson)' : 'var(--gold)', 
                                fontSize: '0.68rem', 
                                fontWeight: 700, 
                                padding: '0.15rem 0.5rem', 
                                borderRadius: '50px', 
                                display: 'inline-block',
                                textTransform: 'uppercase',
                                letterSpacing: '0.02em',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '100%',
                                boxSizing: 'border-box'
                              }}
                            >
                              {member.role}
                            </span>
                            
                            <div 
                              style={{ 
                                fontFamily: 'monospace', 
                                fontSize: '0.75rem', 
                                color: 'var(--text-muted)', 
                                background: 'var(--light-grey)', 
                                padding: '0.1rem 0.4rem', 
                                borderRadius: '4px', 
                                border: '1px solid rgba(11, 31, 58, 0.05)', 
                                alignSelf: 'flex-start', 
                                marginTop: '0.1rem' 
                              }}
                            >
                              {member.roll}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </PageShell>
  )
}
