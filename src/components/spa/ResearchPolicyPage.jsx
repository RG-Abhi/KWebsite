import React from 'react'
import PageShell from './PageShell'
import ResearchPublicationsSection from './ResearchPublicationsSection'
import './ResearchPolicyPage.css'
import ScrollReveal from '../ScrollReveal'

const procedural = [
  'All faculties (both doctorates and non-doctorates) are encouraged to execute research and publish a minimum of two or more publications per year.',
  'Either as an individual (minimum two publications per year) or as a group of max 3 members (six publications per year for a group).',
  'All doctorates and subject experts (selected by the HOD) in the department should be reviewers at publication meetings scheduled by the dept.',
  'Each publication will carry 20% (max two publications) in the faculty\'s API (Academic Performance Indicator) towards their annual performance review.',
  'Each publication will get reimbursement of 25–100% of publication charges with a cap of ₹50,000, based on the quality of the journal.',
  'Management encourages associating students in research implementation so that research skills are imparted to them.',
  'If students are included, they should be rewarded by adding their names in the publication.',
  'Ensure that your publication has "Author\'s institution affiliation as Keshav Memorial Institute of Technology".',
  'Publications from funded projects will be fully reimbursed from the funding.',
  'After publication, each faculty must share Title, Journal Name, Period of Publication, and ISBN/DOI to the respective publication coordinator for college records.'
]

const execStrategy = [
  { title: 'Publication Review Meetings (PRM)', desc: 'Each department must schedule and conduct three Publication Review Meetings every six months, or as needed, led by departmental doctorates, subject experts, and HODs.' },
  { title: 'Research Workplan Submission', desc: 'Each faculty or group must share a research workplan at the first PRM including domain, problem description, SW/Technologies, expected publication date, target journal, required students, and any other resources needed.' },
  { title: 'Progress Tracking', desc: 'PRMs must ensure publication progress is in line with the published workplan of the respective department. Updates are to be formally recorded.' },
  { title: 'Documentation in College Systems', desc: 'All documents including PRM schedules, workplans, evaluations, and publication details must be fed into the college documentation system regularly by department publication coordinators.' },
  { title: 'UGC Journal Compliance', desc: 'Authors must ensure journals are listed in the UGC list. A screenshot of the UGC listing as on that date must be shared with publication coordinators for statutory compliance.' },
  { title: 'External Funding & IP Support', desc: 'Management will provide support for converting research to projects, fund/grant writing, patents, and productization — with primary ownership retained by the respective faculty investigator.' },
  { title: 'Incubation Centre Access', desc: 'Management will happily provide the college incubation centre for product/project development during project initiation phases.' }
]

export default function ResearchPolicyPage() {
  return (
    <PageShell
      eyebrow="Research"
      title="Publication"
      titleEm="Policy"
      description="KMIT's institutional framework for guiding, incentivizing, and standardizing research publications across all departments."
      breadcrumbs={[
        { label: 'Research', to: '/research' },
        { label: 'Publication Policy' }
      ]}
    >
      {/* Vision & Mission */}
      <section className="page-section">
        <div className="container">
          <div className="policy-mission-grid">
            <ScrollReveal animation="fade-right" style={{ height: '100%' }}>
            <div className="policy-mission-card vision" style={{ height: '100%' }}>
              <div className="pm-icon"><i className="fa-solid fa-eye"></i></div>
              <h3>Vision</h3>
              <p>To be a premier Engineering R&amp;D institution in the region by 2023, recognized for impactful research and innovation.</p>
            </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-left" style={{ height: '100%' }}>
            <div className="policy-mission-card mission" style={{ height: '100%' }}>
              <div className="pm-icon"><i className="fa-solid fa-bullseye"></i></div>
              <h3>Mission (2020–21)</h3>
              <p>Achieve a minimum of <strong>3 funded projects</strong> and <strong>25 research publications</strong> per year in peer-reviewed and UGC-approved journals.</p>
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Procedural Objectives */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-list-check"></i> Core Directives</div>
            <h2>Procedural <em>Objectives</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="policy-objectives-list">
            {procedural.map((item, idx) => (
              <ScrollReveal key={idx} animation="fade-up" delay={idx * 50}>
              <div className="policy-obj-item">
                <div className="policy-obj-num">{String(idx + 1).padStart(2, '0')}</div>
                <p>{item}</p>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Execution Strategy */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-diagram-project"></i> Implementation</div>
            <h2>Suggested Execution <em>Strategy</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="policy-strategy-grid">
            {execStrategy.map((item, idx) => (
              <ScrollReveal key={idx} animation="fade-up" style={{ height: '100%' }}>
              <div className="policy-strategy-card" style={{ height: '100%' }}>
                <div className="ps-card-num">{String(idx + 1).padStart(2, '0')}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Committee Contacts */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-address-book"></i> Contacts</div>
            <h2>R&amp;D Publication <em>Coordinators</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="policy-contacts">
            {['Mr. Vinay Patankar', 'Dr. Rajasekaran Subramanian', 'Dr. R. Devika Rubi'].map((name, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
              <div className="policy-contact-pill">
                <i className="fa-solid fa-user-tie"></i>
                <span>{name}</span>
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
