const mongoose = require("mongoose");
const moment = require("moment-timezone"); // For timezone handling
const CarbonFootprint = require("../models/CarbonFootprint");
const { calculateGreenPointsFromAnswers } = require("../utils/calculateEmissions");

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

        const greenPoints = calculateGreenPointsFromAnswers(userData);
        console.log("🔍 Calculated Green Points:", greenPoints);

        if (typeof greenPoints !== "number" || isNaN(greenPoints)) {
            console.log("❌ Invalid green points calculation.");
            return res.status(400).json({ success: false, message: "Invalid green points calculation." });
        }

        const todayDate = moment().tz("Asia/Kolkata").format("YYYY-MM-DD"); // Get today's date in IST

        let userEntry = await CarbonFootprint.findOne({ userId });

        if (!userEntry) {
            // Create a new entry if none exists
            userEntry = new CarbonFootprint({
                userId,
                greenPoints: [{ date: todayDate, points: greenPoints }],
                totalGreenPoints: greenPoints,
            });
        } else {
            // Check if today's entry exists
            const existingEntry = userEntry.greenPoints.find(entry => entry.date === todayDate);

            if (existingEntry) {
                console.log("⚠️ Entry already exists for today. Updating the points...");
                existingEntry.points += greenPoints; // Update today's points
            } else {
                // Keep only the last 7 days of records
                if (userEntry.greenPoints.length >= 7) {
                    userEntry.greenPoints.shift(); // Remove the oldest record
                }
                userEntry.greenPoints.push({ date: todayDate, points: greenPoints });
            }

            // Update total green points
            userEntry.totalGreenPoints += greenPoints;
        }

        await userEntry.save();
        console.log("✅ Successfully Saved to MongoDB!", userEntry);
        return res.status(201).json({ success: true, message: "Carbon footprint recorded!", data: userEntry });

    } catch (error) {
        console.error("❌ Server Error:", error);
        return res.status(500).json({ success: false, message: "Server error." });
    }
}

// 📌 Function to add green points (Ensures single submission per day)
const addGreenPoints = async (req, res) => {
    try {
        const { userId, points } = req.body;

        if (!userId || !points) {
            return res.status(400).json({ message: "User ID and points are required" });
        }

        const todayDate = moment().tz("Asia/Kolkata").format("YYYY-MM-DD"); // IST Date

        let userFootprint = await CarbonFootprint.findOne({ userId });

        if (!userFootprint) {
            // If user doesn't exist, create a new entry
            userFootprint = new CarbonFootprint({
                userId,
                greenPoints: [{ date: todayDate, points }],
                totalGreenPoints: points,
            });
        } else {
            // Check if today's entry already exists
            const existingEntry = userFootprint.greenPoints.find(entry => entry.date === todayDate);

            if (existingEntry) {
                return res.status(400).json({ message: "Entry already exists for today. You can only submit once per day." });
            }

            // Add today's entry
            userFootprint.greenPoints.push({ date: todayDate, points });
            userFootprint.totalGreenPoints += points;
        }

        await userFootprint.save();
        return res.status(200).json({ message: "Green points added successfully!", userFootprint });

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

// Export all functions
module.exports = {
    calculateCarbonFootprint,
    addGreenPoints,
    getCarbonFootprint,
    updateCarbonFootprint,
    deleteCarbonFootprint,
};
