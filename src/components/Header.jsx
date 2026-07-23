import { useState, useRef, useEffect, useMemo } from 'react'
import { useData } from '../context/websiteData'
import { buildSearchIndex, searchIndex } from '../utils/buildSearchIndex'

function SearchDropdown({ searchOpen, setSearchOpen, searchQuery, setSearchQuery, searchInputRef, suggestions, handleSearchClick }) {
  return (
    <div className="search-wrapper" onClick={e => e.stopPropagation()}>
      <button
        className="header-search"
        title="Search"
        onClick={e => { e.stopPropagation(); setSearchOpen(v => !v); setSearchQuery('') }}
      >
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
      <div className={`search-dropdown${searchOpen ? ' active' : ''}`}>
        <div className="search-box">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search pages, syllabus, ranks…"
            autoComplete="off"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        {searchQuery.trim() && (
          <div className="search-suggestions" style={{ display: 'block' }}>
            {suggestions.length === 0 ? (
              <div className="search-no-results">No results found for "{searchQuery}"</div>
            ) : suggestions.map((item, i) => (
              <div
                key={i}
                className="suggestion-item"
                onClick={() => handleSearchClick(item)}
              >
                <i className="fa-solid fa-arrow-right"></i>
                <div><strong>{item.title}</strong><span>{item.desc}</span></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Header({ scrolled, activeSection, onNavigate }) {
  const { data } = useData()
  const NAV_ITEMS = data.navItems || []

  const searchIndexData = useMemo(() => buildSearchIndex(NAV_ITEMS), [NAV_ITEMS])
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  const [nestedExpanded, setNestedExpanded] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef(null)
  const [activeDeptIndex, setActiveDeptIndex] = useState(0)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setSearchOpen(false); setMobileOpen(false); setMobileExpanded(null) } }
    const onClickOut = (e) => {
      // Only close search / menu when clicking the backdrop overlay — not nav items
      if (e.target && (e.target.id === 'mobile-overlay' || e.target.closest?.('#mobile-overlay'))) {
        setSearchOpen(false)
        setMobileOpen(false)
        setMobileExpanded(null)
      } else if (!e.target?.closest?.('.header-nav') && !e.target?.closest?.('.search-wrapper')) {
        setSearchOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('click', onClickOut)
    return () => { window.removeEventListener('keydown', onKey); document.removeEventListener('click', onClickOut) }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('mobile-menu-active', mobileOpen)
    // Reset expanded dropdown when menu is closed
    if (!mobileOpen) { setMobileExpanded(null); setNestedExpanded(null); }
  }, [mobileOpen])

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 50)
  }, [searchOpen])

  const suggestions = searchQuery.trim()
    ? searchIndex(searchIndexData, searchQuery).slice(0, 12)
    : []

  const handleNav = (section) => {
    if (section) { onNavigate(section); setMobileOpen(false) }
  }

  const handleSearchClick = (item) => {
    if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer')
    } else {
      handleNav(item.section)
    }
    setSearchOpen(false)
    setSearchQuery('')
  }

  const handleStudentAccessClick = (e) => {
    e.preventDefault();
    setMobileOpen(false);
    if (window.location.pathname === '/' || window.location.pathname === '') {
      const el = document.getElementById('student-quick-access');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onNavigate('');
      setTimeout(() => {
        const el = document.getElementById('student-quick-access');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  }

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}${activeSection === '' ? ' is-home' : ''}`}>


      <div className="container header-inner">
        {/* Tier 2: Main Logo Row */}
        <div className="header-top-row">
          {/* Logo */}
          <a href="#" className="site-logo" onClick={e => { e.preventDefault(); onNavigate('') }}>
            <img
              src="/photos/main/logo.png"
              alt="KMIT Logo"
              style={{ height: 60, width: 'auto', objectFit: 'contain' }}
              onError={e => { e.target.src = 'https://api.dicebear.com/9.x/initials/svg?seed=KMIT&backgroundColor=0f172a&textColor=ffffff' }}
            />
            <div className="logo-text-stack">
              <strong className="logo-title">KESHAV MEMORIAL INSTITUTE OF TECHNOLOGY</strong>
              <small className="logo-subtitle">AN AUTONOMOUS INSTITUTION - ACCREDITED BY NAAC WITH 'A' GRADE</small>
              <span className="logo-powered">
                ( Powered by <em>GENESIS</em> )
              </span>
            </div>
          </a>

          {/* Right Side: Accreditation Logos — desktop only */}
          <div className="header-accreditations-wrap mobile-hide">
            <div className="header-accreditation-logos">
              <img src="https://kmit.in/images/naac2.png" alt="NAAC" />
              <img src="https://kmit.in/images/nba.png" alt="NBA" />
              <img src="https://kmit.in/images/aicte.png" alt="AICTE" />
              <img src="https://kmit.in/images/ariia.png" alt="ARIIA" />
            </div>
          </div>


          {/* Mobile: Search (same as desktop) + Hamburger */}
          <div className="mobile-header-actions" onClick={e => e.stopPropagation()}>
            {/* Search */}
            <SearchDropdown 
              searchOpen={searchOpen}
              setSearchOpen={setSearchOpen}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchInputRef={searchInputRef}
              suggestions={suggestions}
              handleSearchClick={handleSearchClick}
            />

            {/* Hamburger */}
            <button className="mobile-toggle" aria-label="Menu" onClick={() => setMobileOpen(v => !v)}>
              <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
            </button>
          </div>

        </div>


        {/* Tier 3: Nav Row */}
        <div className="header-bottom-row">
          {/* Nav */}
          <nav className="header-nav">
            <ul className="nav-list">
              {NAV_ITEMS.map(item => {
                return (
                  <li key={item.key} className={`nav-item${activeSection === item.key ? ' spa-active' : ''}`} data-nav={item.key}>
                    <a
                      href="#"
                      className="nav-link"
                      onClick={e => {
                        e.preventDefault()
                        e.stopPropagation() // prevent document click handler from interfering
                        if (item.type === 'none') {
                          handleNav(item.section || '')
                        } else {
                          // Use functional form to avoid stale closure on re-renders
                          setMobileExpanded(prev => prev === item.key ? null : item.key)
                        }
                      }}
                    >
                      {item.label.toLowerCase()} {item.type !== 'none' && <i className="fa-solid fa-chevron-down nav-caret"></i>}
                    </a>

                    {item.type !== 'none' && (
                      <div className={`mega-panel${mobileExpanded === item.key ? ' active' : ''}`}>
                        {item.type === 'cards' ? (
                          <div className={`mega-inner cols-${item.cols}`}>
                            {item.items.map((card, i) => {
                              const isSyllabus = card.title === 'Syllabus';
                              
                              if (isSyllabus) {
                                return (
                                  <div key={i} className="nested-submenu-card-wrap">
                                    <span 
                                      className="mega-card nested-trigger-card"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setNestedExpanded(prev => prev === 'Syllabus' ? null : 'Syllabus');
                                      }}
                                    >
                                      {card.title} <i className={`fa-solid fa-chevron-right nested-arrow-inline${nestedExpanded === 'Syllabus' ? ' is-open-arrow' : ''}`}></i>
                                    </span>
                                    <div className={`nested-submenu-inline-panel${nestedExpanded === 'Syllabus' ? ' is-open-panel' : ''}`}>
                                      <a href="#" onClick={e => { e.preventDefault(); handleNav('academics/cse/syllabus') }}>CSE Syllabus</a>
                                      <a href="#" onClick={e => { e.preventDefault(); handleNav('academics/it/syllabus') }}>IT Syllabus</a>
                                      <a href="#" onClick={e => { e.preventDefault(); handleNav('academics/csm/syllabus') }}>CSM Syllabus</a>
                                      <a href="#" onClick={e => { e.preventDefault(); handleNav('academics/csd/syllabus') }}>CSD Syllabus</a>
                                    </div>
                                  </div>
                                );
                              }
                              
                              return (
                                <a
                                  key={i}
                                  href="#"
                                  className="mega-card"
                                  onClick={e => { e.preventDefault(); if (card.section) handleNav(card.section) }}
                                >
                                  {card.title}
                                </a>
                              );
                            })}
                          </div>
                        ) : (
                          <div className={`mega-inner cols-${item.cols || 1}`}>
                            {item.columns.map((col, ci) => (
                              <div key={ci} className={`mega-col${col.links.length > 4 ? ' wide' : ''}`}>
                                <p className="mega-col-title">{col.title}</p>
                                <div className="mega-links-grid">
                                  {col.links.map((lnk, li) => {
                                    const isCommitteesSub = lnk.label === 'Other Committees' || lnk.label === 'Committees';
                                    
                                    if (isCommitteesSub) {
                                      return (
                                        <div key={li} className="nested-submenu-card-wrap">
                                          <span 
                                            className="nested-trigger-card" 
                                            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 500, color: '#334155' }}
                                            onClick={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              setNestedExpanded(prev => prev === 'Committees' ? null : 'Committees');
                                            }}
                                          >
                                            Committees <i className={`fa-solid fa-chevron-right nested-arrow-inline${nestedExpanded === 'Committees' ? ' is-open-arrow' : ''}`}></i>
                                          </span>
                                          <div className={`nested-submenu-inline-panel${nestedExpanded === 'Committees' ? ' is-open-panel' : ''}`}>
                                            <a href="#" onClick={e => { e.preventDefault(); handleNav('administration/hod') }}>HODs</a>
                                            <a href="#" onClick={e => { e.preventDefault(); handleNav('administration/academic-core-committee') }}>Academic Core</a>
                                            <a href="#" onClick={e => { e.preventDefault(); handleNav('administration/iic') }}>IIC</a>
                                            <a href="#" onClick={e => { e.preventDefault(); handleNav('administration/idmc') }}>IDMC</a>
                                            <a href="#" onClick={e => { e.preventDefault(); handleNav('administration/committees') }}>Other Committees</a>
                                            <a href="#" onClick={e => { e.preventDefault(); handleNav('administration/anti-ragging') }}>Anti-Ragging</a>
                                            <a href="#" onClick={e => { e.preventDefault(); handleNav('administration/grievance') }}>Grievance</a>
                                            <a href="#" onClick={e => { e.preventDefault(); handleNav('administration/icc') }}>ICC</a>
                                            <a href="#" onClick={e => { e.preventDefault(); handleNav('administration/sc-st') }}>SC/ST</a>
                                          </div>
                                        </div>
                                      );
                                    }

                                    return lnk.url ? (
                                      <a
                                        key={li}
                                        href={lnk.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => setMobileOpen(false)}
                                      >
                                        {lnk.label}
                                      </a>
                                    ) : (
                                      <a
                                        key={li}
                                        href="#"
                                        onClick={e => { e.preventDefault(); if (lnk.section) handleNav(lnk.section) }}
                                      >
                                        {lnk.label}
                                      </a>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
              <li className="nav-item">
                <a
                  href="https://ssolive.myclassboard.com/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3DDIL4KLQ05IV1JZOXCLM0%26redirect_uri%3Dhttps%253A%252F%252Ficici.myclassboard.com%252Fsso%252FCallback%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520offline_access"
                  className="nav-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  pay fees
                </a>
              </li>

              <li className="nav-item nav-search-item">
                <SearchDropdown 
                  searchOpen={searchOpen}
                  setSearchOpen={setSearchOpen}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  searchInputRef={searchInputRef}
                  suggestions={suggestions}
                  handleSearchClick={handleSearchClick}
                />
              </li>
              {/* Mobile-only Pay Fees CTA — pinned at bottom of drawer */}
              <li className="nav-item mobile-pay-fees-item">
                <a
                  href="https://ssolive.myclassboard.com/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3DDIL4KLQ05IV1JZOXCLM0%26redirect_uri%3Dhttps%253A%252F%252Ficici.myclassboard.com%252Fsso%252FCallback%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520offline_access"
                  className="mobile-pay-fees-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                >
                  Pay Fees
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
