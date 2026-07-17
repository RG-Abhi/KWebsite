import { useState } from 'react'
import PageShell from './PageShell'

export default function ExamsContactPage() {
  const [formData, setFormData] = useState({
    email: '',
    category: 'Student',
    subject: ''
  })
  const [formState, setFormState] = useState('idle') // 'idle', 'submitting', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.email || !formData.subject) {
      setErrorMessage('Please fill in all fields.')
      return
    }

    setFormState('submitting')
    setErrorMessage('')

    // Simulate sending grievance mail (1:1 with the sendGrievanceMail backend endpoint behavior)
    setTimeout(() => {
      setFormState('success')
    }, 1200)
  }

  const contacts = [
    {
      branch: 'AUTONOMOUS',
      phone: '+91-9391614325',
      email: 'autonomousams@kmit.in',
      desc: 'Handles autonomous semester registrations, marks memos, CMMs, and graduation notifications.',
      icon: 'fa-graduation-cap',
      badgeColor: 'rgba(255, 107, 0, 0.1)',
      badgeText: 'var(--vibrant-accent)'
    },
    {
      branch: 'NON-AUTONOMOUS (JNTUH-Exams)',
      phone: '040-23261407',
      email: 'exams@kmit.in',
      desc: 'Handles external university registrations, legacy affiliations, and historical JNTUH records.',
      icon: 'fa-building-columns',
      badgeColor: 'rgba(15, 23, 42, 0.1)',
      badgeText: 'var(--navy)'
    }
  ]

  return (
    <PageShell
      eyebrow="Examinations"
      title="Contact"
      titleEm="Us"
      description="Get in touch with KMIT's Autonomous and Non-Autonomous Examination Branches, or file an official Grievance Redressal request."
      breadcrumbs={[{ label: 'Examinations', to: '/exams/notifications' }, { label: 'Contact Us' }]}
    >
      {/* ── Operating Timings & Banner ───────────────────────────────── */}
      <section className="page-section">
        <div className="container">
          <div style={{
            marginTop: '1rem',
            padding: '2rem',
            background: 'linear-gradient(135deg, var(--navy) 0%, #1a4080 100%)',
            borderRadius: '24px',
            color: '#ffffff',
            boxShadow: 'var(--shadow-lift)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '120px', height: '120px', background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }} />
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'var(--vibrant-accent, #fc7700)',
              display: 'grid',
              placeItems: 'center',
              fontSize: '1.5rem',
              flexShrink: 0
            }}>
              <i className="fa-solid fa-clock"></i>
            </div>
            <div>
              <h4 style={{ color: '#ffffff', fontWeight: '800', fontSize: '1.15rem', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Academic Examination Branch Timings
              </h4>
              <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.98rem', fontWeight: '700', margin: 0 }}>
                TIMINGS FROM 09:30AM TO 04:00PM (ONLY ON WORKING DAYS)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Contacts & Grievance Grid ─────────────────────────── */}
      <section className="page-section-alt">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'start'
          }}>
            
            {/* Left Column: Coordinates */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="section-header" style={{ marginBottom: '1.5rem' }}>
                <div className="section-eyebrow"><i className="fa-solid fa-address-card" /> Examination Branches</div>
                <h2 style={{ fontSize: '1.75rem' }}>Branch <em>Contacts</em></h2>
                <div className="section-divider" style={{ margin: '0.5rem 0' }} />
              </div>

              {contacts.map((c, i) => (
                <div key={i} style={{
                  background: 'var(--white)',
                  borderRadius: '20px',
                  padding: '2rem',
                  border: '1px solid var(--light-grey)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  position: 'relative',
                  transition: 'all 0.3s'
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      background: c.badgeColor,
                      color: c.badgeText,
                      padding: '4px 12px',
                      borderRadius: '8px',
                      fontSize: '0.72rem',
                      fontWeight: '800',
                      letterSpacing: '0.5px'
                    }}>
                      {c.branch}
                    </span>
                    <i className={`fa-solid ${c.icon}`} style={{ color: '#d1d5db', fontSize: '1.2rem' }}></i>
                  </div>
                  
                  <p style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                    {c.desc}
                  </p>

                  <div style={{ height: '1px', background: '#f3f4f6' }} />

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(10,22,40,0.05)', display: 'grid', placeItems: 'center', color: 'var(--navy)' }}>
                        <i className="fa-solid fa-phone" style={{ fontSize: '0.8rem' }} />
                      </div>
                      <a href={`tel:${c.phone.replace(/[^0-9+]/g, '')}`} style={{ color: 'var(--navy)', fontWeight: '800', fontSize: '0.92rem', textDecoration: 'none' }}>
                        {c.phone}
                      </a>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(10,22,40,0.05)', display: 'grid', placeItems: 'center', color: 'var(--navy)' }}>
                        <i className="fa-solid fa-envelope" style={{ fontSize: '0.8rem' }} />
                      </div>
                      <a href={`mailto:${c.email}`} style={{ color: 'var(--navy)', fontWeight: '700', fontSize: '0.92rem', textDecoration: 'underline' }}>
                        {c.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Grievance Redressal */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="section-header" style={{ marginBottom: '1.5rem' }}>
                <div className="section-eyebrow"><i className="fa-solid fa-circle-exclamation" /> Redressal</div>
                <h2 style={{ fontSize: '1.75rem' }}>Grievance <em>Redressal</em></h2>
                <div className="section-divider" style={{ margin: '0.5rem 0' }} />
              </div>

              <div style={{
                background: 'var(--white)',
                borderRadius: '24px',
                padding: '2.5rem',
                border: '1px solid var(--light-grey)',
                boxShadow: 'var(--shadow-lift)'
              }}>
                {formState === 'success' ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '2.5rem 0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.5rem'
                  }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'rgba(16, 185, 129, 0.1)',
                      color: '#10b981',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: '2rem'
                    }}>
                      <i className="fa-solid fa-circle-check"></i>
                    </div>
                    <div>
                      <h4 style={{ color: 'var(--navy)', fontWeight: '800', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                        Grievance Submitted Successfully!
                      </h4>
                      <p style={{ color: '#6b7280', fontSize: '0.92rem', lineHeight: '1.6', margin: 0 }}>
                        Your grievance redressal request has been sent to the examination office. We will evaluate it and get back to you shortly at <strong>{formData.email}</strong>.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setFormState('idle')
                        setFormData({ email: '', category: 'Student', subject: '' })
                      }}
                      style={{
                        background: 'var(--navy)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '10px',
                        fontWeight: '800',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        marginTop: '1rem'
                      }}
                    >
                      File Another Grievance
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                      Submit your examination grievances directly. Please specify your correct email so the AEB branch can reach back.
                    </p>

                    {/* Email Input */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label htmlFor="email" style={{ fontSize: '0.88rem', fontWeight: '800', color: 'var(--navy)' }}>
                        Enter Your Mail
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Your Mail ID"
                        value={formData.email}
                        onChange={handleInputChange}
                        style={{
                          padding: '0.85rem 1.1rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '10px',
                          outline: 'none',
                          fontSize: '0.92rem',
                          background: '#ffffff',
                          transition: 'border-color 0.2s'
                        }}
                        required
                      />
                    </div>

                    {/* Category Select */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label htmlFor="category" style={{ fontSize: '0.88rem', fontWeight: '800', color: 'var(--navy)' }}>
                        Choose
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        style={{
                          padding: '0.85rem 1.1rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '10px',
                          outline: 'none',
                          fontSize: '0.92rem',
                          background: '#ffffff',
                          cursor: 'pointer',
                          fontWeight: '600'
                        }}
                      >
                        <option value="Student">Student</option>
                        <option value="Faculty">Faculty</option>
                        <option value="Parents">Parents</option>
                      </select>
                    </div>

                    {/* Subject Textarea */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label htmlFor="subject" style={{ fontSize: '0.88rem', fontWeight: '800', color: 'var(--navy)' }}>
                        Subject
                      </label>
                      <textarea
                        id="subject"
                        name="subject"
                        placeholder="Write something details..."
                        value={formData.subject}
                        onChange={handleInputChange}
                        rows={6}
                        style={{
                          padding: '0.85rem 1.1rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '10px',
                          outline: 'none',
                          fontSize: '0.92rem',
                          background: '#ffffff',
                          resize: 'vertical',
                          lineHeight: '1.6'
                        }}
                        required
                      />
                    </div>

                    {errorMessage && (
                      <div style={{ color: 'var(--brand-orange-text)', fontSize: '0.85rem', fontWeight: '700' }}>
                        <i className="fa-solid fa-triangle-exclamation" style={{ marginRight: '6px' }} />
                        {errorMessage}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={formState === 'submitting'}
                      style={{
                        background: formState === 'submitting' ? '#9ca3af' : 'var(--navy)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '1rem',
                        borderRadius: '12px',
                        fontWeight: '800',
                        fontSize: '0.95rem',
                        cursor: formState === 'submitting' ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'background 0.2s',
                        boxShadow: '0 8px 12px -3px rgba(15, 23, 42, 0.2)'
                      }}
                    >
                      {formState === 'submitting' ? (
                        <>Submitting...</>
                      ) : (
                        <>
                          <i className="fa-solid fa-paper-plane" style={{ fontSize: '0.85rem' }}></i> Submit
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </PageShell>
  )
}
