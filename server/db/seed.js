const db = require('../database');
const bcrypt = require('bcryptjs');

function seed() {
  console.log('🌱 Seeding database...');

  // --- Users ---
  const existingUser = db.prepare('SELECT id FROM users WHERE username = ?').get('admin');
  if (!existingUser) {
    const hash = bcrypt.hashSync('agroeye2024', 10);
    db.prepare('INSERT INTO users (username, password_hash, full_name, role) VALUES (?, ?, ?, ?)').run('admin', hash, 'Admin User', 'admin');
    
    const staffHash = bcrypt.hashSync('staff123', 10);
    db.prepare('INSERT INTO users (username, password_hash, full_name, role) VALUES (?, ?, ?, ?)').run('staff1', staffHash, 'Farm Staff', 'staff');
    console.log('  ✅ Users created');
  } else {
    console.log('  ⏭️ Users already exist');
  }

  // --- Tanks ---
  const existingTanks = db.prepare('SELECT COUNT(*) as count FROM tanks').get();
  if (existingTanks.count === 0) {
    const insertTank = db.prepare('INSERT INTO tanks (name, location, description) VALUES (?, ?, ?)');
    insertTank.run('Tank Alpha', 'Section A - Ground Floor', 'Primary nutrient tank for leafy greens');
    insertTank.run('Tank Beta', 'Section B - Ground Floor', 'Secondary tank for fruiting vegetables');
    insertTank.run('Tank Gamma', 'Section C - Rooftop', 'Backup nutrient reservoir');
    console.log('  ✅ Tanks created');
  } else {
    console.log('  ⏭️ Tanks already exist');
  }

  // --- Farms ---
  const existingFarms = db.prepare('SELECT COUNT(*) as count FROM farms').get();
  if (existingFarms.count === 0) {
    const insertFarm = db.prepare('INSERT INTO farms (name, plant_type, location, description) VALUES (?, ?, ?, ?)');
    insertFarm.run('Farm 1', 'Kale', 'Greenhouse A', 'NFT system growing Kale');
    insertFarm.run('Farm 2', 'Lettuce', 'Greenhouse A', 'DWC system growing Lettuce');
    insertFarm.run('Farm 3', 'Pepper', 'Greenhouse B', 'Dutch Bucket system for Peppers');
    insertFarm.run('Farm 4', 'Cucumber', 'Greenhouse B', 'Vertical tower for Cucumbers');
    insertFarm.run('Farm 5', 'Palak', 'Greenhouse C', 'NFT system growing Palak (Spinach)');
    insertFarm.run('Farm 6', 'Celery', 'Greenhouse C', 'DWC system for Celery');
    console.log('  ✅ Farms created');
  } else {
    console.log('  ⏭️ Farms already exist');
  }

  // --- Initial sensor readings ---
  const existingReadings = db.prepare('SELECT COUNT(*) as count FROM sensor_readings').get();
  if (existingReadings.count === 0) {
    const insertReading = db.prepare('INSERT INTO sensor_readings (entity_type, entity_id, reading_type, value) VALUES (?, ?, ?, ?)');

    // Tank readings
    const tanks = db.prepare('SELECT id FROM tanks').all();
    tanks.forEach(tank => {
      insertReading.run('tank', tank.id, 'ph', 5.5 + Math.random() * 1.5);
      insertReading.run('tank', tank.id, 'tds', 600 + Math.random() * 1000);
      insertReading.run('tank', tank.id, 'temperature', 20 + Math.random() * 8);
    });

    // Farm readings  
    const farms = db.prepare('SELECT id FROM farms').all();
    farms.forEach(farm => {
      insertReading.run('farm', farm.id, 'humidity', 50 + Math.random() * 25);
      insertReading.run('farm', farm.id, 'temperature', 18 + Math.random() * 14);
      insertReading.run('farm', farm.id, 'light', 300 + Math.random() * 700);
    });

    console.log('  ✅ Initial sensor readings created');
  } else {
    console.log('  ⏭️ Sensor readings already exist');
  }

  console.log('🌿 Seeding complete!');
}

seed();
