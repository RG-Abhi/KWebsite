import React from 'react'
import PageShell from './PageShell'
import ResearchPublicationsSection from './ResearchPublicationsSection'
import './ResearchReimbursementPage.css'
import ScrollReveal from '../ScrollReveal'

const eligibility = [
  'Publication must be in a UGC-approved, Scopus-indexed, or SCI journal.',
  'Faculty must be affiliated with KMIT in the publication.',
  'Reimbursement is subject to a maximum cap of ₹50,000 per publication.',
  'Group publications (max 3 authors) will be reimbursed at 25–100% based on journal quality tier.',
  'Publications from externally funded projects will be fully reimbursed from the respective grant.',
  'Application must be submitted within 30 days of the publication date.',
  'ISBN/DOI and proof of UGC listing as on the date of submission must be included.'
]

const steps = [
  { step: '01', icon: 'fa-file-arrow-down', title: 'Download Form', desc: 'Download the official Publication Reimbursement Form (DOCX) from the link below.' },
  { step: '02', icon: 'fa-pen-to-square', title: 'Fill Details', desc: 'Complete all fields: title, journal, ISBN/DOI, date, UGC listing screenshot, and amount claimed.' },
  { step: '03', icon: 'fa-users', title: 'HOD Review', desc: 'Submit the completed form to your Head of Department for initial review and sign-off.' },
  { step: '04', icon: 'fa-check-circle', title: 'Committee Approval', desc: 'The Publication Committee reviews the journal quality and approves the reimbursement percentage.' },
  { step: '05', icon: 'fa-indian-rupee-sign', title: 'Disbursement', desc: 'Approved amounts are processed and disbursed through the KMIT accounts office.' },
]

const tiers = [
  { tier: 'Tier 1', label: 'Q1 / SCI / Scopus Top', pct: '100%', color: 'gold', cap: 'Up to ₹50,000' },
  { tier: 'Tier 2', label: 'Scopus / UGC-CARE Listed', pct: '75%', color: 'silver', cap: 'Up to ₹37,500' },
  { tier: 'Tier 3', label: 'UGC-Approved', pct: '50%', color: 'bronze', cap: 'Up to ₹25,000' },
  { tier: 'Tier 4', label: 'Other Peer-Reviewed', pct: '25%', color: 'base', cap: 'Up to ₹12,500' },
]

export default function ResearchReimbursementPage() {
  const formUrl = 'https://docs.google.com/gview?url=kmit.in/research/docs/Publication_Reimbursement_Form.docx'

  return (
    <PageShell
      eyebrow="Research"
      title="Reimbursement"
      titleEm="Form"
      description="Faculty who publish in quality journals are eligible for publication charge reimbursement up to ₹50,000 per paper."
      breadcrumbs={[
        { label: 'Research', to: '/research' },
        { label: 'Reimbursement Form' }
      ]}
    >
      {/* Download CTA Hero */}
      <section className="page-section">
        <div className="container">
          <ScrollReveal animation="fade-up">
          <div className="reimbursement-cta-card">
            <div className="rcta-left">
              <span className="rcta-tag">Download Required</span>
              <h2>Publication Reimbursement <em>Form</em></h2>
              <p>
                Download the official KMIT Publication Reimbursement Form, fill in your publication details, and submit it to your HOD for approval through the committee pipeline.
              </p>
              <a
                href={formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rcta-download-btn"
              >
                <i className="fa-solid fa-file-arrow-down"></i>
                Download DOCX Form
              </a>
            </div>
            <div className="rcta-right">
              <div className="rcta-doc-icon">
                <i className="fa-solid fa-file-word"></i>
              </div>
              <span className="rcta-doc-label">Publication_Reimbursement_Form.docx</span>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Eligibility */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-circle-check"></i> Requirements</div>
            <h2>Eligibility <em>Criteria</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="reimbursement-eligibility">
            {eligibility.map((item, idx) => (
              <ScrollReveal key={idx} animation="fade-right">
              <div className="re-item">
                <div className="re-check"><i className="fa-solid fa-check"></i></div>
                <p>{item}</p>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reimbursement Tiers */}
      <section className="page-section">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-percent"></i> Rates</div>
            <h2>Reimbursement <em>Tiers</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="reimbursement-tiers">
            {tiers.map((t, idx) => (
              <ScrollReveal key={idx} animation="fade-up" delay={idx * 50} style={{ height: '100%' }}>
              <div className={`reimbursement-tier-card tier-${t.color}`} style={{ height: '100%' }}>
                <div className="rt-badge">{t.tier}</div>
                <div className="rt-pct">{t.pct}</div>
                <div className="rt-label">{t.label}</div>
                <div className="rt-cap">{t.cap}</div>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-arrows-turn-right"></i> Process</div>
            <h2>Claim <em>Process</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="reimbursement-steps">
            {steps.map((s, idx) => (
              <ScrollReveal key={idx} animation="fade-up" delay={idx * 50}>
              <div className="reimb-step">
                <div className="rs-icon"><i className={`fa-solid ${s.icon}`}></i></div>
                <div className="rs-num">{s.step}</div>
                <div className="rs-content">
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
                {idx < steps.length - 1 && <div className="rs-connector"></div>}
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
