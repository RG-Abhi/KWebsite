import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  deptKey: { type: String, required: true, unique: true }, // e.g. "cse", "it", "csm"
  name: { type: String, required: true },
  seo: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    keywords: { type: String, default: '' },
    ogImage: { type: String, default: '' }
  }
}, { 
  timestamps: true,
  minimize: false,
  strict: false // allows dynamic legacy data nesting perfectly
});

const Department = mongoose.model('Department', departmentSchema);
export default Department;
