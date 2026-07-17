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

const restoreDatabase = async () => {
  try {
    if (!fs.existsSync('database_dump.json')) {
      console.error('database_dump.json not found!');
      process.exit(1);
    }
    
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kmit_db');
    console.log('Connected.');

    const dump = JSON.parse(fs.readFileSync('database_dump.json', 'utf8'));

    if (dump.AcademicDoc) await AcademicDoc.insertMany(dump.AcademicDoc);
    if (dump.AuditLog) await AuditLog.insertMany(dump.AuditLog);
    if (dump.Department) await Department.insertMany(dump.Department);
    if (dump.Exam) await Exam.insertMany(dump.Exam);
    if (dump.Faculty) await Faculty.insertMany(dump.Faculty);
    if (dump.Notice) await Notice.insertMany(dump.Notice);
    if (dump.Page) await Page.insertMany(dump.Page);
    if (dump.SiteData) await SiteData.insertMany(dump.SiteData);
    if (dump.User) await User.insertMany(dump.User);
    if (dump.WorkflowItem) await WorkflowItem.insertMany(dump.WorkflowItem);

    console.log('Database successfully restored from database_dump.json!');
    process.exit(0);
  } catch (error) {
    console.error('Error restoring database:', error);
    process.exit(1);
  }
};

restoreDatabase();
