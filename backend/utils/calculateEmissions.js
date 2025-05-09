const emissionConfig = require("./emissionConfig");

const calculateDailyStatsFromAnswers = (answers) => {
  let points = 0;
  let totalEmission = 0;

  const breakdown = {
    transport: 0,
    food: 0,
    energy: 0,
    water: 0,
    waste: 0,
    sustainability: 0,
  };

  // 🚲 Transport
  const modes = answers.transport?.["How did you commute today?"] || [];
  const transportModesConfig = emissionConfig.transportation.modes;

  if (modes.includes("walking") || modes.includes("bicycle")) {
    points += 20;
  }

  Object.keys(transportModesConfig).forEach((mode) => {
    const distance = parseFloat(answers.transport?.[`Distance traveled by ${mode}`]) || 0;
    if (distance > 0) {
      const config = transportModesConfig[mode];
      const emission = distance * config.emission;
      breakdown.transport += emission;
      points += config.points;
    }
  });

  // 🍛 Food
  const meal = answers.food?.["What kind of meals did you have today?"];
  if (meal && emissionConfig.food.mealTypes[meal.toLowerCase()]) {
    const { emission, points: pts } = emissionConfig.food.mealTypes[meal.toLowerCase()];
    breakdown.food += emission;
    points += pts;
  }

  const orderedOnline = answers.food?.["Did you order food online today?"];
  if (orderedOnline && emissionConfig.food.orderedOnline[orderedOnline.toLowerCase()]) {
    const { emission, points: pts } = emissionConfig.food.orderedOnline[orderedOnline.toLowerCase()];
    breakdown.food += emission;
    points += pts;
  }

  const foodWaste = answers.food?.["How much food did you waste today?"];
  if (foodWaste && emissionConfig.food.foodWaste[foodWaste.toLowerCase().replace(/\s/g, "")]) {
    const { emission, points: pts } = emissionConfig.food.foodWaste[foodWaste.toLowerCase().replace(/\s/g, "")];
    breakdown.food += emission;
    points += pts;
  }

  // ⚡ Energy
  const acHours = parseFloat(answers.energy?.["How many hours did you use the AC today?"]) || 0;
  const fanHours = parseFloat(answers.energy?.["How many hours did you use the fan today?"]) || 0;
  breakdown.energy += acHours * emissionConfig.energy.ac.emissionPerHour;
  breakdown.energy += fanHours * emissionConfig.energy.fan.emissionPerHour;

  const turnedOff = answers.energy?.["Did you turn off appliances or devices when not in use?"];
  const renewable = answers.energy?.["Did you use renewable energy sources today?"];
  const lightsOff = answers.energy?.["Did you turn off lights or devices in unoccupied rooms today?"];

  if (turnedOff) {
    const { reduction = 0, points: pts = 0 } = emissionConfig.energy.turnedOffAppliances[turnedOff.toLowerCase()];
    breakdown.energy -= reduction;
    points += pts;
  }
  if (renewable) {
    const { reduction = 0, points: pts = 0 } = emissionConfig.energy.renewableEnergy[renewable.toLowerCase()];
    breakdown.energy -= reduction;
    points += pts;
  }
  if (lightsOff) {
    const { reduction = 0, points: pts = 0 } = emissionConfig.energy.turnedOffLights[lightsOff.toLowerCase()];
    breakdown.energy -= reduction;
    points += pts;
  }

  // 💧 Water
  const bath = answers.water?.["How did you take a bath today?"];
  if (bath && emissionConfig.water.bath[bath]) {
    const { emission, points: pts } = emissionConfig.water.bath[bath];
    breakdown.water += emission;
    points += pts;
  }

  const ro = answers.water?.["Did you use an RO purifier today?"];
  if (ro && emissionConfig.water.roPurifier[ro.toLowerCase()]) {
    const { emission, points: pts } = emissionConfig.water.roPurifier[ro.toLowerCase()];
    breakdown.water += emission;
    points += pts;
  }

  const reuse = answers.water?.["If yes, did you reuse the rejected water?"];
  if (reuse && emissionConfig.water.reuseRejectedWater[reuse.toLowerCase()]) {
    const { reduction, points: pts } = emissionConfig.water.reuseRejectedWater[reuse.toLowerCase()];
    breakdown.water -= reduction;
    points += pts;
  }

  const source = answers.water?.["What was your primary water source today?"];
  if (source && emissionConfig.water.sources[source.toLowerCase()]) {
    const { emission, points: pts } = emissionConfig.water.sources[source.toLowerCase()];
    breakdown.water += emission;
    points += pts;
  }

  // 🗑️ Waste
  const wasteKeys = Object.keys(emissionConfig.waste);
  for (const key of wasteKeys) {
    const label = `Did you ${key.replace(/([A-Z])/g, " $1").toLowerCase()} today?`;
    const response = answers.waste?.[label];
    if (response && emissionConfig.waste[key][response.toLowerCase()]) {
      const { reduction = 0, points: pts = 0 } = emissionConfig.waste[key][response.toLowerCase()];
      breakdown.waste -= reduction;
      points += pts;
    }
  }

  // 🌿 Sustainability
  const ecoAction = answers.sustainability?.["Did you do anything eco-friendly today?"];
  if (ecoAction && emissionConfig.sustainability.ecoFriendlyActions[ecoAction.toLowerCase().replace(/\s/g, "")]) {
    const { reduction, points: pts } = emissionConfig.sustainability.ecoFriendlyActions[ecoAction.toLowerCase().replace(/\s/g, "")];
    breakdown.sustainability -= reduction;
    points += pts;
  }

  const sustainKeys = ["ecoFriendlyPurchases", "communityInitiatives", "carbonOffset", "learnOrShare"];
  for (const key of sustainKeys) {
    const label = Object.keys(emissionConfig.sustainability[key])[0] === "yes" ? `Did you ${key.replace(/([A-Z])/g, " ").toLowerCase()} today?` : "";
    const response = answers.sustainability?.[label];
    if (response && emissionConfig.sustainability[key][response.toLowerCase()]) {
      const { reduction = 0, points: pts = 0 } = emissionConfig.sustainability[key][response.toLowerCase()];
      breakdown.sustainability -= reduction;
      points += pts;
    }
  }

  // 🔢 Final emission
  totalEmission = Object.values(breakdown).reduce((sum, val) => sum + val, 0);

  return {
    totalEmission,
    totalGreenPoints: points,
    breakdown,
  };
};

module.exports = { calculateDailyStatsFromAnswers };
