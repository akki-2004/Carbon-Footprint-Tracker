const calculateGreenPointsFromAnswers = (answers) => {
    let points = 0;

    // 🚲 Transport - Eco-friendly modes
    if (answers.transport?.["How many commute modes did you use today?"]) {
        const modes = answers.transport["How did you commute today?"] || [];
        
        if (modes.includes("walking") || modes.includes("cycling")) {
            points += 20; // Reward for eco-friendly travel
        }
    }

    // 🚗 Transport - Distance-based points (NEW)
    const transportModes = ["Auto", "Bike", "Car", "Bus", "Train", "Cycle", "Walking"];
    transportModes.forEach((mode) => {
        const distance = parseFloat(answers.transport?.[`How far did you travel by ${mode}?`]) || 0;

        if (distance > 0) {
            if (["walking", "cycling"].includes(mode.toLowerCase())) {
                points += 15; // Extra points for walking/cycling
            } else if (distance < 5) {
                points += 10;
            } else if (distance <= 10) {
                points += 5;
            }
        }
    });

    // 🍛 Food
    if (answers.food?.["What kind of meals did you have today?"] === "Vegetarian") points += 10;
    if (answers.food?.["Did you order food online today?"] === "No") points += 5;
    if (answers.food?.["How much food did you waste today?"] === "None") points += 10;

    // ⚡ Energy
    if (answers.energy?.["Did you turn off appliances or devices when not in use?"] === "Yes") points += 10;
    if (answers.energy?.["Did you use renewable energy sources today?"] === "Yes") points += 15;
    if (answers.energy?.["Did you turn off lights or devices in unoccupied rooms today?"] === "Yes") points += 10;

    if (answers.energy?.["For how many hours did you use AC today?"]) {
        let acHours = parseFloat(answers.energy["For how many hours did you use AC today?"]);
        if (acHours < 2) points += 10;
        else if (acHours <= 5) points += 5;
    }

    if (answers.energy?.["For how many hours did you use a fan today?"]) {
        let fanHours = parseFloat(answers.energy["For how many hours did you use a fan today?"]);
        if (fanHours < 5) points += 5;
    }

    if (answers.energy?.["What was the average temperature setting for your AC/heater today?"]) {
        let acTemp = parseFloat(answers.energy["What was the average temperature setting for your AC/heater today?"]);
        if (acTemp >= 26) points += 10;
        else if (acTemp >= 24) points += 5;
    }

    // 💧 Water
    if (answers.water?.["How did you take a bath today?"] === "Bucket") points += 10;
    if (answers.water?.["Did you use an RO purifier today?"] === "No") points += 5;

    if (answers.water?.["How many liters of bottled water did you consume today?"]) {
        let liters = parseFloat(answers.water["How many liters of bottled water did you consume today?"]);
        if (liters === 0) points += 10;
        else if (liters <= 2) points += 5;
    }

    // 🗑️ Waste Management
    if (answers.waste?.["Did you segregate your waste today?"] === "Yes") points += 10;
    if (answers.waste?.["Did you compost organic waste today?"] === "Yes") points += 15;
    if (answers.waste?.["Did you recycle any materials today?"] === "Yes") points += 10;
    if (answers.waste?.["Did you dispose of or recycle any electronic waste today?"] === "Yes") points += 10;
    if (answers.waste?.["Did you avoid using single-use plastics today?"] === "Yes") points += 10;
    if (answers.waste?.["Did you use any reusable items today?"] === "Yes") points += 10;

    // 🌱 Sustainability
    if (answers.sustainability?.["Did you make any eco-friendly purchases today?"] === "Yes") points += 10;
    if (answers.sustainability?.["Did you participate in any community sustainability initiatives today?"] === "Yes") points += 20;
    if (answers.sustainability?.["Did you contribute to any carbon offset programs today?"] === "Yes") points += 15;
    if (answers.sustainability?.["Did you learn or share something about sustainability today?"] === "Yes") points += 10;

    return points;
};

module.exports = { calculateGreenPointsFromAnswers };
