import React from 'react'
import PageShell from './PageShell'
import ResearchPublicationsSection from './ResearchPublicationsSection'
import './ResearchEthicsPage.css'
import ScrollReveal from '../ScrollReveal'

const plagiarismForms = [
  'Using the exact words of another writer without both citation and quotation marks.',
  'Cutting and pasting material from Internet or other electronic resources without proper citation.',
  'Including paraphrased or summarized ideas of another writer without acknowledging the source.',
  'Accepting excessive assistance from another person without informing readers of that collaboration.',
  'Submitting for credit a paper written by another person — purchased, shared, stolen, or found.',
  'Submitting music, drawings, paintings, sculptures or photographs that copy the work of other artists without citing the source.',
  'Writing a computer program that is the same or closely similar to existing sources without attribution.',
  'Claiming credit for a project, poster, or multimedia presentation that draws dishonestly on others\u2019 work.'
]

const consequences = [
  { icon: 'fa-pen-to-square', title: 'Rewrite Required', desc: 'When the professor judges unintentional plagiarism due to unfamiliarity with citation conventions, the student may be required to rewrite the paper.', level: 'warning' },
  { icon: 'fa-circle-minus', title: 'Grade Reduction', desc: 'A lower grade may be awarded for the paper or assignment to reflect the severity of the academic integrity violation.', level: 'warning' },
  { icon: 'fa-xmark-circle', title: 'Failing Grade', desc: 'Deliberate plagiarism will result in a failing grade for the paper or entire course, and the case must be reported to the Provost.', level: 'danger' },
  { icon: 'fa-ban', title: 'Dismissal', desc: 'Repeated plagiarism, even when each instance is dismissed individually, may result in dismissal from the college by the Provost.', level: 'danger' },
]

export default function ResearchEthicsPage() {
  return (
    <PageShell
      eyebrow="Research"
      title="Code of"
      titleEm="Ethics"
      description="KMIT upholds the highest standards of academic integrity — protecting the trust, honesty, and originality that are foundational to scholarly work."
      breadcrumbs={[
        { label: 'Research', to: '/research' },
        { label: 'Code of Ethics' }
      ]}
    >
      {/* Anti-Plagiarism Policy Intro */}
      <section className="page-section">
        <div className="container">
          <ScrollReveal animation="fade-up">
          <div className="ethics-hero-block">
            <div className="ethics-icon-wrap">
              <i className="fa-solid fa-scale-balanced"></i>
            </div>
            <div className="ethics-hero-text">
              <span className="ethics-label">Anti-Plagiarism Policy</span>
              <h2>Academic <em>Integrity</em> Statement</h2>
              <p>
                Plagiarism is the dishonest presentation of the work of others as if it were one's own. 
                It violates the expectations of trust and honesty necessary for academic work in an ethical community and is treated as a serious offense.
              </p>
              <p>
                In addition, plagiarism undercuts the basic purposes of higher education by short-circuiting the processes of inquiry, reflection, and communication that lead to genuine learning and innovation.
              </p>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Forms of Plagiarism */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-list"></i> Violations</div>
            <h2>Forms of <em>Plagiarism</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="ethics-violations-list">
            {plagiarismForms.map((form, idx) => (
              <ScrollReveal key={idx} animation="fade-right">
              <div className="ethics-violation-item">
                <div className="ev-icon"><i className="fa-solid fa-triangle-exclamation"></i></div>
                <p>{form}</p>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Duplicate Submission */}
      <section className="page-section">
        <div className="container">
          <ScrollReveal animation="fade-up">
          <div className="ethics-callout">
            <i className="fa-solid fa-copy ethics-callout-icon"></i>
            <div>
              <h3>Duplicate Submission</h3>
              <p>
                Duplicate submission violates academic integrity because every assignment presumes that new inquiry and effort will produce new learning.
                Submitting the same original paper for credit in more than one class in the same semester — without expressed permission from both instructors — is not acceptable.
                Using the same paper or closely similar material from one semester to fulfill a requirement in another semester is also normally not allowed without specific permission from the instructor.
              </p>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Consequences */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-gavel"></i> Enforcement</div>
            <h2>Consequences of <em>Violation</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="ethics-consequences-grid">
            {consequences.map((c, idx) => (
              <ScrollReveal key={idx} animation="fade-up" style={{ height: '100%' }}>
              <div className={`ethics-consequence-card ${c.level}`} style={{ height: '100%' }}>
                <div className="ec-icon"><i className={`fa-solid ${c.icon}`}></i></div>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
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
