import mongoose from 'mongoose'

const workflowSchema = new mongoose.Schema({
  entityType: { type: String, required: true },
  entityId: { type: String, required: true },
  title: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  submittedBy: { type: String, default: '' },
  reviewedBy: { type: String, default: null },
  comment: { type: String, default: '' },
  payload: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true })

export default mongoose.model('WorkflowItem', workflowSchema)
