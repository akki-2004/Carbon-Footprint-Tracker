const mongoose = require("mongoose");

const DailyEmissionSchema = new mongoose.Schema({
  date: { type: String, required: true },
  total: { type: Number, required: true, default: 0 },
  breakdown: {
    transport: { type: Number, default: 0 },
    food: { type: Number, default: 0 },
    energy: { type: Number, default: 0 },
    water: { type: Number, default: 0 },
    waste: { type: Number, default: 0 },
    sustainability: { type: Number, default: 0 }
  }
}, { _id: false });


const CarbonFootprintSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    index: true,
  },

  greenPoints: [
    {
      date: { type: String, required: true },
      points: { type: Number, default: 0 },
    },
  ],
  totalGreenPoints: { type: Number, default: 0 },

  dailyEmissions: [DailyEmissionSchema], // 👈 Only storing date and emission
}, { timestamps: true });

module.exports = mongoose.model("CarbonFootprint", CarbonFootprintSchema);
