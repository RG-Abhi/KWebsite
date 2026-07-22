import { useState, useMemo } from 'react'
import PageShell from './PageShell'
import LightCarousel from '../LightCarousel'
import { placementsData } from '../../context/placementsData'
import { useData } from '../../context/websiteData'

const FALLBACK_BASE = 'https://api.dicebear.com/9.x/initials/svg?backgroundColor=0f172a,dc143c&textColor=ffffff&seed='

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
            <div key={i} className="recruiter-logo" style={{ flexDirection: 'column', height: 'auto', gap: '10px' }}>
              <div style={{ height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={`https://icon.horse/icon/${slug}`}
                  alt={companyName}
                  style={{ maxHeight: '100%', borderRadius: '4px' }}
                  onError={e => {
                    e.target.onerror = null
                    e.target.src = `${FALLBACK_BASE}${encodeURIComponent(companyName)}`
                  }}
                />
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
                {companyName}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function PlacementsPage() {
  const { data } = useData()
  const { fwd = [], rev = [], names = {} } = data.recruiters || {}

  const [activeTab, setActiveTab] = useState('pce') // 'pce', 'pob', 'poc', 'ptr'
  const [activeYear, setActiveYear] = useState('2025-26')
  const [searchQuery, setSearchQuery] = useState('')

  const years = ['2025-26', '2024-25', '2023-24', '2022-23', '2021-22', '2020-21', '2019-20', '2018-19', '2017-18']

  const cellHighlights = [
    "The Institute has a full-fledged placement office to look after Placement activities.",
    "The Training and Placement cell provides the official support base for placement of Final year students.",
    "The support services that it offers are in the form of arranging On-campus / Pooled-Campus Drives and grooming students to face the final test of their knowledge.",
    "The Training and Placement team are the official coordinators for campus placement in KMIT.",
    "The enthusiastic placements team strives for effectively striking a match between recruiter expectations and student aspirations.",
    "The Placement Office handles all training and placement oriented aspects in the institute."
  ]

  const placementObjectives = [
    {
      title: "Skill Enhancement",
      desc: "Grooming and training final-year students extensively to face core technical assessments, coding rounds, and personal HR interviews.",
      icon: "fa-users-gear"
    },
    {
      title: "Career Counseling",
      desc: "Advising and supporting students to choose their ideal career paths, pursue right-fit technologies, and map industry trends.",
      icon: "fa-brain"
    },
    {
      title: "Corporate Outreach",
      desc: "Establishing strong, collaborative relationships with premier global software institutions, domestic technology leaders, and startups.",
      icon: "fa-handshake"
    },
    {
      title: "Mock Assessment",
      desc: "Running weekly technical coding challenges, logical aptitude exams, and comprehensive simulated mock interviews.",
      icon: "fa-code"
    },
    {
      title: "Industry Collaboration",
      desc: "Organizing professional seminars, workshops, guest lectures, and continuous interaction sessions with corporate delegates.",
      icon: "fa-industry"
    },
    {
      title: "Career Readiness",
      desc: "Providing a complete operational and technical support base for final-year students to ease post-academic corporate transitions.",
      icon: "fa-graduation-cap"
    }
  ]

  // All 14 Placement Drive images matching the original placement.php 1:1
  const placementSlides = [
    "https://kmit.in/placements/images/Placement%20one%2024-25.jpg",
    "https://kmit.in/placements/images/Placement%201%2024-25.jpg",
    "https://kmit.in/placements/images/Placement%202%2024-25.jpg",
    "https://kmit.in/placements/images/Placement%203%2024-25.jpg",
    "https://kmit.in/placements/images/Placement%204%2024-25.jpg",
    "https://kmit.in/placements/images/Placement%205%2024-25.jpg",
    "https://kmit.in/placements/images/Placement%206%2024-25.jpg",
    "https://kmit.in/placements/images/Placement%207%2024-25.jpg",
    "https://kmit.in/placements/images/Placement%208%2024-25.jpg",
    "https://kmit.in/placements/images/Placement%209%2024-25.jpg",
    "https://kmit.in/placements/images/Placement%2010%2024-25.jpg",
    "https://kmit.in/placements/images/Placement%2011%2024-25.jpg",
    "https://kmit.in/placements/images/Placement%2012%2024-25.jpg",
    "https://kmit.in/placements/images/Placement%2013%2024-25.jpg"
  ]

  // All 6 Objectives slides matching original placement.php 1:1
  const objectiveSlides = [
    "https://kmit.in/placements/images/slide1.jpg",
    "https://kmit.in/placements/images/slide2.jpg",
    "https://kmit.in/placements/images/slide3.jpg",
    "https://kmit.in/placements/images/slide4.jpg",
    "https://kmit.in/placements/images/slide5.jpg",
    "https://kmit.in/placements/images/slide6.jpg"
  ]




  // Filtered and Paginated Placement Records
  const currentRecords = useMemo(() => {
    return placementsData[activeYear] || []
  }, [activeYear])

  const filteredRecords = useMemo(() => {
    if (!searchQuery) return currentRecords
    const q = searchQuery.toLowerCase().trim()
    return currentRecords.filter(item => 
      (item.company || '').toLowerCase().includes(q)
    )
  }, [currentRecords, searchQuery])

  const handleYearChange = (year) => {
    setActiveYear(year)
    setSearchQuery('')
  }

  return (
    <PageShell
      eyebrow="Training & Placements"
      title="Placements"
      titleEm=""
      description="Access KMIT's premium Placement Cell portal. View real-time placement track records, objectives, and corporate coordinators."
      breadcrumbs={[{ label: 'Placements' }]}
    >
      {/* ── 1. Top Coverflow Swiper Photo Gallery (Using all 14 images) ── */}
      <section className="page-section" style={{ paddingBottom: '1rem' }}>
        <div className="container">
          <div className="section-header centered" style={{ marginBottom: '1.5rem' }}>
            <div className="section-eyebrow"><i className="fa-solid fa-images" /> Traces of Lenses Club</div>
            <h2>Placement Drives <em>Gallery</em></h2>
            <div className="section-divider" style={{ margin: '0.5rem auto' }} />
          </div>

          <LightCarousel images={placementSlides} altPrefix="Placement drive" height={340} autoMs={4500} />
          <p style={{ textAlign: 'right', fontSize: '0.82rem', color: '#6b7280', marginTop: '0.75rem', fontStyle: 'italic' }}>
            Photos by: <em>Traces of Lenses club</em>
          </p>
        </div>
      </section>

      {/* ── 2. Success Stories Alert Banner ─────────────────────── */}
      <section className="page-section" style={{ padding: '1rem 0 2rem 0' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            border: '1px solid #bbf7d0',
            borderRadius: '4px',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#16a34a',
                color: '#ffffff',
                display: 'grid',
                placeItems: 'center',
                fontSize: '1.1rem'
              }}>
                <i className="fa-solid fa-trophy" />
              </div>
              <h3 style={{ color: '#14532d', fontWeight: '850', fontSize: '1.25rem', margin: 0 }}>
                SUCCESS STORIES & HIGHLIGHTS (2025-2026 BATCH)
              </h3>
            </div>

            <p style={{ color: '#155724', fontSize: '0.96rem', lineHeight: '1.7', fontWeight: '500', margin: 0 }}>
              KMIT has again created a record placement for the <strong>2025-2026 Batch</strong>! As of today, <strong>148 companies</strong> have visited our campus making <strong>702 total job offers</strong> with an outstanding average package of <strong>8.26 LPA</strong>!
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1rem',
              background: 'rgba(255, 255, 255, 0.45)',
              padding: '1.5rem',
              borderRadius: '4px',
              border: '1px solid rgba(22, 163, 74, 0.12)'
            }}>
              {[
                "08 students received job offers with CTC > 40.00 LPA.",
                "13 students received job offers with CTC between 20.00 - 40.00 LPA.",
                "13 students received job offers with CTC between 15.00 - 20.00 LPA.",
                "128 students received job offers with CTC between 10.00 - 15.00 LPA.",
                "86 students received job offers with CTC between 8.00 - 10.00 LPA.",
                "94 students received job offers with CTC between 7.00 - 8.00 LPA.",
                "86 students received job offers with CTC between 6.00 - 7.00 LPA.",
                "98 students received job offers with CTC between 5.00 - 6.00 LPA."
              ].map((hl, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#14532d', fontSize: '0.88rem', fontWeight: '700' }}>
                  <i className="fa-solid fa-circle-check" style={{ color: '#16a34a', marginTop: '3px' }} />
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            <p style={{ color: '#166534', fontSize: '0.86rem', lineHeight: '1.6', margin: 0, fontStyle: 'italic' }}>
              We extend our sincere gratitude to all recruiting partners for recognizing and trusting KMIT's robust student potential. Congratulations to the Class of 2026 on your well-deserved successes!
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. Tab Navigation & Content ──────────────────────────── */}
      <section className="page-section-alt">
        <div className="container">
          {/* Sub-menu Navigation */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            borderBottom: '2px solid var(--light-grey)',
            marginBottom: '2.5rem',
            flexWrap: 'wrap'
          }}>
            {[
              { id: 'pce', label: 'Placement Cell', icon: 'fa-building-columns' },
              { id: 'pob', label: 'Placement Objective', icon: 'fa-bullseye' },
              { id: 'poc', label: 'Dean of Placements', icon: 'fa-user-tie' },
              { id: 'ptr', label: 'Placement Track Record', icon: 'fa-table-list' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '1rem 1.5rem',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '4px solid var(--navy)' : '4px solid transparent',
                  color: activeTab === tab.id ? 'var(--navy)' : '#6b7280',
                  fontWeight: activeTab === tab.id ? '800' : '600',
                  fontSize: '0.94rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s',
                  marginBottom: '-2px'
                }}
              >
                <i className={`fa-solid ${tab.icon}`} /> {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: PLACEMENT CELL */}
          {activeTab === 'pce' && (
            <div className="exams-tab-panel" style={{
              background: 'var(--white)',
              borderRadius: '4px',
              padding: '2.5rem',
              border: '1px solid var(--light-grey)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ color: 'var(--navy)', fontWeight: '850', fontSize: '1.35rem', marginBottom: '1.5rem' }}>
                Operational Overview & Infrastructure
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {cellHighlights.map((hl, idx) => (
                  <div key={idx} style={{
                    padding: '1.5rem',
                    background: '#f8fafc',
                    borderRadius: '4px',
                    border: '1px solid #f1f5f9',
                    display: 'flex',
                    gap: '1rem'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(15,23,42,0.05)',
                      color: 'var(--navy)',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: '0.9rem',
                      flexShrink: 0
                    }}>
                      {idx + 1}
                    </div>
                    <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.6', margin: 0, fontWeight: '500', textAlign: 'justify' }}>
                      {hl}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: PLACEMENT OBJECTIVE (Featuring all 6 slide images inside coverflow swiper) */}
          {activeTab === 'pob' && (
            <div className="exams-tab-panel" style={{
              background: 'var(--white)',
              borderRadius: '4px',
              padding: '2.5rem',
              border: '1px solid var(--light-grey)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ marginBottom: '3rem' }}>
                <h4 style={{ color: 'var(--navy)', fontWeight: '850', fontSize: '1.2rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                  Objectives Photo Slides
                </h4>
                <LightCarousel images={objectiveSlides} altPrefix="Objective slide" height={300} autoMs={4500} />
              </div>

              <h3 style={{ color: 'var(--navy)', fontWeight: '850', fontSize: '1.35rem', marginBottom: '1.5rem', textAlign: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '2rem' }}>
                Key Strategic Objectives
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
              }}>
                {placementObjectives.map((obj, idx) => (
                  <div key={idx} style={{
                    padding: '2rem',
                    background: '#ffffff',
                    borderRadius: '4px',
                    border: '1px solid #e5e7eb',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '4px',
                        background: 'rgba(252, 119, 0, 0.1)',
                        color: 'var(--vibrant-accent, #fc7700)',
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: '1.25rem'
                      }}>
                        <i className={`fa-solid ${obj.icon}`} />
                      </div>
                      <h4 style={{ color: 'var(--navy)', fontWeight: '800', fontSize: '1.1rem', margin: 0 }}>
                        {obj.title}
                      </h4>
                    </div>
                    <p style={{ color: '#4b5563', fontSize: '0.88rem', lineHeight: '1.6', margin: 0, textAlign: 'justify' }}>
                      {obj.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DEAN OF PLACEMENTS */}
          {activeTab === 'poc' && (
            <div className="exams-tab-panel" style={{
              background: 'var(--white)',
              borderRadius: '4px',
              padding: '3rem',
              border: '1px solid var(--light-grey)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '3rem',
                alignItems: 'center'
              }}>
                {/* Dean Biography details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div className="section-header" style={{ marginBottom: '0.5rem' }}>
                    <div className="section-eyebrow"><i className="fa-solid fa-address-card" /> Administration</div>
                    <h2 style={{ fontSize: '1.75rem' }}>Dean of <em>Placements</em></h2>
                    <div className="section-divider" style={{ margin: '0.5rem 0' }} />
                  </div>

                  <p style={{ color: '#4b5563', fontSize: '0.94rem', lineHeight: '1.7', textAlign: 'justify', margin: 0 }}>
                    <strong>Mr. D. Sudheer Reddy</strong> (B.Tech CSE, MBA) has over 14 years of professional work experience spanning campus placements, industrial relations, designing elements of formal/informal learning, and building collaborative networks for overall managerial processes.
                  </p>
                  <p style={{ color: '#4b5563', fontSize: '0.94rem', lineHeight: '1.7', textAlign: 'justify', margin: 0 }}>
                    He started his professional career in 2007, working with Hughes Communications India Limited (HCIL) and NIIT, before joining the Keshav Memorial Institute of Technology (KMIT) in 2010.
                  </p>
                  <p style={{ color: '#4b5563', fontSize: '0.94rem', lineHeight: '1.7', textAlign: 'justify', margin: 0 }}>
                    His core activities focus on maximizing placement opportunities for trained engineering candidates. Through active industrial collaborative initiatives, he has built exceptional institutional credibility and established continuous rapport with recruiter panels visiting the KMIT Group.
                  </p>
                </div>

                {/* Dean Contact Overlay Card */}
                <div style={{
                  background: '#f8fafc',
                  borderRadius: '4px',
                  padding: '2.5rem',
                  border: '1px solid #f1f5f9',
                  boxShadow: 'var(--shadow-sm)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1.5rem'
                }}>
                  <div style={{
                    width: '140px',
                    height: '140px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '4px solid var(--white)',
                    boxShadow: 'var(--shadow-md)',
                    background: '#f3f4f6'
                  }}>
                    <img
                      src="https://kmit.in/placements/Sudheer.jpg"
                      alt="Mr. D. Sudheer Reddy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => {
                        e.target.src = 'https://api.dicebear.com/9.x/initials/svg?seed=Sudheer+Reddy&backgroundColor=0f172a&textColor=ffffff'
                      }}
                    />
                  </div>

                  <div>
                    <h4 style={{ color: 'var(--navy)', fontWeight: '850', fontSize: '1.25rem', marginBottom: '0.25rem' }}>
                      Mr. D. Sudheer Reddy
                    </h4>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: '700', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Dean, Placements & Corporate Relations
                    </p>
                    <p style={{ color: 'var(--vibrant-accent, #fc7700)', fontSize: '0.78rem', fontWeight: '800', margin: '0.2rem 0 0 0' }}>
                      KMIT Group of Institutions
                    </p>
                  </div>

                  <div style={{ height: '1px', background: '#e2e8f0', width: '100%' }} />

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
                    <a href="tel:+919989011611" style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      color: 'var(--navy)',
                      fontWeight: '750',
                      fontSize: '0.92rem',
                      textDecoration: 'none',
                      background: 'var(--white)',
                      border: '1px solid #e2e8f0',
                      padding: '10px',
                      borderRadius: '4px',
                      transition: 'all 0.2s'
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                      onMouseLeave={e => e.currentTarget.style.background = 'var(--white)'}
                    >
                      <i className="fa-solid fa-phone" /> +91-9989011611
                    </a>

                    <a href="mailto:sudheer@kmit.in" style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      color: 'var(--navy)',
                      fontWeight: '750',
                      fontSize: '0.92rem',
                      textDecoration: 'none',
                      background: 'var(--white)',
                      border: '1px solid #e2e8f0',
                      padding: '10px',
                      borderRadius: '4px',
                      transition: 'all 0.2s'
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                      onMouseLeave={e => e.currentTarget.style.background = 'var(--white)'}
                    >
                      <i className="fa-solid fa-envelope" /> sudheer@kmit.in
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PLACEMENT TRACK RECORD */}
          {activeTab === 'ptr' && (
            <div className="exams-tab-panel" style={{
              background: 'var(--white)',
              borderRadius: '4px',
              padding: '2.5rem',
              border: '1px solid var(--light-grey)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <div>
                  <h3 style={{ color: 'var(--navy)', fontWeight: '850', fontSize: '1.25rem', margin: 0 }}>
                    Campus Placement Statistics
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: '0.25rem 0 0 0' }}>
                    Browse historical recruitment statistics year-by-year
                  </p>
                </div>

                {/* Company Search Input */}
                <div style={{ position: 'relative', width: '280px' }}>
                  <input
                    type="text"
                    placeholder="Search company name..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                    }}
                    style={{
                      width: '100%',
                      padding: '0.65rem 1rem 0.65rem 2.25rem',
                      border: '1px solid #cbd5e1',
                      borderRadius: '4px',
                      fontSize: '0.88rem',
                      outline: 'none',
                      background: '#ffffff',
                      transition: 'border-color 0.2s'
                    }}
                  />
                  <i className="fa-solid fa-magnifying-glass" style={{
                    position: 'absolute',
                    top: '50%',
                    left: '0.85rem',
                    transform: 'translateY(-50%)',
                    color: '#94a3b8',
                    fontSize: '0.85rem'
                  }} />
                </div>
              </div>

              {/* Year Select Sub-tabs */}
              <div style={{
                display: 'flex',
                gap: '0.4rem',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                background: '#f8fafc',
                padding: '6px',
                borderRadius: '4px',
                border: '1px solid #f1f5f9'
              }}>
                {years.map(year => (
                  <button
                    key={year}
                    onClick={() => handleYearChange(year)}
                    style={{
                      padding: '0.5rem 1.1rem',
                      background: activeYear === year ? 'var(--navy)' : 'transparent',
                      color: activeYear === year ? '#ffffff' : '#475569',
                      border: 'none',
                      borderRadius: '4px',
                      fontWeight: '800',
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {year}
                  </button>
                ))}
              </div>

              {/* Data Table — always desktop-style with horizontal scroll on mobile */}
              <div className="placements-table-scroll" style={{ overflowX: 'auto', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                <table style={{ width: '100%', minWidth: '700px', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead style={{ background: '#f8fafc' }}>
                    <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '800', color: 'var(--navy)', width: '60px', whiteSpace: 'nowrap' }}>S.No</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '800', color: 'var(--navy)' }}>Name of the Company</th>
                      <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '800', color: 'var(--navy)', whiteSpace: 'nowrap' }}>Selects</th>
                      <th style={{ padding: '1rem', textAlign: 'right', fontWeight: '800', color: 'var(--navy)', whiteSpace: 'nowrap' }}>Internship / Month (INR)</th>
                      <th style={{ padding: '1rem', textAlign: 'right', fontWeight: '800', color: 'var(--navy)', whiteSpace: 'nowrap' }}>CTC (LPA)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.length > 0 ? filteredRecords.map((item, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #f1f5f9', background: index % 2 === 0 ? '#fff' : '#f8fafc' }}>
                        <td style={{ padding: '0.85rem 1rem', color: '#64748b', fontWeight: '700' }}>
                          {index + 1}
                        </td>
                        <td style={{ padding: '0.85rem 1rem', color: 'var(--navy)', fontWeight: '800' }}>
                          {item.company}
                        </td>
                        <td style={{ padding: '0.85rem 1rem', textAlign: 'center', color: '#475569', fontWeight: '700' }}>
                          {item.selects}
                        </td>
                        <td style={{ padding: '0.85rem 1rem', textAlign: 'right', color: '#047857', fontWeight: '700' }}>
                          {item.internship !== 'Direct' && item.internship !== 'N/A' && item.internship !== '' ? (
                            `₹ ${item.internship}`
                          ) : (
                            <span style={{ color: '#64748b', fontWeight: '600', fontSize: '0.8rem' }}>Direct Joining</span>
                          )}
                        </td>
                        <td style={{ padding: '0.85rem 1rem', textAlign: 'right', color: 'var(--vibrant-accent, #fc7700)', fontWeight: '800' }}>
                          {item.ctc.includes('LPA') || item.ctc.includes('Cr') ? item.ctc : `${item.ctc} LPA`}
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8', fontWeight: '600' }}>
                          <i className="fa-solid fa-box-open" style={{ display: 'block', fontSize: '1.5rem', marginBottom: '0.5rem' }} />
                          No companies match "{searchQuery}"
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Total Records indicator */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <span style={{ fontSize: '0.88rem', color: '#64748b', fontWeight: '750' }}>
                  Showing all {filteredRecords.length} recruiting partners for the {activeYear} drive.
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 4. Recruiter Logos Infinite Marquee (Using homepage grayscale grid tracks) ── */}
      <section className="page-section" style={{ padding: '2.5rem 0 1.5rem 0', background: 'var(--white)', borderTop: '1px solid var(--light-grey)', overflow: 'hidden' }}>
        <div className="container">
          <div className="section-header centered" style={{ marginBottom: '1.5rem' }}>
            <div className="section-eyebrow"><i className="fa-solid fa-handshake" /> Corporate Relations</div>
            <h2>Our Premium <em>Recruiters</em></h2>
            <div className="section-divider" style={{ margin: '0.5rem auto' }} />
          </div>
        </div>

        <LogoRow logos={fwd} names={names} className="fwd" />
        <LogoRow logos={rev} names={names} className="rev" />
      </section>

      {/* Styled inline selectors */}
      <style>{`
        .table-row-hover:hover {
          background-color: #f8fafc !important;
        }
      `}</style>
    </PageShell>
  )
}
