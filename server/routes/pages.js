import express from 'express';
import Page from '../models/Page.js';
import { authMiddleware } from '../middleware/auth.js';
import { notifyDataChanged } from '../lib/dataEvents.js';

const router = express.Router();

// GET /api/pages/:pageKey - Fetch a page dynamically (handles slashes in pageKey)
router.get('/*', async (req, res) => {
  const pageKey = req.params[0]; // Captures full wildcard path e.g. "about/kmes"
  try {
    const page = await Page.findOne({ pageKey });
    if (!page) {
      return res.status(404).json({ message: `Page '${pageKey}' not found` });
    }
    res.json(page);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/pages/:pageKey - Update page contents (Protected)
router.put('/*', authMiddleware, async (req, res) => {
  const pageKey = req.params[0];
  const { title, sections, visible, seo } = req.body;
  try {
    let page = await Page.findOne({ pageKey });
    if (!page) {
      // Auto-create page if not exists (upsert)
      page = new Page({ pageKey, title: title || pageKey.split('/').pop() });
    }

    if (title !== undefined) page.title = title;
    if (sections !== undefined) page.sections = sections;
    if (visible !== undefined) page.visible = visible;
    if (seo !== undefined) page.seo = seo;
    page.lastEditedBy = req.user?.username || 'admin';
    page.lastEditedAt = new Date();

    await page.save();
    notifyDataChanged({ source: 'pages', pageKey });
    res.json({ success: true, page });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/pages/:pageKey - Delete a page (Protected)
router.delete('/*', authMiddleware, async (req, res) => {
  const pageKey = req.params[0];
  try {
    const result = await Page.deleteOne({ pageKey });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: `Page '${pageKey}' not found` });
    }
    notifyDataChanged({ source: 'pages_delete', pageKey });
    res.json({ success: true, message: `Page '${pageKey}' deleted successfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
