import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { ACADEMIC_CALENDAR_ROWS } from '../data/academicCalendarData'
import { ENDOWMENT_AWARD_SECTIONS } from '../data/endowmentAwardsData'
import { getToken } from '../services/authService'
import {
  fetchSiteData,
  subscribeSiteDataStream,
  startSiteDataPolling,
} from '../services/siteDataService'

const AWARD_TABLE_HEADERS = ['S.No', 'Roll Number', 'Name of Student', 'Award Name', 'Award For']

const DataContext = createContext()

// ─── NAVIGATION ──────────────────────────────────────────────────────────────
// 9-item nav structure as per kweb2.txt:
// 1. About | 2. Administration & Committees | 3. Admissions | 4. Academics
// 5. Departments | 6. Research & Innovation | 7. Campus Life & Infrastructure
// 8. Examinations & Placements | 9. Rankings & Quality
// Rankings & Quality use 'cards' layout. All others use 'columns' layout.
const INITIAL_NAV_ITEMS = [
  {
    key: 'administration', label: 'ADMINISTRATION', type: 'cards', cols: 3,
    items: [
      { icon: 'fa-circle-info', title: 'About Us', desc: 'Overview of KMIT and our history', section: 'about' },
      { icon: 'fa-landmark', title: 'KMES', desc: 'Keshav Memorial Education Society', section: 'about/kmes' },
      { icon: 'fa-user-tie', title: 'Governing Body', desc: 'Our Board of Management', section: 'about/management' },
      { icon: 'fa-user-graduate', title: 'Principal', desc: 'Leadership and Vision', section: 'about/principal' },
      { icon: 'fa-user-gear', title: 'Director', desc: 'Academic leadership', section: 'administration/academic-director' },
      { icon: 'fa-users-gear', title: 'Heads of the Department', desc: 'Departmental leadership', section: 'administration/hod' },
      { icon: 'fa-scale-balanced', title: 'Academic Core Committee', desc: 'Academic governance', section: 'administration/academic-core-committee' },
      { icon: 'fa-handshake', title: 'Industry Interaction Cell (IIC)', desc: 'Industry partnerships', section: 'administration/iic' },
      { icon: 'fa-list-check', title: 'Other Committees', desc: 'Mandatory institutional bodies', section: 'administration/committees' },
      { icon: 'fa-id-card', title: 'IDMC', desc: 'Institutional Development & Monitoring', section: 'administration/idmc' },
      { icon: 'fa-map-location-dot', title: 'Perspective Plan', desc: 'Future goals and roadmap', section: 'about/perspective-plan' },
      { icon: 'fa-people-group', title: 'HR Policy', desc: 'Institutional guidelines', section: 'about/hr-policy' },
    ]
  },
  {
    key: 'admissions', label: 'ADMISSIONS', type: 'cards', cols: 1,
    items: [
      { icon: 'fa-laptop-code', title: 'Courses Offered', desc: 'B.Tech programmes available', section: 'admissions' },
      { icon: 'fa-file-signature', title: 'Admission Procedure', desc: 'Counselling procedure', section: 'admissions/eligibility' },
      { icon: 'fa-ranking-star', title: 'EAPCET Last Rank', desc: 'Previous year cut-offs', section: 'admissions/eapcet-ranks' },
      { icon: 'fa-chart-simple', title: 'ECET Last Rank', desc: 'Lateral entry cut-offs', section: 'admissions/ecet-ranks' },
      { icon: 'fa-medal', title: 'Scholarships', desc: 'Financial aid programs', section: 'admissions/scholarships' },
    ]
  },
  {
    key: 'academics', label: 'ACADEMICS', type: 'cards', cols: 2,
    items: [
      { icon: 'fa-book-bookmark', title: 'Regulations', desc: 'Academic rules and norms', section: 'academics/regulations' },
      { icon: 'fa-calendar-days', title: 'Academic Calendars', desc: 'Schedules and timelines', section: 'academics/calendar' },
      { icon: 'fa-book-open', title: 'Syllabus', desc: 'Course curriculum', section: 'academics/syllabus' },
      { icon: 'fa-plus-circle', title: 'Value-added Services', desc: 'Beyond curriculum learning', section: 'academics/value-added' },
      { icon: 'fa-trophy', title: 'Endowment Awards', desc: 'Recognition of excellence', section: 'academics/awards' },
      { icon: 'fa-chalkboard-user', title: 'Teaching Learning Evaluation', desc: 'Assessment and methodology', section: 'academics/evaluation' },
    ]
  },
  {
    key: 'departments', label: 'DEPARTMENTS', type: 'columns', cols: 6,
    columns: [
      {
        title: 'CSE',
        links: [
          { label: 'About', section: 'academics/cse', icon: 'fa-circle-info' },
          { label: 'Faculty', section: 'academics/cse/faculty', icon: 'fa-chalkboard-user' },
          { label: 'Achievements', section: 'academics/cse/achievements', icon: 'fa-trophy' },
          { label: 'Academics', section: 'academics/cse/academics', icon: 'fa-book-open' },
          { label: 'Labs', section: 'academics/cse/labs', icon: 'fa-flask-vial' },
          { label: 'Publications', section: 'academics/cse/publications', icon: 'fa-newspaper' },
          { label: 'Contact', section: 'academics/cse/contact', icon: 'fa-envelope' }
        ]
      },
      {
        title: 'IT',
        links: [
          { label: 'About', section: 'academics/it', icon: 'fa-circle-info' },
          { label: 'Faculty', section: 'academics/it/faculty', icon: 'fa-chalkboard-user' },
          { label: 'Achievements', section: 'academics/it/achievements', icon: 'fa-trophy' },
          { label: 'Academics', section: 'academics/it/academics', icon: 'fa-book-open' },
          { label: 'Labs', section: 'academics/it/labs', icon: 'fa-flask-vial' },
          { label: 'Publications', section: 'academics/it/publications', icon: 'fa-newspaper' },
          { label: 'Contact', section: 'academics/it/contact', icon: 'fa-envelope' }
        ]
      },
      {
        title: 'CSE (AI & ML)',
        links: [
          { label: 'About', section: 'academics/csm', icon: 'fa-circle-info' },
          { label: 'Faculty', section: 'academics/csm/faculty', icon: 'fa-chalkboard-user' },
          { label: 'Achievements', section: 'academics/csm/achievements', icon: 'fa-trophy' },
          { label: 'Academics', section: 'academics/csm/academics', icon: 'fa-book-open' },
          { label: 'Labs', section: 'academics/csm/labs', icon: 'fa-flask-vial' },
          { label: 'Publications', section: 'academics/csm/publications', icon: 'fa-newspaper' },
          { label: 'Contact', section: 'academics/csm/contact', icon: 'fa-envelope' }
        ]
      },
      {
        title: 'CSE (Data Science)',
        links: [
          { label: 'About', section: 'academics/csd', icon: 'fa-circle-info' },
          { label: 'Faculty', section: 'academics/csd/faculty', icon: 'fa-chalkboard-user' },
          { label: 'Achievements', section: 'academics/csd/achievements', icon: 'fa-trophy' },
          { label: 'Academics', section: 'academics/csd/academics', icon: 'fa-book-open' },
          { label: 'Labs', section: 'academics/csd/labs', icon: 'fa-flask-vial' },
          { label: 'Publications', section: 'academics/csd/publications', icon: 'fa-newspaper' },
          { label: 'Contact', section: 'academics/csd/contact', icon: 'fa-envelope' }
        ]
      },
      {
        title: 'H&S',
        links: [
          { label: 'About', section: 'academics/hs', icon: 'fa-circle-info' },
          { label: 'Faculty', section: 'academics/hs/faculty', icon: 'fa-chalkboard-user' },
          { label: 'Achievements', section: 'academics/hs/achievements', icon: 'fa-trophy' },
          { label: 'Academics', section: 'academics/hs/academics', icon: 'fa-book-open' },
          { label: 'Labs', section: 'academics/hs/labs', icon: 'fa-flask-vial' },
          { label: 'Publications', section: 'academics/hs/publications', icon: 'fa-newspaper' },
          { label: 'Contact', section: 'academics/hs/contact', icon: 'fa-envelope' }
        ]
      },
      {
        title: 'Resources',
        links: [
          { label: 'Online ELMS', section: 'tools/lms', icon: 'fa-book-open-reader' }
        ]
      }
    ]
  },
  {
    key: 'research', label: 'RESEARCH', type: 'columns', cols: 3,
    columns: [
      {
        title: 'Research',
        links: [
          { label: 'About Research', section: 'research', icon: 'fa-lightbulb' },
          { label: 'Research Labs', section: 'research/labs', icon: 'fa-flask' },
          { label: 'Center of Excellence', section: 'research/coe', icon: 'fa-microchip' },
          { label: 'Sponsored Research', section: 'research/sponsored', icon: 'fa-hand-holding-dollar' },
          { label: 'Consultancy Projects', section: 'research/consultancy', icon: 'fa-briefcase' },
          { label: 'Khub', url: 'https://rtrpexpo.vercel.app/', icon: 'fa-globe' },
        ]
      },
      {
        title: 'Output',
        links: [
          { label: 'Publications & Patents', section: 'research/publications', icon: 'fa-file-invoice' },
          { label: 'Publication Policy', section: 'research/policy', icon: 'fa-gavel' },
          { label: 'Publications', section: 'research/publications', icon: 'fa-book-open' },
          { label: 'Patents', section: 'research/patents', icon: 'fa-certificate' },
          { label: 'Code of Ethics', section: 'research/ethics', icon: 'fa-scale-balanced' },
        ]
      },
      {
        title: 'Innovation Tools',
        links: [
          { label: 'Tessellator', section: 'campus/tessellator', icon: 'fa-cube' },
          { label: 'LMS', section: 'campus/lms', icon: 'fa-book-open-reader' },
          { label: 'Teleuniv', section: 'campus/teleuniv', icon: 'fa-tower-broadcast' },
          { label: 'KMIT TV', section: 'campus/kmittv', icon: 'fa-tv' },
          { label: 'ICT', section: 'campus/ict', icon: 'fa-desktop' },
        ]
      }
    ]
  },
  {
    key: 'campus', label: 'INFRASTRUCTURE', type: 'columns', cols: 2,
    columns: [
      {
        title: 'Infrastructure',
        links: [
          { label: 'Overview', section: 'about/campus', icon: 'fa-tree-city' },
          { label: 'Library (Granthalaya)', section: 'campus/library', icon: 'fa-book-open' },
          { label: 'Labs', section: 'campus/labs', icon: 'fa-microchip' },
          { label: 'Sports Facilities', section: 'campus/sports', icon: 'fa-basketball' },
          { label: 'Auditorium', section: 'campus/auditorium', icon: 'fa-masks-theater' },
          { label: 'Classrooms', section: 'campus/classrooms', icon: 'fa-school' },
          { label: 'Accessibility', section: 'campus/accessibility', icon: 'fa-wheelchair' },
        ]
      },
      {
        title: 'Student Life',
        links: [
          { label: 'Co-curriculars', section: 'student-life/co-curricular', icon: 'fa-users' },
          { label: 'Student Council', section: 'student-life/council', icon: 'fa-user-group' },
          { label: 'Clubs', section: 'student-life/clubs', icon: 'fa-chess' },
          { label: 'Street Cause', section: 'student-life/street-cause', icon: 'fa-handshake-angle' },
          { label: 'NSS Events', section: 'student-life/nss', icon: 'fa-flag' },
          { label: 'Annual Events', section: 'student-life/events', icon: 'fa-calendar-check' },
          { label: 'KMIT Parishad', section: 'student-life/parishad', icon: 'fa-university' },
        ]
      }
    ]
  },
  {
    key: 'placements-exams', label: 'EXAMS & PLACEMENTS', type: 'columns', cols: 2,
    columns: [
      {
        title: 'Examinations',
        links: [
          { label: 'Notifications & Results', section: 'exams/notifications', icon: 'fa-bell' },
          { label: 'AEB Staff', section: 'exams/staff', icon: 'fa-address-book' },
          { label: 'Academic Reports', section: 'exams/reports', icon: 'fa-file-chart-line' },
        ]
      },
      {
        title: 'Placements',
        links: [
          { label: 'Placement Cell', section: 'placements/cell', icon: 'fa-building-user' }
        ]
      }
    ]
  },
  {
    key: 'rankings', label: 'RANKINGS', type: 'cards', cols: 1,
    items: [
      { icon: 'fa-shield-check', title: 'IQAC', desc: 'Internal Quality Assurance Cell', section: 'about/accreditations' },
      { icon: 'fa-ranking-star', title: 'NIRF', desc: 'National Institutional Ranking Framework', section: 'rankings/nirf' },
      { icon: 'fa-award', title: 'ARIIA', desc: 'Atal Ranking of Institutions on Innovation Achievements', section: 'rankings/ariia' },
    ]
  }
];

export function DataProvider({ children }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [syncStatus, setSyncStatus] = useState('loading')
  const [lastSyncedAt, setLastSyncedAt] = useState(null)
  const [syncError, setSyncError] = useState(null)

  const pullFromServer = useCallback(async (signal) => {
    try {
      const dbData = await fetchSiteData(signal)
      setData(prev => ({
        ...(prev || {}),
        ...dbData,
        navItems: INITIAL_NAV_ITEMS,
        deptDetails: dbData.deptDetails || (prev ? prev.deptDetails : null)
      }))
      setSyncStatus('live')
      setSyncError(null)
      setLastSyncedAt(Date.now())
      setLoading(false)
      return true
    } catch (err) {
      if (err?.name === 'AbortError') return false
      setSyncError(err?.message || 'Connection failed')
      setSyncStatus('offline')
      setLoading(false)
      return false
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    const ctrl = new AbortController()

    const run = async () => {
      await pullFromServer(ctrl.signal)
      if (cancelled) return
      // Retry once after StrictMode abort or transient failure
      await new Promise((r) => setTimeout(r, 400))
      if (!cancelled) await pullFromServer()
    }
    run()

    const unsubStream = subscribeSiteDataStream(() => {
      if (!cancelled) pullFromServer()
    })

    const stopPoll = startSiteDataPolling(() => {
      if (!cancelled) pullFromServer()
    })

    return () => {
      cancelled = true
      ctrl.abort()
      unsubStream()
      stopPoll()
    }
  }, [pullFromServer])

  const updateData = async (key, value) => {
    // Optimistic Update
    setData(prev => ({ ...prev, [key]: value }))
    
    // Sync to Server
    try {
      await fetch('/api/data', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ key, value })
      })
    } catch (err) {
      console.error('Failed to sync to MongoDB:', err)
    }
  }

  const deepUpdate = async (path, value) => {
    // Optimistic Update
    setData(prev => {
      const next = { ...prev }
      let target = next
      const keys = path.split('.')
      for (let i = 0; i < keys.length - 1; i++) {
        if (!target[keys[i]]) target[keys[i]] = {}
        target[keys[i]] = Array.isArray(target[keys[i]]) ? [...target[keys[i]]] : { ...target[keys[i]] }
        target = target[keys[i]]
      }
      target[keys[keys.length - 1]] = value
      return next
    })

    // Sync to Server
    try {
      await fetch('/api/data/deep', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ path, value })
      })
    } catch (err) {
      console.error('Deep sync failed:', err)
    }
  }

  const resetData = async () => {
    if (!confirm('This will wipe all custom changes and reset the site. Proceed?')) return

    try {
      const res = await fetch('/api/data/reset', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getToken()}` }
      })
      const result = await res.json()
      if (result.success) {
        setData(prev => ({
          ...prev,
          ...result.data,
          navItems: INITIAL_NAV_ITEMS,
          deptDetails: result.data.deptDetails || prev.deptDetails || INITIAL_DATA.deptDetails
        }))
        alert('Site data reset to origin default.')
      }
    } catch (err) {
      console.error('Reset failed:', err)
    }
  }

  if (loading || !data) {
    if (syncStatus === 'offline' || syncError) {
      return (
        <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '15px', fontFamily: 'var(--font-sans)', color: 'var(--navy)' }}>
          <i className="fa-solid fa-cloud-slash fa-3x" style={{ color: '#ef4444' }}></i>
          <h2>Website Unavailable</h2>
          <p style={{ color: '#64748b' }}>Failed to connect to the server.</p>
          <button onClick={() => window.location.reload()} style={{ padding: '10px 24px', background: 'var(--navy)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>Retry Connection</button>
        </div>
      )
    }
    return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '15px', fontFamily: 'var(--font-sans)', color: 'var(--navy)' }}>
        <i className="fa-solid fa-spinner fa-spin fa-3x" style={{ color: '#F17F08' }}></i>
        <h2>Loading KMIT...</h2>
      </div>
    )
  }

  return (
    <DataContext.Provider value={{
      data,
      loading,
      syncStatus,
      syncError,
      lastSyncedAt,
      updateData,
      deepUpdate,
      resetData,
      refreshData: () => pullFromServer(),
    }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)
