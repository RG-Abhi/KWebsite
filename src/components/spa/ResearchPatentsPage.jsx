import React, { useState } from 'react'
import PageShell from './PageShell'
import ResearchPublicationsSection from './ResearchPublicationsSection'
import './ResearchPatentsPage.css'
import ScrollReveal from '../ScrollReveal'

const patents = [
  {
    appNo: '202241030183',
    year: 2022,
    date: '29/05/2022',
    title: 'A System and Method for Detecting and Classifying Brain Tumours Using Deep Learning',
    inventors: 'Dr. B. Kiranmai, Dr. R. Devika Rubi, Ms. Prabhavati Devi',
    status: 'Published',
    type: 'Indian Patent'
  },
  {
    appNo: '202241052841',
    year: 2022,
    date: '14/09/2022',
    title: 'An IoT Based Smart Health Monitoring System with Real-Time Alerts Using Edge Computing',
    inventors: 'Dr. Ajeet K. Jain, Mr. B. Niranjan Kumar, Dr. S. Rajasekaran',
    status: 'Published',
    type: 'Indian Patent'
  },
  {
    appNo: '202141053929',
    year: 2021,
    date: '24/11/2021',
    title: 'Method and Apparatus for Automated Detection of Cybersecurity Threats in Network Traffic Using Machine Learning',
    inventors: 'Dr. Vinay Patankar, Dr. R. Devika Rubi',
    status: 'Granted',
    type: 'Indian Patent'
  },
  {
    appNo: '202141019432',
    year: 2021,
    date: '06/04/2021',
    title: 'A Novel Blockchain-Based Framework for Tamper-Proof Academic Credential Verification',
    inventors: 'Ms. Haleema Bushra, Ms. Prabhavati Devi, Dr. S. Rajasekaran',
    status: 'Published',
    type: 'Indian Patent'
  },
  {
    appNo: '202041052834',
    year: 2020,
    date: '02/12/2020',
    title: 'An Intelligent System for Real-Time Object Detection and Tracking in Infrared Images Using Convolutional Neural Networks',
    inventors: 'Dr. Ajeet K. Jain, Dr. B. Kiranmai, Dr. Vinay Patankar',
    status: 'Published',
    type: 'Indian Patent'
  },
  {
    appNo: '202041027563',
    year: 2020,
    date: '18/06/2020',
    title: 'Method for Privacy-Preserving Federated Learning in Distributed Healthcare Data Systems',
    inventors: 'Dr. R. Devika Rubi, Mr. B. Niranjan Kumar',
    status: 'Granted',
    type: 'Indian Patent'
  },
  {
    appNo: '201941038471',
    year: 2019,
    date: '22/09/2019',
    title: 'Automated Pest and Disease Detection in Agricultural Crops Using Drone Imagery and Deep Neural Networks',
    inventors: 'Dr. S. Rajasekaran, Dr. Vinay Patankar, Ms. Haleema Bushra',
    status: 'Granted',
    type: 'Indian Patent'
  },
  {
    appNo: '201941004892',
    year: 2019,
    date: '05/02/2019',
    title: 'Smart Energy Management System Using IoT and Renewable Energy Sources for Educational Campuses',
    inventors: 'Dr. Ajeet K. Jain, Dr. B. Kiranmai',
    status: 'Granted',
    type: 'Indian Patent'
  },
]

const statusColor = {
  Granted: 'granted',
  Published: 'published',
  Filed: 'filed'
}

export default function ResearchPatentsPage() {
  const [filter, setFilter] = useState('All')
  const statuses = ['All', 'Granted', 'Published', 'Filed']

  const filtered = filter === 'All' ? patents : patents.filter(p => p.status === filter)

  return (
    <PageShell
      eyebrow="Research"
      title="List of"
      titleEm="Patents"
      description="KMIT's intellectual property portfolio — a testament to our faculty's innovative research and contributions to technology."
      breadcrumbs={[
        { label: 'Research', to: '/research' },
        { label: 'List of Patents' }
      ]}
    >
      {/* Stats */}
      <section className="page-section">
        <div className="container">
          <ScrollReveal animation="fade-up">
          <div className="stats-strip">
            <div className="stat-block">
              <span className="stat-value">{patents.filter(p => p.status === 'Granted').length}</span>
              <span className="stat-label">Patents Granted</span>
            </div>
            <div className="stat-block">
              <span className="stat-value">{patents.filter(p => p.status === 'Published').length}</span>
              <span className="stat-label">Published Applications</span>
            </div>
            <div className="stat-block">
              <span className="stat-value">{patents.length}<span className="accent">+</span></span>
              <span className="stat-label">Total Applications</span>
            </div>
            <div className="stat-block">
              <span className="stat-value"><span className="accent">IP</span></span>
              <span className="stat-label">Intellectual Property</span>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Patents Timeline Grid */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-certificate"></i> IP Portfolio</div>
            <h2>Patents <em>Registry</em></h2>
            <div className="section-divider"></div>
          </div>

          {/* Status Filter */}
          <div className="patents-filter-bar">
            {statuses.map(s => (
              <button
                key={s}
                className={`patents-filter-btn ${filter === s ? 'active' : ''}`}
                onClick={() => setFilter(s)}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Patents Grid */}
          <div className="patents-grid">
            {filtered.map((p, idx) => (
              <ScrollReveal key={idx} animation="fade-up" style={{ height: '100%' }}>
              <div className={`patent-card status-${statusColor[p.status]}`} style={{ height: '100%' }}>
                <div className="pc-header">
                  <div className="pc-app-no">
                    <span className="pc-app-label">Application No.</span>
                    <span className="pc-app-val">{p.appNo}</span>
                  </div>
                  <span className={`pc-status-badge ${statusColor[p.status]}`}>{p.status}</span>
                </div>

                <div className="pc-icon-block">
                  <i className="fa-solid fa-file-shield"></i>
                </div>

                <h4 className="pc-title">{p.title}</h4>

                <div className="pc-meta">
                  <div className="pc-meta-item">
                    <i className="fa-solid fa-user-pen"></i>
                    <span>{p.inventors}</span>
                  </div>
                  <div className="pc-meta-item">
                    <i className="fa-solid fa-calendar-days"></i>
                    <span>{p.date}</span>
                  </div>
                  <div className="pc-meta-item">
                    <i className="fa-solid fa-bookmark"></i>
                    <span>{p.type}</span>
                  </div>
                </div>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ResearchPublicationsSection />
    </PageShell>
  )
}
