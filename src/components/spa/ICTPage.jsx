import { useEffect, useRef } from 'react'
import PageShell from './PageShell'

export default function ICTPage() {
  const swiperRef = useRef(null)

  useEffect(() => {
    // 1. Dynamically load Swiper CSS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/swiper/swiper-bundle.min.css'
    link.id = 'swiper-cdn-css'
    document.head.appendChild(link)

    // 2. Dynamically load Swiper JS
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/swiper/swiper-bundle.min.js'
    script.id = 'swiper-cdn-js'
    script.onload = () => {
      // Once loaded, initialize the swiper with the exact parameters from KMIT's original index.php
      if (window.Swiper) {
        swiperRef.current = new window.Swiper('.swiper-container', {
          effect: 'coverflow',
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: 'auto',
          coverflowEffect: {
            rotate: 20,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
          },
          loop: true,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          }
        })
      }
    }
    document.body.appendChild(script)

    // Clean up dynamically added scripts/styles on unmount
    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy?.(true, true)
      }
      document.getElementById('swiper-cdn-css')?.remove()
      document.getElementById('swiper-cdn-js')?.remove()
    }
  }, [])

  const sections = [
    {
      title: '1. Use of Technology',
      content: [
        { label: 'Smart Classrooms', desc: 'Equipped with projectors, screens, and interactive boards, smart classrooms allow faculty to present dynamic multimedia content like videos, animations, and live coding demonstrations, making learning more engaging.' },
        { label: 'Learning Management Systems (LMS)', desc: 'KMIT uses platforms like Tesseract, KMIT vista YouTube channel, Tessellator, kmitonline.com, Tantrik, Toofan, Prashnmanch or other LMS tools to share resources, track assignments, and engage students in discussions.' }
      ]
    },
    {
      title: '2. Active Learning Methods',
      content: [
        { label: 'Case Studies', desc: 'Real-world examples and case studies are often used to relate theoretical knowledge to practical applications, enabling students to understand the relevance of what they are learning.' },
        { label: 'Problem-Based Learning (PBL)', desc: 'Students are presented with a problem and asked to find solutions collaboratively, enhancing their problem-solving and teamwork abilities.' }
      ]
    },
    {
      title: '3. Flipped Classroom',
      desc: 'In a flipped classroom, students review learning materials (such as lecture videos or readings) outside of class and then engage in hands-on activities, discussions, and projects during class time. This promotes better retention of concepts and encourages peer-to-peer learning.'
    },
    {
      title: '4. Interactive Assessments and Quizzes',
      desc: 'Digital tools like Tessellator, Telescope, Toofan, Prashnamanch quizzes can be used to conduct interactive quizzes during lessons, helping students to test their understanding in real-time and get instant feedback.'
    },
    {
      title: '5. Industry Collaboration',
      desc: 'KMIT might collaborate with industry professionals, offering guest lectures, workshops, or live projects that allow students to interact with experts and gain insights into current industry trends and challenges.'
    },
    {
      title: '6. Hands-on Practice',
      desc: 'Labs and practical sessions are emphasized in KMIT’s teaching approach. Students are encouraged to work on real projects, experiments, or simulations, particularly in fields like Computer Science.'
    },
    {
      title: '7. Audio-Visual Centre',
      desc: 'The Audio-Visual Centre at KMIT is dedicated to the creation and enhancement of audio and video content for educational purposes. It is equipped with advanced audio-visual technologies, making it an essential facility for creating professional-grade multimedia content. This facility is designed for both small-scale and large-scale production of e-content, from recording lectures to producing high-definition videos for online platforms.',
      list: [
        'High-definition video cameras and microphones',
        'Editing software for audio and video content',
        'Studio space for recording and production',
        'Technical support for troubleshooting and ensuring quality output',
        'Equipment for live streaming and recording of events and lectures'
      ]
    }
  ]

  const benefits = [
    { label: 'Enhanced Student Engagement', text: 'By actively involving students in the learning process, the classroom becomes a more dynamic and motivating environment.' },
    { label: 'Improved Retention', text: 'Interactive learning methods have been shown to improve long-term retention and understanding of concepts.' },
    { label: 'Better Communication and Collaboration', text: 'Students learn to work in teams, improving their collaboration and communication skills—valuable assets in both academic and professional settings.' }
  ]

  const totalSlides = Array.from({ length: 20 }, (_, i) => i + 1)

  return (
    <PageShell
      eyebrow="Uniqueness"
      title="Interactive"
      titleEm="Classroom Teaching"
      description="Interactive classroom teaching at KMIT is a modern approach aimed at enhancing the learning experience by promoting active participation, engagement, and hands-on digital tools."
      breadcrumbs={[{ label: 'Uniqueness', to: '/campus/library' }, { label: 'ICT' }]}
    >
      {/* Overview Block */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-chalkboard-user"></i> Pedagogical Style</div>
            <h2>Active Classroom Engagement</h2>
            <div className="section-divider"></div>
          </div>
          <div className="content-text-block fade-in-up" style={{ fontSize: '1.15rem', lineHeight: '1.9', color: 'var(--text-dark, #374151)' }}>
            <p>
              Interactive classroom teaching at Keshav Memorial Institute of Technology (KMIT) is a modern approach aimed at enhancing the learning experience by promoting active participation from students. This method encourages engagement and collaboration, moving away from traditional lecture-based teaching. Here\'s how interactive classroom teaching is implemented at KMIT:
            </p>
          </div>
        </div>
      </section>

      {/* Grid of Original Content Sections */}
      <section className="page-section-alt">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            {sections.map((sect, i) => (
              <div key={i} className="fade-in-up" style={{
                background: 'var(--white, #ffffff)',
                border: '1px solid var(--light-grey, #e5e7eb)',
                borderRadius: '12px',
                padding: '2.5rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
              }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--navy, #0f172a)', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
                  {sect.title}
                </h3>
                
                {sect.desc && (
                  <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-dark, #4b5563)', textAlign: 'justify', margin: 0 }}>
                    {sect.desc}
                  </p>
                )}

                {sect.content && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {sect.content.map((c, idx) => (
                      <div key={idx}>
                        <strong style={{ display: 'block', fontSize: '1.1rem', color: 'var(--deep-teal, #14777F)', marginBottom: '0.25rem' }}>• {c.label}</strong>
                        <p style={{ margin: 0, fontSize: '1rem', lineHeight: '1.7', color: 'var(--text-dark, #4b5563)', textAlign: 'justify' }}>{c.desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                {sect.list && (
                  <ul style={{ margin: '1rem 0 0 1.5rem', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '1rem', color: 'var(--text-dark, #4b5563)' }}>
                    {sect.list.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="page-section">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-square-check"></i> Impact</div>
            <h2>Benefits of Interactive Classroom Teaching at <em>KMIT</em></h2>
            <div className="section-divider"></div>
          </div>

          <div className="info-cards-grid fade-in-up" style={{ marginTop: '2.5rem' }}>
            {benefits.map((b, i) => (
              <div key={i} className="info-card">
                <div className="info-card-icon" style={{ background: 'rgba(20, 119, 127, 0.08)', color: 'var(--deep-teal, #14777F)' }}>
                  <i className="fa-solid fa-check"></i>
                </div>
                <h3>{b.label}</h3>
                <p>{b.text}</p>
              </div>
            ))}
          </div>

          <div className="fade-in-up" style={{ marginTop: '2.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '2rem', textAlign: 'justify', fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-dark, #4b5563)' }}>
            Overall, interactive classroom teaching at KMIT aims to create an environment where students are not passive recipients of information but active participants in their learning journey.
          </div>
        </div>
      </section>

      {/* 1:1 Swiper Coverflow Slider Section */}
      <section className="page-section-alt" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-images"></i> Traces of Lenses Club</div>
            <h2>Interactive Classroom <em>Gallery</em></h2>
            <div className="section-divider"></div>
          </div>

          <div style={{ position: 'relative', marginTop: '2rem' }} className="fade-in-up">
            <div className="swiper-container" style={{ width: '100%', padding: '50px 0' }}>
              <div className="swiper-wrapper">
                {totalSlides.map((num) => (
                  <div key={num} className="swiper-slide" style={{
                    width: 'auto',
                    height: '350px',
                    background: '#000',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                    borderRadius: '8px',
                    overflow: 'hidden'
                  }}>
                    <img 
                      src={`/assets/ict/ict_img_${num}.jpg`} 
                      alt={`Interactive Classroom ${num}`} 
                      style={{ height: '350px', width: 'auto', display: 'block', objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>
              
              {/* Add Pagination */}
              <div className="swiper-pagination" style={{ position: 'relative', marginTop: '20px' }}></div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
