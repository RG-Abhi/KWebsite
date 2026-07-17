import { useState } from 'react'
import PageShell from './PageShell'

export default function AdmissionsFAQPage() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    { q: 'What is the EAPCET code for KMIT?', a: 'The EAPCET institute code for KMIT (Keshav Memorial Institute of Technology) is KMIT. Keep this handy when filling in your web counselling preferences.' },
    { q: 'Which branches are available at KMIT?', a: 'KMIT offers B.Tech in CSE (300 seats), CSE AI & ML (120 seats), CSE Data Science (60 seats), and Information Technology (60 seats). All programmes are affiliated to JNTU Hyderabad.' },
    { q: 'Is KMIT a private or government college?', a: 'KMIT is a private, autonomous engineering college affiliated to JNTU Hyderabad, approved by AICTE, New Delhi, and sponsored by the Keshav Memorial Education Society (KMES).' },
    { q: 'What are the cut-off ranks for KMIT?', a: 'Cut-off ranks vary by branch, category (OC/BC/SC/ST), and year. For the most current cut-off, refer to the TSCHE official website or contact the KMIT admissions office.' },
    { q: 'Does KMIT have hostel facilities?', a: 'KMIT does not operate a campus hostel. However, numerous paying guest accommodations and hostels are available in the surrounding Narayanguda area. The college assists students with information on nearby options.' },
    { q: 'Can I get a scholarship at KMIT?', a: 'Yes. KMIT supports all Telangana government-sanctioned scholarships including TS ePass (for SC/ST/EWS students). Merit-based concessions are also available. Contact the admissions office for details.' },
    { q: 'What is the admission process for lateral entry (ECET)?', a: 'Diploma holders or B.Sc graduates with Mathematics can apply via Telangana ECET. Lateral entry admits directly into the 2nd year (3rd semester) of B.Tech, subject to seat availability.' },
    { q: 'Is KMIT accredited? What is the NAAC grade?', a: 'Yes, KMIT is accredited by NAAC with an \'A+\' Grade and by NBA (for CSE and IT programmes). It is also NIRF ranked and maintains an IQAC for quality assurance.' },
    { q: 'What documents are required for admission?', a: 'Original SSC and Intermediate marksheets, EAPCET/ECET rank card, Aadhaar card, caste certificate (if applicable), residence/domicile certificate, and 6 passport-size photographs.' },
    { q: 'How can I contact the KMIT admissions office?', a: 'Phone: 040-23261407 | Email: info@kmit.in | Address: 3-5-1026, Narayanguda, Hyderabad – 500029. Office hours: Monday to Saturday, 9:00 AM – 5:00 PM.' },
    { q: 'How is KMIT connected to Genesis Solutions?', a: 'KMIT is co-promoted by Genesis Solutions Pvt. Ltd, a leading technology training company. This partnership brings industry-focused training, curriculum design inputs, and enhanced placement support for KMIT students.' },
    { q: 'How far is KMIT from the nearest metro station?', a: 'KMIT is approximately 2 minutes\' walk from the Narayanguda Metro Station, making it highly accessible from all parts of Hyderabad.' },
  ]

  return (
    <PageShell
      eyebrow="Common Questions"
      title="Admissions"
      titleEm="FAQs"
      description="Find answers to the most frequently asked questions about KMIT admissions — from eligibility and branches to scholarships and campus facilities."
      breadcrumbs={[{ label: 'Admissions', to: '/admissions' }, { label: 'FAQs' }]}
    >
      <section className="page-section">
        <div className="container" style={{maxWidth:'860px'}}>
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-clipboard-question"></i> Frequently Asked</div>
            <h2>Got <em>Questions?</em></h2>
            <div className="section-divider"></div>
            <p>{faqs.length} answers to the most common KMIT admissions queries.</p>
          </div>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item${openIndex === i ? ' open' : ''}`}>
                <button className="faq-question" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                  <span>{faq.q}</span>
                  <i className="fa-solid fa-plus"></i>
                </button>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section-alt">
        <div className="container">
          <div className="cta-banner">
            <div>
              <h3>Didn't Find Your Answer?</h3>
              <p>Our admissions team is available Monday–Saturday, 9 AM – 5 PM to answer all your queries.</p>
            </div>
            <div style={{display:'flex', gap:'1rem', flexWrap:'wrap', flexShrink:0}}>
              <a href="tel:04023261407" className="btn-white">
                <i className="fa-solid fa-phone"></i> 040-23261407
              </a>
              <a href="mailto:info@kmit.in" className="btn-primary">
                <i className="fa-solid fa-envelope"></i> Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
