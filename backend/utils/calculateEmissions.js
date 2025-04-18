const emissionConfig = require("./emissionConfig");

const calculateDailyStatsFromAnswers = (answers) => {
    let points = 0;
    let emission = 0;

    console.log("Received Answers:", answers);

    // 🚲 Transport - Eco-friendly modes
    const modes = answers.transport?.["How did you commute today?"] || [];
    if (modes.includes("walking") || modes.includes("bicycle")) {
        points += 20;
        console.log("Eco-friendly transport mode: walking or bicycle. Points added: 20");
    }

    // 🚗 Transport - Distance-based points & emission
    const transportModesConfig = emissionConfig.transportation.modes;
    Object.keys(transportModesConfig).forEach((mode) => {
        const distance = parseFloat(answers.transport?.[`How far did you travel by ${mode}?`]) || 0;
        if (distance > 0) {
            const modeConfig = transportModesConfig[mode];
            emission += distance * (modeConfig.emission || 0);
            points += (modeConfig.points || 0);
            console.log(`Mode: ${mode}, Distance: ${distance}, Emission: ${modeConfig.emission}, Points: ${modeConfig.points}`);
        }
    });

    // 🍛 Food - Meal type and food waste
    const meal = answers.food?.["What kind of meals did you have today?"];
    if (meal && emissionConfig.food.mealTypes[meal.toLowerCase()]) {
        points += emissionConfig.food.mealTypes[meal.toLowerCase()].points || 0;
        emission += emissionConfig.food.mealTypes[meal.toLowerCase()].emission || 0;
        console.log(`Meal: ${meal}, Emission: ${emissionConfig.food.mealTypes[meal.toLowerCase()].emission}`);
    }

    const orderedOnline = answers.food?.["Did you order food online today?"];
    if (orderedOnline && emissionConfig.food.orderedOnline[orderedOnline.toLowerCase()]) {
        points += emissionConfig.food.orderedOnline[orderedOnline.toLowerCase()].points || 0;
        emission += emissionConfig.food.orderedOnline[orderedOnline.toLowerCase()].emission || 0;
        console.log(`Ordered Online: ${orderedOnline}, Emission: ${emissionConfig.food.orderedOnline[orderedOnline.toLowerCase()].emission}`);
    }

    // ⚡ Energy - AC and fan usage
    const acHours = parseFloat(answers.energy?.["How many hours did you use the AC today?"]) || 0;
    const fanHours = parseFloat(answers.energy?.["How many hours did you use the fan today?"]) || 0;
    emission += acHours * emissionConfig.energy.ac.emissionPerHour || 0;
    emission += fanHours * emissionConfig.energy.fan.emissionPerHour || 0;

    console.log(`AC Hours: ${acHours}, Fan Hours: ${fanHours}, Emission: ${emission}`);

    // 💧 Water - Bathing and purifier usage
    const bath = answers.water?.["How did you take a bath today?"];
    if (bath && emissionConfig.water.bath[bath]) {
        points += emissionConfig.water.bath[bath].points || 0;
        emission += emissionConfig.water.bath[bath].emission || 0;
        console.log(`Bath: ${bath}, Emission: ${emissionConfig.water.bath[bath].emission}`);
    }

    const roPurifier = answers.water?.["Did you use an RO purifier today?"];
    if (roPurifier && emissionConfig.water.roPurifier[roPurifier.toLowerCase()]) {
        points += emissionConfig.water.roPurifier[roPurifier.toLowerCase()].points || 0;
        emission += emissionConfig.water.roPurifier[roPurifier.toLowerCase()].emission || 0;
        console.log(`RO Purifier: ${roPurifier}, Emission: ${emissionConfig.water.roPurifier[roPurifier.toLowerCase()].emission}`);
    }

    // 🗑️ Waste - Reduction actions
    const wasteActions = [
        "segregate",
        "compost",
        "recycle",
        "eWaste",
        "avoidSingleUsePlastic",
        "reusableItems",
        "reduceWaste"
    ];

    wasteActions.forEach((key) => {
        const answer = answers.waste?.[`Did you ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} today?`];
        if (answer && emissionConfig.waste[key]?.[answer.toLowerCase()]) {
            const config = emissionConfig.waste[key]?.[answer.toLowerCase()];
            points += config?.points || 0;
            emission -= config?.reduction || 0;
            console.log(`Waste Action: ${key}, Answer: ${answer}, Reduction: ${config?.reduction}, Points: ${config?.points}`);
        }
    });

    console.log("Total Points:", points);
    console.log("Total Emission:", emission);

    // Correct Return Value
    return {
        totalEmission: emission,
        totalGreenPoints: points
    };
};



module.exports = { calculateDailyStatsFromAnswers };
