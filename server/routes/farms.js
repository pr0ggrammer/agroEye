const express = require('express');
const db = require('../database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// GET /api/farms — list all farms with latest readings
router.get('/', authMiddleware, (req, res) => {
  const farms = db.prepare('SELECT * FROM farms ORDER BY created_at DESC').all();
  
  const farmsWithReadings = farms.map(farm => {
    const readings = db.prepare(`
      SELECT sr.reading_type, sr.value, sr.timestamp
      FROM sensor_readings sr
      WHERE sr.entity_type = 'farm' AND sr.entity_id = ?
      AND sr.id IN (
        SELECT MAX(id) FROM sensor_readings 
        WHERE entity_type = 'farm' AND entity_id = ?
        GROUP BY reading_type
      )
    `).all(farm.id, farm.id);

    const readingsMap = {};
    readings.forEach(r => {
      readingsMap[r.reading_type] = { value: r.value, timestamp: r.timestamp };
    });

    return { ...farm, readings: readingsMap };
  });

  res.json({ farms: farmsWithReadings });
});

// POST /api/farms — add a new farm
router.post('/', authMiddleware, (req, res) => {
  const { name, plant_type, location, description } = req.body;
  
  if (!name || !plant_type) {
    return res.status(400).json({ error: 'Farm name and plant type are required' });
  }

  const validPlants = ['Kale', 'Lettuce', 'Celery', 'Pepper', 'Cucumber', 'Palak'];
  if (!validPlants.includes(plant_type)) {
    return res.status(400).json({ error: `Plant type must be one of: ${validPlants.join(', ')}` });
  }

  const result = db.prepare('INSERT INTO farms (name, plant_type, location, description) VALUES (?, ?, ?, ?)').run(name, plant_type, location || '', description || '');
  
  // Generate initial readings for new farm
  const insertReading = db.prepare('INSERT INTO sensor_readings (entity_type, entity_id, reading_type, value) VALUES (?, ?, ?, ?)');
  insertReading.run('farm', result.lastInsertRowid, 'humidity', 50 + Math.random() * 25);
  insertReading.run('farm', result.lastInsertRowid, 'temperature', 18 + Math.random() * 14);
  insertReading.run('farm', result.lastInsertRowid, 'light', 300 + Math.random() * 700);

  const farm = db.prepare('SELECT * FROM farms WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json({ farm });
});

// GET /api/farms/:id — get farm details
router.get('/:id', authMiddleware, (req, res) => {
  const farm = db.prepare('SELECT * FROM farms WHERE id = ?').get(req.params.id);
  
  if (!farm) {
    return res.status(404).json({ error: 'Farm not found' });
  }

  const readings = db.prepare(`
    SELECT reading_type, value, timestamp
    FROM sensor_readings
    WHERE entity_type = 'farm' AND entity_id = ?
    ORDER BY timestamp DESC
    LIMIT 30
  `).all(req.params.id);

  res.json({ farm, readings });
});

module.exports = router;
