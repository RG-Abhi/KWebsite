import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import SiteData from './models/SiteData.js';

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kmit_db');
    const siteData = await SiteData.findOne().lean();
    if (!siteData) {
      console.log('No SiteData found!');
      process.exit(1);
    }
    
    fs.writeFileSync('temp_sitedata.json', JSON.stringify(siteData, null, 2));
    console.log('Dumped to temp_sitedata.json');

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
