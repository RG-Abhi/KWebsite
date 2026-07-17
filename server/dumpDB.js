import mongoose from 'mongoose';
import fs from 'fs';
import dotenv from 'dotenv';

import AcademicDoc from './models/AcademicDoc.js';
import AuditLog from './models/AuditLog.js';
import Department from './models/Department.js';
import Exam from './models/Exam.js';
import Faculty from './models/Faculty.js';
import Notice from './models/Notice.js';
import Page from './models/Page.js';
import SiteData from './models/SiteData.js';
import User from './models/User.js';
import WorkflowItem from './models/WorkflowItem.js';

dotenv.config();

const dumpDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kmit_db');
    console.log('Connected.');

    const dump = {
      AcademicDoc: await AcademicDoc.find({}),
      AuditLog: await AuditLog.find({}),
      Department: await Department.find({}),
      Exam: await Exam.find({}),
      Faculty: await Faculty.find({}),
      Notice: await Notice.find({}),
      Page: await Page.find({}),
      SiteData: await SiteData.find({}),
      User: await User.find({}),
      WorkflowItem: await WorkflowItem.find({})
    };

    fs.writeFileSync('database_dump.json', JSON.stringify(dump, null, 2));
    console.log('Database successfully dumped to database_dump.json');
    process.exit(0);
  } catch (error) {
    console.error('Error dumping database:', error);
    process.exit(1);
  }
};

dumpDatabase();
