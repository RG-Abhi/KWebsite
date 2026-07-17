/** Build site-wide search index from nav + static entries (two.txt / MASTER_DESIGN A4) */

const EXTRA_ENTRIES = [
  { title: 'EAPCET Last Rank', desc: 'Cut-off ranks by branch and category', section: 'admissions/eapcet-ranks', keywords: 'eapcet rank cut off counselling' },
  { title: 'ECET Last Rank', desc: 'Lateral entry cut-offs', section: 'admissions/ecet-ranks', keywords: 'ecet lateral diploma' },
  { title: 'NIRF Rankings', desc: 'National Institutional Ranking Framework', section: 'rankings/nirf', keywords: 'nirf ranking score' },
  { title: 'ARIIA Rankings', desc: 'Innovation achievements ranking', section: 'rankings/ariia', keywords: 'ariia innovation' },
  { title: 'KR23 Syllabus', desc: 'Syllabus documents by department', section: 'academics/syllabus', keywords: 'kr23 kr21 syllabus pdf' },
  { title: 'Academic Calendar', desc: 'Semester calendars and holidays', section: 'academics/calendar', keywords: 'calendar timetable holidays' },
  { title: 'Exam Notifications', desc: 'Notices, timetables, results', section: 'exams/notifications', keywords: 'exam notification result timetable' },
  { title: 'Pay Fees Online', desc: 'Fee payment portal — opens payment gateway', section: 'pay-fees', url: 'https://ssolive.myclassboard.com/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3DDIL4KLQ05IV1JZOXCLM0%26redirect_uri%3Dhttps%253A%252F%252Ficici.myclassboard.com%252Fsso%252FCallback%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520offline_access', keywords: 'pay fees online payment portal icici myclassboard fee' },
  { title: 'GSoC Alumni', desc: 'Google Summer of Code selections', section: 'research/gsoc', keywords: 'gsoc google summer code' },
  { title: 'Genesis Finishing School', desc: 'Placement training programme', section: 'placements', keywords: 'genesis finishing school training' },
]

function collectFromNav(navItems) {
  const out = []
  if (!navItems) return out

  navItems.forEach(item => {
    if (item.section) {
      out.push({ title: item.label, desc: item.label, section: item.section, keywords: item.label })
    }
    if (item.items) {
      item.items.forEach(card => {
        if (card.section) out.push({ title: card.title, desc: card.desc || card.title, section: card.section, keywords: `${card.title} ${card.desc || ''}` })
      })
    }
    if (item.columns) {
      item.columns.forEach(col => {
        col.links?.forEach(lnk => {
          if (lnk.section) out.push({ title: lnk.label, desc: col.title, section: lnk.section, keywords: `${lnk.label} ${col.title}` })
        })
      })
    }
  })
  return out
}

export function buildSearchIndex(navItems) {
  const map = new Map()
  ;[...collectFromNav(navItems), ...EXTRA_ENTRIES].forEach(entry => {
    if (!entry.section) return
    const key = entry.section.toLowerCase()
    if (!map.has(key)) map.set(key, entry)
  })
  return Array.from(map.values())
}

export function searchIndex(index, query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return index.filter(item => {
    const hay = `${item.title} ${item.desc} ${item.keywords || ''}`.toLowerCase()
    return hay.includes(q) || q.split(/\s+/).every(word => hay.includes(word))
  })
}
