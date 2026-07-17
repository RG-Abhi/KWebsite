import PageShell from './PageShell'

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Get in Touch"
      title="Contact"
      titleEm="KMIT"
      description="We'd love to hear from you. Reach out to our admissions team, placement cell, or general administration — we're here to help."
      breadcrumbs={[{ label: 'Contact' }]}
    >
      {/* Contact Info + Map */}
      <section className="page-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-cards">
              <h2 style={{fontFamily:'var(--font-serif)', fontSize:'1.6rem', color:'var(--navy)', marginBottom:'1.5rem'}}>Reach <em style={{color: 'var(--brand-orange-text)', fontStyle:'normal'}}>Us Directly</em></h2>
              {[
                { icon: 'fa-location-dot', label: 'Campus Address', value: '3-5-1026, Narayanguda, Hyderabad – 500 029, Telangana, India' },
                { icon: 'fa-phone', label: 'Phone', value: '040-23261407' },
                { icon: 'fa-envelope', label: 'Email', value: 'info@kmit.in' },
                { icon: 'fa-clock', label: 'Office Hours', value: 'Monday – Saturday, 9:00 AM – 5:00 PM' },
                { icon: 'fa-train-subway', label: 'Nearest Metro', value: 'Narayanguda Metro Station — 2 min walk' },
              ].map((item, i) => (
                <div key={i} className="contact-card">
                  <div className="contact-card-icon"><i className={`fa-solid ${item.icon}`}></i></div>
                  <div className="contact-card-text">
                    <strong>{item.label}</strong>
                    {item.label === 'Email'
                      ? <a href={`mailto:${item.value}`}>{item.value}</a>
                      : item.label === 'Phone'
                      ? <a href={`tel:${item.value.replace(/-/g,'')}`}>{item.value}</a>
                      : <p>{item.value}</p>
                    }
                  </div>
                </div>
              ))}
            </div>
            <div className="map-embed">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.303882191366!2d78.48784931418768!3d17.39719830710286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99c44533324f%3A0x8aa5456a7d836bb5!2sKeshav%20Memorial%20Institute%20Of%20Technology!5e0!3m2!1sen!2sin!4v1605358581165!5m2!1sen!2sin"
                allowFullScreen
                loading="lazy"
                title="KMIT Campus Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-building"></i> Department Contacts</div>
            <h2>Who to <em>Contact</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="info-cards-grid">
            {[
              { icon: 'fa-file-signature', dept: 'Admissions Office', desc: 'For enquiries about applications, eligibility, documents, fee payment, and the admission process.', email: 'admissions@kmit.in', phone: '040-23261407' },
              { icon: 'fa-briefcase', dept: 'Training & Placement Cell', desc: 'For companies wishing to recruit at KMIT or students seeking placement guidance and schedules.', email: 'placements@kmit.in', phone: '040-23261407' },
              { icon: 'fa-scroll', dept: 'Examination Branch', desc: 'For matters related to examinations, results, transcripts, certificates, and re-valuation applications.', email: 'exams@kmit.in', phone: '040-23261407' },
              { icon: 'fa-graduation-cap', dept: 'Academic Office', desc: 'For programme-related queries, academic calendar, regulations, syllabus, and faculty contact.', email: 'academics@kmit.in', phone: '040-23261407' },
            ].map((d, i) => (
              <div key={i} className="info-card">
                <div className="info-card-icon"><i className={`fa-solid ${d.icon}`}></i></div>
                <h3>{d.dept}</h3>
                <p>{d.desc}</p>
                <div style={{display:'flex', flexDirection:'column', gap:'0.4rem', marginTop:'0.5rem'}}>
                  <a href={`mailto:${d.email}`} style={{fontSize:'0.82rem', color: 'var(--brand-orange-text)', fontWeight:700, display:'flex', alignItems:'center', gap:'6px'}}>
                    <i className="fa-solid fa-envelope"></i> {d.email}
                  </a>
                  <a href={`tel:${d.phone.replace(/-/g,'')}`} style={{fontSize:'0.82rem', color:'var(--navy)', fontWeight:600, display:'flex', alignItems:'center', gap:'6px'}}>
                    <i className="fa-solid fa-phone"></i> {d.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social + Quick Links */}
      <section className="page-section">
        <div className="container" style={{textAlign:'center'}}>
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-share-nodes"></i> Follow Us</div>
            <h2>Stay <em>Connected</em></h2>
            <div className="section-divider"></div>
          </div>
          <div style={{display:'flex', gap:'1.5rem', justifyContent:'center', flexWrap:'wrap', marginTop:'1rem'}}>
            {[
              { icon: 'fa-brands fa-instagram', label: 'Instagram', color: '#E1306C', href: 'https://www.instagram.com/kmitofficial/' },
              { icon: 'fa-brands fa-linkedin', label: 'LinkedIn', color: '#0077B5', href: 'https://www.linkedin.com/school/kmit-hyderabad/' },
              { icon: 'fa-brands fa-youtube', label: 'YouTube', color: '#FF0000', href: 'https://www.youtube.com/@KMITHyderabad' },
              { icon: 'fa-brands fa-twitter', label: 'Twitter / X', color: '#1DA1F2', href: 'https://twitter.com/kmit_hyd' },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer"
                style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'0.5rem', padding:'1.5rem 2rem', border:'2px solid var(--light-grey)', borderRadius:'12px', minWidth:'120px', transition:'all 0.3s', color:s.color}}
                onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--light-grey)'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
              >
                <i className={`${s.icon}`} style={{fontSize:'2rem'}}></i>
                <span style={{fontSize:'0.82rem', fontWeight:700, color:'var(--navy)'}}>{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
