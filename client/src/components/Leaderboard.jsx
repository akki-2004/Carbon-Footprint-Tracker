// src/components/Leaderboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import trophyAnimation from '../assets/animations/trophy.json';

// Animation variants for entrance stagger
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/leaderboard')
      .then(res => setLeaderboard(res.data.slice(0, 10)))
      .catch(err => console.error(err));
  }, []);

  const topThree = leaderboard.slice(0, 3);
  const others = leaderboard.slice(3);
  const orderedTop = topThree.length === 3 ? [topThree[1], topThree[0], topThree[2]] : topThree;

  return (
    <div className="relative overflow-x-hidden bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-600 p-6 rounded-2xl shadow-2xl text-white">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center mb-6">Leaderboard</h2>

      {/* Top 3 circles with trophy on 1st place */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex justify-center items-end space-x-6 mb-8"
      >
        {orderedTop.map((entry, i) => {
          const originalIndex = entry === topThree[0] ? 0 : entry === topThree[1] ? 1 : 2;
          const isFirst = originalIndex === 0;
          const sizeClass = isFirst ? 'w-32 h-32 text-2xl' : 'w-20 h-20 text-lg';
          const bgClass = isFirst
            ? 'bg-yellow-400 text-gray-900'
            : originalIndex === 1
            ? 'bg-gray-300 text-gray-900'
            : 'bg-orange-400 text-gray-900';
          return (
            <motion.div
              key={entry.user._id}
              variants={itemVariants}
              className="flex flex-col items-center relative"
            >
              <div className={`${sizeClass} flex items-center justify-center rounded-full font-bold mb-2 ${bgClass} relative`}> 
                {originalIndex + 1}
              </div>
              {isFirst && (
                <div className="absolute -top-12">
                  <Lottie
                    animationData={trophyAnimation}
                    loop={true}
                    style={{ width: 80, height: 80 }}
                  />
                </div>
              )}
              <span className="text-lg text-white mt-2">{entry.user.name}</span>
              <span className="text-sm mt-1 font-medium text-white">
                {entry.totalGreenPoints} pts
              </span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Other users 4–10 */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {others.map((entry, idx) => (
          <motion.div
            key={entry.user._id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between bg-white bg-opacity-10 backdrop-blur-sm p-3 rounded-lg"
          >
            <span className="w-6 text-lg font-bold text-white">{idx + 4}</span>
            <span className="flex-1 px-3 text-white font-medium">{entry.user.name}</span>
            <span className="text-white font-semibold">
              {entry.totalGreenPoints} pts
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}