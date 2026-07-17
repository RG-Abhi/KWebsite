import express from 'express';
import Exam from '../models/Exam.js';
import { authMiddleware } from '../middleware/auth.js';
import { notifyDataChanged } from '../lib/dataEvents.js';

const router = express.Router();

// GET /api/exams - Fetch all active, non-archived, non-expired exams (Public)
router.get('/', async (req, res) => {
  try {
    const now = new Date();
    // Excluded archived and those whose expiryDate is in the past
    const query = {
      isArchived: false,
      $or: [
        { expiryDate: { $exists: false } },
        { expiryDate: null },
        { expiryDate: { $gt: now } }
      ]
    };
    
    // Sort by publishDate descending
    const exams = await Exam.find(query).sort({ publishDate: -1 });
    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/exams/admin - Fetch all exams including archived/expired (Protected)
router.get('/admin', authMiddleware, async (req, res) => {
  try {
    const exams = await Exam.find({}).sort({ publishDate: -1 });
    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/exams - Create a new exam record (Protected)
router.post('/', authMiddleware, async (req, res) => {
  const { title, category, publishDate, expiryDate, fileUrl, viewMode, linkUrl } = req.body;
  try {
    const exam = new Exam({
      title,
      category,
      publishDate: publishDate ? new Date(publishDate) : new Date(),
      expiryDate: expiryDate ? new Date(expiryDate) : null,
      fileUrl: fileUrl || '',
      viewMode: viewMode || 'both',
      linkUrl: linkUrl || ''
    });

    await exam.save();
    notifyDataChanged({ source: 'exams', action: 'create' });
    res.status(201).json({ success: true, exam });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/exams/:id - Update an exam record (Protected)
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, category, publishDate, expiryDate, fileUrl, viewMode, linkUrl, isArchived, isNew } = req.body;
  
  try {
    const exam = await Exam.findById(id);
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    if (title !== undefined) exam.title = title;
    if (category !== undefined) exam.category = category;
    if (publishDate !== undefined) exam.publishDate = publishDate ? new Date(publishDate) : exam.publishDate;
    if (expiryDate !== undefined) exam.expiryDate = expiryDate ? new Date(expiryDate) : null;
    if (fileUrl !== undefined) exam.fileUrl = fileUrl;
    if (viewMode !== undefined) exam.viewMode = viewMode;
    if (linkUrl !== undefined) exam.linkUrl = linkUrl;
    if (isArchived !== undefined) exam.isArchived = isArchived;
    if (isNew !== undefined) exam.isNew = isNew;

    await exam.save();
    notifyDataChanged({ source: 'exams', action: 'update', id });
    res.json({ success: true, exam });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/exams/:id - Delete an exam record (Protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Exam.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Exam not found' });
    }
    notifyDataChanged({ source: 'exams', action: 'delete', id });
    res.json({ success: true, message: 'Exam deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
