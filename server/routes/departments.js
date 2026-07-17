import express from 'express';
import Department from '../models/Department.js';
import { authMiddleware } from '../middleware/auth.js';
import { notifyDataChanged } from '../lib/dataEvents.js';

const router = express.Router();

// GET /api/departments/:deptKey - Fetch department details dynamically
router.get('/:deptKey', async (req, res) => {
  const { deptKey } = req.params;
  try {
    const dept = await Department.findOne({ deptKey });
    if (!dept) {
      return res.status(404).json({ message: `Department '${deptKey}' not found` });
    }
    res.json(dept);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/departments/:deptKey - Update department details (Protected)
router.put('/:deptKey', authMiddleware, async (req, res) => {
  const { deptKey } = req.params;
  
  try {
    const dept = await Department.findOneAndUpdate(
      { deptKey },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!dept) {
      return res.status(404).json({ message: `Department '${deptKey}' not found` });
    }

    notifyDataChanged({ source: 'departments', deptKey });
    res.json({ success: true, department: dept });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
