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

// ─── MASTER DATA ─────────────────────────────────────────────────────────────
const INITIAL_DATA = {
  version: 'KMIT_v15_RESEARCH',
  navItems: INITIAL_NAV_ITEMS,

  // Ticker announcements
  announcements: [
    "🎓 B.Tech Admissions are conducted via TS EAPCET / ECET web counselling.",
    "⚡ Genesis Finishing School Batches Commence Next Week.",
    "🏆 KMIT Students Win First Prize at National Level Hackathon.",
    "🔬 New AI & Data Science Research Labs Inaugurated.",
    "📊 KMIT Ranks No.1 in SWAYAM NPTEL across India for second consecutive year.",
    "🚀 4 KMIT Students selected for Google Summer of Code (GSoC) 2025!",
    "🏆 Team ASHTOJ wins the Smart India Hackathon (SIH) 2025 Grand Finale.",
  ],

  // All 8 hero slides using local fallback images
  heroSlides: [
    { src: '/photos/banner/SIH-Winners_2025.jpg', alt: 'Congratulations to Team ASHTOJ for winning SIH 2025!', unsplash: '/photos/banner/SIH-Winners_2025.jpg' },
    { src: '/photos/banner/Smart-India-Hackathon-2025.jpg', alt: 'Smart India Hackathon 2025', unsplash: '/photos/banner/Smart-India-Hackathon-2025.jpg' },
    { src: '/photos/banner/24-hours-hacakthon-2025.jpg', alt: '24 Hours Hackathon 2025', unsplash: '/photos/banner/24-hours-hacakthon-2025.jpg' },
    { src: '/photos/banner/Hyderabad%20Entrepreneurship%20Summit%202025.jpg', alt: 'Hyderabad Entrepreneurship Summit 2025', unsplash: '/photos/banner/Hyderabad%20Entrepreneurship%20Summit%202025.jpg' },
    { src: "/photos/banner/Navraas'25.jpg", alt: 'Navraas 2025', unsplash: "/photos/banner/Navraas'25.jpg" },
    { src: '/photos/banner/Independence-day-celebrations-2025.jpg', alt: 'INDEPENDENCE DAY CELEBRATIONS 2025', unsplash: '/photos/banner/Independence-day-celebrations-2025.jpg' },
    { src: '/photos/banner/Gradution-Day-2025.jpg', alt: 'Graduation Day 2025', unsplash: '/photos/banner/Gradution-Day-2025.jpg' },
    { src: '/photos/banner/prakalp%202025%20project%20expo-min.png', alt: 'Prakalp 2025 Project Expo', unsplash: '/photos/banner/prakalp%202025%20project%20expo-min.png' },
  ],

  // Stats bar — matches original index.html exactly
  stats: [
    { label: 'Placement Rate',    value: 95,  display: '95%+', color: 'red',   icon: 'fa-graduation-cap',    animate: true,  suffix: '%+' },
    { label: 'Highest Package',   value: 122, display: '1.22 Cr', color: 'gold', icon: 'fa-indian-rupee-sign', animate: false, suffix: ' Cr' },
    { label: 'Top Recruiters',    value: 350, display: '350+', color: 'blue',  icon: 'fa-building',          animate: true,  suffix: '+' },
    { label: 'Years of Legacy',   value: 19,  display: '19+',  color: 'green', icon: 'fa-calendar-days',     animate: false, suffix: '+' },
  ],

  // Notice board — matches original index.html
  noticeBoard: {
    latest: [
      { date: 'March 25, 2025', title: 'B.Tech Admissions 2025: Application process guide now available on student portal.' },
      { date: 'March 22, 2025', title: 'Quality Policy: Annual academic audit scheduled for next week.' },
      { date: 'March 20, 2025', title: 'Expert talk on Generative AI by industry leaders this Friday.' },
      { date: 'March 18, 2025', title: 'KMIT Wins NPTEL SWAYAM Best Institute award for the 2nd consecutive year.' },
    ],
    exams: [
      { date: 'March 15, 2025', title: 'Semester End Examination Time Table — Final Year B.Tech now released.' },
      { date: 'March 12, 2025', title: 'Internal assessment schedule for III Year students published.' },
    ],
    placements: [
      { date: 'March 10, 2025', title: 'Record placement season: 50+ students placed in Amazon this month alone.' },
      { date: 'March 5, 2025',  title: 'Microsoft visits KMIT campus — 12 students selected with 18 LPA packages.' },
    ]
  },
  homeContent: {
    welcome: {
      eyebrow: 'Our Heritage',
      title: 'Welcome to Keshav Memorial <em>Institute of Technology</em>',
      text: 'Keshav Memorial Institute of Technology (KMIT), established in 2007, is one of the premier engineering colleges in Telangana. KMIT is sponsored by Keshav Memorial Education Society (KMES) — well known in Hyderabad for over 70 years of educational excellence.\n\nKMIT is co-promoted and powered by Genesis Solutions Pvt. Ltd., a premier institute imparting industry-focused software training in emerging technologies.'
    },
    whyChoose: {
      eyebrow: 'Academic Excellence',
      title: 'WHY CHOOSE KMIT',
      text: 'A legacy of innovation, industry-focused learning, and unmatched placement success tailored for the next generation of engineers.'
    },
    recruiters: {
      title: 'Our Top Recruiters',
      text: 'KMIT students are consistently recruited by global technology leaders and Fortune 500 companies.'
    }
  },

  whyChoose: [
    {
      i: 1, cls: 'tile-large grad-crimson', icon: 'fa-building-columns',
      title: 'NAAC A Grade', desc: 'Top national accreditation for educational excellence and quality.',
      section: 'about/accreditations',
      unsplash: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
      local: '/photos/annualevents/patang_2026.webp'
    },
    {
      i: 2, cls: 'grad-gold', icon: 'fa-ranking-star',
      title: 'NIRF Ranked', desc: 'Among top institutes in India.',
      section: 'about/accreditations',
      unsplash: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
      local: '/photos/annualevents/Orientation_day_25.webp'
    },
    {
      i: 3, cls: 'grad-graphite', icon: 'fa-book',
      title: 'IQAC Quality', desc: 'Continuous improvement systems.',
      section: 'about/accreditations',
      unsplash: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
      local: '/photos/research/bcw.webp'
    },
    {
      i: 4, cls: 'tile-wide grad-navy', icon: 'fa-award',
      title: 'NBA Accredited', desc: 'Global engineering standards in technical education.',
      section: 'about/accreditations',
      unsplash: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80',
      local: '/photos/annualevents/patang_2025.webp'
    },
    {
      i: 5, cls: 'tile-tall grad-purple', icon: 'fa-rocket',
      title: 'UDAAN R&D', desc: 'Research driven learning and innovation center.',
      section: 'research',
      unsplash: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
      local: '/photos/research/AICUDA.jpeg'
    },
    {
      i: 6, cls: 'grad-navy', icon: 'fa-microchip',
      title: 'COE Excellence', desc: 'Advanced technologies and specialized labs.',
      section: 'research/coe',
      unsplash: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
      local: '/photos/research/Blockchain_Tech_Webinar.png'
    },
    {
      i: 7, cls: 'tile-wide grad-green', icon: 'fa-lightbulb',
      title: 'Innovation Cell', desc: 'Creative problem solving culture.',
      section: 'administration/innovation-council',
      unsplash: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
      local: '/photos/annualevents/prakalp_expo.webp'
    },
    {
      i: 8, cls: 'grad-crimson', icon: 'fa-handshake',
      title: 'Industry Cell', desc: 'Strong global industry connections.',
      section: 'administration/innovation-council',
      unsplash: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
      local: '/photos/annualevents/Independence_Day_25.webp'
    },
    {
      i: 9, cls: 'tile-large grad-gold', icon: 'fa-briefcase',
      title: '90%+ Placements', desc: 'Consistent career success with global tech leaders.',
      section: 'placements',
      unsplash: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      local: '/photos/hero/Screenshot%202026-03-28%20003423.png'
    },
    {
      i: 10, cls: 'grad-purple', icon: 'fa-graduation-cap',
      title: 'Finishing School', desc: 'Industry-ready skill development.',
      modalKey: 'FINISHING SCHOOL',
      unsplash: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
      local: '/photos/hero/Screenshot%202026-03-28%20003236.png'
    },
    {
      i: 11, cls: 'tile-tall grad-green', icon: 'fa-laptop-code',
      title: 'Project School', desc: 'Real-world engineering project experience.',
      modalKey: 'PROJECT SCHOOL',
      unsplash: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
      local: '/photos/hero/Screenshot%202026-03-28%20003333.png'
    },
    {
      i: 12, cls: 'tile-wide grad-graphite', icon: 'fa-certificate',
      title: 'BEC Cambridge', desc: 'Global professional communication skills.',
      section: 'academics/value-added',
      unsplash: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80',
      local: '/photos/annualevents/Saanjh_25.webp'
    }
  ],

  // Explore KMIT — 6 cards matching original index.html
  explore: [
    {
      icon: 'fa-user-graduate', title: 'Admissions',
      desc: 'Explore our highly sought-after B.Tech programmes and admission process.',
      section: 'admissions',
      unsplash: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80',
      local: '/photos/annualevents/Orientation_day_25.webp'
    },
    {
      icon: 'fa-laptop-file', title: 'Tessellator',
      desc: "KMIT's advanced Learning Management System empowering digital education.",
      section: 'campus/tessellator',
      unsplash: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
      local: '/photos/hero/Screenshot%202026-03-28%20003333.png'
    },
    {
      icon: 'fa-medal', title: 'Scholarships',
      desc: 'Financial aid and merit-based awards to support outstanding students.',
      section: 'admissions/scholarships',
      unsplash: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80',
      local: '/photos/annualevents/Graduation_day_25.webp'
    },
    {
      icon: 'fa-users', title: 'Club Activities',
      desc: 'Technical and cultural student chapters fostering innovation and leadership.',
      section: 'student-life',
      unsplash: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80',
      local: '/photos/annualevents/Dandiya_night_25.webp'
    },
    {
      icon: 'fa-book-open-reader', title: 'Academic Enhancement',
      desc: 'Specialized tutoring, finishing schools, and extra academic support.',
      section: 'academics',
      unsplash: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80',
      local: '/photos/hero/Screenshot%202026-03-28%20003236.png'
    },
    {
      icon: 'fa-clipboard-check', title: 'IQAC',
      desc: 'Internal Quality Assurance Cell ensuring continuous academic excellence.',
      section: 'about/accreditations',
      unsplash: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
      local: '/photos/research/bcw.webp'
    },
  ],

  // Departments homepage section — 4 cards with Unsplash images exactly as original
  departments: [
    {
      badge: 'CSE',
      title: 'Computer Science & Engineering',
      img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
      section: 'academics/cse',
      desc: 'Focused on coding excellence and core software engineering principles with an emphasis on industry readiness.'
    },
    {
      badge: 'CSE AI&ML',
      title: 'CSE — Artificial Intelligence & ML',
      img: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=600&q=80',
      section: 'academics/csm',
      desc: 'Mastering the future of intelligence through deep learning, neural networks and data science.'
    },
    {
      badge: 'CSE DS',
      title: 'CSE — Data Science',
      img: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80',
      section: 'academics/csd',
      desc: 'Driving insights from massive datasets and transforming information into technological innovation.'
    },
    {
      badge: 'IT',
      title: 'Information Technology',
      img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      section: 'academics/it',
      desc: 'Managing information systems and the full software lifecycle from architecture to deployment.'
    },
  ],

  // Recruiters — full list from original index.html for both marquee rows
  recruiters: {
    fwd: [
      'google.com', 'microsoft.com', 'amazon.com', 'adobe.com',
      'salesforce.com', 'intuit.com', 'cisco.com', 'goldmansachs.com',
      'infosys.com', 'wipro.com', 'tcs.com', 'cognizant.com',
      'accenture.com', 'deloitte.com', 'capgemini.com', 'techmahindra.com'
    ],
    rev: [
      'virtusa.com', 'zensar.com', 'ibm.com', 'oracle.com', 'sap.com',
      'epam.com', 'hexaware.com', 'mphasis.com', 'ltimindtree.com',
      'persistent.com', 'mindtree.com', 'paypal.com', 'qualcomm.com',
      'nokia.com', 'samsung.com', 'publicissapient.com'
    ],
    names: {
      'google.com': 'Google', 'microsoft.com': 'Microsoft', 'amazon.com': 'Amazon',
      'adobe.com': 'Adobe', 'salesforce.com': 'Salesforce', 'intuit.com': 'Intuit',
      'cisco.com': 'Cisco', 'goldmansachs.com': 'Goldman Sachs', 'infosys.com': 'Infosys',
      'wipro.com': 'Wipro', 'tcs.com': 'TCS', 'cognizant.com': 'Cognizant',
      'accenture.com': 'Accenture', 'deloitte.com': 'Deloitte', 'capgemini.com': 'Capgemini',
      'techmahindra.com': 'Tech Mahindra', 'virtusa.com': 'Virtusa', 'zensar.com': 'Zensar',
      'ibm.com': 'IBM', 'oracle.com': 'Oracle', 'sap.com': 'SAP', 'epam.com': 'EPAM',
      'hexaware.com': 'Hexaware', 'mphasis.com': 'Mphasis', 'ltimindtree.com': 'LTIMindtree',
      'persistent.com': 'Persistent', 'mindtree.com': 'Mindtree', 'paypal.com': 'PayPal',
      'qualcomm.com': 'Qualcomm', 'nokia.com': 'Nokia', 'samsung.com': 'Samsung',
      'publicissapient.com': 'Publicis Sapient'
    }
  },

  // Site metadata (used by Footer)
  siteMeta: {
    name: 'KMIT',
    fullName: 'Keshav Memorial Institute of Technology',
    location: '3-5-1026, Narayanaguda, Hyderabad — 500 029',
    phone: '040-23261407',
    email: 'info@kmit.in',
    ctaLabel: 'PAY FEES',
    ctaLink: 'https://kmit.in/payfees',
    stats: {
      highestPkg: '54 LPA',
      internationalPkg: '₹1.2 Cr',
      placementRate: '90%+',
      recruiters: '300+'
    }
  },

  // Department detail pages (used by DeptDetailPage)
  deptDetails: {
    cse: {
      code: 'CSE', name: 'Computer Science & Engineering', intake: 420, established: 2007, nba: true,
      desc: 'Focused on coding excellence and core software engineering principles with an emphasis on industry readiness.',
      aboutContent: [
        "The Department of Computer Science and Engineering was established in 2007 with an intake of 60 for Under Graduate Program, enhanced to 120 in 2010-11,enhanced to 180 in 2011-12, enhanced to 300 in 2012 and then to 420 in 2014.",
        "Department is equipped with dedicated and experienced faculty who continuously upgrade their skills under the guidance of the founder Director Neil Gogte, who is one of the stalwarts in Computer Science & Engineering. The department highly encourages Industry Institute Interaction to bridge the gap between Industry and the Institute by fulfilling their expectations in conduction of various workshops for students on latest emerging trends and technologies, which makes the students to explore and undertake challenging tasks confidently. The department has collaboration with reputed Organizations to explore, build, develop and enhance technical skills in trending technologies among faculty and students.",
        "Every year most of the students of CSE Department are placed through campus recruitments in top most software companies like Amazon, Microsoft, SAP Labs, Adobe, Salesforce, Google, Darwin Box, Virtusa, and other reputed organizations. The department has required number of fully equipped and furnished computer labs which facilitates the students to have their active participation and concentration. The department has CSI Institutional Membership for with students & faculty as members. The CSI student Chapter regularly organizes various technical events and workshops in current technologies for the enhancement of student knowledge. The department is also aiming to introduce Masters and Doctoral research programs."
      ],
      coursesOffered: [
        { sno: '1', degree: 'B.Tech', course: 'Computer Science & Engineering (CSE)', intake: '420', management: '126', convenor: '294' }
      ],
      vision: "To be among the region's premier teaching and research Computer Science and Engineering departments producing globally competent and socially responsible graduates in the most conducive academic environment.",
      mission: [
        "To provide faculty with state of the art facilities for continuous professional development and research, both in foundational aspects and of relevance to emerging computing trends.",
        "To impart skills that transform students to develop technical solutions for societal needs and inculcate entrepreneurial talents.",
        "To inculcate an ability in students to pursue the advancement of knowledge in various specializations of Computer Science and Engineering and make them industry-ready.",
        "To engage in collaborative research with academia and industry and generate adequate resources for research activities for seamless transfer of knowledge resulting in sponsored projects and consultancy.",
        "To cultivate responsibility through sharing of knowledge and innovative computing solutions that benefit the society-at-large.",
        "To collaborate with academia, industry and community to set high standards in academic excellence and in fulfilling societal responsibilities."
      ],
      peos: [
        "Graduates will have successful careers in computer related engineering fields or will be able to successfully pursue advanced higher education degrees.",
        "Graduates will try and provide solutions to challenging problems in their profession by applying computer engineering principles.",
        "Graduates will engage in life-long learning and professional development by rapidly adapting changing work environment.",
        "Graduates will communicate effectively, work collaboratively and exhibit high levels of professionalism and ethical responsibility."
      ],
      pos: [
        { title: "Engineering Knowledge", desc: "Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems." },
        { title: "Problem Analysis", desc: "Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences, and engineering sciences." },
        { title: "Design/Development of solutions", desc: "Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for the public health and safety, and the cultural, societal, and environmental considerations." },
        { title: "Conduct Investigations of Complex problems", desc: "Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions." },
        { title: "Modern Tool Usage", desc: "Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modelling to complex engineering activities with an understanding of the limitations." },
        { title: "The Engineer and Society", desc: "Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice." },
        { title: "Environment and Sustainability", desc: "Understand the impact of the professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development." },
        { title: "Ethics", desc: "Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice." },
        { title: "Individual and Team Work", desc: "Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings." },
        { title: "Communication", desc: "Communicate effectively on complex engineering activities with the engineering community and with society at large, such as, being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions." },
        { title: "Project Management and Finance", desc: "Demonstrate knowledge and understanding of the engineering and management principles and apply these to one’s own work, as a member and leader in a team, to manage projects and in multidisciplinary environments." },
        { title: "Life-Long Learning", desc: "Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change." }
      ],
      psos: [
        "An ability to analyze the common business functions to design and develop appropriate Computer Science solutions for social upliftments.",
        "Shall have expertise on the evolving technologies like Python, Machine Learning, Deep Learning, Internet of Things (IOT), Data Science, Full stack development, Social Networks, Cyber Security, Big Data, Mobile Apps, CRM, ERP eetc."
      ],
      highlights: [
        'NBA Accredited Programme', 'Annual Intake: 420 students', 'Established in 2007',
        'State-of-the-art computing labs', 'Dedicated placement cell', 'Active research culture (UDAAN/COE)'
      ],
      specialisations: ['Data Structures & Algorithms', 'Operating Systems', 'Database Management', 'Computer Networks', 'Software Engineering', 'Web Technologies'],
      labs: ['Advanced Computing Lab', 'Software Engineering Lab', 'Open Source Lab', 'AI Studio']
    },
    csm: {
      code: 'CSM', name: 'CSE — AI & Machine Learning', intake: 120, established: 2020, nba: false,
      desc: 'Mastering the future of intelligence through deep learning, neural networks and advanced AI research.',
      aboutContent: [
        "This 4 year undergraduate course of Computer Science & Engineering with specialization in Artificial Intelligence & Machine Learning is designed to make the professional technically sound in advanced learning systems that are based on algorithm of Artificial Intelligence.",
        "KMIT offers a four-year under-graduate B.Tech course in Artificial Intelligence and Machine Learning which aims to develop a strong foundation by using the principles and technologies that consist of many facets of Artificial Intelligence including logic, knowledge representation, probabilistic models, and machine learning. This course is best suited for students seeking to build world-class expertise in Artificial Intelligence and Machine Learning and emerging technologies which help to stand in the crowd and grow careers in the upcoming technological era.",
        "The course is designed to give the students enough exposure to the variety of applications that can be built using techniques covered under this program. They shall be able to apply AI/ML methods, techniques and tools to the applications. The students shall explore the practical components of developing AI apps and platforms. Proficiency in mathematics will thrive, as this degree requires strong problem-solving and analytical skills. They shall be able to acquire the ability to design intelligent solutions for various business problems in a variety of domains and business applications. The students shall be exploring fields such as neural networks, natural language processing, robotics, deep learning, and computer vision, reasoning and problem-solving. The key objective is to identify logic and reasoning methods from a computational perspective, learn about agent, search, probabilistic models, perception and cognition, and machine learning."
      ],
      vision: "To be among the region's premier teaching and research Computer Science and Engineering departments producing globally competent and socially responsible graduates in the most conducive academic environment.",
      mission: [
        "To provide faculty with state of the art facilities for continuous professional development and research, both in foundational aspects and of relevance to emerging computing trends.",
        "To impart skills that transform students to develop technical solutions for societal needs and inculcate entrepreneurial talents.",
        "To inculcate an ability in students to pursue the advancement of knowledge in various specializations of Computer Science and Engineering and make them industry-ready.",
        "To engage in collaborative research with academia and industry and generate adequate resources for research activities for seamless transfer of knowledge resulting in sponsored projects and consultancy.",
        "To cultivate responsibility through sharing of knowledge and innovative computing solutions that benefit the society-at-large.",
        "To collaborate with academia, industry and community to set high standards in academic excellence and in fulfilling societal responsibilities."
      ],
      peos: [
        "Graduates will have successful careers in computer related engineering fields or will be able to successfully pursue advanced higher education degrees.",
        "Graduates will try and provide solutions to challenging problems in their profession by applying computer engineering principles.",
        "Graduates will engage in life-long learning and professional development by rapidly adapting changing work environment.",
        "Graduates will communicate effectively, work collaboratively and exhibit high levels of professionalism and ethical responsibility."
      ],
      pos: [
        { title: "Engineering Knowledge", desc: "Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems." },
        { title: "Problem Analysis", desc: "Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences, and engineering sciences." },
        { title: "Design/Development of solutions", desc: "Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for the public health and safety, and the cultural, societal, and environmental considerations." },
        { title: "Conduct Investigations of Complex problems", desc: "Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions." },
        { title: "Modern Tool Usage", desc: "Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modelling to complex engineering activities with an understanding of the limitations." },
        { title: "The Engineer and Society", desc: "Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice." },
        { title: "Environment and Sustainability", desc: "Understand the impact of the professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development." },
        { title: "Ethics", desc: "Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice." },
        { title: "Individual and Team Work", desc: "Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings." },
        { title: "Communication", desc: "Communicate effectively on complex engineering activities with the engineering community and with society at large, such as, being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions." },
        { title: "Project Management and Finance", desc: "Demonstrate knowledge and understanding of the engineering and management principles and apply these to one’s own work, as a member and leader in a team, to manage projects and in multidisciplinary environments." },
        { title: "Life-Long Learning", desc: "Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change." }
      ],
      psos: [
        "An ability to analyze the common business functions to design and develop appropriate Computer Science solutions for social upliftments.",
        "Shall have expertise on the evolving technologies like Python, Machine Learning, Deep Learning, Internet of Things (IOT), Data Science, Full stack development, Social Networks, Cyber Security, Big Data, Mobile Apps, CRM, ERP eetc."
      ],
      highlights: [
        'New-age programme launched in 2020', 'Annual Intake: 120 students',
        'Dedicated AI & ML research lab', 'Industry collaboration with tech giants'
      ],
      specialisations: ['Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Computer Vision', 'Reinforcement Learning'],
      labs: ['AI & ML Studio', 'GPU Computing Lab', 'Data Engineering Lab']
    },
    csd: {
      code: 'CSD', name: 'CSE — Data Science', intake: 60, established: 2020, nba: false,
      desc: 'Driving insights from massive datasets and transforming information into technological innovation.',
      aboutContent: [
        "The major goal of this course is to impart knowledge on techniques and theories related to data science which includes statistics, data mining, data warehousing and data visualization.",
        "KMIT offers a four-year under-graduate B.Tech course in Data Science. Data Science continues to evolve as one of the most promising and in-demand career paths. As the world entered the era of big data, handling it was the main challenge and concern for the enterprise industries until 2010. Unlike data in the traditional systems which was mostly structured, today most of the data is unstructured or semi-structured. A Data Scientist, according to Harvard Business Review, \"is a high-ranking professional with the training and curiosity to make discoveries in the world of Big Data\". Therefore it comes as no surprise that Data Scientists are coveted professionals in the Data Analytics and IT industry. With experts predicting that 40 zettabytes of data will be in existence by 2020, Data Science career opportunities will only shoot through the roof! Shortage of skilled professionals in a world which is increasingly turning to data for decision making has also led to the huge demand for Data Scientists in start-ups as well as well-established companies. More than 50,000 jobs in the Data Science and Machine Learning are lying vacant in India, for lack of skilled professionals."
      ],
      vision: "To be among the region's premier teaching and research Computer Science and Engineering departments producing globally competent and socially responsible graduates in the most conducive academic environment.",
      mission: [
        "To provide faculty with state of the art facilities for continuous professional development and research, both in foundational aspects and of relevance to emerging computing trends.",
        "To impart skills that transform students to develop technical solutions for societal needs and inculcate entrepreneurial talents.",
        "To inculcate an ability in students to pursue the advancement of knowledge in various specializations of Computer Science and Engineering and make them industry-ready.",
        "To engage in collaborative research with academia and industry and generate adequate resources for research activities for seamless transfer of knowledge resulting in sponsored projects and consultancy.",
        "To cultivate responsibility through sharing of knowledge and innovative computing solutions that benefit the society-at-large.",
        "To collaborate with academia, industry and community to set high standards in academic excellence and in fulfilling societal responsibilities."
      ],
      peos: [
        "Graduates will have successful careers in computer related engineering fields or will be able to successfully pursue advanced higher education degrees.",
        "Graduates will try and provide solutions to challenging problems in their profession by applying computer engineering principles.",
        "Graduates will engage in life-long learning and professional development by rapidly adapting changing work environment.",
        "Graduates will communicate effectively, work collaboratively and exhibit high levels of professionalism and ethical responsibility."
      ],
      pos: [
        { title: "Engineering Knowledge", desc: "Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems." },
        { title: "Problem Analysis", desc: "Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences, and engineering sciences." },
        { title: "Design/Development of solutions", desc: "Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for the public health and safety, and the cultural, societal, and environmental considerations." },
        { title: "Conduct Investigations of Complex problems", desc: "Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions." },
        { title: "Modern Tool Usage", desc: "Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modelling to complex engineering activities with an understanding of the limitations." },
        { title: "The Engineer and Society", desc: "Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice." },
        { title: "Environment and Sustainability", desc: "Understand the impact of the professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development." },
        { title: "Ethics", desc: "Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice." },
        { title: "Individual and Team Work", desc: "Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings." },
        { title: "Communication", desc: "Communicate effectively on complex engineering activities with the engineering community and with society at large, such as, being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions." },
        { title: "Project Management and Finance", desc: "Demonstrate knowledge and understanding of the engineering and management principles and apply these to one’s own work, as a member and leader in a team, to manage projects and in multidisciplinary environments." },
        { title: "Life-Long Learning", desc: "Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change." }
      ],
      psos: [
        "An ability to analyze the common business functions to design and develop appropriate Computer Science solutions for social upliftments.",
        "Shall have expertise on the evolving technologies like Python, Machine Learning, Deep Learning, Internet of Things (IOT), Data Science, Full stack development, Social Networks, Cyber Security, Big Data, Mobile Apps, CRM, ERP eetc."
      ],
      highlights: [
        'New-age programme launched in 2020', 'Annual Intake: 60 students',
        'Big Data & Analytics focused', 'Real-world dataset projects'
      ],
      specialisations: ['Big Data Analytics', 'Data Visualization', 'Statistical Modelling', 'Cloud Data Platforms', 'Business Intelligence'],
      labs: ['Big Data Lab', 'Analytics Studio', 'Cloud Computing Lab']
    },
    it: {
      code: 'IT', name: 'Information Technology', intake: 120, established: 2007, nba: true,
      desc: 'Managing information systems and the full software lifecycle from architecture to deployment.',
      aboutContent: [
        "The Department of IT at Keshav Memorial Institute of Technology was established in the year 2007 with an intake of 120. The Department focuses on preparing the students for wide range of IT careers. The Department of Information Technology has developed state-of-art labs. The department is accretediated by NBA from 2017.",
        "Department is equipped with dedicated and experienced faculty who continuously upgrade their skills under the guidance of the founder Director Neil Gogte, who is one of the stalwarts in Information Technology. The department highly encourages Industry Institute Interaction to bridge the gap between Industry and the Institute by fulfilling their expectations in conduction of various workshops for students on latest emerging trends and technologies, which makes the students to explore and undertake challenging tasks confidently. The department has collaboration with reputed Organizations to explore, build, develop and enhance technical skills in trending technologies among faculty and students.",
        "Every year most of the students are placed through campus recruitments in top most software companies like Amazon, Microsoft, SAP Labs, Adobe, Salesforce, Google, Darwin Box, Virtusa, and other reputed organizations. The department has required number of fully equipped and furnished computer labs which facilitates the students to have their active participation and concentration. The department has CSI Institutional Membership for with students & faculty as members. The CSI student Chapter regularly organizes various technical events and workshops in current technologies for the enhancement of student knowledge. The department is also aiming to introduce Masters and Doctoral research programs."
      ],
      coursesOffered: [
        { sno: '1', degree: 'B.Tech', course: 'Information Technology (IT)', intake: '120', management: '36', convenor: '84' }
      ],
      vision: "To produce globally competent graduates to meet the modern challenges through contemporary knowledge and moral values committed to build a vibrant nation.",
      mission: [
        "To create an academic environment, which promotes the intellectual and professional development of students and faculty.",
        "To impart skills beyond university prescribed to transform students into a well-rounded IT professional.",
        "To nurture the students to be dynamic, industry ready and to have multidisciplinary skills including e-learning, blended learning and remote testing as an individual and as a team.",
        "To continuously engage in research and projects development, strategic use of emerging technologies to attain self-sustainability."
      ],
      peos: [
        "Graduates will have successful careers in computer related engineering fields or will be able to successfully pursue advanced higher education degrees.",
        "Graduates will try and provide solutions to challenging problems in their profession by applying computer engineering principles.",
        "Graduates will engage in life-long learning and professional development by rapidly adapting changing work environment.",
        "Graduates will communicate effectively, work collaboratively and exhibit high levels of professionalism and ethical responsibility."
      ],
      pos: [
        { title: "Engineering Knowledge", desc: "Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems." },
        { title: "Problem Analysis", desc: "Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences, and engineering sciences." },
        { title: "Design/Development of solutions", desc: "Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for the public health and safety, and the cultural, societal, and environmental considerations." },
        { title: "Conduct Investigations of Complex problems", desc: "Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions." },
        { title: "Modern Tool Usage", desc: "Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modelling to complex engineering activities with an understanding of the limitations." },
        { title: "The Engineer and Society", desc: "Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice." },
        { title: "Environment and Sustainability", desc: "Understand the impact of the professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development." },
        { title: "Ethics", desc: "Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice." },
        { title: "Individual and Team Work", desc: "Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings." },
        { title: "Communication", desc: "Communicate effectively on complex engineering activities with the engineering community and with society at large, such as, being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions." },
        { title: "Project Management and Finance", desc: "Demonstrate knowledge and understanding of the engineering and management principles and apply these to one’s own work, as a member and leader in a team, to manage projects and in multidisciplinary environments." },
        { title: "Life-Long Learning", desc: "Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change." }
      ],
      psos: [
        "An ability to analyze the common business functions to design and develop appropriate Computer Science solutions for social upliftments.",
        "Shall have expertise on the evolving technologies like Python, Machine Learning, Deep Learning, Internet of Things (IOT), Data Science, Full stack development, Social Networks, Cyber Security, Big Data, Mobile Apps, CRM, ERP eetc."
      ],
      highlights: [
        'NBA Accredited Programme', 'Annual Intake: 120 students', 'Established in 2007',
        'Focus on full-stack development', 'Strong cloud & networking curriculum'
      ],
      specialisations: ['Web Technologies', 'Cloud Computing', 'Network Security', 'Database Management', 'Mobile App Development'],
      labs: ['Networking Lab', 'Database Lab', 'Cloud Lab', 'Web Dev Studio']
    },
    hs: {
      code: 'H&S', name: 'Humanities & Sciences', intake: 0, established: 2007, nba: false,
      desc: 'Providing the foundational sciences and communication skills essential for all engineering disciplines.',
      aboutContent: [
        "The Department of Humanities & Science at Keshav Memorial Institute of Technology was established in the year 2007. The current intake is 840, 540 in CSE and 300 in CSM. The department has highly qualified and experienced faculty.",
        "The department of H&S focuses on laying sound foundations through basic sciences and language skills which act as the fulcrum of all advanced learning activities of students of technology."
      ],
      vision: "Producing quality graduates trained in the latest software technologies and related tools and striving to make India a world leader in software products and services.",
      mission: [
        "To create a faculty pool which has a deep understanding and passion for algorithmic thought process.",
        "To impart skills beyond university prescribed to transform students into a well-rounded Computer science professional.",
        "To inculcate an ability in students to pursue Information technology education throughout their lifetime by use of multimodal learning platform including e-learning, blended learning, remote testing and skilling.",
        "Exposure to different domains, paradigms and exposure to the financial and commercial underpinning of the modern business environment through the entrepreneur development cell.",
        "To encourage collaboration with various organizations of repute for research, consultancy and industrial interactions.",
        "To create socially conscious and emotionally mature individuals with awareness on India’s challenges, opportunities, their role and responsibility as engineers towards achieving the goal of job and wealth creation."
      ],
      pos: [
        { title: "Engineering Knowledge", desc: "Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems." },
        { title: "Problem Analysis", desc: "Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences, and engineering sciences." },
        { title: "Design/Development of solutions", desc: "Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for the public health and safety, and the cultural, societal, and environmental considerations." },
        { title: "Conduct Investigations of Complex problems", desc: "Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions." },
        { title: "Modern Tool Usage", desc: "Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modelling to complex engineering activities with an understanding of the limitations." },
        { title: "The Engineer and Society", desc: "Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice." },
        { title: "Environment and Sustainability", desc: "Understand the impact of the professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development." },
        { title: "Ethics", desc: "Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice." },
        { title: "Individual and Team Work", desc: "Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings." },
        { title: "Communication", desc: "Communicate effectively on complex engineering activities with the engineering community and with society at large, such as, being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions." },
        { title: "Project Management and Finance", desc: "Demonstrate knowledge and understanding of the engineering and management principles and apply these to one’s own work, as a member and leader in a team, to manage projects and in multidisciplinary environments." },
        { title: "Life-Long Learning", desc: "Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change." }
      ],
      psos: [
        "An ability to analyze the common business functions to design and develop appropriate Computer Science solutions for social upliftments.",
        "Shall have expertise on the evolving technologies like Mobile Apps, CRM, ERP, Big Data, etc."
      ],
      highlights: [
        'Foundational department for all branches', 'BEC Cambridge English certification',
        'Experienced faculty in Physics, Chemistry & Maths'
      ],
      specialisations: ['Engineering Mathematics', 'Engineering Physics', 'Engineering Chemistry', 'English Communication', 'Environmental Science'],
      labs: [
        {
          title: 'Applied Physics Lab',
          description: 'Focuses on developing scientific temper and exploring diverse technical areas.',
          photoUrl: '/images/facilities/hs/appliedphysicslab.jpg'
        },
        {
          title: 'Engineering Chemistry Lab',
          description: 'Spacious and well-ventilated laboratory with a wide range of modern equipment.',
          photoUrl: '/images/facilities/hs/che2.jpg'
        },
        {
          title: 'English Language Lab',
          description: 'Focuses on the practice of sounds of language in everyday professional situations.',
          photoUrl: '/images/facilities/hs/englishlab.jpg'
        },
        {
          title: 'Engineering Drawing Lab',
          description: 'Conveying information using technical drawing to specify geometry and designs.',
          photoUrl: '/images/facilities/hs/drawing.jpg'
        },
        {
          title: 'Engineering Workshop Lab',
          description: 'Equipped with Machine Shop, Fitting Shop, Foundry, Smithy, Welding and Carpentry.',
          photoUrl: '/images/facilities/hs/WokshopPhoto.jpeg'
        },
        {
          title: 'Advanced Communication Lab',
          description: 'Prepares students for careers requiring them to listen, speak, and write professionally.',
          photoUrl: '/images/facilities/hs/aecslab.jpg'
        }
      ]
    }
  },

  // Placement Archives
  archives: {
    '2025': {
      year: '2024–25', highest: '54 LPA', avg: '8.2 LPA', placed: '92%', companies: 92,
      drives: [
        { company: 'Microsoft', students: '08', pkg: '54 LPA' },
        { company: 'Adobe Systems', students: '02', pkg: '44 LPA' },
        { company: 'Google India', students: '04', pkg: '32 LPA' },
        { company: 'Amazon', students: '15', pkg: '20 LPA' },
        { company: 'Salesforce', students: '06', pkg: '18 LPA' },
        { company: 'Cognizant', students: '40', pkg: '5 LPA' },
        { company: 'Infosys', students: '55', pkg: '4 LPA' },
        { company: 'TCS', students: '62', pkg: '3.5 LPA' },
      ]
    },
    '2024': {
      year: '2023–24', highest: '48 LPA', avg: '7.8 LPA', placed: '88%', companies: 85,
      drives: [
        { company: 'Amazon WOW', students: '12', pkg: '48 LPA' },
        { company: 'Microsoft', students: '06', pkg: '40 LPA' },
        { company: 'Deloitte', students: '20', pkg: '8 LPA' },
        { company: 'Wipro', students: '45', pkg: '4.5 LPA' },
        { company: 'TCS', students: '58', pkg: '3.5 LPA' },
      ]
    },
    '2023': {
      year: '2022–23', highest: '40 LPA', avg: '7 LPA', placed: '85%', companies: 78,
      drives: [
        { company: 'Cisco', students: '05', pkg: '40 LPA' },
        { company: 'Accenture', students: '30', pkg: '7 LPA' },
        { company: 'Capgemini', students: '25', pkg: '5 LPA' },
      ]
    },
    '2022': {
      year: '2021–22', highest: '35 LPA', avg: '6.5 LPA', placed: '82%', companies: 70,
      drives: [
        { company: 'IBM', students: '10', pkg: '35 LPA' },
        { company: 'Tech Mahindra', students: '18', pkg: '6 LPA' },
      ]
    }
  },

  // God Mode: Page data store for admin-editable pages
  pages: {
    'about': {
      hero: { eyebrow: 'About KMIT', title: 'Our Legacy & Vision', text: "Keshav Memorial Institute of Technology, established in 2007, stands as one of Telangana's premier engineering institutions — driven by a mission to produce world-class engineers through innovation, research, and industry-focused education." },
      sections: [
        { type: 'stats', items: [{ label: 'Year Established', value: '2007' }, { label: 'Students Enrolled', value: '4K+' }, { label: 'NAAC Grade', value: 'A' }, { label: 'KMES Legacy', value: '75+' }] },
        { type: 'text', eyebrow: 'Our Story', title: 'A Legacy Built on Excellence', content: ["Keshav Memorial Institute of Technology (KMIT), established in 2007, is one of the premier engineering colleges in the state of Telangana. KMIT is sponsored by Keshav Memorial Education Society (KMES), well known in Hyderabad for the past 75 years.", "KMIT is approved by AICTE, New Delhi, and affiliated to JNTU Hyderabad. It is co-promoted and powered by Genesis Solutions Pvt. Ltd, a premier institute in Hyderabad imparting industry-focused software training and education in emerging technologies."] },
        { type: 'timeline', eyebrow: 'Our Journey', title: 'Key Milestones', items: [
          { year: '2007', title: 'KMIT Established', desc: 'Founded under KMES. Initial intake: CSE (60) and IT (60), affiliated to JNTU Hyderabad.' },
          { year: '2010', title: 'NBA Accreditation', desc: 'CSE and IT programmes received National Board of Accreditation.' },
          { year: '2015', title: 'Autonomous Status', desc: 'KMIT granted autonomous institution status by JNTU Hyderabad and UGC.' },
          { year: '2018', title: "NAAC 'A' Grade", desc: "KMIT accredited by NAAC with the coveted 'A' Grade." },
          { year: '2020', title: 'AI & ML and Data Science Launched', desc: 'New-age programmes CSE (AI & ML) and CSE (Data Science) commenced.' },
          { year: '2023', title: 'SWAYAM NPTEL #1', desc: 'KMIT ranked Number One across India in SWAYAM NPTEL Best Institute category.' },
          { year: '2025', title: 'SIH & GSoC Winners', desc: 'Team ASHTOJ wins Smart India Hackathon. 4 students selected for Google Summer of Code 2025.' }
        ] },
        { type: 'badges', eyebrow: 'Recognition', title: 'Accreditations & Approvals', items: [
          { icon: 'fa-award', title: 'NAAC A Grade', subtitle: 'National Assessment & Accreditation Council' },
          { icon: 'fa-certificate', title: 'NBA', subtitle: 'National Board of Accreditation' },
          { icon: 'fa-ranking-star', title: 'NIRF', subtitle: 'National Institutional Ranking Framework' },
          { icon: 'fa-shield-halved', title: 'IQAC', subtitle: 'Internal Quality Assurance Cell' },
          { icon: 'fa-graduation-cap', title: 'AICTE', subtitle: 'Approved by All India Council for Technical Education' },
          { icon: 'fa-university', title: 'JNTUH', subtitle: 'Affiliated & recognised university' },
        ] }
      ]
    },
    'placements': {
      hero: { eyebrow: 'T&P Cell', title: 'Placement Records', text: 'KMIT has consistently delivered one of the highest placement rates among engineering colleges in Telangana, with industry giants visiting campus year after year.' },
      sections: [
        { type: 'stats', items: [{ label: 'Highest Package', value: '1.22 Cr' }, { label: 'Average Package', value: '8.26 LPA' }, { label: 'Placement Rate', value: '95%+' }, { label: 'Companies Visited', value: '350+' }] },
        { type: 'cards', items: [
          { title: 'Genesis Finishing School', desc: 'A premier program preparing students for lucrative careers in emerging technologies.', icon: 'fa-bolt' },
          { title: 'Industry Mentorship', desc: 'One-on-one mentorship sessions with senior professionals from top tech firms.', icon: 'fa-handshake' },
          { title: 'Mock Interviews', desc: 'Rigorous placement preparation with mock interviews and aptitude workshops.', icon: 'fa-chalkboard-user' },
        ] }
      ]
    },
    'academics/evaluation': {
      hero: { eyebrow: 'Academics', title: 'Teaching Learning Evaluation', text: 'Teaching–learning evaluation documents including attainments, course outcomes, and teaching learning process.' },
      breadcrumb: 'Teaching Learning Evaluation',
      breadcrumbs: [{ label: 'Academics', to: '/academics' }, { label: 'Teaching Learning Evaluation' }],
      sections: [
        {
          type: 'pdfLinks',
          items: [
            { label: 'Attainments', link: '/academics/ATTAINMENTS.pdf' },
            { label: 'Course Outcomes', link: '/academics/Course Outcomes.pdf' },
            { label: 'Teaching Learing Process', link: '/academics/TLP SUPPORTT DOCUMENT.pdf' },
          ],
        },
      ],
    },
    'academics/calendar': {
      hero: { eyebrow: 'Academics', title: 'Academic Calendars', text: 'Download academic calendars for all B.Tech programmes by academic year.' },
      breadcrumb: 'Academic Calendars',
      breadcrumbs: [{ label: 'Academics', to: '/academics' }, { label: 'Academic Calendars' }],
      sections: [
        {
          type: 'dataTable',
          title: 'Academic Calendars',
          headers: ['Title', 'Academic Year'],
          rows: ACADEMIC_CALENDAR_ROWS,
        },
      ],
    },
    'academics/syllabus': {
      hero: { eyebrow: 'Academics', title: 'Syllabus', text: 'Select a department to view branch-wise syllabus and curriculum documents.' },
      breadcrumb: 'Syllabus',
      breadcrumbs: [{ label: 'Academics', to: '/academics' }, { label: 'Syllabus' }],
      sections: [
        {
          type: 'deptCards',
          items: [
            { title: 'View CSE Syllabus', img: 'https://kmit.in/images/logos/cse.jpg', link: '/academics/cse/syllabus' },
            { title: 'View CSM Syllabus', img: 'https://kmit.in/images/logos/csm.jpg', link: '/academics/csm/syllabus' },
            { title: 'View CSD Syllabus', img: 'https://kmit.in/images/logos/csd.jpg', link: '/academics/csd/syllabus' },
            { title: 'View IT Syllabus', img: 'https://kmit.in/images/logos/it.jpg', link: '/academics/it/syllabus' },
          ]
        }
      ]
    },
    'student-life/events': {
      hero: { eyebrow: 'Campus Life', title: 'Events & Fests', text: 'Experience the vibrant student culture at KMIT through hackathons, cultural fests, and technical workshops.' },
      sections: [
        { type: 'timeline', eyebrow: 'Event Highlights', title: 'Upcoming and Past Events', items: [
          { year: '2025', title: 'KMIT KREST', desc: 'The annual technical cultural festival.' },
          { year: '2024', title: 'SIH Hackathon', desc: 'KMIT hosted the national level Smart India Hackathon.' }
        ]}
      ]
    },
    'admissions/coursesoffered': {
      hero: { eyebrow: 'Admissions', title: 'Courses', text: 'KMIT offers B.Tech programmes approved by AICTE and affiliated to JNTUH Hyderabad.' },
      breadcrumb: 'Courses Offered',
      breadcrumbs: [{ label: 'Admissions', to: '/admissions/coursesoffered' }, { label: 'Courses Offered' }],
      sections: [
        {
          type: 'text',
          content: [
            "KMIT, established in the year 2007, is one of the premier engineering colleges in the state of Telangana. KMIT is Accredited with 'A' Grade by National Assessment and Accreditation Council (NAAC) and also accredited by National Board of Accreditation (NBA). KMIT is approved by All India Council for Technical Education (AICTE), New Delhi and is affiliated to Jawaharlal Nehru Technological University Hyderabad (JNTUH), Hyderabad. It is recognized by the Govt of Telangana. KMIT is co-promoted and powered by Genesis Solutions PVT LTD."
          ]
        },
        {
          type: 'table',
          eyebrow: 'B.Tech Programmes',
          title: 'KMIT offers the following B.Tech Programs',
          headers: ['S.No.', 'Name of the Degree', 'Course', 'Total Intake', 'Management Seats/NRI Seats', 'Convenor seats'],
          rows: [
            ['1', 'B.Tech', 'Computer Science & Engineering (CSE)', '540', '162', '378'],
            ['2', 'B.Tech**', 'Computer Science & Engineering (Artificial Intelligence & Machine Learning) (CSM)', '300', '90', '210'],
          ],
          footnote: '** Obtained AICTE approval to start from 2020-21.'
        }
      ]
    },
    'admissions/admission-procedure': {
      hero: { eyebrow: 'Admissions', title: 'Admission Procedure', text: 'Admissions to B.Tech programmes are conducted through EAPCET and management quota as per TSCHE guidelines.' },
      breadcrumb: 'Admission Procedure',
      breadcrumbs: [{ label: 'Admissions', to: '/admissions/coursesoffered' }, { label: 'Admission Procedure' }],
      sections: [
        {
          type: 'text',
          title: 'B.Tech Programs',
          content: []
        },
        {
          type: 'text',
          title: 'The Eligibility Criteria for Admission to B.Tech Program',
          content: [
            'Admissions to the B.Tech Program are made along with the other Engineering colleges in the state through a common entrance test (EAPCET) conducted by the Govt. of Telangana State.',
            'The admission pattern to B. Tech is as follows: The minimum qualification for admission to first year of the B. Tech course is a pass in the Intermediate (10 + 2) conducted by the board of Intermediate education, Govt. of Telangana State or any other examination recognized as equivalent thereto with Mathematics, Physics and Chemistry as optional subjects.'
          ]
        },
        {
          type: 'bullets',
          title: 'Admission',
          items: [
            '70 % of the seats are allotted based on the merit in the EAPCET.',
            '30 % of the seats are earmarked for Management/NRI candidates.',
            'In addition to the above, Diploma holders are admitted in second year of B. Tech to the extent of 20% of intake based on the merit in the ECET, under lateral entry scheme.'
          ]
        },
        {
          type: 'table',
          eyebrow: 'Fee Structure',
          title: 'Fee Structure — Year of Admission 2025-26',
          headers: ['B.Tech (four year duration)', '(2025-26) I Year', '(2026-27) II Year', '(2027-28) III Year', '(2028-29) IV Year'],
          rows: [
            ['Tuition Fee', '₹ 1,29,200', '₹ 1,29,200', '₹ 1,29,200', '₹ 1,29,200'],
            ['Special Fee', '₹ 5,500', '₹ 2,500', '₹ 2,500', '₹ 2,500'],
            ['NBA Fee', '₹ 3,000', '₹ 3,000', '₹ 3,000', '₹ 3,000'],
          ]
        },
        {
          type: 'text',
          content: ['For more information, please contact the Admissions Department at 6302180205']
        },
        {
          type: 'images',
          items: [
            { src: 'https://kmit.in/admissions/kmit2025.jpg', alt: 'Cat-B 2025-26 Admissions Ad' }
          ]
        }
      ]
    },
    'academics/regulations': {
      hero: { eyebrow: 'Academics', title: 'Regulations', text: 'Academic regulations, evaluation policy, and year-wise regulation mapping for B.Tech programmes.' },
      breadcrumb: 'Regulations',
      breadcrumbs: [{ label: 'Academics', to: '/academics' }, { label: 'Regulations' }],
      sections: [
        {
          type: 'text',
          content: [
            'The departments of the KMIT are responsible for the academic activities which include Teaching, Research and Industrial Consultancy. The courses of study are organized on semester basis. The medium of instruction is English.',
            'Students are evaluated on a continuous basis each academic year which consists of two semesters with each semester providing a minimum of seventeen weeks of instructions. Evaluation comprises of Continuous Internal Evaluation (CIE) and Semester End Examination (SEE). The rigours of academic study at each level are balanced with a number of other related activities which include co-curricular activities.',
            'Special lectures on varied topic of academic relevance are held under the Extra Mural Lecture series. A number of conferences, symposia and workshops are organized by the faculty which attract participation from scholars from all corners of India and abroad. Guest lectures and industrial visits complement classroom interactions.',
            'The academic atmosphere at the Institute is a rare blend of modern day technical skills and the traditional emphasis on imparting knowledge. All the academic activities at institute are monitored by Dean Academic Affairs and can be viewed through the academic calendar, time tables of individual programmes, examination schedules and yearly college diary.'
          ]
        },
        {
          type: 'table',
          eyebrow: 'B.Tech Program',
          title: 'Academic Regulations of B.Tech Program',
          headers: ['S.No', 'Academic Regulations', 'Regulation'],
          rows: [
            ['1', { text: 'B.Tech KR24 Revised Academic Regulations (Autonomous)', link: '/academics/calendars/KR24 Revised Academic Regulation.pdf' }, 'KR24'],
            ['2', { text: 'B.Tech KR24 Academic Regulations (Autonomous)', link: '/academics/calendars/KR24 Academic Regulation 2025.pdf' }, 'KR24'],
            ['3', { text: 'B.Tech KR23 Academic Regulations (Autonomous)', link: '/academics/calendars/KR 23 Regulations.pdf' }, 'KR23'],
            ['4', { text: 'B.Tech KR21 Academic Regulations (Autonomous)', link: '/academics/calendars/KR21 REGULATIONS SCANNED COPY.pdf' }, 'KR21'],
            ['5', { text: 'B.Tech KR20 Academic Regulations (Autonomous)', link: '/academics/calendars/KR20 REGULATIONS SCANNED COPY.pdf' }, 'KR20'],
            ['6', { text: 'B.Tech R18 Academic Regulations', link: '/academics/calendars/R18B.TECHAcademicRegulations2.pdf' }, 'R18'],
            ['7', { text: 'B.Tech R16 Academic Regulations', link: '/academics/calendars/R16B.TECHAcademicRegulations.pdf' }, 'R16'],
            ['8', { text: 'B.Tech R15 Academic Regulations', link: '/academics/calendars/R15AcadRegulationsRevisedB.Tech2015_16.pdf' }, 'R15'],
            ['9', { text: 'B.Tech R13 Academic Regulations', link: '/academics/calendars/R13RevisedAcademicRegulationsforB.Tech.pdf' }, 'R13'],
          ]
        },
        {
          type: 'table',
          eyebrow: 'Year-wise Mapping',
          title: 'Academic Year wise Regulations',
          headers: ['S.No', 'Academic Year', 'I Year', 'II Year', 'III Year', 'IV Year'],
          rows: [
            ['1', '2025-26', 'KR25', 'KR24', 'KR23', 'KR21'],
            ['2', '2024-25', 'KR24', 'KR23', 'KR21', 'KR21'],
            ['3', '2023-24', 'KR23', 'KR21', 'KR21', 'KR20'],
            ['4', '2022-23', 'KR21', 'KR21', 'KR20', 'R18'],
            ['5', '2021-22', 'KR21', 'KR20', 'R18', 'R18'],
            ['6', '2020-21', 'KR20', 'R18', 'R18', 'R16'],
            ['7', '2019-20', 'R18', 'R18', 'R16', 'R16'],
            ['8', '2018-19', 'R18', 'R16', 'R16', 'R15'],
            ['9', '2017-18', 'R16', 'R16', 'R15', 'R13'],
          ]
        }
      ]
    },
    'academics/value-added': {
      hero: { eyebrow: 'Academics', title: 'Value Added Services', text: 'Add-on programmes under Finishing School, Trishul and SONET — provided free of cost to KMIT students.' },
      breadcrumb: 'Value-Added Services',
      breadcrumbs: [{ label: 'Academics', to: '/academics' }, { label: 'Value-Added Services' }],
      sections: [
        {
          type: 'text',
          content: [
            'All Add-on programs under Finishing School, Trishul and SONET (School of New and Emerging Technologies) are provided free of cost to students. Selection of students for various programs is based on their performance in the written test and their performance in previous academic year.',
            'Bridge courses like Basic Communication skills, Scratch Programming and Vocational training programs are compulsory for all I year students. I year students have to opt any two of the vocational training programs. These are in addition to regular University courses and provided free of cost.',
            'The coaching for Cambridge English\'s Business English Certificates is provided free of cost. Registration is on a first come first serve basis.',
            'It is to be noted that all these courses are taught by faculty that have expertise in these areas. The management also invests in CPD (Continued Professional Development) of these faculty to ensure that they\'re up-to-date with the latest happenings in the field. This, the management believes, will only benefit the students.',
          ],
        },
        {
          type: 'cards',
          items: [
            { title: 'BEC', desc: 'Cambridge Business English Certificate coaching — free of cost.', icon: 'fa-certificate', modalKey: 'BEC', linkLabel: 'View Details' },
            { title: 'SONET', desc: 'School of New and Emerging Technologies add-on programmes.', icon: 'fa-microchip', modalKey: 'SONET', linkLabel: 'View Details' },
            { title: 'Finishing School', desc: 'Career-readiness training for KMIT students.', icon: 'fa-graduation-cap', modalKey: 'FINISHING SCHOOL', linkLabel: 'View Details' },
            { title: 'Project School', desc: 'Real-world industry projects for students.', icon: 'fa-rocket', modalKey: 'PROJECT SCHOOL', linkLabel: 'View Details' },
            { title: 'Imagineering School', desc: 'Creative engineering and design thinking programme.', icon: 'fa-lightbulb', modalKey: 'IMAGINEERING SCHOOL', linkLabel: 'View Details' },
            { title: 'Trishul', desc: 'First-year foundation programme.', icon: 'fa-layer-group', modalKey: 'TRISHUL', linkLabel: 'View Details' },
            { title: 'Arjuna', desc: 'Second-year advanced programming.', icon: 'fa-code', modalKey: 'ARJUNA', linkLabel: 'View Details' },
            { title: 'Nirantar', desc: 'Weekly TTS high-speed coding competitions.', icon: 'fa-arrow-rotate-right', modalKey: 'NIRANTAR (NFS)', linkLabel: 'View Details' },
            { title: 'International FS', desc: 'Global standards software engineering.', icon: 'fa-earth-americas', modalKey: 'INTERNATIONAL FINISHING SCHOOL', linkLabel: 'View Details' }
          ],
        },
      ],
    },
    'academics/awards': {
      hero: { eyebrow: 'Academics', title: 'Endowment Awards', text: 'Merit awards instituted by distinguished individuals and organisations, presented at annual convocation.' },
      breadcrumb: 'Endowment Awards',
      breadcrumbs: [{ label: 'Academics', to: '/academics' }, { label: 'Endowment Awards' }],
      sections: [
        {
          type: 'tabbedTable',
          eyebrow: 'Past & Present',
          title: 'Award Recipients',
          tabs: ENDOWMENT_AWARD_SECTIONS.map((award) => ({
            label: award.title.replace('Award Recipients ', ''),
            headers: award.headers || AWARD_TABLE_HEADERS,
            rows: award.rows,
          }))
        }
      ]
    },
    'student-life/project-school': {
      hero: { eyebrow: 'Hand-on', title: 'Project School', text: 'Students work on real-world industrial projects under the guidance of industry mentors.' },
      sections: [
        { type: 'text', eyebrow: 'Methodology', title: 'Learning by Doing', content: ['Project school encourages students to apply theoretical knowledge to solve complex practical problems.'] }
      ]
    },
    'research': {
      hero: { 
        eyebrow: 'Research', 
        title: 'About Research', 
        text: 'Research is the foundation of any nation’s economic growth and Keshav Memorial Institute Of Technology (KMIT) is committed to long term research in emerging areas of engineering and technology.' 
      },
      sections: [
        { 
          type: 'text', 
          eyebrow: 'R&D Cell', 
          title: 'Fostering Scientific Research', 
          content: [
            'Recognizing the importance of R & D in the vertical growth of the institution, we established an R&D cell to focus on scientific and industrial research in various disciplines. For this purpose, a state-of-the-art, customized research lab has been built.',
            'The cell facilitates, channelizes, records, and regulates all the academic, sponsored, collaborative research projects and consultancy works in the Institute. Subsequently, KMIT has academic and research collaboration with reputed institutes like DRDL, Tech Mahindra, and many more. Faculties of various departments have received funding from both Government & Non-Government agencies.'
          ] 
        },
        {
          type: 'images',
          items: [
            { src: '/assets/uttkarsh-01.jpg', alt: 'Uttkarsh' },
            { src: '/assets/Udaan-01.jpg', alt: 'Udaan' }
          ]
        },
        { 
          type: 'cards', 
          eyebrow: 'Our Goals', 
          title: 'Research Objectives', 
          items: [
            { title: 'Research Hub', desc: 'To promote a research hub facilitating multiple research centers covering heterogeneous research areas that ultimately lead to publications and ED.', icon: 'fa-diagram-project' },
            { title: 'Quality Enhancement', desc: 'To enhance the quality of quantitative research.', icon: 'fa-chart-line' },
            { title: 'Collaborative Research', desc: 'To amplify collaborative research with premier Institutions and Industries.', icon: 'fa-handshake' },
            { title: 'Student Involvement', desc: 'To involve students in research by vertical integration strategy.', icon: 'fa-users' },
            { title: 'Community Focus', desc: 'To focus the research on open community problems.', icon: 'fa-globe' },
            { title: 'Encourage Publications', desc: 'To encourage registered researchers (Faculty and Students alike) to publish findings.', icon: 'fa-book-open' }
          ] 
        },
        { 
          type: 'table', 
          eyebrow: 'Leadership', 
          title: 'The R&D Team', 
          headers: ['S.No', 'Name', 'Role'],
          rows: [
            ['1', 'Prof. Vinay Patankar', 'Convenor'],
            ['2', 'Dr R Devika Rubi', 'Core Member'],
            ['3', 'Dr S Rajasekaran', 'Core Member'],
            ['4', 'Ms I Tejasvi', 'Co-ordinator'],
            ['5', 'Ms Haleema Bushra', 'Co-ordinator'],
            ['6', 'Ms Prabhavati Devi', 'Co-ordinator'],
            ['7', 'Mr Shiva Kumar', 'Co-ordinator'],
            ['8', 'Mr B Niranjan Kumar', 'Co-ordinator']
          ]
        },
        { 
          type: 'cards', 
          eyebrow: 'Impact', 
          title: 'Outcomes', 
          items: [
            { title: 'Academic Reputation', desc: 'Establishing KMIT as a hub for innovative research, enhancing its academic reputation both nationally and internationally.', icon: 'fa-award' },
            { title: 'Economic Growth', desc: 'Contributing to economic growth through technological advancements, patents, and innovations that may have commercial applications.', icon: 'fa-chart-pie' },
            { title: 'Industry Collaboration', desc: 'Collaborating with reputed institutes and industry partners like DRDL and Tech Mahindra for mutually beneficial relationships, resources, and funding.', icon: 'fa-building' },
            { title: 'Knowledge Creation', desc: 'Fostering a culture of knowledge creation and dissemination, leading to new insights, publications, and intellectual property.', icon: 'fa-lightbulb' },
            { title: 'Funding Opportunities', desc: 'Receiving funding from government and non-government agencies to pursue ambitious research agendas and acquire cutting-edge equipment.', icon: 'fa-money-bill-wave' },
            { title: 'Student Engagement', desc: 'Students benefit from participating in research projects, gaining valuable hands-on experience and exposure to cutting-edge technologies.', icon: 'fa-user-graduate' }
          ]
        }
      ]
    },
    'admissions/fees': {
      hero: { eyebrow: 'Admissions', title: 'Fee Structure', text: 'Detailed breakdown of tuition fees, university charges, and other institutional fees.' },
      sections: [
        { type: 'stats', items: [{ label: 'Tuition Fee (Annual)', value: '₹1.05L' }, { label: 'NBA Accreditation Fee', value: '₹3000' }] }
      ]
    },
    'research/gsoc': {
      hero: { 
        eyebrow: 'Research', 
        title: 'Google Summer of Code', 
        text: 'Google Summer of Code, more popularly known as GSoC, is a 10-week internship programme wherein students work on a programming project with a participating organization under the guidance of an assigned mentor. This is a paying internship.' 
      },
      sections: [
        { 
          type: 'text', 
          eyebrow: 'KMIT Students', 
          title: 'GSoC Selectees', 
          content: ['Below is the list of KMIT students who were selected and participated in GSoC.'] 
        },
        { 
          type: 'table', 
          eyebrow: 'Participants', 
          title: 'Selected Students', 
          headers: ['S.No', 'Student Name', 'Organization', 'Project Name', 'Participation Year'],
          rows: [
            ['1', 'Pavan Bellam', 'Department of Biomedical Informatics, Emory University', 'Workflow module for Niffler Framework', '2022'],
            ['2', 'Thanda Mahender Goud', 'SCoRe Lab', 'CodeLabz - FrontEnd, News Feed, Profiles, Organisation, Profiles', '2022'],
            ['3', 'P Sai Varshith', 'caMicroscope', 'Integrate an Optical Microscope with a Camera and Motorized Stage - Collaboration with FDA', '2021'],
            ['4', 'Srinivas Yadav', 'STE||AR Group', 'Add vectorization to par_unseq Implementations of Parallel Algorithms', '2021'],
            ['5', 'Akash Konda', 'Joplin', 'Real-Time Collaboration on a Note', '2021'],
            ['6', 'Nishchal Singi', 'Department of Biomedical Informatics (BMI), Emory University School of Medicine', 'A Frontend for Niffler DICOM Framework for Machine Learning Pipelines and Processing Workflows', '2021'],
            ['7', 'Sai Sandeep Mutyala', 'OpenMRS', 'ATLAS', '2019'],
            ['8', 'Darjilla Haripriya Reddy', 'OpenMRS', 'Condition List', '2019'],
            ['9', 'Shekar', 'OpenMRS', 'Atlas 3.0', '2016'],
            ['10', 'Vishnu', 'OpenMRS', 'OWA App Store', '2016'],
            ['11', 'Medha', 'Systers', 'Mobile App Control Center', '2016'],
            ['12', 'Akansha Bodhankar', 'Systers', 'PCSA Web App', '2016'],
            ['13', 'P Tharunya', 'OpenMRS', 'Module for Legacy UI', '2015'],
            ['14', 'Sandeep Raparthi', 'OpenMRS', 'Add Support for Open Web Apps', '2015'],
            ['15', 'Sharon Varghese', 'OpenMRS', 'Cohort Module', '2015'],
            ['16', 'Aniketh Katakam', 'OpenMRS', 'OpenMRS Rega DB Integration', '2014'],
            ['17', 'Vaibhav Agarwal', 'OpenMRS', 'CDA Generator', '2014'],
            ['18', 'Sara Fatima', 'OpenMRS', 'IHE Interoperability- Patient Administration Management', '2014'],
            ['19', 'Rekha Seethamaraju', 'Beagle Board', 'PyBBIO Library Development', '2014'],
            ['20', 'Shruthi Reddy', 'OpenMRS', 'Wikipathways', '2013'],
            ['21', 'Hemanth Devrapalli', 'OpenMRS', 'Raxa UI', '2013'],
            ['22', 'Gouthami PIngali', 'OpenMRS', 'Patient Summary Import and Export', '2012'],
            ['23', 'Sreya Janaswamy', 'OpenMRS', 'Personal Health Record Module', '2012'],
            ['24', 'Pushkar Ravipati', 'OpenMRS', 'Anatomical Drawing', '2012'],
            ['25', 'Maurya', 'OpenMRS', 'OpenMRS-DHIS2-SDMX-HD Integration', '2012'],
            ['26', 'Vishnu Vardhan', 'MIFOS', 'Front End Prototype', '2011'],
            ['27', 'Haripriya K', 'MIFOS', 'Front End Prototype', '2011'],
            ['28', 'Suneeth Reddy', 'OpenMRS', 'Enhancing the Patient De-duplication Module', '2010'],
            ['29', 'Sai Manohar', 'OpenMRS', 'Genome Data Storage and Drug Resistance Prediction', '2010'],
            ['30', 'Goutham vasireddy', 'OpenMRS', 'Maven Archtype', '2010'],
            ['31', 'Harshini Gudiwada', 'OpenMRS', 'Role based homepage', '2009'],
            ['32', 'Amogha Gundavaram', 'OpenMRS', 'Patient deduplication', '2009']
          ]
        }
      ]
    },
    'research/workshops': {
      hero: { 
        eyebrow: 'Research', 
        title: 'Research Workshops', 
        text: 'Keshav Memorial Institute of Technology actively conducts and participates in various research workshops and training programs.' 
      },
      sections: [
        { 
          type: 'text', 
          eyebrow: 'Workshop', 
          title: 'Digital Pathology for Breast Cancer', 
          content: ['The R&D Centre at Keshav Memorial Institute of Technology in conjunction with Tapadia Diagnostic Centre Pvt. Ltd and Department of Microbiology, KMICS, Hyderabad began a training workshop on Digital Pathology Annotations for Breast Cancer. The first session was held on 15 December 2020 at KMIT and was lead by Dr Rohit Tapadia (MBBS, MD, Onco Pathologist), Director of Tapadia Diagnostics Centre. This workshop was conducted as a part of the ongoing BIRAC project in R&D centre.'] 
        },
        {
          type: 'images',
          items: [{ src: '/photos/research/bcw.webp', alt: 'Digital Pathology Workshop Poster' }]
        },
        { 
          type: 'text', 
          eyebrow: 'Workshop', 
          title: 'DRDL (AI and CUDA Programming)', 
          content: ['Keshav Memorial Institute of Technology is pleased to announce that they have opened Udaan, a new R&D Centre, in addition to Uttkarsh, the existing R&D centre. Both the centres are equipped with state-of-art machines, 24*7 powerful backup, air-conditioned and are WiFi enabled. As opposed to a standard inauguration, KMIT’s R&D department in conjunction with nVIDIA Centre of Excellence (CoE) and Teleparadigm Networks Ltd, Hyderabad opted to host the AI and CUDA Programming for Defence Applications training for Defence Scientists, a project approved by Defence Research & Development Laboratory (DRDL) on 4 January 2021.'] 
        },
        {
          type: 'images',
          items: [{ src: '/photos/research/AICUDA.jpeg', alt: 'DRDL Workshop Poster' }]
        },
        { 
          type: 'text', 
          eyebrow: 'Workshop', 
          title: 'Biomedical Imaging', 
          content: ['A series of webinars was conducted over a course of two days by Dr Devika Rubi and Dr Rajasekaran. The objective of the sessions was to introduce faculty members and students to Biomedical Imaging and the area of research contained within it. The webinar was conducted on 16th and 17th of June, 2020.'] 
        },
        {
          type: 'images',
          items: [{ src: '/photos/research/Biomedical_Imaging_Webinar.jpg', alt: 'Biomedical Imaging Webinar Poster' }]
        },
        { 
          type: 'text', 
          eyebrow: 'Workshop', 
          title: 'Blockchain Technology', 
          content: ['A series of webinars was conducted over a course of two days by Ms Sireesha Puppala. The objective of the sessions was to introduce faculty members and students to Blockchain Technology and the area of research contained within it. The webinar was conducted on 12th and 13th of June, 2020.'] 
        },
        {
          type: 'images',
          items: [{ src: '/photos/research/Blockchain_Tech_Webinar.png', alt: 'Blockchain Technology Webinar Poster' }]
        }
      ]
    }
  }
}

// ─── PROVIDER ────────────────────────────────────────────────────────────────
export function DataProvider({ children }) {
  const [data, setData] = useState(INITIAL_DATA)
  const [loading, setLoading] = useState(false)
  const [syncStatus, setSyncStatus] = useState('loading')
  const [lastSyncedAt, setLastSyncedAt] = useState(null)
  const [syncError, setSyncError] = useState(null)

  const pullFromServer = useCallback(async (signal) => {
    try {
      const dbData = await fetchSiteData(signal)
      setData(prev => ({
        ...prev,
        ...dbData,
        navItems: INITIAL_NAV_ITEMS,
        deptDetails: dbData.deptDetails || prev.deptDetails || INITIAL_DATA.deptDetails
      }))
      setSyncStatus('live')
      setSyncError(null)
      setLastSyncedAt(Date.now())
      return true
    } catch (err) {
      if (err?.name === 'AbortError') return false
      setSyncError(err?.message || 'Connection failed')
      setSyncStatus((prev) => (prev === 'live' ? 'live' : 'offline'))
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
