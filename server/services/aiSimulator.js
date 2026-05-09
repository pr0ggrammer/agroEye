// Simulated AI analysis for pest detection and NPK values
// This simulates what a real TensorFlow.js / ML model would do

const PESTS = [
  {
    name: 'Mealy Bugs',
    description: 'Small, white, cotton-like insects that cluster on stems and leaf joints. They suck plant sap and excrete honeydew, leading to mold growth.',
    pesticide: 'Neem Oil Spray (Cold-Pressed)',
    buyLink: 'https://www.amazon.in/s?k=neem+oil+spray+for+plants',
    severity: 'moderate'
  },
  {
    name: 'Aphids',
    description: 'Tiny green, black, or yellow soft-bodied insects found on undersides of leaves. They cause curling, yellowing, and stunted growth.',
    pesticide: 'Insecticidal Soap Spray',
    buyLink: 'https://www.amazon.in/s?k=insecticidal+soap+spray+for+plants',
    severity: 'moderate'
  },
  {
    name: 'White Flies',
    description: 'Small white flying insects on leaf undersides. They cause yellowing, wilting, and transmit plant viruses.',
    pesticide: 'Yellow Sticky Traps + Neem Oil',
    buyLink: 'https://www.amazon.in/s?k=yellow+sticky+traps+whitefly+neem+oil',
    severity: 'high'
  },
  {
    name: 'Red Spider Mites',
    description: 'Microscopic red/brown mites causing tiny yellow dots (stippling) on leaves. Heavy infestation shows fine webbing.',
    pesticide: 'Miticide Spray / Neem Oil Treatment',
    buyLink: 'https://www.amazon.in/s?k=miticide+spray+spider+mites+plants',
    severity: 'high'
  }
];

// NPK ranges for hydroponic vegetables (in ppm)
const NPK_RANGES = {
  nitrogen: { min: 40, max: 180, unit: 'ppm', optimal: { min: 80, max: 150 } },
  phosphorus: { min: 15, max: 80, unit: 'ppm', optimal: { min: 30, max: 60 } },
  potassium: { min: 60, max: 250, unit: 'ppm', optimal: { min: 100, max: 200 } },
};

function randomInRange(min, max) {
  return parseFloat((min + Math.random() * (max - min)).toFixed(1));
}

function analyzeImage(imagePath) {
  // Simulate processing delay concept (but we return immediately)
  const timestamp = new Date().toISOString();

  // Generate NPK values
  const npk = {
    nitrogen: {
      value: randomInRange(NPK_RANGES.nitrogen.min, NPK_RANGES.nitrogen.max),
      unit: NPK_RANGES.nitrogen.unit,
      status: 'normal',
      optimal: NPK_RANGES.nitrogen.optimal
    },
    phosphorus: {
      value: randomInRange(NPK_RANGES.phosphorus.min, NPK_RANGES.phosphorus.max),
      unit: NPK_RANGES.phosphorus.unit,
      status: 'normal',
      optimal: NPK_RANGES.phosphorus.optimal
    },
    potassium: {
      value: randomInRange(NPK_RANGES.potassium.min, NPK_RANGES.potassium.max),
      unit: NPK_RANGES.potassium.unit,
      status: 'normal',
      optimal: NPK_RANGES.potassium.optimal
    },
  };

  // Determine NPK statuses
  Object.keys(npk).forEach(key => {
    const { value, optimal } = npk[key];
    if (value < optimal.min) npk[key].status = 'low';
    else if (value > optimal.max) npk[key].status = 'high';
    else npk[key].status = 'optimal';
  });

  // Pest detection — determine deterministically based on image name if possible
  const pathLower = (imagePath || '').toLowerCase();
  let isPestDetected = false;
  let pest = null;

  if (pathLower.includes('kale')) {
    isPestDetected = false;
  } else if (pathLower.includes('pepper1')) {
    isPestDetected = true;
    pest = PESTS[3]; // Red Spider Mites
  } else if (pathLower.includes('pepper')) {
    isPestDetected = true;
    pest = PESTS[1]; // Aphids
  } else if (pathLower.includes('palak')) {
    isPestDetected = false; // Healthy
  } else if (pathLower.includes('hydroponic')) {
    isPestDetected = false; // Healthy
  } else {
    // Fallback: 100% chance pest for other things per user request
    isPestDetected = true;
    pest = PESTS[Math.floor(Math.random() * PESTS.length)];
  }

  let pestResult = null;

  if (isPestDetected) {
    pestResult = {
      detected: true,
      confidence: parseFloat((0.72 + Math.random() * 0.25).toFixed(2)),
      pest: pest.name,
      description: pest.description,
      severity: pest.severity,
      recommendation: {
        pesticide: pest.pesticide,
        buyLink: pest.buyLink,
        application: 'Apply every 7-10 days. Spray on undersides of leaves. Best applied early morning or late evening.'
      }
    };
  } else {
    pestResult = {
      detected: false,
      confidence: parseFloat((0.85 + Math.random() * 0.14).toFixed(2)),
      pest: null,
      description: 'No pest infestation detected. Plants appear healthy.',
      severity: 'none',
      recommendation: {
        pesticide: null,
        buyLink: null,
        application: 'Continue regular monitoring. Maintain good airflow and hygiene.'
      }
    };
  }

  // Overall health score
  const npkScore = Object.values(npk).filter(n => n.status === 'optimal').length;
  let healthStatus = 'Healthy';
  if (pestResult.detected && pestResult.severity === 'high') healthStatus = 'Critical';
  else if (pestResult.detected || npkScore < 2) healthStatus = 'Warning';

  // Override to strictly Healthy if no pest is detected
  if (!pestResult.detected) {
    Object.keys(npk).forEach(k => {
        npk[k].value = randomInRange(npk[k].optimal.min, npk[k].optimal.max);
        npk[k].status = 'optimal';
    });
    healthStatus = 'Healthy';
  }

  return {
    timestamp,
    npk,
    pest: pestResult,
    healthStatus,
    healthScore: pestResult.detected ? Math.floor(30 + Math.random() * 40) : Math.floor(70 + Math.random() * 30),
    imagePath,
  };
}

module.exports = { analyzeImage, PESTS };
