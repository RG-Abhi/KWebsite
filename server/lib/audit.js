import AuditLog from '../models/AuditLog.js'

export async function logAudit({ action, entityType, entityId, user, meta }) {
  try {
    await AuditLog.create({
      action,
      entityType,
      entityId: String(entityId || ''),
      userId: user?.username || '',
      username: user?.username || '',
      meta,
    })
  } catch (err) {
    console.error('Audit log failed:', err.message)
  }
}
