import mongoose from 'mongoose';

const siteDataSchema = new mongoose.Schema({
  version: String,
  navItems: Array,
  announcements: [String],
  heroSlides: Array,
  stats: Array,
  noticeBoard: Object,
  whyChoose: Array,
  explore: Array,
  departments: Array,
  recruiters: Object,
  siteMeta: Object,
  deptDetails: Object,
  archives: Object,
  pages: Object,
}, { 
  timestamps: true,
  minimize: false, // Ensure empty objects are stored
  strict: false    // Allow dynamic fields for God Mode
});

const SiteData = mongoose.model('SiteData', siteDataSchema);
export default SiteData;
