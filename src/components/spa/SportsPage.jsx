import { useState } from 'react'
import PageShell from './PageShell'
import ScrollReveal from '../ScrollReveal'
import './SportsPage.css'

export default function SportsPage() {
  const activities = [
    { sno: 1, month: 'January-March', activity: 'Basic skill training is provided to students for specific events, Such as Basketball, Volleyball, Taekwondo, and kabaddi.' },
    { sno: 2, month: 'January-March', activity: 'Prepare the teams to participate in Inter-Collegiate competitions.' },
    { sno: 3, month: 'February-December', activity: 'Conduct fitness training classes for the students.' },
    { sno: 4, month: 'February-March', activity: "Conduct sports activities for the faculty in connection with Women's Day." },
    { sno: 5, month: 'March', activity: "Organize International Women's Day celebrations." },
    { sno: 6, month: 'March-April', activity: 'Conduct Inter-Class Competitions for all four years.' },
    { sno: 7, month: 'April', activity: 'Proposal to organize a recreational activity for male students.' },
    { sno: 8, month: 'May', activity: 'Proposal to get the Basketball Court repaired.' },
    { sno: 9, month: 'June', activity: 'Organize the event on International Yoga Day.' },
    { sno: 10, month: 'July', activity: 'Proposal to Organize a Motivational Talk for Students.' },
    { sno: 11, month: 'August-September', activity: 'Prepare teams to participate in Extra-Mural competitions.' },
    { sno: 12, month: 'August-September', activity: 'Selections for all sports events.' },
    { sno: 13, month: 'August-December', activity: 'Participation in State, National, and University-level tournaments.' },
    { sno: 14, month: 'September', activity: "Students' Induction Program." },
    { sno: 15, month: 'October-November', activity: 'Proposal to host the Inter Keshav Memorial Engineering College Sports Meet.' },
    { sno: 16, month: 'October-December', activity: 'Planning to have practice matches with other teams to enhance the performance of the students.' },
    { sno: 17, month: 'October-December', activity: 'Participation in tournaments organized by other engineering colleges and universities.' },
    { sno: 18, month: 'November', activity: 'Conduct Inter-Class Competitions for First Year students.' },
    { sno: 19, month: 'December', activity: 'Proposal to host an inter-college competition.' },
  ]

  const indoorGames = [
    {
      name: 'Badminton Court',
      icon: 'fa-shuttle-space',
      desc: 'A badminton court matching professional standards has been built behind Block B for the use of Faculty members, Staff and Students. The Faculty members and Staff at KMIT are particularly passionate about this sport and annual competitions are held for them regularly.'
    },
    {
      name: 'Yoga',
      icon: 'fa-person-praying',
      desc: 'Coaching is given to all the students in the college campus from 4-5.30 pm everyday. The training is open to students of all years. Furthermore, the college has formed a Yoga team which, under the guidance of their guru, performed on invitation at various events outside the campus.'
    },
    {
      name: 'Chess, TT and Caroms',
      icon: 'fa-chess',
      desc: 'Equal importance is given to games requiring brain skill at KMIT. Rooms above the auditorium have specially been allocated for chess, caroms, and table tennis. These rooms also house all the other sports equipment. Just as is the case with outdoor games, intra-college tournaments are held for these games as well.'
    },
  ]

  const outdoorGames = [
    {
      name: 'Football',
      icon: 'fa-futbol',
      desc: 'In addition to having a large football field, coaching is given to all the students in the college campus from 4-5.30 pm daily evening. The college has the football team of 12 members and the team is encouraged to participate in inter-collegiate competitions. Moreover, three intra-college events are held every academic year.'
    },
    {
      name: 'Basketball',
      icon: 'fa-basketball',
      desc: 'A basketball court matching professional standards has been built next to the football field. We are very proud to state that the college Basketball team participated in tournaments conducted by Sreenidhi Ashwatthams from 17-22 November 2025. Another crowning glory is that we had organized inter college basketball tournament for all engineering colleges at KMIT campus from 21 & 28 August 2025.'
    },
    {
      name: 'Volleyball',
      icon: 'fa-volleyball',
      desc: 'Next to the basketball court, we have the volleyball field. As with Football and Basketball, coaching is provided to interested students every evening in the campus and intra-college events are conducted periodically.'
    },
  ]

  const [openIndoor, setOpenIndoor] = useState(0)
  const [openOutdoor, setOpenOutdoor] = useState(0)

  return (
    <PageShell
      eyebrow="Infrastructure"
      title="Sports"
      titleEm="Facilities"
      description="The college management strongly believes that sports play an important role in a student's growth and development — improving mental health, physical fitness, and honing personality skills."
      breadcrumbs={[{ label: 'Campus & Infra', to: '/campus/library' }, { label: 'Sports Facilities' }]}
    >
      {/* Sports Facilities - Games */}
      <section className="page-section">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-person-running"></i> Sports</div>
            <h2>Sports <em>Facilities</em></h2>
            <div className="section-divider"></div>
            <p>The college management strongly believes that sports play an important role in a student's growth and development. Not only do they help improve mental health and physical fitness of the body but also hone personality skills by inculcating leadership abilities, teamwork, non-verbal communication, confidence, coping with setbacks, conflict management, and discipline to name a few.</p>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap:'2.5rem', marginTop:'3rem'}}>
            {/* Indoor Games */}
            <div>
              <h3 style={{marginBottom:'1.5rem', display:'flex', alignItems:'center', gap:'0.75rem'}}>
                <div style={{width:'40px', height:'40px', borderRadius:'8px', background:'rgba(252, 119, 0, 0.1)', color:'var(--vibrant-accent)', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <i className="fa-solid fa-house"></i>
                </div>
                Indoor Games
              </h3>
              <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                {indoorGames.map((game, i) => (
                  <ScrollReveal key={i} animation="fade-up" delay={i * 50}>
                  <div className={`sports-accordion-card ${openIndoor === i ? 'active' : ''}`} onClick={() => setOpenIndoor(openIndoor === i ? -1 : i)}>
                    <div className="sports-acc-icon"><i className={`fa-solid ${game.icon}`}></i></div>
                    <div className="sports-acc-content">
                      <h3 className="sports-acc-header">
                        {game.name}
                        <i className={`fa-solid fa-chevron-${openIndoor === i ? 'up' : 'down'}`} style={{fontSize:'0.9rem', color:'var(--text-muted)'}}></i>
                      </h3>
                      {openIndoor === i && <p className="sports-acc-desc">{game.desc}</p>}
                    </div>
                  </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Outdoor Games */}
            <div>
              <h3 style={{marginBottom:'1.5rem', display:'flex', alignItems:'center', gap:'0.75rem'}}>
                <div style={{width:'40px', height:'40px', borderRadius:'8px', background:'rgba(252, 119, 0, 0.1)', color:'var(--vibrant-accent)', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <i className="fa-solid fa-sun"></i>
                </div>
                Outdoor Games
              </h3>
              <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                {outdoorGames.map((game, i) => (
                  <ScrollReveal key={i} animation="fade-up" delay={i * 50}>
                  <div className={`sports-accordion-card ${openOutdoor === i ? 'active' : ''}`} onClick={() => setOpenOutdoor(openOutdoor === i ? -1 : i)}>
                    <div className="sports-acc-icon"><i className={`fa-solid ${game.icon}`}></i></div>
                    <div className="sports-acc-content">
                      <h3 className="sports-acc-header">
                        {game.name}
                        <i className={`fa-solid fa-chevron-${openOutdoor === i ? 'up' : 'down'}`} style={{fontSize:'0.9rem', color:'var(--text-muted)'}}></i>
                      </h3>
                      {openOutdoor === i && <p className="sports-acc-desc">{game.desc}</p>}
                    </div>
                  </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Table */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-calendar-days"></i> Annual Plan</div>
            <h2>Physical Education — <em>Activities for the Year 2026</em></h2>
            <div className="section-divider"></div>
          </div>
          <ScrollReveal animation="fade-up">
          <div className="sports-modern-table-wrapper">
            <table className="sports-modern-table">
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>S.No</th>
                  <th style={{ width: '200px' }}>Month</th>
                  <th>Activity</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((a) => (
                  <tr key={a.sno}>
                    <td><strong>{a.sno}</strong></td>
                    <td><span className="sports-activity-badge">{a.month}</span></td>
                    <td>{a.activity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </ScrollReveal>
        </div>
      </section>
    </PageShell>
  )
}
