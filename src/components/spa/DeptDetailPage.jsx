import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import PageShell from './PageShell'
import SafePdfViewer from '../SafePdfViewer'
import { useParams, useNavigate } from 'react-router-dom'
import { useData } from '../../context/websiteData'
import allDepartmentsLegacyData from '../../data/allDepartmentsLegacyData.json'
import cseLegacyData from '../../data/cseLegacyData.json'

const getLocalDeptFallback = (key) => {
  const deptSource = allDepartmentsLegacyData[key] || {};
  let deptData = { ...deptSource };
  if (key === 'cse') {
    const richFaculty = deptSource.faculty;
    const richLabs = deptSource.labs;
    const richSyllabus = deptSource.syllabus;
    
    deptData = { ...deptData, ...cseLegacyData };
    
    if (richFaculty) deptData.faculty = richFaculty;
    if (richLabs) deptData.labs = richLabs;
    if (richSyllabus) deptData.syllabus = richSyllabus;
  }
  return deptData;
}
export default function DeptDetailPage() {
  const { deptKey, tabId } = useParams()
  const navigate = useNavigate()
  const { data } = useData()

  const deptNames = {
    cse: 'CSE',
    it: 'IT',
    csm: 'AI&ML',
    csd: 'Data Science',
    hs: 'H&S'
  }
  const DEPT_ACCENTS = {
    cse: '#185FA5',
    csm: '#534AB7',
    csd: '#0F6E56',
    it: '#3B6D11',
    hs: '#854F0B',
  }
  const deptAccent = DEPT_ACCENTS[deptKey] || 'var(--navy)'
  const deptDisplayName = deptNames[deptKey] || deptKey.toUpperCase()

  const deptDetails = data.deptDetails || {}
  const dept = deptDetails[deptKey] || deptDetails.cse || {
    code: deptDisplayName,
    name: deptDisplayName,
    intake: 0,
    established: 2007,
    nba: false,
    desc: '',
    highlights: [],
    specialisations: [],
    labs: []
  }

  const [deptRecord, setDeptRecord] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState(tabId || 'about')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetch(`/api/departments/${deptKey}`)
      .then(res => {
        if (!res.ok) throw new Error('Department not found')
        return res.json()
      })
      .then(data => {
        if (!cancelled) {
          setDeptRecord(data)
          setLoading(false)
        }
      })
      .catch(err => {
        if (!cancelled) {
          const fallback = getLocalDeptFallback(deptKey)
          if (fallback && Object.keys(fallback).length > 0) {
            setDeptRecord(fallback)
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
  }, [deptKey])

  const legacyData = deptRecord ? { [deptKey]: deptRecord } : null

  useEffect(() => {
    if (deptRecord && deptRecord.seo) {
      const defaultTitle = `${deptDisplayName} | KMIT`
      document.title = deptRecord.seo.title || defaultTitle

      if (deptRecord.seo.description) {
        let metaDesc = document.querySelector('meta[name="description"]')
        if (!metaDesc) {
          metaDesc = document.createElement('meta')
          metaDesc.setAttribute('name', 'description')
          document.head.appendChild(metaDesc)
        }
        metaDesc.setAttribute('content', deptRecord.seo.description)
      }

      if (deptRecord.seo.keywords) {
        let metaKey = document.querySelector('meta[name="keywords"]')
        if (!metaKey) {
          metaKey = document.createElement('meta')
          metaKey.setAttribute('name', 'keywords')
          document.head.appendChild(metaKey)
        }
        metaKey.setAttribute('content', deptRecord.seo.keywords)
      }
    }
  }, [deptRecord, deptDisplayName])

  const [selectedPdf, setSelectedPdf] = useState(null)

  // Prevent background page scrolling when PDF viewer modal is active
  useEffect(() => {
    if (selectedPdf) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedPdf])

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
    const absolute = getAbsoluteUrl(url)
    if (absolute.toLowerCase().endsWith('.pdf')) {
      return `https://kmit.in/pdfjs/web/viewer_with_download.html?file=${encodeURIComponent(absolute)}`
    }
    return absolute
  }

  const getPdfTitle = (url) => {
    if (!url) return 'Document'
    if (url.toLowerCase().includes('nba')) return 'NBA Accreditation Certificate'
    try {
      const decoded = decodeURIComponent(url)
      const filename = decoded.split('/').pop().replace(/\.pdf$/i, '')
      return filename.replace(/[-_]/g, ' ')
    } catch (e) {
      return 'PDF Document'
    }
  }

  const [openDropdowns, setOpenDropdowns] = useState({
    achievements: ['student-achievements', 'faculty-achievements'].includes(tabId),
    academics: ['eresources', 'library'].includes(tabId)
  })

  useEffect(() => {
    if (tabId === 'achievements') {
      navigate(`/academics/${deptKey}/student-achievements`, { replace: true })
      setOpenDropdowns(prev => ({ ...prev, achievements: true }))
    } else if (tabId === 'academics') {
      navigate(`/academics/${deptKey}/eresources`, { replace: true })
      setOpenDropdowns(prev => ({ ...prev, academics: true }))
    } else if (tabId) {
      setActiveTab(tabId)
    } else {
      setActiveTab('about')
    }
  }, [tabId, deptKey, navigate])

  const toggleDropdown = (key) => {
    setOpenDropdowns(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleNavClick = (newTabId) => {
    setActiveTab(newTabId)
    setSelectedPdf(null) // Reset PDF viewer when changing tabs
    navigate(`/academics/${deptKey}/${newTabId}`, { replace: true })
  }



  // Map active tabs to JSON keys
  const getLegacyDataKey = (tab) => {
    return tab.replace('-', '_');
  }

  const [expandedSections, setExpandedSections] = useState({})
  const [activeInternalTab, setActiveInternalTab] = useState(0)

  const toggleSection = (sectionIndex) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionIndex]: !prev[sectionIndex]
    }))
  }

  // WIP Check
  const isWIP = (tab) => {
    if (!legacyData) return false
    const key = getLegacyDataKey(tab);
    const content = legacyData[deptKey]?.[key];
    if (!content) return true;
    if (content.type === 'html' && content.data.toLowerCase().includes('work in progress')) return true;
    return false;
  }

  const WIPPlaceholder = ({ section }) => (
    <div className="dept-empty-state" style={{ borderTopColor: deptAccent }}>
      <div className="dept-empty-icon" style={{ background: `color-mix(in srgb, ${deptAccent} 15%, white)`, color: deptAccent }}>
        <i className="fa-solid fa-folder-open" />
      </div>
      <h2 style={{ color: 'var(--navy)', fontFamily: 'var(--font-serif)' }}>{section} — content updating</h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: '480px', margin: '0.75rem auto 1.5rem' }}>
        We are migrating official {deptDisplayName} {section.toLowerCase()} content. Contact the department for immediate assistance.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button type="button" className="btn btn-primary" onClick={() => navigate(`/academics/${deptKey}/contact`)}>
          Contact {deptDisplayName}
        </button>
        <a href="tel:04027661915" className="btn btn-outline">Call KMIT</a>
      </div>
      <p style={{ marginTop: '1.25rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        <i className="fa-solid fa-clock" /> Expected update: next content sprint
      </p>
    </div>
  )

  const SyllabusAccordion = ({ sections }) => (
    <div className="syllabus-container">
      <div className="section-header" style={{ marginBottom: '2rem' }}>
        <div className="section-eyebrow"><i className="fa-solid fa-book-open"></i> Curriculum</div>
        <h2>Course <em>Syllabus</em></h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Download official syllabus documents for various academic regulations.</p>
      </div>
      
      <div className="accordion-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {sections.map((section, i) => (
          <div key={i} className={`syllabus-item ${expandedSections[i] ? 'expanded' : ''}`} style={{ border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', background: '#fff', transition: 'all 0.3s ease', boxShadow: expandedSections[i] ? '0 10px 25px rgba(0,0,0,0.05)' : '0 2px 8px rgba(0,0,0,0.02)' }}>
            <button 
              onClick={() => toggleSection(i)}
              style={{ width: '100%', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: expandedSections[i] ? 'var(--navy)' : '#fff', color: expandedSections[i] ? '#fff' : 'var(--navy)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', textAlign: 'left' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: expandedSections[i] ? 'rgba(255,255,255,0.1)' : 'rgba(11,31,58,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fa-solid fa-scroll" style={{ fontSize: '1.1rem' }}></i>
                </div>
                <span style={{ fontWeight: '700', fontSize: '1.1rem', letterSpacing: '0.2px' }}>{section.title}</span>
              </div>
              <i className={`fa-solid fa-circle-chevron-${expandedSections[i] ? 'up' : 'down'}`} style={{ fontSize: '1.2rem', opacity: expandedSections[i] ? 1 : 0.4 }}></i>
            </button>
            
            {expandedSections[i] && (
              <div style={{ padding: '2rem', background: '#fff', borderTop: '1px solid #f1f5f9' }}>
                <div className="syllabus-links-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.2rem' }}>
                  {section.links.map((link, j) => (
                    <div 
                      key={j} 
                      className="syllabus-link-card"
                      onClick={() => {
                        if (link.link.toLowerCase().endsWith('.pdf')) {
                          setSelectedPdf(link.link)
                        } else {
                          window.open(link.link, '_blank')
                        }
                      }}
                      style={{ padding: '1.2rem', border: '1px solid #f1f5f9', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', transition: 'all 0.2s ease', background: '#fcfcfd' }}
                      onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--vibrant-accent)'; e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)' }}
                      onMouseOut={(e) => { e.currentTarget.style.borderColor = '#f1f5f9'; e.currentTarget.style.background = '#fcfcfd'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
                    >
                      <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <i className="fa-solid fa-file-pdf" style={{ color: '#dc2626', fontSize: '1.2rem' }}></i>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--navy)' }}>{link.text}</span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>Download PDF Document</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  const GenericTabbedTables = ({ tables }) => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = tables.map((table, i) => {
      const baseYear = 2024;
      let label = `${baseYear - i}-${(baseYear - i + 1).toString().slice(-2)}`;
      try {
        const firstRowText = table.rows[0].map(c => c.text).join(' ');
        const yearMatch = firstRowText.match(/20\d{2}/);
        if (yearMatch) {
          const year = parseInt(yearMatch[0]);
          label = `${year}-${(year + 1).toString().slice(-2)}`;
        }
      } catch(e) {}
      
      return { label, content: table };
    });

    const currentTab = tabs[activeTab];

    return (
      <div className="tabbed-tables-wrapper">
        <div className="events-tabs-nav" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', borderBottom: '1px solid #e2e8f0', marginBottom: '2rem' }}>
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === i ? 'var(--navy)' : '#f8fafc',
                color: activeTab === i ? '#fff' : '#64748b',
                fontSize: '0.9rem',
                fontWeight: '700',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {currentTab && (
          <div className="table-responsive" style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #e2e8f0', maxWidth: '100vw', display: 'block' }}>
            <table className="table" style={{ minWidth: '100%', width: 'max-content', borderCollapse: 'collapse', margin: 0 }}>
              <thead>
                <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                  {currentTab.content.headers.map((h, j) => <th key={j} style={{ padding: '1.2rem', textAlign: 'left', fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {currentTab.content.rows.map((row, j) => (
                  <tr key={j} style={{ borderBottom: '1px solid #e2e8f0', transition: 'all 0.2s', backgroundColor: j % 2 === 0 ? '#fafafa' : '#ffffff' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = j % 2 === 0 ? '#fafafa' : '#ffffff'}>
                    {row.map((cell, k) => {
                      const isSNoCol = k === 0 && currentTab.content.headers[k] && (currentTab.content.headers[k].toLowerCase() === 'sno' || currentTab.content.headers[k].toLowerCase() === 's.no' || currentTab.content.headers[k].toLowerCase() === 's.no.');
                      const displayValue = isSNoCol ? (j + 1).toString() : cell.text;
                      return (
                        <td key={k} data-label={currentTab.content.headers[k] || ''} style={{ padding: '1.2rem', verticalAlign: 'middle', fontSize: '0.95rem', color: '#334155', whiteSpace: 'nowrap' }}>
                          {cell.link ? (
                            <a 
                              href={cell.link} 
                              target="_blank" 
                              rel="noreferrer" 
                              onClick={(e) => {
                                if (cell.link.toLowerCase().endsWith('.pdf')) {
                                  e.preventDefault();
                                  setSelectedPdf(cell.link);
                                }
                              }}
                              style={{ color: 'var(--vibrant-accent)', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 107, 0, 0.08)', padding: '6px 14px', borderRadius: '6px', transition: 'all 0.2s' }}
                              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 107, 0, 0.15)'}
                              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 107, 0, 0.08)'}
                            >
                              {cell.link.toLowerCase().endsWith('.pdf') ? <i className="fa-solid fa-file-pdf"></i> : <i className="fa-solid fa-arrow-up-right-from-square"></i>}
                              {displayValue || 'View'}
                            </a>
                          ) : displayValue}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  const sidebarItems = [
    { id: 'about', label: `About ${deptDisplayName}`, icon: 'fa-circle-info' },
    { id: 'nba', label: 'NBA Accreditations', icon: 'fa-award', condition: legacyData?.[deptKey]?.nba },
    { id: 'faculty', label: 'Faculty Directory', icon: 'fa-chalkboard-user' },
    { 
      id: 'achievements', 
      label: 'Achievements', 
      icon: 'fa-trophy', 
      isDropdown: true,
      subItems: [
        { id: 'student-achievements', label: 'Student Achievements' },
        { id: 'faculty-achievements', label: 'Faculty Achievements' }
      ]
    },
    { 
      id: 'academics', 
      label: 'Academics & Resources', 
      icon: 'fa-book-open', 
      isDropdown: true,
      subItems: [
        { id: 'eresources', label: 'E-Resources' },
        { id: 'library', label: 'Library' }
      ]
    },
    { id: 'syllabus', label: 'Syllabus & Regulations', icon: 'fa-scroll' },
    { id: 'events', label: 'Department Events', icon: 'fa-calendar-check' },
    { id: 'labs', label: 'Laboratories', icon: 'fa-flask-vial' },
    { id: 'publications', label: 'Research & Publications', icon: 'fa-newspaper' },
    { id: 'contact', label: 'Contact Us', icon: 'fa-envelope' },
  ]

  const flattenedNavItems = sidebarItems.reduce((acc, item) => {
    if (item.condition === false) return acc;
    if (item.isDropdown) {
      item.subItems.forEach(sub => acc.push({ ...sub, icon: item.icon }));
    } else {
      acc.push(item);
    }
    return acc;
  }, []);

  const EventsSection = ({ data }) => {
    const [activeEventTab, setActiveEventTab] = useState(0);

    // Normalize data into tabs
    let tabs = [];
    if (data.type === 'tabs') {
      tabs = data.data;
    } else if (data.type === 'table') {
      // If it's an array of tables, we need to generate labels if missing
      tabs = data.data.map((table, i) => {
        // Try to infer year from the first row's date
        let yearLabel = `Academic Year ${i + 1}`;
        try {
          const firstRowDate = table.rows[0][1].text;
          const yearMatch = firstRowDate.match(/\d{4}/);
          if (yearMatch) {
            const year = parseInt(yearMatch[0]);
            // Academic year usually starts in June/July
            const isLateYear = firstRowDate.includes('-') ? (parseInt(firstRowDate.split('-')[1]) > 5) : true;
            if (isLateYear) {
              yearLabel = `${year}-${(year + 1).toString().slice(-2)}`;
            } else {
              yearLabel = `${year - 1}-${year.toString().slice(-2)}`;
            }
          }
        } catch (e) {
          // Fallback
        }
        return {
          label: yearLabel,
          type: 'table',
          content: table
        };
      });
    }

    const currentTab = tabs[activeEventTab];

    return (
      <div className="events-wrapper">
        <div className="section-header" style={{ marginBottom: '2rem' }}>
          <div className="section-eyebrow"><i className="fa-solid fa-calendar-days"></i> Department Events</div>
          <h2 style={{ fontSize: '2.4rem' }}>Events <em>{deptDisplayName}</em></h2>
          <div className="section-divider"></div>
        </div>

        {/* Academic Year Tabs */}
        <div className="events-tabs-nav" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', borderBottom: '1px solid #e2e8f0', marginBottom: '2rem' }}>
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveEventTab(i)}
              style={{
                padding: '12px 24px',
                borderRadius: '4px',
                border: '1px solid',
                borderColor: activeEventTab === i ? 'var(--navy)' : 'var(--light-grey)',
                background: activeEventTab === i ? 'var(--navy)' : '#fff',
                color: activeEventTab === i ? '#fff' : 'var(--text-muted)',
                fontSize: '0.95rem',
                fontWeight: '700',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                boxShadow: activeEventTab === i ? 'var(--shadow-sm)' : 'none'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Event Table */}
        {currentTab && currentTab.type === 'table' && (
          <div className="table-responsive" style={{ borderRadius: '8px', overflowX: 'auto', border: '1px solid var(--light-grey)', boxShadow: 'var(--shadow-md)', maxWidth: '100vw', display: 'block' }}>
            <table className="events-table data-table" style={{ minWidth: '100%', width: 'max-content', borderCollapse: 'collapse', background: '#fff' }}>
              <thead>
                <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                  {currentTab.content.headers.map((h, i) => (
                    <th key={i} style={{ padding: '1.2rem', textAlign: 'left', fontWeight: '800', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px', borderRight: '1px solid rgba(255,255,255,0.1)', whiteSpace: 'nowrap' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentTab.content.rows.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--light-grey)' }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: '1.2rem', fontSize: '0.92rem', color: 'var(--text-dark)', verticalAlign: 'top', borderRight: '1px solid var(--light-grey)', whiteSpace: 'nowrap' }}>
                        {/* Fix for S.No column if it contains concatenated text */}
                        {j === 0 ? (
                          <span style={{ fontWeight: '700', color: 'var(--navy)' }}>{i + 1}</span>
                        ) : cell.text}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  const getFacultyProfiles = () => {
    if (!deptRecord || !deptRecord.faculty) return [];
    if (Array.isArray(deptRecord.faculty)) return deptRecord.faculty;
    if (typeof deptRecord.faculty === 'object' && deptRecord.faculty.type === 'table') {
      const table = deptRecord.faculty.data?.[0];
      if (table && table.rows) {
        return table.rows.map((row, idx) => {
          const nameCell = row[1] || {};
          const designationCell = row[2] || {};
          const qualificationCell = row[3] || {};
          const areaCell = row[4] || {};
          return {
            name: nameCell.text || '',
            profileUrl: nameCell.link || '',
            designation: designationCell.text || '',
            qualification: qualificationCell.text || '',
            areaOfInterest: areaCell.text || '',
            photoUrl: ''
          };
        });
      }
    }
    return [];
  };

  const FacultyGrid = () => {
    const profiles = getFacultyProfiles();

    if (profiles.length === 0) {
      return (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          <i className="fa-solid fa-users-slash" style={{ fontSize: '2.5rem', marginBottom: '1rem', opacity: 0.5 }}></i>
          <p>No faculty members listed at this time.</p>
        </div>
      );
    }

    const hasArea = profiles.some(p => p.areaOfInterest);

    return (
      <div className="table-responsive" style={{ marginTop: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', overflowX: 'auto', boxShadow: 'var(--shadow-sm)', maxWidth: '100vw', display: 'block' }}>
        <table className="table" style={{ minWidth: '100%', width: 'max-content', borderCollapse: 'collapse', background: '#fff' }}>
          <thead>
            <tr style={{ background: 'var(--navy)', color: '#fff' }}>
              <th style={{ padding: '1.2rem', textAlign: 'center', width: '80px', fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>S.No</th>
              <th style={{ padding: '1.2rem', textAlign: 'left', fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Name of The Faculty</th>
              <th style={{ padding: '1.2rem', textAlign: 'left', fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Designation</th>
              <th style={{ padding: '1.2rem', textAlign: 'left', fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase' }}>Qualification</th>
              {hasArea && (
                <th style={{ padding: '1.2rem', textAlign: 'left', fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase' }}>Area of Interest</th>
              )}
            </tr>
          </thead>
          <tbody>
            {profiles.map((member, idx) => (
              <tr 
                key={idx} 
                style={{ 
                  borderBottom: '1px solid #e2e8f0', 
                  transition: 'all 0.2s', 
                  backgroundColor: idx % 2 === 0 ? '#fafafa' : '#ffffff' 
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = idx % 2 === 0 ? '#fafafa' : '#ffffff'}
              >
                <td data-label="S.No" style={{ padding: '1.2rem', textAlign: 'center', fontWeight: '700', color: 'var(--navy)', fontSize: '0.95rem' }}>
                  {idx + 1}
                </td>
                <td data-label="Name of The Faculty" style={{ padding: '1.2rem', fontSize: '0.95rem', fontWeight: '700', color: 'var(--navy)' }}>
                  {member.profileUrl ? (
                    <a 
                      href={member.profileUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      onClick={(e) => {
                        if (member.profileUrl.toLowerCase().endsWith('.pdf')) {
                          e.preventDefault();
                          setSelectedPdf(member.profileUrl);
                        }
                      }}
                      style={{ color: 'var(--vibrant-accent)', fontWeight: '750', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 107, 0, 0.08)', padding: '6px 14px', borderRadius: '6px', transition: 'all 0.2s' }}
                      onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 107, 0, 0.15)'}
                      onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 107, 0, 0.08)'}
                    >
                      {member.profileUrl.toLowerCase().endsWith('.pdf') ? <i className="fa-solid fa-file-pdf"></i> : <i className="fa-solid fa-arrow-up-right-from-square"></i>}
                      {member.name}
                    </a>
                  ) : member.name}
                </td>
                <td data-label="Designation" style={{ padding: '1.2rem', fontSize: '0.95rem', color: '#334155', fontWeight: '600' }}>
                  {member.designation}
                </td>
                <td data-label="Qualification" style={{ padding: '1.2rem', fontSize: '0.95rem', color: '#475569' }}>
                  <span style={{ background: '#f1f5f9', padding: '4px 10px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '600', border: '1px solid #cbd5e1', display: 'inline-block' }}>
                    {member.qualification}
                  </span>
                </td>
                {hasArea && (
                  <td data-label="Area of Interest" style={{ padding: '1.2rem', fontSize: '0.95rem', color: '#64748b', fontStyle: 'italic' }}>
                    {member.areaOfInterest || '—'}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const LabsGrid = () => {
    const labsList = Array.isArray(deptRecord?.labs) ? deptRecord.labs : [];

    if (labsList.length === 0) {
      return (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          <i className="fa-solid fa-flask-vial" style={{ fontSize: '2.5rem', marginBottom: '1rem', opacity: 0.5 }}></i>
          <p>No laboratories listed at this time.</p>
        </div>
      );
    }

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem', marginTop: '1.5rem' }}>
        {labsList.map((labData, idx) => {
          const lab = typeof labData === 'string' 
            ? { title: labData, description: 'State-of-the-art laboratory equipped with latest technology for practical learning.', photoUrl: null } 
            : labData;
          
          return (
          <div 
            key={idx} 
            style={{ 
              background: '#fff', 
              borderRadius: '16px', 
              border: '1px solid #e2e8f0', 
              overflow: 'hidden', 
              boxShadow: 'var(--shadow-sm)', 
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)';
              e.currentTarget.style.borderColor = 'var(--vibrant-accent)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          >
            <div style={{ height: '180px', background: '#e2e8f0', overflow: 'hidden', position: 'relative' }}>
              {lab.photoUrl ? (
                <img src={lab.photoUrl} alt={lab.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255, 107, 0, 0.05)', color: 'var(--vibrant-accent)' }}>
                  <i className="fa-solid fa-network-wired" style={{ fontSize: '3rem' }} />
                </div>
              )}
            </div>
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <h3 style={{ margin: '0 0 10px 0', color: 'var(--navy)', fontSize: '1.2rem', fontWeight: '800', fontFamily: 'var(--font-serif)' }}>{lab.title}</h3>
              <p style={{ margin: 0, color: '#475569', fontSize: '0.92rem', lineHeight: '1.6', flexGrow: 1 }}>{lab.description}</p>
            </div>
          </div>
        )})}
      </div>
    );
  };

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

  if (error || !deptRecord) {
    return (
      <PageShell
        eyebrow="Department Error"
        title="Department Not Found"
        description="There was an error loading the department details. Please try again later."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Academics', to: '/academics' }]}
      >
        <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
          <i className="fa-solid fa-circle-exclamation" style={{ fontSize: '3rem', color: 'var(--brand-orange-text)', marginBottom: '1.5rem' }}></i>
          <h2>Department <em>Details</em> Not Found</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', marginBottom: '2rem' }}>The requested department details could not be retrieved from the server.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell
      eyebrow={`Department of ${dept.code}`}
      title={dept.name.split('—')[0].trim()}
      titleEm={dept.name.includes('—') ? dept.name.split('—')[1].trim() : null}
      description={dept.desc}
      breadcrumbs={[
        { label: 'Academics', to: '/academics' },
        { label: dept.code }
      ]}
    >
      <div className="dept-horizontal-nav-wrapper">
        <div className="container">
          <nav className="dept-horizontal-nav">
            {flattenedNavItems.map(item => (
              <button 
                key={item.id}
                className={`dept-hnav-link ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                {item.icon && <i className={`fa-solid ${item.icon}`}></i>}
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <section className="page-section" style={{ padding: '3rem 0' }}>
        <div className="container">
          <div className="dept-layout">
            {/* Content Area */}
            <main className="dept-content">
              {activeTab === 'about' && (
                <div className="dept-about">
                  <div className="stats-strip" style={{ marginBottom: '3rem' }}>
                    <div className="stat-block">
                      <span className="stat-value">{dept.intake || '—'}<span className="accent">{dept.intake ? '+' : ''}</span></span>
                      <span className="stat-label">Annual Intake</span>
                    </div>
                    <div className="stat-block">
                      <span className="stat-value">{dept.established}</span>
                      <span className="stat-label">Year Established</span>
                    </div>
                    <div className="stat-block">
                      <span className="stat-value">{dept.nba ? <span className="accent">NBA</span> : '—'}</span>
                      <span className="stat-label">Accreditation</span>
                    </div>
                    <div className="stat-block">
                      <span className="stat-value"><span className="accent">JNTUH</span></span>
                      <span className="stat-label">University</span>
                    </div>
                  </div>

                  {dept.aboutContent ? (
                    <div className="legacy-about-content" style={{ marginTop: '2rem' }}>
                      <div className="section-header">
                        <h2>About <em>{dept.code}</em></h2>
                        <div className="section-divider"></div>
                      </div>
                      
                      {dept.aboutContent.map((p, i) => (
                        <p key={i} style={{ marginBottom: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>{p}</p>
                      ))}

                      {dept.coursesOffered && (
                        <>
                          <div className="section-header" style={{ marginTop: '3rem' }}>
                            <h3 style={{ fontSize: '1.8rem' }}>Courses <em>Offered</em></h3>
                            <div className="section-divider"></div>
                          </div>
                          <div className="table-responsive" style={{ borderRadius: '8px', overflowX: 'auto', border: '1px solid var(--light-grey)', boxShadow: 'var(--shadow-md)', marginBottom: '2rem' }}>
                            <table className="data-table" style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse', background: '#fff' }}>
                              <thead>
                                <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                                  <th style={{ padding: '1.2rem', textAlign: 'left', fontWeight: '800', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>S.No.</th>
                                  <th style={{ padding: '1.2rem', textAlign: 'left', fontWeight: '800', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Name of the Degree</th>
                                  <th style={{ padding: '1.2rem', textAlign: 'left', fontWeight: '800', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Name of the Course</th>
                                  <th style={{ padding: '1.2rem', textAlign: 'left', fontWeight: '800', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Intake</th>
                                  <th style={{ padding: '1.2rem', textAlign: 'left', fontWeight: '800', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Management Seats/NRI Seats</th>
                                  <th style={{ padding: '1.2rem', textAlign: 'left', fontWeight: '800', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Convenor seats</th>
                                </tr>
                              </thead>
                              <tbody>
                                {dept.coursesOffered.map((c, i) => (
                                  <tr key={i} style={{ borderBottom: '1px solid var(--light-grey)' }}>
                                    <td style={{ padding: '1.2rem', fontSize: '0.92rem', color: 'var(--text-dark)' }}>{c.sno}</td>
                                    <td style={{ padding: '1.2rem', fontSize: '0.92rem', color: 'var(--text-dark)' }}>{c.degree}</td>
                                    <td style={{ padding: '1.2rem', fontSize: '0.92rem', color: 'var(--text-dark)' }}>{c.course}</td>
                                    <td style={{ padding: '1.2rem', fontSize: '0.92rem', color: 'var(--text-dark)' }}>{c.intake}</td>
                                    <td style={{ padding: '1.2rem', fontSize: '0.92rem', color: 'var(--text-dark)' }}>{c.management}</td>
                                    <td style={{ padding: '1.2rem', fontSize: '0.92rem', color: 'var(--text-dark)' }}>{c.convenor}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </>
                      )}

                      {dept.vision && (
                        <>
                          <div className="section-header" style={{ marginTop: '3rem' }}>
                            <h3 style={{ fontSize: '1.8rem' }}>Vision of the <em>Department</em></h3>
                            <div className="section-divider"></div>
                          </div>
                          <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', padding: '1.5rem', background: 'var(--off-white)', borderRadius: '12px', borderLeft: '4px solid var(--brand-orange-text)' }}>
                            {dept.vision}
                          </p>
                        </>
                      )}

                      {dept.mission && (
                        <>
                          <div className="section-header" style={{ marginTop: '3rem' }}>
                            <h3 style={{ fontSize: '1.8rem' }}>Mission of the <em>Department</em></h3>
                            <div className="section-divider"></div>
                          </div>
                          <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                            {dept.mission.map((m, i) => (
                              <li key={i} style={{ marginBottom: '1rem' }}>{m}</li>
                            ))}
                          </ul>
                        </>
                      )}

                      {dept.peos && (
                        <>
                          <div className="section-header" style={{ marginTop: '3rem' }}>
                            <h3 style={{ fontSize: '1.8rem' }}>Program Educational <em>Objectives (PEOs)</em></h3>
                            <div className="section-divider"></div>
                          </div>
                          <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                            {dept.peos.map((peo, i) => (
                              <li key={i} style={{ marginBottom: '1rem' }}>{peo}</li>
                            ))}
                          </ul>
                        </>
                      )}

                      {dept.pos && (
                        <>
                          <div className="section-header" style={{ marginTop: '3rem' }}>
                            <h3 style={{ fontSize: '1.8rem' }}>Programme <em>Outcomes (POs)</em></h3>
                            <div className="section-divider"></div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {dept.pos.map((po, i) => (
                              <div key={i} style={{ background: '#fff', border: '1px solid var(--light-grey)', borderRadius: '8px', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                                <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--navy)', fontSize: '1.1rem' }}>{po.title}</h4>
                                <p style={{ margin: '0', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>{po.desc}</p>
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      {dept.psos && (
                        <>
                          <div className="section-header" style={{ marginTop: '3rem' }}>
                            <h3 style={{ fontSize: '1.8rem' }}>Program Specific <em>Outcomes (PSOs)</em></h3>
                            <div className="section-divider"></div>
                          </div>
                          <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                            {dept.psos.map((pso, i) => (
                              <li key={i} style={{ marginBottom: '1rem' }}>{pso}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="adaptive-columns">
                      <div>
                        <div className="section-header">
                          <div className="section-eyebrow"><i className="fa-solid fa-star"></i> Highlights</div>
                          <h2>Why Choose <em>{dept.code}</em></h2>
                          <div className="section-divider"></div>
                        </div>
                        <div className="info-cards-grid" style={{gridTemplateColumns: '1fr'}}>
                          {dept.highlights.map((h, i) => (
                            <div key={i} className="info-card" style={{flexDirection:'row', padding:'1rem', gap:'1rem', alignItems:'center'}}>
                              <i className="fa-solid fa-check-circle" style={{color:'var(--vibrant-accent)'}}></i>
                              <p style={{margin:0, fontSize:'0.9rem'}}>{h}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="section-header">
                          <div className="section-eyebrow"><i className="fa-solid fa-book"></i> Focus Areas</div>
                          <h2>What You'll <em>Learn</em></h2>
                          <div className="section-divider"></div>
                        </div>
                        <div className="info-cards-grid" style={{gridTemplateColumns: '1fr 1fr'}}>
                          {dept.specialisations.map((s, i) => (
                            <div key={i} className="info-card" style={{padding:'1rem'}}>
                              <p style={{margin:0, fontSize:'0.85rem', fontWeight:600}}>{s}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}


              {activeTab !== 'about' && (
                <div className="legacy-content-container" style={{ width: '100%', borderRadius: '16px', background: '#fff', padding: '0', border: 'none', overflowX: 'visible' }}>
                  {!legacyData ? (
                    <div className="page-loader" style={{ minHeight: 240 }}><div className="page-loader-spinner" /></div>
                  ) : isWIP(activeTab) && ['labs', 'eresources'].includes(activeTab) ? (
                    <WIPPlaceholder section={activeTab.toUpperCase()} />
                  ) : activeTab === 'events' && legacyData[deptKey]?.events ? (
                    <EventsSection data={legacyData[deptKey].events} />
                  ) : activeTab === 'faculty' ? (
                    <div style={{ padding: '2rem', background: '#fff', borderRadius: '16px', border: '1px solid #eee', boxShadow: 'var(--shadow-md)' }}>
                      <h2 style={{ marginBottom: '2.5rem', color: 'var(--navy)', textTransform: 'capitalize', paddingBottom: '0.8rem', borderBottom: '3px solid var(--vibrant-accent)', display: 'inline-block', fontFamily: 'var(--font-serif)', fontSize: '2rem' }}>
                        Faculty Directory
                      </h2>
                      <FacultyGrid />
                    </div>
                  ) : activeTab === 'labs' && Array.isArray(deptRecord?.labs) ? (
                    <div style={{ padding: '2rem', background: '#fff', borderRadius: '16px', border: '1px solid #eee', boxShadow: 'var(--shadow-md)' }}>
                      <h2 style={{ marginBottom: '2.5rem', color: 'var(--navy)', textTransform: 'capitalize', paddingBottom: '0.8rem', borderBottom: '3px solid var(--vibrant-accent)', display: 'inline-block', fontFamily: 'var(--font-serif)', fontSize: '2rem' }}>
                        Laboratories & Facilities
                      </h2>
                      <LabsGrid />
                    </div>
                  ) : legacyData[deptKey]?.[getLegacyDataKey(activeTab)]?.type === 'accordion' && activeTab === 'syllabus' ? (
                    <SyllabusAccordion sections={legacyData[deptKey][getLegacyDataKey(activeTab)].data} />
                  ) : legacyData[deptKey]?.[getLegacyDataKey(activeTab)] ? (
                    <div style={{ padding: '2rem', background: '#fff', borderRadius: '16px', border: '1px solid #eee', boxShadow: 'var(--shadow-md)' }}>
                      <h2 style={{ marginBottom: '2.5rem', color: 'var(--navy)', textTransform: 'capitalize', paddingBottom: '0.8rem', borderBottom: '3px solid var(--vibrant-accent)', display: 'inline-block', fontFamily: 'var(--font-serif)', fontSize: '2rem' }}>
                        {activeTab.replace('-', ' ')}
                      </h2>

                      {legacyData[deptKey][getLegacyDataKey(activeTab)].type === 'table' ? (
                        <GenericTabbedTables tables={legacyData[deptKey][getLegacyDataKey(activeTab)].data} />
                      ) : legacyData[deptKey][getLegacyDataKey(activeTab)].type === 'links' ? (
                        <div className="links-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
                          {legacyData[deptKey][getLegacyDataKey(activeTab)].data.map((linkObj, i) => (
                            <div 
                              key={i} 
                              onClick={() => {
                                if (linkObj.link.toLowerCase().endsWith('.pdf')) {
                                  setSelectedPdf(linkObj.link)
                                } else {
                                  window.open(linkObj.link, '_blank')
                                }
                              }}
                              style={{ padding: '1.5rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: '1.2rem', color: 'var(--navy)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
                              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = 'var(--vibrant-accent)' }}
                              onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)'; e.currentTarget.style.borderColor = '#e2e8f0' }}
                            >
                              <div style={{ background: 'rgba(255, 107, 0, 0.1)', width: '52px', height: '52px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <i className={`fa-solid ${linkObj.link.toLowerCase().endsWith('.pdf') ? 'fa-file-pdf' : 'fa-link'}`} style={{ fontSize: '1.6rem', color: 'var(--vibrant-accent)' }}></i>
                              </div>
                              <span style={{ fontWeight: '700', fontSize: '1.1rem', lineHeight: '1.3' }}>{linkObj.text}</span>
                            </div>
                          ))}
                        </div>
                      ) : legacyData[deptKey][getLegacyDataKey(activeTab)].type === 'info' ? (
                        <div className="info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginTop: '1rem' }}>
                          {legacyData[deptKey][getLegacyDataKey(activeTab)].data.map((item, i) => (
                            <div 
                              key={i} 
                              style={{ padding: '2rem', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', borderLeft: '6px solid var(--vibrant-accent)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', transition: 'all 0.3s ease' }}
                              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateX(8px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.06)' }}
                              onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)' }}
                            >
                              <h3 style={{ margin: '0 0 12px 0', fontSize: '1.3rem', fontWeight: '800', color: 'var(--navy)', fontFamily: 'var(--font-serif)' }}>
                                {item.title}
                              </h3>
                              <p style={{ margin: 0, fontSize: '1.05rem', color: '#475569', lineHeight: '1.7' }}>
                                {item.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : legacyData[deptKey][getLegacyDataKey(activeTab)].type === 'accordion' ? (
                        <div className="accordion-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                          {legacyData[deptKey][getLegacyDataKey(activeTab)].data.map((section, i) => (
                            <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                              <button 
                                onClick={() => toggleSection(i)}
                                style={{ width: '100%', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: expandedSections[i] ? 'var(--navy)' : '#f8fafc', color: expandedSections[i] ? '#fff' : 'var(--navy)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', textAlign: 'left' }}
                              >
                                <span style={{ fontWeight: '700', fontSize: '1.05rem', letterSpacing: '0.5px' }}>{section.title}</span>
                                <i className={`fa-solid fa-chevron-${expandedSections[i] ? 'up' : 'down'}`} style={{ fontSize: '0.9rem', opacity: 0.7 }}></i>
                              </button>
                              {expandedSections[i] && (
                                <div style={{ padding: '1.5rem', background: '#fff' }}>
                                  <div className="links-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                                    {section.links.map((link, j) => (
                                      <div 
                                        key={j} 
                                        className="link-card"
                                        onClick={() => {
                                          if (link.link.toLowerCase().endsWith('.pdf')) {
                                            setSelectedPdf(link.link)
                                          } else {
                                            window.open(link.link, '_blank')
                                          }
                                        }}
                                        style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', transition: 'all 0.2s ease' }}
                                        onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--vibrant-accent)'; e.currentTarget.style.background = '#f8fafc' }}
                                        onMouseOut={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#fff' }}
                                      >
                                        <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                          <i className="fa-solid fa-file-pdf" style={{ color: '#dc2626' }}></i>
                                        </div>
                                        <span style={{ fontSize: '0.9rem', fontWeight: '500', color: '#1e293b' }}>{link.text}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : legacyData[deptKey][getLegacyDataKey(activeTab)].type === 'tabs' ? (
                        <div className="internal-tabs" style={{ marginTop: '1rem' }}>
                          <div className="tab-nav" style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '12px', borderBottom: '2px solid #f1f5f9', marginBottom: '2rem' }}>
                            {legacyData[deptKey][getLegacyDataKey(activeTab)].data.map((tab, i) => (
                              <button
                                key={i}
                                onClick={() => setActiveInternalTab(i)}
                                style={{ 
                                  padding: '10px 20px', 
                                  borderRadius: '8px', 
                                  border: 'none',
                                  background: activeInternalTab === i ? 'var(--navy)' : '#f8fafc',
                                  color: activeInternalTab === i ? '#fff' : '#64748b',
                                  fontSize: '0.9rem',
                                  fontWeight: '700',
                                  cursor: 'pointer',
                                  whiteSpace: 'nowrap',
                                  transition: 'all 0.3s ease',
                                  boxShadow: activeInternalTab === i ? '0 4px 12px rgba(11,31,58,0.15)' : 'none'
                                }}
                              >
                                {tab.label}
                              </button>
                            ))}
                          </div>
                          <div className="tab-pane">
                            {legacyData[deptKey][getLegacyDataKey(activeTab)].data[activeInternalTab]?.type === 'table' ? (
                              <div className="table-responsive" style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #e2e8f0', maxWidth: '100vw', display: 'block' }}>
                                <table className="table" style={{ minWidth: '100%', width: 'max-content', borderCollapse: 'collapse', margin: 0 }}>
                                  <thead>
                                    <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                                      {legacyData[deptKey][getLegacyDataKey(activeTab)].data[activeInternalTab].content.headers.map((h, i) => (
                                        <th key={i} style={{ padding: '1.2rem', textAlign: 'left', fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {legacyData[deptKey][getLegacyDataKey(activeTab)].data[activeInternalTab].content.rows.map((row, i) => (
                                      <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: i % 2 === 0 ? '#fafafa' : '#ffffff' }}>
                                        {row.map((cell, j) => {
                                          const headers = legacyData[deptKey][getLegacyDataKey(activeTab)].data[activeInternalTab].content.headers;
                                          const isSNoCol = j === 0 && headers[j] && (headers[j].toLowerCase() === 'sno' || headers[j].toLowerCase() === 's.no' || headers[j].toLowerCase() === 's.no.');
                                          const displayValue = isSNoCol ? (i + 1).toString() : cell.text;
                                          return (
                                            <td key={j} data-label={headers[j] || ''} style={{ padding: '1.2rem', verticalAlign: 'middle', fontSize: '0.95rem', whiteSpace: 'nowrap' }}>
                                              {cell.link ? (
                                                <a 
                                                  href={cell.link} 
                                                  onClick={(e) => {
                                                    if (cell.link.toLowerCase().endsWith('.pdf')) {
                                                      e.preventDefault()
                                                      setSelectedPdf(cell.link)
                                                    }
                                                  }}
                                                  style={{ color: 'var(--vibrant-accent)', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                                                >
                                                  {cell.link.toLowerCase().endsWith('.pdf') ? <i className="fa-solid fa-file-pdf"></i> : <i className="fa-solid fa-link"></i>}
                                                  {displayValue}
                                                </a>
                                              ) : displayValue}
                                            </td>
                                          );
                                        })}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <div className="links-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                                {/* Same as links renderer if needed */}
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div 
                          className="legacy-html-content"
                          dangerouslySetInnerHTML={{ __html: legacyData[deptKey][getLegacyDataKey(activeTab)].data.replace(/(src|href)="(?:\/)?images\//g, '$1="https://kmit.in/images/') }} 
                        />
                      )}
                    </div>
                  ) : (
                    <div className="info-card" style={{ padding: '4rem', textAlign: 'center', background: '#fff', borderRadius: '16px' }}>
                      <div style={{ width: '80px', height: '80px', background: 'rgba(11,31,58,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                        <i className="fa-solid fa-database" style={{ fontSize: '2rem', opacity: 0.3 }}></i>
                      </div>
                      <h2 style={{ color: 'var(--navy)', marginBottom: '1rem' }}>Data Unavailable</h2>
                      <p style={{ color: 'var(--text-muted)' }}>Content for this section could not be found or parsed.</p>
                    </div>
                  )}
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* ── PORTAL MODAL PDF OVERLAY ──────────────────────────── */}
      {selectedPdf && createPortal(
        <div className="pdf-modal-backdrop" onClick={() => setSelectedPdf(null)}>
          <div className="pdf-modal-card" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="pdf-modal-header">
              <span className="pdf-modal-title">
                {getPdfTitle(selectedPdf)}
              </span>
              
              <div className="pdf-modal-actions">
                <a
                  href={getAbsoluteUrl(selectedPdf)}
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
                src={getViewerUrl(selectedPdf)}
                title={getPdfTitle(selectedPdf)}
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
            </div>
            
          </div>
        </div>,
        document.body
      )}
    </PageShell>
  )
}

