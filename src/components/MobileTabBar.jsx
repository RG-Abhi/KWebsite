import React from 'react'

export default function MobileTabBar({ onNavigate }) {
  const actions = [
    { label: 'Enquire', icon: 'fa-envelope', action: () => onNavigate('contact') },
    { label: 'WA Chat', icon: 'fa-whatsapp', color: '#25D366', action: () => window.open('https://wa.me/9104023261407', '_blank') },
    { label: 'Visit', icon: 'fa-location-arrow', action: () => window.open('https://www.google.com/maps/dir/?api=1&destination=Keshav+Memorial+Institute+of+Technology', '_blank') },
    { label: '360° View', icon: 'fa-street-view', action: () => window.open('https://kmit.in/tour/', '_blank') }
  ]

  return (
    <div className="mobile-tab-bar">
      {actions.map((item, i) => (
        <button key={i} className="tab-item" onClick={item.action}>
          <div className="tab-icon" style={item.color ? { color: item.color } : {}}>
            <i className={`fa-solid ${item.icon}`}></i>
          </div>
          <span className="tab-label">{item.label}</span>
        </button>
      ))}
    </div>
  )
}
