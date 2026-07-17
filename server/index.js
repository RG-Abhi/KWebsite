import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import dataRoutes from './routes/data.js';
import pageRoutes from './routes/pages.js';
import departmentRoutes from './routes/departments.js';
import examRoutes from './routes/exams.js';
import mediaRoutes from './routes/media.js';
import streamRoutes from './routes/stream.js';
import userRoutes from './routes/users.js';
import noticeRoutes from './routes/notices.js';
import facultyRoutes from './routes/faculty.js';
import academicRoutes from './routes/academics.js';
import workflowRoutes from './routes/workflows.js';
import searchRoutes from './routes/search.js';
import analyticsRoutes from './routes/analytics.js';
import { uploadsDirPath } from './middleware/upload.js';
import { seedUsers } from './lib/seedUsers.js';
import Notice from './models/Notice.js';
import { syncPublishedNoticesToSite } from './lib/syncNoticesToSite.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(uploadsDirPath));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/academics', academicRoutes);
app.use('/api/workflows', workflowRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api', streamRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Connect to MongoDB and start server
const start = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB.');
    await seedUsers();

    setInterval(async () => {
      const r = await Notice.updateMany(
        { expiresAt: { $lt: new Date() }, status: 'published' },
        { status: 'archived' }
      );
      if (r.modifiedCount > 0) await syncPublishedNoticesToSite();
    }, 60 * 60 * 1000);

    app.listen(PORT, () => {
      console.log(`KMIT API ready at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
};

start();
