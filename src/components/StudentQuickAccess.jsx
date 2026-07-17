import { useNavigate } from 'react-router-dom'
import ScrollReveal from './ScrollReveal'

const LINKS = [
  { label: 'Timetables', icon: 'fa-calendar-days', section: 'exams/notifications', desc: 'Class & exam schedules' },
  { label: 'Syllabus', icon: 'fa-book-open', section: 'academics/syllabus', desc: 'Course materials & topics' },
  { label: 'Academic Regulations', icon: 'fa-gavel', section: 'academics/regulations', desc: 'Rules & guidelines' },
  { label: 'Academic Calendars', icon: 'fa-calendar-check', section: 'academics/calendar', desc: 'Important dates & events' },
  { label: 'Examination Results', icon: 'fa-square-poll-vertical', section: 'exams/notifications', desc: 'Check your scores' },
  { label: 'Latest Notices', icon: 'fa-bell', section: 'exams/notifications', desc: 'Updates & announcements' },
]

/** Student-first quick access — two.txt §1 information architecture */
export default function StudentQuickAccess() {
  const navigate = useNavigate()

  return (
    <section id="student-quick-access" className="quick-access-section" aria-labelledby="quick-access-heading">
      <div className="container">
        <ScrollReveal animation="fade-up" threshold={0.5}>
          <div className="section-header centered">
            <h2 id="quick-access-heading">Student <em>Quick Access</em></h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: 520, margin: '0.75rem auto 0' }}>
              Find what you need without digging through internal org charts.
            </p>
          </div>
        </ScrollReveal>
        <div className="quick-access-grid">
          {LINKS.map((link, i) => (
            <ScrollReveal key={i} animation="fade-up" delay={i * 100} threshold={0.5} style={{ height: '100%' }}>
              <button
                type="button"
                className="quick-access-btn"
                style={{ width: '100%', height: '100%' }}
                onClick={() => { navigate(`/${link.section}`); window.scrollTo({ top: 0, behavior: 'instant' }) }}
              >
                <i className={`fa-solid ${link.icon}`} aria-hidden />
                <div className="quick-access-text">
                  <span className="quick-access-label">{link.label}</span>
                  <span className="quick-access-desc">{link.desc}</span>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
