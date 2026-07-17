import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import SiteData from '../models/SiteData.js';
import Page from '../models/Page.js';
import Department from '../models/Department.js';
import Exam from '../models/Exam.js';
import { INITIAL_DATA } from '../defaults.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const seedCMS = async () => {
  try {
    console.log('--- Starting CMS Database Seeding ---');

    // 1. Clear existing data
    console.log('Clearing old data in SiteData, Page, Department, and Exam...');
    await SiteData.deleteMany({});
    await Page.deleteMany({});
    await Department.deleteMany({});
    await Exam.deleteMany({});

    // 2. Prepare and seed SiteData (strip pages, archives, and deptDetails to prevent bloat)
    console.log('Seeding SiteData global and homepage config...');
    const siteConfig = { ...INITIAL_DATA };
    
    // Extract pages to seed them separately
    const legacyPages = siteConfig.pages || {};
    delete siteConfig.pages;
    delete siteConfig.deptDetails; // Moved to Department collection

    await SiteData.create(siteConfig);
    console.log('SiteData seeded successfully.');

    // 3. Seed Page collection from legacyPages
    console.log('Seeding Page collection...');
    const pageDocs = [];
    for (const [key, pageData] of Object.entries(legacyPages)) {
      pageDocs.push({
        pageKey: key,
        title: pageData.hero?.title || key.split('/').pop(),
        sections: pageData.sections || [],
        visible: pageData.visible !== false,
        seo: pageData.seo || {
          title: pageData.hero?.title || '',
          description: pageData.hero?.text || '',
          keywords: '',
          ogImage: pageData.hero?.image || ''
        },
        lastEditedBy: 'system',
        lastEditedAt: new Date()
      });
    }
    
    if (pageDocs.length > 0) {
      await Page.insertMany(pageDocs);
      console.log(`Seeded ${pageDocs.length} pages in the Page collection.`);
    }

    // 4. Seed Department collection from JSON files
    console.log('Seeding Department collection...');
    const allDeptsPath = path.resolve(__dirname, '../../src/data/allDepartmentsLegacyData.json');
    const cseLegacyPath = path.resolve(__dirname, '../../src/data/cseLegacyData.json');
    
    let allDepts = {};
    let cseLegacy = {};

    if (fs.existsSync(allDeptsPath)) {
      allDepts = JSON.parse(fs.readFileSync(allDeptsPath, 'utf8'));
    } else {
      console.warn('allDepartmentsLegacyData.json not found at:', allDeptsPath);
    }

    if (fs.existsSync(cseLegacyPath)) {
      cseLegacy = JSON.parse(fs.readFileSync(cseLegacyPath, 'utf8'));
    } else {
      console.warn('cseLegacyData.json not found at:', cseLegacyPath);
    }

    const deptKeys = ['cse', 'it', 'csm', 'csd', 'hs'];
    const deptNames = {
      cse: 'Computer Science & Engineering',
      it: 'Information Technology',
      csm: 'CSE - Artificial Intelligence & ML',
      csd: 'CSE - Data Science',
      hs: 'Humanities & Sciences'
    };

    const deptDocs = [];
    for (const key of deptKeys) {
      const deptSource = allDepts[key] || {};
      
      // CSE combines two JSON sources
      let deptData = { ...deptSource };
      if (key === 'cse') {
        const richFaculty = deptSource.faculty;
        const richLabs = deptSource.labs;
        const richSyllabus = deptSource.syllabus;
        
        deptData = { ...deptData, ...cseLegacy };
        
        if (richFaculty) {
          deptData.faculty = richFaculty;
        }
        if (richLabs) {
          deptData.labs = richLabs;
        }
        if (richSyllabus) {
          deptData.syllabus = richSyllabus;
        }
      }

      deptDocs.push({
        deptKey: key,
        name: deptNames[key] || key.toUpperCase(),
        seo: {
          title: `${deptNames[key]} | KMIT`,
          description: deptSource.about?.text || '',
          keywords: `${key}, department, engineering, kmit`,
          ogImage: ''
        },
        ...deptData // Save full dynamic nested keys for DeptDetailPage.jsx compatibility
      });
    }

    await Department.insertMany(deptDocs);
    console.log(`Seeded ${deptDocs.length} departments with dynamic nested legacy structures.`);

    // 5. Seed Exam collection from exams_data.json
    console.log('Seeding Exam collection...');
    const examsPath = path.resolve(__dirname, '../../scratch/exams_data.json');
    if (fs.existsSync(examsPath)) {
      const rawExams = JSON.parse(fs.readFileSync(examsPath, 'utf8'));
      const examDocs = [];

      // Helper function to convert "DD-MM-YYYY" string into a Date object
      const parseDateStr = (dateStr) => {
        if (!dateStr) return new Date();
        const parts = dateStr.split('-');
        let d;
        if (parts.length === 3) {
          // DD-MM-YYYY -> YYYY, MM (0-indexed), DD
          d = new Date(parts[2], parts[1] - 1, parts[0]);
        } else {
          d = new Date(dateStr);
        }
        if (isNaN(d.getTime())) return new Date();
        return d;
      };


      // Add Notifications
      if (rawExams.notifications && Array.isArray(rawExams.notifications)) {
        for (const notif of rawExams.notifications) {
          examDocs.push({
            title: notif.title,
            category: 'Notification',
            publishDate: parseDateStr(notif.date),
            fileUrl: notif.url,
            viewMode: 'both',
            isArchived: false,
            isNew: false
          });
        }
      }

      // Add Timetables
      if (rawExams.timetables && Array.isArray(rawExams.timetables)) {
        for (const timetable of rawExams.timetables) {
          examDocs.push({
            title: timetable.title,
            category: 'Timetable',
            publishDate: parseDateStr(timetable.date),
            fileUrl: timetable.url,
            viewMode: 'both',
            isArchived: false,
            isNew: false
          });
        }
      }

      if (examDocs.length > 0) {
        await Exam.insertMany(examDocs);
        console.log(`Seeded ${examDocs.length} exam notifications and timetables.`);
      }
    } else {
      console.warn('exams_data.json not found at:', examsPath);
    }

    console.log('--- CMS Database Seeding Completed Successfully ---');
    return true;
  } catch (err) {
    console.error('Seeding CMS failed:', err.message);
    throw err;
  }
};
