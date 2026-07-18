import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Page from './models/Page.js';

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kmit_db');
    const page = await Page.findOne({ pageKey: 'academics/value-added' });
    if (!page) {
      console.log('No Page found for academics/value-added!');
      process.exit(1);
    }
    
    const cardsSection = page.sections.find(s => s.type === 'cards');
    if (cardsSection) {
      cardsSection.items = [
        { title: 'BEC', desc: 'Cambridge Business English Certificate coaching — free of cost.', icon: 'fa-certificate', modalKey: 'BEC', linkLabel: 'View Details' },
        { title: 'SONET', desc: 'School of New and Emerging Technologies add-on programmes.', icon: 'fa-microchip', modalKey: 'SONET', linkLabel: 'View Details' },
        { title: 'Finishing School', desc: 'Career-readiness training for KMIT students.', icon: 'fa-graduation-cap', modalKey: 'FINISHING SCHOOL', linkLabel: 'View Details' },
        { title: 'Project School', desc: 'Real-world industry projects for students.', icon: 'fa-rocket', modalKey: 'PROJECT SCHOOL', linkLabel: 'View Details' },
        { title: 'Imagineering School', desc: 'Creative engineering and design thinking programme.', icon: 'fa-lightbulb', modalKey: 'IMAGINEERING SCHOOL', linkLabel: 'View Details' },
        { title: 'Trishul', desc: 'First-year foundation programme.', icon: 'fa-layer-group', modalKey: 'TRISHUL', linkLabel: 'View Details' },
        { title: 'Arjuna', desc: 'Second-year advanced programming.', icon: 'fa-code', modalKey: 'ARJUNA', linkLabel: 'View Details' },
        { title: 'Nirantar', desc: 'Weekly TTS high-speed coding competitions.', icon: 'fa-arrow-rotate-right', modalKey: 'NIRANTAR (NFS)', linkLabel: 'View Details' },
        { title: 'International FS', desc: 'Global standards software engineering.', icon: 'fa-earth-americas', modalKey: 'INTERNATIONAL FINISHING SCHOOL', linkLabel: 'View Details' }
      ];
      
      page.markModified('sections');
      await page.save();
      console.log('SUCCESS: Updated Page collection for academics/value-added');
    } else {
      console.log('No cards section found in Page!');
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
