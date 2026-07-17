import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  displayName: { type: String, default: '' },
  passwordHash: { type: String, required: true },
  role: { type: String, required: true, default: 'content_editor' },
  departmentId: { type: String, default: null },
  active: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.model('User', userSchema)
