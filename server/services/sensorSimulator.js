const db = require('../database');

// Plant-specific optimal ranges for sensor simulation
const PLANT_RANGES = {
  Kale:     { tempMin: 15, tempMax: 24, humMin: 60, humMax: 70, lightMin: 400, lightMax: 800 },
  Lettuce:  { tempMin: 15, tempMax: 24, humMin: 60, humMax: 70, lightMin: 300, lightMax: 700 },
  Celery:   { tempMin: 15, tempMax: 24, humMin: 60, humMax: 70, lightMin: 350, lightMax: 750 },
  Pepper:   { tempMin: 21, tempMax: 29, humMin: 50, humMax: 60, lightMin: 500, lightMax: 900 },
  Cucumber: { tempMin: 21, tempMax: 29, humMin: 50, humMax: 60, lightMin: 500, lightMax: 900 },
  Palak:    { tempMin: 18, tempMax: 24, humMin: 60, humMax: 70, lightMin: 300, lightMax: 700 },
};

// Tank sensor ranges
const TANK_RANGES = {
  ph:          { min: 5.2, max: 7.2, decimals: 1 },
  tds:         { min: 400, max: 2000, decimals: 0 },
  temperature: { min: 18, max: 30, decimals: 1 },
};

function randomInRange(min, max, decimals = 1) {
  const value = min + Math.random() * (max - min);
  return parseFloat(value.toFixed(decimals));
}

// Sometimes exceed the threshold to trigger alerts (20% chance)
function sometimesExceed(value, max, overshoot = 5) {
  if (Math.random() < 0.2) {
    return parseFloat((max + Math.random() * overshoot).toFixed(1));
  }
  return value;
}

function updateSensorReadings() {
  const insertReading = db.prepare(
    'INSERT INTO sensor_readings (entity_type, entity_id, reading_type, value) VALUES (?, ?, ?, ?)'
  );

  // Update tank readings
  const tanks = db.prepare('SELECT id FROM tanks').all();
  const insertMany = db.transaction(() => {
    tanks.forEach(tank => {
      insertReading.run('tank', tank.id, 'ph', randomInRange(TANK_RANGES.ph.min, TANK_RANGES.ph.max, 1));
      insertReading.run('tank', tank.id, 'tds', randomInRange(TANK_RANGES.tds.min, TANK_RANGES.tds.max, 0));
      insertReading.run('tank', tank.id, 'temperature', randomInRange(TANK_RANGES.temperature.min, TANK_RANGES.temperature.max, 1));
    });

    // Update farm readings
    const farms = db.prepare('SELECT id, plant_type FROM farms').all();
    farms.forEach(farm => {
      const ranges = PLANT_RANGES[farm.plant_type] || PLANT_RANGES.Lettuce;
      
      let temp = randomInRange(ranges.tempMin - 2, ranges.tempMax + 2, 1);
      temp = sometimesExceed(temp, ranges.tempMax, 6);
      
      insertReading.run('farm', farm.id, 'humidity', randomInRange(ranges.humMin - 5, ranges.humMax + 5, 1));
      insertReading.run('farm', farm.id, 'temperature', temp);
      insertReading.run('farm', farm.id, 'light', randomInRange(ranges.lightMin - 50, ranges.lightMax + 50, 0));
    });
  });

  insertMany();

  // Clean up old readings (keep last 100 per entity/type combo)
  db.prepare(`
    DELETE FROM sensor_readings 
    WHERE id NOT IN (
      SELECT id FROM (
        SELECT id, ROW_NUMBER() OVER (PARTITION BY entity_type, entity_id, reading_type ORDER BY timestamp DESC) as rn
        FROM sensor_readings
      ) WHERE rn <= 100
    )
  `).run();

  console.log(`📡 Sensor readings updated at ${new Date().toLocaleTimeString()}`);
}

function startSimulator() {
  console.log('🔄 Sensor simulator started (updates every 2 minutes)');
  // Initial update
  updateSensorReadings();
  // Update every 2 minutes
  setInterval(updateSensorReadings, 2 * 60 * 1000);
}

module.exports = { startSimulator, updateSensorReadings };
