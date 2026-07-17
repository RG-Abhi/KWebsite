import { useState, useEffect } from 'react'
import { useData } from '../context/websiteData'

/* ── Internal nav helper ── */
function FooterLink({ label, section, onNavigate, external }) {
  if (external) {
    return (
      <a
        href={external}
        target="_blank"
        rel="noopener noreferrer"
        className="ft-link"
      >
        <i className="fa-solid fa-angle-right ft-chevron" />
        {label}
      </a>
    )
  }
  return (
    <a
      href="#"
      className="ft-link"
      onClick={e => { e.preventDefault(); if (onNavigate) onNavigate(section) }}
    >
      <i className="fa-solid fa-angle-right ft-chevron" />
      {label}
    </a>
  )
}

/* ── Scroll to top button ── */
function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <button
      className={`ft-scroll-top ${visible ? 'visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
    >
      <i className="fa-solid fa-chevron-up" />
    </button>
  )
}

export default function Footer({ onNavigate }) {
  const { data } = useData()
  const { siteMeta } = data

  return (
    <footer className="site-footer" aria-label="Site Footer">

      {/* ── Geometric decos ── */}
      <div className="ft-deco ft-deco-ring" />
      <div className="ft-deco ft-deco-ring ft-deco-ring-2" />
      <div className="ft-deco ft-deco-dots" />
      <div className="ft-deco ft-deco-dots ft-deco-dots-2" />

      <div className="ft-admissions-strip">
        <div className="container ft-admissions-inner">
          <div className="ft-admissions-text">
            <span className="ft-admissions-pulse" />
            <span className="ft-admissions-badge">Admissions 2026</span>
            <span className="ft-admissions-msg">
              🎓 B.Tech admissions are conducted through TS EAPCET / ECET web counselling.
            </span>
          </div>
          <div className="ft-admissions-actions">
            <a
              href="#"
              className="ft-apply-cta"
              onClick={e => { e.preventDefault(); if (onNavigate) onNavigate('admissions/procedure') }}
            >
              Admission Procedure <i className="fa-solid fa-arrow-right" />
            </a>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          TOP BAND — Brand + EAPCET Code pill
      ══════════════════════════════════════════ */}
      <div className="ft-topband">
        <div className="container ft-topband-inner">
          <div className="ft-brand-lockup">
            <img
              src="/photos/main/logo.png"
              alt="KMIT"
              style={{ width: '58px', height: '58px', objectFit: 'contain', background: 'var(--white)', borderRadius: '12px', padding: '6px' }}
            />
            <div>
              <div className="ft-brand-name">KMIT</div>
              <div className="ft-brand-sub">Keshav Memorial Institute of Technology</div>
            </div>
          </div>
          <div className="ft-topband-stats">
            <div className="ft-topband-stat"><span className="ft-topband-stat-num">702+</span><span>Placements</span></div>
            <div className="ft-topband-sep" />
            <div className="ft-topband-stat"><span className="ft-topband-stat-num">45 LPA</span><span>Highest CTC</span></div>
            <div className="ft-topband-sep" />
            <div className="ft-topband-stat"><span className="ft-topband-stat-num">NAAC A+</span><span>Accredited</span></div>
          </div>
          <div className="ft-tagline-pill">
            <i className="fa-solid fa-graduation-cap" />
            &nbsp; EAPCET Code: <strong>KMIT</strong> &nbsp;|&nbsp; Est. 2007
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MAIN LINK GRID
      ══════════════════════════════════════════ */}
      <div className="container ft-main-grid">

        {/* ── Col 1: About KMIT ── */}
        <div className="ft-col">
          <h4 className="ft-col-heading">About KMIT</h4>
          <p className="ft-about-blurb">
            Keshav Memorial Institute of Technology (KMIT), established in 2007, is one of the
            premier engineering institutions in Telangana, offering UG programs under JNTUH.
            Accredited by NAAC A+ and NBA, KMIT is renowned for excellence in academics, research,
            and industry-aligned placements.
          </p>
          <div className="ft-about-links">
            <FooterLink label="Vision &amp; Mission" section="about/vision" onNavigate={onNavigate} />
            <FooterLink label="Quality Policy" section="about/vision" onNavigate={onNavigate} />
            <FooterLink label="Founder's Message" section="about/management" onNavigate={onNavigate} />
            <FooterLink label="Director's Message" section="administration/academic-director" onNavigate={onNavigate} />
            <FooterLink label="Achievements" section="student-life/achievements" onNavigate={onNavigate} />
            <FooterLink label="NAAC" section="about/accreditations" onNavigate={onNavigate} />
            <FooterLink label="IQAC" section="about/accreditations" onNavigate={onNavigate} />
            <FooterLink label="NIRF" section="rankings/nirf" onNavigate={onNavigate} />
            <FooterLink label="Mandatory Disclosure" section="about/accreditations" onNavigate={onNavigate} />
            <FooterLink label="Academic Core Committee" section="administration/academic-core-committee" onNavigate={onNavigate} />
          </div>
        </div>

        {/* ── Col 2: Academics & Departments ── */}
        <div className="ft-col">
          <h4 className="ft-col-heading">Academics</h4>
          <FooterLink label="CSE" section="academics/cse" onNavigate={onNavigate} />
          <FooterLink label="Information Technology (IT)" section="academics/it" onNavigate={onNavigate} />
          <FooterLink label="CSE (AI &amp; ML)" section="academics/csm" onNavigate={onNavigate} />
          <FooterLink label="CSE (Data Science)" section="academics/csd" onNavigate={onNavigate} />
          <FooterLink label="H&amp;S (Humanities &amp; Sciences)" section="academics/hs" onNavigate={onNavigate} />
          <FooterLink label="Academic Calendars" section="academics/calendar" onNavigate={onNavigate} />
          <FooterLink label="Syllabus" section="academics/syllabus" onNavigate={onNavigate} />
          <FooterLink label="Regulations" section="academics/regulations" onNavigate={onNavigate} />
          <FooterLink label="Value Added Courses" section="academics/value-added" onNavigate={onNavigate} />
          <FooterLink label="Teaching &amp; Evaluation" section="academics/evaluation" onNavigate={onNavigate} />

          <h4 className="ft-col-heading" style={{ marginTop: '1.5rem' }}>E-Resources</h4>
          <FooterLink label="CSE E-Resources" external="https://kmit.in/department/eresource_cse.php" />
          <FooterLink label="IT E-Resources" external="https://kmit.in/department/eresource_it.php" />
          <FooterLink label="H&amp;S E-Resources" external="https://kmit.in/department/eresource_hs.php" />

          <div className="ft-professional-bodies">
            <span className="ft-prof-badge">CSI</span>
            <span className="ft-prof-badge">IEEE</span>
            <span className="ft-prof-badge">ISTE</span>
          </div>
        </div>

        {/* ── Col 3: Quick Links ── */}
        <div className="ft-col">
          <h4 className="ft-col-heading">Quick Links</h4>
          <FooterLink label="Placements" section="placements" onNavigate={onNavigate} />
          <FooterLink label="Admissions" section="admissions/coursesoffered" onNavigate={onNavigate} />
          <FooterLink label="Examination" section="exams/notifications" onNavigate={onNavigate} />
          <FooterLink label="Student Activities" section="student-life/clubs" onNavigate={onNavigate} />
          <FooterLink label="Student Learning Center" section="student-life/co-curricular" onNavigate={onNavigate} />
          <FooterLink label="Research" section="research" onNavigate={onNavigate} />
          <FooterLink label="Other Committees" section="administration/committees" onNavigate={onNavigate} />
          <FooterLink label="Industry Interaction Cell (IIC)" section="administration/iic" onNavigate={onNavigate} />
          <FooterLink label="Street Cause" section="student-life/street-cause" onNavigate={onNavigate} />
          <FooterLink label="Contact Us" section="contact" onNavigate={onNavigate} />
          <FooterLink label="Swayam Corner" external="https://nptel.ac.in/LocalChapter/statistics/2380/" />
          <FooterLink label="Faculty Leave Application" external="http://elms.kmit.in" />

          <h4 className="ft-col-heading" style={{ marginTop: '1.5rem' }}>AICTE &amp; Redressal</h4>
          <a href="https://www.aicte.gov.in/schemes/students-development-schemes" target="_blank" rel="noopener noreferrer" className="ft-action-btn">
            <i className="fa-solid fa-award" /> AICTE Scholarship
          </a>
          <a href="https://www.aicte-india.org/feedback/faculty.php" target="_blank" rel="noopener noreferrer" className="ft-action-btn">
            <i className="fa-solid fa-chalkboard-user" /> AICTE Faculty Feedback
          </a>
          <a href="https://www.aicte-india.org/feedback/students.php" target="_blank" rel="noopener noreferrer" className="ft-action-btn">
            <i className="fa-solid fa-user-graduate" /> AICTE Students Feedback
          </a>
          <a href="mailto:principal@kmit.in?subject=Grievance Redressal" className="ft-action-btn ft-action-btn--grievance">
            <i className="fa-solid fa-file-circle-exclamation" /> Grievance Redressal
          </a>
        </div>

        {/* ── Col 4: Contact Us ── */}
        <div className="ft-col">
          <h4 className="ft-col-heading">Contact Us</h4>

          <div className="ft-contact-card">
            <div className="ft-contact-item">
              <div className="ft-contact-icon"><i className="fa-solid fa-location-dot" /></div>
              <div>
                <div className="ft-contact-label">Address</div>
                <div className="ft-contact-value">
                  3-5-1026, Narayanguda<br />
                  Hyderabad – 500029<br />
                  Telangana, India
                </div>
              </div>
            </div>

            <div className="ft-contact-item">
              <div className="ft-contact-icon"><i className="fa-solid fa-phone" /></div>
              <div>
                <div className="ft-contact-label">Phone</div>
                <a href="tel:04023261407" className="ft-contact-value ft-contact-link">040-23261407</a>
              </div>
            </div>

            <div className="ft-contact-item">
              <div className="ft-contact-icon"><i className="fa-solid fa-envelope" /></div>
              <div>
                <div className="ft-contact-label">Principal</div>
                <a href="mailto:principal@kmit.in" className="ft-contact-value ft-contact-link">principal@kmit.in</a>
              </div>
            </div>

            <div className="ft-contact-item">
              <div className="ft-contact-icon"><i className="fa-solid fa-envelope" /></div>
              <div>
                <div className="ft-contact-label">IQAC</div>
                <a href="mailto:iqac@kmit.in" className="ft-contact-value ft-contact-link">iqac@kmit.in</a>
              </div>
            </div>

            <div className="ft-contact-item">
              <div className="ft-contact-icon"><i className="fa-solid fa-envelope" /></div>
              <div>
                <div className="ft-contact-label">General</div>
                <a href="mailto:info@kmit.in" className="ft-contact-value ft-contact-link">info@kmit.in</a>
              </div>
            </div>
          </div>

          {/* Google Maps embed */}
          <div className="ft-map-wrap">
            <iframe
              title="KMIT Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.3039126073345!2d78.4891184925159!3d17.397196846243155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99c44533324f%3A0x44f1adce98cf9f07!2sKESHAV%20MEMORIAL%20INSTITUTE%20OF%20TECHNOLOGY%2C%203-5-1026%2C%20Narayanguda%20Rd%2C%20Hari%20Vihar%20Colony%2C%20Bhawani%20Nagar%2C%20Narayanguda%2C%20Hyderabad%2C%20Telangana%20500029!5e0!3m2!1sen!2sin!4v1637124238979!5m2!1sen!2sin"
              width="100%"
              height="170"
              style={{ border: 0, borderRadius: '10px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Social Icons — branded colors on hover */}
          <div className="ft-socials">
            <a href="https://www.facebook.com/kmitofficial/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="ft-social-btn ft-social-fb">
              <i className="fa-brands fa-facebook-f" />
            </a>
            <a href="https://www.instagram.com/kmitofficial/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="ft-social-btn ft-social-ig">
              <i className="fa-brands fa-instagram" />
            </a>
            <a href="#" aria-label="Twitter / X" className="ft-social-btn ft-social-x">
              <i className="fa-brands fa-x-twitter" />
            </a>
            <a href="https://www.youtube.com/@KeshavMemorialInstituteofTechn" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="ft-social-btn ft-social-yt">
              <i className="fa-brands fa-youtube" />
            </a>
            <a href="https://www.linkedin.com/school/kmitofficial/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="ft-social-btn ft-social-li">
              <i className="fa-brands fa-linkedin-in" />
            </a>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          BOTTOM BAR
      ══════════════════════════════════════════ */}
      <div className="ft-bottom">
        <div className="container ft-bottom-inner">
          <p className="ft-copyright">
            &copy; {new Date().getFullYear()} <strong>Keshav Memorial Institute of Technology</strong>. All Rights Reserved.
          </p>
          <div className="ft-bottom-links">
            <a href="#" onClick={e => { e.preventDefault(); onNavigate && onNavigate('about/accreditations') }}>Mandatory Disclosure</a>
            <span>·</span>
            <a href="#" onClick={e => { e.preventDefault(); onNavigate && onNavigate('about/hr-policy') }}>HR Policy</a>
            <span>·</span>
            <a href="#" onClick={e => { e.preventDefault(); onNavigate && onNavigate('contact') }}>Contact</a>
          </div>
          <p className="ft-poweredby">Powered by <span>Genesis Solutions</span></p>
        </div>
      </div>

      {/* ── Floating scroll to top ── */}
      <ScrollToTop />
    </footer>
  )
}
