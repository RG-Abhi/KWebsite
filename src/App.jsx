import { useState, useEffect, useRef, useMemo, Suspense, lazy } from 'react'
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import NotFoundPage from './components/NotFoundPage'
import Header from './components/Header'
import Ticker from './components/Ticker'
import HeroSlider from './components/HeroSlider'
import StatsBar from './components/StatsBar'
import WelcomeSection from './components/WelcomeSection'
import EventsSection from './components/EventsSection'
import WhyChooseSection from './components/WhyChooseSection'
import ExploreSection from './components/ExploreSection'
import DeptSection from './components/DeptSection'
import InfiniteAchievements from './components/InfiniteAchievements'
import TestimonialsSection from './components/TestimonialsSection'
import CampusVideoSection from './components/CampusVideoSection'

import Footer from './components/Footer'
import MobileTabBar from './components/MobileTabBar'
import StudentQuickAccess from './components/StudentQuickAccess'
import PageLoader from './components/PageLoader'
import StickyContextualCTA from './components/StickyContextualCTA'

import ScrollReveal from './components/ScrollReveal'
import { DataProvider } from './context/websiteData'
import { verifyToken } from './services/authService'
import * as Pages from './routes/lazyPages'

const LoginPage = lazy(() => import('./components/admin/LoginPage'))
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'))

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null)
  useEffect(() => {
    verifyToken().then(valid => setIsAuth(valid))
  }, [])
  if (isAuth === null) return <PageLoader />
  return isAuth ? children : <Navigate to="/login" />
}

function Lazy({ children }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>
}

function HomePage({ onNavigate }) {
  return (
    <div id="home-content">
      <HeroSlider onNavigate={onNavigate} />
      <StudentQuickAccess />
      <StatsBar />
      <ScrollReveal animation="fade-up"><WelcomeSection onNavigate={onNavigate} /></ScrollReveal>
      <EventsSection onNavigate={onNavigate} />
      <WhyChooseSection onNavigate={onNavigate} />
      <ExploreSection onNavigate={onNavigate} />
      <DeptSection />
      <InfiniteAchievements />
      <TestimonialsSection />
      <CampusVideoSection />
    </div>
  )
}

function MainLayout() {
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const contentRef = useRef(null)
  const activeSection = useMemo(() => {
    const pathParts = location.pathname.split('/').filter(Boolean)
    if (pathParts.length === 0) return ''

    const firstToken = pathParts[0].toLowerCase()
    const secondToken = pathParts[1] ? pathParts[1].toLowerCase() : ''

    // 1. Departments vs Academics
    if (firstToken === 'academics') {
      const DEPARTMENTS = ['cse', 'it', 'csm', 'csd', 'hs']
      if (DEPARTMENTS.includes(secondToken)) {
        return 'departments'
      }
      return 'academics'
    }

    // 2. About US
    if (firstToken === 'about') {
      return 'about'
    }

    // 3. Administration
    if (firstToken === 'administration') {
      return 'administration'
    }

    // 4. Admissions
    if (firstToken === 'admissions') {
      return 'admissions'
    }

    // 5. Research & Innovation Tools
    if (firstToken === 'research') {
      return 'research'
    }
    if (firstToken === 'campus' && ['tessellator', 'lms', 'teleuniv', 'kmittv', 'ict'].includes(secondToken)) {
      return 'research'
    }

    // 6. Campus & Infrastructure
    if (['campus', 'infrastructure', 'student-life', 'uniqueness'].includes(firstToken)) {
      return 'campus'
    }

    // 7. Exams & Placements
    if (['exams', 'examination', 'placements'].includes(firstToken)) {
      return 'placements-exams'
    }

    // 8. Rankings
    if (firstToken === 'rankings') {
      return 'rankings'
    }

    // 9. Tools
    if (firstToken === 'tools') {
      return 'tools'
    }

    return firstToken
  }, [location.pathname])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50 || !!activeSection)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [activeSection])

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    const run = () => {
      document.querySelectorAll('.fade-in-up:not(.visible)').forEach(el => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.92) el.classList.add('visible')
      })
    }
    const t = requestAnimationFrame(run)
    return () => cancelAnimationFrame(t)
  }, [location.pathname])

  // Route-change fade animation — no Suspense remount
  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    el.classList.remove('page-transition-wrap')
    void el.offsetWidth // force reflow
    el.classList.add('page-transition-wrap')
  }, [location.key])

  const handleNavigate = (section) => {
    navigate(`/${section}`)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <>

      <div className="mobile-menu-overlay" id="mobile-overlay" />
      <Header scrolled={scrolled} activeSection={activeSection} onNavigate={handleNavigate} />
      <Ticker scrolled={scrolled} />
      <Lazy>
        <Pages.ChatbotWidget />
      </Lazy>
      <StickyContextualCTA />

      <div className={activeSection ? 'spa-view' : ''} ref={contentRef}>
        <ErrorBoundary>
          <Lazy>
            <Routes>
              <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />

              <Route path="/leadership" element={<Navigate to="/about/management" replace />} />
              <Route path="/administration" element={<Navigate to="/about/management" replace />} />
              <Route path="/administration/management" element={<Navigate to="/about/management" replace />} />
              <Route path="/administration/principal" element={<Pages.PrincipalPage />} />
              <Route path="/administration/academic-director" element={<Pages.DirectorPage />} />
              <Route path="/administration/hod" element={<Pages.HODPage />} />
              <Route path="/administration/academic-core-committee" element={<Pages.ACCPage />} />
              <Route path="/administration/iic" element={<Pages.IICPage />} />
              <Route path="/administration/innovation-council" element={<Pages.IICPage />} />
              <Route path="/administration/committees" element={<Pages.CommitteesPage />} />
              <Route path="/administration/idmc" element={<Pages.IDMCPage />} />

              <Route path="/about/leadership" element={<Navigate to="/administration/management" replace />} />
              <Route path="/about/director-academic" element={<Navigate to="/administration/academic-director" replace />} />
              <Route path="/admin/hods" element={<Navigate to="/administration/hod" replace />} />
              <Route path="/admin/academic-core" element={<Navigate to="/administration/academic-core-committee" replace />} />
              <Route path="/admin/iic" element={<Navigate to="/administration/innovation-council" replace />} />
              <Route path="/admin/committees" element={<Navigate to="/administration/committees" replace />} />
              <Route path="/initiatives/alumni" element={<Navigate to="/student-life/parishad" replace />} />
              <Route path="/initiatives/alumni.php" element={<Navigate to="/student-life/parishad" replace />} />
              <Route path="/initiatives/nssevents" element={<Navigate to="/student-life/nss" replace />} />
              <Route path="/initiatives/nssevents.php" element={<Navigate to="/student-life/nss" replace />} />
              <Route path="/initiatives/annualevents" element={<Navigate to="/student-life/events" replace />} />
              <Route path="/initiatives/annualevents.php" element={<Navigate to="/student-life/events" replace />} />
              <Route path="/initiatives/clubs" element={<Navigate to="/student-life/clubs" replace />} />
              <Route path="/initiatives/clubs.php" element={<Navigate to="/student-life/clubs" replace />} />
              <Route path="/initiatives/cocurriculars" element={<Navigate to="/student-life/co-curricular" replace />} />
              <Route path="/initiatives/cocurriculars.php" element={<Navigate to="/student-life/co-curricular" replace />} />
              <Route path="/initiatives/studentcouncil" element={<Navigate to="/student-life/council" replace />} />
              <Route path="/initiatives/studentcouncil.php" element={<Navigate to="/student-life/council" replace />} />
              <Route path="/initiatives/streetcause" element={<Navigate to="/student-life/street-cause" replace />} />
              <Route path="/initiatives/streetcause.php" element={<Navigate to="/student-life/street-cause" replace />} />

              <Route path="/about" element={<Pages.AboutPage />} />
              <Route path="/about/kmes" element={<Pages.KMESPage />} />
              <Route path="/about/management" element={<Pages.ManagementPage />} />
              <Route path="/about/principal" element={<Navigate to="/administration/principal" replace />} />
              <Route path="/about/vision" element={<Pages.DynamicPage pageKey="about/vision" />} />
              <Route path="/about/campus" element={<Pages.CampusPage />} />
              <Route path="/iqac" element={<Navigate to="/about/accreditations" replace />} />
              <Route path="/iqac.php" element={<Navigate to="/about/accreditations" replace />} />
              <Route path="/about/accreditations" element={<Pages.IQACPage />} />
              <Route path="/about/hr-policy" element={<Pages.HRPolicyPage />} />
              <Route path="/about/perspective-plan" element={<Pages.PerspectivePlanPage />} />

              <Route path="/academics" element={<Pages.AcademicsPage />} />
              <Route path="/academics/evaluation" element={<Pages.TeachingLearningEvaluationPage />} />
              <Route path="/academics/calendar" element={<Pages.DynamicPage pageKey="academics/calendar" />} />
              <Route path="/academics/syllabus" element={<Pages.DynamicPage pageKey="academics/syllabus" />} />
              <Route path="/academics/regulations" element={<Pages.DynamicPage pageKey="academics/regulations" />} />
              <Route path="/academics/value-added" element={<Pages.DynamicPage pageKey="academics/value-added" />} />
              <Route path="/academics/awards" element={<Pages.DynamicPage pageKey="academics/awards" />} />
              <Route path="/academics/research" element={<Pages.DynamicPage pageKey="academics/research" />} />
              <Route path="/academics/:deptKey" element={<Pages.DeptDetailPage />} />
              <Route path="/academics/:deptKey/:tabId" element={<Pages.DeptDetailPage />} />

              <Route path="/admissions" element={<Navigate to="/admissions/coursesoffered" replace />} />
              <Route path="/admissions/coursesoffered" element={<Pages.CoursesOfferedPage />} />
              <Route path="/admissions/admission-procedure" element={<Pages.AdmissionProcedurePage />} />
              <Route path="/admissions/eapcet-ranks" element={<Pages.EapcetRanksPage />} />
              <Route path="/admissions/ecet-ranks" element={<Pages.EcetRanksPage />} />
              <Route path="/rankings/nirf" element={<Pages.NirfPage />} />
              <Route path="/rankings/ariia" element={<Pages.AriiaPage />} />
              <Route path="/admissions/eligibility" element={<Navigate to="/admissions/admission-procedure" replace />} />
              <Route path="/admissions/fees" element={<Pages.DynamicPage pageKey="admissions/fees" />} />
              <Route path="/admissions/faq" element={<Pages.DynamicPage pageKey="admissions/faq" />} />
              <Route path="/admissions/scholarships" element={<Pages.DynamicPage pageKey="admissions/scholarships" />} />

              <Route path="/placements" element={<Pages.PlacementsPage />} />
              <Route path="/placements/placement" element={<Pages.PlacementsPage />} />
              <Route path="/placements/placement.php" element={<Pages.PlacementsPage />} />
              <Route path="/placements/stats" element={<Navigate to="/placements" replace />} />
              <Route path="/placements/recruiters" element={<Navigate to="/placements" replace />} />
              <Route path="/placements/training" element={<Navigate to="/placements" replace />} />
              <Route path="/placements/genesis" element={<Navigate to="/placements" replace />} />
              <Route path="/placements/:year" element={<Navigate to="/placements" replace />} />

              <Route path="/student-life" element={<Navigate to="/student-life/co-curricular" replace />} />
              <Route path="/student-life/events" element={<Pages.AnnualEventsPage />} />
              <Route path="/student-life/finishing-school" element={<Navigate to="/student-life/co-curricular#finishing-school" replace />} />
              <Route path="/student-life/project-school" element={<Navigate to="/student-life/co-curricular#project-school" replace />} />
              <Route path="/student-life/achievements" element={<Pages.DynamicPage pageKey="student-life/achievements" />} />
              <Route path="/student-life/co-curricular" element={<Pages.CoCurricularsPage />} />
              <Route path="/student-life/council" element={<Pages.StudentCouncilPage />} />
              <Route path="/student-life/clubs" element={<Pages.ClubsPage />} />
              <Route path="/student-life/street-cause" element={<Pages.StreetCausePage />} />
              <Route path="/student-life/nss" element={<Pages.NSSEventsPage />} />
              <Route path="/student-life/parishad" element={<Pages.ParishadPage />} />

              <Route path="/campus/library" element={<Pages.LibraryPage />} />
              <Route path="/infrastructure/library" element={<Pages.LibraryPage />} />
              <Route path="/campus/sports" element={<Pages.SportsPage />} />
              <Route path="/infrastructure/sports" element={<Pages.SportsPage />} />
              <Route path="/campus/accessibility" element={<Pages.AccessibilityPage />} />
              <Route path="/infrastructure/accessibility" element={<Pages.AccessibilityPage />} />
              <Route path="/campus/auditorium" element={<Pages.AuditoriumPage />} />
              <Route path="/infrastructure/auditorium" element={<Pages.AuditoriumPage />} />
              <Route path="/campus/classrooms" element={<Pages.ClassroomsPage />} />
              <Route path="/infrastructure/classroom" element={<Pages.ClassroomsPage />} />
              <Route path="/campus/tessellator" element={<Pages.TessellatorPage />} />
              <Route path="/uniqueness/tessellator" element={<Pages.TessellatorPage />} />
              <Route path="/campus/lms" element={<Pages.LMSPage />} />
              <Route path="/uniqueness/lms" element={<Pages.LMSPage />} />
              <Route path="/campus/teleuniv" element={<Pages.TeleunivPage />} />
              <Route path="/uniqueness/teleuniv" element={<Pages.TeleunivPage />} />
              <Route path="/campus/kmittv" element={<Pages.KMITTVPage />} />
              <Route path="/uniqueness/kmittv" element={<Pages.KMITTVPage />} />
              <Route path="/campus/ict" element={<Pages.ICTPage />} />
              <Route path="/uniqueness/ict" element={<Pages.ICTPage />} />

              {/* Fallback redirects for older cached menu links */}
              <Route path="/tools/tessellator" element={<Navigate to="/campus/tessellator" replace />} />
              <Route path="/tools/lms" element={<Navigate to="/campus/lms" replace />} />
              <Route path="/tools/teleuniv" element={<Navigate to="/campus/teleuniv" replace />} />
              <Route path="/tools/tv" element={<Navigate to="/campus/kmittv" replace />} />
              <Route path="/tools/ict" element={<Navigate to="/campus/ict" replace />} />

              <Route path="/exams/notifications" element={<Pages.ExamsPage />} />
              <Route path="/examination/exam" element={<Pages.ExamsPage />} />
              <Route path="/examination/exam.php" element={<Pages.ExamsPage />} />
              <Route path="/exams/staff" element={<Pages.AEBStaffPage />} />
              <Route path="/examination/aebstaff" element={<Pages.AEBStaffPage />} />
              <Route path="/examination/aebstaff.php" element={<Pages.AEBStaffPage />} />
              <Route path="/exams/contact" element={<Pages.ExamsContactPage />} />
              <Route path="/examination/contact_exam" element={<Pages.ExamsContactPage />} />
              <Route path="/examination/contact_exam.php" element={<Pages.ExamsContactPage />} />
              <Route path="/exams/reports" element={<Pages.AcademicReportsPage />} />
              <Route path="/examination/academicreport" element={<Pages.AcademicReportsPage />} />
              <Route path="/examination/academicreport.php" element={<Pages.AcademicReportsPage />} />

              <Route path="/contact" element={<Pages.ContactPage />} />

              <Route path="/research" element={<Pages.ResearchPage />} />
              <Route path="/research/research.php" element={<Pages.ResearchPage />} />
              <Route path="/research/labs" element={<Pages.ResearchLabsPage />} />
              <Route path="/research/incubationcenter.php" element={<Pages.ResearchLabsPage />} />
              <Route path="/research/biomedicalimaging" element={<Pages.ResearchLabsPage />} />
              <Route path="/research/biomedicalimaging.php" element={<Pages.ResearchLabsPage />} />
              <Route path="/research/bioinformatics" element={<Pages.ResearchLabsPage />} />
              <Route path="/research/bioinformatics.php" element={<Pages.ResearchLabsPage />} />
              <Route path="/research/cfd" element={<Pages.ResearchLabsPage />} />
              <Route path="/research/cfd.php" element={<Pages.ResearchLabsPage />} />
              <Route path="/research/iot" element={<Pages.ResearchLabsPage />} />
              <Route path="/research/iot.php" element={<Pages.ResearchLabsPage />} />
              <Route path="/research/coe" element={<Pages.ResearchCoEPage />} />
              <Route path="/research/coe/nvidia" element={<Pages.ResearchCoEPage />} />
              <Route path="/research/coe/virtusa" element={<Pages.ResearchCoEPage />} />
              <Route path="/research/researchlabs.php" element={<Pages.ResearchCoEPage />} />
              <Route path="/research/sponsored" element={<Pages.ResearchSponsoredPage />} />
              <Route path="/research/sponsoredresearch.php" element={<Pages.ResearchSponsoredPage />} />
              <Route path="/research/consultancy" element={<Pages.ResearchConsultancyPage />} />
              <Route path="/research/consultancyprojects.php" element={<Pages.ResearchConsultancyPage />} />
              <Route path="/research/policy" element={<Pages.ResearchPolicyPage />} />
              <Route path="/research/committee" element={<Pages.ResearchCommitteePage />} />
              <Route path="/research/ethics" element={<Pages.ResearchEthicsPage />} />
              <Route path="/research/list-publications" element={<Pages.ResearchPublicationsListPage />} />
              <Route path="/research/publications" element={<Pages.ResearchPublicationsListPage />} />
              <Route path="/research/list-patents" element={<Pages.ResearchPatentsPage />} />
              <Route path="/research/patents" element={<Pages.ResearchPatentsPage />} />
              <Route path="/research/reimbursement" element={<Pages.ResearchReimbursementPage />} />

              <Route path="/:category/:pageKey" element={<Pages.DynamicPage />} />

              {/* 404 catch-all */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Lazy>
        </ErrorBoundary>
      </div>

      <Footer onNavigate={handleNavigate} />
      <MobileTabBar onNavigate={handleNavigate} />
    </>
  )
}

export default function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path="/login" element={<Lazy><LoginPage /></Lazy>} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <Lazy><AdminDashboard /></Lazy>
          </ProtectedRoute>
        } />
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </DataProvider>
  )
}
