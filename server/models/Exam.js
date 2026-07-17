import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Notification', 'Hall Ticket', 'Timetable', 'Result', 'Circular'],
    required: true 
  },
  publishDate: { type: Date, default: Date.now },
  expiryDate: { type: Date }, // Optional: when past, frontend will hide/archive automatically
  fileUrl: { type: String, default: '' }, // Path to uploaded PDF
  viewMode: { type: String, enum: ['view', 'download', 'both'], default: 'both' },
  isArchived: { type: Boolean, default: false },
  isNew: { type: Boolean, default: true },
  linkUrl: { type: String, default: '' } // Fallback for external link
}, { 
  timestamps: true,
  minimize: false
});

const Exam = mongoose.model('Exam', examSchema);
export default Exam;
