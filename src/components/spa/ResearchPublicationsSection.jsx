import React from 'react'
import { Link } from 'react-router-dom'
import './ResearchPublicationsSection.css'

export default function ResearchPublicationsSection() {
  const links = [
    { label: 'Publication Policy', to: '/research/policy', icon: 'fa-gavel', desc: 'Incentives, review stages & guidelines.' },
    { label: 'Research E-Resources', to: 'http://library.kmit.in', icon: 'fa-book-open-reader', external: true, desc: 'Digital library and academic e-journals.' },
    { label: 'Publication Committee', to: '/research/committee', icon: 'fa-users-rectangle', desc: 'Meet our academic review board.' },
    { label: 'List of Publications', to: '/research/publications', icon: 'fa-newspaper', desc: 'Faculty research papers registry.' },
    { label: 'List of Patents', to: '/research/patents', icon: 'fa-certificate', desc: 'KMIT reconfigurable technology patents.' },
    { label: 'Reimbursement Form', to: '/research/reimbursement', icon: 'fa-file-invoice-dollar', desc: 'DOCX claim template & guidelines.' },
    { label: 'Code of Ethics', to: '/research/ethics', icon: 'fa-scale-balanced', desc: 'Zero tolerance plagiarism standards.' }
  ]

  return (
    <section className="page-section-dark pub-footer-section">
      <div className="container">
        <div className="pub-section-grid">
          
          {/* Left Block: Research Callout */}
          <div className="pub-callout-card">
            <span className="pub-tag">Academic Excellence</span>
            <h2>Research <em>Publications</em></h2>
            <p>
              KMIT actively fosters a cutting-edge publishing ecosystem by incentivizing peer-reviewed journal contributions, providing extensive financial grants, and involving student investigators in national R&D programs.
            </p>
            <div className="pub-stats-mini">
              <div className="ps-mini-item">
                <span className="ps-val">#1</span>
                <span className="ps-lbl">SWAYAM NPTEL in India</span>
              </div>
              <div className="ps-mini-item">
                <span className="ps-val">₹50K</span>
                <span className="ps-lbl">Reimbursement Cap</span>
              </div>
            </div>
          </div>

          {/* Right Block: Links Grid */}
          <div className="pub-links-grid">
            {links.map((link, idx) => {
              const isExternal = link.external;
              const linkContent = (
                <>
                  <div className="pub-link-icon">
                    <i className={`fa-solid ${link.icon}`}></i>
                  </div>
                  <div className="pub-link-meta">
                    <h4>{link.label}</h4>
                    <p>{link.desc}</p>
                  </div>
                  <div className="pub-link-arrow">
                    <i className={`fa-solid ${isExternal ? 'fa-arrow-up-right-from-square' : 'fa-chevron-right'}`}></i>
                  </div>
                </>
              );

              return isExternal ? (
                <a 
                  key={idx} 
                  href={link.to} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="pub-link-card"
                >
                  {linkContent}
                </a>
              ) : (
                <Link 
                  key={idx} 
                  to={link.to} 
                  className="pub-link-card"
                >
                  {linkContent}
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
