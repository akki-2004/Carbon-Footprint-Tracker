// File: src/components/MotivationArea.jsx

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Confetti from 'react-confetti';
import Particles from '@tsparticles/react';
import { loadFull } from 'tsparticles';

const dailyQuotes = [
  { text: 'Every step counts — even the small ones.', author: 'Unknown', bg: 'from-fuchsia-500 to-pink-600' },
  { text: 'Be the change you wish to see.', author: 'Gandhi', bg: 'from-rose-500 to-red-400' },
  { text: 'Act as if what you do makes a difference. It does.', author: 'William James', bg: 'from-violet-600 to-blue-400' },
  { text: 'The Earth is what we all have in common.', author: 'Wendell Berry', bg: 'from-sky-600 to-cyan-400' },
  { text: 'Small actions add up to big changes.', author: 'Unknown', bg: 'from-pink-700 to-rose-400' },
  { text: 'Your actions matter more than you think.', author: 'Lasolas', bg: 'from-indigo-500 to-purple-600' },
  { text: 'Sustainability starts with a single step.', author: 'EcoBot', bg: 'from-purple-700 to-fuchsia-400' },
  { text: 'Green living is not a trend, it\'s a responsibility.', author: 'GreenWave', bg: 'from-cyan-500 to-indigo-400' },
  { text: 'Think globally, act locally.', author: 'Paul McCartney', bg: 'from-pink-500 to-violet-500' },
  { text: 'One planet, one chance.', author: 'EarthFirst', bg: 'from-fuchsia-600 to-purple-500' },
];

export default function MotivationArea({ greenPoints = 0, emissions = 0 }) {
  const [index, setIndex] = useState(0);
  const [cheers, setCheers] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // Auto-rotate quotes
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % dailyQuotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => setIndex(prev => (prev - 1 + dailyQuotes.length) % dailyQuotes.length);
  const handleNext = () => setIndex(prev => (prev + 1) % dailyQuotes.length);
  const handleCheer = () => {
    setCheers(c => c + 1);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const co2Saved = Math.max(0, (100 - emissions).toFixed(1));
  const progressPercent = Math.min(100, (greenPoints / 500) * 100);
  const quote = dailyQuotes[index];

  const particlesInit = async main => { await loadFull(main); };

  return (
    <div className="w-full h-auto relative flex items-center justify-center px-4">
      {showConfetti && <Confetti recycle={false} numberOfPieces={150} className="absolute inset-0 pointer-events-none" />}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: 'transparent' } },
          particles: {
            color: { value: ['#ff66cc', '#66ccff'] },
            number: { value: 40 },
            size: { value: 3 },
            move: { enable: true, speed: 0.8 },
            links: { enable: true, color: '#ffffff', distance: 70 },
          },
        }}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`relative p-6 rounded-xl bg-gradient-to-br ${quote.bg} text-white shadow-xl max-w-md w-full border border-white/20 z-10`}
        >
          <h2 className="text-2xl font-bold mb-3 animate-pulse">🌟 Daily Spark</h2>
          <p className="italic mb-2">"{quote.text}"</p>
          <p className="text-sm text-right mb-4">— {quote.author}</p>

          <div className="text-sm mb-4">
            <p>Saved: <span className="font-semibold">{co2Saved} kg CO₂</span></p>
            <p>Points: <span className="font-semibold">{greenPoints}/500</span></p>
            <div className="w-full bg-white/30 h-2 rounded-full mt-1">
              <div className="bg-white h-2 rounded-full transition-width duration-500" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button onClick={handlePrev} className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition">⬅️</button>
            <button onClick={handleCheer} className="px-4 py-1 bg-white/20 rounded-full hover:bg-white/30 transition">❤️ Cheer ({cheers})</button>
            <button onClick={handleNext} className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition">➡️</button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
