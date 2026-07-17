import { useState } from 'react'
import PageShell from './PageShell'
import ScrollReveal from '../ScrollReveal'

export default function ParishadPage() {
  const [showRegForm, setShowRegForm] = useState(false)

  const getAbsoluteUrl = (url) => {
    if (!url) return ''
    if (url.startsWith('http')) return encodeURI(url)
    if (url.startsWith('/')) return encodeURI(`https://kmit.in${url}`)
    return encodeURI(`https://kmit.in/${url}`)
  }

  const getViewerUrl = (url) => {
    const absolute = getAbsoluteUrl(url)
    if (absolute.toLowerCase().endsWith('.pdf')) {
      return `https://kmit.in/pdfjs/web/viewer_with_download.html?file=${encodeURIComponent(absolute)}`
    }
    return absolute
  }
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    gender: '',
    rollnumber: '',
    gradyear: '',
    email: '',
    mnumber: '',
    department: '',
    masters: '',
    heuniv: '',
    helocation: '',
    hedegree: '',
    heyear: '',
    currcity: '',
    currcountry: '',
    currstatus: '',
    wemployer: '',
    wlocation: '',
    wdesignation: '',
    wsdate: '',
    wedate: '',
    stuniv: '',
    stlocation: '',
    stucourse: '',
    stsdate: '',
    stedate: '',
    otheroption: '',
    epcompany: '',
    eplocation: '',
    epdesignation: '',
    epsdate: '',
    epcin: '',
    cpoption: '',
    cpdate: '',
    otcomments: ''
  })

  const [activeStep, setActiveStep] = useState(1)

  const events = [
    { id: 1, name: 'ANNUAL ALUMNI MEET 2025', date: '03/01/2026', link: null },
    { id: 2, name: 'FIRE SIDE CHAT - MAY EDITION', date: '05/03/2025', link: null },
    { id: 3, name: 'FIRE SIDE CHAT - APRIL EDITION', date: '04/05/2025', link: null },
    { id: 4, name: 'GUEST LECTURE - MARCH EDITION', date: '03/12/2025', link: null },
    { id: 5, name: 'FIRE SIDE CHAT - MARCH EDITION', date: '03/01/2025', link: null },
    { id: 6, name: 'GUEST LECTURE - FEBRUARY EDITION', date: '02/18/2025', link: 'https://kmit.in/intiatives/alumni/guest lecture-february edition.pdf' },
    { id: 7, name: 'FIRE SIDE CHAT - FEBRUARY EDITION', date: '02/08/2025', link: null },
    { id: 8, name: 'ANNUAL ALUMNI MEET 2024', date: '12/21/2024', link: 'https://kmit.in/intiatives/alumni/alumni meet 2024.pdf' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate successful registration
    setFormSubmitted(true)
  }

  const nextStep = () => setActiveStep(prev => Math.min(prev + 1, 3))
  const prevStep = () => setActiveStep(prev => Math.max(prev - 1, 1))

  return (
    <PageShell
      eyebrow="Student Life"
      title="KMIT Parishad"
      titleEm="Society"
      description="alumni.kmit.in is the official website of KMIT Alumni. It is one of the flagship initiatives of KMIT Alumni Association to keep the entire fraternity together."
      breadcrumbs={[
        { label: 'Student Life', to: '/student-life' },
        { label: 'KMIT Parishad' }
      ]}
    >
      {/* Intro section */}
      <section className="page-section">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}>
            <ScrollReveal animation="fade-up">
            <div>
              <img 
                src="https://kmit.in/intiatives/alumni.png" 
                alt="KMIT Parishad Alumni" 
                style={{
                  width: '100%',
                  borderRadius: '24px',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                  border: '1px solid var(--glass-border, rgba(255,255,255,0.12))'
                }} 
              />
            </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={200}>
            <div>
              <div className="section-eyebrow">
                <i className="fa-solid fa-users"></i> Alumni Association
              </div>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '1.2rem', fontWeight: '700' }}>
                Welcoming You Back <em>Home</em>
              </h2>
              <div className="section-divider" style={{ margin: '0 0 1.5rem 0' }}></div>
              <p style={{ lineHeight: '1.7', opacity: 0.9, fontSize: '1.05rem', marginBottom: '1.5rem' }}>
                The KMIT Parishad Society stands as a powerful testament to our graduates' legacy. Designed to connect, inspire, and support, this network links past achievements with future possibilities, helping alumni collaborate, find mentorship opportunities, and contribute to KMIT's growth.
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
                <a 
                  href="https://alumni.kmit.in/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none',
                    padding: '0.8rem 1.6rem',
                    borderRadius: '50px',
                    fontWeight: '600',
                    background: 'linear-gradient(135deg, var(--primary-color, #008080), #1c9ba6)',
                    color: '#fff',
                    boxShadow: '0 4px 15px rgba(0, 128, 128, 0.3)'
                  }}
                >
                  <i className="fa-solid fa-arrow-up-right-from-square"></i> HopOn to Alumni Portal
                </a>
                
                <a 
                  href="https://www.instagram.com/kmit_alumni/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-outline"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '50px',
                    fontWeight: '600',
                    border: '1px solid rgba(225, 48, 108, 0.5)',
                    color: '#e1306c',
                    background: 'transparent',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(225, 48, 108, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <i className="fa-brands fa-instagram"></i> Follow Instagram
                </a>
              </div>

              <div 
                style={{
                  background: 'var(--glass-bg, rgba(255,255,255,0.05))',
                  border: '1px solid var(--glass-border, rgba(255,255,255,0.1))',
                  borderRadius: '16px',
                  padding: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div style={{
                  background: 'rgba(0, 128, 128, 0.1)',
                  color: 'var(--primary-color, #008080)',
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>
                  <i className="fa-solid fa-address-book"></i>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 0.2rem 0', fontWeight: '600', fontSize: '1rem' }}>Faculty In-Charge</h4>
                  <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>
                    <strong>Ms. Kamal Vijetha</strong> (Assistant Professor) <br/>
                    Contact Number: <a href="tel:9440167315" style={{ color: 'inherit', fontWeight: '600' }}>9440167315</a>
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setShowRegForm(!showRegForm)} 
                className="btn"
                style={{
                  marginTop: '1.5rem',
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '12px',
                  fontWeight: '600',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 15px rgba(16, 185, 129, 0.2)',
                  transition: 'transform 0.2s'
                }}
                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <i className="fa-solid fa-user-plus"></i> {showRegForm ? 'Close Registration Form' : 'Register with KMIT Parishad'}
              </button>
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Registration Form (Conditionally shown) */}
      {showRegForm && (
        <section className="page-section-alt" id="registration-form">
          <div className="container" style={{ maxWidth: '850px' }}>
            <div style={{
              background: 'var(--glass-bg, rgba(255,255,255,0.06))',
              border: '1px solid var(--glass-border, rgba(255,255,255,0.12))',
              borderRadius: '24px',
              padding: '2.5rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              {formSubmitted ? (
                <ScrollReveal animation="fade-up">
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.1)',
                    color: '#10b981',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                    marginBottom: '1.5rem'
                  }}>
                    <i className="fa-solid fa-circle-check"></i>
                  </div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.8rem' }}>Registration Successful!</h3>
                  <p style={{ opacity: 0.8, maxWidth: '500px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
                    Thank you, <strong>{formData.firstname}</strong>, for registering with the KMIT Parishad Society. Your response has been saved and your alumni profile is pending verification.
                  </p>
                  <button 
                    onClick={() => {
                      setFormSubmitted(false)
                      setShowRegForm(false)
                      setActiveStep(1)
                    }}
                    className="btn btn-primary"
                    style={{ padding: '0.75rem 2rem', borderRadius: '50px' }}
                  >
                    Return to Page
                  </button>
                </div>
                </ScrollReveal>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="section-header centered" style={{ marginBottom: '2rem' }}>
                    <h2>Alumni <em>Registration</em></h2>
                    <p>Please fill this form thoroughly to register in the official Alumni database.</p>
                    
                    {/* Stepper progress */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '1rem',
                      marginTop: '1.5rem'
                    }}>
                      <span style={{
                        padding: '0.35rem 0.8rem',
                        borderRadius: '50px',
                        background: activeStep === 1 ? 'var(--primary-color, #008080)' : 'rgba(255,255,255,0.1)',
                        color: activeStep === 1 ? '#white' : 'inherit',
                        fontSize: '0.85rem',
                        fontWeight: '600'
                      }}>1. Personal info</span>
                      <span style={{ width: '40px', height: '2px', background: 'rgba(255,255,255,0.1)' }}></span>
                      <span style={{
                        padding: '0.35rem 0.8rem',
                        borderRadius: '50px',
                        background: activeStep === 2 ? 'var(--primary-color, #008080)' : 'rgba(255,255,255,0.1)',
                        color: activeStep === 2 ? '#white' : 'inherit',
                        fontSize: '0.85rem',
                        fontWeight: '600'
                      }}>2. Education</span>
                      <span style={{ width: '40px', height: '2px', background: 'rgba(255,255,255,0.1)' }}></span>
                      <span style={{
                        padding: '0.35rem 0.8rem',
                        borderRadius: '50px',
                        background: activeStep === 3 ? 'var(--primary-color, #008080)' : 'rgba(255,255,255,0.1)',
                        color: activeStep === 3 ? '#white' : 'inherit',
                        fontSize: '0.85rem',
                        fontWeight: '600'
                      }}>3. Professional info</span>
                    </div>
                  </div>

                  {/* Step 1: Personal Details */}
                  {activeStep === 1 && (
                    <div className="fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem' }}>
                        <div>
                          <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>First Name *</label>
                          <input type="text" name="firstname" className="form-control" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.1)', color: 'inherit' }} value={formData.firstname} onChange={handleInputChange} required />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>Last Name *</label>
                          <input type="text" name="lastname" className="form-control" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.1)', color: 'inherit' }} value={formData.lastname} onChange={handleInputChange} required />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem' }}>
                        <div>
                          <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>Gender *</label>
                          <select name="gender" className="form-control" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.2)', color: 'inherit' }} value={formData.gender} onChange={handleInputChange} required>
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>Roll Number (e.g., 07BD1A0501) *</label>
                          <input type="text" name="rollnumber" className="form-control" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.1)', color: 'inherit' }} value={formData.rollnumber} onChange={handleInputChange} required />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem' }}>
                        <div>
                          <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>Department *</label>
                          <select name="department" className="form-control" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.2)', color: 'inherit' }} value={formData.department} onChange={handleInputChange} required>
                            <option value="">Select Department</option>
                            <option value="AIML">CSE (AI & ML)</option>
                            <option value="CSE">CSE</option>
                            <option value="DS">CSE (Data Science)</option>
                            <option value="ECE">ECE</option>
                            <option value="EIE">EIE</option>
                            <option value="IT">Information Technology</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>Graduation Year *</label>
                          <input type="date" name="gradyear" className="form-control" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.1)', color: 'inherit' }} value={formData.gradyear} onChange={handleInputChange} required />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem' }}>
                        <div>
                          <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>Email ID *</label>
                          <input type="email" name="email" className="form-control" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.1)', color: 'inherit' }} value={formData.email} onChange={handleInputChange} required />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>Mobile Number *</label>
                          <input type="tel" name="mnumber" className="form-control" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.1)', color: 'inherit' }} value={formData.mnumber} onChange={handleInputChange} required />
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <button type="button" onClick={nextStep} className="btn btn-primary" style={{ padding: '0.7rem 2rem', borderRadius: '8px' }}>
                          Next Section <i className="fa-solid fa-arrow-right" style={{ marginLeft: '0.5rem' }}></i>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Higher Education */}
                  {activeStep === 2 && (
                    <div className="fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>
                          Have you pursued/completed a Master's degree or any other Higher Education? *
                        </label>
                        <select name="masters" className="form-control" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.2)', color: 'inherit' }} value={formData.masters} onChange={handleInputChange} required>
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>

                      {formData.masters === 'Yes' && (
                        <div className="fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', padding: '1rem', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '12px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem' }}>
                            <div>
                              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>Name of the University *</label>
                              <input type="text" name="heuniv" className="form-control" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.1)', color: 'inherit' }} value={formData.heuniv} onChange={handleInputChange} required={formData.masters === 'Yes'} />
                            </div>
                            <div>
                              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>University Location *</label>
                              <input type="text" name="helocation" className="form-control" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.1)', color: 'inherit' }} value={formData.helocation} onChange={handleInputChange} required={formData.masters === 'Yes'} />
                            </div>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem' }}>
                            <div>
                              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>Name of the Degree *</label>
                              <input type="text" name="hedegree" className="form-control" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.1)', color: 'inherit' }} value={formData.hedegree} onChange={handleInputChange} placeholder="e.g., MS in Computer Science" required={formData.masters === 'Yes'} />
                            </div>
                            <div>
                              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>Year of Completion *</label>
                              <input type="date" name="heyear" className="form-control" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.1)', color: 'inherit' }} value={formData.heyear} onChange={handleInputChange} required={formData.masters === 'Yes'} />
                            </div>
                          </div>
                        </div>
                      )}

                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                        <button type="button" onClick={prevStep} className="btn btn-outline" style={{ padding: '0.7rem 1.8rem', borderRadius: '8px' }}>
                          <i className="fa-solid fa-arrow-left" style={{ marginRight: '0.5rem' }}></i> Previous
                        </button>
                        <button type="button" onClick={nextStep} className="btn btn-primary" style={{ padding: '0.7rem 2rem', borderRadius: '8px' }}>
                          Next Section <i className="fa-solid fa-arrow-right" style={{ marginLeft: '0.5rem' }}></i>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Professional Info */}
                  {activeStep === 3 && (
                    <div className="fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem' }}>
                        <div>
                          <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>Current City</label>
                          <input type="text" name="currcity" className="form-control" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.1)', color: 'inherit' }} value={formData.currcity} onChange={handleInputChange} />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>Current Country</label>
                          <input type="text" name="currcountry" className="form-control" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.1)', color: 'inherit' }} value={formData.currcountry} onChange={handleInputChange} />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>Current Status *</label>
                        <select name="currstatus" className="form-control" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.2)', color: 'inherit' }} value={formData.currstatus} onChange={handleInputChange} required>
                          <option value="">Select Status</option>
                          <option value="Working">Working</option>
                          <option value="Studying">Studying (MBA/MS/Others)</option>
                          <option value="Entrepreneur">Entrepreneur</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>

                      {/* Working Fields */}
                      {formData.currstatus === 'Working' && (
                        <div className="fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', padding: '1rem', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '12px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
                            <div>
                              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>Employer Name *</label>
                              <input type="text" name="wemployer" className="form-control" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.1)', color: 'inherit' }} value={formData.wemployer} onChange={handleInputChange} required={formData.currstatus === 'Working'} />
                            </div>
                            <div>
                              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>Location *</label>
                              <input type="text" name="wlocation" className="form-control" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.1)', color: 'inherit' }} value={formData.wlocation} onChange={handleInputChange} required={formData.currstatus === 'Working'} />
                            </div>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem' }}>
                            <div>
                              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>Designation *</label>
                              <input type="text" name="wdesignation" className="form-control" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.1)', color: 'inherit' }} value={formData.wdesignation} onChange={handleInputChange} required={formData.currstatus === 'Working'} />
                            </div>
                            <div>
                              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>Start Date *</label>
                              <input type="date" name="wsdate" className="form-control" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.1)', color: 'inherit' }} value={formData.wsdate} onChange={handleInputChange} required={formData.currstatus === 'Working'} />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Studying Fields */}
                      {formData.currstatus === 'Studying' && (
                        <div className="fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', padding: '1rem', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '12px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
                            <div>
                              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>University Name *</label>
                              <input type="text" name="stuniv" className="form-control" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.1)', color: 'inherit' }} value={formData.stuniv} onChange={handleInputChange} required={formData.currstatus === 'Studying'} />
                            </div>
                            <div>
                              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>Location *</label>
                              <input type="text" name="stlocation" className="form-control" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.1)', color: 'inherit' }} value={formData.stlocation} onChange={handleInputChange} required={formData.currstatus === 'Studying'} />
                            </div>
                          </div>
                          <div>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>Course / Program *</label>
                            <input type="text" name="stucourse" className="form-control" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.1)', color: 'inherit' }} value={formData.stucourse} onChange={handleInputChange} placeholder="e.g., MBA Finance" required={formData.currstatus === 'Studying'} />
                          </div>
                        </div>
                      )}

                      {/* Entrepreneur Fields */}
                      {formData.currstatus === 'Entrepreneur' && (
                        <div className="fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', padding: '1rem', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '12px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
                            <div>
                              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>Company Name *</label>
                              <input type="text" name="epcompany" className="form-control" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.1)', color: 'inherit' }} value={formData.epcompany} onChange={handleInputChange} required={formData.currstatus === 'Entrepreneur'} />
                            </div>
                            <div>
                              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>Designation *</label>
                              <input type="text" name="epdesignation" className="form-control" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.1)', color: 'inherit' }} value={formData.epdesignation} onChange={handleInputChange} required={formData.currstatus === 'Entrepreneur'} />
                            </div>
                          </div>
                        </div>
                      )}

                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                        <button type="button" onClick={prevStep} className="btn btn-outline" style={{ padding: '0.7rem 1.8rem', borderRadius: '8px' }}>
                          <i className="fa-solid fa-arrow-left" style={{ marginRight: '0.5rem' }}></i> Previous
                        </button>
                        <button type="submit" className="btn btn-primary animate-pulse" style={{ padding: '0.75rem 2.5rem', borderRadius: '8px', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', color: '#white', fontWeight: '600' }}>
                          Complete Registration <i className="fa-solid fa-circle-check" style={{ marginLeft: '0.5rem' }}></i>
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Events section */}
      <section className="page-section">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow">
              <i className="fa-solid fa-calendar-days"></i> Activities
            </div>
            <h2>
              Alumni <em>Events & Meetups</em>
            </h2>
            <div className="section-divider"></div>
            <p>
              Parishad regularly hosts interactive fireside chats, annual general reunions, and guest lectures to keep our alumni community engaged.
            </p>
          </div>

          <div className="data-table-wrapper fade-in-up" style={{ marginTop: '2rem' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '80px', textAlign: 'center' }}>S.No</th>
                  <th>Name of the Event</th>
                  <th style={{ width: '180px', textAlign: 'center' }}>Date of Event</th>
                  <th style={{ width: '180px', textAlign: 'center' }}>Resources</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={event.id}>
                    <td style={{ textAlign: 'center', fontWeight: '600', opacity: 0.8 }}>{index + 1}</td>
                    <td style={{ fontWeight: '500' }}>{event.name}</td>
                    <td style={{ textAlign: 'center', opacity: 0.9 }}>{event.date}</td>
                    <td style={{ textAlign: 'center' }}>
                      {event.link ? (
                        <a 
                          href={getViewerUrl(event.link)} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            color: '#ef4444',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            background: 'rgba(239, 68, 68, 0.08)',
                            padding: '0.35rem 0.75rem',
                            borderRadius: '6px',
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)'}
                        >
                          <i className="fa-solid fa-file-pdf"></i> View Event PDF
                        </a>
                      ) : (
                        <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>--</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Society info / core values */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow">
              <i className="fa-solid fa-gem"></i> Core Purpose
            </div>