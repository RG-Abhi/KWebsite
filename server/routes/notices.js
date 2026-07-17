import express from 'express'
import Notice from '../models/Notice.js'
import { authMiddleware } from '../middleware/auth.js'
import { requireModule } from '../middleware/rbac.js'
import { logAudit } from '../lib/audit.js'
import { syncPublishedNoticesToSite } from '../lib/syncNoticesToSite.js'
import { canApprove } from '../config/roles.js'
import WorkflowItem from '../models/WorkflowItem.js'

const router = express.Router()

const deptFilter = (req) => {
  if (req.user.role === 'super_admin') return {}
  if (req.user.departmentId) return { departmentId: req.user.departmentId }
  return {}
}

router.get('/', authMiddleware, requireModule('content'), async (req, res) => {
  const filter = { ...deptFilter(req) }
  if (req.query.status) filter.status = req.query.status
  const notices = await Notice.find(filter).sort({ updatedAt: -1 })
  res.json(notices)
})

router.post('/', authMiddleware, requireModule('content'), async (req, res) => {
  const status = canApprove(req.user.role) ? (req.body.status || 'draft') : 'draft'
  
  let expiresAt = req.body.expiresAt || null;
  if (expiresAt) {
    const d = new Date(expiresAt);
    d.setUTCHours(23, 59, 59, 999);
    expiresAt = d;
  }

  const notice = await Notice.create({
    ...req.body,
    status,
    expiresAt,
    departmentId: req.body.departmentId || req.user.departmentId || null,
    createdBy: req.user.username,
  })
  await logAudit({ action: 'notice.create', entityType: 'notice', entityId: notice._id, user: req.user })
  res.json({ success: true, notice })
})

router.put('/:id', authMiddleware, requireModule('content'), async (req, res) => {
  const updateData = { ...req.body };
  if (updateData.expiresAt) {
    const d = new Date(updateData.expiresAt);
    d.setUTCHours(23, 59, 59, 999);
    updateData.expiresAt = d;
  }

  const notice = await Notice.findByIdAndUpdate(req.params.id, updateData, { new: true })
  await logAudit({ action: 'notice.update', entityType: 'notice', entityId: req.params.id, user: req.user })
  res.json({ success: true, notice })
})

router.post('/:id/submit', authMiddleware, requireModule('content'), async (req, res) => {
  const notice = await Notice.findByIdAndUpdate(req.params.id, { status: 'pending' }, { new: true })
  await WorkflowItem.create({
    entityType: 'notice',
    entityId: String(notice._id),
    title: notice.title,
    submittedBy: req.user.username,
    payload: notice.toObject(),
  })
  res.json({ success: true, notice })
})

router.post('/:id/publish', authMiddleware, requireModule('content'), async (req, res) => {
  if (!canApprove(req.user.role)) return res.status(403).json({ message: 'Approval required' })
  const notice = await Notice.findByIdAndUpdate(
    req.params.id,
    { status: 'published', approvedBy: req.user.username, publishAt: new Date() },
    { new: true }
  )
  await WorkflowItem.updateMany({ entityType: 'notice', entityId: String(notice._id) }, { status: 'approved', reviewedBy: req.user.username })
  await syncPublishedNoticesToSite()
  await logAudit({ action: 'notice.publish', entityType: 'notice', entityId: req.params.id, user: req.user })
  res.json({ success: true, notice })
})

router.post('/:id/archive', authMiddleware, requireModule('content'), async (req, res) => {
  const notice = await Notice.findByIdAndUpdate(req.params.id, { status: 'archived' }, { new: true })
  await syncPublishedNoticesToSite()
  res.json({ success: true, notice })
})

router.delete('/:id', authMiddleware, requireModule('content'), async (req, res) => {
  await Notice.findByIdAndDelete(req.params.id)
  await syncPublishedNoticesToSite()
  res.json({ success: true })
})

export default router
