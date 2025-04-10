const mongoose = require("mongoose");

const CarbonFootprintSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User", index: true },

    greenPoints: [
        {
            date: { type: String, required: true },  // YYYY-MM-DD format
            points: { type: Number, default: 0 }
        }
    ],
    totalGreenPoints: { type: Number, default: 0 } // Keep track of total points
}, { timestamps: true });  // Adds createdAt and updatedAt fields automatically

module.exports = mongoose.model("CarbonFootprint", CarbonFootprintSchema);
