import mongoose from 'mongoose'

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, default: '' },
  type: { type: String, enum: ['notice', 'marquee', 'popup', 'news', 'placement'], default: 'notice' },
  status: { type: String, enum: ['draft', 'pending', 'published', 'archived'], default: 'draft' },
  priority: { type: Number, default: 0 },
  link: { type: String, default: '' },
  departmentId: { type: String, default: null },
  publishAt: { type: Date, default: null },
  expiresAt: { type: Date, default: null },
  createdBy: { type: String, default: '' },
  approvedBy: { type: String, default: null },
}, { timestamps: true })

export default mongoose.model('Notice', noticeSchema)
