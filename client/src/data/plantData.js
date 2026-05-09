// Plant-specific data for hydroponics farming
// Mumbai climate adjusted thresholds

export const PLANTS = {
  Kale: {
    name: 'Kale',
    tempMin: 15,
    tempMax: 24,
    phMin: 5.5,
    phMax: 6.8,
    tdsMin: 1120,
    tdsMax: 1750,
    humidityMin: 60,
    humidityMax: 70,
    lightMin: 400,
    lightMax: 800,
    growthDays: '55-75 days',
    system: 'NFT / DWC',
    nutrients: 'High Nitrogen, moderate Ca, Mg',
    description: 'Cool-season leafy green, rich in vitamins K, A, C. Thrives in hydroponic NFT systems.',
  },
  Lettuce: {
    name: 'Lettuce',
    tempMin: 15,
    tempMax: 24,
    phMin: 5.5,
    phMax: 6.5,
    tdsMin: 560,
    tdsMax: 840,
    humidityMin: 60,
    humidityMax: 70,
    lightMin: 300,
    lightMax: 700,
    growthDays: '30-45 days',
    system: 'NFT / DWC / Raft',
    nutrients: 'Balanced NPK, moderate Ca',
    description: 'Fast-growing salad green, ideal for hydroponics. Low TDS requirement makes it beginner-friendly.',
  },
  Celery: {
    name: 'Celery',
    tempMin: 15,
    tempMax: 24,
    phMin: 6.3,
    phMax: 6.7,
    tdsMin: 1260,
    tdsMax: 1680,
    humidityMin: 60,
    humidityMax: 70,
    lightMin: 350,
    lightMax: 750,
    growthDays: '85-120 days',
    system: 'DWC / Ebb & Flow',
    nutrients: 'High K, moderate N, regular Ca/Mg',
    description: 'Slow-growing but rewarding. Requires consistent nutrient levels and cool temperatures.',
  },
  Pepper: {
    name: 'Pepper',
    tempMin: 21,
    tempMax: 29,
    phMin: 6.0,
    phMax: 6.5,
    tdsMin: 1400,
    tdsMax: 1750,
    humidityMin: 50,
    humidityMax: 60,
    lightMin: 500,
    lightMax: 900,
    growthDays: '60-90 days',
    system: 'Dutch Bucket / Drip',
    nutrients: 'High P & K during fruiting, moderate N',
    description: 'Warm-season fruiting crop. Needs higher temps and strong light for optimal fruit set.',
  },
  Cucumber: {
    name: 'Cucumber',
    tempMin: 21,
    tempMax: 29,
    phMin: 5.8,
    phMax: 6.0,
    tdsMin: 1190,
    tdsMax: 1750,
    humidityMin: 50,
    humidityMax: 60,
    lightMin: 500,
    lightMax: 900,
    growthDays: '50-70 days',
    system: 'Dutch Bucket / Vertical Tower',
    nutrients: 'High K, moderate N & P, Ca supplements',
    description: 'Vigorous climber, great for vertical hydroponics. High yield potential with proper training.',
  },
  Palak: {
    name: 'Palak',
    tempMin: 18,
    tempMax: 24,
    phMin: 5.5,
    phMax: 6.5,
    tdsMin: 1200,
    tdsMax: 1800,
    humidityMin: 60,
    humidityMax: 70,
    lightMin: 300,
    lightMax: 700,
    growthDays: '25-40 days',
    system: 'NFT / DWC',
    nutrients: 'High N, moderate Fe & Mn',
    description: 'Indian spinach variety, very fast growing. Excellent for continuous harvest in hydroponic systems.',
  },
};

export const PESTS = {
  'Mealy Bugs': {
    name: 'Mealy Bugs',
    description: 'Small, white, cotton-like insects that cluster on stems and leaf joints. They suck plant sap and excrete honeydew.',
    damage: 'Stunted growth, yellowing leaves, sooty mold from honeydew',
    pesticide: 'Neem Oil Spray (Cold-Pressed)',
    buyLink: 'https://www.amazon.in/s?k=neem+oil+spray+for+plants',
    prevention: 'Regular inspection, good air circulation, avoid over-fertilizing with nitrogen',
  },
  'Aphids': {
    name: 'Aphids',
    description: 'Tiny green, black, or yellow soft-bodied insects found on undersides of leaves.',
    damage: 'Leaf curling, yellowing, stunted growth, virus transmission',
    pesticide: 'Insecticidal Soap Spray',
    buyLink: 'https://www.amazon.in/s?k=insecticidal+soap+spray+for+plants',
    prevention: 'Yellow sticky traps, remove affected leaves, introduce ladybugs',
  },
  'White Flies': {
    name: 'White Flies',
    description: 'Small white flying insects found on leaf undersides. Fly up in clouds when disturbed.',
    damage: 'Yellowing, wilting, honeydew secretion, virus transmission',
    pesticide: 'Yellow Sticky Traps + Neem Oil',
    buyLink: 'https://www.amazon.in/s?k=yellow+sticky+traps+whitefly+neem+oil',
    prevention: 'Reflective mulch, sticky traps, proper ventilation',
  },
  'Red Spider Mites': {
    name: 'Red Spider Mites',
    description: 'Microscopic red/brown mites causing yellow stippling on leaves. Fine webbing visible in heavy infestations.',
    damage: 'Leaf stippling, bronzing, defoliation, reduced yield',
    pesticide: 'Miticide Spray / Neem Oil Treatment',
    buyLink: 'https://www.amazon.in/s?k=miticide+spray+spider+mites+plants',
    prevention: 'Maintain humidity above 60%, regular misting, predatory mites',
  },
};

// Helper: check if a temperature exceeds threshold for a plant
export function isTempAlert(plantType, temperature) {
  const plant = PLANTS[plantType];
  if (!plant) return false;
  return temperature > plant.tempMax;
}

// Helper: get status color for a sensor value within a range
export function getValueStatus(value, min, max) {
  if (value < min) return 'low';
  if (value > max) return 'high';
  return 'optimal';
}

export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
