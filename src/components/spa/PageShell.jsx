import { useNavigate } from 'react-router-dom'
import BackgroundDecor from '../BackgroundDecor'

export default function PageShell({ eyebrow, title, titleEm, description, breadcrumbs = [], actions, children }) {
  const navigate = useNavigate()

  return (
    <div className="sub-page">
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container page-hero-content">
          {/* Breadcrumb */}
          <nav className="page-hero-breadcrumb">
            <button onClick={() => navigate('/')}>
              <i className="fa-solid fa-house"></i> Home
            </button>
            {breadcrumbs.map((crumb, i) => (
              <span key={i}>
                <span> / </span>
                {crumb.to
                  ? <button onClick={() => navigate(crumb.to)}>{crumb.label}</button>
                  : <span style={{color:'rgba(255,255,255,0.9)'}}>{crumb.label}</span>
                }
              </span>
            ))}
          </nav>

          {/* Eyebrow */}
          {eyebrow && (
            <div className="page-hero-eyebrow">
              <i className="fa-solid fa-star"></i>
              {eyebrow}
            </div>
          )}

          {/* Title */}
          <h1>
            {title}
            {titleEm && <> <em>{titleEm}</em></>}
          </h1>

          {/* Description */}
          {description && <p>{description}</p>}

          {/* Actions */}
          {actions && <div className="page-hero-actions">{actions}</div>}
        </div>
      </div>

      {/* Page Content */}
      {children}
    </div>
  )
}
