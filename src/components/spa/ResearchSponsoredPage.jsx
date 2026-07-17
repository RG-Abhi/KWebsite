import React, { useState } from 'react'
import PageShell from './PageShell'
import './ResearchSponsoredPage.css'
import ResearchPublicationsSection from './ResearchPublicationsSection'
import ScrollReveal from '../ScrollReveal'

export default function ResearchSponsoredPage() {
  const [activeMainTab, setActiveMainTab] = useState('projects'); // 'projects', 'birac', 'tools'
  const [activeYear, setActiveYear] = useState('2024-25');

  const biracTeam = {
    faculty: [
      { name: 'Dr. S. Rajasekaran', role: 'Principal Investigator', dept: 'Research & Development' },
      { name: 'Dr. Rohit Tapadia', role: 'Co-Investigator', dept: 'Computer Science' },
      { name: 'Dr. R. Devika Rubi', role: 'Core Investigator', dept: 'Information Technology' },
      { name: 'Prof. Vinay Patankar', role: 'Advisory Convener', dept: 'Research & Development' }
    ],
    students: [
      { id: '17BD1A050T', name: 'Mr. Kanneganti Sai Rohith' },
      { id: '17BD1A051A', name: 'Mr. Pingali Raghavendra Suraj' },
      { id: '17BD1A051E', name: 'Mr. Priyal Jain' },
      { id: '17BD1A057Q', name: 'Ms. Swathi Gupta' },
      { id: '17BD1A050U', name: 'Mr. Kasavaraju Abhay Krishna' },
      { id: '17BD1A050Q', name: 'Mr. Kala Samyak Jain' },
      { id: '17BD1A051N', name: 'Ms. Sri Laxmi Sai Sahithi Dendukuru' },
      { id: '17BD1A0432', name: 'Mr. Kota Ruchik' },
      { id: '18BD1A0561', name: 'Mr. A Sai Vijaya Bhargavi' },
      { id: '18BD1A050P', name: 'Mr. Kathoroju Harsha Vardhan' },
      { id: '18BD1A051A', name: 'Mr. Telukunta Vijay Abhinav' },
      { id: '18BD1A055E', name: 'Mr. Srinivas Yadav' },
      { id: '18BD1A051N', name: 'Mr. Vivek Rupender Gopu' }
    ]
  };

  const eduTools = [
    {
      title: 'Telescope',
      icon: 'fa-tv',
      tagline: 'Scheduled Distance Learning & E-Classroom Platform',
      launch: '2016',
      developer: 'Teleparadigm Networks',
      desc: 'Telescope is KMIT’s proprietary distance learning system developed in alliance with Teleparadigm Networks. It enables interactive, pre-scheduled live classrooms powered by Adobe Connect integration, supporting low-latency video lectures and seamless collaborative learning.',
      features: [
        'Interactive Live Video & Crystal Clear Audio broadcasting',
        'Real-time Chat & Interactive Student Polls during classes',
        'Automatic Session Recording & Archiving for review',
        'Automated Classroom Attendance tracking & reporting',
        'Multi-screen Sharing and dynamic whiteboard utilities'
      ]
    },
    {
      title: 'Tessellator',
      icon: 'fa-laptop-code',
      tagline: 'Code-Integrated Learning Management System (LMS)',
      developer: 'KMIT In-House Team',
      desc: 'Tessellator is KMIT\'s advanced Learning Management System built upon MOODLE. Rather than serving as a basic file repository, Tessellator is fully customized with in-house compiler modules to automate programming education.',
      features: [
        'Integrated code compilation & sandboxed execution for Java and C',
        'Automated evaluation of programming assignments & coding challenges',
        'Real-time student progress tracking & gradebook visualization',
        'Custom interactive coding quizzes with plagiarism checks',
        'Course material organization and automated deadline alerts'
      ]
    }
  ];

  const projectYears = {
    '2024-25': [
      {
        title: 'Detection and Classification of Weld defects from X-Ray Images Using Machine/Deep Learning',
        type: 'Sponsored Research',
        agency: 'Defence Research and Development Laboratory (DRDL)',
        amount: '₹14,98,600',
        duration: '12 Months',
        status: 'Ongoing'
      }
    ],
    '2023-24': [
      {
        title: 'A Multi-GPU Implementation of Cerans Solver',
        type: 'Sponsored Research',
        agency: 'Defence Research and Development Laboratory (DRDL)',
        amount: '₹19,99,000',
        duration: '2 Years',
        status: 'Ongoing'
      },
      {
        title: 'Software tool to perform Detailed Subsystems Level Checks and to report information about Aerospace vehicle health',
        type: 'Sponsored Research',
        agency: 'Defence Research and Development Organisation (DRDO) - Hyd',
        amount: '₹9,75,000',
        duration: 'Ongoing',
        status: 'Ongoing'
      },
      {
        title: 'Computer Aided Diagnostic system for cancer (BIRAC/IKP01207/BIG-16/20)',
        type: 'Sponsored Research',
        agency: 'Biotechnology Industry Research Assistance Council (BIRAC)',
        amount: '₹15,00,000',
        duration: 'Ongoing',
        status: 'Ongoing'
      }
    ],
    '2022-23': [
      {
        title: 'A Multi-GPU Implementation of Cerans Solver',
        type: 'Sponsored Research',
        agency: 'Defence Research and Development Laboratory (DRDL)',
        amount: '₹19,99,000',
        duration: '2 Years',
        status: 'Ongoing'
      },
      {
        title: 'Computer Aided Diagnostic system for cancer (BIRAC/IKP01207/BIG-16/20)',
        type: 'Sponsored Research',
        agency: 'Biotechnology Industry Research Assistance Council (BIRAC)',
        amount: '₹15,00,000',
        duration: 'Ongoing',
        status: 'Ongoing'
      }
    ],
    '2021-22': [
      {
        title: 'Object Detection and Tracking (ODT) in Infrared Images with Application to Guidance and Control',
        type: 'Sponsored Research',
        agency: 'ADVAITA CARS',
        amount: '₹9,85,000',
        duration: '6 Months',
        status: 'Completed'
      },
      {
        title: 'Computer Aided Diagnostic system for cancer (BIRAC/IKP01207/BIG-16/20)',
        type: 'Sponsored Research',
        agency: 'Biotechnology Industry Research Assistance Council (BIRAC)',
        amount: '₹15,00,000',
        duration: 'Ongoing',
        status: 'Ongoing'
      },
      {
        title: 'Face detection door lock system using raspberry pi',
        type: 'Research Initiative',
        agency: 'KMIT Self Funded',
        amount: 'NA',
        duration: 'Ongoing',
        status: 'Ongoing'
      },
      {
        title: 'Automated face mask detection & temperature alert system',
        type: 'Research Initiative',
        agency: 'KMIT Self Funded',
        amount: 'NA',
        duration: 'Ongoing',
        status: 'Ongoing'
      },
      {
        title: 'Drone for Defense Application',
        type: 'Research Initiative',
        agency: 'KMIT Self Funded',
        amount: 'NA',
        duration: 'Ongoing',
        status: 'Ongoing'
      }
    ],
    '2020-21': [
      {
        title: 'CAD4MBC with customization',
        type: 'Research Collaboration',
        agency: 'Yashoda Hospitals / Indo American Cancer Hospital',
        amount: '₹15,00,000',
        duration: 'Ongoing',
        status: 'Ongoing'
      },
      {
        title: 'Defining new crypto protocols for signal processing to be used in SDR applications for missile Design',
        type: 'Research Initiative',
        agency: 'Defence Research and Development Laboratory (DRDL)',
        amount: 'Self Funded',
        duration: '2020',
        status: 'Completed'
      },
      {
        title: 'CERANS Solver from CPU to GPU',
        type: 'Research Initiative',
        agency: 'KMIT R&D Division',
        amount: 'Self Funded',
        duration: '2020',
        status: 'Completed'
      }
    ],
    '2019-20': [
      {
        title: 'Spider Robot (EDC Dev)',
        type: 'Research Initiative',
        agency: 'KMIT R&D Division',
        amount: 'Self Funded',
        duration: 'Ongoing',
        status: 'Ongoing'
      },
      {
        title: 'Walking robot',
        type: 'Research Initiative',
        agency: 'KMIT R&D Division',
        amount: 'Self Funded',
        duration: 'Ongoing',
        status: 'Ongoing'
      },
      {
        title: 'CADC (Cancer Diagnostics)',
        type: 'Sponsored Project',
        agency: 'Biotechnology Industry Research Assistance Council (BIRAC)',
        amount: '₹50,00,000',
        duration: '2019',
        status: 'Completed'
      },
      {
        title: 'Virtual Police Station Platform',
        type: 'Innovation / EDC',
        agency: 'Smart India Hackathon (SIH)',
        amount: 'NA',
        duration: '2019',
        status: 'Completed'
      },
      {
        title: 'Kisaan Portal Application',
        type: 'Innovation / EDC',
        agency: 'Kisan Forum Pvt Limited - SIH Sponsor',
        amount: '₹1,00,000',
        duration: '2019',
        status: 'Completed'
      },
      {
        title: 'Doshi Anveshan Yantra',
        type: 'Research Initiative',
        agency: 'KMIT Self Funded',
        amount: 'Self Funded',
        duration: '2019',
        status: 'Completed'
      }
    ],
    '2018-19': [
      {
        title: 'Abhimanyu Humanoid Robot',
        type: 'Robotics Research',
        agency: 'KMIT R&D Division',
        amount: 'Self Funded',
        duration: '2018',
        status: 'Completed'
      },
      {
        title: 'Smart And Friendly Irrigation System Using IoT',
        type: 'Research Project',
        agency: 'Teleparadigm Networks',
        amount: '₹30,000',
        duration: '2018',
        status: 'Completed'
      },
      {
        title: 'Control Systems Lab Development',
        type: 'Research Facility',
        agency: 'KMIT',
        amount: 'Self Funded',
        duration: '2018',
        status: 'Completed'
      }
    ],
    '2016-17': [
      {
        title: 'EDC Lab Research & Platform Development',
        type: 'Facility Development',
        agency: 'KMIT',
        amount: 'Self Funded',
        duration: '2016',
        status: 'Completed'
      }
    ]
  };

  const mainTabs = [
    { id: 'projects', label: 'Other Research Projects', icon: 'fa-diagram-project' },
    { id: 'birac', label: 'BIRAC Team', icon: 'fa-dna' },
    { id: 'tools', label: 'Auto Education Tools', icon: 'fa-laptop-code' }
  ];

  const yearKeys = Object.keys(projectYears);

  // Helper to format amount badges
  const getAmountBadge = (amount) => {
    if (amount === 'NA') return <span className="p-amt p-na">NA</span>;
    if (amount.toLowerCase().includes('self')) return <span className="p-amt p-self">Self Funded</span>;
    return <span className="p-amt p-funded">{amount}</span>;
  };

  // Helper to format agency logos / icons
  const getAgencyIcon = (agency) => {
    const a = agency.toLowerCase();
    if (a.includes('drdo') || a.includes('drdl')) return 'fa-shield-halved';
    if (a.includes('birac')) return 'fa-dna';
    if (a.includes('self') || a.includes('kmit')) return 'fa-university';
    if (a.includes('yashoda')) return 'fa-hospital';
    return 'fa-hand-holding-dollar';
  };

  return (
    <PageShell
      eyebrow="Research"
      title="Sponsored Research"
      description="Exploring pioneering technological frontiers through defense, biotechnology, and self-sponsored initiatives at KMIT."
      breadcrumbs={[
        { label: 'Research', to: '/research' },
        { label: 'Sponsored Research' }
      ]}
    >
      {/* Premium Main Nav Tab */}
      <section className="page-section-alt">
        <div className="container">
          <div className="sponsored-tabs-bar">
            {mainTabs.map((tab) => (
              <button
                key={tab.id}
                className={`sponsored-tab-btn ${activeMainTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveMainTab(tab.id)}
              >
                <i className={`fa-solid ${tab.icon}`}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="page-section sponsored-content-sec">
        <div className="container">
          {/* TAB 1: OTHER PROJECTS */}
          {activeMainTab === 'projects' && (
            <div className="sponsored-projects-container fade-in-element">
              <div className="section-header centered">
                <div className="section-eyebrow">Academic Year Grid</div>
                <h2>Projects Dashboard</h2>
                <div className="section-divider"></div>
              </div>

              {/* Year Selectors */}
              <div className="sponsored-years-slider">
                {yearKeys.map((year) => (
                  <button
                    key={year}
                    className={`year-pill ${activeYear === year ? 'active' : ''}`}
                    onClick={() => setActiveYear(year)}
                  >
                    {year}
                  </button>
                ))}
              </div>

              {/* Projects Grid */}
              <div className="sponsored-projects-grid">
                {projectYears[activeYear].map((proj, idx) => (
                  <ScrollReveal key={idx} animation="fade-up" style={{ height: '100%' }}>
                  <div className="sponsored-project-card" style={{ height: '100%' }}>
                    <div className="sp-card-header">
                      <span className="sp-badge-type">{proj.type}</span>
                      <span className={`sp-badge-status ${proj.status.toLowerCase()}`}>
                        {proj.status}
                      </span>
                    </div>
                    <h3 className="sp-card-title">{proj.title}</h3>
                    
                    <div className="sp-card-meta">
                      <div className="sp-meta-item">
                        <div className="sp-meta-icon">
                          <i className={`fa-solid ${getAgencyIcon(proj.agency)}`}></i>
                        </div>
                        <div className="sp-meta-content">
                          <span className="sp-meta-label">Funding Agency</span>
                          <span className="sp-meta-value">{proj.agency}</span>
                        </div>
                      </div>

                      <div className="sp-meta-row">
                        <div className="sp-meta-item">
                          <div className="sp-meta-icon"><i className="fa-solid fa-indian-rupee-sign"></i></div>
                          <div className="sp-meta-content">
                            <span className="sp-meta-label">Grant Amount</span>
                            <span className="sp-meta-value">{getAmountBadge(proj.amount)}</span>
                          </div>
                        </div>

                        <div className="sp-meta-item">
                          <div className="sp-meta-icon"><i className="fa-solid fa-calendar-check"></i></div>
                          <div className="sp-meta-content">
                            <span className="sp-meta-label">Duration</span>
                            <span className="sp-meta-value">{proj.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: BIRAC TEAM */}
          {activeMainTab === 'birac' && (
            <div className="sponsored-birac-container fade-in-element">
              <div className="section-header centered">
                <div className="section-eyebrow">Biotechnology Industry Research Assistance Council</div>
                <h2>BIRAC Research Team</h2>
                <div className="section-divider"></div>
              </div>

              <div className="birac-split-grid">
                {/* Faculty Card Stack */}
                <div className="birac-faculty-section">
                  <h3 className="birac-sub-heading"><i className="fa-solid fa-chalkboard-user"></i> Core Faculty Investigators</h3>
                  <div className="birac-faculty-grid">
                    {biracTeam.faculty.map((member, idx) => (
                      <ScrollReveal key={idx} animation="fade-right" delay={idx * 50}>
                      <div className="birac-faculty-card">
                        <div className="birac-faculty-avatar">
                          <span>{member.name.split(' ').pop().charAt(0)}</span>
                        </div>
                        <div className="birac-faculty-info">
                          <h4>{member.name}</h4>
                          <span className="birac-faculty-role">{member.role}</span>
                          <span className="birac-faculty-dept">{member.dept}</span>
                        </div>
                      </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>

                {/* Students Card Stack */}
                <div className="birac-students-section">
                  <h3 className="birac-sub-heading"><i className="fa-solid fa-users-gear"></i> Student Research Partners</h3>
                  <div className="birac-students-scroller">
                    <div className="birac-students-grid">
                      {biracTeam.students.map((stud, idx) => (
                        <ScrollReveal key={idx} animation="fade-up" delay={idx * 20}>
                        <div className="birac-student-pill">
                          <div className="birac-stud-badge">{stud.id}</div>
                          <div className="birac-stud-name">{stud.name}</div>
                        </div>
                        </ScrollReveal>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AUTO EDUCATION TOOLS */}
          {activeMainTab === 'tools' && (
            <div className="sponsored-tools-container fade-in-element">
              <div className="section-header centered">
                <div className="section-eyebrow">Proprietary Platforms</div>
                <h2>Auto Education Utilities</h2>
                <div className="section-divider"></div>
              </div>

              <div className="sponsored-tools-grid">
                {eduTools.map((tool, idx) => (
                  <ScrollReveal key={idx} animation="fade-up">
                  <div className="edu-tool-showcase">
                    <div className="edu-tool-icon-wrapper">
                      <i className={`fa-solid ${tool.icon}`}></i>
                    </div>
                    
                    <div className="edu-tool-content">
                      <div className="edu-tool-header">
                        <h3>{tool.title}</h3>
                        <span className="edu-tool-dev">Developed by {tool.developer}</span>
                      </div>
                      
                      <p className="edu-tool-desc">{tool.desc}</p>
                      
                      <div className="edu-tool-features">
                        <h4>Key Capabilities & Features:</h4>
                        <ul className="edu-tool-list">
                          {tool.features.map((feat, i) => (
                            <li key={i}>
                              <i className="fa-solid fa-circle-check"></i>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <ResearchPublicationsSection />
    </PageShell>
  )
}
