import express from 'express'
import Faculty from '../models/Faculty.js'
import { authMiddleware } from '../middleware/auth.js'
import { requireModule } from '../middleware/rbac.js'
import { logAudit } from '../lib/audit.js'

const router = express.Router()

router.get('/', authMiddleware, requireModule('people'), async (req, res) => {
  const filter = {}
  if (req.user.departmentId && req.user.role !== 'super_admin') {
    filter.departmentId = req.user.departmentId
  } else if (req.query.departmentId) {
    filter.departmentId = req.query.departmentId
  }
  const list = await Faculty.find(filter).sort({ name: 1 })
  res.json(list)
})

router.post('/', authMiddleware, requireModule('people'), async (req, res) => {
  const faculty = await Faculty.create({
    ...req.body,
    departmentId: req.body.departmentId || req.user.departmentId,
  })
  await logAudit({ action: 'faculty.create', entityType: 'faculty', entityId: faculty._id, user: req.user })
  res.json({ success: true, faculty })
})

router.put('/:id', authMiddleware, requireModule('people'), async (req, res) => {
  const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true })
  await logAudit({ action: 'faculty.update', entityType: 'faculty', entityId: req.params.id, user: req.user })
  res.json({ success: true, faculty })
})

router.delete('/:id', authMiddleware, requireModule('people'), async (req, res) => {
  await Faculty.findByIdAndDelete(req.params.id)
  res.json({ success: true })
})

export default router
