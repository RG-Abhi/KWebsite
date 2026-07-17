import React from 'react'
import PageShell from './PageShell'
import ResearchPublicationsSection from './ResearchPublicationsSection'
import './ResearchCommitteePage.css'
import ScrollReveal from '../ScrollReveal'

const committee = [
  { sno: 1, name: 'Prof. Vinay Patankar', dept: 'Director', role: 'Convenor', icon: 'fa-star' },
  { sno: 2, name: 'Dr. R. Devika Rubi',   dept: 'CSE',      role: 'Core Committee Member', icon: 'fa-user-tie' },
  { sno: 3, name: 'Dr. S. Rajasekaran',   dept: 'CSE',      role: 'Core Committee Member', icon: 'fa-user-tie' },
  { sno: 4, name: 'Ms. Haleema Bushra',   dept: 'CSE',      role: 'Member', icon: 'fa-user' },
  { sno: 5, name: 'Ms. Prabhavati Devi',  dept: 'CSE',      role: 'Member', icon: 'fa-user' },
  { sno: 6, name: 'Mr. B. Niranjan Kumar',dept: 'H&S',      role: 'Member', icon: 'fa-user' },
]

const responsibilities = [
  { icon: 'fa-file-signature', title: 'Review Workplans', desc: 'Evaluate and guide faculty research execution workplans submitted at Publication Review Meetings.' },
  { icon: 'fa-magnifying-glass', title: 'Evaluate Quality', desc: 'Assess research quality, journal ranking, and compliance with UGC and Scopus standards before proceeding.' },
  { icon: 'fa-handshake', title: 'Coordinate with Departments', desc: 'Act as the primary bridge between departmental publication coordinators and the central administration.' },
  { icon: 'fa-check-double', title: 'Approve Reimbursements', desc: 'Review and approve faculty reimbursement applications based on journal quality and policy compliance.' },
]

export default function ResearchCommitteePage() {
  return (
    <PageShell
      eyebrow="Research"
      title="Publication"
      titleEm="Committee"
      description="Meet the academic board responsible for reviewing, guiding, and governing all research publication activities at KMIT."
      breadcrumbs={[
        { label: 'Research', to: '/research' },
        { label: 'Publication Committee' }
      ]}
    >
      {/* Committee Members Table */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-users-rectangle"></i> Board Members</div>
            <h2>Committee <em>Roster</em></h2>
            <div className="section-divider"></div>
          </div>

          <div className="committee-cards-grid">
            {committee.map((m, idx) => (
              <ScrollReveal key={idx} animation="fade-up" style={{ height: '100%' }}>
              <div className={`committee-card ${m.role === 'Convenor' ? 'convenor' : m.role.includes('Core') ? 'core' : ''}`} style={{ height: '100%' }}>
                <div className="cc-avatar">
                  <i className={`fa-solid ${m.icon}`}></i>
                </div>
                <div className="cc-info">
                  <span className="cc-role-badge">{m.role}</span>
                  <h3>{m.name}</h3>
                  <span className="cc-dept">{m.dept}</span>
                </div>
                <div className="cc-num">{String(m.sno).padStart(2, '0')}</div>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Responsibilities */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-clipboard-list"></i> Mandate</div>
            <h2>Committee <em>Responsibilities</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="info-cards-grid">
            {responsibilities.map((r, idx) => (
              <ScrollReveal key={idx} animation="fade-up" style={{ height: '100%' }}>
              <div className="info-card" style={{ height: '100%' }}>
                <div className="info-card-icon"><i className={`fa-solid ${r.icon}`}></i></div>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
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
