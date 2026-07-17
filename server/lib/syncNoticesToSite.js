import Notice from '../models/Notice.js'
import SiteData from '../models/SiteData.js'
import { notifyDataChanged } from './dataEvents.js'

export async function syncPublishedNoticesToSite() {
  const now = new Date()
  const notices = await Notice.find({
    status: 'published',
    $or: [{ expiresAt: null }, { expiresAt: { $gt: now } }],
  }).sort({ priority: -1, updatedAt: -1 }).limit(100)

  const doc = await SiteData.findOne()
  if (!doc) return

  // 1. Sync Marquees -> doc.announcements
  const marqueeNotices = notices.filter((n) => n.type === 'marquee')
  doc.announcements = marqueeNotices.length > 0 
    ? marqueeNotices.map((n) => (n.link ? `${n.title} — ${n.link}` : n.title))
    : []

  // Ensure noticeBoard object exists and is initialized
  if (!doc.noticeBoard) {
    doc.noticeBoard = { latest: [], exams: [], placements: [] }
  }

  const formatDate = (n) => {
    const d = n.publishAt || n.updatedAt || new Date()
    return new Date(d).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // 2. Sync Latest News Tab -> doc.noticeBoard.latest
  const newsNotices = notices.filter((n) => n.type === 'news')
  doc.noticeBoard.latest = newsNotices.map((n) => ({
    title: n.title,
    date: formatDate(n),
    body: n.body,
    link: n.link,
  }))

  // 3. Sync Exams Tab Notice -> doc.noticeBoard.exams
  const examNotices = notices.filter((n) => n.type === 'notice')
  doc.noticeBoard.exams = examNotices.map((n) => ({
    title: n.title,
    date: formatDate(n),
    body: n.body,
    link: n.link,
  }))

  // 4. Sync Placements Tab Notice -> doc.noticeBoard.placements
  const placementNotices = notices.filter((n) => n.type === 'placement')
  doc.noticeBoard.placements = placementNotices.map((n) => ({
    title: n.title,
    date: formatDate(n),
    body: n.body,
    link: n.link,
  }))

  // 5. Sync Popup Alerts
  doc.popupAlert = notices.find((n) => n.type === 'popup' && n.status === 'published') || null

  // Tell mongoose noticeBoard has been modified since it's a mixed Type
  doc.markModified('noticeBoard')
  doc.markModified('announcements')

  await doc.save()
  notifyDataChanged({ source: 'notices-sync' })
}
