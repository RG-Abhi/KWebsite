import express from 'express'
import AcademicDoc from '../models/AcademicDoc.js'
import { authMiddleware } from '../middleware/auth.js'
import { requireModule } from '../middleware/rbac.js'
import { logAudit } from '../lib/audit.js'
import { canApprove } from '../config/roles.js'

const router = express.Router()

router.get('/', authMiddleware, requireModule('academics'), async (req, res) => {
  const filter = {}
  if (req.query.category) filter.category = req.query.category
  if (req.user.departmentId && req.user.role !== 'super_admin') {
    filter.departmentId = req.user.departmentId
  }
  const docs = await AcademicDoc.find(filter).sort({ updatedAt: -1 })
  res.json(docs)
})

router.post('/', authMiddleware, requireModule('academics'), async (req, res) => {
  const doc = await AcademicDoc.create({
    ...req.body,
    departmentId: req.body.departmentId || req.user.departmentId || null,
    status: canApprove(req.user.role) ? (req.body.status || 'draft') : 'draft',
  })
  await logAudit({ action: 'academic.create', entityType: 'academic', entityId: doc._id, user: req.user })
  res.json({ success: true, doc })
})

router.put('/:id', authMiddleware, requireModule('academics'), async (req, res) => {
  const doc = await AcademicDoc.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json({ success: true, doc })
})

router.post('/:id/publish', authMiddleware, requireModule('academics'), async (req, res) => {
  if (!canApprove(req.user.role)) return res.status(403).json({ message: 'Approval required' })
  const doc = await AcademicDoc.findByIdAndUpdate(req.params.id, { status: 'published' }, { new: true })
  res.json({ success: true, doc })
})

router.delete('/:id', authMiddleware, requireModule('academics'), async (req, res) => {
  await AcademicDoc.findByIdAndDelete(req.params.id)
  res.json({ success: true })
})

export default router
