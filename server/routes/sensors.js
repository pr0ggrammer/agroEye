const express = require('express');
const db = require('../database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// GET /api/sensors/:entityType/:entityId — get latest readings
router.get('/:entityType/:entityId', authMiddleware, (req, res) => {
  const { entityType, entityId } = req.params;
  
  if (!['tank', 'farm'].includes(entityType)) {
    return res.status(400).json({ error: 'Entity type must be tank or farm' });
  }

  const readings = db.prepare(`
    SELECT sr.reading_type, sr.value, sr.timestamp
    FROM sensor_readings sr
    WHERE sr.entity_type = ? AND sr.entity_id = ?
    AND sr.id IN (
      SELECT MAX(id) FROM sensor_readings 
      WHERE entity_type = ? AND entity_id = ?
      GROUP BY reading_type
    )
  `).all(entityType, entityId, entityType, entityId);

  const readingsMap = {};
  readings.forEach(r => {
    readingsMap[r.reading_type] = { value: r.value, timestamp: r.timestamp };
  });

  res.json({ readings: readingsMap });
});

// GET /api/sensors/:entityType/:entityId/history — get recent history
router.get('/:entityType/:entityId/history', authMiddleware, (req, res) => {
  const { entityType, entityId } = req.params;
  const limit = parseInt(req.query.limit) || 50;

  const readings = db.prepare(`
    SELECT reading_type, value, timestamp
    FROM sensor_readings
    WHERE entity_type = ? AND entity_id = ?
    ORDER BY timestamp DESC
    LIMIT ?
  `).all(entityType, entityId, limit);

  res.json({ readings });
});

module.exports = router;
