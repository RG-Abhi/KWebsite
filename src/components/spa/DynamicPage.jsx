import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useParams, useNavigate } from 'react-router-dom'
import PageShell from './PageShell'
import SafePdfViewer from '../SafePdfViewer'
import { useData } from '../../context/websiteData'
import ScrollReveal from '../ScrollReveal'
import { programDetails } from './CoCurricularsPage'

const getAbsoluteUrl = (url) => {
  if (!url) return ''
  let cleanUrl = url.trim()
  
  // Clean file:// leftovers from legacy scraping
  if (cleanUrl.startsWith('file:///')) {
    const filename = cleanUrl.split('/').pop()
    cleanUrl = `https://kmit.in/department/profiles/CSE/${filename}`
  }
  
  // Clean trailing parentheses or space brackets
  cleanUrl = cleanUrl.replace(/[\)\]\s]+$/, '')

  if (cleanUrl.startsWith('http')) return encodeURI(cleanUrl)
  if (cleanUrl.startsWith('/')) return encodeURI(`https://kmit.in${cleanUrl}`)
  return encodeURI(`https://kmit.in/${cleanUrl}`)
}

const getViewerUrl = (url) => {
  // Return the direct URL so it opens natively in the browser.
  // The KMIT pdfjs viewer requires same-origin, so skip it.
  return getAbsoluteUrl(url)
}

const getOriginalSiteUrl = (pageKey) => {
  if (!pageKey) return 'https://kmit.in/index.php'
  
  const key = pageKey.toLowerCase()
  
  if (key === 'about/accreditations') return 'https://kmit.in/accreditations.php'
  if (key === 'student-life/achievements') return 'https://kmit.in/achievements.php'
  if (key === 'student-life') return 'https://kmit.in/studentlife.php'
  
  if (key.includes('vision') || key.includes('mission')) return 'https://kmit.in/about.php'
  if (key.includes('principal')) return 'https://kmit.in/principal.php'
  if (key.includes('director')) return 'https://kmit.in/director.php'
  if (key.includes('kmes')) return 'https://kmit.in/kmes.php'
  if (key.includes('management')) return 'https://kmit.in/management.php'
  if (key.includes('hod')) return 'https://kmit.in/hod.php'
  if (key.includes('innovation') || key.includes('iic')) return 'https://kmit.in/iic.php'
  if (key.includes('committees') || key.includes('committee')) return 'https://kmit.in/committees.php'
  
  if (key.includes('tessellator')) return 'https://tessellator.kmit.in/'
  if (key.includes('lms')) return 'https://lms.kmit.in/'
  if (key.includes('teleuniv')) return 'https://teleuniv.in/'
  if (key.includes('tv')) return 'https://kmit.in/kmit-tv.php'
  if (key.includes('ict')) return 'https://kmit.in/ict'
  
  if (key.includes('courses')) return 'https://kmit.in/courses.php'
  if (key.includes('eligibility') || key.includes('procedure')) return 'https://kmit.in/eligibility.php'
  if (key.includes('fees')) return 'https://kmit.in/fees.php'
  if (key.includes('scholarship')) return 'https://kmit.in/scholarships.php'
  
  if (key.includes('calendar')) return 'https://kmit.in/calendars.php'
  if (key.includes('syllabus')) return 'https://kmit.in/syllabus.php'
  if (key.includes('regulations')) return 'https://kmit.in/regulations.php'
  if (key.includes('value-added')) return 'https://kmit.in/valueadded.php'
  if (key.includes('awards')) return 'https://kmit.in/awards.php'
  if (key.includes('evaluation')) return 'https://kmit.in/academics.php'
  
  if (key.includes('placements') || key.includes('placement')) return 'https://kmit.in/placement.php'
  if (key.includes('recruiters')) return 'https://kmit.in/recruiters.php'
  
  if (key.includes('research')) return 'https://kmit.in/research.php'
  if (key.includes('gsoc')) return 'https://kmit.in/gsoc.php'
  
  if (key.includes('library')) return 'https://kmit.in/library.php'
  if (key.includes('sports')) return 'https://kmit.in/sports.php'
  if (key.includes('accessibility')) return 'https://kmit.in/accessibility.php'
  
  if (key.includes('exams') || key.includes('examination') || key.includes('notifications')) return 'https://kmit.in/exam.php'
  if (key.includes('contact')) return 'https://kmit.in/contact.php'
  
  const parts = pageKey.split('/')
  const lastPart = parts[parts.length - 1]
  if (lastPart) {
    return `https://kmit.in/${lastPart}.php`
  }
  
  return 'https://kmit.in/index.php'
}

function renderTableCell(cell, onPdfClick) {
  if (cell == null) return ''
  if (typeof cell === 'string' || typeof cell === 'number') return cell
  if (typeof cell === 'object' && cell.link) {
    const isPdf = cell.link.toLowerCase().endsWith('.pdf')
    if (isPdf && onPdfClick) {
      return (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => onPdfClick(cell.link, cell.text)}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              color: 'var(--vibrant-accent)',
              fontWeight: 600,
              textDecoration: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              display: 'inline'
            }}
          >
            {cell.text} <i className="fa-solid fa-eye" style={{ marginLeft: '4px', fontSize: '0.85em' }}></i>
          </button>
          
          <a
            href={getAbsoluteUrl(cell.link)}
            download
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--navy)',
              fontSize: '0.85em',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center'
            }}
            title="Download PDF"
          >
            <i className="fa-solid fa-download"></i>
          </a>
        </div>
      )
    }
    const href = isPdf || (cell.external !== false && !cell.link.startsWith('/'))
      ? getViewerUrl(cell.link)
      : cell.link
    const isExternal = isPdf || (cell.external !== false && !cell.link.startsWith('/'))
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        style={{ color: 'var(--vibrant-accent)', fontWeight: 600, textDecoration: 'none' }}
      >
        {cell.text}
      </a>
    )
  }
  return cell.text ?? ''
}

export default function DynamicPage({ pageKey: propKey }) {
  const { category, pageKey: paramKey } = useParams()
  const navigate = useNavigate()
  const { data: contextData } = useData()

  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedPdf, setSelectedPdf] = useState(null)
  const [activeTabs, setActiveTabs] = useState({})
  const [activeAccordions, setActiveAccordions] = useState({})
  const [lightboxImage, setLightboxImage] = useState(null)
  const [tableSearch, setTableSearch] = useState({})
  const [activeProgramModal, setActiveProgramModal] = useState(null)

  useEffect(() => {
    if (activeProgramModal) {
      document.body.classList.add('modal-open')
      document.documentElement.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
      document.documentElement.classList.remove('modal-open')
    }
    return () => {
      document.body.classList.remove('modal-open')
      document.documentElement.classList.remove('modal-open')
    }
  }, [activeProgramModal])

  let pageKey = propKey || (category && paramKey ? `${category}/${paramKey}` : paramKey)

  // 1. Fetch Page Contents Dynamically
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('testpdf') === 'true') {
      setPage({
        title: 'Academic Calendars',
        hero: { eyebrow: 'Academics', title: 'Academic Calendars', text: 'Download academic calendars for all B.Tech programmes by academic year.' },
        sections: []
      });
      setLoading(false);
      return;
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    fetch(`/api/pages/${encodeURIComponent(pageKey)}`)
      .then(res => {
        if (!res.ok) throw new Error('Page not found')
        return res.json()
      })
      .then(data => {
        if (!cancelled) {
          setPage(data)
          setLoading(false)
        }
      })
      .catch(err => {
        if (!cancelled) {
          const localPage = contextData.pages?.[pageKey]
          if (localPage) {
            setPage(localPage)
            setLoading(false)
          } else {
            setError(err.message)
            setLoading(false)
          }
        }
      })

    return () => {
      cancelled = true
    }
  }, [pageKey, contextData])

  // 2. Inject SEO Metadata dynamically on page update
  useEffect(() => {
    if (page && page.seo) {
      const defaultTitle = 'KMIT - Keshav Memorial Institute of Technology'
      const defaultDesc = 'Keshav Memorial Institute of Technology (KMIT), established in 2007, is a premier engineering college in Hyderabad, Telangana.'

      document.title = page.seo.title || page.title || defaultTitle

      // Meta Description
      let metaDesc = document.querySelector('meta[name="description"]')
      if (!metaDesc) {
        metaDesc = document.createElement('meta')
        metaDesc.setAttribute('name', 'description')
        document.head.appendChild(metaDesc)
      }
      metaDesc.setAttribute('content', page.seo.description || defaultDesc)

      // Meta Keywords
      if (page.seo.keywords) {
        let metaKey = document.querySelector('meta[name="keywords"]')
        if (!metaKey) {
          metaKey = document.createElement('meta')
          metaKey.setAttribute('name', 'keywords')
          document.head.appendChild(metaKey)
        }
        metaKey.setAttribute('content', page.seo.keywords)
      }

      // OG Image
      if (page.seo.ogImage) {
        let ogImg = document.querySelector('meta[property="og:image"]')
        if (!ogImg) {
          ogImg = document.createElement('meta')
          ogImg.setAttribute('property', 'og:image')
          document.head.appendChild(ogImg)
        }
        ogImg.setAttribute('content', page.seo.ogImage)
      }
    }
  }, [page])

  // Lock scrolling when modals are active
  useEffect(() => {
    if (selectedPdf || lightboxImage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedPdf, lightboxImage])

  // Auto-open PDF overlay for responsive visual audit testing
  useEffect(() => {
    if (!loading && page) {
      const params = new URLSearchParams(window.location.search);
      if (params.get('testpdf') === 'true') {
        setSelectedPdf({
          url: '/academics/calendars/KR24 - B.Tech First Year Academic Calender (Revised) 2025-26.pdf',
          title: 'Revised KR24 - Academic calendar for B.Tech I Year I & II Semesters 2025-26 (AUTONOMOUS)'
        });
      }
    }
  }, [loading, page])

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', background: 'var(--bg-light)' }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '5px solid rgba(165, 28, 48, 0.1)',
          borderTopColor: 'var(--crimson)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (error || !page) {
    const originalSiteUrl = getOriginalSiteUrl(pageKey)
    const pageTitle = pageKey
      .split('/')
      .pop()
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())

    return (
      <PageShell
        eyebrow="Portal Status"
        title={pageTitle}
        titleEm="Updates"
        description={`The official ${pageTitle} portal of Keshav Memorial Institute of Technology is currently undergoing upgrades.`}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: pageTitle }]}
      >
        <section className="page-section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>
          <div className="container">
            <div style={{
              maxWidth: '750px',
              margin: '0 auto',
              background: 'var(--white)',
              borderRadius: '24px',
              border: '1px solid var(--light-grey)',
              padding: '4rem 2.5rem',
              textAlign: 'center',
              boxShadow: 'var(--shadow-lift)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '-15%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '350px',
                height: '350px',
                background: 'radial-gradient(circle, rgba(165, 28, 48, 0.08) 0%, rgba(255,255,255,0) 70%)',
                borderRadius: '50%',
                zIndex: 0,
                pointerEvents: 'none'
              }} />

              <div style={{
                position: 'relative',
                zIndex: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '90px',
                height: '90px',
                borderRadius: '24px',
                background: 'rgba(165, 28, 48, 0.1)',
                color: 'var(--crimson, #A51C30)',
                fontSize: '2.8rem',
                marginBottom: '2rem',
                boxShadow: '0 12px 20px -8px rgba(165, 28, 48, 0.25)',
                animation: 'pulseGlowCrimson 2.2s infinite'
              }}>
                <i className="fa-solid fa-compass-drafting" />
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{ fontSize: '2rem', color: 'var(--navy)', fontWeight: '850', marginBottom: '1rem' }}>
                  Section Under <em>Construction</em>
                </h2>
                
                <div className="section-divider" style={{ margin: '1rem auto 1.5rem auto' }} />

                <p style={{
                  color: '#4b5563',
                  fontSize: '1.05rem',
                  lineHeight: '1.8',
                  maxWidth: '580px',
                  margin: '0 auto 2.5rem auto'
                }}>
                  We are currently redesigning the <strong>{pageTitle}</strong> section with a modern, high-performance visual experience to match KMIT's academic standards. You can access the original KMIT records in the meantime.
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}>
                  <a
                    href={originalSiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: 'var(--crimson, #A51C30)',
                      color: 'var(--white)',
                      padding: '12px 28px',
                      borderRadius: '50px',
                      fontSize: '0.96rem',
                      fontWeight: '750',
                      textDecoration: 'none',
                      boxShadow: '0 8px 16px -4px rgba(165, 28, 48, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                    className="btn-original-site"
                  >
                    View Original Site Page <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.85em' }} />
                  </a>
                  
                  <button
                    onClick={() => navigate('/')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(15, 23, 42, 0.05)',
                      color: 'var(--navy)',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '50px',
                      fontSize: '0.96rem',
                      fontWeight: '750',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Back to Home
                  </button>
                </div>
              </div>

              <div style={{
                position: 'relative',
                zIndex: 1,
                paddingTop: '2rem',
                borderTop: '1px solid #f1f5f9'
              }}>
                <div style={{ color: '#64748b', fontSize: '0.88rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
                  <span><i className="fa-solid fa-envelope" style={{ marginRight: '6px' }} /> info@kmit.in</span>
                  <span><i className="fa-solid fa-phone" style={{ marginRight: '6px' }} /> 040-23261407</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <style>{`
          @keyframes pulseGlowCrimson {
            0% { box-shadow: 0 0 0 0 rgba(165, 28, 48, 0.4); }
            70% { box-shadow: 0 0 0 16px rgba(165, 28, 48, 0); }
            100% { box-shadow: 0 0 0 0 rgba(165, 28, 48, 0); }
          }
          .btn-original-site:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 20px -4px rgba(165, 28, 48, 0.45);
            background: #8b1424 !important;
          }
        `}</style>
      </PageShell>
    )
  }

  const breadcrumbLabel = page.breadcrumb || pageKey.split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

  return (
    <PageShell
      eyebrow={page.hero?.eyebrow}
      title={page.hero?.title || page.title}
      titleEm={page.hero?.titleEm}
      description={page.hero?.text}
      breadcrumbs={page.breadcrumbs || [{ label: breadcrumbLabel }]}
    >
      {page.sections && page.sections.map((section, idx) => {
        switch (section.type) {
          case 'stats':
            return (
              <section key={idx} className="page-section">
                <div className="container">
                  <div className="stats-strip" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                    {section.items.map((stat, i) => (
                      <div key={i} className="stat-block" style={{ textAlign: 'center', background: 'var(--white)', padding: '2rem 1.5rem', borderRadius: '16px', border: '1px solid var(--light-grey)' }}>
                        <span className="stat-value" style={{ fontSize: '2.5rem', color: 'var(--brand-orange-text)', fontWeight: '850', display: 'block', marginBottom: '0.5rem' }}>
                          {stat.value}
                        </span>
                        <span className="stat-label" style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 'bold' }}>
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )

          case 'text':
            return (
              <section key={idx} className={section.alt ? 'page-section-alt' : 'page-section'}>
                <div className="container">
                  {(section.eyebrow || section.title) && (
                    <div className="section-header">
                      {section.eyebrow && <div className="section-eyebrow">{section.eyebrow}</div>}
                      {section.title && <h2>{section.title}</h2>}
                      <div className="section-divider"></div>
                    </div>
                  )}
                  {section.content?.map((p, i) => <p key={i} className="section-text" style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#374151', marginBottom: '1.5rem' }}>{p}</p>)}
                </div>
              </section>
            )

          case 'richText':
            return (
              <section key={idx} className={section.alt ? 'page-section-alt' : 'page-section'}>
                <div className="container">
                  {(section.eyebrow || section.title) && (
                    <div className="section-header">
                      {section.eyebrow && <div className="section-eyebrow">{section.eyebrow}</div>}
                      {section.title && <h2>{section.title}</h2>}
                      <div className="section-divider"></div>
                    </div>
                  )}
                  <div dangerouslySetInnerHTML={{ __html: section.html }} style={{ lineHeight: '1.8', color: '#374151' }} />
                </div>
              </section>
            )

          case 'bullets':
            return (
              <section key={idx} className="page-section-alt">
                <div className="container">
                  {section.title && (
                    <div className="section-header">
                      {section.eyebrow && <div className="section-eyebrow">{section.eyebrow}</div>}
                      <h2>{section.title}</h2>
                      <div className="section-divider"></div>
                    </div>
                  )}
                  <ul style={{ paddingLeft: '1.5rem', lineHeight: 1.9, listStyleType: 'disc' }}>
                    {section.items.map((item, i) => (
                      <li key={i} className="section-text" style={{ marginBottom: '0.75rem', fontSize: '1.05rem', color: '#374151' }}>{item}</li>
                    ))}
                  </ul>
                </div>
              </section>
            )

          case 'profileCard':
            return (
              <section key={idx} className="page-section">
                <div className="container">
                  {section.title && (
                    <div className="section-header">
                      {section.eyebrow && <div className="section-eyebrow">{section.eyebrow}</div>}
                      <h2>{section.title}</h2>
                      <div className="section-divider"></div>
                    </div>
                  )}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
                    {section.items.map((p, i) => (
                      <div key={i} style={{ background: 'var(--white)', border: '1px solid var(--light-grey)', borderRadius: '20px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                        {p.photo && (
                          <div style={{ height: '260px', overflow: 'hidden', background: '#f3f4f6', position: 'relative' }}>
                            <img src={p.photo} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                        )}
                        <div style={{ padding: '2rem 1.5rem' }}>
                          <h3 style={{ fontSize: '1.25rem', color: 'var(--navy)', fontWeight: '800', marginBottom: '0.25rem' }}>{p.name}</h3>
                          <div style={{ color: 'var(--brand-orange-text)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{p.designation}</div>
                          {p.bio && <p style={{ fontSize: '0.95rem', color: '#4b5563', lineHeight: '1.6' }}>{p.bio}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )

          case 'gallery':
            return (
              <section key={idx} className="page-section-alt">
                <div className="container">
                  {section.title && (
                    <div className="section-header">
                      {section.eyebrow && <div className="section-eyebrow">{section.eyebrow}</div>}
                      <h2>{section.title}</h2>
                      <div className="section-divider"></div>
                    </div>
                  )}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                    {section.items.map((img, i) => (
                      <div key={i} onClick={() => setLightboxImage(img)} style={{ height: '200px', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', border: '1px solid var(--light-grey)', boxShadow: 'var(--shadow-sm)' }}>
                        <img src={img.src} alt={img.alt || 'Gallery Image'} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'} />
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )

          case 'accordion':
            return (
              <section key={idx} className="page-section">
                <div className="container" style={{ maxWidth: '800px' }}>
                  {section.title && (
                    <div className="section-header">
                      {section.eyebrow && <div className="section-eyebrow">{section.eyebrow}</div>}
                      <h2>{section.title}</h2>
                      <div className="section-divider"></div>
                    </div>
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {section.items.map((item, i) => {
                      const isOpen = activeAccordions[`${idx}-${i}`]
                      return (
                        <div key={i} style={{ border: '1px solid var(--light-grey)', borderRadius: '12px', background: 'var(--white)', overflow: 'hidden' }}>
                          <button
                            onClick={() => setActiveAccordions(prev => ({ ...prev, [`${idx}-${i}`]: !isOpen }))}
                            style={{ width: '100%', textAlign: 'left', padding: '1.25rem 1.5rem', background: isOpen ? 'rgba(165,28,48,0.03)' : 'transparent', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', color: 'var(--navy)', fontSize: '1.05rem' }}
                          >
                            <span>{item.header}</span>
                            <i className={`fa-solid ${isOpen ? 'fa-minus' : 'fa-plus'}`} style={{ color: 'var(--brand-orange-text)' }}></i>
                          </button>
                          {isOpen && (
                            <div style={{ padding: '1.5rem', borderTop: '1px solid var(--light-grey)', color: '#4b5563', lineHeight: '1.7', fontSize: '0.98rem' }}>
                              {item.content}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </section>
            )

          case 'tabs':
            return (
              <section key={idx} className="page-section">
                <div className="container">
                  {section.title && (
                    <div className="section-header">
                      {section.eyebrow && <div className="section-eyebrow">{section.eyebrow}</div>}
                      <h2>{section.title}</h2>
                      <div className="section-divider"></div>
                    </div>
                  )}
                  <div>
                    {/* Tab Navigation */}
                    <div style={{ display: 'flex', borderBottom: '2px solid var(--light-grey)', overflowX: 'auto', gap: '1rem', marginBottom: '2rem' }}>
                      {section.items.map((tab, i) => {
                        const isSelected = (activeTabs[idx] ?? 0) === i
                        return (
                          <button
                            key={i}
                            onClick={() => setActiveTabs(prev => ({ ...prev, [idx]: i }))}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              padding: '12px 24px',
                              cursor: 'pointer',
                              fontWeight: 'bold',
                              fontSize: '1rem',
                              color: isSelected ? 'var(--crimson)' : '#64748b',
                              borderBottom: isSelected ? '3px solid var(--crimson)' : '3px solid transparent',
                              whiteSpace: 'nowrap',
                              transition: 'all 0.2s'
                            }}
                          >
                            {tab.label}
                          </button>
                        )
                      })}
                    </div>
                    
                    {/* Tab Content */}
                    <div>
                      {section.items[activeTabs[idx] ?? 0]?.content?.map((p, i) => (
                        <p key={i} className="section-text" style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#374151', marginBottom: '1.5rem' }}>{p}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )

          case 'timeline':
            return (
              <section key={idx} className="page-section">
                <div className="container">
                  <div className="section-header">
                    <div className="section-eyebrow">{section.eyebrow}</div>
                    <h2>{section.title}</h2>
                    <div className="section-divider"></div>
                  </div>
                  <div className="timeline">
                    {section.items.map((m, i) => (
                      <ScrollReveal key={i} animation="fade-up" delay={i * 100} className="timeline-item">
                        <div className="timeline-marker">{m.year.slice(2)}</div>
                        <div className="timeline-content">
                          <div className="timeline-year">{m.year}</div>
                          <h4>{m.title}</h4>
                          <p>{m.desc}</p>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </section>
            )

          case 'badges':
            return (
              <section key={idx} className="page-section-alt">
                <div className="container">
                  <div className="section-header centered">
                    <div className="section-eyebrow">{section.eyebrow}</div>
                    <h2>{section.title}</h2>
                    <div className="section-divider"></div>
                  </div>
                  <div className="badge-strip">
                    {section.items.map((b, i) => (
                      <div key={i} className="accred-badge">
                        <i className={`fa-solid ${b.icon}`}></i>
                        <strong>{b.title}</strong>
                        <span>{b.subtitle}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )

          case 'cards':
            return (
              <section key={idx} className="page-section">
                <div className="container">
                  {section.title && (
                    <div className="section-header">
                      {section.eyebrow && <div className="section-eyebrow">{section.eyebrow}</div>}
                      <h2>{section.title}</h2>
                      <div className="section-divider"></div>
                    </div>
                  )}
                  <div className="info-cards-grid">
                    {section.items.map((c, i) => {
                      const isInternal = c.link?.startsWith('/')
                      const hasModal = !!c.modalKey
                      
                      if (hasModal) {
                        return (
                          <div
                            key={i}
                            className="info-card"
                            role="button"
                            tabIndex={0}
                            onClick={() => setActiveProgramModal(c.modalKey)}
                            onKeyDown={(e) => e.key === 'Enter' && setActiveProgramModal(c.modalKey)}
                            style={{ cursor: 'pointer' }}
                          >
                            <div className="info-card-icon"><i className={`fa-solid ${c.icon}`}></i></div>
                            <h3>{c.title}</h3>
                            <p>{c.desc}</p>
                            <div style={{ marginTop: '1.5rem', color: 'var(--vibrant-accent)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              {c.linkLabel || 'View Details'} <i className="fa-solid fa-arrow-right"></i>
                            </div>
                          </div>
                        )
                      }
                      
                      if (isInternal) {
                        return (
                          <div
                            key={i}
                            className="info-card"
                            role="button"
                            tabIndex={0}
                            onClick={() => navigate(c.link)}
                            onKeyDown={(e) => e.key === 'Enter' && navigate(c.link)}
                            style={{ cursor: 'pointer' }}
                          >
                            <div className="info-card-icon"><i className={`fa-solid ${c.icon}`}></i></div>
                            <h3>{c.title}</h3>
                            <p>{c.desc}</p>
                            <div style={{ marginTop: '1.5rem', color: 'var(--vibrant-accent)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              {c.linkLabel || 'View Details'} <i className="fa-solid fa-arrow-right"></i>
                            </div>
                          </div>
                        )
                      }
                      const CardWrapper = c.link ? 'a' : 'div'
                      const cardProps = c.link ? { href: c.link, target: '_blank', rel: 'noopener noreferrer', style: { textDecoration: 'none', color: 'inherit', display: 'block', cursor: 'pointer' } } : {}
                      return (
                        <CardWrapper key={i} className="info-card" {...cardProps}>
                          <div className="info-card-icon"><i className={`fa-solid ${c.icon}`}></i></div>
                          <h3>{c.title}</h3>
                          <p>{c.desc}</p>
                          {c.link && (
                            <div style={{ marginTop: '1.5rem', color: 'var(--vibrant-accent)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              {c.linkLabel || 'Access Resources'} <i className="fa-solid fa-arrow-right"></i>
                            </div>
                          )}
                        </CardWrapper>
                      )
                    })}
                  </div>
                </div>
              </section>
            )

          case 'clubGrid':
            return (
              <section key={idx} className="page-section">
                <div className="container">
                  {section.title && (
                    <div className="section-header">
                      {section.eyebrow && <div className="section-eyebrow">{section.eyebrow}</div>}
                      <h2>{section.title}</h2>
                      <div className="section-divider"></div>
                    </div>
                  )}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {section.items.map((club, i) => (
                      <div key={i} style={{ background: 'var(--white)', border: '1px solid var(--light-grey)', borderRadius: '20px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column' }}>
                        {club.img && (
                          <div style={{ height: '180px', overflow: 'hidden' }}>
                            <img src={club.img} alt={club.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                        )}
                        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                          <h3 style={{ fontSize: '1.15rem', color: 'var(--navy)', fontWeight: '800', marginBottom: '0.5rem' }}>{club.name}</h3>
                          <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: '1.6', marginBottom: '1.5rem' }}>{club.desc}</p>
                          {club.link && (
                            <a href={club.link} target="_blank" rel="noopener noreferrer" style={{ marginTop: 'auto', textDecoration: 'none', color: 'var(--brand-orange-text)', fontWeight: 'bold', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                              Visit Portal <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.8em' }}></i>
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )

          case 'deptCards':
            return (
              <section key={idx} className="page-section">
                <div className="container">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
                    {section.items.map((c, i) => (
                      <div
                        key={i}
                        className="info-card"
                        style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}
                        role="button"
                        tabIndex={0}
                        onClick={() => navigate(c.link)}
                        onKeyDown={(e) => e.key === 'Enter' && navigate(c.link)}
                      >
                        <img
                          src={c.img}
                          alt={c.title}
                          style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                          loading="lazy"
                        />
                        <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                          <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>{c.title}</h3>
                          <span style={{ color: 'var(--vibrant-accent)', fontWeight: 700, fontSize: '0.9rem' }}>
                            View Details <i className="fa-solid fa-arrow-right"></i>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )

          case 'table':
            return (
              <section key={idx} className="page-section-alt">
                <div className="container">
                  <div className="section-header">
                    {section.eyebrow && <div className="section-eyebrow">{section.eyebrow}</div>}
                    <h2>{section.title}</h2>
                    <div className="section-divider"></div>
                  </div>
                  <div className="data-table-container">
                    <table className="data-table">
                      <thead>
                        <tr>
                          {section.headers.map((h, i) => <th key={i}>{h}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {section.rows.map((row, i) => (
                          <tr key={i}>
                            {row.map((cell, j) => <td key={j} data-label={section.headers[j] || ''}>{renderTableCell(cell, (url, title) => setSelectedPdf({ url, title }))}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {section.footnote && (
                    <p className="section-text" style={{ marginTop: '1rem', fontStyle: 'italic' }}>{section.footnote}</p>
                  )}
                </div>
              </section>
            )

          case 'tabbedTable':
            return (
              <section key={idx} className="page-section-alt">
                <div className="container">
                  <div className="section-header">
                    {section.eyebrow && <div className="section-eyebrow">{section.eyebrow}</div>}
                    <h2>{section.title}</h2>
                    <div className="section-divider"></div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', borderBottom: '2px solid var(--light-grey)', overflowX: 'auto', gap: '1rem', marginBottom: '2rem' }}>
                      {section.tabs?.map((tab, i) => {
                        const isSelected = (activeTabs[idx] ?? 0) === i
                        return (
                          <button
                            key={i}
                            onClick={() => setActiveTabs(prev => ({ ...prev, [idx]: i }))}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              padding: '12px 24px',
                              cursor: 'pointer',
                              fontWeight: 'bold',
                              fontSize: '1rem',
                              color: isSelected ? 'var(--crimson)' : '#64748b',
                              borderBottom: isSelected ? '3px solid var(--crimson)' : '3px solid transparent',
                              whiteSpace: 'nowrap',
                              transition: 'all 0.2s'
                            }}
                          >
                            {tab.label}
                          </button>
                        )
                      })}
                    </div>
                    <div className="data-table-container">
                      <table className="data-table">
                        <thead>
                          <tr>
                            {section.tabs?.[activeTabs[idx] ?? 0]?.headers?.map((h, i) => <th key={i}>{h}</th>)}
                          </tr>
                        </thead>
                        <tbody>
                          {section.tabs?.[activeTabs[idx] ?? 0]?.rows?.map((row, i) => (
                            <tr key={i}>
                              {row?.map((cell, j) => <td key={j} data-label={section.tabs?.[activeTabs[idx] ?? 0]?.headers?.[j] || ''}>{renderTableCell(cell, (url, title) => setSelectedPdf({ url, title }))}</td>)}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {section.footnote && (
                    <p className="section-text" style={{ marginTop: '1rem', fontStyle: 'italic' }}>{section.footnote}</p>
                  )}
                </div>
              </section>
            )

          case 'dataTable': {
            const query = (tableSearch[idx] ?? '').toLowerCase()
            const filteredRows = section.rows.filter(row => 
              row.some(cell => {
                const text = typeof cell === 'object' ? cell?.text : cell
                return String(text ?? '').toLowerCase().includes(query)
              })
            )
            return (
              <section key={idx} className="page-section-alt">
                <div className="container">
                  <div className="section-header">
                    {section.eyebrow && <div className="section-eyebrow">{section.eyebrow}</div>}
                    <h2>{section.title}</h2>
                    <div className="section-divider"></div>
                  </div>
                  
                  {/* Search Bar */}
                  <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
                      <input
                        type="text"
                        placeholder="Search table rows..."
                        value={tableSearch[idx] ?? ''}
                        onChange={e => setTableSearch(prev => ({ ...prev, [idx]: e.target.value }))}
                        style={{
                          width: '100%',
                          padding: '10px 16px 10px 40px',
                          borderRadius: '50px',
                          border: '1px solid var(--light-grey)',
                          outline: 'none',
                          fontSize: '0.92rem',
                          background: 'var(--white)'
                        }}
                      />
                      <i className="fa-solid fa-magnifying-glass" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}></i>
                    </div>
                  </div>

                  <div className="data-table-container">
                    <table className="data-table">
                      <thead>
                        <tr>
                          {section.headers.map((h, i) => <th key={i}>{h}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRows.length > 0 ? (
                          filteredRows.map((row, i) => (
                            <tr key={i}>
                              {row.map((cell, j) => <td key={j} data-label={section.headers[j] || ''}>{renderTableCell(cell, (url, title) => setSelectedPdf({ url, title }))}</td>)}
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={section.headers.length} style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                              No matching records found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  {section.footnote && (
                    <p className="section-text" style={{ marginTop: '1rem', fontStyle: 'italic' }}>{section.footnote}</p>
                  )}
                </div>
              </section>
            )
          }

          case 'eventTimeline':
            return (
              <section key={idx} className="page-section">
                <div className="container">
                  {section.title && (
                    <div className="section-header">
                      {section.eyebrow && <div className="section-eyebrow">{section.eyebrow}</div>}
                      <h2>{section.title}</h2>
                      <div className="section-divider"></div>
                    </div>
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', borderLeft: '3px solid var(--crimson)', paddingLeft: '2rem', marginLeft: '1rem', position: 'relative' }}>
                    {section.items.map((event, i) => (
                      <div key={i} style={{ position: 'relative' }}>
                        {/* Dot marker */}
                        <div style={{
                          position: 'absolute',
                          left: '-2.45rem',
                          top: '5px',
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          background: 'var(--white)',
                          border: '4px solid var(--crimson)'
                        }} />
                        <div>
                          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--brand-orange-text)', background: 'rgba(165,28,48,0.08)', padding: '4px 10px', borderRadius: '50px', display: 'inline-block', marginBottom: '0.5rem' }}>{event.date}</span>
                          <h3 style={{ fontSize: '1.15rem', color: 'var(--navy)', fontWeight: '800', marginBottom: '0.5rem' }}>{event.title}</h3>
                          <p style={{ color: '#4b5563', fontSize: '0.96rem', lineHeight: '1.6' }}>{event.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )

          case 'contactInfo':
            return (
              <section key={idx} className="page-section">
                <div className="container" style={{ maxWidth: '650px' }}>
                  <div style={{ background: 'var(--white)', border: '1px solid var(--light-grey)', borderRadius: '24px', padding: '3rem 2.5rem', boxShadow: 'var(--shadow-lift)', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(165,28,48,0.08)', color: 'var(--brand-orange-text)', fontSize: '1.6rem', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                      <i className="fa-solid fa-address-book"></i>
                    </div>
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--navy)', fontWeight: '850', marginBottom: '1rem' }}>{section.title || 'Contact Information'}</h3>
                    <div className="section-divider" style={{ margin: '0.5rem auto 1.5rem' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left', marginTop: '1.5rem' }}>
                      {section.phone && <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '1rem', color: '#374151' }}><i className="fa-solid fa-phone" style={{ color: 'var(--brand-orange-text)', width: '20px' }}></i> <span>{section.phone}</span></div>}
                      {section.email && <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '1rem', color: '#374151' }}><i className="fa-solid fa-envelope" style={{ color: 'var(--brand-orange-text)', width: '20px' }}></i> <span>{section.email}</span></div>}
                      {section.office && <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '1rem', color: '#374151' }}><i className="fa-solid fa-building" style={{ color: 'var(--brand-orange-text)', width: '20px' }}></i> <span>{section.office}</span></div>}
                      {section.timings && <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '1rem', color: '#374151' }}><i className="fa-solid fa-clock" style={{ color: 'var(--brand-orange-text)', width: '20px' }}></i> <span>{section.timings}</span></div>}
                    </div>
                  </div>
                </div>
              </section>
            )

          case 'images':
            return (
              <section key={idx} className="page-section">
                <div className="container">
                  <div className="images-grid" style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {section.items.map((img, i) => (
                      <img key={i} src={img.src} alt={img.alt || 'Image'} style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    ))}
                  </div>
                </div>
              </section>
            )

          case 'videoEmbed':
            return (
              <section key={idx} className="page-section">
                <div className="container" style={{ maxWidth: '800px' }}>
                  {section.title && (
                    <div className="section-header">
                      {section.eyebrow && <div className="section-eyebrow">{section.eyebrow}</div>}
                      <h2>{section.title}</h2>
                      <div className="section-divider"></div>
                    </div>
                  )}
                  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '16px', border: '1px solid var(--light-grey)', boxShadow: 'var(--shadow-md)' }}>
                    <iframe
                      src={section.src}
                      title={section.title || 'Video Embed'}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                    />
                  </div>
                </div>
              </section>
            )

          case 'pdfLinks':
            return (
              <section key={idx} className="page-section">
                <div className="container">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
                    {section.items.map((item, i) => (
                      <div
                        key={i}
                        className="info-card"
                        style={{
                          minWidth: '220px',
                          textAlign: 'center',
                          flex: '1 1 220px',
                          maxWidth: '320px',
                          borderRadius: '16px',
                          padding: '1.75rem 1.5rem',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          boxShadow: 'var(--shadow-sm)'
                        }}
                      >
                        <div className="info-card-icon" style={{ margin: '0 auto 1rem' }}>
                          <i className="fa-solid fa-file-pdf"></i>
                        </div>
                        <h3 style={{ fontSize: '1rem', marginBottom: '1.25rem', height: '2.4em', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                          {item.label}
                        </h3>
                        
                        <div style={{ display: 'flex', width: '100%', gap: '8px', marginTop: 'auto' }}>
                          <button
                            onClick={() => setSelectedPdf({ url: item.link, title: item.label })}
                            style={{
                              flex: 1,
                              background: 'var(--navy)',
                              color: '#ffffff',
                              border: 'none',
                              padding: '8px 12px',
                              borderRadius: '30px',
                              fontSize: '0.8rem',
                              fontWeight: 750,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '4px',
                              transition: 'all 0.2s'
                            }}
                          >
                            <i className="fa-solid fa-eye"></i> View
                          </button>
                          
                          <a
                            href={getAbsoluteUrl(item.link)}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              flex: 1,
                              background: 'rgba(165, 28, 48, 0.1)',
                              color: 'var(--brand-orange-text)',
                              border: 'none',
                              padding: '8px 12px',
                              borderRadius: '30px',
                              fontSize: '0.8rem',
                              fontWeight: 750,
                              cursor: 'pointer',
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '4px',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.background = 'var(--crimson)';
                              e.currentTarget.style.color = '#ffffff';
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.background = 'rgba(165, 28, 48, 0.1)';
                              e.currentTarget.style.color = 'var(--crimson)';
                            }}
                          >
                            <i className="fa-solid fa-download"></i> Download
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )

          case 'downloadList':
            return (
              <section key={idx} className="page-section">
                <div className="container" style={{ maxWidth: '800px' }}>
                  {section.title && (
                    <div className="section-header">
                      {section.eyebrow && <div className="section-eyebrow">{section.eyebrow}</div>}
                      <h2>{section.title}</h2>
                      <div className="section-divider"></div>
                    </div>
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {section.items.map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'space-between', padding: '1rem 1.5rem', background: 'var(--white)', border: '1px solid var(--light-grey)', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
                          <i className="fa-solid fa-file-pdf" style={{ color: 'var(--brand-orange-text)', fontSize: '1.25rem', flexShrink: 0 }}></i>
                          <span style={{ fontWeight: 'bold', color: 'var(--navy)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                          <button
                            onClick={() => setSelectedPdf({ url: item.link, title: item.label })}
                            style={{ background: 'transparent', border: 'none', color: 'var(--brand-orange-text)', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <i className="fa-solid fa-eye"></i> View
                          </button>
                          <span style={{ color: 'var(--light-grey)' }}>|</span>
                          <a
                            href={getAbsoluteUrl(item.link)}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none', color: 'var(--navy)', fontWeight: 'bold', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <i className="fa-solid fa-download"></i> Download
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )

          default:
            return null
        }
      })}

      {/* ── PORTAL MODAL PDF OVERLAY ──────────────────────────── */}
      {selectedPdf && createPortal(
        <div className="pdf-modal-backdrop" onClick={() => setSelectedPdf(null)}>
          <div className="pdf-modal-card" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="pdf-modal-header">
              <span className="pdf-modal-title">
                {selectedPdf.title}
              </span>
              
              <div className="pdf-modal-actions">
                <a
                  href={getAbsoluteUrl(selectedPdf.url)}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pdf-download-btn"
                >
                  <i className="fa-solid fa-download"></i>
                  <span className="pdf-download-btn-text">Download PDF</span>
                </a>

                <button
                  onClick={() => setSelectedPdf(null)}
                  className="pdf-close-btn"
                >
                  &times;
                </button>
              </div>
            </div>

            {/* Modal Body Wrapping Custom PDFJS Viewer */}
            <div style={{ flex: '1', background: '#f3f4f6', position: 'relative' }}>
              <SafePdfViewer
                src={getViewerUrl(selectedPdf.url)}
                title={selectedPdf.title}
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
            </div>
            
          </div>
        </div>,
        document.body
      )}

      {/* ── PORTAL MODAL LIGHTBOX OVERLAY ──────────────────────── */}
      {(() => {
        const selectedDetails = activeProgramModal ? programDetails[activeProgramModal] : null;
        if (!selectedDetails) return null;
        const handleClose = () => setActiveProgramModal(null);
        return createPortal(
          <div className="premium-modal-overlay" onClick={handleClose}>
            <div className="premium-modal-card" onClick={(e) => e.stopPropagation()}>
              <button 
                className="modal-close-btn"
                onClick={handleClose}
                style={{
                  background: 'rgba(11, 31, 58, 0.05)',
                  border: '1px solid rgba(11, 31, 58, 0.08)',
                  borderRadius: '50%',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'rgba(11, 31, 58, 0.65)',
                  fontSize: '0.95rem',
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  zIndex: 10
                }}
              >
                <i className="fa-solid fa-xmark" />
              </button>
              <div className="premium-modal-sidebar">
                <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(11, 31, 58, 0.02)', border: '2px solid rgba(11, 31, 58, 0.08)', boxShadow: '0 8px 24px rgba(11, 31, 58, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.8rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '-10px', left: '-10px', right: '-10px', bottom: '-10px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(165, 28, 48, 0.08) 0%, transparent 75%)', zIndex: 0 }} />
                  <i className={`fa-solid ${selectedDetails.icon}`} style={{ fontSize: '3.2rem', color: 'var(--navy)', textShadow: '0 0 20px rgba(11, 31, 58, 0.15)', zIndex: 1 }} />
                </div>
                <span style={{ background: 'rgba(197, 160, 89, 0.12)', border: '1px solid rgba(197, 160, 89, 0.3)', color: 'var(--gold, #C5A059)', fontSize: '0.72rem', fontWeight: 800, padding: '0.35rem 0.9rem', borderRadius: '50px', display: 'inline-block', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {selectedDetails.badge}
                </span>
                <h2 style={{ fontSize: '1.65rem', fontWeight: 800, margin: '0 0 0.8rem', color: 'var(--navy)', lineHeight: 1.25 }}>
                  {selectedDetails.title}
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1.5, margin: '0 0 2.5rem 0' }}>
                  KMIT Co-Curricular Excellence Program
                </p>
                <div style={{ marginTop: 'auto', width: '100%' }}>
                  <button 
                    className="modal-action-btn modal-close-navy-btn"
                    onClick={handleClose}
                    style={{ background: 'var(--navy)', border: 'none', borderRadius: '50px', padding: '0.75rem 2rem', color: '#fff', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(11, 31, 58, 0.2)', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  >
                    <i className="fa-solid fa-circle-check" /> Close Window
                  </button>
                </div>
              </div>
              <div className="premium-modal-content">
                <div style={{ position: 'relative' }}>
                  <p style={{ fontSize: '1.02rem', lineHeight: 1.75, color: 'var(--text-dark)', margin: 0, borderLeft: '4px solid var(--crimson)', paddingLeft: '1.2rem', textAlign: 'justify' }}>
                    {selectedDetails.desc}
                  </p>
                </div>
                {selectedDetails.sections && selectedDetails.sections.map((sect, sIdx) => (
                  <div key={sIdx} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--navy)', borderLeft: '3px solid var(--gold)', paddingLeft: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.03em' }}>{sect.title}</h4>
                    {sect.content && <p style={{ fontSize: '0.96rem', lineHeight: 1.65, color: 'var(--text-muted)', margin: 0, textAlign: 'justify' }}>{sect.content}</p>}
                    {sect.list && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1rem', marginTop: '0.3rem' }}>
                        {sect.list.map((li, lIdx) => (
                          <div key={lIdx} className="modal-item-card" style={{ background: '#ffffff', border: '1px solid rgba(11, 31, 58, 0.08)', borderRadius: '14px', padding: '1.2rem', display: 'flex', gap: '0.8rem', alignItems: 'flex-start', boxShadow: '0 4px 12px rgba(11, 31, 58, 0.02)' }}>
                            <i className="fa-solid fa-circle-chevron-right" style={{ color: 'var(--brand-orange-text)', marginTop: '0.2rem', fontSize: '0.95rem', filter: 'drop-shadow(0 0 3px rgba(165, 28, 48, 0.2))' }} />
                            <span style={{ fontSize: '0.92rem', lineHeight: 1.5, color: 'var(--text-dark)', opacity: 0.9 }}>{li}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>,
          document.body
        );
      })()}

      {/* ── PORTAL MODAL LIGHTBOX OVERLAY ──────────────────────── */}
      {lightboxImage && createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999999,
          cursor: 'pointer'
        }} onClick={() => setLightboxImage(null)}>
          <div style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }} onClick={(e) => e.stopPropagation()}>
            <img src={lightboxImage.src} alt={lightboxImage.alt || 'Enlarged view'} style={{ maxWidth: '100%', maxHeight: '85vh', borderRadius: '8px', border: '3px solid #ffffff', boxShadow: 'var(--shadow-lg)' }} />
            {lightboxImage.alt && (
              <div style={{ color: '#ffffff', textAlign: 'center', marginTop: '1rem', fontWeight: 'bold', fontSize: '1.1rem' }}>
                {lightboxImage.alt}
              </div>
            )}
            <button
              onClick={() => setLightboxImage(null)}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '-10px',
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                fontSize: '2rem',
                cursor: 'pointer'
              }}
            >
              &times;
            </button>
          </div>
        </div>,
        document.body
      )}
    </PageShell>
  )
}
