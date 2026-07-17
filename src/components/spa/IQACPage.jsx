import { useState } from 'react'
import { createPortal } from 'react-dom'
import PageShell from './PageShell'
import SafePdfViewer from '../SafePdfViewer'

// ── DATA DEFINITIONS ─────────────────────────────────────────────────────────
const IQAC_TEAM = [
  {
    name: 'Dr. B L Malleshwari',
    role: 'CHAIRPERSON',
    img: 'https://kmit.in/assets/Dr B Malleshwari.jpg',
    profile: '/administration/assets/Dr.B L Malleswari.pdf',
    fallback: 'BL'
  },
  {
    name: 'Mrs. Asha Jyothi',
    role: 'COORDINATOR',
    img: 'https://kmit.in/assets/MRS.Asha Jyothi.jpg',
    profile: '/administration/assets/aasha.pdf',
    fallback: 'AJ'
  },
  {
    name: 'Mrs. P Aparna',
    role: 'MEMBER',
    img: 'https://kmit.in/assets/Mrs. aparna.jpg',
    profile: '/administration/assets/P.APARNA.pdf',
    fallback: 'PA'
  },
  {
    name: 'Mr. G. Rakesh Reddy',
    role: 'MEMBER',
    img: 'https://kmit.in/assets/MR.rakesh reddy.jpg',
    profile: '/administration/assets/rakesh reddy.pdf',
    fallback: 'RR'
  },
  {
    name: 'Mrs. Savitha Ramesh',
    role: 'MEMBER',
    img: 'https://kmit.in/assets/Savitha ramesh.jpg',
    profile: '/administration/assets/SavithaRamesh.pdf',
    fallback: 'SR'
  },
  {
    name: 'Mrs. Saradamani',
    role: 'MEMBER',
    img: 'https://kmit.in/assets/sharada mani.jpg',
    profile: '/administration/assets/M. SARADA MANI.pdf',
    fallback: 'SM'
  }
]

const objectives = [
  "Develop a system for conscious, consistent and catalytic action to improve the academic and administrative performance of the institution.",
  "Periodic assessment of benchmarks for all courses and programmes.",
  "Instant internal quality checks for improvement of academic quality.",
  "Identification of strong, medium and low pace performers and providing suitable academic attachments and assignments.",
  "Strive towards holistic quality of both students and faculty.",
  "Turnaround strategies for resource mobilization for R&D, consultancy and extension activities.",
  "Enhance collaborative learning skills among stakeholders."
]

const functions = [
  "Direct & Indirect Assessment & Evaluation of benchmarks for various courses/subjects.",
  "Direct & Indirect Attainment of benchmarks for various courses/subjects.",
  "Assessment and Attainment of Course Outcomes and Programme Outcomes.",
  "Facilitating enhancement of participatory teaching learning process using ICT.",
  "Develop Metrics and Evaluation for stakeholders feedback, Analysis & Measures.",
  "Promulgation & Pronouncement of institutional quality standards/parameters amongst stakeholders.",
  "Organize workshops, seminars, conferences, symposiums, and development programmes for both faculty and students.",
  "Encourage student and faculty participation in workshops, seminars, conferences, symposiums, and development programmes.",
  "Documentation of impact of various programmes attended and organised both by the student and faculty members leading to quality improvement.",
  "Encourage & involve both students and faculty members in Industry-Institute-Interaction programmes.",
  "Encourage & involve both students and faculty in professional development and association activities.",
  "Development of Quality Culture among stakeholders of the institution.",
  "Prepare Annual Quality Assurance Report (AQAR) & upload in website."
]

const strategies = [
  "Ensuring timely, efficient and progressive performance of academic, administrative and financial tasks.",
  "Optimization and integration of modern methods of teaching and learning.",
  "Ensuring the credibility of evaluation procedures.",
  "Ensuring the adequacy, maintenance and functioning of the support structure and services.",
  "Establish the relevance of academic quality to augment R&D activities.",
  "Provide access to various cost-effective academic programmes to all sections of society.",
  "Use of modern methods of teaching and learning.",
  "Develop suitable rubrics to attain and assess academic quality.",
  "Deploy resources for strong support to infra-structure and technical-services.",
  "Focus on resource mobilization for consultancy."
]

const benefits = [
  "Ensure heightened level of clarity and focus in institutional functioning towards quality enhancement.",
  "Ensure internalization of the quality culture.",
  "Ensure enhancement and coordination among various activities of the institution and institutionalize all good practices.",
  "Provide a sound basis for decision-making to improve institutional functioning.",
  "Act as a dynamic system for quality changes in HEIs.",
  "Build an organized methodology of documentation and internal communication."
]

const tabs = [
  { id: 'team', label: 'IQAC', icon: 'fa-users' },
  { id: 'objectives', label: 'Objectives', icon: 'fa-bullseye' },
  { id: 'committee', label: 'Committees', icon: 'fa-diagram-project' },
  { id: 'meetings', label: 'IQAC Meetings', icon: 'fa-calendar-days' },
  { id: 'initiatives', label: 'Quality Initiatives', icon: 'fa-circle-check' },
  { id: 'naac', label: 'NAAC', icon: 'fa-award' },
  { id: 'ugc', label: 'UGC Undertakings', icon: 'fa-file-shield' },
  { id: 'audit', label: 'Academic and Administrative Audit Report', icon: 'fa-clipboard-check' }
]

// ── COMPONENT DEFINITION ─────────────────────────────────────────────────────
export default function IQACPage() {
  const [activeTab, setActiveTab] = useState('team')
  const [selectedPdf, setSelectedPdf] = useState(null)

  const getAbsoluteUrl = (url) => {
    if (!url) return ''
    if (url.startsWith('http')) return encodeURI(url)
    if (url.startsWith('/')) return encodeURI(`https://kmit.in${url}`)
    return encodeURI(`https://kmit.in/${url}`)
  }

  const getViewerUrl = (url) => {
    return getAbsoluteUrl(url)
  }

  const openDocument = (url, title) => {
    setSelectedPdf({ url, title })
  }

  return (
    <PageShell
      eyebrow="Quality Assurance"
      title="Internal Quality"
      titleEm="Assurance Cell"
      description="Keshav Memorial Institute of Technology's Internal Quality Assurance Cell (IQAC)."
      breadcrumbs={[{ label: 'About', to: '/about' }, { label: 'IQAC' }]}
    >
      <style>{`
        .iqac-tabs-container::-webkit-scrollbar {
          display: none;
        }
        .iqac-tabs-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .btn-primary-ripple:hover {
          background: #091224 !important;
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(15, 23, 42, 0.35) !important;
        }
        .btn-primary-ripple {
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .modal-close-btn:hover {
          color: #ef4444 !important;
          background: rgba(239, 68, 68, 0.08) !important;
        }
      `}</style>

      {/* ── Tabs Bar & Content ──────────────────────────────────── */}
      <section className="page-section" style={{ paddingTop: '2.5rem' }}>
        <div className="container">
          <div className="iqac-tabs-container" style={{ 
            display: 'flex', 
            gap: '4px', 
            borderRadius: '16px', 
            overflowX: 'auto', 
            border: '1px solid var(--light-grey)', 
            marginBottom: '1.75rem', 
            background: 'var(--off-white)',
            padding: '4px',
            scrollBehavior: 'smooth'
          }}>
            {tabs.map(t => (
              <button 
                key={t.id} 
                onClick={() => setActiveTab(t.id)} 
                style={{
                  flex: '1 0 auto',
                  padding: '0.85rem 1.25rem',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '750',
                  fontSize: '0.86rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: activeTab === t.id ? 'var(--navy)' : 'transparent',
                  color: activeTab === t.id ? '#fff' : 'var(--text-muted)',
                  boxShadow: activeTab === t.id ? 'var(--shadow-sm)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                <i className={`fa-solid ${t.icon}`} style={{ color: activeTab === t.id ? 'var(--vibrant-accent)' : 'inherit' }} />
                {t.label}
              </button>
            ))}
          </div>

          {/* ── TAB CONTENT: IQAC TEAM ─────────────────────────────── */}
          {activeTab === 'team' && (
            <div className="fade-in">
              <div className="section-header centered">
                <h2>IQAC <em>TEAM</em></h2>
                <div className="section-divider" />
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', marginTop: '3rem' }}>
                {IQAC_TEAM.map((member, i) => (
                  <div 
                    key={i} 
                    className="info-card" 
                    style={{ 
                      width: '290px', 
                      padding: 0, 
                      overflow: 'hidden', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      cursor: 'pointer',
                      borderRadius: '10px',
                      border: '1px solid var(--light-grey)',
                      transition: 'all 0.3s'
                    }}
                    onClick={() => openDocument(member.profile, `${member.name} — Profile`)}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'var(--vibrant-accent)'; e.currentTarget.style.boxShadow = 'var(--shadow-lift)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--light-grey)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
                  >
                    <div style={{ position: 'relative', height: '280px', width: '100%', background: '#e2e8f0', overflow: 'hidden' }}>
                      <img 
                        src={member.img} 
                        alt={member.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                        onError={e => {
                          e.target.style.display = 'none';
                          e.target.parentNode.style.display = 'grid';
                          e.target.parentNode.style.placeItems = 'center';
                          e.target.parentNode.style.background = 'linear-gradient(135deg, var(--navy) 0%, #1e293b 100%)';
                          const initDiv = document.createElement('div');
                          initDiv.style.fontSize = '3.5rem';
                          initDiv.style.fontWeight = '900';
                          initDiv.style.color = '#fff';
                          initDiv.innerText = member.fallback;
                          e.target.parentNode.appendChild(initDiv);
                        }}
                      />
                      {/* Plus icon on hover */}
                      <div className="plus-overlay" style={{
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                        background: 'rgba(15, 23, 42, 0.45)', display: 'grid', placeItems: 'center',
                        opacity: 0, transition: 'opacity 0.3s'
                      }}
                        onMouseEnter={e => e.currentTarget.style.opacity = 1}
                        onMouseLeave={e => e.currentTarget.style.opacity = 0}
                      >
                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#fff', display: 'grid', placeItems: 'center', color: 'var(--navy)', fontSize: '1.5rem', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
                          <i className="fa-solid fa-plus"></i>
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: '1.75rem', textAlign: 'center', background: '#fff', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <h3 style={{ fontSize: '1.15rem', color: 'var(--navy)', fontWeight: '850', marginBottom: '0.4rem' }}>{member.name}</h3>
                      <span className="status-badge bg-crimson" style={{ alignSelf: 'center', fontSize: '0.75rem', letterSpacing: '1px', fontWeight: '800' }}>
                        {member.role}
                      </span>
                      <div style={{ marginTop: '1.25rem', color: 'var(--vibrant-accent)', fontWeight: '750', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        View Profile <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.8em' }}></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── TAB CONTENT: OBJECTIVES ────────────────────────────── */}
          {activeTab === 'objectives' && (
            <div className="fade-in">
              <div className="section-header centered">
                <h2>Objectives &amp; <em>Functions</em></h2>
                <div className="section-divider" />
              </div>

              {/* Introductory Paragraph from the Original IQAC Page */}
              <div style={{
                maxWidth: '1200px',
                margin: '2rem auto 3.5rem',
                background: '#ffffff',
                borderRadius: '10px',
                padding: '2.25rem 2.75rem',
                border: '1px solid var(--light-grey)',
                boxShadow: 'var(--shadow-sm)',
                textAlign: 'justify',
                lineHeight: '1.85',
                color: 'var(--text-dark)',
                fontSize: '1.06rem',
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'start'
              }}>
                <i className="fa-solid fa-circle-info" style={{ color: 'var(--vibrant-accent)', fontSize: '1.6rem', marginTop: '4px', flexShrink: 0 }} />
                <p style={{ margin: 0, fontWeight: '500' }}>
                  The Principal of KMIT, is the Chairperson of IQAC and supported by a Co-ordinator rank professor from one of the KMIT departments. The IQAC Committee includes all stakeholders of the Institute, i.e. students, alumni, all Department and Section Heads also including the Library, Sports, Students Hostel, Examination & Evaluation, co-curricular and extra-curricular activities, members of the Management and Administration, and members of local community and industry experts.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '2.5rem', marginTop: '2rem', alignItems: 'start' }}>
                {/* Left Column: Objectives & Strategies */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                  {/* Objectives */}
                  <div style={{ background: '#fff', borderRadius: '10px', padding: '2.5rem', border: '1px solid var(--light-grey)', boxShadow: 'var(--shadow-sm)' }}>
                    <h3 style={{ color: 'var(--navy)', fontSize: '1.25rem', fontWeight: '850', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <i className="fa-solid fa-bullseye" style={{ color: 'var(--brand-orange-text)' }}></i> Objectives
                    </h3>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'none', padding: 0 }}>
                      {objectives.map((obj, idx) => (
                        <li key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'start', fontSize: '0.96rem', lineHeight: '1.6', color: 'var(--text-dark)' }}>
                          <i className="fa-solid fa-circle-check" style={{ color: 'var(--brand-orange-text)', marginTop: '4px', flexShrink: 0, fontSize: '0.85rem' }} />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Strategies */}
                  <div style={{ background: '#fff', borderRadius: '10px', padding: '2.5rem', border: '1px solid var(--light-grey)', boxShadow: 'var(--shadow-sm)' }}>
                    <h3 style={{ color: 'var(--navy)', fontSize: '1.25rem', fontWeight: '850', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <i className="fa-solid fa-chess-knight" style={{ color: 'var(--navy)' }}></i> Strategies
                    </h3>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'none', padding: 0 }}>
                      {strategies.map((strat, idx) => (
                        <li key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'start', fontSize: '0.96rem', lineHeight: '1.6', color: 'var(--text-dark)' }}>
                          <i className="fa-solid fa-circle-check" style={{ color: 'var(--navy)', marginTop: '4px', flexShrink: 0, fontSize: '0.85rem' }} />
                          <span>{strat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column: Functions & Benefits */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                  {/* Functions */}
                  <div style={{ background: '#fff', borderRadius: '10px', padding: '2.5rem', border: '1px solid var(--light-grey)', boxShadow: 'var(--shadow-sm)' }}>
                    <h3 style={{ color: 'var(--navy)', fontSize: '1.25rem', fontWeight: '850', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <i className="fa-solid fa-gears" style={{ color: 'var(--vibrant-accent)' }}></i> Functions
                    </h3>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'none', padding: 0 }}>
                      {functions.map((func, idx) => (
                        <li key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'start', fontSize: '0.96rem', lineHeight: '1.6', color: 'var(--text-dark)' }}>
                          <i className="fa-solid fa-circle-check" style={{ color: 'var(--navy)', marginTop: '4px', flexShrink: 0, fontSize: '0.85rem' }} />
                          <span>{func}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div style={{ background: '#fff', borderRadius: '10px', padding: '2.5rem', border: '1px solid var(--light-grey)', boxShadow: 'var(--shadow-sm)' }}>
                    <h3 style={{ color: 'var(--navy)', fontSize: '1.25rem', fontWeight: '850', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <i className="fa-solid fa-circle-nodes" style={{ color: '#10b981' }}></i> Benefits
                    </h3>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'none', padding: 0 }}>
                      {benefits.map((ben, idx) => (
                        <li key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'start', fontSize: '0.96rem', lineHeight: '1.6', color: 'var(--text-dark)' }}>
                          <i className="fa-solid fa-circle-check" style={{ color: '#10b981', marginTop: '4px', flexShrink: 0, fontSize: '0.85rem' }} />
                          <span>{ben}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB CONTENT: COMMITTEE ─────────────────────────────── */}
          {activeTab === 'committee' && (
            <div className="fade-in" style={{ display: 'flex', justifyContent: 'center', paddingBottom: '2.5rem' }}>
              <div style={{
                maxWidth: '650px',
                width: '100%',
                background: '#fff',
                borderRadius: '10px',
                padding: '3rem',
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--light-grey)'
              }}>
                <div style={{ 
                  width: '100%', 
                  height: '260px', 
                  borderRadius: '8px', 
                  overflow: 'hidden', 
                  marginBottom: '2.5rem',
                  border: '1px solid var(--light-grey)',
                  background: '#f8fafc',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg viewBox="0 0 600 240" style={{ width: '100%', height: '100%', display: 'block' }}>
                    <defs>
                      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.06" />
                      </filter>
                      <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--navy)" stopOpacity="0.12" />
                        <stop offset="50%" stopColor="var(--crimson)" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="var(--navy)" stopOpacity="0.12" />
                      </linearGradient>
                    </defs>

                    {/* Connecting lines */}
                    <path d="M 120 120 Q 210 120 300 120" stroke="url(#lineGrad)" strokeWidth="3" strokeDasharray="6 4" fill="none" />
                    <path d="M 190 60 Q 240 120 300 120" stroke="url(#lineGrad)" strokeWidth="3" fill="none" />
                    <path d="M 410 60 Q 360 120 300 120" stroke="url(#lineGrad)" strokeWidth="3" fill="none" />
                    <path d="M 480 120 Q 390 120 300 120" stroke="url(#lineGrad)" strokeWidth="3" strokeDasharray="6 4" fill="none" />
                    <path d="M 300 190 L 300 120" stroke="url(#lineGrad)" strokeWidth="3" fill="none" />

                    {/* Center Node */}
                    <g transform="translate(300, 120)" filter="url(#shadow)">
                      <rect x="-70" y="-26" width="140" height="52" rx="8" fill="var(--navy)" stroke="var(--vibrant-accent)" strokeWidth="1.5" />
                      <text x="0" y="-3" textAnchor="middle" fill="#ffffff" fontWeight="800" fontSize="12px" letterSpacing="0.8px">IQAC</text>
                      <text x="0" y="14" textAnchor="middle" fill="var(--vibrant-accent)" fontWeight="750" fontSize="9px" letterSpacing="0.5px">COMMITTEE</text>
                    </g>

                    {/* Node 1: Management */}
                    <g transform="translate(120, 120)" filter="url(#shadow)">
                      <circle cx="0" cy="0" r="24" fill="#ffffff" stroke="var(--light-grey)" strokeWidth="1.2" />
                      <circle cx="0" cy="0" r="19" fill="rgba(15, 23, 42, 0.04)" />
                      <rect x="-6" y="-8" width="12" height="16" rx="1.5" fill="var(--navy)" />
                      <rect x="-9" y="-3" width="18" height="11" rx="1" fill="var(--navy)" opacity="0.85" />
                      <rect x="-2" y="3" width="4" height="5" fill="#ffffff" />
                      <text x="0" y="36" textAnchor="middle" fill="var(--navy)" fontWeight="800" fontSize="9px">Management</text>
                    </g>

                    {/* Node 2: Academics */}
                    <g transform="translate(190, 60)" filter="url(#shadow)">
                      <circle cx="0" cy="0" r="24" fill="#ffffff" stroke="var(--light-grey)" strokeWidth="1.2" />
                      <circle cx="0" cy="0" r="19" fill="rgba(15, 23, 42, 0.04)" />
                      <path d="M -6 -6 L 6 -6 L 6 3 Q 0 6 -6 3 Z" fill="var(--crimson)" />
                      <rect x="-4" y="-4" width="8" height="8" fill="#ffffff" opacity="0.3" />
                      <path d="M -6 3 L 6 3 L 6 6 L -6 6 Z" fill="var(--navy)" />
                      <text x="0" y="36" textAnchor="middle" fill="var(--navy)" fontWeight="800" fontSize="9px">Academics</text>
                    </g>

                    {/* Node 3: Students & Alumni */}
                    <g transform="translate(410, 60)" filter="url(#shadow)">
                      <circle cx="0" cy="0" r="24" fill="#ffffff" stroke="var(--light-grey)" strokeWidth="1.2" />
                      <circle cx="0" cy="0" r="19" fill="rgba(15, 23, 42, 0.04)" />
                      <polygon points="0,-8 10,-3 0,2 -10,-3" fill="var(--navy)" />
                      <path d="M -6 -2 L -6 3 Q 0 6 6 3 L 6 -2" fill="var(--navy)" />
                      <line x1="6" y1="-2" x2="9" y2="3" stroke="var(--vibrant-accent)" strokeWidth="1.2" />
                      <circle cx="9" cy="3" r="1.5" fill="var(--vibrant-accent)" />
                      <text x="0" y="36" textAnchor="middle" fill="var(--navy)" fontWeight="800" fontSize="9px">Students &amp; Alumni</text>
                    </g>

                    {/* Node 4: Community */}
                    <g transform="translate(480, 120)" filter="url(#shadow)">
                      <circle cx="0" cy="0" r="24" fill="#ffffff" stroke="var(--light-grey)" strokeWidth="1.2" />
                      <circle cx="0" cy="0" r="19" fill="rgba(15, 23, 42, 0.04)" />
                      <path d="M -8 -5 L 0 -10 L 8 -5 L 8 3 Q 0 9 -8 3 Z" fill="#10b981" />
                      <path d="M -5 -2 L 0 -6 L 5 -2 L 5 2 Q 0 6 -5 2 Z" fill="#ffffff" opacity="0.4" />
                      <text x="0" y="36" textAnchor="middle" fill="var(--navy)" fontWeight="800" fontSize="9px">Community</text>
                    </g>

                    {/* Node 5: Industry */}
                    <g transform="translate(300, 190)" filter="url(#shadow)">
                      <circle cx="0" cy="0" r="24" fill="#ffffff" stroke="var(--light-grey)" strokeWidth="1.2" />
                      <circle cx="0" cy="0" r="19" fill="rgba(15, 23, 42, 0.04)" />
                      <circle cx="0" cy="0" r="6" stroke="var(--navy)" strokeWidth="2.5" fill="none" />
                      <path d="M -1.5 -8 L 1.5 -8 L 2.2 -5 L -2.2 -5 Z" fill="var(--navy)" />
                      <path d="M -1.5 5 L 1.5 5 L 2.2 8 L -2.2 8 Z" fill="var(--navy)" />
                      <path d="M -8 -1.5 L -8 1.5 L -5 2.2 L -5 -2.2 Z" fill="var(--navy)" />
                      <path d="M 5 -1.5 L 5 1.5 L 8 2.2 L 8 -2.2 Z" fill="var(--navy)" />
                      <text x="0" y="36" textAnchor="middle" fill="var(--navy)" fontWeight="800" fontSize="9px">Industry Experts</text>
                    </g>
                  </svg>
                </div>
                
                <h3 style={{ color: 'var(--navy)', fontWeight: '800', fontSize: '1.5rem', marginBottom: '1rem' }}>
                  Committees
                </h3>
                
                <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '2.5rem' }}>
                  The official structural constitution, active member portfolios, and operational committee divisions of the KMIT Internal Quality Assurance Cell.
                </p>

                <button
                  onClick={() => openDocument('/iqac/IQAC Committee.pdf', 'IQAC Committee Chart')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: 'var(--navy)',
                    color: '#ffffff',
                    padding: '1rem 2rem',
                    borderRadius: '14px',
                    border: 'none',
                    fontWeight: '800',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    boxShadow: '0 8px 16px rgba(15, 23, 42, 0.25)',
                    border: 'none'
                  }}
                  className="btn-primary-ripple"
                >
                  <i className="fa-solid fa-file-pdf"></i> View Committee Chart
                </button>
              </div>
            </div>
          )}

          {/* ── TAB CONTENT: MEETINGS ──────────────────────────────── */}
          {activeTab === 'meetings' && (
            <div className="fade-in">
              <div className="section-header centered">
                <h2>IQAC <em>Meetings</em></h2>
                <div className="section-divider" />
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', marginTop: '3rem' }}>
                {[
                  { 
                    title: 'IQAC Meeting 2024', 
                    url: '/iqac/IQAC Meetings 2024.pdf', 
                    year: '2024', 
                    type: 'Official Minutes',
                    illustration: (
                      <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', display: 'block' }}>
                        <defs>
                          <filter id="svgShadow" x="-10%" y="-10%" width="120%" height="120%">
                            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.06" />
                          </filter>
                        </defs>
                        <rect x="0" y="0" width="200" height="120" fill="#f8fafc" />
                        <g transform="translate(100, 60)" filter="url(#svgShadow)">
                          <circle cx="0" cy="0" r="38" fill="var(--navy)" stroke="var(--vibrant-accent)" strokeWidth="2.5" />
                          <text x="0" y="6" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="17px" letterSpacing="0.5px">2024</text>
                        </g>
                      </svg>
                    )
                  },
                  { 
                    title: 'IQAC Meeting 2023', 
                    url: '/iqac/IQAC Meetings 2023.pdf', 
                    year: '2023', 
                    type: 'Official Minutes',
                    illustration: (
                      <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', display: 'block' }}>
                        <rect x="0" y="0" width="200" height="120" fill="#f8fafc" />
                        <g transform="translate(100, 60)" filter="url(#svgShadow)">
                          <circle cx="0" cy="0" r="38" fill="var(--navy)" stroke="var(--vibrant-accent)" strokeWidth="2.5" />
                          <text x="0" y="6" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="17px" letterSpacing="0.5px">2023</text>
                        </g>
                      </svg>
                    )
                  },
                  { 
                    title: 'IQAC Meeting 2022', 
                    url: '/iqac/IQAC Meetings 2022.pdf', 
                    year: '2022', 
                    type: 'Official Minutes',
                    illustration: (
                      <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', display: 'block' }}>
                        <rect x="0" y="0" width="200" height="120" fill="#f8fafc" />
                        <g transform="translate(100, 60)" filter="url(#svgShadow)">
                          <circle cx="0" cy="0" r="38" fill="var(--navy)" stroke="var(--vibrant-accent)" strokeWidth="2.5" />
                          <text x="0" y="6" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="17px" letterSpacing="0.5px">2022</text>
                        </g>
                      </svg>
                    )
                  },
                  { 
                    title: 'IQAC Meeting 2021', 
                    url: '/iqac/mom -iqac-june 2021.pdf', 
                    year: '2021', 
                    type: 'Minutes of Meeting',
                    illustration: (
                      <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', display: 'block' }}>
                        <rect x="0" y="0" width="200" height="120" fill="#f8fafc" />
                        <g transform="translate(100, 60)" filter="url(#svgShadow)">
                          <circle cx="0" cy="0" r="38" fill="var(--navy)" stroke="var(--vibrant-accent)" strokeWidth="2.5" />
                          <text x="0" y="6" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="17px" letterSpacing="0.5px">2021</text>
                        </g>
                      </svg>
                    )
                  },
                  { 
                    title: 'IQAC Meeting 2020', 
                    url: '/iqac/IQAC Meetings.pdf', 
                    year: '2020', 
                    type: 'Official Minutes',
                    illustration: (
                      <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', display: 'block' }}>
                        <rect x="0" y="0" width="200" height="120" fill="#f8fafc" />
                        <g transform="translate(100, 60)" filter="url(#svgShadow)">
                          <circle cx="0" cy="0" r="38" fill="var(--navy)" stroke="var(--vibrant-accent)" strokeWidth="2.5" />
                          <text x="0" y="6" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="17px" letterSpacing="0.5px">2020</text>
                        </g>
                      </svg>
                    )
                  }
                ].map((meet, idx) => (
                  <div 
                    key={idx} 
                    className="info-card" 
                    style={{ 
                      width: '350px',
                      padding: 0,
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column', 
                      cursor: 'pointer',
                      borderRadius: '10px',
                      border: '1px solid var(--light-grey)',
                      transition: 'all 0.3s'
                    }}
                    onClick={() => openDocument(meet.url, meet.title)}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'var(--vibrant-accent)'; e.currentTarget.style.boxShadow = 'var(--shadow-lift)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--light-grey)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
                  >
                    {/* Illustration Header Area */}
                    <div style={{ height: '180px', width: '100%', borderBottom: '1px solid var(--light-grey)' }}>
                      {meet.illustration}
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: '1.5rem', textAlign: 'center', background: '#fff', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <h3 style={{ fontSize: '1.05rem', color: 'var(--navy)', fontWeight: '850', marginBottom: '0.4rem' }}>
                        {meet.title}
                      </h3>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--brand-orange-text)', fontWeight: '800', letterSpacing: '0.5px' }}>{meet.year}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>•</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '600' }}>{meet.type}</span>
                      </div>
                      <div style={{ color: 'var(--vibrant-accent)', fontWeight: '750', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        View Minutes <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.8em' }}></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── TAB CONTENT: INITIATIVES ───────────────────────────── */}
          {activeTab === 'initiatives' && (
            <div className="fade-in" style={{ display: 'flex', justifyContent: 'center', paddingBottom: '2.5rem' }}>
              <div style={{
                maxWidth: '650px',
                width: '100%',
                background: '#fff',
                borderRadius: '10px',
                padding: '3rem',
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--light-grey)'
              }}>
                <div style={{ 
                  width: '100%', 
                  height: '260px', 
                  borderRadius: '8px', 
                  overflow: 'hidden', 
                  marginBottom: '2.5rem',
                  border: '1px solid var(--light-grey)',
                  background: '#f8fafc',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg viewBox="0 0 600 240" style={{ width: '100%', height: '100%', display: 'block' }}>
                    <defs>
                      <filter id="svgShadow" x="-10%" y="-10%" width="120%" height="120%">
                        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.06" />
                      </filter>
                      <linearGradient id="chartGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="var(--navy)" />
                        <stop offset="100%" stopColor="var(--vibrant-accent)" />
                      </linearGradient>
                    </defs>

                    {/* Left Panel: Quality Score Gauge */}
                    <g transform="translate(140, 120)" filter="url(#svgShadow)">
                      <circle cx="0" cy="0" r="48" fill="#ffffff" stroke="var(--light-grey)" strokeWidth="1.2" />
                      <path d="M -30 20 A 36 36 0 1 1 30 20" fill="none" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />
                      <path d="M -30 20 A 36 36 0 1 1 15 -32" fill="none" stroke="#10b981" strokeWidth="6" strokeLinecap="round" />
                      <text x="0" y="-2" textAnchor="middle" fill="var(--navy)" fontWeight="900" fontSize="13px">98.4%</text>
                      <text x="0" y="12" textAnchor="middle" fill="var(--text-muted)" fontWeight="750" fontSize="8px" letterSpacing="0.5px">QA RATING</text>
                      <line x1="0" y1="0" x2="12" y2="-24" stroke="var(--crimson)" strokeWidth="2.5" strokeLinecap="round" />
                      <circle cx="0" cy="0" r="4" fill="var(--crimson)" />
                    </g>

                    {/* Connecting Line */}
                    <line x1="200" y1="120" x2="225" y2="120" stroke="var(--light-grey)" strokeWidth="2" strokeDasharray="5 3" />

                    {/* Center Panel: Benchmark Milestones Bar Chart */}
                    <g transform="translate(300, 120)" filter="url(#svgShadow)">
                      <rect x="-65" y="-55" width="130" height="110" rx="10" fill="#ffffff" stroke="var(--light-grey)" strokeWidth="1.2" />
                      <text x="0" y="-38" textAnchor="middle" fill="var(--navy)" fontWeight="850" fontSize="9px" letterSpacing="0.5px">PERFORMANCE</text>
                      <line x1="-45" y1="-20" x2="45" y2="-20" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="-45" y1="5" x2="45" y2="5" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="-45" y1="30" x2="45" y2="30" stroke="var(--light-grey)" strokeWidth="1.5" />
                      <rect x="-35" y="-5" width="14" height="35" rx="3" fill="var(--navy)" opacity="0.85" />
                      <text x="-28" y="-10" textAnchor="middle" fill="var(--navy)" fontWeight="800" fontSize="8px">Q1</text>
                      <rect x="-10" y="-18" width="14" height="48" rx="3" fill="var(--crimson)" />
                      <text x="-3" y="-23" textAnchor="middle" fill="var(--crimson)" fontWeight="800" fontSize="8px">Q2</text>
                      <rect x="15" y="-30" width="14" height="60" rx="3" fill="url(#chartGrad)" />
                      <text x="22" y="-35" textAnchor="middle" fill="var(--vibrant-accent)" fontWeight="800" fontSize="8px">Q3</text>
                    </g>

                    {/* Connecting Line */}
                    <line x1="375" y1="120" x2="400" y2="120" stroke="var(--light-grey)" strokeWidth="2" strokeDasharray="5 3" />

                    {/* Right Panel: Quality Protocols Checklist */}
                    <g transform="translate(460, 120)" filter="url(#svgShadow)">
                      <circle cx="0" cy="0" r="48" fill="#ffffff" stroke="var(--light-grey)" strokeWidth="1.2" />
                      <g transform="translate(0, 0)">
                        <circle cx="-16" cy="-16" r="6" fill="#10b981" />
                        <polyline points="-19,-16 -17,-14 -13,-18" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <rect x="-4" y="-19" width="28" height="6" rx="1.5" fill="var(--navy)" opacity="0.8" />
                        <circle cx="-16" cy="0" r="6" fill="#10b981" />
                        <polyline points="-19,0 -17,2 -13,-2" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <rect x="-4" y="-3" width="28" height="6" rx="1.5" fill="var(--navy)" opacity="0.8" />
                        <circle cx="-16" cy="16" r="6" fill="#10b981" />
                        <polyline points="-19,16 -17,18 -13,14" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <rect x="-4" y="13" width="28" height="6" rx="1.5" fill="var(--navy)" opacity="0.8" />
                      </g>
                    </g>
                  </svg>
                </div>
                
                <h3 style={{ color: 'var(--navy)', fontWeight: '800', fontSize: '1.5rem', marginBottom: '1rem' }}>
                  Quality Initiatives
                </h3>
                
                <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '2.5rem' }}>
                  Comprehensive standard protocols, institutional metrics, and strategic quality enhancement milestones initiated by the KMIT IQAC.
                </p>

                <button
                  onClick={() => openDocument('/iqac/IQAC_QUALITY_INITIATIVES.pdf', 'IQAC Quality Initiatives')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: 'var(--navy)',
                    color: '#ffffff',
                    padding: '1rem 2rem',
                    borderRadius: '14px',
                    border: 'none',
                    fontWeight: '800',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    boxShadow: '0 8px 16px rgba(15, 23, 42, 0.25)',
                    border: 'none'
                  }}
                  className="btn-primary-ripple"
                >
                  <i className="fa-solid fa-file-pdf"></i> View Quality Initiatives
                </button>
              </div>
            </div>
          )}

          {/* ── TAB CONTENT: NAAC & AQAR ───────────────────────────── */}
          {activeTab === 'naac' && (
            <div className="fade-in">
              <div className="section-header centered">
                <h2>NAAC</h2>
                <div className="section-divider" />
              </div>

              {/* SSR Overview Card */}
              <div style={{ 
                background: '#fff', 
                borderRadius: '10px', 
                padding: '2.5rem', 
                border: '1px solid var(--light-grey)', 
                marginBottom: '3rem',
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr) 220px',
                gap: '3rem',
                alignItems: 'center'
              }}>
                <div>
                  <h3 style={{ color: 'var(--navy)', fontWeight: '850', marginBottom: '1rem', fontSize: '1.35rem' }}>NAAC SSR Grade 'A' Certification</h3>
                  <p style={{ fontSize: '0.98rem', color: 'var(--text-dark)', lineHeight: '1.8', margin: 0, textAlign: 'justify' }}>
                    KMIT stands accredited by the National Assessment and Accreditation Council (NAAC) at <strong>Grade A</strong>. NAAC, an autonomous institution of the University Grants Commission (UGC), systematically evaluates higher learning facilities on teaching metrics, learning resources, graduation outcomes, and strategic management.
                  </p>
                </div>
                <button 
                  onClick={() => openDocument('/iqac/NAAC_SSR.pdf', 'NAAC SSR Certificate')}
                  className="btn btn-primary"
                  style={{ 
                    padding: '1rem 1.5rem', 
                    borderRadius: '12px', 
                    fontWeight: '800', 
                    fontSize: '0.88rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '10px',
                    width: '100%',
                    border: 'none'
                  }}
                >
                  <i className="fa-solid fa-file-pdf"></i> NAAC Certificate
                </button>
              </div>

              <h3 style={{ color: 'var(--navy)', fontWeight: '850', marginBottom: '1.5rem', fontSize: '1.25rem', textAlign: 'center' }}>
                Annual Quality Assurance Reports (AQAR)
              </h3>

              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
                {[
                  { 
                    title: 'AQAR Report 2023-24', 
                    url: '/iqac/AQAR_report 2023-24.pdf', 
                    year: '2023-2024',
                    illustration: (
                      <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', display: 'block' }}>
                        <defs>
                          <filter id="svgShadow" x="-10%" y="-10%" width="120%" height="120%">
                            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.06" />
                          </filter>
                        </defs>
                        <rect x="0" y="0" width="200" height="120" fill="#f8fafc" />
                        <g transform="translate(100, 60)" filter="url(#svgShadow)">
                          <circle cx="0" cy="0" r="40" fill="var(--navy)" stroke="var(--vibrant-accent)" strokeWidth="2.5" />
                          <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="12.5px" letterSpacing="0.2px">2023-2024</text>
                        </g>
                      </svg>
                    )
                  },
                  { 
                    title: 'AQAR Report 2022-23', 
                    url: '/iqac/AQAR_report 2022-23.pdf', 
                    year: '2022-2023',
                    illustration: (
                      <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', display: 'block' }}>
                        <rect x="0" y="0" width="200" height="120" fill="#f8fafc" />
                        <g transform="translate(100, 60)" filter="url(#svgShadow)">
                          <circle cx="0" cy="0" r="40" fill="var(--navy)" stroke="var(--vibrant-accent)" strokeWidth="2.5" />
                          <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="12.5px" letterSpacing="0.2px">2022-2023</text>
                        </g>
                      </svg>
                    )
                  },
                  { 
                    title: 'AQAR Report 2021-22', 
                    url: '/iqac/AQAR_report 2021-22.pdf', 
                    year: '2021-2022',
                    illustration: (
                      <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', display: 'block' }}>
                        <rect x="0" y="0" width="200" height="120" fill="#f8fafc" />
                        <g transform="translate(100, 60)" filter="url(#svgShadow)">
                          <circle cx="0" cy="0" r="40" fill="var(--navy)" stroke="var(--vibrant-accent)" strokeWidth="2.5" />
                          <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="12.5px" letterSpacing="0.2px">2021-2022</text>
                        </g>
                      </svg>
                    )
                  },
                  { 
                    title: 'AQAR Report 2020-21', 
                    url: '/iqac/AQAR_report 2020-21.pdf', 
                    year: '2020-2021',
                    illustration: (
                      <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', display: 'block' }}>
                        <rect x="0" y="0" width="200" height="120" fill="#f8fafc" />
                        <g transform="translate(100, 60)" filter="url(#svgShadow)">
                          <circle cx="0" cy="0" r="40" fill="var(--navy)" stroke="var(--vibrant-accent)" strokeWidth="2.5" />
                          <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="12.5px" letterSpacing="0.2px">2020-2021</text>
                        </g>
                      </svg>
                    )
                  },
                  { 
                    title: 'AQAR Report 2019-20', 
                    url: '/iqac/AQAR_report 2019-20.pdf', 
                    year: '2019-2020',
                    illustration: (
                      <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', display: 'block' }}>
                        <rect x="0" y="0" width="200" height="120" fill="#f8fafc" />
                        <g transform="translate(100, 60)" filter="url(#svgShadow)">
                          <circle cx="0" cy="0" r="40" fill="var(--navy)" stroke="var(--vibrant-accent)" strokeWidth="2.5" />
                          <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="12.5px" letterSpacing="0.2px">2019-2020</text>
                        </g>
                      </svg>
                    )
                  }
                ].map((report, idx) => (
                  <div 
                    key={idx} 
                    className="info-card" 
                    style={{ 
                      width: '350px',
                      padding: 0,
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column', 
                      cursor: 'pointer',
                      borderRadius: '10px',
                      border: '1px solid var(--light-grey)',
                      transition: 'all 0.3s'
                    }}
                    onClick={() => openDocument(report.url, report.title)}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'var(--vibrant-accent)'; e.currentTarget.style.boxShadow = 'var(--shadow-lift)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--light-grey)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
                  >
                    {/* Illustration Header Area */}
                    <div style={{ height: '180px', width: '100%', borderBottom: '1px solid var(--light-grey)' }}>
                      {report.illustration}
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: '1.5rem', textAlign: 'center', background: '#fff', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <h3 style={{ fontSize: '1.05rem', color: 'var(--navy)', fontWeight: '850', marginBottom: '0.4rem' }}>
                        {report.title}
                      </h3>
                      <span style={{ fontSize: '0.75rem', color: 'var(--brand-orange-text)', fontWeight: '800', marginBottom: '1rem', letterSpacing: '0.5px' }}>
                        {report.year}
                      </span>
                      <div style={{ color: 'var(--vibrant-accent)', fontWeight: '750', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        View Report <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.8em' }}></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── TAB CONTENT: UGC UNDERTAKINGS ───────────────────────── */}
          {activeTab === 'ugc' && (
            <div className="fade-in" style={{ display: 'flex', justifyContent: 'center', paddingBottom: '2.5rem' }}>
              <div style={{
                maxWidth: '650px',
                width: '100%',
                background: '#fff',
                borderRadius: '10px',
                padding: '3rem',
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--light-grey)'
              }}>
                <div style={{ 
                  width: '100%', 
                  height: '260px', 
                  borderRadius: '8px', 
                  overflow: 'hidden', 
                  marginBottom: '2.5rem',
                  border: '1px solid var(--light-grey)',
                  background: '#f8fafc',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg viewBox="0 0 600 240" style={{ width: '100%', height: '100%', display: 'block' }}>
                    <defs>
                      <filter id="svgShadow" x="-10%" y="-10%" width="120%" height="120%">
                        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.06" />
                      </filter>
                    </defs>

                    {/* Connecting Line Left to Center */}
                    <line x1="188" y1="120" x2="245" y2="120" stroke="var(--light-grey)" strokeWidth="2" strokeDasharray="5 3" />

                    {/* Connecting Line Center to Right */}
                    <line x1="355" y1="120" x2="412" y2="120" stroke="var(--light-grey)" strokeWidth="2" strokeDasharray="5 3" />

                    {/* Left Panel: Regulatory Approval & Compliance Shield */}
                    <g transform="translate(140, 120)" filter="url(#svgShadow)">
                      <circle cx="0" cy="0" r="48" fill="#ffffff" stroke="var(--light-grey)" strokeWidth="1.2" />
                      <path d="M -18 -22 L 18 -22 C 18 -22 22 2 0 24 C -22 2 -18 -22 -18 -22 Z" fill="var(--navy)" opacity="0.05" />
                      <path d="M -14 -18 L 14 -18 C 14 -18 17 2 0 19 C -17 2 -14 -18 -14 -18 Z" fill="none" stroke="var(--navy)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M -8 -13 L 8 -13 C 8 -13 10 2 0 13 C -10 2 -8 -13 -8 -13 Z" fill="none" stroke="var(--crimson)" strokeWidth="1.5" strokeDasharray="3 2" />
                      <path d="M -10 -2 L -2 6 L 12 -8" fill="none" stroke="#10b981" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                    </g>

                    {/* Center Panel: UGC Official Undertaking Certificate */}
                    <g transform="translate(300, 120)" filter="url(#svgShadow)">
                      <rect x="-55" y="-70" width="110" height="140" rx="6" fill="#ffffff" stroke="var(--light-grey)" strokeWidth="1.2" />
                      <rect x="-48" y="-63" width="96" height="126" rx="4" fill="none" stroke="var(--navy)" strokeWidth="1" opacity="0.15" />
                      <rect x="-35" y="-50" width="70" height="6" rx="3" fill="var(--navy)" opacity="0.85" />
                      <rect x="-25" y="-38" width="50" height="4" rx="2" fill="var(--crimson)" opacity="0.8" />
                      <line x1="-35" y1="-22" x2="35" y2="-22" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
                      <line x1="-35" y1="-12" x2="20" y2="-12" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
                      <line x1="-35" y1="-2" x2="30" y2="-2" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
                      <line x1="-35" y1="8" x2="15" y2="8" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
                      <line x1="-35" y1="18" x2="25" y2="18" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
                      <g transform="translate(20, 38)">
                        <path d="M -6 0 L -12 24 L -4 20 L 4 24 L -2 0 Z" fill="var(--vibrant-accent)" opacity="0.85" />
                        <path d="M 4 0 L 10 24 L 2 20 L -4 24 L 2 0 Z" fill="var(--vibrant-accent)" opacity="0.85" />
                        <circle cx="0" cy="0" r="10" fill="var(--vibrant-accent)" stroke="#ffffff" strokeWidth="1.5" />
                        <path d="M 0 -5 L 1.5 -1.5 L 5 -1.5 L 2 1 L 3.5 5 L 0 3 L -3.5 5 L -2 1 L -5 -1.5 L -1.5 -1.5 Z" fill="#ffffff" />
                      </g>
                    </g>

                    {/* Right Panel: Certified Approval Stamp */}
                    <g transform="translate(460, 120)" filter="url(#svgShadow)">
                      <circle cx="0" cy="0" r="48" fill="#ffffff" stroke="var(--light-grey)" strokeWidth="1.2" />
                      <circle cx="0" cy="0" r="36" fill="none" stroke="var(--vibrant-accent)" strokeWidth="2" strokeDasharray="5 3" />
                      <circle cx="0" cy="0" r="30" fill="none" stroke="var(--navy)" strokeWidth="1" />
                      <text x="0" y="-8" textAnchor="middle" fill="var(--navy)" fontWeight="900" fontSize="10px" letterSpacing="0.5px">UGC</text>
                      <line x1="-15" y1="0" x2="15" y2="0" stroke="var(--light-grey)" strokeWidth="1" />
                      <text x="0" y="12" textAnchor="middle" fill="var(--crimson)" fontWeight="900" fontSize="8px" letterSpacing="1px">COMPLIANT</text>
                      <text x="0" y="22" textAnchor="middle" fill="var(--text-muted)" fontWeight="750" fontSize="6px" letterSpacing="0.5px">VERIFIED</text>
                      <circle cx="-20" cy="0" r="2.5" fill="#10b981" />
                      <circle cx="20" cy="0" r="2.5" fill="#10b981" />
                    </g>
                  </svg>
                </div>
                
                <h3 style={{ color: 'var(--navy)', fontWeight: '800', fontSize: '1.5rem', marginBottom: '1rem' }}>
                  UGC Undertakings
                </h3>
                
                <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '2.5rem' }}>
                  Official institutional compliance certifications, guarantees, regulatory statements, and declarations filed with the University Grants Commission (UGC).
                </p>

                <button
                  onClick={() => openDocument('/iqac/UGC_Undertaking.pdf', 'Official UGC Undertaking')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: 'var(--navy)',
                    color: '#ffffff',
                    padding: '1rem 2rem',
                    borderRadius: '14px',
                    border: 'none',
                    fontWeight: '800',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    boxShadow: '0 8px 16px rgba(15, 23, 42, 0.25)',
                    border: 'none'
                  }}
                  className="btn-primary-ripple"
                >
                  <i className="fa-solid fa-file-pdf"></i> View UGC Undertakings
                </button>
              </div>
            </div>
          )}

          {/* ── TAB CONTENT: AUDITS ────────────────────────────────── */}
          {activeTab === 'audit' && (
            <div className="fade-in">
              <div className="section-header centered">
                <h2>Academic and Administrative Audit Report</h2>
                <div className="section-divider" />
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', marginTop: '3rem' }}>
                {[
                  { 
                    title: 'External Audit Report 2022-23', 
                    url: '/iqac/Administrative Audit Report 2022-23.pdf', 
                    year: '2022-2023',
                    illustration: (
                      <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', display: 'block' }}>
                        <defs>
                          <filter id="svgShadow" x="-10%" y="-10%" width="120%" height="120%">
                            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.06" />
                          </filter>
                        </defs>
                        <rect x="0" y="0" width="200" height="120" fill="#f8fafc" />
                        <g transform="translate(100, 60)" filter="url(#svgShadow)">
                          <circle cx="0" cy="0" r="40" fill="var(--navy)" stroke="var(--vibrant-accent)" strokeWidth="2.5" />
                          <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="12.5px" letterSpacing="0.2px">2022-2023</text>
                        </g>
                      </svg>
                    )
                  },
                  { 
                    title: 'External Audit Report 2021-22', 
                    url: '/iqac/Administrative Audit Report 2021-22.pdf', 
                    year: '2021-2022',
                    illustration: (
                      <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', display: 'block' }}>
                        <rect x="0" y="0" width="200" height="120" fill="#f8fafc" />
                        <g transform="translate(100, 60)" filter="url(#svgShadow)">
                          <circle cx="0" cy="0" r="40" fill="var(--navy)" stroke="var(--vibrant-accent)" strokeWidth="2.5" />
                          <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="12.5px" letterSpacing="0.2px">2021-2022</text>
                        </g>
                      </svg>
                    )
                  }
                ].map((audit, idx) => (
                  <div 
                    key={idx} 
                    className="info-card" 
                    style={{ 
                      width: '350px',
                      padding: 0,
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column', 
                      cursor: 'pointer',
                      borderRadius: '10px',
                      border: '1px solid var(--light-grey)',
                      transition: 'all 0.3s'
                    }}
                    onClick={() => openDocument(audit.url, audit.title)}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'var(--vibrant-accent)'; e.currentTarget.style.boxShadow = 'var(--shadow-lift)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--light-grey)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
                  >
                    {/* Illustration Header Area */}
                    <div style={{ height: '180px', width: '100%', borderBottom: '1px solid var(--light-grey)' }}>
                      {audit.illustration}
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: '1.5rem', textAlign: 'center', background: '#fff', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <h3 style={{ fontSize: '1.05rem', color: 'var(--navy)', fontWeight: '850', marginBottom: '0.4rem' }}>
                        {audit.title}
                      </h3>
                      <span style={{ fontSize: '0.75rem', color: 'var(--brand-orange-text)', fontWeight: '800', marginBottom: '1rem', letterSpacing: '0.5px' }}>
                        {audit.year}
                      </span>
                      <div style={{ color: 'var(--vibrant-accent)', fontWeight: '750', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        View Report <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.8em' }}></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── PORTAL MODAL PDF OVERLAY ──────────────────────────── */}
      {selectedPdf && createPortal(
        <div className="pdf-modal-backdrop" onClick={() => setSelectedPdf(null)}>
          <div className="pdf-modal-card" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="pdf-modal-header">
              <span className="pdf-modal-title">
                {selectedPdf.title}
              </span>
              
              <div className="pdf-modal-actions">
                <a
                  href={getAbsoluteUrl(selectedPdf.url)}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pdf-download-btn"
                >
                  <i className="fa-solid fa-download"></i>
                  <span className="pdf-download-btn-text">Download PDF</span>
                </a>

                <button
                  onClick={() => setSelectedPdf(null)}
                  className="pdf-close-btn"
                >
                  &times;
                </button>
              </div>
            </div>

            {/* Modal Body Wrapping Custom PDFJS Viewer */}
            <div style={{ flex: '1', background: '#f3f4f6', position: 'relative' }}>
              <SafePdfViewer
                src={getViewerUrl(selectedPdf.url)}
                title={selectedPdf.title}
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
            </div>
            
          </div>
        </div>,
        document.body
      )}
    </PageShell>
  )
}
