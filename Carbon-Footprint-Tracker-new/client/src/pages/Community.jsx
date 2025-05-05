// src/pages/Community.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import MotivationArea from '../components/MotivationArea';
import Leaderboard from '../components/Leaderboard';
import Reviews from '../components/Reviews';

// ——————————— ENRICHED STATIC REVIEWS ———————————
const staticReviews = [
  {
    _id: 'r1',
    comment:
      '“Ever since I started logging my daily habits here, my carbon footprint dropped by 25%—and it feels great to be part of something bigger.”',
    userName: 'Emily R.',
  },
  {
    _id: 'r2',
    comment:
      '“I never knew saving water could be so satisfying. Watching my weekly score climb keeps me coming back!”',
    userName: 'Victor K.',
  },
  {
    _id: 'r3',
    comment:
      '“This community’s challenges helped me bike to work five days straight—my wallet and the planet thank you!”',
    userName: 'Priya S.',
  },
  {
    _id: 'r4',
    comment:
      '“Seeing everyone’s progress in the leaderboard is super motivating—I’m officially hooked on green living!”',
    userName: 'Liam T.',
  },
  {
    _id: 'r5',
    comment:
      '“Hands down the friendliest eco-app out there. The tips are spot-on and the vibes are 🔥.”',
    userName: 'Sophia M.',
  },
  {
    _id: 'r6',
    comment:
      '“Can’t wait to see what feature drops next! This is exactly the push I needed.”',
    userName: 'Carlos D.',
  },
];

function Carousel() {
  const [index, setIndex] = useState(0);
  const count = staticReviews.length;

  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % count), 5000);
    return () => clearInterval(timer);
  }, [count]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${(index * 100) / 3}%)` }}
      >
        {staticReviews.map(rev => (
          <div key={rev._id} className="w-1/3 px-2 flex-shrink-0">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
              <p className="italic">"{rev.comment}"</p>
              <p className="mt-2 text-sm text-gray-400">— {rev.userName}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => setIndex(i => (i - 1 + count) % count)}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 rounded-full hover:bg-white text-black"
      >
        ◀️
      </button>
      <button
        onClick={() => setIndex(i => (i + 1) % count)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 rounded-full hover:bg-white text-black"
      >
        ▶️
      </button>
    </div>
  );
}

export default function Community() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUser, setCurrentUser] = useState({ id: null, name: '' });

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/leaderboard')
      .then(res => setLeaderboard(res.data || []))
      .catch(err => console.error(err));

    const raw = localStorage.getItem('user');
    try {
      setCurrentUser(JSON.parse(raw));
    } catch {
      setCurrentUser({ id: null, name: raw || '' });
    }
  }, []);

  const meEntry = leaderboard.find(e => e.user._id === currentUser.id) || {};
  const myPoints = meEntry.totalGreenPoints || 0;

  return (
    <div className="mt-16 p-6 max-w-6xl mx-auto">

      {/* ——————————— PAGE TITLE ——————————— */}
      <motion.h1
        style={{ fontFamily: "'Orbitron', sans-serif" }}
        className="text-5xl font-bold mb-10 text-center text-gray-800"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 12 }}
      >
        🌍 Community
      </motion.h1>

      {/* ——————————— LEADERBOARD ——————————— */}
      <motion.section
        className="mb-12"
        initial={{ y: 50, opacity: 0, scale: 0.97 }}
        animate={{ y: 0,  opacity: 1, scale: 1    }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
      >
        <Leaderboard />
      </motion.section>

      {/* ——————————— ENCOURAGEMENT ——————————— */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.7, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <p className="text-2xl italic text-green-700">
          {currentUser.name
            ? `Keep crushing it, ${currentUser.name}! ${myPoints} green points and counting!`
            : 'Log in to unlock your personal eco-journey!'}
        </p>
      </motion.div>

      {/* ——————————— MOTIVATION AREA ——————————— */}
      <motion.section
        className="flex items-center justify-center p-4 rounded-xl bg-gray-900 mb-12"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <MotivationArea greenPoints={myPoints} emissions={0} />
      </motion.section>

      {/* ——————————— STATIC REVIEWS CAROUSEL ——————————— */}
      <motion.section
        className="mb-12 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2
          style={{ fontFamily: "'Orbitron', sans-serif" }}
          className="text-3xl font-semibold mb-6 text-gray-800"
        >
          💬 What People Are Saying
        </h2>
        <Carousel />
      </motion.section>

      {/* ——————————— REVIEW FORM ——————————— */}
      <motion.section
        className="bg-gray-800 rounded-lg p-6 mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold mb-6 text-white">
          Submit Your Review
        </h2>
        <Reviews />
      </motion.section>
    </div>
  );
}
