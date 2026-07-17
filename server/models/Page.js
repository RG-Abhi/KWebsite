import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
  pageKey: { type: String, required: true, unique: true }, // e.g. "about/overview", "admissions/coursesoffered"
  title: { type: String, required: true },
  visible: { type: Boolean, default: true },
  sections: { type: Array, default: [] }, // Array of layout blocks
  seo: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    keywords: { type: String, default: '' },
    ogImage: { type: String, default: '' }
  },
  lastEditedBy: { type: String, default: '' },
  lastEditedAt: { type: Date, default: Date.now }
}, { 
  timestamps: true,
  minimize: false // Store empty objects/arrays
});

const Page = mongoose.model('Page', pageSchema);
export default Page;
