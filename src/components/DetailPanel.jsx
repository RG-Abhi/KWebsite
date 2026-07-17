import { useEffect, memo } from 'react'
import { createPortal } from 'react-dom'

const MembersList = memo(function MembersList({ members }) {
  if (!members?.length) return null
  return (
    <div className="detail-panel-members">
      <h3>STUDENT COORDINATING COMMITTEE</h3>
      <div className="members-grid">
        {members.map((m, idx) => (
          <div className="member-card" key={idx}>
            <div className="member-avatar">
              {m.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
            </div>
            <div className="member-info">
              <div className="member-name" title={m.name}>{m.name}</div>
              <div className="member-role">{m.role}</div>
              {m.roll && <div className="member-roll">{m.roll}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

export default function DetailPanel({ open, onClose, title, badge, icon, desc, logo, instagram, members, children }) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="detail-panel-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="detail-panel-title">
      <div className="detail-panel" onClick={e => e.stopPropagation()}>
        
        {/* Left Sidebar */}
        <div className="detail-panel-sidebar">
          <div className="sidebar-top">
            <div className="detail-panel-logo-wrapper">
              {logo ? (
                <img src={logo} alt="" className="detail-panel-logo" loading="lazy" decoding="async" />
              ) : (
                <div className="detail-panel-icon"><i className={`fa-solid ${icon}`} /></div>
              )}
            </div>
            
            {badge && <span className="detail-panel-badge">{badge}</span>}
            <h2 id="detail-panel-title" className="detail-panel-title">{title}</h2>
            <div className="detail-panel-subtitle">
              {members ? "KMIT Official Student Activity Club" : "KMIT Co-Curricular Excellence Program"}
            </div>
          </div>
          
          <div className="sidebar-bottom">
            {instagram && (
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="btn-ig">
                <i className="fa-brands fa-instagram" /> Follow on Instagram
              </a>
            )}
            <button type="button" className="btn-close" onClick={onClose}>
              <i className="fa-solid fa-circle-check" /> Close Window
            </button>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="detail-panel-content">
          <button type="button" className="detail-panel-close-x" onClick={onClose} aria-label="Close">
            <i className="fa-solid fa-xmark" />
          </button>
          
          <div className="detail-panel-desc-wrapper">
            <p className="detail-panel-desc">{desc}</p>
          </div>

          <div className="detail-panel-children">
            {children}
            <MembersList members={members} />
          </div>
        </div>
        
      </div>
    </div>,
    document.body
  )
}
