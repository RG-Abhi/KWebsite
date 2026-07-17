import { useState, useMemo, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import PageShell from './PageShell'
import SafePdfViewer from '../SafePdfViewer'
import { onlineLinks, services, notifications as fallbackNotifications, timetables as fallbackTimetables, fallbackResults } from '../../context/examsData'

const CustomSortDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = [
    { value: 'latest', label: 'Latest Posted First' },
    { value: 'oldest', label: 'Oldest Posted First' }
  ];

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  return (
    <div ref={dropdownRef} style={{ position: 'relative', width: '220px' }}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '0.85rem 1.2rem',
          border: '1px solid #d1d5db',
          borderRadius: '12px',
          background: '#ffffff',
          fontWeight: '600',
          color: 'var(--navy)',
          fontSize: '0.9rem',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'all 0.2s',
          borderColor: isOpen ? 'var(--navy)' : '#d1d5db'
        }}
      >
        {selectedOption.label}
        <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'}`} style={{ color: '#6b7280', fontSize: '0.8rem', transition: 'transform 0.2s' }}></i>
      </div>
      
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '0.5rem',
          background: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb',
          zIndex: 50,
          overflow: 'hidden'
        }}>
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              style={{
                padding: '0.85rem 1.2rem',
                fontSize: '0.9rem',
                fontWeight: value === opt.value ? '700' : '500',
                color: value === opt.value ? 'var(--navy)' : '#4b5563',
                background: value === opt.value ? '#f8fafc' : '#ffffff',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => {
                if (value !== opt.value) e.target.style.background = '#f1f5f9';
              }}
              onMouseLeave={(e) => {
                if (value !== opt.value) e.target.style.background = '#ffffff';
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function ExamsPage() {
  const [activeTab, setActiveTab] = useState('notifications')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState('latest') // 'latest' or 'oldest'
  const [currentPage, setCurrentPage] = useState(1)
  
  // API State
  const [exams, setExams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [selectedPdf, setSelectedPdf] = useState(null)
  const [servicesSubTab, setServicesSubTab] = useState('offline')

  const itemsPerPage = 25

  // 1. Fetch Exams Dynamically from REST API
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetch('/api/exams')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load exams')
        return res.json()
      })
      .then(data => {
        if (!cancelled) {
          if (Array.isArray(data) && data.length === 0) {
             throw new Error('API returned empty array, falling back to local data');
          }
          setExams(data)
          setLoading(false)
        }
      })
      .catch(err => {
        if (!cancelled) {
          const localExams = [
            ...fallbackNotifications.map(n => ({
              title: n.title,
              category: 'Notification',
              publishDate: n.date.split('-').reverse().join('-') + 'T00:00:00.000Z',
              fileUrl: n.url
            })),
            ...fallbackTimetables.map(t => ({
              title: t.title,
              category: 'Timetable',
              publishDate: t.date.split('-').reverse().join('-') + 'T00:00:00.000Z',
              fileUrl: t.url
            }))
          ];
          setExams(localExams)
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  // 2. Inject Dynamic SEO Tags for Exams Page
  useEffect(() => {
    const defaultTitle = 'KMIT - Examinations Counter'
    document.title = 'Examinations & Student Services | KMIT'

    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.setAttribute('name', 'description')
      document.head.appendChild(metaDesc)
    }
    metaDesc.setAttribute('content', 'Access official KMIT exam notifications, timetables, JNTUH results, hall tickets, online registration portals, and counter services.')
  }, [])

  // Prevent background scrolling on PDF Modal
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

  // Resolve absolute JNTUH/KMIT URLs
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
    return encodeURI(`https://kmit.in/examination/${cleanUrl}`)
  }

  // Get direct PDF url
  const getViewerUrl = (url) => {
    return getAbsoluteUrl(url)
  }

  const tabs = [
    { id: 'notifications', label: 'Exam Notifications', icon: 'fa-bell' },
    { id: 'timetables', label: 'Exam Time Tables', icon: 'fa-calendar-days' },
    { id: 'results', label: 'Results', icon: 'fa-square-poll-vertical' },
    { id: 'registration', label: 'Exam Registration Links', icon: 'fa-link' },
    { id: 'services', label: 'Student Services', icon: 'fa-user-gear' }
  ]

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    setSearchQuery('')
    setCurrentPage(1)
  }

  // Handle Notifications filtering & sorting (includes Notification and Circular)
  const filteredNotifications = useMemo(() => {
    const now = new Date()
    let result = exams.filter(item => {
      if (!['Notification', 'Circular'].includes(item.category)) return false
      if (item.expiryDate && new Date(item.expiryDate) < now) return false
      if (item.publishDate && new Date(item.publishDate) > now) return false
      return true
    })
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim()
      const words = q.split(/\s+/).filter(Boolean)
      result = result.filter(item => {
        const title = (item.title || '').toLowerCase()
        return words.every(word => title.includes(word))
      })
    }
    // Sorting by publishDate
    result.sort((a, b) => {
      const dateA = new Date(a.publishDate)
      const dateB = new Date(b.publishDate)
      return sortOrder === 'latest' ? dateB - dateA : dateA - dateB
    })
    return result
  }, [exams, searchQuery, sortOrder])

  const paginatedNotifications = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredNotifications.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredNotifications, currentPage])

  const totalNotificationPages = Math.ceil(filteredNotifications.length / itemsPerPage)

  // Handle Timetables filtering & sorting
  const filteredTimetables = useMemo(() => {
    const now = new Date()
    let result = exams.filter(item => {
      if (item.category !== 'Timetable') return false
      if (item.expiryDate && new Date(item.expiryDate) < now) return false
      if (item.publishDate && new Date(item.publishDate) > now) return false
      return true
    })
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim()
      const words = q.split(/\s+/).filter(Boolean)
      result = result.filter(item => {
        const title = (item.title || '').toLowerCase()
        return words.every(word => title.includes(word))
      })
    }
    // Sorting
    result.sort((a, b) => {
      const dateA = new Date(a.publishDate)
      const dateB = new Date(b.publishDate)
      return sortOrder === 'latest' ? dateB - dateA : dateA - dateB
    })
    return result
  }, [exams, searchQuery, sortOrder])

  const paginatedTimetables = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredTimetables.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredTimetables, currentPage])

  const totalTimetablePages = Math.ceil(filteredTimetables.length / itemsPerPage)

  // Handle Online Registration Links filtering (combines static onlineLinks and dynamic Hall Tickets / links)
  const filteredOnlineLinks = useMemo(() => {
    const now = new Date()
    const dynamicLinks = exams
      .filter(item => {
        if (!['Hall Ticket', 'Result'].includes(item.category) || !item.linkUrl) return false
        if (item.expiryDate && new Date(item.expiryDate) < now) return false
        if (item.publishDate && new Date(item.publishDate) > now) return false
        return true
      })
      .map(item => ({
        title: item.title,
        url: item.linkUrl,
        date: new Date(item.publishDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-')
      }))

    let result = [...dynamicLinks, ...onlineLinks]
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim()
      const words = q.split(/\s+/).filter(Boolean)
      result = result.filter(item => {
        const title = (item.title || '').toLowerCase()
        return words.every(word => title.includes(word))
      })
    }
    return result
  }, [exams, searchQuery])

  // Get dynamic local Results if uploaded
  const localResults = useMemo(() => {
    const now = new Date()
    return exams.filter(item => {
      if (item.category !== 'Result' || !item.fileUrl) return false
      if (item.expiryDate && new Date(item.expiryDate) < now) return false
      if (item.publishDate && new Date(item.publishDate) > now) return false
      return true
    })
  }, [exams])

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

  return (
    <PageShell
      eyebrow="Examinations"
      title="Notifications &amp;"
      titleEm="Services"
      description="Access official exam notifications, timetables, JNTUH results, hall tickets, online registration portals, and student certificate counter forms."
      breadcrumbs={[{ label: 'Examinations' }, { label: 'Notifications & Services' }]}
    >
      {/* Tab Switcher */}
      <section className="page-section">
        <div className="container">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            borderBottom: '2px solid var(--light-grey, #e5e7eb)',
            paddingBottom: '1rem',
            marginBottom: '2.5rem'
          }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1.5rem',
                  border: 'none',
                  borderRadius: '12px',
                  background: activeTab === tab.id ? 'var(--navy, #0f172a)' : 'transparent',
                  color: activeTab === tab.id ? '#ffffff' : 'var(--text-dark, #374151)',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: activeTab === tab.id ? '0 10px 15px -3px rgba(15, 23, 42, 0.3)' : 'none',
                  border: activeTab === tab.id ? 'none' : '1px solid transparent'
                }}
              >
                <i className={`fa-solid ${tab.icon}`} style={{
                  color: activeTab === tab.id ? 'var(--crimson, #ef4444)' : 'inherit',
                  transition: 'color 0.3s'
                }}></i>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Primary Content Sections */}

          {/* TAB 1: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="exams-tab-panel">
              {/* Controls */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1.5rem',
                marginBottom: '2rem',
                padding: '1.5rem',
                background: 'var(--light-grey, #f3f4f6)',
                borderRadius: '16px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ position: 'relative', flex: '1', minWidth: '280px' }}>
                  <i className="fa-solid fa-magnifying-glass" style={{
                    position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)',
                    color: '#9ca3af'
                  }}></i>
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem 0.85rem 3rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '12px',
                      outline: 'none',
                      fontSize: '0.95rem',
                      transition: 'border-color 0.2s',
                      background: '#ffffff'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--navy)' }}>Sort By:</span>
                  <CustomSortDropdown value={sortOrder} onChange={setSortOrder} />
                </div>
              </div>

              {/* Table */}
              <div style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: '#ffffff' }}>
                  <thead>
                    <tr style={{ background: 'var(--navy, #0f172a)', color: '#ffffff' }}>
                      <th style={{ padding: '1.25rem 2rem', fontWeight: '700', fontSize: '0.95rem' }}>Notification Title</th>
                      <th style={{ padding: '1.25rem 2rem', fontWeight: '700', fontSize: '0.95rem', width: '200px' }}>Date Posted</th>
                      <th style={{ padding: '1.25rem 2rem', fontWeight: '700', fontSize: '0.95rem', width: '220px', textAlign: 'center' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedNotifications.length > 0 ? (
                      paginatedNotifications.map((item, index) => {
                        const publishDateStr = new Date(item.publishDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-')
                        return (
                          <tr key={index} style={{
                            borderBottom: '1px solid #f3f4f6',
                            transition: 'background 0.2s',
                            background: index % 2 === 0 ? '#ffffff' : '#f9fafb'
                          }}>
                            <td style={{ padding: '1.25rem 2rem', fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-dark)' }}>
                              {item.title}
                            </td>
                            <td style={{ padding: '1.25rem 2rem', fontSize: '0.9rem', color: '#6b7280', fontWeight: '500' }}>
                              <i className="fa-regular fa-clock" style={{ marginRight: '6px', color: 'var(--brand-orange-text)' }}></i>
                              {publishDateStr}
                            </td>
                            <td style={{ padding: '1.25rem 2rem', textAlign: 'center' }}>
                              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                <button
                                  onClick={() => setSelectedPdf({ url: item.fileUrl, title: item.title })}
                                  style={{
                                    background: 'var(--navy)',
                                    color: '#ffffff',
                                    border: 'none',
                                    padding: '6px 12px',
                                    borderRadius: '30px',
                                    fontWeight: '700',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                  }}
                                >
                                  <i className="fa-solid fa-eye"></i> View
                                </button>
                                <a
                                  href={getAbsoluteUrl(item.fileUrl)}
                                  download
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    background: 'rgba(165, 28, 48, 0.1)',
                                    color: 'var(--brand-orange-text)',
                                    border: 'none',
                                    padding: '6px 12px',
                                    borderRadius: '30px',
                                    fontWeight: '700',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    transition: 'all 0.2s'
                                  }}
                                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--crimson)'; e.currentTarget.style.color = '#ffffff' }}
                                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(165, 28, 48, 0.1)'; e.currentTarget.style.color = 'var(--crimson)' }}
                                >
                                  <i className="fa-solid fa-download"></i> Download
                                </a>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    ) : (
                      <tr>
                        <td colSpan="3" style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af', fontWeight: '600' }}>
                          No notifications found matching your search query.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalNotificationPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    style={{
                      background: currentPage === 1 ? '#e5e7eb' : 'var(--navy)',
                      color: currentPage === 1 ? '#9ca3af' : '#ffffff',
                      border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: '700',
                      cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Previous
                  </button>
                  <span style={{ fontWeight: '700', color: 'var(--navy)', fontSize: '0.95rem' }}>
                    Page {currentPage} of {totalNotificationPages}
                  </span>
                  <button
                    disabled={currentPage === totalNotificationPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalNotificationPages))}
                    style={{
                      background: currentPage === totalNotificationPages ? '#e5e7eb' : 'var(--navy)',
                      color: currentPage === totalNotificationPages ? '#9ca3af' : '#ffffff',
                      border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: '700',
                      cursor: currentPage === totalNotificationPages ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: TIMETABLES */}
          {activeTab === 'timetables' && (
            <div className="exams-tab-panel">
              {/* Controls */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1.5rem',
                marginBottom: '2rem',
                padding: '1.5rem',
                background: 'var(--light-grey, #f3f4f6)',
                borderRadius: '16px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ position: 'relative', flex: '1', minWidth: '280px' }}>
                  <i className="fa-solid fa-magnifying-glass" style={{
                    position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)',
                    color: '#9ca3af'
                  }}></i>
                  <input
                    type="text"
                    placeholder="Search timetables..."
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem 0.85rem 3rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '12px',
                      outline: 'none',
                      fontSize: '0.95rem',
                      transition: 'border-color 0.2s',
                      background: '#ffffff'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--navy)' }}>Sort By:</span>
                  <CustomSortDropdown value={sortOrder} onChange={setSortOrder} />
                </div>
              </div>

              {/* Table */}
              <div style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: '#ffffff' }}>
                  <thead>
                    <tr style={{ background: 'var(--navy, #0f172a)', color: '#ffffff' }}>
                      <th style={{ padding: '1.25rem 2rem', fontWeight: '700', fontSize: '0.95rem' }}>Time Table Title</th>
                      <th style={{ padding: '1.25rem 2rem', fontWeight: '700', fontSize: '0.95rem', width: '200px' }}>Date Posted</th>
                      <th style={{ padding: '1.25rem 2rem', fontWeight: '700', fontSize: '0.95rem', width: '220px', textAlign: 'center' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedTimetables.length > 0 ? (
                      paginatedTimetables.map((item, index) => {
                        const publishDateStr = new Date(item.publishDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-')
                        return (
                          <tr key={index} style={{
                            borderBottom: '1px solid #f3f4f6',
                            transition: 'background 0.2s',
                            background: index % 2 === 0 ? '#ffffff' : '#f9fafb'
                          }}>
                            <td style={{ padding: '1.25rem 2rem', fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-dark)' }}>
                              {item.title}
                            </td>
                            <td style={{ padding: '1.25rem 2rem', fontSize: '0.9rem', color: '#6b7280', fontWeight: '500' }}>
                              <i className="fa-regular fa-clock" style={{ marginRight: '6px', color: 'var(--brand-orange-text)' }}></i>
                              {publishDateStr}
                            </td>
                            <td style={{ padding: '1.25rem 2rem', textAlign: 'center' }}>
                              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                <button
                                  onClick={() => setSelectedPdf({ url: item.fileUrl, title: item.title })}
                                  style={{
                                    background: 'var(--navy)',
                                    color: '#ffffff',
                                    border: 'none',
                                    padding: '6px 12px',
                                    borderRadius: '30px',
                                    fontWeight: '700',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                  }}
                                >
                                  <i className="fa-solid fa-eye"></i> View
                                </button>
                                <a
                                  href={getAbsoluteUrl(item.fileUrl)}
                                  download
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    background: 'rgba(165, 28, 48, 0.1)',
                                    color: 'var(--brand-orange-text)',
                                    border: 'none',
                                    padding: '6px 12px',
                                    borderRadius: '30px',
                                    fontWeight: '700',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    transition: 'all 0.2s'
                                  }}
                                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--crimson)'; e.currentTarget.style.color = '#ffffff' }}
                                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(165, 28, 48, 0.1)'; e.currentTarget.style.color = 'var(--crimson)' }}
                                >
                                  <i className="fa-solid fa-download"></i> Download
                                </a>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    ) : (
                      <tr>
                        <td colSpan="3" style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af', fontWeight: '600' }}>
                          No timetables found matching your search query.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalTimetablePages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    style={{
                      background: currentPage === 1 ? '#e5e7eb' : 'var(--navy)',
                      color: currentPage === 1 ? '#9ca3af' : '#ffffff',
                      border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: '700',
                      cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Previous
                  </button>
                  <span style={{ fontWeight: '700', color: 'var(--navy)', fontSize: '0.95rem' }}>
                    Page {currentPage} of {totalTimetablePages}
                  </span>
                  <button
                    disabled={currentPage === totalTimetablePages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalTimetablePages))}
                    style={{
                      background: currentPage === totalTimetablePages ? '#e5e7eb' : 'var(--navy)',
                      color: currentPage === totalTimetablePages ? '#9ca3af' : '#ffffff',
                      border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: '700',
                      cursor: currentPage === totalTimetablePages ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: RESULTS */}
          {activeTab === 'results' && (
            <div className="exams-tab-panel">
              {/* Dynamic local results list if available */}
              {localResults.length > 0 && (
                <div style={{ marginBottom: '3rem' }}>
                  <h4 style={{ color: 'var(--navy)', fontWeight: '800', fontSize: '1.2rem', marginBottom: '1.5rem' }}>Recently Published Scorecards</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {localResults.map((item, index) => (
                      <div key={index} style={{ background: 'var(--white)', border: '1px solid var(--light-grey)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-sm)' }}>
                        <i className="fa-solid fa-file-invoice" style={{ color: 'var(--brand-orange-text)', fontSize: '1.5rem', marginBottom: '1rem' }}></i>
                        <h4 style={{ fontSize: '0.98rem', fontWeight: 'bold', color: 'var(--navy)', marginBottom: '1rem', lineHeight: '1.5', flex: 1 }}>{item.title}</h4>
                        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                          <button
                            onClick={() => setSelectedPdf({ url: item.fileUrl, title: item.title })}
                            style={{ flex: 1, background: 'var(--navy)', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '30px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer' }}
                          >
                            View PDF
                          </button>
                          <a
                            href={getAbsoluteUrl(item.fileUrl)}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ flex: 1, background: 'rgba(165,28,48,0.08)', color: 'var(--brand-orange-text)', textAlign: 'center', border: 'none', padding: '8px 12px', borderRadius: '30px', fontWeight: 'bold', fontSize: '0.8rem', textDecoration: 'none' }}
                          >
                            Download
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
                <div style={{
                  maxWidth: '650px',
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.75)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '24px',
                  padding: '3rem',
                  textAlign: 'center',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(229, 231, 235, 0.8)'
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'rgba(239, 68, 68, 0.1)',
                    color: 'var(--crimson, #ef4444)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.25rem',
                    margin: '0 auto 2rem'
                  }}>
                    <i className="fa-solid fa-square-poll-vertical"></i>
                  </div>
                  
                  <h3 style={{ color: 'var(--navy)', fontWeight: '800', fontSize: '1.75rem', marginBottom: '1rem' }}>
                    JNTUH Results Portal
                  </h3>
                  
                  <p style={{ color: '#4b5563', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2.5rem' }}>
                    Student examination results, semester scorecards, and historical marks lists are hosted directly on the central **Teleuniv Portal**. Click below to navigate to the official university results home page.
                  </p>

                  <button
                    onClick={() => window.open('http://portal.teleuniv.in/exam/resultshome', '_blank', 'noopener,noreferrer')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      background: 'var(--navy, #0f172a)',
                      color: '#ffffff',
                      padding: '1rem 2rem',
                      borderRadius: '14px',
                      border: 'none',
                      fontWeight: '800',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      boxShadow: '0 10px 15px -3px rgba(15, 23, 42, 0.3)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <i className="fa-solid fa-up-right-from-square"></i> Open JNTUH Results
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: REGISTRATION LINKS */}
          {activeTab === 'registration' && (
            <div className="exams-tab-panel">
              {/* Controls */}
              <div style={{
                display: 'flex',
                gap: '1.5rem',
                marginBottom: '2rem',
                padding: '1.5rem',
                background: 'var(--light-grey, #f3f4f6)',
                borderRadius: '16px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ position: 'relative', flex: '1' }}>
                  <i className="fa-solid fa-magnifying-glass" style={{
                    position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)',
                    color: '#9ca3af'
                  }}></i>
                  <input
                    type="text"
                    placeholder="Search registration and exam links..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem 0.85rem 3rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '12px',
                      outline: 'none',
                      fontSize: '0.95rem',
                      transition: 'border-color 0.2s',
                      background: '#ffffff'
                    }}
                  />
                </div>
              </div>

              {/* Grid of Registration Links */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '1.5rem'
              }}>
                {filteredOnlineLinks.length > 0 ? (
                  filteredOnlineLinks.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '16px',
                        padding: '1.75rem',
                        border: '1px solid #e5e7eb',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
                        transition: 'transform 0.3s, box-shadow 0.3s'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                          <span style={{
                            background: 'rgba(239, 68, 68, 0.08)',
                            color: 'var(--brand-orange-text)',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: '800'
                          }}>
                            ONLINE FORM
                          </span>
                          {item.date && (
                            <span style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: '600' }}>
                              <i className="fa-regular fa-calendar" style={{ marginRight: '5px' }}></i> {item.date}
                            </span>
                          )}
                        </div>
                        <h4 style={{ color: 'var(--navy)', fontWeight: '800', fontSize: '1.05rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                          {item.title}
                        </h4>
                      </div>
                      
                      <button
                        onClick={() => window.open(getAbsoluteUrl(item.url), '_blank', 'noopener,noreferrer')}
                        style={{
                          width: '100%',
                          background: 'var(--navy)',
                          color: '#ffffff',
                          border: 'none',
                          padding: '0.75rem',
                          borderRadius: '10px',
                          fontWeight: '800',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          transition: 'background 0.2s'
                        }}
                      >
                        Launch Form <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.75rem' }}></i>
                      </button>
                    </div>
                  ))
                ) : (
                  <div style={{ gridColumn: '1 / -1', padding: '4rem', textAlign: 'center', color: '#9ca3af', fontWeight: '600' }}>
                    No registration forms found matching your search.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: STUDENT SERVICES */}
          {activeTab === 'services' && (
            <div className="exams-tab-panel">
              {/* Nested Sub-tab Switcher (Offline vs Tatkal Counter Modes) */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '2.5rem',
                borderBottom: '2px solid #e5e7eb',
                paddingBottom: '1rem'
              }}>
                <button
                  onClick={() => setServicesSubTab('offline')}
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: 'none',
                    borderRadius: '30px',
                    background: servicesSubTab === 'offline' ? 'var(--navy)' : '#f3f4f6',
                    color: servicesSubTab === 'offline' ? '#ffffff' : '#4b5563',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  Offline Counter Services
                </button>
                <button
                  onClick={() => setServicesSubTab('tatkal')}
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: 'none',
                    borderRadius: '30px',
                    background: servicesSubTab === 'tatkal' ? 'var(--navy)' : '#f3f4f6',
                    color: servicesSubTab === 'tatkal' ? '#ffffff' : '#4b5563',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  Tatkal Services
                </button>
              </div>

              {/* Sub-tab Content (Counter Services) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '4rem' }}>
                <div style={{ marginBottom: '1.5rem', maxWidth: '800px' }}>
                  <h3 style={{ color: 'var(--navy)', fontWeight: '800', fontSize: '1.35rem', marginBottom: '0.5rem' }}>
                    {servicesSubTab === 'tatkal' ? 'Tatkal Fast-Track Certificate Services' : 'Offline / Counter Certificate Services'}
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    {servicesSubTab === 'tatkal' 
                      ? 'Official tatkal requests are issued within 2 working days. Payments must be drawn via DD or Smart Card swiping at the student counter.'
                      : 'Checklists and application forms for duplicates, name corrections, and transcripts. Submit physical applications directly at the student services counter.'}
                  </p>
                </div>

                <div style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: '#ffffff' }}>
                    <thead>
                      <tr style={{ background: 'var(--navy, #0f172a)', color: '#ffffff' }}>
                        <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700', fontSize: '0.95rem', width: '80px', textAlign: 'center' }}>S.No</th>
                        <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700', fontSize: '0.95rem', width: '280px' }}>Certificate / Service Name</th>
                        <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700', fontSize: '0.95rem' }}>Required Documents &amp; Checklist</th>
                        <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700', fontSize: '0.95rem', width: '200px' }}>Fee Rate</th>
                        <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700', fontSize: '0.95rem', width: '160px', textAlign: 'center' }}>Download Form</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services[servicesSubTab === 'tatkal' ? 'tatkal' : 'offline']?.map((item, index) => (
                        <tr key={index} style={{
                          borderBottom: '1px solid #f3f4f6',
                          transition: 'background 0.2s',
                          background: index % 2 === 0 ? '#ffffff' : '#f9fafb'
                        }}>
                          <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.9rem', fontWeight: '700', color: 'var(--navy)', textAlign: 'center' }}>
                            {item.sNo}
                          </td>
                          <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.95rem', fontWeight: '700', color: 'var(--navy)' }}>
                            {item.name}
                          </td>
                          <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.9rem', color: '#4b5563', lineHeight: '1.6', textAlign: 'justify' }}>
                            {item.docs}
                          </td>
                          <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.9rem', color: '#10b981', fontWeight: '800' }}>
                            {item.amount}
                          </td>
                          <td style={{ padding: '1.25rem 1.5rem', textAlign: 'center' }}>
                            {item.downloads && item.downloads.length > 0 ? (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                                {item.downloads.map((dl, dIdx) => (
                                  <button
                                    key={dIdx}
                                    onClick={() => setSelectedPdf({ url: dl.url, title: dl.label })}
                                    style={{
                                      background: 'transparent',
                                      border: '1px solid var(--navy)',
                                      color: 'var(--navy)',
                                      padding: '6px 12px',
                                      borderRadius: '8px',
                                      fontWeight: '700',
                                      fontSize: '0.8rem',
                                      cursor: 'pointer',
                                      width: '100%',
                                      maxWidth: '120px',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      gap: '6px',
                                      transition: 'all 0.2s'
                                    }}
                                  >
                                    <i className="fa-solid fa-file-pdf"></i> {dl.label}
                                  </button>
                                ))}
                              </div>
                            ) : (
                              <span style={{ fontSize: '0.9rem', color: '#9ca3af', fontWeight: '500' }}>--</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Footer Note */}
                <div style={{
                  marginTop: '2rem',
                  padding: '2rem',
                  background: 'rgba(239, 68, 68, 0.04)',
                  borderRadius: '20px',
                  border: '1px dashed rgba(239, 68, 68, 0.25)',
                  maxWidth: '850px'
                }}>
                  <h5 style={{ color: 'var(--brand-orange-text)', fontWeight: '800', fontSize: '0.95rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="fa-solid fa-circle-exclamation"></i> Note:
                  </h5>
                  {servicesSubTab === 'offline' ? (
                    <ul style={{ color: '#4b5563', fontSize: '0.85rem', lineHeight: '1.8', margin: 0, paddingLeft: '1.25rem', listStyleType: 'decimal' }}>
                      <li>The payments can be made in one of the following modes: Smart-card swiping/ T-Wallet/ SBI Challan / DD</li>
                      <li>If Demand Draft is taken, it should be drawn in favor of <strong>&quot;THE REGISTRAR JNTUH&quot;</strong>, payable at Hyderabad. The student Hall-Ticket number should be written on the backside of DD.</li>
                      <li>If the student desires to choose challan option, the challan should be taken only at the campus SBI (JNTU Hyderabad) Branch.</li>
                      <li>The T-Wallet/ Swiping facility using the smart card (debit/credit card) is available at the student service counter.</li>
                    </ul>
                  ) : (
                    <ul style={{ color: '#4b5563', fontSize: '0.85rem', lineHeight: '1.8', margin: 0, paddingLeft: '1.25rem', listStyleType: 'decimal' }}>
                      <li>Certificates under TATKAL scheme will be issued within in two working days.</li>
                      <li>All payments shall be made through Demand Drafts drawn in favour of <strong>&quot;THE REGISTRAR JNTUH&quot;</strong>, payable at Hyderabad.</li>
                      <li>Provision to make payments through challan is available only at SBI JNTU Hyderabad Branch.</li>
                      <li>The T-Wallet/ Swiping facility using the smart card(Debit/credit card) is available at the student service counter.</li>
                      <li>Student should write his/her Hall Ticket Number on the back-side of the Demand Draft, if the mode of payment is DD.</li>
                    </ul>
                  )}
                </div>
              </div>

              <div style={{ height: '1px', background: '#e5e7eb', margin: '3rem 0' }} />

              {/* Online Mode Section (Fixed at the Bottom) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ textAlign: 'center', margin: '0 auto 1.5rem', maxWidth: '800px' }}>
                  <h3 style={{ color: 'var(--navy)', fontWeight: '800', fontSize: '1.35rem', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                    GENERAL INFORMATION FOR OBTAINING CERTIFICATES IN ONLINE MODE ONLY
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    Students are requested to do a one-time registration in the{' '}
                    <a 
                      href="https://studentservices.jntuh.ac.in/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ 
                        color: 'var(--crimson, #ef4444)', 
                        textDecoration: 'underline', 
                        fontWeight: '700',
                        transition: 'color 0.2s'
                      }}
                    >
                      student service portal
                    </a>{' '}
                    to avail the following services.
                  </p>
                </div>

                <div style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: '#ffffff' }}>
                    <thead>
                      <tr style={{ background: 'var(--navy, #0f172a)', color: '#ffffff' }}>
                        <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700', fontSize: '0.95rem', width: '80px', textAlign: 'center' }}>S.No</th>
                        <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700', fontSize: '0.95rem', width: '280px' }}>Certificate Name</th>
                        <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700', fontSize: '0.95rem' }}>Supporting Documents/Copies to be submitted</th>
                        <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700', fontSize: '0.95rem', width: '200px' }}>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.online?.map((item, index) => (
                        <tr key={index} style={{
                          borderBottom: '1px solid #f3f4f6',
                          transition: 'background 0.2s',
                          background: index % 2 === 0 ? '#ffffff' : '#f9fafb'
                        }}>
                          <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.9rem', fontWeight: '700', color: 'var(--navy)', textAlign: 'center' }}>
                            {item.sNo}
                          </td>
                          <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.95rem', fontWeight: '700', color: 'var(--navy)' }}>
                            {item.name}
                          </td>
                          <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.9rem', color: '#4b5563', lineHeight: '1.6', textAlign: 'justify' }}>
                            {item.docs}
                          </td>
                          <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.9rem', color: '#10b981', fontWeight: '800' }}>
                            {item.amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

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
    </PageShell>
  )
}
