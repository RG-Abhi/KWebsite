import { useData } from '../context/websiteData'
import { useNavigate } from 'react-router-dom'
import ScrollReveal from './ScrollReveal'

const FALLBACK = 'https://api.dicebear.com/9.x/initials/svg?seed=KMIT&backgroundColor=0f172a,dc143c&textColor=ffffff'

export default function DeptSection() {
  const { data } = useData()
  const navigate = useNavigate()
  const DEPARTMENTS = data.departments
  return (
    <section className="dept-section">
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <ScrollReveal animation="fade-up">
          <h2 className="section-title">Our Departments</h2>
        </ScrollReveal>
        <div className="dept-grid">
          {DEPARTMENTS.map((dept, i) => (
            <ScrollReveal key={i} animation="fade-up" delay={i * 100 + 100} style={{ height: '100%' }}>
              <div className="dept-card" style={{ '--i': i, height: '100%' }}>
                <div className="dept-card-img">
                  <img
                    src={dept.img}
                    alt={dept.badge}
                    onError={e => { e.target.onerror = null; e.target.src = FALLBACK }}
                  />
                  <div className="dept-card-badge">{dept.badge}</div>
                </div>
                <div className="dept-card-body">
                  <h4>{dept.title}</h4>
                  <p>{dept.desc}</p>
                  <a
                    href="#"
                    className="dept-link"
                    onClick={e => { e.preventDefault(); if (dept.section) navigate(`/${dept.section}`) }}
                  >
                    Explore <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
