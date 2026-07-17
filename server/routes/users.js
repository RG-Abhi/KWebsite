import express from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { authMiddleware } from '../middleware/auth.js'
import { requireRole } from '../middleware/rbac.js'
import { logAudit } from '../lib/audit.js'
import { ROLES } from '../config/roles.js'

const router = express.Router()

router.get('/me', authMiddleware, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).select('-passwordHash')
  if (!user) {
    return res.json({
      username: req.user.username,
      role: req.user.role,
      departmentId: req.user.departmentId || null,
      displayName: req.user.username,
    })
  }
  res.json(user)
})

router.get('/', authMiddleware, requireRole(ROLES.super_admin), async (_req, res) => {
  const users = await User.find().select('-passwordHash').sort({ username: 1 })
  res.json(users)
})

router.post('/', authMiddleware, requireRole(ROLES.super_admin), async (req, res) => {
  const { username, password, role, displayName, departmentId } = req.body
  if (!username || !password) return res.status(400).json({ message: 'Username and password required' })
  const exists = await User.findOne({ username })
  if (exists) return res.status(409).json({ message: 'User exists' })
  const passwordHash = await bcrypt.hash(password, 10)
  const user = await User.create({ username, passwordHash, role: role || ROLES.content_editor, displayName, departmentId })
  await logAudit({ action: 'user.create', entityType: 'user', entityId: user._id, user: req.user })
  res.json({ success: true, user: { ...user.toObject(), passwordHash: undefined } })
})

router.put('/:id', authMiddleware, requireRole(ROLES.super_admin), async (req, res) => {
  const updates = { ...req.body }
  delete updates.passwordHash
  if (updates.password) {
    updates.passwordHash = await bcrypt.hash(updates.password, 10)
    delete updates.password
  }
  const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-passwordHash')
  await logAudit({ action: 'user.update', entityType: 'user', entityId: req.params.id, user: req.user })
  res.json({ success: true, user })
})
router.delete('/:id', authMiddleware, requireRole(ROLES.super_admin), async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id)
  if (!user) return res.status(404).json({ message: 'User not found' })
  await logAudit({ action: 'user.delete', entityType: 'user', entityId: req.params.id, user: req.user, meta: { username: user.username } })
  res.json({ success: true })
})

export default router
