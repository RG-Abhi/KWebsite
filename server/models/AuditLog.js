import mongoose from 'mongoose'

const auditSchema = new mongoose.Schema({
  action: { type: String, required: true },
  entityType: { type: String, default: '' },
  entityId: { type: String, default: '' },
  userId: { type: String, default: '' },
  username: { type: String, default: '' },
  meta: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true })

export default mongoose.model('AuditLog', auditSchema)
