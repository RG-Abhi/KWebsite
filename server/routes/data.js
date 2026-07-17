import express from 'express';
import SiteData from '../models/SiteData.js';
import { INITIAL_DATA } from '../defaults.js';
import { authMiddleware } from '../middleware/auth.js';
import { notifyDataChanged } from '../lib/dataEvents.js';
import { hydrateHomeMedia } from '../lib/hydrateMedia.js';
import { seedCMS } from '../lib/seedCMS.js';

const router = express.Router();

// GET /api/data - Fetch the entire site document
router.get('/', async (req, res) => {
  try {
    let data = await SiteData.findOne().lean();
    if (!data) {
      await seedCMS();
      data = await SiteData.findOne().lean();
    } else if (data.version !== INITIAL_DATA.version) {
      await seedCMS();
      data = await SiteData.findOne().lean();
    }
    res.json(hydrateHomeMedia(data));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/data - Update a root-level key (Protected)
router.put('/', authMiddleware, async (req, res) => {
  const { key, value } = req.body;
  try {
    const data = await SiteData.findOne();
    data[key] = value;
    await data.save();
    notifyDataChanged({ source: 'put', key });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/data/deep - Update a nested path (Protected)
// uses dot-notation: { path: "siteMeta.fullName", value: "New Name" }
router.put('/deep', authMiddleware, async (req, res) => {
  const { path, value } = req.body;
  try {
    const update = {};
    update[path] = value;
    
    const data = await SiteData.findOneAndUpdate(
      {}, 
      { $set: update },
      { new: true }
    );
    notifyDataChanged({ source: 'deep', path });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/data/reset - Factory reset (Protected)
router.post('/reset', authMiddleware, async (req, res) => {
  try {
    await seedCMS();
    const data = await SiteData.findOne().lean();
    notifyDataChanged({ source: 'reset' });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
