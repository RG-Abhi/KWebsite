import express from 'express'
import Notice from '../models/Notice.js'
import Faculty from '../models/Faculty.js'
import AcademicDoc from '../models/AcademicDoc.js'
import WorkflowItem from '../models/WorkflowItem.js'
import AuditLog from '../models/AuditLog.js'
import SiteData from '../models/SiteData.js'
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()

router.get('/dashboard', authMiddleware, async (_req, res) => {
  const [
    noticesCount,
    facultyCount,
    academicsCount,
    pendingWorkflows,
    recentAudit,
    site,
  ] = await Promise.all([
    Notice.countDocuments({ status: 'published' }),
    Faculty.countDocuments(),
    AcademicDoc.countDocuments({ status: 'published' }),
    WorkflowItem.countDocuments({ status: 'pending' }),
    AuditLog.find().sort({ createdAt: -1 }).limit(8).lean(),
    SiteData.findOne().select('mediaAssets pages').lean(),
  ])

  res.json({
    stats: {
      publishedNotices: noticesCount,
      faculty: facultyCount,
      academicDocs: academicsCount,
      pendingApprovals: pendingWorkflows,
      mediaFiles: site?.mediaAssets?.length || 0,
      cmsPages: site?.pages ? Object.keys(site.pages).length : 0,
    },
    recentActivity: recentAudit,
  })
})

export default router
