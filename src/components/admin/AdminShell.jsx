import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../context/websiteData'
import { logout } from '../../services/authService'
import { getStoredUser, adminApi } from '../../services/adminApi'
import { getModulesForRole, MODULE_LABELS, MODULE_ICONS, MODULES } from '../../config/adminRoles'
import GlobalSearch from './components/GlobalSearch'
import DashboardModule from './modules/DashboardModule'
import ContentModule from './modules/ContentModule'
import ExamsModule from './modules/ExamsModule'
import AcademicsModule from './modules/AcademicsModule'
import PlacementsModule from './modules/PlacementsModule'
import PeopleModule from './modules/PeopleModule'
import SettingsModule from './modules/SettingsModule'
import MediaPanel from './MediaPanel'

export default function AdminShell() {
  const navigate = useNavigate()
  const { data, syncStatus, lastSyncedAt } = useData()
  const [user, setUser] = useState(getStoredUser())
  const [module, setModule] = useState('dashboard')
  const [contentSub, setContentSub] = useState('notices')
  const [settingsSub, setSettingsSub] = useState('site')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    localStorage.getItem('kmit_admin_sidebar_collapsed') === 'true'
  )
  const [toast, setToast] = useState(null)

  const allowed = getModulesForRole(user?.role || 'viewer')

  const triggerToast = (message, type = 'success') => {
    setToast({ message, type })
    const timer = setTimeout(() => setToast(null), 4000)
    return () => clearTimeout(timer)
  }

  useEffect(() => {
    adminApi.me().then(setUser).catch(() => {})
  }, [])

  useEffect(() => {
    if (!allowed.includes(module)) setModule(allowed[0] || MODULES.dashboard)
  }, [allowed, module])

  const toggleSidebar = () => {
    const next = !sidebarCollapsed
    setSidebarCollapsed(next)
    localStorage.setItem('kmit_admin_sidebar_collapsed', String(next))
  }

  const handleSearchNavigate = (result) => {
    if (result.type === 'notice') setModule('content'), setContentSub('notices')
    else if (result.type === 'page') setModule('content'), setContentSub('pages')
    else if (result.type === 'faculty') setModule('people')
    else if (result.type === 'academic') setModule('academics')
    else if (result.type === 'media') setModule('media')
  }

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `kmit-export-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
    triggerToast('JSON configuration exported successfully!', 'success')
  }

  const getBreadcrumbs = () => {
    const crumbs = [{ label: 'Admin Portal', module: 'dashboard' }]
    crumbs.push({ label: MODULE_LABELS[module] || module, module })

    if (module === 'content') {
      crumbs.push({ label: contentSub === 'pages' ? 'Visual Page Builder' : 'Notices & Announcements' })
    } else if (module === 'settings') {
      crumbs.push({
        label:
          settingsSub === 'site'
            ? 'Global SEO & Metadata'
            : settingsSub === 'home'
            ? 'Homepage Sections'
            : settingsSub === 'departments'
            ? 'Departments Data'
            : 'Access Roles & Security',
      })
    }
    return crumbs
  }

  return (
    <div className="admin-dashboard cms-shell" style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#f8fafc', fontFamily: 'var(--font-sans)' }}>
      
      {/* Toast Notification */}
      {toast && (
        <div
          className={`cms-toast cms-toast-${toast.type}`}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: toast.type === 'error' ? 'rgba(239, 68, 68, 0.95)' : 'rgba(15, 23, 42, 0.95)',
            color: '#fff',
            padding: '0.85rem 1.5rem',
            borderRadius: '8px',
            boxShadow: '0 12px 30px rgba(15,23,42,0.15)',
            backdropFilter: 'blur(8px)',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            animation: 'spaSlideInRight 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) both'
          }}
        >
          <i className={`fa-solid ${toast.type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-check'}`} />
          <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{toast.message}</span>
        </div>
      )}

      {/* Sidebar navigation */}
      <aside
        className={`admin-sidebar cms-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}
        style={{
          width: sidebarCollapsed ? '80px' : '280px',
          background: '#111827',
          color: '#f8fafc',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          flexShrink: 0,
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflowX: 'hidden',
          borderRight: 'none',
          boxShadow: '4px 0 20px rgba(0, 0, 0, 0.05)',
        }}
      >
        <div
          className="admin-logo"
          style={{
            padding: '1.25rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            whiteSpace: 'nowrap',
          }}
        >
          <div style={{ width: '36px', height: '36px', background: '#DF5305', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FEFEFF', fontSize: '1.2rem', flexShrink: 0 }}>
            <i className="fa-solid fa-graduation-cap" />
          </div>
          {!sidebarCollapsed && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', animation: 'spaFadeIn 0.2s ease both' }}>
              <span style={{ fontWeight: 600, fontSize: '1.1rem', letterSpacing: '-0.3px', color: '#f8fafc' }}>KMIT CMS</span>
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 500,
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#e2e8f0',
                padding: '2px 8px',
                borderRadius: '12px',
                alignSelf: 'flex-start',
                letterSpacing: '0.5px',
                textTransform: 'capitalize'
              }}>
                {user?.role?.replace(/_/g, ' ') || 'Admin'}
              </span>
            </div>
          )}
        </div>


        <nav
          className="admin-nav"
          style={{
            flex: 1,
            padding: '1.25rem 0.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
            overflowY: 'auto',
          }}
        >
          {allowed.map((key) => (
            <button
              key={key}
              type="button"
              className={module === key ? 'active' : ''}
              onClick={() => setModule(key)}
              title={sidebarCollapsed ? MODULE_LABELS[key] : ''}
              style={{
                background: 'transparent',
                color: module === key ? '#DF5305' : '#9ca3af',
                padding: '0.85rem 1.2rem',
                display: 'flex',
                alignItems: 'center',
                gap: sidebarCollapsed ? '0' : '14px',
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                fontWeight: module === key ? 600 : 400,
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'left',
                border: 'none',
                width: '100%',
              }}
              onMouseEnter={(e) => {
                if (module !== key) {
                  e.currentTarget.style.color = '#f3f4f6'
                }
              }}
              onMouseLeave={(e) => {
                if (module !== key) {
                  e.currentTarget.style.color = '#9ca3af'
                }
              }}
            >
              <i
                className={`fa-solid ${MODULE_ICONS[key]}`}
                style={{ width: '20px', fontSize: '1.1rem', textAlign: 'center', color: module === key ? '#DF5305' : '#6b7280' }}
              />
              {!sidebarCollapsed && <span style={{ animation: 'spaFadeIn 0.25s ease both' }}>{MODULE_LABELS[key]}</span>}
            </button>
          ))}
        </nav>

        <div
          className="admin-sidebar-footer"
          style={{
            padding: '1rem 0.75rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <button
            type="button"
            onClick={exportJson}
            title={sidebarCollapsed ? 'Export JSON' : ''}
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'transparent',
              color: '#9ca3af',
              fontWeight: 500,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; e.currentTarget.style.color = '#f8fafc'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#9ca3af'; }}
          >
            <i className="fa-solid fa-download" />
            {!sidebarCollapsed && <span>Export JSON</span>}
          </button>
          <button
            type="button"
            className="logout-btn"
            onClick={() => {
              logout()
              navigate('/login')
            }}
            title={sidebarCollapsed ? 'Sign out' : ''}
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              border: 'none',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              fontWeight: 500,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
          >
            <i className="fa-solid fa-right-from-bracket" />
            {!sidebarCollapsed && <span>Sign out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowY: 'auto' }}>
        <header
          className="admin-header cms-header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            height: '75px',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '1rem',
          }}
        >
          <div>
            {/* Dynamic Breadcrumbs */}
            <div
              className="cms-breadcrumbs"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '4px',
                fontSize: '0.8rem',
                color: '#64748b',
                fontWeight: 600,
              }}
            >
              {getBreadcrumbs().map((crumb, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {i > 0 && <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.65rem', opacity: 0.5 }} />}
                  {crumb.module ? (
                    <button
                      onClick={() => setModule(crumb.module)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: i === getBreadcrumbs().length - 1 ? 'var(--navy)' : '#64748b',
                        cursor: 'pointer',
                        padding: 0,
                        fontSize: 'inherit',
                        fontWeight: i === getBreadcrumbs().length - 1 ? 600 : 'inherit',
                        fontFamily: 'inherit',
                      }}
                    >
                      {crumb.label}
                    </button>
                  ) : (
                    <span style={{ color: 'var(--navy)', fontWeight: 600 }}>{crumb.label}</span>
                  )}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                onClick={toggleSidebar}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <i className={`fa-solid ${sidebarCollapsed ? 'fa-indent' : 'fa-outdent'}`} />
              </button>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 600, color: '#1f2937', margin: 0, letterSpacing: '-0.3px' }}>
                {MODULE_LABELS[module]}
              </h1>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                fontSize: '0.78rem',
                background: '#f1f5f9',
                padding: '4px 10px',
                borderRadius: '20px',
                color: '#475569',
                fontWeight: 600,
              }}
            >
              Role: <strong style={{ color: 'var(--navy)' }}>{user?.role?.replace(/_/g, ' ')}</strong>
            </span>
            <GlobalSearch onNavigate={handleSearchNavigate} />
            <button
              type="button"
              className="view-site-btn"
              onClick={() => window.open('/', '_blank')}
              style={{ margin: 0 }}
            >
              <i className="fa-solid fa-arrow-up-right-from-square" /> View site
            </button>
          </div>
        </header>

        <section className="admin-content">
          {module === MODULES.dashboard && (
            <DashboardModule user={user} onNavigateModule={setModule} />
          )}
          {module === MODULES.content && (
            <ContentModule subTab={contentSub} setSubTab={setContentSub} user={user} showToast={triggerToast} />
          )}
          {module === MODULES.exams && (
            <ExamsModule showToast={triggerToast} />
          )}
          {module === MODULES.academics && <AcademicsModule showToast={triggerToast} />}
          {module === MODULES.placements && <PlacementsModule />}
          {module === MODULES.media && (
            <div className="admin-card">
              <h3>Media library</h3>
              <MediaPanel showToast={triggerToast} />
            </div>
          )}
          {module === MODULES.people && <PeopleModule />}
          {module === MODULES.settings && (
            <SettingsModule subTab={settingsSub} setSubTab={setSettingsSub} showToast={triggerToast} />
          )}
        </section>
      </main>
    </div>
  )
}

