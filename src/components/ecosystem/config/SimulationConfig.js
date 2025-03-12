// src/components/ecosystem/config/SimulationConfig.js

const simulationConfig = {
  gridSize: 10000,
  years: 100,
  stabilizationYears: 10,
  tree: {
    initial: 5000, 
    arraySize: 10000,
    density: 15,
    ageAvg: 30,
    ageSigma: 20,
    maturity: 10,
    stressLevel: 3,
    reproductionFactor: 8,
    edibleAge: 4
  },
  deer: {
    initial: 20,
    arraySize: 500,
    maturity: 2,
    staminaFactor: 4,
    hungerFactor: 6,
    reproductionFactor: 5,
    migrationFactor: 5
  },
  wolf: {
    initial: 5,
    arraySize: 200,
    maturity: 2,
    staminaFactor: 7,
    hungerFactor: 4,
    reproductionFactor: 5,
    migrationFactor: 8
  },
  graph: {
    MAX_YEARS: 50,
    MAX_TREE_POPULATION: 2000,
    MAX_DEER_POPULATION: 100,
    MAX_WOLF_POPULATION: 15,
  }
};

export default simulationConfig;