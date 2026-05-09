const express = require('express');
const cors = require('cors');
const path = require('path');

// Initialize database (creates tables)
const db = require('./database');

// Import routes
const authRoutes = require('./routes/auth');
const tanksRoutes = require('./routes/tanks');
const farmsRoutes = require('./routes/farms');
const sensorsRoutes = require('./routes/sensors');
const analysisRoutes = require('./routes/analysis');

// Import services
const { startSimulator } = require('./services/sensorSimulator');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tanks', tanksRoutes);
app.use('/api/farms', farmsRoutes);
app.use('/api/sensors', sensorsRoutes);
app.use('/api/analysis', analysisRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🌿 AgroEye Server running on http://localhost:${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api\n`);
  
  // Start sensor data simulator
  startSimulator();
});
