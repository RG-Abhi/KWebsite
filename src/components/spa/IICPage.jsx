import PageShell from './PageShell'
import ScrollReveal from '../ScrollReveal'

// ── Data — sourced from kmit.in/research/iic.php ─────────────────────────────
const objectives = [
  { icon: 'fa-graduation-cap', title: 'Continuous Education',    desc: 'Provide continuous education tailored to evolving talent requirements of industry partners.' },
  { icon: 'fa-handshake',      title: 'Strategic Alliances',     desc: 'Build long-term strategic alliances with industries for recursive, sustained engagement.' },
  { icon: 'fa-diagram-project', title: 'Talent Pipeline',        desc: 'Build a robust talent pipeline to solve real business problems through academic projects.' },
  { icon: 'fa-rocket',          title: 'Entrepreneurship',       desc: 'Promote academic entrepreneurship and support student-led startup ideas and ventures.' },
  { icon: 'fa-lightbulb',      title: 'Technology Application', desc: 'Apply cutting-edge technology to real-world industry challenges through collaborative R&D.' },
  { icon: 'fa-users-gear',     title: 'Modern Recruitment',     desc: 'Transform traditional campus recruitment and internship models to meet modern talent needs.' },
]

const tabs = [
  { id: 'committee', label: 'IIC Committee',              icon: 'fa-users' },
  { id: 'events',    label: 'IIC Events',                 icon: 'fa-calendar-check' },
  { id: 'skills',   label: '21st Century Skills Workshop', icon: 'fa-star' },
]

import { useState } from 'react'

export default function IICPage() {
  const [activeTab, setActiveTab] = useState('committee')

  return (
    <PageShell
      eyebrow="Administration & Committees"
      title="Industry Interaction"
      titleEm="Cell (IIC)"
      description="KMIT's Industry Interaction Cell transforms traditional campus recruitment and internship models, forging long-term strategic alliances that build a talent pipeline for industry problem-solving."
      breadcrumbs={[{ label: 'Administration & Committees', to: '/administration/hod' }, { label: 'IIC' }]}
    >

      {/* ── About IIC ─────────────────────────────────────────── */}
      <section className="page-section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <ScrollReveal animation="fade-right">
              <div>
                <div className="section-header">
                  <div className="section-eyebrow"><i className="fa-solid fa-handshake" /> Industry Partnership</div>
                  <h2>Bridging Academia &amp; <em>Industry</em></h2>
                  <div className="section-divider" />
                </div>
                <div style={{ fontSize: '1.05rem', lineHeight: '1.9', color: 'var(--text-dark)' }}>
                  <p style={{ marginBottom: '1.4rem', textAlign: 'justify' }}>
                    The Industry Interaction Cell (IIC) at KMIT aims to transform traditional campus recruitment and internship models to meet the modern talent needs of the industry. It focuses on applying technology to real-world problems through meaningful academia–industry partnerships.
                  </p>
                  <p style={{ textAlign: 'justify' }}>
                    IIC provides continuous education tailored to talent requirements, builds long-term strategic alliances for recursive engagement, creates a strong talent pipeline for business problem solving, and actively promotes academic entrepreneurship among students.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: '2rem' }}>
                  {['Industry Linkage', 'Startup Support', 'Talent Pipeline', 'Entrepreneurship', 'Technology Application', 'Strategic Alliances'].map((tag, i) => (
                    <span key={i} style={{
                      background: 'var(--off-white)', border: '1px solid var(--light-grey)',
                      padding: '6px 16px', borderRadius: '6px', fontSize: '0.82rem',
                      fontWeight: '700', color: 'var(--navy)',
                      display: 'flex', alignItems: 'center', gap: '6px'
                    }}>
                      <i className="fa-solid fa-circle-check" style={{ color: 'var(--vibrant-accent)', fontSize: '0.65rem' }} /> {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Stat card */}
            <ScrollReveal animation="fade-left" delay={200}>
              <div style={{
                background: 'linear-gradient(145deg, var(--navy) 0%, #1a4080 100%)',
                borderRadius: '28px', padding: '3.5rem 3rem',
                color: '#fff', textAlign: 'center',
                position: 'relative', overflow: 'hidden',
                boxShadow: 'var(--shadow-lift)'
              }}>
                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', bottom: '-30px', left: '-30px', width: '140px', height: '140px', background: 'rgba(255,107,0,0.07)', borderRadius: '50%' }} />
                <i className="fa-solid fa-handshake" style={{ fontSize: '3.5rem', color: 'var(--vibrant-accent)', marginBottom: '1.5rem', display: 'block', position: 'relative', zIndex: 1 }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>Industry Interaction Cell</h3>
                <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: '1.75', fontSize: '0.95rem', position: 'relative', zIndex: 1 }}>
                  Connecting KMIT students with industry leaders, real-world problems, and career-defining opportunities through structured partnerships.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2rem', position: 'relative', zIndex: 1 }}>
                  {[{ v: '300+', l: 'Industry Partners' }, { v: '90%+', l: 'Placement Rate' }, { v: '12+', l: 'IIC Events / Year' }, { v: '4★', l: 'MoE IIC Rating' }].map((s, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--vibrant-accent)' }}>{s.v}</div>
                      <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.5)', fontWeight: '700' }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Key Objectives ────────────────────────────────────── */}
      <section className="page-section-alt">
        <div className="container">
          <ScrollReveal animation="fade-up">
            <div className="section-header" style={{ textAlign: 'center', alignItems: 'center' }}>
              <div className="section-eyebrow"><i className="fa-solid fa-bullseye" /> Purpose</div>
              <h2>Key <em>Objectives</em></h2>
              <div className="section-divider" />
            </div>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            {objectives.map((o, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 100} style={{ height: '100%' }}>
                <div style={{
                  height: '100%',
                  background: 'var(--white)', borderRadius: '20px', padding: '2rem',
                  border: '1px solid var(--light-grey)', boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.3s', display: 'flex', flexDirection: 'column', gap: '1rem'
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'var(--vibrant-accent)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--light-grey)' }}
                >
                  <div style={{ width: '50px', height: '50px', background: 'rgba(255,107,0,0.1)', borderRadius: '12px', display: 'grid', placeItems: 'center', color: 'var(--vibrant-accent)', fontSize: '1.2rem' }}>
                    <i className={`fa-solid ${o.icon}`} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '0.5rem' }}>{o.title}</h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.7', margin: 0 }}>{o.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tabbed Sections ───────────────────────────────────── */}
      <section className="page-section">
        <div className="container">
          <ScrollReveal animation="fade-up">
            <div className="section-header" style={{ textAlign: 'center', alignItems: 'center' }}>
              <div className="section-eyebrow"><i className="fa-solid fa-layer-group" /> Activities</div>
              <h2>IIC <em>Programmes</em></h2>
              <div className="section-divider" />
            </div>

            {/* Tab bar */}
            <div style={{ display: 'flex', gap: '0', borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--light-grey)', marginTop: '3rem', marginBottom: '3rem', background: 'var(--off-white)' }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                  flex: 1, padding: '1.1rem', border: 'none', cursor: 'pointer', fontWeight: '800',
                  fontSize: '0.88rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  background: activeTab === t.id ? 'var(--navy)' : 'transparent',
                  color: activeTab === t.id ? '#fff' : 'var(--text-muted)',
                  transition: 'all 0.25s'
                }}>
                  <i className={`fa-solid ${t.icon}`} /> {t.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Committee tab */}
          {activeTab === 'committee' && (
            <div className="fade-in">
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1rem' }}>
                The IIC Committee oversees the innovation and startup ecosystem at KMIT, comprising dedicated faculty and industry experts.
              </p>
              
              <div className="data-table-container shadow-premium">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th style={{ width: '10%' }}>S.NO</th>
                      <th style={{ width: '40%' }}>NAME OF THE MEMBER</th>
                      <th style={{ width: '20%' }}>DEPARTMENT</th>
                      <th style={{ width: '30%' }}>DESIGNATION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { s: 1,  n: 'Dr. JVS Srinivas', d: 'Faculty', des: 'Vice President' },
                      { s: 2,  n: 'Ms. Ch. Sita Kameshwari', d: 'Faculty', des: 'Convenor' },
                      { s: 3,  n: 'Ms. G. Lavanya', d: 'Faculty', des: 'Social Media Coordinator' },
                      { s: 4,  n: 'Ms. Asha Sheldon', d: 'Faculty', des: 'IPR Activity and Start up Activity Coordinator' },
                      { s: 5,  n: 'Mr. Sudheer Reddy', d: 'Faculty', des: 'Internship Activity Coordinator' },
                      { s: 6,  n: 'Mr. Rakesh Reddy', d: 'Faculty', des: 'Member' },
                      { s: 7,  n: 'Mr. Rajendra Tapadia', d: 'Faculty', des: 'Incubation Centre' },
                      { s: 8,  n: 'Mr. V. Ramalingeswar', d: 'Expert', des: 'Bank' },
                      { s: 9,  n: 'Mr. C. Pavan Kumar', d: 'Expert', des: 'Expert from nearby industry' },
                      { s: 10, n: 'Ms. Priyanka Saxena', d: 'Expert', des: 'Member' },
                      { s: 11, n: 'Dr. K. Shyamala', d: 'Expert', des: 'Representative from nearby incubation centre' },
                    ].map((m, i) => (
                      <tr key={i}>
                        <td className="text-center">{m.s}</td>
                        <td className="bold text-navy">{m.n}</td>
                        <td style={{ fontSize: '0.85rem' }}>
                          <span className={`status-badge ${m.d === 'Faculty' ? 'bg-navy' : 'bg-crimson'}`}>
                            {m.d}
                          </span>
                        </td>
                        <td style={{ color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.9rem' }}>{m.des}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Events tab: (Maintained as previously populated) */}
          {activeTab === 'events' && (
            <div className="fade-in">
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1rem' }}>
                KMIT-IIC organizes 12+ events per year including hackathons, industry talks, and innovation workshops.
              </p>
              
              <div className="data-table-container shadow-premium" style={{ maxHeight: '800px', overflowY: 'auto' }}>
                <table className="data-table">
                  <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                    <tr>
                      <th style={{ width: '5%' }}>S.NO</th>
                      <th style={{ width: '15%' }}>DATE(S)</th>
                      <th style={{ width: '30%' }}>EVENT/WORKSHOP/TRAINING</th>
                      <th style={{ width: '20%' }}>IN COLLABORATION WITH</th>
                      <th style={{ width: '30%' }}>DETAILS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { s: 1,  d: '03/29/2023 - 03/29/2023', e: 'Level 3 - Competition/Hackathon: Entrepreneurship & Startup', c: 'IIC Calendar Activity', det: 'A unique opportunity for higher institutional students and startups in India to submit their innovations.' },
                      { s: 2,  d: '05/11/2023 - 05/11/2023', e: 'Level 1 - Expert Talk: IPR & Technology Transfer', c: 'MIC Driven', det: 'Government agencies and ministries which will see more than 500 technology startups and innovations.' },
                      { s: 3,  d: '08/21/2023 - 08/21/2023', e: 'Level 2 - Seminar: Entrepreneurship & Startup', c: 'Celebration', det: 'Focused on creating awareness on need of entrepreneurs and importance of entrepreneurship in today\'s journey.' },
                      { s: 4,  d: '04/26/2023 - 04/26/2023', e: 'Level 2 - Seminar: IPR & Technology Transfer', c: 'Celebration', det: 'Creating awareness and understanding the important role that Intellectual Property Rights play in performance.' },
                      { s: 5,  d: '06/19/2023 - 06/19/2023', e: 'Level 2 - Seminar: Innovation & Design Thinking', c: 'IIC Calendar Activity', det: 'To announce the launch of the KMTES Innovation Centre in collaboration with Telangana Hub (T-HUB).' },
                      { s: 6,  d: '08/05/2023 - 08/05/2023', e: 'Level 3 - Demo Day: Innovation & Design Thinking', c: 'IIC Calendar Activity', det: 'Showcasing talent in the realm of Python Programming and other basic science subjects.' },
                      { s: 7,  d: '07/15/2023 - 07/15/2023', e: 'Level 1 - Expert Talk: Innovation & Design Thinking', c: 'Self Driven', det: 'To help you master the art of writing research papers and reports.' },
                      { s: 8,  d: '07/01/2023 - 07/15/2023', e: 'Level 3 - Competition: Innovation & Design Thinking', c: 'Self Driven', det: 'To conduct competition among students to test their capability.' },
                      { s: 9,  d: '02/23/2023 - 06/24/2023', e: 'Level 2 - Exposure Visit: Innovation & Design Thinking', c: 'IIC Calendar Activity', det: 'To create awareness among school children regarding AI and career guidance.' },
                      { s: 10, d: '03/09/2023 - 03/09/2023', e: 'Level 3 - Competition: Innovation & Design Thinking', c: 'Celebration', det: 'Celebrating Women\'s Day as a part of IIC Celebration Activity.' },
                      { s: 11, d: '07/29/2023 - 07/29/2023', e: 'Level 2 - Workshop: IPR & Technology Transfer', c: 'IIC Calendar Activity', det: 'Giving broad idea about IPR and IT management for startup and its importance.' },
                      { s: 12, d: '08/04/2023 - 08/04/2023', e: 'Level 2 - Seminar: Innovation & Design Thinking', c: 'Self Driven', det: 'Discussed on unleashing artificial creativity with ChatGPT - From Inception to Innovation.' },
                      { s: 13, d: '01/12/2023 - 01/12/2023', e: 'Level 1 - Expert Talk: Entrepreneurship & Startup', c: 'Celebration', det: 'Encouraging students to think about developing innovative solutions.' },
                      { s: 14, d: '01/30/2023 - 01/30/2023', e: 'Level 1 - Expert Talk: IPR & Technology Transfer', c: 'MIC Driven', det: 'Support from AICTE for Innovation and Entrepreneurship.' },
                      { s: 15, d: '04/13/2023 - 04/13/2023', e: 'Level 1 - Exposure Visit: Entrepreneurship & Startup', c: 'IIC Calendar Activity', det: 'Students know things practically through interaction, working methods and employment practices.' },
                      { s: 16, d: '02/28/2023 - 02/28/2023', e: 'Level 2 - Seminar: Innovation & Design Thinking', c: 'Celebration', det: 'Commemorated in the honor of Sir CV Raman for his legacy who discovered Raman Effect.' },
                      { s: 17, d: '02/08/2023 - 02/09/2023', e: 'Level 3 - Competition: Innovation & Design Thinking', c: 'IIC Calendar Activity', det: 'To encourage students to come out with new ideas.' },
                      { s: 18, d: '02/24/2023 - 02/24/2023', e: 'Level 1 - Expert Talk: Innovation & Design Thinking', c: 'IIC Calendar Activity', det: 'Understanding Process of Innovation Development, Technology Readiness Level (TRL) Commercialization.' },
                      { s: 19, d: '11/01/2022 - 11/07/2022', e: 'Level 3 - Workshop: Pre-Incubation & Incubation Management', c: 'IIC Calendar Activity', det: 'Major goal of this workshop is to assess students\' comprehension levels.' },
                      { s: 20, d: '11/11/2022 - 11/11/2022', e: 'Level 2 - Seminar: IPR & Technology Transfer', c: 'Celebration', det: 'Importance of Technical Education.' },
                      { s: 21, d: '10/15/2022 - 10/15/2022', e: 'Level 2 - Seminar: Innovation & Design Thinking', c: 'Celebration', det: 'Create thoughts on innovation in students.' },
                      { s: 22, d: '10/01/2022 - 10/01/2022', e: 'Level 1 - Expert Talk: IPR & Technology Transfer', c: 'MIC Driven', det: 'To create awareness in students regarding 5G services.' },
                      { s: 23, d: '12/02/2022 - 12/02/2022', e: 'Level 2 - Workshop: Entrepreneurship & Startup', c: 'IIC Calendar Activity', det: 'To motivate students to think towards entrepreneurship.' },
                      { s: 24, d: '09/27/2022 - 09/27/2022', e: 'Level 2 - Workshop: Innovation & Design Thinking', c: 'IIC Calendar Activity', det: 'To inculcate interpersonal skills and creative thinking among students.' },
                      { s: 25, d: '09/02/2022 - 09/02/2022', e: 'Level 2 - Seminar: Innovation & Design Thinking', c: 'IIC Calendar Activity', det: 'To motivate students towards innovations.' },
                      { s: 26, d: '08/13/2022 - 08/31/2022', e: 'Level 4: Innovation', c: 'MIC Driven', det: 'Advanced innovation and startup development program.' },
                      { s: 27, d: '10/01/2022 - 10/01/2022', e: 'Level 2 - Seminar: Entrepreneurship & Startup', c: 'Celebration', det: 'To motivate students to show interest in startups.' },
                      { s: 28, d: '01/01/2021 - 12/31/2021', e: 'Internship under the guidance of Dr K Anandha Narayan', c: 'DRDL', det: 'Collaborative research, training, and internship opportunities for selected students in the area of CFD.' },
                      { s: 29, d: '2020 - Present', e: 'AI at the Edge', c: 'DRDO', det: 'GPU CUDA Programming and hands-on training with nVIDIA Jetson Nano Embedded hardware.' },
                      { s: 30, d: '06/25/2020 - 09/25/2020', e: 'Crime Free Bharat', c: 'MP Police', det: 'Collaborative research and internship opportunities for selected students.' },
                      { s: 31, d: '03/13/2020', e: 'Webinar', c: 'Novartis', det: 'Presentation given to Novartis on implementation of Image detection for cancer diagnosis.' },
                      { s: 32, d: '03/15/2020', e: 'Lecture', c: 'Ginos', det: 'A guest lecture on SDN/NFV by Mr Saravanan Velrajan of Ginkos India.' },
                      { s: 33, d: '02/05/2020', e: 'Project showcase and panel discussions', c: 'Verizon', det: 'A project showcase, interaction with students, and panel discussion with Verizon.' },
                      { s: 17, d: '02/13/2020', e: 'Sampark', c: 'Verizon', det: 'Fireside chat with Verizon team and KMIT students on Cloud Computing.' },
                      { s: 35, d: '2018 - Present', e: 'Robotic Process Automation (RPA)', c: 'Virtusa', det: 'Collaborative training with the industry for customized workforce development.' },
                      { s: 36, d: '2017 - Present', e: 'Adobe Analytics', c: 'Virtusa', det: 'Collaborative training with the industry for customized workforce development.' },
                      { s: 37, d: '2016 - Present', e: 'Data Science', c: 'Virtusa', det: 'Collaborative training with the industry for customized workforce development.' },
                      { s: 38, d: '2016 - Present', e: 'AEMS', c: 'Virtusa', det: 'Collaborative training with the industry for customized workforce development.' },
                      { s: 39, d: '2014 - 2019', e: 'Employability & Skill Development Program (ESD)', c: 'Zensar', det: 'Collaborative training with the industry for customized workforce development.' },
                      { s: 40, d: '2018 - 2019', e: 'Open Stack', c: 'Persistent Systems', det: 'Collaborative training with the industry for customized workforce development.' },
                      { s: 41, d: '2017 - 2019', e: 'Salesforce', c: 'Persistent Systems', det: 'Collaborative training with the industry for customized workforce development.' },
                      { s: 42, d: '2017 - 2018', e: 'Training on Testing', c: 'Zensar', det: 'Collaborative training with the industry for customized workforce development.' },
                      { s: 43, d: '2012 - 2017', e: 'Oracle Apps', c: 'Zensar', det: 'Collaborative training with the industry for customized workforce development.' },
                      { s: 44, d: '2016 - 2018', e: 'Salesforce', c: 'Zensar', det: 'Collaborative training with the industry for customized workforce development.' },
                      { s: 45, d: '2016 - 2017', e: 'DotNet', c: 'Inrhythm Solutions', det: 'Collaborative training with the industry for customized workforce development.' },
                    ].map((row, idx) => (
                      <tr key={idx}>
                        <td className="text-center">{row.s}</td>
                        <td className="bold text-navy" style={{ fontSize: '0.8rem' }}>{row.d}</td>
                        <td style={{ fontSize: '0.9rem', color: 'var(--navy)', fontWeight: '700' }}>{row.e}</td>
                        <td style={{ fontSize: '0.85rem' }}>
                          <span className={`status-badge ${row.c.includes('Activity') ? 'bg-navy' : row.c.includes('MIC') ? 'bg-crimson' : 'bg-grey'}`}>
                            {row.c}
                          </span>
                        </td>
                        <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>{row.det}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Skills tab */}
          {activeTab === 'skills' && (
            <div className="fade-in">
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 400px', gap: '4rem', marginBottom: '4rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                  <div>
                    <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--brand-orange-text)', fontWeight: '800', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <i className="fa-solid fa-circle-question" /> About the Program
                    </h4>
                    <p style={{ fontSize: '1rem', color: 'var(--text-dark)', lineHeight: '1.8', textAlign: 'justify' }}>
                      21 Skills for 21st Century is KMIT's latest training program (conceptualized and managed by Shweta Paropkari) for its Finishing School. The aim of the program is to prepare students for a campus to corporate transition and prepare them for a global workplace. The 21 sessions listed cover skills needed to crack interviews and develop the skill set required for the 21st Century workplace.
                    </p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--navy)', fontWeight: '800', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <i className="fa-solid fa-chalkboard-user" /> The Training
                    </h4>
                    <p style={{ fontSize: '1rem', color: 'var(--text-dark)', lineHeight: '1.8', textAlign: 'justify' }}>
                      The entire project (with the exception of the session on Cover Letters) was outsourced to Business Communication Facilitators' Association of India. They're a professional body of Business Communication and Soft Skills trainers and will be bringing in industry experts for each of the listed topics.
                    </p>
                  </div>
                </div>

                <div style={{ background: 'var(--off-white)', borderRadius: '24px', padding: '2.5rem', border: '1px solid var(--light-grey)' }}>
                  <h4 style={{ fontSize: '1.25rem', color: 'var(--navy)', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <i className="fa-solid fa-truck-fast" style={{ color: 'var(--vibrant-accent)' }} /> Logistics
                  </h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                    The training took place over a period of 8 weeks with the sessions being conducted on Fridays and Saturdays over Zoom.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'start', gap: '12px', background: '#fff', padding: '1rem', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
                      <i className="fa-solid fa-certificate" style={{ color: 'var(--vibrant-accent)', marginTop: '4px' }} />
                      <span style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--navy)' }}>Students who attended all 21 sessions were awarded a certificate.</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'start', gap: '12px', background: '#fff', padding: '1rem', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
                      <i className="fa-solid fa-calendar-alt" style={{ color: 'var(--navy)', marginTop: '4px' }} />
                      <span style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--navy)' }}>Program Dates: 11th March 2022 - 29th April 2022.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="section-header centered">
                <h2>Program <em>Schedule</em></h2>
                <div className="section-divider" />
              </div>

              <div className="data-table-container shadow-premium" style={{ marginTop: '3rem' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th style={{ width: '8%' }}>S.NO</th>
                      <th style={{ width: '50%' }}>TOPIC</th>
                      <th style={{ width: '25%' }}>TRAINER</th>
                      <th style={{ width: '17%' }}>DATE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { s: 1,  t: 'Personal Brand as a Differentiator', tr: 'Lalitha Murthy', d: '11-Mar-22' },
                      { s: 2,  t: 'Resume Writing', tr: 'Mushtakhusen S.M', d: '12-Mar-22' },
                      { s: 3,  t: 'Presentation Skills', tr: 'Lalitha Murthy', d: '12-Mar-22' },
                      { s: 4,  t: 'eMail Etiquette', tr: 'Jaysree Menon', d: '17-Mar-22' },
                      { s: 5,  t: 'Active Listening', tr: 'Dolon Gupta', d: '24-Mar-22' },
                      { s: 6,  t: 'Effective Meetings', tr: 'Jaysree Menon', d: '25-Mar-22' },
                      { s: 7,  t: 'Collaborative Skills', tr: 'Revathi Vishwanathan', d: '25-Mar-22' },
                      { s: 8,  t: 'Power Dressing', tr: 'Juicy', d: '7-Apr-22' },
                      { s: 9,  t: 'Interview Etiquette', tr: 'Alaknanda Sen', d: '8-Apr-22' },
                      { s: 10, t: 'Answering Interview Questions', tr: 'Triparni Biswas', d: '9-Apr-22' },
                      { s: 11, t: 'Cross Cultural Communication', tr: 'Yulia Shtaityovna', d: '9-Apr-22' },
                      { s: 12, t: 'Critical Thinking', tr: 'Ishita Ray', d: '15-Apr-22' },
                      { s: 13, t: 'Emotional Intelligence', tr: 'Sulagna Das', d: '15-Apr-22' },
                      { s: 14, t: 'Negotiation', tr: 'Dr Ritu Pareek', d: '16-Apr-22' },
                      { s: 15, t: 'Creative Thinking', tr: 'Sujata Banarjee', d: '16-Apr-22' },
                      { s: 16, t: 'Virtual Presence', tr: 'Mushtakhusen S.M', d: '22-Apr-22' },
                      { s: 17, t: 'Problem Solving', tr: 'Ishita Ray', d: '22-Apr-22' },
                      { s: 18, t: 'People Management', tr: 'Archana Parmar', d: '23-Apr-22' },
                      { s: 19, t: 'Digital Literacy', tr: 'Dr Manisha Anand Patil', d: '23-Apr-22' },
                      { s: 20, t: 'Information Literacy', tr: 'Dolon Gupta', d: '29-Apr-22' },
                      { s: 21, t: 'Writing Effective Cover Letters in emails', tr: 'Shweta Paropkari (KMIT)', d: '29-Apr-22' },
                    ].map((row, idx) => (
                      <tr key={idx}>
                        <td className="text-center">{row.s}</td>
                        <td className="bold text-navy" style={{ fontSize: '1rem' }}>{row.t}</td>
                        <td style={{ color: 'var(--brand-orange-text)', fontWeight: '700', fontSize: '0.9rem' }}>{row.tr}</td>
                        <td className="bold" style={{ fontSize: '0.85rem' }}>{row.d}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  )
}
