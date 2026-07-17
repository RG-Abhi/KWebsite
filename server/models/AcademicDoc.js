import mongoose from 'mongoose'

const academicDocSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['regulation', 'syllabus', 'timetable', 'calendar', 'circular', 'report'], required: true },
  regulationCode: { type: String, default: '' },
  branch: { type: String, default: '' },
  year: { type: String, default: '' },
  fileUrl: { type: String, default: '' },
  status: { type: String, enum: ['draft', 'pending', 'published', 'archived'], default: 'draft' },
  departmentId: { type: String, default: null },
  tags: [String],
  version: { type: Number, default: 1 },
}, { timestamps: true })

export default mongoose.model('AcademicDoc', academicDocSchema)
