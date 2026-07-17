import { useState, useEffect, useRef } from 'react'
import ScrollReveal from './ScrollReveal'

const TESTIMONIALS = [
  {
    name: 'Ms. SreeLaya',
    role: 'Software Development Engineer',
    company: 'Amazon, Dublin (Ireland)',
    package: '₹1.22 Crore CTC',
    year: 'Batch of 2024 (CSE)',
    image: 'https://api.dicebear.com/9.x/avataaars/svg?seed=SreeLaya&backgroundColor=b8e986',
    text: "My journey at KMIT was transformative. The academic rigor, combined with the hands-on project experience in advanced tech, gave me the skills and confidence to compete globally. Getting placed at Amazon Dublin at a package of 1.22 Cr is a testament to KMIT's world-class training."
  },
  {
    name: 'Sai Varshith',
    role: 'Open Source Contributor',
    company: 'Google Summer of Code 2025',
    package: 'GSoC Scholar',
    year: 'Class of 2026 (CSE AI&ML)',
    image: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Varshith&backgroundColor=75bbfd',
    text: "KMIT's strong developer culture and focus on coding standards inspired me to dive into open source. Being selected for Google Summer of Code is a dream come true, and the mentorship from my professors and peers at KMIT was instrumental in my success."
  },
  {
    name: 'Nikitha Reddy',
    role: 'Associate Software Engineer',
    company: 'ServiceNow',
    package: '₹42.3 LPA',
    year: 'Batch of 2025 (IT)',
    image: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Nikitha&backgroundColor=ffb7c5',
    text: "The finishing school program at KMIT is unmatched. It bridges the gap between academic theory and actual industry requirements. ServiceNow's recruitment process was highly technical, and the preparation sessions conducted by Genesis Solutions were perfect."
  },
  {
    name: 'Rohit Kumar',
    role: 'Technical Architect',
    company: 'Salesforce',
    package: '₹39.5 LPA',
    year: 'Batch of 2025 (CSE Data Science)',
    image: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Rohit&backgroundColor=fcd975',
    text: "From hackathons to sponsored research, KMIT offers constant opportunities to innovate. Landing a package of 39.5 LPA at Salesforce was made possible by the continuous coding challenges and placement training we received right from our second year."
  }
]

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const [fade, setFade] = useState(true)
  const autoPlayRef = useRef(null)

  const handleNext = () => {
    setFade(false)
    setTimeout(() => {
      setActive(prev => (prev + 1) % TESTIMONIALS.length)
      setFade(true)
    }, 200)
  }

  const handlePrev = () => {
    setFade(false)
    setTimeout(() => {
      setActive(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
      setFade(true)
    }, 200)
  }

  useEffect(() => {
    autoPlayRef.current = nextSlide
  })

  const nextSlide = () => {
    handleNext()
  }

  useEffect(() => {
    const play = () => {
      autoPlayRef.current()
    }
    const interval = setInterval(play, 6500)
    return () => clearInterval(interval)
  }, [])

  const current = TESTIMONIALS[active]

  return (
    <section className="testimonials-section">
      <div className="gm-deco gm-dots" style={{ top: '15%', right: '8%', opacity: 0.08 }}></div>
      <div className="gm-deco gm-ring" style={{ bottom: '10%', left: '5%', opacity: 0.05 }}></div>
      
      <div className="container testimonials-inner">
        <ScrollReveal animation="fade-up">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p className="section-eyebrow">Alumni Success Stories</p>
            <h2 className="section-title">KMITians <em>Speak</em></h2>
            <div style={{ width: '60px', height: '3px', background: 'var(--vibrant-accent)', margin: '0.8rem auto 0' }} />
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={200}>
          <div className="testimonial-carousel-container">
          <div className={`testimonial-card ${fade ? 'fade-in' : 'fade-out'}`}>
            <div className="testimonial-avatar-wrap">
              <img src={current.image} alt={current.name} />
              <div className="testimonial-badge">{current.package}</div>
            </div>
            
            <div className="testimonial-content">
              <i className="fa-solid fa-quote-left quote-icon"></i>
              <p className="testimonial-text">{current.text}</p>
              
              <div className="testimonial-footer">
                <h4 className="testimonial-name">{current.name}</h4>
                <div className="testimonial-meta">
                  <span className="testimonial-role">{current.role}</span>
                  <span className="meta-sep">|</span>
                  <span className="testimonial-company">{current.company}</span>
                </div>
                <span className="testimonial-year">{current.year}</span>
              </div>
            </div>
          </div>

          {/* Carousel Navigation */}
          <div className="testimonial-controls">
            <button className="ctrl-btn prev" onClick={handlePrev} aria-label="Previous testimonial">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div className="testimonial-indicators">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  className={`indicator-dot${active === i ? ' active' : ''}`}
                  onClick={() => {
                    setFade(false)
                    setTimeout(() => {
                      setActive(i)
                      setFade(true)
                    }, 200)
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button className="ctrl-btn next" onClick={handleNext} aria-label="Next testimonial">
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
