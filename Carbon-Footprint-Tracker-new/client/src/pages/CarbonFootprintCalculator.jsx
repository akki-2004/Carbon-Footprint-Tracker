import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaCar, FaTint, FaFire, FaDrumstickBite, FaPlug } from "react-icons/fa";
import Navbar from "../components/Navbar";

const ecoMessages = [
  "Act green, live clean! 🌿",
  "Every action makes a difference! 🌎",
  "Go green or go home! 🌱",
  "Less waste, more future! ♻️",
  "Nature is our best friend! 💚",
  "A better planet starts with you! 🌍",
  "Your choices shape the world! 🌏",
];

const CarbonFootprintCalculator = () => {
  const [carbonScore, setCarbonScore] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [inputs, setInputs] = useState({
    transportType: "car",
    vehicleDistance: "10",
    electricity: "5",
    water: "100",
    cookingFuel: "1",
    cookingOil: "1",
    meatType: "chicken",
    meatConsumption: "100",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % ecoMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const carbonFactors = {
    electricity: 0.4,
    vehicle: { car: 0.2, motorcycle: 0.1, bus: 0.05, bicycle: 0 },
    water: 0.0005,
    cookingFuel: 3,
    cookingOil: 2,
    meat: { chicken: 6.9, mutton: 27, fish: 5, red_meat: 39 },
  };

  const calculateCarbon = () => {
    let score = 0;
    score += parseFloat(inputs.electricity) * carbonFactors.electricity;
    score += parseFloat(inputs.vehicleDistance) * carbonFactors.vehicle[inputs.transportType];
    score += parseFloat(inputs.water) * carbonFactors.water;
    score += parseFloat(inputs.cookingFuel) * carbonFactors.cookingFuel;
    score += parseFloat(inputs.cookingOil) * carbonFactors.cookingOil;
    score += parseFloat(inputs.meatConsumption) * (carbonFactors.meat[inputs.meatType] / 1000);
    setCarbonScore(score.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-black text-white p-32 flex flex-col items-center justify-center">
      <Navbar />
      <motion.h1 className="text-9xl font-pixel text-green-400 mb-20" animate={{ scale: 1.1 }}>
        Carbon Footracker
      </motion.h1>
      <motion.p className="text-4xl text-green-300 mb-10" animate={{ opacity: [0, 1] }}>
        {ecoMessages[messageIndex]}
      </motion.p>
      <div className="bg-gray-900 p-20 w-full max-w-6xl rounded-lg shadow-2xl">
        <div className="mb-12">
          <label className="text-3xl flex items-center gap-2">
            Meat Type <FaDrumstickBite />
          </label>
          <select
            className="w-full p-6 bg-gray-800 text-white rounded text-3xl"
            value={inputs.meatType}
            onChange={(e) => setInputs({ ...inputs, meatType: e.target.value })}
          >
            {["chicken", "mutton", "fish", "red_meat"].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-12">
          <label className="text-3xl flex items-center gap-2">
            Meat Consumption (grams) <FaDrumstickBite />
          </label>
          <input
            type="number"
            className="w-full p-6 bg-gray-800 text-white rounded text-3xl overflow-y-scroll"
            value={inputs.meatConsumption}
            onChange={(e) => setInputs({ ...inputs, meatConsumption: e.target.value })}
          />
        </div>
        <div className="mb-12">
          <label className="text-3xl flex items-center gap-2">
            Vehicle Type <FaCar />
          </label>
          <select
            className="w-full p-6 bg-gray-800 text-white rounded text-3xl"
            value={inputs.transportType}
            onChange={(e) => setInputs({ ...inputs, transportType: e.target.value })}
          >
            {["car", "motorcycle", "bus", "bicycle"].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-12">
          <label className="text-3xl flex items-center gap-2">
            Electricity Usage (hours) <FaPlug />
          </label>
          <select
            className="w-full p-6 bg-gray-800 text-white rounded text-3xl"
            value={inputs.electricity}
            onChange={(e) => setInputs({ ...inputs, electricity: e.target.value })}
          >
            {[1, 2, 4, 6, 8, 10, 12].map((val) => (
              <option key={val} value={val}>
                {val} hours
              </option>
            ))}
          </select>
        </div>
        <div className="mb-12">
          <label className="text-3xl flex items-center gap-2">
            Distance Covered (km) <FaCar />
          </label>
          <input
            type="number"
            className="w-full p-6 bg-gray-800 text-white rounded text-3xl overflow-y-scroll"
            value={inputs.vehicleDistance}
            onChange={(e) => setInputs({ ...inputs, vehicleDistance: e.target.value })}
          />
        </div>
        <div className="mb-12">
          <label className="text-3xl flex items-center gap-2">
            Water Consumption (liters) <FaTint />
          </label>
          <input
            type="number"
            className="w-full p-6 bg-gray-800 text-white rounded text-3xl"
            value={inputs.water}
            onChange={(e) => setInputs({ ...inputs, water: e.target.value })}
          />
        </div>
        <div className="mb-12">
          <label className="text-3xl flex items-center gap-2">
            Cooking Fuel Usage (liters) <FaFire />
          </label>
          <input
            type="number"
            className="w-full p-6 bg-gray-800 text-white rounded text-3xl"
            value={inputs.cookingFuel}
            onChange={(e) => setInputs({ ...inputs, cookingFuel: e.target.value })}
          />
        </div>
        <button
          className="w-full bg-green-500 hover:bg-green-600 p-6 rounded text-3xl font-bold text-white"
          onClick={calculateCarbon}
        >
          Calculate
        </button>
        <div className="mt-12 text-4xl text-green-300">Today's Carbon Score: {carbonScore} kg CO2</div>
      </div>
    </div>
  );
};

export default CarbonFootprintCalculator;