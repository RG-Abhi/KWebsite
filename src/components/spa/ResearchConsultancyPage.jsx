import React, { useState } from 'react'
import PageShell from './PageShell'
import './ResearchConsultancyPage.css'
import ResearchPublicationsSection from './ResearchPublicationsSection'
import ScrollReveal from '../ScrollReveal'

export default function ResearchConsultancyPage() {
  const [activeMainTab, setActiveMainTab] = useState('cfb'); // 'cfb', 'other'
  const [activeYear, setActiveYear] = useState('2023-24');

  const cfbProjects = [
    {
      title: 'E-Payment Service',
      icon: 'fa-credit-card',
      desc: 'Developing secure, multi-channel e-payment services utilizing bank accounts, debit/credit cards, and modern transactional gateways to combat retail transaction fraud.'
    },
    {
      title: 'Smart Investigation App',
      icon: 'fa-mobile-screen-button',
      desc: 'Building custom SMART mobile and tablet applications integrated with a comprehensive Investigation Support module to empower on-field personnel with real-time analytics.'
    },
    {
      title: 'Evidence Requisition System',
      icon: 'fa-magnifying-glass-chart',
      desc: 'Streamlining the electronic requisitioning of electronic evidence from diverse modern endpoints including Telecom Service Providers, Financial Institutions, transport reservations, and IoT/CCTV arrays.'
    },
    {
      title: 'Bharat Crypto Sign',
      icon: 'fa-signature',
      desc: 'Developing an advanced microservice for digital signature capturing and cryptographic verification, utilizing OTP validation, real-time location/time stamps, and blockchain security.'
    },
    {
      title: 'Doshi Anveshan Yantra',
      icon: 'fa-brain',
      desc: 'Harnessing advanced machine learning and data analytics to process criminal profiles (biometrics, apparel, vehicle tracks, behavior) and output legal chain-of-command reports.'
    }
  ];

  const cfbStudents = [
    { name: 'K. V. S. Rohith', college: 'KMIT' },
    { name: 'P. R. Suraj', college: 'KMIT' },
    { name: 'Priyal Jain', college: 'KMIT' },
    { name: 'Swathi Gupta', college: 'KMIT' },
    { name: 'K. Abhay Krishna', college: 'KMIT' },
    { name: 'Samyak Jain', college: 'KMIT' },
    { name: 'Sri Laxmi Sai Sahithi', college: 'KMIT' },
    { name: 'K. Ruchik', college: 'KMIT' },
    { name: 'A. Sai Vijaya Bhargavi', college: 'KMIT' },
    { name: 'Harshavardhan Kathoroju', college: 'KMIT' },
    { name: 'T. Vijay Abhinav', college: 'KMIT' },
    { name: 'Vivek Rupender Gopu', college: 'KMIT' },
    { name: 'Srinivas Yadav', college: 'KMIT' },
    { name: 'Ch. Sanketh', college: 'NGIT' },
    { name: 'Rishabh Jain', college: 'NGIT' },
    { name: 'Abhishek Chanda', college: 'NGIT' },
    { name: 'Ch. Hari Shashank', college: 'NGIT' },
    { name: 'Anuraag', college: 'NGIT' },
    { name: 'D. Chetan Pranav', college: 'NGIT' },
    { name: 'M. Charan Teja', college: 'NGIT' },
    { name: 'Ritik Kumar Roy', college: 'NGIT' },
    { name: 'Shravan Reddy', college: 'NGIT' },
    { name: 'S. N. V. Adithya', college: 'NGIT' }
  ];

  const otherProjects = {
    '2023-24': [
      {
        title: 'CG 360 Projects',
        type: 'Consultancy',
        agency: 'Cyber Guards - 360',
        duration: 'Ongoing',
        amount: '₹ 3.85 Lacs',
        status: 'Ongoing'
      },
      {
        title: 'Innovative Clinical Imaging Analysis Research',
        type: 'Consultancy',
        agency: 'Digi Clinics',
        duration: '5 weeks',
        amount: '₹ 68.10 Lacs',
        status: 'Completed'
      },
      {
        title: 'International Finishing School',
        type: 'Consultancy',
        agency: 'ProCareer, California',
        duration: 'Ongoing',
        amount: '49,200 USD',
        status: 'Ongoing'
      }
    ],
    '2022-23': [
      {
        title: 'Cancer Imaging Project',
        type: 'Consultancy',
        agency: 'Digi Clinics',
        duration: '3 Years (Ongoing)',
        amount: '₹ 5.15 Lacs',
        status: 'Ongoing'
      },
      {
        title: 'Summer of Tech',
        type: 'Consultancy',
        agency: 'Blue Sky Coding, Ghana',
        duration: '5 weeks',
        amount: '3,500 USD',
        status: 'Completed'
      },
      {
        title: 'CodeLabz - FrontEnd and BackEnd Integration',
        type: 'Consultancy',
        agency: 'SCoRe Lab',
        duration: '3 Months',
        amount: '3,000 USD',
        status: 'Completed'
      },
      {
        title: 'CodeLabz – Workflow module for Niffler Framework',
        type: 'Consultancy',
        agency: 'SCoRe Lab',
        duration: '3 Months',
        amount: '3,000 USD',
        status: 'Completed'
      },
      {
        title: 'CodeLabz – FrontEnd, Newsfeed and Profiles',
        type: 'Consultancy',
        agency: 'SCoRe Lab',
        duration: '3 Months',
        amount: '3,000 USD',
        status: 'Completed'
      }
    ],
    '2021-22': [
      {
        title: 'Object Detection and Tracking (ODT) in Infrared images with Application to Guidance and Control',
        type: 'Consultancy',
        agency: 'Research Centre Imarat (RCI)',
        duration: '3 Years (Ongoing)',
        amount: '₹ 9.85 Lacs',
        status: 'Ongoing'
      },
      {
        title: 'Real-time Collaboration on a note',
        type: 'Consultancy',
        agency: 'Google Summer of Code (GSoC)',
        duration: '6 Months',
        amount: '1,500 USD',
        status: 'Completed'
      },
      {
        title: 'Emory University School of Medicine',
        type: 'Consultancy',
        agency: 'Google Summer of Code (GSoC)',
        duration: '6 Months',
        amount: '1,500 USD',
        status: 'Completed'
      },
      {
        title: 'caMicroscope',
        type: 'Consultancy',
        agency: 'Google Summer of Code (GSoC)',
        duration: '6 Months',
        amount: '1,500 USD',
        status: 'Completed'
      },
      {
        title: 'Vectorization and SIMD parallelism in Intel Processors, Parallel algorithms and HPC',
        type: 'Consultancy',
        agency: 'Google Summer of Code (GSoC)',
        duration: '6 Months',
        amount: '1,500 USD',
        status: 'Completed'
      }
    ],
    '2020-21': [
      {
        title: 'AI/ML Training',
        type: 'Consultancy',
        agency: 'Defence Research & Development Laboratory (DRDL)',
        duration: '2020',
        amount: '₹ 4.50 Lacs',
        status: 'Completed'
      },
      {
        title: 'AI at the edge, GPU',
        type: 'Consultancy',
        agency: 'Defence Research & Development Laboratory (DRDL)',
        duration: '2020',
        amount: '₹ 4.50 Lacs',
        status: 'Completed'
      },
      {
        title: 'E-Payment Service',
        type: 'Consultancy',
        agency: 'Crime Free Bharat - MP Police',
        duration: '2020',
        amount: 'NA',
        status: 'Completed'
      },
      {
        title: 'Smart Investigation App',
        type: 'Consultancy',
        agency: 'Crime Free Bharat',
        duration: '2020',
        amount: 'NA',
        status: 'Completed'
      },
      {
        title: 'Evidence Requisition System',
        type: 'Consultancy',
        agency: 'Crime Free Bharat - MP Police',
        duration: '2020',
        amount: 'NA',
        status: 'Completed'
      },
      {
        title: 'Bharat Crypto Sign',
        type: 'Consultancy',
        agency: 'Crime Free Bharat',
        duration: '2020',
        amount: 'NA',
        status: 'Completed'
      },
      {
        title: 'Doshi Anveshan Yantra',
        type: 'Consultancy',
        agency: 'Crime Free Bharat',
        duration: '2020',
        amount: 'NA',
        status: 'Completed'
      }
    ],
    '2019-20': [
      {
        title: 'Spider Robot',
        type: 'Research',
        agency: 'KMIT',
        duration: 'Ongoing',
        amount: 'Self Funded',
        status: 'Ongoing'
      },
      {
        title: 'Walking robot',
        type: 'Research',
        agency: 'KMIT',
        duration: 'Ongoing',
        amount: 'Self Funded',
        status: 'Ongoing'
      },
      {
        title: 'Virtual Police Station',
        type: 'Innovation / EDC',
        agency: 'Smart India Hackathon (SIH)',
        duration: '2019',
        amount: 'NA',
        status: 'Completed'
      },
      {
        title: 'Kisaan portal',
        type: 'Innovation / EDC',
        agency: 'Kisan Forum Pvt Limited - SIH',
        duration: '2019',
        amount: '₹ 1.00 Lac',
        status: 'Completed'
      },
      {
        title: 'Diwali Soft',
        type: 'Consultancy',
        agency: 'Marathi Granth Sangralay',
        duration: '2019',
        amount: '₹ 75,000',
        status: 'Completed'
      },
      {
        title: 'DNA separation machine controller',
        type: 'Consultancy',
        agency: 'SIRF BIO',
        duration: 'Ongoing',
        amount: '₹ 81,000',
        status: 'Ongoing'
      },
      {
        title: 'Thermal Cycler and Analyze',
        type: 'Consultancy',
        agency: 'SIRF BIO',
        duration: 'Ongoing',
        amount: '₹ 70,000',
        status: 'Ongoing'
      },
      {
        title: 'OpenMRS Atlas',
        type: 'Consultancy',
        agency: 'OpenMRS',
        duration: '2019',
        amount: '5,000 USD',
        status: 'Completed'
      },
      {
        title: 'Openmrs – Condition List',
        type: 'Consultancy',
        agency: 'OpenMRS',
        duration: '2019',
        amount: '5,000 USD',
        status: 'Completed'
      },
      {
        title: 'Bio Medical Whole Slide Imaging Scanner',
        type: 'Consultancy',
        agency: 'Genesis Solutions & Tapadia Diagnosis',
        duration: 'NA',
        amount: '₹ 1.50 Lacs',
        status: 'Completed'
      },
      {
        title: 'IoT Based Health Band for Soldiers',
        type: 'Consultancy',
        agency: 'Teleparadigm',
        duration: 'NA',
        amount: '₹ 1.20 Lacs',
        status: 'Completed'
      }
    ],
    '2018-19': [
      {
        title: 'Face Detection And Recognition In An Image: ML Approach',
        type: 'Consultancy',
        agency: 'Inferdata Software India PVT, LTD',
        duration: '2018',
        amount: '₹ 40,000',
        status: 'Completed'
      }
    ],
    '2017-18': [
      {
        title: 'Changes In Climate And GDP With Increment In The Population',
        type: 'Consultancy',
        agency: 'Inferdata Software India PVT, LTD',
        duration: '2017',
        amount: '₹ 3.00 Lacs',
        status: 'Completed'
      },
      {
        title: 'Defect Tracking System',
        type: 'Consultancy',
        agency: 'Inferdata Software India PVT, LTD',
        duration: '2017',
        amount: '₹ 40,000',
        status: 'Completed'
      },
      {
        title: 'IOT Based Home Security Mode',
        type: 'Consultancy',
        agency: 'Teleparadigm',
        duration: '2017',
        amount: '₹ 3.00 Lacs',
        status: 'Completed'
      },
      {
        title: 'Lora wireless module for smart farms',
        type: 'Consultancy',
        agency: 'Teleuniv Solutions',
        duration: '2017-18',
        amount: '₹ 1.80 Lacs',
        status: 'Completed'
      },
      {
        title: 'Woman Safety App using Drone',
        type: 'Consultancy',
        agency: 'Telangana Government',
        duration: '2018',
        amount: '₹ 3.00 Lacs',
        status: 'Completed'
      },
      {
        title: 'Secure Web Application for E learning Resource Portal',
        type: 'Consultancy',
        agency: 'Teleuniv Solutions',
        duration: '2018',
        amount: '₹ 2.70 Lacs',
        status: 'Completed'
      }
    ],
    '2016-17': [
      {
        title: 'IOT Based Smart Led Street Light',
        type: 'Consultancy',
        agency: 'Namo Jvc Engineers PVT.LTD',
        duration: '2016',
        amount: '₹ 40,000',
        status: 'Completed'
      },
      {
        title: 'Ultrasonic Generator For Our Separator Machine',
        type: 'Consultancy',
        agency: 'Namo Jvc Engineers PVT.LTD',
        duration: '2016',
        amount: '₹ 50,000',
        status: 'Completed'
      },
      {
        title: 'Solar Trainer',
        type: 'Consultancy',
        agency: 'RC-All TECH',
        duration: '2016',
        amount: '₹ 6.00 Lacs',
        status: 'Completed'
      },
      {
        title: 'Chemical Analysis Lab For Oceanography',
        type: 'Consultancy',
        agency: 'National Institute Of Oceanography',
        duration: '2016',
        amount: '₹ 60,000',
        status: 'Completed'
      },
      {
        title: 'IOT Based solar Power Sensor And Controller System for Vertical Garden',
        type: 'Consultancy',
        agency: 'Hortus Consultants',
        duration: '2016',
        amount: '₹ 87,000',
        status: 'Completed'
      }
    ]
  };

  const mainTabs = [
    { id: 'cfb', label: 'Crime Free Bharat', icon: 'fa-shield-halved' },
    { id: 'other', label: 'Other Consultancy Projects', icon: 'fa-handshake' }
  ];

  const yearKeys = Object.keys(otherProjects);

  // Helper to format amount badges
  const getAmountBadge = (amount) => {
    if (amount === 'NA') return <span className="p-amt p-na">NA</span>;
    if (amount.toLowerCase().includes('self')) return <span className="p-amt p-self">Self Funded</span>;
    return <span className="p-amt p-funded">{amount}</span>;
  };

  // Helper to format agency logos / icons
  const getAgencyIcon = (agency) => {
    const a = agency.toLowerCase();
    if (a.includes('police') || a.includes('crime')) return 'fa-building-shield';
    if (a.includes('drdl') || a.includes('rci')) return 'fa-shield-halved';
    if (a.includes('gsoc') || a.includes('google')) return 'fa-brands fa-google';
    if (a.includes('score')) return 'fa-terminal';
    if (a.includes('self') || a.includes('kmit')) return 'fa-university';
    if (a.includes('clinics') || a.includes('tapadia') || a.includes('diagnosis')) return 'fa-hospital';
    return 'fa-hand-holding-dollar';
  };

  return (
    <PageShell
      eyebrow="Research"
      title="Consultancy Projects"
      description="Leveraging core academic excellence to deliver premium advisory, industrial software systems, and nationwide security products."
      breadcrumbs={[
        { label: 'Research', to: '/research' },
        { label: 'Consultancy Projects' }
      ]}
    >
      {/* Premium Main Nav Tab */}
      <section className="page-section-alt">
        <div className="container">
          <div className="consultancy-tabs-bar">
            {mainTabs.map((tab) => (
              <button
                key={tab.id}
                className={`consultancy-tab-btn ${activeMainTab === tab.id ? 'active' : ''}`}
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
      <section className="page-section consultancy-content-sec">
        <div className="container">
          
          {/* TAB 1: CRIME FREE BHARAT */}
          {activeMainTab === 'cfb' && (
            <div className="cfb-container fade-in-element">
              
              {/* Hero Banner Box */}
              <ScrollReveal animation="fade-up">
              <div className="cfb-hero-card">
                <span className="cfb-hero-tag">National Initiative</span>
                <h3>Crime Free Bharat Mission</h3>
                <p className="cfb-hero-desc">
                  KMIT & NGIT signed a joint Memorandum of Understanding (MoU) with the DGP (Special Reforms), Madhya Pradesh Police, led by Shri Maithili Sharan Gupta. This mission is dedicated to conceptualizing, designing, and building highly secure, distributed technical portals, microservices, and mobile assets for national safety, internet protocols, cyber forensics, and automated digital investigations.
                </p>
                <div className="cfb-meta-grid">
                  <div className="cfb-meta-box">
                    <div className="cfb-meta-icon"><i className="fa-solid fa-calendar-days"></i></div>
                    <div className="cfb-meta-info">
                      <span className="cfb-meta-label">Start Date</span>
                      <span className="cfb-meta-val">June 25, 2020</span>
                    </div>
                  </div>
                  <div className="cfb-meta-box">
                    <div className="cfb-meta-icon"><i className="fa-solid fa-calendar-check"></i></div>
                    <div className="cfb-meta-info">
                      <span className="cfb-meta-label">End Date</span>
                      <span className="cfb-meta-val">Sept 25, 2020</span>
                    </div>
                  </div>
                  <div className="cfb-meta-box">
                    <div className="cfb-meta-icon"><i className="fa-solid fa-users"></i></div>
                    <div className="cfb-meta-info">
                      <span className="cfb-meta-label">Internship Force</span>
                      <span className="cfb-meta-val">23 Selected Students</span>
                    </div>
                  </div>
                </div>
              </div>
              </ScrollReveal>

              {/* Projects Grid */}
              <div className="cfb-projects-section">
                <h3 className="cfb-projects-heading">
                  <i className="fa-solid fa-folder-open"></i> Co-Developed Project Portfolio
                </h3>
                
                <div className="cfb-showcase-grid">
                  {cfbProjects.map((proj, idx) => (
                    <ScrollReveal key={idx} animation="fade-up" style={{ height: '100%' }}>
                    <div className="cfb-showcase-card" style={{ height: '100%' }}>
                      <div className="cfb-showcase-icon">
                        <i className={`fa-solid ${proj.icon}`}></i>
                      </div>
                      <div className="cfb-showcase-content">
                        <h4>{proj.title}</h4>
                        <p className="cfb-showcase-desc">{proj.desc}</p>
                      </div>
                    </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>

              {/* Selected Students List */}
              <div className="cfb-students-section">
                <h3 className="cfb-projects-heading">
                  <i className="fa-solid fa-award"></i> Selected Student Engineers & Investigators
                </h3>
                
                <div className="cfb-students-layout">
                  <div className="cfb-students-grid">
                    {cfbStudents.map((stud, idx) => (
                      <ScrollReveal key={idx} animation="fade-up">
                      <div className="cfb-student-pill">
                        <span className="cfb-stud-name">{stud.name}</span>
                        <span className="cfb-stud-col">{stud.college}</span>
                      </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: OTHER CONSULTANCY PROJECTS */}
          {activeMainTab === 'other' && (
            <div className="consultancy-projects-container fade-in-element">
              
              <div className="section-header centered">
                <div className="section-eyebrow">Academic Year Grid</div>
                <h2>Projects Dashboard</h2>
                <div className="section-divider"></div>
              </div>

              {/* Year Selectors */}
              <div className="consultancy-years-slider">
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
              <div className="consultancy-projects-grid">
                {otherProjects[activeYear].map((proj, idx) => (
                  <ScrollReveal key={idx} animation="fade-up" style={{ height: '100%' }}>
                  <div className="consultancy-project-card" style={{ height: '100%' }}>
                    <div className="cp-card-header">
                      <span className="cp-badge-type">{proj.type}</span>
                      <span className={`cp-badge-status ${proj.status.toLowerCase()}`}>
                        {proj.status}
                      </span>
                    </div>
                    <h3 className="cp-card-title">{proj.title}</h3>
                    
                    <div className="cp-card-meta">
                      <div className="cp-meta-item">
                        <div className="cp-meta-icon">
                          <i className={`fa-solid ${getAgencyIcon(proj.agency)}`}></i>
                        </div>
                        <div className="cp-meta-content">
                          <span className="cp-meta-label">Client / Funding Agency</span>
                          <span className="cp-meta-value">{proj.agency}</span>
                        </div>
                      </div>

                      <div className="cp-meta-row">
                        <div className="cp-meta-item">
                          <div className="cp-meta-icon"><i className="fa-solid fa-indian-rupee-sign"></i></div>
                          <div className="cp-meta-content">
                            <span className="cp-meta-label">Consultancy Value</span>
                            <span className="cp-meta-value">{getAmountBadge(proj.amount)}</span>
                          </div>
                        </div>

                        <div className="cp-meta-item">
                          <div className="cp-meta-icon"><i className="fa-solid fa-calendar-check"></i></div>
                          <div className="cp-meta-content">
                            <span className="cp-meta-label">Duration</span>
                            <span className="cp-meta-value">{proj.duration}</span>
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

        </div>
      </section>

      <ResearchPublicationsSection />
    </PageShell>
  )
}
