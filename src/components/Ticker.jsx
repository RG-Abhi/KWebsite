import { useData } from '../context/websiteData'

export default function Ticker({ scrolled }) {
  const { data } = useData()
  const ANNOUNCEMENTS = data.announcements
  const doubled = [...ANNOUNCEMENTS, ...ANNOUNCEMENTS]

  return (
    <div className={`ticker-bar${scrolled ? ' scrolled' : ''}`}>
      <div className="ticker-label">
        <i className="fa-solid fa-bullhorn"></i> ANNOUNCEMENTS
      </div>
      <div className="ticker-scroll">
        <div className="ticker-track">
          {doubled.map((msg, i) => (
            <span key={i}>{msg}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
