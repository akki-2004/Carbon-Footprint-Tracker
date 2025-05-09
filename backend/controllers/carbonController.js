const mongoose = require("mongoose");
const moment = require("moment-timezone"); // For timezone handling
const CarbonFootprint = require("../models/CarbonFootprint");
const { calculateDailyStatsFromAnswers } = require("../utils/calculateEmissions");

// 📌 Function to calculate and store carbon footprint
async function calculateCarbonFootprint(req, res) {
    try {
        console.log("📩 Received Request Data:", req.body);
        let { userId, transport, food, energy, water, waste, sustainability } = req.body;

        // Validate userId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            console.log("❌ Invalid userId format:", userId);
            return res.status(400).json({ error: "Invalid userId format" });
        }

        userId = new mongoose.Types.ObjectId(userId);

        // Ensure all values are numeric
        const userData = {
            transport: transport || 0,
            food: food || 0,
            energy: energy || 0,
            water: water || 0,
            waste: waste || 0,
            sustainability: sustainability || 0,
        };

        // Calculate emissions and green points
        const { totalEmission, totalGreenPoints, breakdown } = calculateDailyStatsFromAnswers(userData);
        console.log("🔍 Total Emission:", totalEmission);  // Check if totalEmission is correct
        console.log("🔍 Total Green Points:", totalGreenPoints);  // Check if totalGreenPoints is correct

        if (typeof totalGreenPoints !== "number" || isNaN(totalGreenPoints)) {
            console.log("❌ Invalid green points calculation.");
            return res.status(400).json({ success: false, message: "Invalid green points calculation." });
        }

        const todayDate = moment().tz("Asia/Kolkata").format("YYYY-MM-DD"); // Get today's date in IST

        // Find the user entry in the database
        let userEntry = await CarbonFootprint.findOne({ userId });

        if (!userEntry) {
            userEntry = new CarbonFootprint({
              userId,
              greenPoints: [{ date: todayDate, points: totalGreenPoints }],
              totalGreenPoints: totalGreenPoints,
              dailyEmissions: [{
                date: todayDate,
                total: totalEmission,
                breakdown
              }],
            });
        }
          
        else {
            // Check if the user already submitted for today
            const existingEntry = userEntry.greenPoints.find(entry => entry.date === todayDate);

            if (existingEntry) {
                console.log("⚠️ Entry already exists for today. Rejecting the request.");
                return res.status(400).json({
                    success: false,
                    message: "You can only submit once per day.",
                });
            }

            // Add new data for today if no entry exists for today
            userEntry.greenPoints.push({ date: todayDate, points: totalGreenPoints });
            userEntry.dailyEmissions.push({
            date: todayDate,
            total: totalEmission,
            breakdown,
            });
            userEntry.totalGreenPoints += totalGreenPoints;
        }

        // Log dailyEmissions before saving
        console.log("Daily Emissions before saving:", userEntry.dailyEmissions);

        // Save the user entry to the database
        await userEntry.save();
        console.log("✅ Successfully Saved to MongoDB!", userEntry);

        return res.status(201).json({
            success: true,
            message: "Carbon footprint recorded!",
            data: userEntry,
        });

    } catch (error) {
        console.error("❌ Server Error:", error);
        return res.status(500).json({ success: false, message: "Server error." });
    }
}



// 📌 Function to add green points (Ensures single submission per day)
const addGreenPoints = async (req, res) => {
    try {
        const { userId, points } = req.body;

        if (!userId || points == null) {
            return res.status(400).json({ message: "User ID and points are required" });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId format" });
        }

        const todayDate = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");

        let userFootprint = await CarbonFootprint.findOne({ userId });

        if (!userFootprint) {
            // Create new user entry
            userFootprint = new CarbonFootprint({
                userId,
                greenPoints: [{ date: todayDate, points }],
                totalGreenPoints: points,
                dailyEmissions: [], // Optional, you can also include it here
            });
        } else {
            const existingEntry = userFootprint.greenPoints.find(entry => entry.date === todayDate);

            if (existingEntry) {
                return res.status(400).json({ message: "Entry already exists for today. You can only submit once per day." });
            }

            userFootprint.greenPoints.push({ date: todayDate, points });
            userFootprint.totalGreenPoints += points;
        }

        await userFootprint.save();
        return res.status(200).json({ message: "Green points added successfully!", data: userFootprint });

    } catch (error) {
        console.error("❌ Error adding green points:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


// 📌 Function to get a user's carbon footprint records
async function getCarbonFootprint(req, res) {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid userId format" });
        }

        const userFootprint = await CarbonFootprint.findOne({ userId });

        if (!userFootprint) {
            return res.status(404).json({ success: false, message: "No record found for this user." });
        }

        return res.status(200).json({ success: true, data: userFootprint });
    } catch (error) {
        console.error("❌ Error Fetching Carbon Footprint:", error);
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

// 📌 Function to update a user's green points
const updateCarbonFootprint = async (userId, points) => {
    try {
        const todayDate = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");

        const userEntry = await CarbonFootprint.findOne({ userId });

        if (userEntry) {
            const existingEntry = userEntry.greenPoints.find(entry => entry.date === todayDate);

            if (existingEntry) {
                console.log("⚠️ Entry already exists for today. Cannot update.");
                return { success: false, message: "Entry already exists for today. You can only submit once per day." };
            }

            userEntry.greenPoints.push({ date: todayDate, points });
            userEntry.totalGreenPoints += points;

            await userEntry.save();
            return { success: true, message: "New entry added for today." };
        } else {
            await CarbonFootprint.create({
                userId,
                greenPoints: [{ date: todayDate, points }],
                totalGreenPoints: points,
            });

            return { success: true, message: "First green points entry created." };
        }
    } catch (error) {
        console.error("❌ Error updating green points:", error);
        return { success: false, message: "An error occurred while updating green points." };
    }
};

// 📌 Function to delete a user's carbon footprint record
async function deleteCarbonFootprint(req, res) {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid userId format" });
        }

        const deletedEntry = await CarbonFootprint.findOneAndDelete({ userId });

        if (!deletedEntry) {
            return res.status(404).json({ success: false, message: "Entry not found" });
        }

        return res.status(200).json({ success: true, message: "Carbon footprint entry deleted successfully!" });
    } catch (error) {
        console.error("❌ Error Deleting Carbon Footprint:", error);
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

const getWeeklyReport = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid userId format" });
        }

        const userData = await CarbonFootprint.findOne({ userId });

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        const today = moment().tz("Asia/Kolkata");
        const startDate = today.clone().subtract(6, 'days'); // 7-day rolling window: today and previous 6 days

        // Build map for quick lookup
        const emissionsMap = new Map();
        const breakdownMap = new Map();

        userData.dailyEmissions.forEach(e => {
        emissionsMap.set(e.date, e.total || e.emission || 0);
        breakdownMap.set(e.date, e.breakdown || {});
        });


        const pointsMap = new Map();
        userData.greenPoints.forEach(p => {
            pointsMap.set(p.date, p.points);
        });

        // Prepare result arrays for the past 7 days
        const emissions = [];
        const greenPoints = [];
        let totalPoints = 0;
        let totalEmissions = 0;

        const breakdowns = [];

        for (let i = 0; i < 7; i++) {
        const date = startDate.clone().add(i, 'days').format("YYYY-MM-DD");

        const emission = emissionsMap.get(date) || 0;
        const points = pointsMap.get(date) || 0;
        const breakdown = breakdownMap.get(date) || {
            transport: 0,
            food: 0,
            energy: 0,
            water: 0,
            waste: 0,
            sustainability: 0
        };

        emissions.push({ date, emission });
        greenPoints.push({ date, points });
        breakdowns.push({ date, ...breakdown });

        totalEmissions += emission;
        totalPoints += points;
        }


        return res.status(200).json({
            success: true,
            emissions,
            greenPoints,
            breakdowns, // ✅ New
            totalPoints,
            totalEmissions,
            message: "7-day rolling report with breakdowns generated successfully."
          });
          

    } catch (err) {
        console.error("❌ Error fetching weekly report:", err);
        res.status(500).json({ success: false, message: "Server error." });
    }
};



// Export all functions
module.exports = {
    calculateCarbonFootprint,
    addGreenPoints,
    getCarbonFootprint,
    updateCarbonFootprint,
    getWeeklyReport,
    deleteCarbonFootprint,
};
