import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PageShell from './PageShell'
import './ResearchLabsPage.css'
import ResearchPublicationsSection from './ResearchPublicationsSection'
import ScrollReveal from '../ScrollReveal'

export default function ResearchLabsPage() {
  const location = useLocation()
  const navigate = useNavigate()

  // Helper function to extract and match valid lab keys from the URL pathname or query parameters
  const getLabKeyFromUrl = (pathname, search) => {
    // 1. Check query parameter ?lab=...
    const params = new URLSearchParams(search)
    const labQuery = params.get('lab')
    if (labQuery && ['biomedical-imaging', 'bioinformatics', 'cfd', 'iot'].includes(labQuery)) {
      return labQuery
    }

    // 2. Check pathname keywords (handling direct page visits and legacy PHP files)
    const path = pathname.toLowerCase()
    if (path.includes('biomedicalimaging') || path.includes('biomedical-imaging')) {
      return 'biomedical-imaging'
    }
    if (path.includes('bioinformatics')) {
      return 'bioinformatics'
    }
    if (path.includes('cfd')) {
      return 'cfd'
    }
    if (path.includes('iot')) {
      return 'iot'
    }
    return null
  }

  // Initialize selected lab state directly from the URL coordinates
  const [activeLabKey, setActiveLabKey] = useState(() => {
    return getLabKeyFromUrl(window.location.pathname, window.location.search)
  })

  // Synchronize state dynamically when the URL changes (e.g. forward/back browser buttons)
  useEffect(() => {
    const matchedKey = getLabKeyFromUrl(location.pathname, location.search)
    if (matchedKey !== activeLabKey) {
      setActiveLabKey(matchedKey)
    }
  }, [location.pathname, location.search])

  // Smooth scroll to top of details area when switching labs
  useEffect(() => {
    if (activeLabKey) {
      const el = document.getElementById('active-lab-details-view')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [activeLabKey])

  // Navigation click handler to keep URL in absolute sync with user actions
  const handleLabSelect = (key) => {
    if (key) {
      navigate(`/research/labs?lab=${key}`)
    } else {
      navigate('/research/labs')
    }
  }

  const labs = [
    {
      key: 'biomedical-imaging',
      title: 'Biomedical Imaging Informatics',
      image: '/photos/research/biomedical.svg',
      icon: 'fa-microscope',
      badge: 'BIRAC Awarded',
      desc: 'Digital Biomedical Images and Onco-Genomics Research. Radiology & Pathology biomarkers CAD system powered by AI and Deep Learning algorithms.',
      about: [
        'Digital Medical imaging is one of the fastest-moving areas of discovery, offering radiologists, pathologists, ophthalmologists, and practitioners in other image-rich disciplines the opportunity to augment their workflows with algorithms that are getting better every day. Applying Artificial Intelligence (AI) and computer vision on these digital medical images have long been envisaged as a root to faster, more accurate diagnoses.',
        'Being on the leading edge of innovation often means solving problems that no one in the industry has encountered before. "Machine learning algorithms will transform clinical imaging practice over the next decade" by reducing diagnostic errors, improving patient outcomes, enhancing efficiency and lowering costs.',
        'Aligning with the KMIT Vision of producing globally competent engineers and striving to make India a world leader in software products and services, we propose to setup a Biomedical Informatics Research Lab. This lab would serve the country’s need on Biomedical Informatics education and research and would position itself as a Center of AI for Biomedical Informatics, by producing highly-skilled Medical Informaticians and carrying out world-class research in Biomedical Imaging Informatics, Cancer Informatics, Clinical informatics, Healthcare Informatics, Neuro-Imaging Informatics and Bioinformatics ("Omics" study).',
        'Starting with the carrying out of research and executing projects in Biomedical Imaging Informatics by adopting various computational/AI (Artificial Intelligence) techniques like Machine Learning, Deep Learning in Biomedical/Clinical/pathological images processing, these projects would facilitate and identify, disease classification, grading/growth, further enabling subsequent clinical treatment, procedures, cure/prevention of disease growth etc. Primarily focused on Brain Tumor and Breast Cancer images. Subsequently, we will extend the research and project execution fields into Pathomics (Data Science of Digital Pathology), Radiomics (Radiology and Neuro-Genomics) and other areas of Biomedical Informatics.',
        'We have been involved in the development of Clinical Translational Research CAD (Computer Aided Disease Detection & Diagnostics System) for various cancers. The said CAD system is an AI powered, end-to-end clinical diganostics workflow in line with CAP (College of American Pathologists) protocol, include all biomedical imaging (Pathology, Radiology) biomarkers identification for various cancers, initially for Breast Cancer. We have been awarded with INR 5 million for this project by BIRAC (Bio-technology Industry Research Assistance Council), Dept. of Biotechnology, Govt. of India.',
        'Note: Dr.Rohit Tapadia, Tapadia Diagnostics Center, Hyderabad is providing clinical protocol guidance and also validating the entire product development. We also collaborating with few named Cancer Hospitals across the region.'
      ],
      faculty: [
        { sno: 1, name: 'Dr S Rajasekaran', role: 'Research Lead' },
        { sno: 2, name: 'Dr R Devika Rubi', role: 'Faculty Member' }
      ],
      students: [
        { sno: 1, roll: '17BD1A050T', name: 'Kanneganti Sai Rohith' },
        { sno: 2, roll: '17BD1A051A', name: 'Pingali Raghavendra Suraj' },
        { sno: 3, roll: '17BD1A051E', name: 'Priyal Jain' },
        { sno: 4, roll: '17BD1A057Q', name: 'Swathi Gupta' },
        { sno: 5, roll: '17BD1A050U', name: 'Kasavaraju Abhay Krishna' },
        { sno: 6, roll: '17BD1A050Q', name: 'Kala Samyak Jain' },
        { sno: 7, roll: '17BD1A051N', name: 'Sri Laxmi Sai Sahithi Dendukuru' },
        { sno: 8, roll: '17BD1A0432', name: 'Kota Ruchik' },
        { sno: 9, roll: '18BD1A0561', name: 'A Sai Vijaya Bhargavi' },
        { sno: 10, roll: '18BD1A050P', name: 'Kathoroju Harsha Vardhan' },
        { sno: 11, roll: '18BD1A051A', name: 'Telukunta Vijay Abhinav' },
        { sno: 12, roll: '18BD1A055E', name: 'Srinivas Yadav' },
        { sno: 13, roll: '18BD1A051N', name: 'Vivek Rupender Gopu' },
        { sno: 14, roll: '18BD1A051W', name: 'Yerramallu M S S Krishna Deep' }
      ]
    },
    {
      key: 'bioinformatics',
      title: 'Bioinformatics',
      image: '/photos/research/bioinformatics.svg',
      icon: 'fa-dna',
      badge: 'Omics Research',
      desc: 'Interdisciplinary science combining biology, computer science, and statistics. Focused on Onco-Genomics and Agri-Genomics projects.',
      about: [
        'Bioinformatics is an interdisciplinary field that develops methods and software tools for understanding biological data, in particular, when the data sets are large and complex. As an interdisciplinary field of science, bioinformatics combines biology, computer science, information engineering, mathematics and statistics to analyze and interpret the biological data.',
        'Bioinformatics has been used for in-silico analyses of biological queries using mathematical and statistical techniques.',
        'Our Computer Science Engineering, Chemistry faculties are actively involved in the development of Onco-Genomics and Agri-Genomics Projects, aiming to solve biological queries via innovative computational solutions.'
      ],
      faculty: [
        { sno: 1, name: 'Dr S Rajasekaran', role: 'Lead Investigator' },
        { sno: 2, name: 'Dr R Devika Rubi', role: 'Faculty Member' },
        { sno: 3, name: 'Dr Sneha Gogte', role: 'Faculty Member' },
        { sno: 4, name: 'Dr Kiranmayee', role: 'Faculty Member' },
        { sno: 5, name: 'Dr Swapna', role: 'Faculty Member' },
        { sno: 6, name: 'Dr Vasantha', role: 'Faculty Member' },
        { sno: 7, name: 'Dr Srinivasulu', role: 'Faculty Member' },
        { sno: 8, name: 'Dr Narender', role: 'Faculty Member' },
        { sno: 9, name: 'Dr Wajid', role: 'Faculty Member' }
      ],
      students: [] // empty student list, premium empty state rendered
    },
    {
      key: 'cfd',
      title: 'Computational Fluid Dynamics (CFD)',
      image: '/photos/research/cfd.svg',
      icon: 'fa-wind',
      badge: 'Defence Collaborations',
      desc: 'Advanced tactical missile research and simulation. Highly efficient parallel processing systems using Nvidia CUDA C++ programming.',
      about: [
        'Computational fluid dynamics (CFD) is increasingly applied throughout the development cycle of advanced tactical missiles. This increased reliance on CFD is due, in part, to the increased demands being made on the missiles for higher speed, greater manoeuvrability, multiple missions, and the maturity of the CFD discipline.',
        'Recent CFD developments in multi-zone structured, unstructured, and adaptive grids, along with multiprocessor algorithms, have drastically reduced the time required to obtain results.',
        'Our Computer Science Engineering department works actively with premier defence research organizations in improving and upgrading the efficiency of the existing simulation systems using CUDA and NVidia GPU programming.'
      ],
      faculty: [
        { sno: 1, name: 'Dr JVS Srinivas', role: 'Research Lead' },
        { sno: 2, name: 'Dr S Rajasekaran', role: 'Faculty Member' },
        { sno: 3, name: 'Prof Ajit Jain', role: 'Faculty Member' },
        { sno: 4, name: 'Mr Kedar Phadke', role: 'Faculty Member' },
        { sno: 5, name: 'Mr Balaram Murthy', role: 'Faculty Member' },
        { sno: 6, name: 'Ms Asha Jyothi', role: 'Faculty Member' },
        { sno: 7, name: 'Ms Priyanka Saxena', role: 'Faculty Member' }
      ],
      students: [
        { sno: 1, roll: '18BD1A0519', name: 'Shubham' },
        { sno: 2, roll: '18BD1A05B5', name: 'Pranay' },
        { sno: 3, roll: '18BD1A05B5', name: 'Parvataneni Trishool' },
        { sno: 4, roll: '18BD1A05B2', name: 'P Sai Varshith' },
        { sno: 5, roll: '18BD1A050K', name: 'K Sudarshan' },
        { sno: 6, roll: '18BD1A052C', name: 'Devaki Mithilesh Kumar' }
      ]
    },
    {
      key: 'iot',
      title: 'IoT & Robotics',
      image: '/photos/research/iot.svg',
      icon: 'fa-robot',
      badge: 'Active R&D Cell',
      desc: 'Internet of Things and Robotic systems. Development of advanced automated projects: Abhimanyu, Agribot, Omni and Canine robos.',
      about: [
        'The Internet of Things has already started playing an important role in our daily lives. The number of IoT interconnected devices such as sensors for weather mapping, agriculture, security, and industrial commercial and defence applications is more than 50 billion. Robotics is an allied domain and has given birth to another domain called Internet of Robotic Things.',
        'The R&D centre at KMIT has been actively working on related projects. Students are provided logistic support as well as guidance to acquire knowledge and expertise in these areas.',
        'Some of the IoT - Robotics projects at KMIT R&D include: Abhimanyu, Agribot, Spider robo, Canine robo, Walking robo, Omni robo.',
        'This division is led by Prof Vinay Patankar and he is assisted by Mr Ramesh Mende, Mr K Chandrasekhar, Mr Prabhakar Deshpande.'
      ],
      faculty: [
        { sno: 1, name: 'Prof Vinay Patankar', role: 'Division Head' },
        { sno: 2, name: 'Mr Ramesh Mende', role: 'Faculty Member' },
        { sno: 3, name: 'Mr K Chandrasekhar', role: 'Faculty Member' },
        { sno: 4, name: 'Mr Prabhakar Deshpande', role: 'Faculty Member' }
      ],
      students: [
        { sno: 1, roll: '16BD1A0402', name: 'Afreen Ilias' },
        { sno: 2, roll: '16BD1A0473', name: 'O Kumara Ruthwik' },
        { sno: 3, roll: '17BD1A0449', name: 'Priya Varenya' },
        { sno: 4, roll: '17BD1A0432', name: 'K Ruchik' },
        { sno: 5, roll: '17BD1A0408', name: 'Ch Shashank' },
        { sno: 6, roll: '17BD1A0436', name: 'Manish Manda' }
      ]
    }
  ]

  const activeLab = labs.find(l => l.key === activeLabKey)

  return (
    <PageShell
      eyebrow="R&amp;D Facilities"
      title="Research Labs"
      description="State-of-the-art incubation divisions and specialised advanced technology labs driving innovation at KMIT."
      breadcrumbs={[
        { label: 'Research', to: '/research' },
        { label: 'Research Labs' }
      ]}
    >
      <style>{`
        .lab-sidebar-container {
          display: flex;
          gap: 2.5rem;
          margin-top: 2rem;
          align-items: start;
        }
        .lab-sidebar {
          width: 320px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: #ffffff;
          border: 1px solid var(--light-grey);
          border-radius: 8px;
          padding: 1.25rem;
          box-shadow: var(--shadow-sm);
        }
        .lab-tab-btn {
          width: 100%;
          border: none;
          background: transparent;
          padding: 1.1rem 1.25rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 800;
          font-size: 0.92rem;
          display: flex;
          align-items: center;
          gap: 12px;
          text-align: left;
          color: var(--text-muted);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .lab-tab-btn i {
          font-size: 1.2rem;
          width: 24px;
          text-align: center;
        }
        .lab-tab-btn.active {
          background: var(--navy);
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(11, 31, 58, 0.2);
        }
        .lab-tab-btn.active i {
          color: var(--vibrant-accent);
        }
        .lab-tab-btn:hover:not(.active) {
          background: #f8fafc;
          color: var(--navy);
        }
        .lab-content-area {
          flex-grow: 1;
          background: #ffffff;
          border: 1px solid var(--light-grey);
          border-radius: 8px;
          padding: 3rem;
          box-shadow: var(--shadow-sm);
        }
        .lab-badge {
          background: rgba(252, 119, 0, 0.1);
          color: var(--vibrant-accent);
          padding: 6px 14px;
          border-radius: 30px;
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .student-roster-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        .student-micro-card {
          background: var(--off-white);
          border: 1px solid var(--light-grey);
          border-radius: 6px;
          padding: 1.2rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.25s ease;
        }
        .student-micro-card:hover {
          border-color: var(--vibrant-accent);
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
          background: #ffffff;
        }
        .student-micro-card i {
          font-size: 1.4rem;
          color: var(--navy);
        }
        .back-labs-btn:hover {
          background: #091224 !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(11,31,58,0.2) !important;
        }
        .back-labs-btn {
          transition: all 0.25s ease;
        }

        /* Swipable Row on Mobiles */
        @media (max-width: 1024px) {
          .lab-sidebar-container {
            flex-direction: column;
            gap: 1.5rem;
          }
          .lab-sidebar {
            width: 100%;
            flex-direction: row;
            overflow-x: auto;
            white-space: nowrap;
            scrollbar-width: none;
            -ms-overflow-style: none;
            padding: 8px;
            border-radius: 8px;
          }
          .lab-sidebar::-webkit-scrollbar {
            display: none;
          }
          .lab-tab-btn {
            flex: 0 0 auto;
            width: auto;
            padding: 0.8rem 1.2rem;
            border-radius: 6px;
            font-size: 0.85rem;
          }
          .lab-content-area {
            padding: 2rem 1.5rem;
            border-radius: 8px;
          }
        }
      `}</style>

      {/* ── VIEW 1: OVERVIEW LABS CARD GRID ─────────────────────── */}
      {!activeLabKey ? (
        <section className="page-section fade-in">
          <div className="container">
            <div className="section-header centered" style={{ marginBottom: '3.5rem' }}>
              <div className="section-eyebrow" style={{ justifyContent: 'center' }}><i className="fa-solid fa-flask-vial" /> Research Centres</div>
              <h2>KMIT Specialized <em>Divisions</em></h2>
              <div className="section-divider" style={{ margin: '0.75rem auto' }} />
              <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '1rem auto 0 auto', fontSize: '0.98rem', lineHeight: '1.6' }}>
                Explore KMIT's state-of-the-art incubation cells driving high-performance research in computer graphics, medical AI, genomics, and IoT frameworks.
              </p>
            </div>

            <div className="research-labs-grid">
              {labs.map((lab, idx) => (
                <ScrollReveal key={idx} animation="fade-up" style={{ height: '100%' }}>
                <div className="research-lab-card" style={{ cursor: 'pointer', height: '100%' }} onClick={() => handleLabSelect(lab.key)}>
                  <div className="research-lab-img-wrapper">
                    <img src={lab.image} alt={lab.title} className="research-lab-img" />
                    <div className="research-lab-overlay">
                      <img src="/assets/plus.png" alt="View Details" className="research-lab-plus" />
                    </div>
                  </div>
                  <div className="research-lab-content" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                      <span className="status-badge bg-crimson" style={{ fontSize: '0.68rem', letterSpacing: '0.5px', padding: '3px 8px', fontWeight: '800' }}>
                        {lab.badge}
                      </span>
                    </div>
                    <h3 className="research-lab-title" style={{ fontSize: '1.05rem', color: 'var(--navy)', fontWeight: '850', marginBottom: '0.8rem', lineHeight: '1.4' }}>{lab.title}</h3>
                    <p className="research-lab-desc" style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.6', flexGrow: 1 }}>{lab.desc}</p>
                    <div style={{ marginTop: '1.25rem', color: 'var(--vibrant-accent)', fontWeight: '750', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      Open Lab Portfolio <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.85em' }} />
                    </div>
                  </div>
                </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      ) : (
        /* ── VIEW 2: INTERACTIVE TAB PORTAL SWITCER ────────────────── */
        <section className="page-section fade-in" id="active-lab-details-view" style={{ paddingTop: '1.5rem' }}>
          <div className="container">
            {/* Back Button */}
            <div style={{ marginBottom: '1.5rem' }}>
              <button 
                onClick={() => handleLabSelect(null)}
                className="back-labs-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'var(--navy)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '6px',
                  fontWeight: '800',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <i className="fa-solid fa-arrow-left" /> Back to Research Hub
              </button>
            </div>

            <div className="lab-sidebar-container">
              {/* Left Panel Sidebar */}
              <ScrollReveal animation="fade-right">
              <div className="lab-sidebar">
                {labs.map(l => (
                  <button
                    key={l.key}
                    onClick={() => handleLabSelect(l.key)}
                    className={`lab-tab-btn ${activeLabKey === l.key ? 'active' : ''}`}
                  >
                    <i className={`fa-solid ${l.icon}`} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {l.title.replace('Computational Fluid Dynamics (CFD)', 'CFD Lab')}
                    </span>
                  </button>
                ))}
              </div>
              </ScrollReveal>

              {/* Right Panel Main Content Area */}
              <ScrollReveal animation="fade-left" style={{ flexGrow: 1 }}>
              <div className="lab-content-area">
                {activeLab && (
                  <div className="fade-in" key={activeLab.key}>
                    {/* Header Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--light-grey)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
                      <div>
                        <h2 style={{ fontSize: '1.8rem', color: 'var(--navy)', fontWeight: '900', margin: 0, fontFamily: 'var(--font-serif)' }}>
                          {activeLab.title}
                        </h2>
                      </div>
                      <span className="lab-badge">{activeLab.badge}</span>
                    </div>

                    {/* About Content */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      <h4 style={{ color: 'var(--navy)', fontWeight: '850', margin: 0, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
                        <i className="fa-solid fa-circle-info" style={{ color: 'var(--vibrant-accent)' }} /> Lab Profile &amp; Abstract
                      </h4>
                      {activeLab.about.map((para, pIdx) => (
                        <p key={pIdx} style={{ fontSize: '0.96rem', color: 'var(--text-dark)', lineHeight: '1.8', margin: 0, textAlign: 'justify' }}>
                          {para}
                        </p>
                      ))}
                    </div>

                    {/* Faculty Members Table */}
                    <div style={{ marginTop: '3.5rem' }}>
                      <h4 style={{ color: 'var(--navy)', fontWeight: '850', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
                        <i className="fa-solid fa-chalkboard-user" style={{ color: 'var(--brand-orange-text)' }} /> Assigned Faculty Members
                      </h4>
                      <div className="table-responsive" style={{ border: '1px solid var(--light-grey)', borderRadius: '8px', overflowX: 'auto', boxShadow: 'var(--shadow-sm)' }}>
                        <table className="table table-striped" style={{ margin: 0 }}>
                          <thead>
                            <tr style={{ background: 'var(--navy)', color: '#ffffff', borderBottom: 'none' }}>
                              <th style={{ padding: '1rem 1.25rem', fontWeight: '800', fontSize: '0.88rem', border: 'none', width: '90px' }}>S.No</th>
                              <th style={{ padding: '1rem 1.25rem', fontWeight: '800', fontSize: '0.88rem', border: 'none' }}>Name of the Faculty</th>
                              <th style={{ padding: '1rem 1.25rem', fontWeight: '800', fontSize: '0.88rem', border: 'none', width: '220px' }}>Designation / Portfolio</th>
                            </tr>
                          </thead>
                          <tbody>
                            {activeLab.faculty.map((fac, fIdx) => (
                              <tr key={fIdx} style={{ borderBottom: '1px solid var(--light-grey)', background: fIdx % 2 === 0 ? '#fcfcfd' : '#ffffff' }}>
                                <td style={{ padding: '0.95rem 1.25rem', color: 'var(--text-dark)', fontWeight: '750', fontSize: '0.92rem' }}>{fac.sno}</td>
                                <td style={{ padding: '0.95rem 1.25rem', color: 'var(--navy)', fontWeight: '800', fontSize: '0.92rem' }}>{fac.name}</td>
                                <td style={{ padding: '0.95rem 1.25rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.88rem' }}>
                                  <span className="status-badge bg-crimson" style={{ fontSize: '0.65rem', padding: '2px 8px', letterSpacing: '0.5px' }}>{fac.role}</span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Student Members */}
                    <div style={{ marginTop: '3.5rem' }}>
                      <h4 style={{ color: 'var(--navy)', fontWeight: '850', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
                        <i className="fa-solid fa-users-gear" style={{ color: '#10b981' }} /> Student Researchers &amp; Associates
                      </h4>
                      
                      {activeLab.students.length === 0 ? (
                        <div style={{
                          background: '#f8fafc',
                          border: '1px dashed var(--light-grey)',
                          borderRadius: '8px',
                          padding: '2.5rem',
                          textAlign: 'center',
                          marginTop: '1.5rem'
                        }}>
                          <i className="fa-solid fa-people-arrows" style={{ fontSize: '2rem', color: '#9ca3af', marginBottom: '0.75rem' }} />
                          <h5 style={{ color: 'var(--navy)', fontWeight: '800', margin: '0 0 0.35rem 0' }}>Enrolling R&amp;D Associates</h5>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>
                            New-semester R&amp;D student placement project cycles are currently in open selection status.
                          </p>
                        </div>
                      ) : (
                        <div className="student-roster-grid">
                          {activeLab.students.map((stu, sIdx) => (
                            <ScrollReveal key={sIdx} animation="fade-up" delay={sIdx * 50}>
                            <div className="student-micro-card">
                              <div style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '50%',
                                background: 'rgba(11, 31, 58, 0.05)',
                                display: 'grid',
                                placeItems: 'center',
                                flexShrink: 0
                              }}>
                                <i className="fa-solid fa-user-graduate" style={{ fontSize: '1rem', color: 'var(--navy)' }} />
                              </div>
                              <div style={{ overflow: 'hidden' }}>
                                <h5 style={{ margin: '0 0 2px 0', fontSize: '0.92rem', color: 'var(--navy)', fontWeight: '800', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  {stu.name}
                                </h5>
                                <span style={{ fontSize: '0.72rem', color: 'var(--brand-orange-text)', fontWeight: '750', letterSpacing: '0.5px' }}>
                                  ROLL: {stu.roll}
                                </span>
                              </div>
                            </div>
                            </ScrollReveal>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      )}

      {/* Publications Section */}
      <ResearchPublicationsSection />
    </PageShell>
  )
}
