import mongoose from 'mongoose'

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, default: '' },
  departmentId: { type: String, required: true },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  photoUrl: { type: String, default: '' },
  qualifications: { type: String, default: '' },
  specializations: [String],
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
}, { timestamps: true })

export default mongoose.model('Faculty', facultySchema)
