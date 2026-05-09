const express = require('express');
const db = require('../database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// GET /api/tanks — list all tanks with latest readings
router.get('/', authMiddleware, (req, res) => {
  const tanks = db.prepare('SELECT * FROM tanks ORDER BY created_at DESC').all();
  
  const tanksWithReadings = tanks.map(tank => {
    const readings = db.prepare(`
      SELECT sr.reading_type, sr.value, sr.timestamp
      FROM sensor_readings sr
      WHERE sr.entity_type = 'tank' AND sr.entity_id = ?
      AND sr.id IN (
        SELECT MAX(id) FROM sensor_readings 
        WHERE entity_type = 'tank' AND entity_id = ?
        GROUP BY reading_type
      )
    `).all(tank.id, tank.id);

    const readingsMap = {};
    readings.forEach(r => {
      readingsMap[r.reading_type] = { value: r.value, timestamp: r.timestamp };
    });

    return { ...tank, readings: readingsMap };
  });

  res.json({ tanks: tanksWithReadings });
});

// POST /api/tanks — add a new tank
router.post('/', authMiddleware, (req, res) => {
  const { name, location, description } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Tank name is required' });
  }

  const result = db.prepare('INSERT INTO tanks (name, location, description) VALUES (?, ?, ?)').run(name, location || '', description || '');
  
  // Generate initial readings for new tank
  const insertReading = db.prepare('INSERT INTO sensor_readings (entity_type, entity_id, reading_type, value) VALUES (?, ?, ?, ?)');
  insertReading.run('tank', result.lastInsertRowid, 'ph', 5.5 + Math.random() * 1.5);
  insertReading.run('tank', result.lastInsertRowid, 'tds', 600 + Math.random() * 1000);
  insertReading.run('tank', result.lastInsertRowid, 'temperature', 20 + Math.random() * 8);

  const tank = db.prepare('SELECT * FROM tanks WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json({ tank });
});

// GET /api/tanks/:id — get tank details
router.get('/:id', authMiddleware, (req, res) => {
  const tank = db.prepare('SELECT * FROM tanks WHERE id = ?').get(req.params.id);
  
  if (!tank) {
    return res.status(404).json({ error: 'Tank not found' });
  }

  const readings = db.prepare(`
    SELECT reading_type, value, timestamp
    FROM sensor_readings
    WHERE entity_type = 'tank' AND entity_id = ?
    ORDER BY timestamp DESC
    LIMIT 30
  `).all(req.params.id);

  res.json({ tank, readings });
});

module.exports = router;
