import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import Page from './models/Page.js';

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kmit_db');
    const pages = await Page.find().lean();
    
    fs.writeFileSync('temp_pages.json', JSON.stringify(pages, null, 2));
    console.log('Dumped to temp_pages.json, count:', pages.length);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
