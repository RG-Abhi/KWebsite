import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { createPortal } from 'react-dom'
import PageShell from './PageShell'
import ScrollReveal from '../ScrollReveal'

const activities = [
  {
    title: 'TRISHUL',
    icon: 'fa-shield-halved',
    image: '/images/cocurriculars/trishul.jpg',
    fallbackIcon: 'fa-shield-halved',
    badge: 'First Year Focus',
    desc: 'With the sole objective of producing industry-ready engineering students from day one, KMIT has instituted a comprehensive Trishul program for its First Year students. It builds strong foundations in problem-solving and computer science basics.',
    link: '/student-life/co-curricular/trishul'
  },
  {
    title: 'ARJUNA',
    icon: 'fa-bullseye',
    image: '/images/cocurriculars/arjuna.jpg',
    fallbackIcon: 'fa-bullseye',
    badge: 'Competitive Programming',
    desc: 'An elite training ground for competitive programmers. Arjuna provides rigorous coaching, algorithmic challenges, and preparation for top global coding contests like ACM-ICPC, Google Code Jam, and HashCode.',
    link: '/student-life/co-curricular/arjuna'
  },
  {
    title: 'NIRANTAR (NFS)',
    icon: 'fa-arrow-rotate-right',
    image: '/images/cocurriculars/nfs.jpg',
    fallbackIcon: 'fa-arrow-rotate-right',
    badge: 'Continuous Learning',
    desc: 'Nirantar stands for continuous innovation and hands-on learning. It is a research and product development division where students build real-world applications and explore cutting-edge engineering paradigms.',
    link: '/student-life/co-curricular/nirantar'
  },
  {
    title: 'BEC',
    icon: 'fa-comments-dollar',
    image: '/images/cocurriculars/bec.jpg',
    fallbackIcon: 'fa-comments-dollar',
    badge: 'Global Certification',
    desc: 'Business English Certificate (BEC) program by Cambridge. Recognizing that communication skills play a major role in global recruitments, KMIT kick-started the BEC program to give graduates a decisive professional edge.',
    link: '/student-life/co-curricular/bec'
  },
  {
    title: 'SONET',
    icon: 'fa-network-wired',
    image: '/images/cocurriculars/sonet.jpg',
    fallbackIcon: 'fa-laptop-code',
    badge: 'Emerging Technologies',
    desc: 'School Of New & Emerging Technologies (SONET). Over 2,000 students are trained annually in bleeding-edge technologies including Cloud Computing, Devops, Cybersecurity, and Full-Stack development.',
    link: '/student-life/co-curricular/sonet'
  },
  {
    title: 'FINISHING SCHOOL',
    icon: 'fa-graduation-cap',
    image: '/images/cocurriculars/fs.jpg',
    fallbackIcon: 'fa-user-tie',
    badge: 'Industry Prep',
    desc: 'Run concurrently with the B.Tech course, KMIT\'s Finishing School is a flagship initiative that bridges the industry-academia gap. It ensures students are fully equipped with technical mastery and professional soft skills.',
    link: '/student-life/co-curricular/finishing-school'
  },
  {
    title: 'PROJECT SCHOOL',
    icon: 'fa-diagram-project',
    image: '/images/cocurriculars/project.png',
    fallbackIcon: 'fa-lightbulb',
    badge: 'Product Development',
    desc: 'A dedicated incubator where students learn by doing. Project School guides students through the complete lifecycle of software engineering — from ideation and architectural design to deployment and scaling.',
    link: '/student-life/co-curricular/project-school'
  },
  {
    title: 'IMAGINEERING SCHOOL',
    icon: 'fa-screwdriver-wrench',
    image: '/images/cocurriculars/imag.png',
    fallbackIcon: 'fa-screwdriver-wrench',
    badge: 'Hardware & IoT',
    desc: 'Where engineering meets imagination. Imagineering School provides hands-on training in robotics, Internet of Things (IoT), 3D printing, and embedded systems, fostering a robust maker culture.',
    link: '/student-life/co-curricular/imagineering'
  },
  {
    title: 'INTERNATIONAL FINISHING SCHOOL',
    icon: 'fa-earth-americas',
    image: '/images/cocurriculars/ifs.png',
    fallbackIcon: 'fa-globe',
    badge: 'Global Careers',
    desc: 'Preparing KMITians for global leadership. This program trains students to meet international standards of software engineering, global culture, and facilitates admissions into prestigious international universities.',
    link: '/student-life/co-curricular/ifs'
  }
]

export const programDetails = {
  'TRISHUL': {
    title: 'TRISHUL SKILL DEVELOPMENT',
    badge: 'First Year Foundation',
    icon: 'fa-shield-halved',
    desc: 'Trishul is an exclusive skill-enhancement initiative designed for first-year engineering students at KMIT. The objective is to provide entry-level technological exposure and build foundational life competencies that set students apart from day one.',
    sections: [
      {
        title: 'Core Technologies Covered',
        content: 'Students receive comprehensive entry-level training in modern computing concepts including Python programming and Rich Internet Applications (RIA) development, equipping them with immediate practical skills.'
      },
      {
        title: 'Essential Life Skills Modules',
        content: 'Beyond pure code, Trishul uniquely offers hands-on courses in vital practical life skills. These include:',
        list: [
          'Basic Electrics & Household Repairs: Learning safety, wiring, fixing bulbs, and basic electrical systems.',
          'Solar Panel Assembly: Understanding renewable energy systems and building functional solar power setups.',
          'Robotics Fundamentals: Designing basic autonomous mechanical units.',
          'Culinary Skills: Core cooking principles, preparing students for independent living.'
        ]
      },
      {
        title: 'Program Outcomes',
        content: 'Graduates of the Trishul program transition from school education to engineering with high hands-on readiness, lateral thinking capabilities, and an appreciation for multidisciplinary crafts.'
      }
    ]
  },
  'ARJUNA': {
    title: 'ARJUNA CODING PLATFORM',
    badge: 'Sunday Coding League',
    icon: 'fa-bullseye',
    desc: 'Arjuna is a highly prestigious weekly coding league conducted every Sunday for KMIT students across 1st, 2nd, and 3rd years. Focused on advanced algorithmic training, it serves as an intense preparation ground for global competitive programming.',
    sections: [
      {
        title: 'League Mechanics',
        list: [
          'Three challenging algorithmic coding activities per Arjuna session on Sundays.',
          'Solutions are rigorously discussed during every session using Java programming.',
          'Winners are determined in real-time based on the fastest correct submission time.',
          'Top 2 students from each year of KMIT receive weekly cash prizes following a technical interview.'
        ]
      }
    ],
    winners: [
      { name: 'MUTYALA SAI SANDEEP', roll: '17BD1A0516', date: '14-03-2018', week: 'Week 1' },
      { name: 'EVENA RAVI TEJA', roll: '16BD1A0543', date: '14-03-2018', week: 'Week 1' },
      { name: 'ANUNAY AATIPAMULA', roll: '15BD1A0549', date: '14-03-2018', week: 'Week 1' },
      { name: 'BOINAPALLI VISHAL', roll: '15BD1A054H', date: '18-03-2018', week: 'Week 2' },
      { name: 'SWETHA GUPTHA', roll: '16BD1A05C4', date: '18-03-2018', week: 'Week 2' },
      { name: 'BHARATHI RAMANA JOSHI', roll: '17BD1A0527', date: '18-03-2018', week: 'Week 2' },
      { name: 'DEVULAPALLI SUMAN', roll: '17BD1A050H', date: '21-03-2018', week: 'Week 3' },
      { name: 'DANTHALA MANEESH KUMAR', roll: '15BD1A054Y', date: '21-03-2018', week: 'Week 3' }
    ]
  },
  'NIRANTAR (NFS)': {
    title: 'NIRANTAR FINISHING SCHOOL',
    badge: 'Weekly TTS Competitions',
    icon: 'fa-arrow-rotate-right',
    desc: 'Nirantar Finishing School (NFS) is a high-speed coding competition conducted on alternate days—Tuesday, Thursday, and Saturday (TTS) every week. It acts as a continuous engineering arena for 1st, 2nd, and 3rd year students.',
    sections: [
      {
        title: 'Weekly Format & Discussion',
        list: [
          'Two intensive coding problems per session, totaling six activities weekly.',
          'Solutions from the previous session are discussed in depth using Python programming.',
          'At the conclusion of each session, the new challenges are released for the next day.',
          'Top 15 students from each academic year receive cash prizes based on submission speed.'
        ]
      }
    ],
    winners: [
      { name: 'SIDHARTH KUMAR', roll: '17BD1A051K', date: '03-09-2019', week: 'Week 1' },
      { name: 'MUNGI VYSHNAVI REDDY', roll: '17BD1A0599', date: '03-09-2019', week: 'Week 1' },
      { name: 'PATLOLLA SUSHMA REDDY', roll: '17BD1A0539', date: '03-09-2019', week: 'Week 1' },
      { name: 'ANNANYA BHANDARI', roll: '17BD1A0524', date: '03-09-2019', week: 'Week 1' },
      { name: 'PODDUTURI SANJANA', roll: '17BD1A055C', date: '03-09-2019', week: 'Week 1' },
      { name: 'BEJUGAM VARUN KUMAR', roll: '17BD1A0569', date: '03-09-2019', week: 'Week 1' }
    ]
  },
  'BEC': {
    title: 'CAMBRIDGE ENGLISH BUSINESS CERTIFICATE',
    badge: 'Global Professional English',
    icon: 'fa-comments-dollar',
    desc: 'Recognizing that corporate English communication plays a crucial role in modern hiring, KMIT launched the Cambridge English Business Certificates (BEC) program in 2011. It remains one of KMIT\'s most sought-after non-academic selections.',
    sections: [
      {
        title: 'Levels & Preparation Cycle',
        content: 'KMIT provides comprehensive, specialized coaching for both the BEC Preliminary and BEC Vantage levels. Exams are conducted twice a year in March and September, with dedicated instruction starting two months prior.'
      },
      {
        title: 'Core Philosophy',
        content: 'Rather than focusing solely on exam clearance, KMIT\'s BEC curriculum helps students master workplace etiquette, corporate documentation, collaborative writing, and professional vocabulary that directly boosts career placements.'
      }
    ]
  },
  'SONET': {
    title: 'SCHOOL OF NEW & EMERGING TECHNOLOGIES',
    badge: 'Emerging Tech Stack',
    icon: 'fa-network-wired',
    desc: 'SONET (School of New & Emerging Technologies) is KMIT\'s dedicated division for cutting-edge specialized education, training hundreds of students in advanced engineering courses.',
    sections: [
      {
        title: 'Biomedical Imaging',
        content: 'Covers advanced image processing methods applied to medical scans, machine learning algorithms for bio-data analysis, and software implementation using Python. (Lead: Dr. Devika Rubi; Assistant: Swetha Merugu). Over 70 students trained, with 10 securing research internships in BIRAC-funded projects.'
      },
      {
        title: 'Blockchain Architecture & Design',
        content: 'Explores digital ledgers, cryptography, smart contracts, decentralized app (dApp) design, and IoT interfaces. (Lead: Sireesha Puppala; Assistant: Shanker Macha). Over 92 CSE & IT students trained with 62 successfully getting industry-grade certified in 2019.'
      },
      {
        title: 'Lead Technology Advisors',
        content: 'A high-pedigree faculty panel coordinates SONET projects: Srikanth Reddy, A V Nagireddy, Pooja Godse, Balarama Murthy, Ajeet Jain, Fatima, M Narsimlu, and Sudhakar.'
      }
    ]
  },
  'FINISHING SCHOOL': {
    title: 'KMIT FINISHING SCHOOL (KFS)',
    badge: 'Employment Readiness Suite',
    icon: 'fa-graduation-cap',
    desc: 'Finishing School is KMIT\'s flagship employment readiness suite, run concurrently with B.Tech studies across two semesters in the 3rd and 4th years, eliminating the need for post-degree external coaching.',
    sections: [
      {
        title: 'Two-Semester Roadmap',
        content: 'Semester 1 starts during 3rd Year Sem 2, and Semester 2 is conducted during 4th Year Sem 1. Students choose from various technical tracks designed around market needs.'
      },
      {
        title: 'Comprehensive Syllabus',
        list: [
          'Foundation Track: C, C++, Core & Advanced Java, Relational Databases (RDBMS), and Operating Systems fundamentals.',
          'Aptitude Skills: Intensive training in Quantitative Techniques, Analytical Reasoning, and Verbal Ability.'
        ]
      },
      {
        title: 'Elite Faculty Mentors',
        list: [
          'Technical Skills: Mr. B Satyanarayana (Lead Mentor), Mr. G Krishna Subramanyam, Mr. T Srikanth Reddy, Mr. P Ram Mohan, Mr. A V NagiReddy, Mr. ALK Bilahari, Mr. T Venu, Mr. Modepalli Srinivas, Mr. T Uday Kumar, Ms. M Nikitha.',
          'Aptitude: Mr. Chaitanya Deshpande, Mr. C Pavan Kumar.',
          'Soft Skills & Verbal: Ms. Shweta Paropkari (Lead Soft Skills Advisor).'
        ]
      }
    ]
  },
  'PROJECT SCHOOL': {
    title: 'KMIT PROJECT SCHOOL',
    badge: 'Hands-on Engineering Lifecycle',
    icon: 'fa-diagram-project',
    desc: 'Project School is an advanced project-incubation division at KMIT designed to bridge the gap between abstract academic concepts and real-world implementation.',
    sections: [
      {
        title: 'Specialized Tech Verticals',
        list: [
          'Blockchain Technology: Exploring smart contracts, decentralized ledgers, and dApps.',
          'Artificial Intelligence & Machine Learning: Covering foundational algorithms, deep neural networks, computer vision, and NLP model training.',
          'MERN Stack Development: Designing interactive, high-performance web systems using MongoDB, Express, React, and Node.js.',
          'Internet of Things (IoT): Architecting interconnected sensor systems for smart healthcare, urban planning, and agriculture.',
          'Cybersecurity: Threat modeling, networking protocols, security baselines, and data-protection.',
          'AR/VR: Development of immersive virtual experiences for training and educational purposes.'
        ]
      },
      {
        title: 'Delivery Modalities',
        content: 'All sessions are scheduled in standard college hours (9:30 AM to 4:30 PM). Delivery leverages Google Classrooms for resources, GitHub for source-control, and custom YouTube presentation videos. Training is fully integrated with KMIT\'s Tessellator LMS at no cost to the students.'
      },
      {
        title: 'Core Outcomes',
        content: 'Students build end-to-end products, author research papers for reputable publications, and graduate with a significant portfolio of functional applications.'
      }
    ]
  },
  'IMAGINEERING SCHOOL': {
    title: 'IMAGINEERING SCHOOL',
    badge: 'Hardware Prototyping & T-HUB',
    icon: 'fa-screwdriver-wrench',
    desc: 'Imagineering School is a modern collaborative maker-space at KMIT established in partnership with T-HUB Telangana. It bridges the divide between physical hardware design, electronics, and digital applications.',
    sections: [
      {
        title: 'Key Focus Areas',
        list: [
          'Development of an Innovation Mindset: Immersive problem-solving and rapid prototyping workflows.',
          'Practical Prototyping: Hands-on labs featuring Robotics, IoT microcontrollers, 3D printing, and CAD modeling.',
          'T-HUB Integration: Incubation support, startup networking, and mentorship to transform ideas into viable commercial ventures.'
        ]
      }
    ]
  },
  'INTERNATIONAL FINISHING SCHOOL': {
    title: 'INTERNATIONAL FINISHING SCHOOL (IFS)',
    badge: 'Corporate & Global Training Suite',
    icon: 'fa-globe',
    desc: 'The International Finishing School (IFS) offers KMIT\'s high-tier software engineering syllabus to corporate stakeholders and international academic audiences, ensuring global competency.',
    sections: [
      {
        title: 'Client Programs & Timezones',
        content: 'IFS currently operates major global training schedules:',
        list: [
          'Procareer Academy, LA: Advanced Python & Full Stack Developer suites (Summer & Winter programs timed perfectly for US PST & Indian IST hours).',
          'Blue Sky Coding: Flagship Summer of Tech (SoT) course scheduled for European (GMT) and Indian (IST) regions.'
        ]
      }
    ]
}
}

export default function CoCurricularsPage() {
  const [activeProgram, setActiveProgram] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const hash = location.hash.replace('#', '').toLowerCase()
    const map = {
      'bec': 'BEC',
      'sonet': 'SONET',
      'finishing-school': 'FINISHING SCHOOL',
      'project-school': 'PROJECT SCHOOL',
      'imagineering-school': 'IMAGINEERING SCHOOL',
      'trishul': 'TRISHUL',
      'arjuna': 'ARJUNA',
      'nirantar': 'NIRANTAR (NFS)',
      'ifs': 'INTERNATIONAL FINISHING SCHOOL'
    }
    if (map[hash]) {
      setActiveProgram(map[hash])
    }
  }, [location.hash])

  const handleClose = () => {
    setActiveProgram(null)
    window.history.replaceState(null, '', location.pathname)
  }

  const selectedDetails = activeProgram ? programDetails[activeProgram] : null

  useEffect(() => {
    if (activeProgram) {
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
  }, [activeProgram])

  return (
    <PageShell
      eyebrow="Student Life"
      title="Co-Curricular"
      titleEm="Activities"
      description="At KMIT, we believe that real engineering is learned outside the exam hall. Our comprehensive co-curricular ecosystem equips students with industry-ready technical skills, communication mastery, and innovation mindsets."
      breadcrumbs={[{ label: 'Student Life', to: '/student-life' }, { label: 'Co-Curriculars' }]}
    >
      {/* Intro Stats */}
      <section className="page-section">
        <div className="container">
          <div className="stats-strip">
            <div className="stat-block">
              <span className="stat-value">9</span>
              <span className="stat-label">Specialist Programs</span>
            </div>
            <div className="stat-block">
              <span className="stat-value">2000<span className="accent">+</span></span>
              <span className="stat-label">Students Trained Yearly</span>
            </div>
            <div className="stat-block">
              <span className="stat-value">100<span className="accent">%</span></span>
              <span className="stat-label">Practical / Hands-on</span>
            </div>
            <div className="stat-block">
              <span className="stat-value">Top 10</span>
              <span className="stat-label">Nationwide Coding Rank</span>
            </div>
          </div>
        </div>
      </section>

      {/* Program Grid */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow">
              <i className="fa-solid fa-puzzle-piece" /> Skill Ecosystem
            </div>
            <h2>Our Flagship <em>Co-Curriculars</em></h2>
            <div className="section-divider" />
            <p>Explore our carefully designed programs running parallel to standard academics to turn students into world-class engineers. Click on any box to see schedules, winners, and detailed specifications.</p>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
              marginTop: '3rem'
            }}
          >
            {activities.map((act, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 50} style={{ height: '100%' }}>
              <div 
                className="hover-lift"
                onClick={() => {
                  if (act.key) {
                    setActiveProgram(act.key)
                  } else {
                    setActiveProgram(act.title)
                  }
                }}
                style={{
                  background: 'var(--glass-bg, rgba(255,255,255,0.06))',
                  border: '1px solid var(--glass-border, rgba(255,255,255,0.10))',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  height: '100%'
                }}
              >
                {/* Image Section */}
                <div style={{ position: 'relative', height: 'auto', minHeight: '200px', overflow: 'hidden' }}>
                  <img 
                    src={act.image} 
                    alt={act.title} 
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div 
                    className="image-fallback" 
                    style={{ 
                      display: 'none', 
                      width: '100%', 
                      height: '100%', 
                      background: 'linear-gradient(135deg, #14777F 0%, #003434 100%)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '3.5rem',
                      color: 'rgba(255,255,255,0.3)'
                    }}
                  >
                    <i className={`fa-solid ${act.fallbackIcon}`} />
                  </div>
                  <span 
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: 'var(--accent, #f77f00)',
                      color: '#fff',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '0.35rem 0.8rem',
                      borderRadius: '50px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
                    }}
                  >
                    {act.badge}
                  </span>
                </div>

                {/* Content Section */}
                <div style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.25rem', marginBottom: '0.8rem' }}>
                    <i className={`fa-solid ${act.fallbackIcon}`} style={{ color: 'var(--accent, #f77f00)', opacity: 0.9 }} />
                    {act.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', opacity: 0.85, lineHeight: 1.6, margin: 0, flexGrow: 1 }}>
                    {act.desc}
                  </p>
                  <span style={{ fontSize: '0.8rem', color: 'var(--primary-color, #008080)', fontWeight: 600, marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    View details <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.75rem' }} />
                  </span>
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
          <div className="highlight-quote">
            <p>"Engineering is not just a degree; it is a capability. KMIT's co-curricular modules are meticulously planned to push students beyond conventional syllabi and instill lifelong problem-solving competencies."</p>
            <cite>— Academic Core Committee, KMIT</cite>
          </div>
        </div>
      </section>

      {/* Premium Detail Modal Overlay */}
      {selectedDetails && createPortal(
        <div 
          className="premium-modal-overlay"
          onClick={handleClose}
        >
          <div 
            className="premium-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button Top Right */}
            <button 
              className="modal-close-btn"
              onClick={handleClose}
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
              {/* Centered Circular Icon Circle */}
              <div 
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'rgba(11, 31, 58, 0.02)',
                  border: '2px solid rgba(11, 31, 58, 0.08)',
                  boxShadow: '0 8px 24px rgba(11, 31, 58, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.8rem',
                  position: 'relative'
                }}
              >
                {/* Glowing radial blur background */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '-10px',
                    right: '-10px',
                    bottom: '-10px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(165, 28, 48, 0.08) 0%, transparent 75%)',
                    zIndex: 0
                  }}
                />
                <i 
                  className={`fa-solid ${selectedDetails.icon}`} 
                  style={{ 
                    fontSize: '3.2rem', 
                    color: 'var(--navy)', 
                    textShadow: '0 0 20px rgba(11, 31, 58, 0.15)',
                    zIndex: 1
                  }} 
                />
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
                KMIT Co-Curricular Excellence Program
              </p>

              {/* Close Button bottom of sidebar */}
              <div style={{ marginTop: 'auto', width: '100%' }}>
                <button 
                  className="modal-action-btn modal-close-navy-btn"
                  onClick={handleClose}
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

              {/* Dynamic sections with features grid */}
              {selectedDetails.sections && selectedDetails.sections.map((sect, sIdx) => (
                <div key={sIdx} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                    {sect.title}
                  </h4>
                  {sect.content && (
                    <p style={{ fontSize: '0.96rem', lineHeight: 1.65, color: 'var(--text-muted)', margin: 0, textAlign: 'justify' }}>
                      {sect.content}
                    </p>
                  )}
                  {sect.list && (
                    <div 
                      style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', 
                        gap: '1rem',
                        marginTop: '0.3rem'
                      }}
                    >
                      {sect.list.map((li, lIdx) => (
                        <div 
                          key={lIdx} 
                          className="modal-item-card"
                          style={{
                            background: '#ffffff',
                            border: '1px solid rgba(11, 31, 58, 0.08)',
                            borderRadius: '14px',
                            padding: '1.2rem',
                            display: 'flex',
                            gap: '0.8rem',
                            alignItems: 'flex-start',
                            boxShadow: '0 4px 12px rgba(11, 31, 58, 0.02)'
                          }}
                        >
                          <i 
                            className="fa-solid fa-circle-chevron-right" 
                            style={{ 
                              color: 'var(--brand-orange-text)', 
                              marginTop: '0.2rem', 
                              fontSize: '0.95rem',
                              filter: 'drop-shadow(0 0 3px rgba(165, 28, 48, 0.2))'
                            }} 
                          />
                          <span style={{ fontSize: '0.92rem', lineHeight: 1.5, color: 'var(--text-dark)', opacity: 0.9 }}>
                            {li}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Special rendering for winners list with Trophy Leaderboard Grid */}
              {selectedDetails.winners && (
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
                    Recent Weekly Winners League
                  </h4>
                  
                  <div 
                    style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
                      gap: '1.2rem' 
                    }}
                  >
                    {selectedDetails.winners.map((win, wIdx) => (
                      <div 
                        key={wIdx} 
                        className="modal-winner-card"
                        style={{
                          background: 'linear-gradient(135deg, rgba(197, 160, 89, 0.04) 0%, #ffffff 100%)',
                          border: '1px solid rgba(197, 160, 89, 0.3)',
                          borderRadius: '16px',
                          padding: '1.2rem',
                          position: 'relative',
                          overflow: 'hidden',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.8rem',
                          boxShadow: '0 8px 24px rgba(11, 31, 58, 0.06)'
                        }}
                      >
                        {/* Background radial gold glow circle */}
                        <div 
                          style={{
                            position: 'absolute',
                            top: '-20px',
                            right: '-20px',
                            width: '80px',
                            height: '80px',
                            background: 'radial-gradient(circle, rgba(197, 160, 89, 0.1) 0%, transparent 70%)',
                            pointerEvents: 'none'
                          }}
                        />

                        {/* Top row with Week Badge and Trophy icon */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span 
                            style={{
                              background: 'rgba(197, 160, 89, 0.12)',
                              color: 'var(--gold)',
                              fontSize: '0.72rem',
                              fontWeight: 800,
                              padding: '0.25rem 0.6rem',
                              borderRadius: '50px',
                              border: '1px solid rgba(197, 160, 89, 0.25)',
                              textTransform: 'uppercase',
                              letterSpacing: '0.03em'
                            }}
                          >
                            {win.week}
                          </span>
                          <i 
                            className="fa-solid fa-trophy" 
                            style={{ 
                              color: 'var(--gold)', 
                              fontSize: '1.25rem',
                              filter: 'drop-shadow(0 0 6px rgba(197, 160, 89, 0.35))'
                            }} 
                          />
                        </div>

                        {/* Winner Name */}
                        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy)', marginTop: '0.2rem' }}>
                          {win.name}
                        </div>

                        {/* Tech-Badge styled details */}
                        <div 
                          style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            marginTop: 'auto',
                            borderTop: '1px solid rgba(11, 31, 58, 0.06)',
                            paddingTop: '0.8rem' 
                          }}
                        >
                          <span 
                            style={{ 
                              fontFamily: 'monospace', 
                              fontSize: '0.8rem', 
                              color: 'var(--brand-orange-text)', 
                              fontWeight: 700, 
                              background: 'rgba(165, 28, 48, 0.06)', 
                              padding: '0.2rem 0.5rem', 
                              borderRadius: '6px',
                              border: '1px solid rgba(165, 28, 48, 0.12)'
                            }}
                          >
                            {win.roll}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 500 }}>
                            <i className="fa-regular fa-calendar" /> {win.date}
                          </span>
                        </div>
                      </div>
                    ))}
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
