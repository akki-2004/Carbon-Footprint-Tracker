import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaLeaf } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ecoMessages = [
  "Small steps, big impact! 🌎",
  "Green today, greener tomorrow! 🍃",
  "Reduce. Reuse. Recycle. ♻️",
  "Be the change for our planet! 🌱"
];

const Header = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % ecoMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative h-screen w-full flex flex-col items-center pt-40 bg-black bg-opacity-10">
      <motion.h1
        className="text-7xl font-extrabold leading-tight font-fun text-white text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🌍 Welcome, Eco-Warrior!
      </motion.h1>

      <div className="absolute right-16 top-1/3 max-w-lg text-white text-right">
        <motion.p
          className="text-3xl leading-relaxed text-green-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Ready to track your carbon footprint and make a real impact?
          <span className="text-green-400"> Carbon Footracker</span> helps you monitor, reduce, and gamify your green journey! 🌱💚
        </motion.p>

        <motion.div
          className="mt-8 flex items-center justify-end space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <FaLeaf className="text-green-400 text-5xl animate-bounce" />
          <button
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white text-lg font-bold rounded-lg shadow-lg transition-all"
            onClick={() => navigate("/login")} // Navigate to login page
          >
            Start Your Journey 🚀
          </button>
        </motion.div>
      </div>

      {/* Moving message to bottom right */}
      <motion.p
        className="absolute bottom-6 right-6 text-4xl font-semibold text-yellow-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {ecoMessages[messageIndex]}
      </motion.p>
    </header>
  );
};

export default Header;
