import { useState } from 'react'
import PageShell from './PageShell'
import ScrollReveal from '../ScrollReveal'

export default function AnnualEventsPage() {
  const events = [
    {
      title: 'Republic Day 2026',
      image: '/photos/annualevents/Republic_day_2026.webp',
      desc: "KMIT commemorated India's 77th Republic Day with immense patriotic zeal and cultural spirit. The celebrations commenced with the traditional flag-hoisting ceremony, graced by the presence of our entire academic fraternity.",
      highlights: [
        'Flag hoisting followed by the resonant singing of the national anthem',
        'Inspiring patriotic addresses and vibrant cultural displays',
        'A gathering that reflected unity, diversity, and collective national pride'
      ]
    },
    {
      title: 'Patang Utsav 2026',
      image: '/photos/annualevents/patang_2026.webp',
      desc: "Keshav Memorial Institute of Technology celebrated its much-awaited annual fest – Patang Utsav 2026, a vibrant tribute to soaring spirits and boundless creativity. More than just a kite festival, it was a day-long extravaganza celebrating youth, innovation, tradition, and unbridled joy. Masterfully blending traditional heritage with cutting-edge technology, it stands as one of KMIT's flagship events.",
      highlights: [
        'Colorful kite battles soaring across the skyline',
        'Masterful blending of traditional heritage with modern technology',
        'Vibrant celebration weaving together friendship, ideas, and culture'
      ]
    },
    {
      title: "Navraas'25",
      image: '/photos/annualevents/Dandiya_night_25.webp',
      desc: 'Our Navraas celebrations featured a spectacular Dandiya Night that brought together students and faculty in a vibrant display of traditional dance and music.',
      highlights: [
        'Energetic dandiya and garba performances',
        'Traditional music and festive decorations',
        'Community-building through cultural participation',
        'One of the most anticipated events in our cultural calendar'
      ]
    },
    {
      title: 'Bathukamma Celebrations',
      image: '/photos/annualevents/Bathukamma_celebrations_25.webp',
      desc: "KMIT's Bathukamma celebrations honored Telangana's vibrant floral festival with traditional songs, dances, and floral arrangements.",
      highlights: [
        'Collaboration between NSS unit and Keshav Smarak Shiksha Samiti',
        'Traditional Bathukamma floral stack arrangements',
        'Cultural performances showcasing Telangana heritage',
        'Community participation in preserving regional traditions'
      ]
    },
    {
      title: 'Teachers Day Celebration',
      image: null, // Full-width text content
      desc: "KMIT celebrates Teachers' Day on September 5th each year with special events honoring our educators' dedication and contributions to shaping young minds.",
      highlights: [
        'Guest Lectures: Inspiring talks by distinguished educators and industry leaders',
        'Poster Presentations: Showcasing innovative teaching methodologies and student research',
        'Interactive Quizzes: Engaging knowledge-sharing sessions between faculty and students',
        'Award Ceremony: Recognizing outstanding teaching contributions'
      ]
    },
    {
      title: 'Orientation Day 2025',
      image: '/photos/annualevents/Orientation_day_25.webp',
      desc: 'The Orientation Day at Keshav Memorial Institute of Technology for the academic year 2025 event began with a warm address by senior faculty members, introducing attendees to the college’s mission and vision. New students were given an overview of academic programs, campus facilities, and expectations for conduct and participation.',
      highlights: [
        'The principal and senior faculty formally welcomed students and parents, sharing insights about KMIT’s values and objectives',
        'A guided tour of the campus showcased key locations such as laboratories, the library, and innovation centers',
        'Information was provided on placement opportunities, technical clubs, counseling, and extracurricular activities available at KMIT',
        'Parents participated in a special session to address concerns related to student safety, wellbeing, and academic progression'
      ]
    },
    {
      title: 'Independence Day 2025',
      image: '/photos/annualevents/Independence_Day_25.webp',
      desc: 'KMIT celebrated Independence Day on August 15th, 2025 with flag hoisting ceremonies and patriotic events that fostered national pride among students and staff.',
      highlights: [
        'Hoisting of the national flag with full honors',
        'Patriotic songs and inspiring speeches',
        'Cultural performances celebrating India\'s diversity',
        'Sports events and activities promoting unity',
        'Community gathering strengthening institutional bonds'
      ]
    },
    {
      title: "Graduation Day'25",
      image: '/photos/annualevents/Graduation_day_25.webp',
      desc: 'The Keshav Memorial Institute of Technology proudly hosted its Graduation Day 2025 on 27th July 2025 at the KMIT campus auditorium, marking a significant milestone for the graduating batch. The ceremony was graced by a distinguished chief guest and academician, who inspired the graduates with an insightful address. Degrees were conferred upon B.Tech graduates, acknowledging their years of perseverance and academic dedication.',
      highlights: [
        'degrees were conferred upon the B.Tech graduates, acknowledging their years of perseverance',
        'Outstanding performers recognized with gold medals, certificates, and special awards'
      ]
    },
    {
      title: "Yoga Day'25",
      image: '/photos/annualevents/Yoga_day_2025.webp',
      desc: 'The 11th International Yoga Day was celebrated by the faculty of KMIT on 20th June with great eagerness and enthusiasm. The theme for the International Yoga Day 2025 is "One Earth, One Health". This year\'s observance emphasized the vital link between personal well-being and the health of the planet. The resource person Ms. S. Bhavani demonstrated stress-relieving breathing exercises and posture corrections.',
      highlights: [
        'Felicitation of resource person Ms. S. Bhavani',
        'Demonstration of stress-relieving breathing exercises and posture corrections',
        'Emphasis on personal well-being and holistic planet health'
      ]
    },
    {
      title: "Prakalp'25",
      image: '/photos/annualevents/prakalp_expo.webp',
      desc: 'PRAKALP 2025 is the annual flagship project expo of Keshav Memorial Institute of Technology, organized by first-year students. It serves as a platform where ideas from diverse fields converge to shape a better future. More than just an event, PRAKALP celebrates creativity, innovation, and academic excellence.',
      highlights: [
        'Interdisciplinary work across Mechanical, Electrical, Physics, Chemistry, and English',
        'Demonstration of technical potential of aspiring engineers',
        'Showcase of collaborative spirit among students'
      ]
    },
    {
      title: "Saanjh'25",
      image: '/photos/annualevents/Saanjh_25.webp',
      desc: "Saanjh '25 was our prominent cultural and technical fest that brought together creativity and innovation. The multi-day event featured a spectacular array of activities blending arts and technology, along with food stalls.",
      highlights: [
        'Grand opening with registrations and enthusiastic participation',
        'Cultural Extravaganza: Dance performances, drama presentations, and musical events',
        'Technical Showcase: Competitions and demonstrations of student innovations',
        'NSS Food Stall: Culinary delights adding flavor to the vibrant atmosphere'
      ]
    },
    {
      title: "Women's Day Celebration",
      image: '/photos/annualevents/womens_day_celebration.webp',
      desc: "KMIT proudly celebrates International Women's Day each year on March 8th, honoring the remarkable achievements and contributions of women in our community and beyond. In 2025, our NSS unit organized special events including an empowering walkathon where participants walked together in sarees, symbolizing unity and support for women's rights.",
      highlights: [
        'Empowering walkathon with participants walking together in traditional sarees',
        'Celebrating women\'s achievements in STEM fields',
        'Promoting gender equality in education and workplace'
      ]
    },
    {
      title: 'Republic Day 2025',
      image: '/photos/annualevents/Republic_day_2025.webp',
      desc: "KMIT celebrated India's 76th Republic Day with patriotic fervor and cultural pride. The day began with the ceremonial hoisting of the national flag, followed by a dynamic dance performance by Mudra, our dance club.",
      highlights: [
        'Flag hoisting ceremony with national anthem',
        'Dynamic dance performance by Mudra, our dance club',
        'Patriotic speeches and cultural presentations'
      ]
    },
    {
      title: 'Patang Utsav 2025',
      image: '/photos/annualevents/patang_2025.webp',
      desc: "KMIT's annual Patang Utsav on January 12th, 2025 brought vibrant colors to our campus as we celebrated the festival of Sankranti with traditional enthusiasm and collaborative spirit of all cultural clubs.",
      highlights: [
        'Colorful kite flying competition with enthusiastic participation',
        'Traditional music and dance performances',
        'Collaboration between all cultural clubs (Mudra, Aalap, Aakarshan, Abhinaya, Traces of Lenses)'
      ]
    }
  ]

  return (
    <PageShell
      eyebrow="Student Life"
      title="Annual"
      titleEm="Events"
      description="Glimpses into the vibrant celebration of youth, fests, fusions, culture, and sports at Keshav Memorial Institute of Technology."
      breadcrumbs={[
        { label: 'Student Life', to: '/student-life' },
        { label: 'Annual Events' }
      ]}
    >
      <section className="page-section">
        <div className="container">
          <div className="section-header centered" style={{ marginBottom: '4rem' }}>
            <div className="section-eyebrow">
              <i className="fa-solid fa-masks-theater"></i> Extravaganza
            </div>
            <h2>
              Vibrant <em>Celebrations</em>
            </h2>
            <div className="section-divider"></div>
            <p>
              From technical expos to cultural nights and patriotic assemblies, KMIT offers a multi-faceted campus life that nurtures leadership, creativity, and values.
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4rem'
          }}>
            {events.map((event, index) => {
              const isEven = index % 2 === 0
              return (
                <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
                <div 
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'var(--glass-bg, rgba(255,255,255,0.05))',
                    border: '1px solid var(--glass-border, rgba(255,255,255,0.1))',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)'
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)'
                  }}
                >
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: event.image ? 'repeat(auto-fit, minmax(300px, 1fr))' : '1fr',
                    alignItems: 'stretch'
                  }}>
                    {/* Event image */}
                    {event.image && (
                      <div style={{
                        order: isEven ? 0 : 1,
                        overflow: 'hidden',
                        position: 'relative',
                        minHeight: '300px'
                      }}>
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block'
                          }} 
                          loading="lazy"
                        />
                        <div style={{
                          position: 'absolute',
                          top: 0, right: 0, bottom: 0, left: 0,
                          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))'
                        }} />
                      </div>
                    )}

                    {/* Event text content */}
                    <div style={{
                      padding: '2.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      borderLeft: event.image && isEven ? '4px solid var(--primary-color, #008080)' : 'none',
                      borderRight: event.image && !isEven ? '4px solid var(--primary-color, #008080)' : 'none'
                    }}>
                      <div className="section-eyebrow" style={{ alignSelf: 'flex-start', marginBottom: '0.8rem', fontSize: '0.8rem' }}>
                        <i className="fa-solid fa-star-of-life"></i> Annual Celebration
                      </div>
                      <h3 style={{
                        fontSize: '1.8rem',
                        fontWeight: '700',
                        marginBottom: '1rem',
                        color: 'inherit'
                      }}>
                        {event.title}
                      </h3>
                      <p style={{
                        lineHeight: '1.7',
                        opacity: 0.9,
                        textAlign: 'justify',
                        marginBottom: '1.5rem',
                        fontSize: '1rem'
                      }}>
                        {event.desc}
                      </p>

                      {event.highlights && event.highlights.length > 0 && (
                        <div style={{
                          borderLeft: '2px dashed rgba(255,255,255,0.15)',
                          paddingLeft: '1.2rem',
                          marginTop: '0.5rem'
                        }}>
                          <h5 style={{
                            margin: '0 0 0.8rem 0',
                            fontWeight: '600',
                            fontSize: '0.95rem',
                            opacity: 0.8
                          }}>
                            Event Highlights:
                          </h5>
                          <ul style={{
                            margin: 0,
                            paddingLeft: '1.2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.6rem',
                            fontSize: '0.9rem',
                            opacity: 0.85
                          }}>
                            {event.highlights.map((hl, i) => (
                              <li key={i} style={{ lineHeight: '1.5' }}>{hl}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
