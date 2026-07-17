import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import { seedUsers } from './lib/seedUsers.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kmit_db')
  .then(async () => {
    await User.deleteMany({});
    console.log('Deleted all users');
    await seedUsers();
    console.log('Reseeded users successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
