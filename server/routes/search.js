import express from 'express'
import Notice from '../models/Notice.js'
import Faculty from '../models/Faculty.js'
import AcademicDoc from '../models/AcademicDoc.js'
import SiteData from '../models/SiteData.js'
import Page from '../models/Page.js'
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()

router.get('/', authMiddleware, async (req, res) => {
  const q = (req.query.q || '').trim()
  if (!q || q.length < 2) return res.json({ results: [] })

  const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
  const [notices, faculty, academics, pages, site] = await Promise.all([
    Notice.find({ $or: [{ title: regex }, { body: regex }] }).limit(10).lean(),
    Faculty.find({ $or: [{ name: regex }, { designation: regex }, { email: regex }] }).limit(10).lean(),
    AcademicDoc.find({ title: regex }).limit(10).lean(),
    Page.find({ $or: [{ title: regex }, { pageKey: regex }] }).limit(10).lean(),
    SiteData.findOne().lean(),
  ])

  const results = []

  notices.forEach((n) => results.push({ type: 'notice', id: n._id, title: n.title, subtitle: n.status }))
  faculty.forEach((f) => results.push({ type: 'faculty', id: f._id, title: f.name, subtitle: f.departmentId }))
  academics.forEach((a) => results.push({ type: 'academic', id: a._id, title: a.title, subtitle: a.category }))
  pages.forEach((p) => results.push({ type: 'page', id: p.pageKey, title: p.title, subtitle: 'CMS Page' }))

  if (site?.mediaAssets) {
    site.mediaAssets.filter((m) => regex.test(m.name || '')).slice(0, 8).forEach((m) => {
      results.push({ type: 'media', id: m.id, title: m.name, subtitle: m.url })
    })
  }

  res.json({ results: results.slice(0, 30) })
})

export default router
