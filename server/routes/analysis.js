const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../database');
const { authMiddleware } = require('../middleware/auth');
const { analyzeImage } = require('../services/aiSimulator');

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'capture-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// POST /api/analysis/scan — upload image and get AI analysis
router.post('/scan', authMiddleware, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Image file is required' });
  }

  const farmId = req.body.farm_id || null;
  const analysis = analyzeImage(req.file.filename);
  
  db.prepare('INSERT INTO captured_images (farm_id, image_filename, analysis_result) VALUES (?, ?, ?)')
    .run(farmId, req.file.filename, JSON.stringify(analysis));

  res.json({
    image: req.file.filename,
    analysis
  });
});

// GET /api/analysis/history — get past analysis results
router.get('/history', authMiddleware, (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  const images = db.prepare(`
    SELECT ci.*, f.name as farm_name, f.plant_type
    FROM captured_images ci
    LEFT JOIN farms f ON ci.farm_id = f.id
    ORDER BY ci.captured_at DESC
    LIMIT ?
  `).all(limit);

  const results = images.map(img => ({
    ...img,
    analysis_result: img.analysis_result ? JSON.parse(img.analysis_result) : null,
    image_url: `/uploads/${img.image_filename}`
  }));

  res.json({ history: results });
});

// POST /api/analysis/simulate — simulate analysis without uploading (for demo camera)
router.post('/simulate', authMiddleware, (req, res) => {
  const imagePath = req.body.imagePath || 'simulated-capture.jpg';
  const analysis = analyzeImage(imagePath);
  
  db.prepare('INSERT INTO captured_images (farm_id, image_filename, analysis_result) VALUES (?, ?, ?)')
    .run(null, 'simulated-' + Date.now() + '.jpg', JSON.stringify(analysis));

  res.json({ analysis });
});

// DELETE /api/analysis/:id — delete a captured image
router.delete('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  try {
    const result = db.prepare('DELETE FROM captured_images WHERE id = ?').run(id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Capture not found' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete capture' });
  }
});

module.exports = router;
