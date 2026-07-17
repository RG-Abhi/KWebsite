import express from 'express'
import fs from 'fs'
import path from 'path'
import SiteData from '../models/SiteData.js'
import { authMiddleware } from '../middleware/auth.js'
import { upload, uploadsDirPath } from '../middleware/upload.js'
import { notifyDataChanged } from '../lib/dataEvents.js'

const router = express.Router()

router.get('/', async (_req, res) => {
  try {
    const doc = await SiteData.findOne().select('mediaAssets').lean()
    res.json({ assets: doc?.mediaAssets || [] })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' })
  }

  const asset = {
    id: req.file.filename,
    name: req.file.originalname,
    url: `/uploads/${req.file.filename}`,
    mime: req.file.mimetype,
    size: req.file.size,
    uploadedAt: new Date().toISOString(),
  }

  try {
    let doc = await SiteData.findOne()
    if (!doc) {
      return res.status(503).json({ message: 'Site data not initialized. Start the server once to seed the database.' })
    }
    if (!Array.isArray(doc.mediaAssets)) doc.mediaAssets = []
    doc.mediaAssets.unshift(asset)
    await doc.save()
    notifyDataChanged({ source: 'media-upload' })
    res.json({ success: true, asset })
  } catch (err) {
    fs.unlink(path.join(uploadsDirPath, req.file.filename), () => {})
    res.status(500).json({ message: err.message })
  }
})

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const doc = await SiteData.findOne()
    if (!doc?.mediaAssets) {
      return res.status(404).json({ message: 'Asset not found' })
    }

    const idx = doc.mediaAssets.findIndex((a) => a.id === req.params.id)
    if (idx === -1) {
      return res.status(404).json({ message: 'Asset not found' })
    }

    const [removed] = doc.mediaAssets.splice(idx, 1)
    await doc.save()

    const filePath = path.join(uploadsDirPath, removed.id)
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)

    notifyDataChanged({ source: 'media-delete' })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST /api/media/replace/:id - Overwrite existing asset bytes keeping same name/URL (Protected)
router.post('/replace/:id', authMiddleware, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' })
  }

  const { id } = req.params
  try {
    const doc = await SiteData.findOne()
    if (!doc?.mediaAssets) {
      fs.unlinkSync(req.file.path)
      return res.status(404).json({ message: 'Media assets not initialized' })
    }

    const idx = doc.mediaAssets.findIndex((a) => a.id === id)
    if (idx === -1) {
      fs.unlinkSync(req.file.path)
      return res.status(404).json({ message: 'Asset not found' })
    }

    // Overwrite old file on disk with the new uploaded file bytes
    const targetPath = path.join(uploadsDirPath, id)
    fs.copyFileSync(req.file.path, targetPath)
    fs.unlinkSync(req.file.path) // delete temp uploaded file

    // Update metadata
    doc.mediaAssets[idx].size = req.file.size
    doc.mediaAssets[idx].uploadedAt = new Date().toISOString()
    doc.markModified('mediaAssets')
    await doc.save()

    notifyDataChanged({ source: 'media-replace', id })
    res.json({ success: true, asset: doc.mediaAssets[idx] })
  } catch (err) {
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path)
    res.status(500).json({ message: err.message })
  }
})

export default router

