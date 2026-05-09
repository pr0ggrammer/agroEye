# AgroEye — Hydroponics Farm Management Dashboard

A full-stack web application for managing and monitoring a hydroponic farming setup in Mumbai. The client and staff use this dashboard to monitor tanks, farms, camera feeds, and get AI-powered pest/NPK analysis.

## Tech Stack

| Layer | Technology | Reason |
|-------|-----------|--------|
| Frontend | **Vite + React** | Fast dev, component-based, ideal for dashboard UIs |
| Styling | **Vanilla CSS** (with CSS variables) | Full control, premium design |
| Backend | **Node.js + Express** | Simple REST API, easy real-time via SSE/polling |
| Database | **SQLite (via better-sqlite3)** | Zero-config, file-based, perfect for this scale |
| Auth | **JWT + bcrypt** | Secure, stateless authentication |
| AI/Analysis | **Simulated model** (rule-based) | Since no real ML model training is within scope, we simulate NPK & pest detection with randomized plausible results |
| Real-time | **Polling every 2 mins** | Dummy data auto-updates on the backend; frontend polls |

---

## User Review Required

> [!IMPORTANT]
> **AI Model Simulation**: Building & training a real TensorFlow.js pest/NPK detection model requires labeled datasets and GPU training time. Instead, I will build a **simulated AI engine** that:
> - Accepts an uploaded/captured image
> - Returns randomized but realistic NPK values for the plant shown
> - Randomly detects one of the 4 pests (mealy bugs, aphids, white flies, red spider mites) or "healthy"
> - Suggests the correct pesticide with purchase links
> 
> The UI and API will be fully architected so a real model can be swapped in later.

> [!IMPORTANT]
> **Camera Integration**: Since there's no real camera connected, I will create a **simulated camera feed** using placeholder farm images that refresh periodically. The "capture" button will grab the current frame for AI analysis.

> [!WARNING]
> **No real sensor data**: All sensor values (pH, TDS, temperature, humidity, light) will be **simulated with realistic dummy data** that fluctuates every 2 minutes within plausible ranges for each plant type.

---

## Plant Data Reference

### Optimal Growing Conditions

| Plant | Temp (°C) | pH | TDS (ppm) | Humidity (%) |
|-------|----------|-----|-----------|-------------|
| Kale | 15–24 | 5.5–6.8 | 1120–1750 | 60–70 |
| Lettuce | 15–24 | 5.5–6.5 | 560–840 | 60–70 |
| Celery | 15–24 | 6.3–6.7 | 1260–1680 | 60–70 |
| Pepper | 21–29 | 6.0–6.5 | 1400–1750 | 50–60 |
| Cucumber | 21–29 | 5.8–6.0 | 1190–1750 | 50–60 |
| Palak | 18–24 | 5.5–6.5 | 1200–1800 | 60–70 |

### Pest-to-Pesticide Mapping

| Pest | Pesticide | Buy Link |
|------|-----------|----------|
| Mealy Bugs | Neem Oil Spray | Amazon.in link |
| Aphids | Insecticidal Soap | Amazon.in link |
| White Flies | Yellow Sticky Traps + Neem Oil | Amazon.in link |
| Red Spider Mites | Miticide / Neem Oil | Amazon.in link |

---

## Proposed Changes

### Project Structure

```
AgroEye/
├── client/                    # Vite + React frontend
│   ├── public/
│   │   └── farm-images/       # Placeholder farm camera images
│   ├── src/
│   │   ├── assets/            # Icons, logos
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── TanksSection.jsx
│   │   │   ├── TankCard.jsx
│   │   │   ├── AddTankModal.jsx
│   │   │   ├── FarmSection.jsx
│   │   │   ├── FarmCard.jsx
│   │   │   ├── AddFarmModal.jsx
│   │   │   ├── ContactSection.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── CameraPage.jsx
│   │   │   └── AIAnalysisPanel.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   └── usePolling.js
│   │   ├── data/
│   │   │   └── plantData.js    # Thresholds & reference data
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css           # Design system
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── db/
│   │   ├── schema.sql
│   │   └── seed.js             # Initial dummy data
│   ├── routes/
│   │   ├── auth.js
│   │   ├── tanks.js
│   │   ├── farms.js
│   │   ├── sensors.js
│   │   └── analysis.js         # AI analysis endpoint
│   ├── middleware/
│   │   └── auth.js             # JWT verification
│   ├── services/
│   │   ├── sensorSimulator.js  # Generates & updates dummy data every 2 min
│   │   └── aiSimulator.js      # Simulated pest/NPK analysis
│   ├── database.js             # SQLite connection
│   ├── server.js               # Express app entry
│   └── package.json
└── README.md
```

---

### Backend — Server

#### [NEW] server/package.json
- Express, better-sqlite3, bcryptjs, jsonwebtoken, cors, multer (for image uploads)

#### [NEW] server/database.js
- SQLite connection setup, auto-create tables on first run

#### [NEW] server/db/schema.sql
Tables:
- `users` (id, username, password_hash, role, created_at)
- `tanks` (id, name, location, description, created_at)
- `farms` (id, name, plant_type, description, location, created_at)
- `sensor_readings` (id, entity_type [tank/farm], entity_id, reading_type, value, timestamp)
- `captured_images` (id, farm_id, image_path, analysis_result JSON, captured_at)

#### [NEW] server/db/seed.js
- Create default admin user (username: `admin`, password: `agroeye2024`)
- Create 3 initial tanks (Tank A, Tank B, Tank C) with locations
- Create 3 initial farms (Farm 1 — Kale, Farm 2 — Lettuce, Farm 3 — Pepper)
- Generate initial sensor readings

#### [NEW] server/services/sensorSimulator.js
- Runs every 2 minutes via `setInterval`
- For each tank: generates pH (5.5–7.0), TDS (500–1800), temperature (18–30°C)
- For each farm: generates humidity (45–75%), temperature (15–32°C), light (200–1000 lux)
- Values fluctuate realistically around the mean with small random deltas

#### [NEW] server/services/aiSimulator.js
- `analyzeImage(imagePath)` → returns simulated results:
  - NPK values: N (20-180 ppm), P (10-80 ppm), K (50-250 ppm)
  - Pest detection: randomly picks "Healthy" or one of 4 pests
  - If pest detected: returns pesticide name + Amazon.in purchase link
  - Confidence score for realism

#### [NEW] server/routes/auth.js
- `POST /api/auth/login` — validate credentials, return JWT
- `GET /api/auth/me` — return current user info

#### [NEW] server/routes/tanks.js
- `GET /api/tanks` — list all tanks with latest sensor readings
- `POST /api/tanks` — add new tank (name, location, description)
- `GET /api/tanks/:id` — get tank details + sensor history

#### [NEW] server/routes/farms.js
- `GET /api/farms` — list all farms with latest sensor readings + plant thresholds
- `POST /api/farms` — add new farm (name, plant_type, description, location)
- `GET /api/farms/:id` — get farm details + sensor history

#### [NEW] server/routes/sensors.js
- `GET /api/sensors/:entityType/:entityId` — get latest readings
- `GET /api/sensors/:entityType/:entityId/history` — get recent reading history

#### [NEW] server/routes/analysis.js
- `POST /api/analysis/scan` — accept image upload, run AI simulator, save result, return analysis
- `GET /api/analysis/history` — get past analysis results
- `GET /api/analysis/images` — get stored captured images

#### [NEW] server/middleware/auth.js
- JWT verification middleware for protected routes

#### [NEW] server/server.js
- Express setup, CORS, routes, sensor simulator startup

---

### Frontend — Client

#### [NEW] client/src/index.css — Design System
- Dark theme with green/emerald accent (hydroponic feel)
- CSS variables for all colors, spacing, typography
- Glassmorphism cards, gradient accents
- Smooth animations & transitions
- Google Font: Inter

#### [NEW] client/src/components/LoginPage.jsx
- Full-screen login with farm background
- Username/password form
- JWT stored in localStorage
- Redirect to dashboard on success

#### [NEW] client/src/components/Navbar.jsx
- Logo + "AgroEye" branding
- Navigation: Dashboard, Camera & AI
- User profile dropdown with logout
- Sticky, glassmorphism style

#### [NEW] client/src/components/Dashboard.jsx
- Three sections: Tanks, Farms, Contact
- Smooth scroll navigation
- Hero banner with farm stats summary

#### [NEW] client/src/components/TanksSection.jsx
- Grid of TankCards
- "Add Tank" button → opens AddTankModal
- Tank count summary

#### [NEW] client/src/components/TankCard.jsx
- Card showing: tank name, location
- Live gauges for pH, TDS, Temperature
- **Color-coded alerts** when values are out of optimal range
- Last updated timestamp
- Subtle pulse animation on live data

#### [NEW] client/src/components/AddTankModal.jsx
- Google Form-style modal
- Fields: Tank Name, Location, Description
- Form validation
- Submit → POST to API

#### [NEW] client/src/components/FarmSection.jsx
- Grid of FarmCards
- "Add Farm" button → opens AddFarmModal
- Farm count summary

#### [NEW] client/src/components/FarmCard.jsx
- Card showing: farm name, plant type (with icon)
- Live values for humidity, temperature, light
- **TEMPERATURE TRIGGER**: If temp > plant's max threshold, the card gets a red/orange warning highlight with alert icon and message
- Optimal range indicator bar

#### [NEW] client/src/components/AddFarmModal.jsx
- Google Form-style modal
- Fields: Farm Name, Plant Type (dropdown: Kale/Lettuce/Celery/Pepper/Cucumber/Palak), Location, Description
- Submit → POST to API

#### [NEW] client/src/components/ContactSection.jsx
- Simple contact card with farm address (Mumbai)
- Contact details
- Clean minimal design

#### [NEW] client/src/components/Footer.jsx
- Standard footer with copyright, links

#### [NEW] client/src/components/CameraPage.jsx (separate route)
- "View Live Feed" button → shows simulated camera image
- Image refreshes periodically
- "Capture" button → takes snapshot
- Gallery of previously captured images
- Click on any image → shows AI analysis

#### [NEW] client/src/components/AIAnalysisPanel.jsx
- Shows analysis results for a captured image:
  - NPK values with colored bar charts (N, P, K)
  - Pest detection result with confidence
  - If pest found: pest name, description, recommended pesticide, **clickable buy link**
  - Health status badge (Healthy / Warning / Critical)

#### [NEW] client/src/context/AuthContext.jsx
- React context for auth state management
- Login/logout functions, token management
- Protected route wrapper

#### [NEW] client/src/hooks/usePolling.js
- Custom hook that polls API endpoints every 2 minutes
- Returns latest data + loading state

#### [NEW] client/src/data/plantData.js
- All plant thresholds, pest data, pesticide links
- Used for client-side threshold checks

---

## Temperature Trigger Logic

When the temperature exceeds the maximum optimal range for a plant:

| Plant | Max Temp (°C) | Trigger Action |
|-------|-------------|----------------|
| Kale | 24 | Card turns orange/red, warning icon appears |
| Lettuce | 24 | Card turns orange/red, warning icon appears |
| Celery | 24 | Card turns orange/red, warning icon appears |
| Pepper | 29 | Card turns orange/red, warning icon appears |
| Cucumber | 29 | Card turns orange/red, warning icon appears |
| Palak | 24 | Card turns orange/red, warning icon appears |

The trigger will:
1. Add a pulsing red/orange border to the farm card
2. Show a warning banner: "⚠️ Temperature Alert: {current}°C exceeds optimal range for {plant} (max {threshold}°C)"
3. Change the temperature reading color to red

---

## Open Questions

> [!IMPORTANT]
> 1. **Default login credentials**: I plan to seed `admin` / `agroeye2024` as the default user. Should I add more default staff accounts?
> 2. **Contact section details**: What contact information should be displayed? I'll use placeholder Mumbai address for now.
> 3. **Color scheme preference**: I'm going with a dark theme with green/emerald accents (hydroponic green). Any preference?

---

## Verification Plan

### Automated Tests
1. Start the backend server and verify all API endpoints return correct responses
2. Start frontend dev server and verify all pages render
3. Test login flow end-to-end
4. Verify dummy data updates every 2 minutes by checking sensor readings API
5. Test add tank/farm forms submit correctly
6. Test camera page and AI analysis simulation
7. Verify temperature triggers highlight correctly (by ensuring some dummy values exceed thresholds)

### Manual Verification
- Browser walkthrough of all pages with screenshots
- Verify responsive design
- Check that temperature alerts trigger correctly
- Verify AI analysis panel shows pest info with purchase links
