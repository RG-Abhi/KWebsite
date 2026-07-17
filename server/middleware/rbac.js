import { canAccessModule } from '../config/roles.js'

export function requireModule(module) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' })
    if (req.user.role === 'super_admin') return next()
    if (!canAccessModule(req.user.role, module)) {
      return res.status(403).json({ message: 'Forbidden' })
    }
    next()
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' })
    if (roles.includes(req.user.role) || req.user.role === 'super_admin') return next()
    return res.status(403).json({ message: 'Forbidden' })
  }
}
