import { useLocation, useNavigate } from 'react-router-dom'

const CTA_MAP = [
  { match: /^\/placements/, label: 'Contact T&P Cell', section: 'contact' },
  { match: /^\/academics\/(cse|it|csm|csd|hs)/, label: 'Download Brochure', section: 'admissions/coursesoffered' },
  { match: /^\/research/, label: 'View Publications', section: 'research/publications' },
  { match: /^\/exams/, label: 'Exam Notifications', section: 'exams/notifications' },
]

export default function StickyContextualCTA() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  if (pathname === '/' || pathname === '/login' || pathname.startsWith('/admin')) return null

  const rule = CTA_MAP.find(r => r.match.test(pathname))
  if (!rule) return null

  const handleClick = (e) => {
    if (rule.external) return
    e.preventDefault()
    navigate(`/${rule.section}`)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <div className="sticky-context-cta" role="complementary" aria-label="Quick action">
      {rule.external ? (
        <a href={rule.href} target="_blank" rel="noopener noreferrer" className="sticky-context-btn">
          {rule.label} <i className="fa-solid fa-arrow-up-right-from-square" />
        </a>
      ) : (
        <a href={`/${rule.section}`} className="sticky-context-btn" onClick={handleClick}>
          {rule.label} <i className="fa-solid fa-arrow-right" />
        </a>
      )}
    </div>
  )
}
