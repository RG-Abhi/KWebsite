import express from 'express'
import WorkflowItem from '../models/WorkflowItem.js'
import Notice from '../models/Notice.js'
import { authMiddleware } from '../middleware/auth.js'
import { canApprove } from '../config/roles.js'
import { syncPublishedNoticesToSite } from '../lib/syncNoticesToSite.js'

const router = express.Router()

router.get('/pending', authMiddleware, async (req, res) => {
  if (!canApprove(req.user.role)) return res.json([])
  const items = await WorkflowItem.find({ status: 'pending' }).sort({ createdAt: -1 }).limit(50)
  res.json(items)
})

router.post('/:id/approve', authMiddleware, async (req, res) => {
  if (!canApprove(req.user.role)) return res.status(403).json({ message: 'Forbidden' })
  const item = await WorkflowItem.findByIdAndUpdate(
    req.params.id,
    { status: 'approved', reviewedBy: req.user.username, comment: req.body.comment || '' },
    { new: true }
  )
  if (item?.entityType === 'notice') {
    await Notice.findByIdAndUpdate(item.entityId, { status: 'published', approvedBy: req.user.username })
    await syncPublishedNoticesToSite()
  }
  res.json({ success: true, item })
})

router.post('/:id/reject', authMiddleware, async (req, res) => {
  if (!canApprove(req.user.role)) return res.status(403).json({ message: 'Forbidden' })
  const item = await WorkflowItem.findByIdAndUpdate(
    req.params.id,
    { status: 'rejected', reviewedBy: req.user.username, comment: req.body.comment || '' },
    { new: true }
  )
  if (item?.entityType === 'notice') {
    await Notice.findByIdAndUpdate(item.entityId, { status: 'draft' })
  }
  res.json({ success: true, item })
})

export default router
