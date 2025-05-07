// frontend/src/components/CarbonFootprintIntro.js
import React from "react";
import { useNavigate } from "react-router-dom";

export default function CarbonFootprintIntro() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-black text-white text-center">
      <h1 className="text-4xl font-bold mb-4 text-white">Carbon Footprint Calculator 🌍</h1>
      <p className="text-lg max-w-2xl mb-8 text-white">
        Track your environmental impact across various domains like transportation, food, energy, and more. 
        Understand your habits, reduce emissions, and become more eco-conscious.
      </p>
      <p className="text-xl font-medium text-red-500 mb-6">Please login to start calculating your footprint.</p>
      <button
        onClick={() => navigate("/login")}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded text-lg"
      >
        Login to Continue
      </button>
    </div>
  );
}
