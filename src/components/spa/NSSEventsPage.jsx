import { useState } from 'react'
import PageShell from './PageShell'
import ScrollReveal from '../ScrollReveal'
import './StudentCouncilPage.css'

export default function NSSEventsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const nssStats = [
    { label: 'Volunteers Enrolled', value: '150+', icon: 'fa-users' },
    { label: 'Blood Donation Drives', value: '4', icon: 'fa-droplet' },
    { label: 'Special Service Camps', value: '12+', icon: 'fa-campground' },
    { label: 'Total Student Participation', value: '880+', icon: 'fa-hands-holding-child' }
  ]

  const nssEvents = [
    { id: 1, name: 'Blood Donation Campaign', date: '02/21/2026', faculties: '--', students: '--', type: 'Health & Blood Donation' },
    { id: 2, name: 'Blood Donation Campaign', date: '02/21/2025', faculties: '11', students: '177', type: 'Health & Blood Donation' },
    { id: 3, name: 'Blood Donation Campaign', date: '03/16/2024', faculties: '2', students: '83', type: 'Health & Blood Donation' },
    { id: 4, name: 'Sanitary Pads Distribution to Women', date: '01/21/2024', faculties: '0', students: '15', type: 'Women Empowerment' },
    { id: 5, name: 'Essay Competition', date: '11/10/2023', faculties: '0', students: '36', type: 'Awareness Campaign' },
    { id: 6, name: 'Shubharambh', date: '11/10/2023', faculties: '5', students: '34', type: 'Inaugural & Orientation' },
    { id: 7, name: 'Rashtriya Ektha Diwas Pledge', date: '10/31/2023', faculties: '9', students: '110', type: 'National Integration' },
    { id: 8, name: 'Waves Without Waste', date: '10/29/2023', faculties: '0', students: '10', type: 'Cleanliness & Waste Management' },
    { id: 9, name: 'Blood Donation Campaign', date: '10/25/2023', faculties: '9', students: '110', type: 'Health & Blood Donation' },
    { id: 10, name: 'Cloth Donation Campaign', date: '10/11/2023', faculties: '1', students: '40', type: 'Social Relief' },
    { id: 11, name: 'Rakhi For Rakshak', date: '09/01/2023', faculties: '1', students: '34', type: 'Community Support' },
    { id: 12, name: 'Mission Arivu - Book Donation Drive', date: '06/19/2023', faculties: '0', students: '26', type: 'Education Support' },
    { id: 13, name: 'Feel the Pain', date: '08/25/2022', faculties: '0', students: '15', type: 'Awareness Campaign' },
    { id: 14, name: 'Badminton Tournament', date: '06/11/2022', faculties: '0', students: '49', type: 'Sports & Wellness' },
    { id: 15, name: 'Interview Readiness', date: '07/16/2021', faculties: '0', students: '42', type: 'Skill Development' },
    { id: 16, name: 'Blood Donation Camp', date: '11/29/2021', faculties: '9', students: '48', type: 'Health & Blood Donation' }
  ]

  const filteredEvents = nssEvents.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <PageShell
      eyebrow="Student Life"
      title="NSS"
      titleEm="Events"
      description="The National Service Scheme (NSS) cell at KMIT channelizes student energy towards constructive social action, community service, and nation-building activities."
      breadcrumbs={[
        { label: 'Student Life', to: '/student-life' },
        { label: 'NSS Events' }
      ]}
    >
      {/* Intro */}
      <section className="page-section">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}>
            <ScrollReveal animation="fade-up">
            <div>
              <div className="section-eyebrow">
                <i className="fa-solid fa-heart-pulse"></i> NSS Cell
              </div>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '1.2rem', fontWeight: '700' }}>
                Service Before <em>Self</em>
              </h2>
              <div className="section-divider" style={{ margin: '0 0 1.5rem 0' }}></div>
              <p style={{ lineHeight: '1.7', opacity: 0.9, marginBottom: '1.2rem' }}>
                National Service Scheme (NSS) is a central sector scheme of the Government of India, Ministry of Youth Affairs & Sports. At KMIT, our NSS cell provides students with a magnificent platform to participate in social service projects, environmental protection, health camps, and blood donation drives.
              </p>
              <p style={{ lineHeight: '1.7', opacity: 0.9 }}>
                By volunteering, KMITians develop a sense of social civic responsibility, democratic leadership, and a deeper appreciation of community problems.
              </p>
            </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem'
            }}>
              {nssStats.map((stat, i) => (
                <div 
                  key={i} 
                  style={{
                    background: 'var(--glass-bg, rgba(255,255,255,0.06))',
                    border: '1px solid var(--glass-border, rgba(255,255,255,0.12))',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    textAlign: 'center',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                  }}
                >
                  <div style={{
                    color: 'var(--primary-color, #008080)',
                    fontSize: '1.8rem',
                    marginBottom: '0.5rem'
                  }}>
                    <i className={`fa-solid ${stat.icon}`}></i>
                  </div>
                  <h3 style={{ fontSize: '2rem', fontWeight: '800', margin: '0 0 0.3rem 0' }}>{stat.value}</h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.8, fontWeight: '500' }}>{stat.label}</p>
                </div>
              ))}
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Interactive Table of Events */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow">
              <i className="fa-solid fa-list-check"></i> Event Log
            </div>
            <h2>
              Social Service <em>Campaigns</em>
            </h2>
            <div className="section-divider"></div>
            <p style={{ marginBottom: '2rem' }}>
              A chronological ledger of social drives, awareness campaigns, and donations conducted by KMIT NSS volunteers.
            </p>

            {/* Search Bar */}
            <div style={{
              maxWidth: '500px',
              margin: '0 auto 2rem auto',
              position: 'relative'
            }}>
              <input 
                type="text" 
                placeholder="Search campaigns by name or type..." 
                className="form-control"
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem 0.8rem 2.8rem',
                  borderRadius: '50px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(0,0,0,0.15)',
                  color: 'inherit',
                  fontSize: '0.95rem'
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i 
                className="fa-solid fa-magnifying-glass"
                style={{
                  position: 'absolute',
                  left: '1.1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  opacity: 0.6
                }}
              ></i>
            </div>
          </div>

          <ScrollReveal animation="fade-up">
          <div className="council-modern-table-wrapper">
            <table className="council-modern-table">
              <thead>
                <tr>
                  <th style={{ width: '80px', textAlign: 'center' }}>S.No</th>
                  <th>Name of the Event</th>
                  <th>Theme/Category</th>
                  <th style={{ width: '130px', textAlign: 'center' }}>Date</th>
                  <th style={{ width: '140px', textAlign: 'center' }}>Faculties</th>
                  <th style={{ width: '140px', textAlign: 'center' }}>Students</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event, index) => (
                    <tr key={event.id}>
                      <td style={{ textAlign: 'center', fontWeight: '600', opacity: 0.8 }}>{index + 1}</td>
                      <td style={{ fontWeight: '600' }}><span style={{ color: 'var(--navy)' }}>{event.name}</span></td>
                      <td>
                        <span className="council-badge">
                          {event.type}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center', opacity: 0.9 }}>{event.date}</td>
                      <td style={{ textAlign: 'center', fontWeight: '500' }}>{event.faculties}</td>
                      <td style={{ textAlign: 'center', fontWeight: '600' }}>
                        {event.students !== '--' ? (
                          <span className="council-role-badge" style={{ background: 'rgba(0,128,128,0.1)', color: 'var(--primary-color, #008080)' }}>{event.students}</span>
                        ) : (
                          '--'
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', opacity: 0.6 }}>
                      No social service campaigns found matching your query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="page-section">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow">
              <i className="fa-solid fa-bullseye"></i> Focus Areas
            </div>
            <h2>
              Our Key <em>Pillars</em> of Service
            </h2>
            <div className="section-divider"></div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            <ScrollReveal animation="fade-up" delay={50}>
            <div className="info-card" style={{ padding: '2rem' }}>
              <div className="info-card-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                <i className="fa-solid fa-droplet"></i>
              </div>
              <div>
                <h3>Healthcare & Donation</h3>
                <p>Collaborating with premier government and private blood banks to host annual donation camps saving hundreds of lives each year.</p>
              </div>
            </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={100}>
            <div className="info-card" style={{ padding: '2rem' }}>
              <div className="info-card-icon" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
                <i className="fa-solid fa-leaf"></i>
              </div>
              <div>
                <h3>Environmental Protection</h3>
                <p>Organizing campus cleanliness campaigns, plantation drives, and plastic-free initiatives to spread ecological awareness.</p>
              </div>
            </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={150}>
            <div className="info-card" style={{ padding: '2rem' }}>
              <div className="info-card-icon" style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}>
                <i className="fa-solid fa-hand-holding-heart"></i>
              </div>
              <div>
                <h3>Community Upliftment</h3>
                <p>Distributing books, clothes, and sanitary kits to under-resourced schools and communities, spreading warmth and opportunities.</p>
              </div>
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
