import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import MotivationArea from '../components/MotivationArea';
import Leaderboard from '../components/Leaderboard';
import Reviews from '../components/Reviews';
import { DragCards } from '../components/DragCards';

const reviews = [
  {
    _id: 'r1',
    img: '../reviews/img1.jpg',
    comment:
      '“Ever since I started logging my daily habits here, my carbon footprint dropped by 25%—and it feels great to be part of something bigger.”',
    userName: 'Deepthi T.',
  },
  {
    _id: 'r2',
    img: '../reviews/img2.jpg',
    comment:
      '“I never knew saving water could be so satisfying. Watching my weekly score climb keeps me coming back!”',
    userName: 'Ankit A.',
  },
  {
    _id: 'r3',
    img: '../reviews/img3.jpg',
    comment:
      '“This community’s challenges helped me bike to work five days straight—my wallet and the planet thank you!”',
    userName: 'Sreya C.K.',
  },
  {
    _id: 'r4',
    img: '../reviews/img4.jpg',
    comment:
      '“Seeing everyone’s progress in the leaderboard is super motivating—I’m officially hooked on green living!”',
    userName: 'Vardhan K.',
  },
  {
    _id: 'r5',
    img: '../reviews/img5.jpg',
    comment:
      '“Hands down the friendliest eco-app out there. The tips are spot-on and the vibes are 🔥.”',
    userName: 'Bhargavi D.',
  },
  {
    _id: 'r6',
    img: '../reviews/img6.jpg',
    comment:
      '“Can’t wait to see what feature drops next! This is exactly the push I needed.”',
    userName: 'Surrender T.',
  },
];

function ReviewStack() {
  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      body {
        font-family: 'Poppins', sans-serif;
        background: #000;
        color: #fff;
      }
      .container {
        max-width: 1600px;
        margin-top:10px;
        margin-bottom:10px;
      }
      .stack-area {
        display: flex;
        width: 100%;
        height: 400vh;
        position: relative;
      }
      .left {
        flex-basis: 50%;
        position: sticky;
        top: 0;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 40px;
      }
      .right {
        flex-basis: 50%;
        position: sticky;
        top: 0;
        height: 100vh;
      }
      .title {
        font-size: 64px;
        font-weight: 700;
        line-height: 1.2;
        max-width: 420px;
      }
      .sub-title {
        font-size: 16px;
        max-width: 420px;
        margin-top: 30px;
        line-height: 1.6;
        color: #ccc;
      }
      .sub-title button {
        margin-top: 20px;
        padding: 12px 24px;
        font-size: 14px;
        font-family: inherit;
        background: white;
        color: black;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        transition: background 0.3s ease;
      }
      .sub-title button:hover {
        background: #ddd;
      }
      .card {
        width: 350px;
        height: 400px;
        border-radius: 25px;
        position: absolute;
        top: calc(50% - 200px);
        left: calc(50% - 175px);
        transition: transform 0.8s ease, opacity 0.8s ease;
        transform-style: preserve-3d;
        padding: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: white;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
      }
      .card:nth-child(1) { background: #407aff; }
      .card:nth-child(2) { background: #dd3e58; }
      .card:nth-child(3) { background: #ba71f5; }
      .card:nth-child(4) { background: #f75cd0; }
      .card:nth-child(5) { background: #2bc990; }
      .card:nth-child(6) { background: #ffa500; }
      .user-img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 15px;
        border: 2px solid white;
      }
      .comment {
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 15px;
      }
      .user {
        font-weight: 600;
        font-size: 14px;
        text-align: right;
        margin-top: auto;
      }
      .away {
        transform: translateY(-150vh) rotate(-45deg);
        opacity: 0;
      }
    `;
    document.head.appendChild(styleSheet);

    const cards = document.querySelectorAll('.card');
    const stackArea = document.querySelector('.stack-area');

    function rotateCards() {
      let angle = 0;
      cards.forEach((card, index) => {
        if (card.classList.contains('away')) {
          card.style.transform = `translateY(-150vh) rotate(-45deg)`;
          card.style.opacity = 0;
        } else {
          card.style.transform = `rotate(${angle}deg)`;
          card.style.opacity = 1;
          angle -= 10;
          card.style.zIndex = cards.length - index;
        }
      });
    }

    function handleScroll() {
      const distance = window.innerHeight * 0.5;
      const topVal = stackArea.getBoundingClientRect().top;
      let index = Math.floor(-1 * (topVal / distance + 1));

      cards.forEach((card, i) => {
        if (i <= index) {
          card.classList.add('away');
        } else {
          card.classList.remove('away');
        }
      });

      rotateCards();
    }

    rotateCards();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="container">
      <div className="stack-area">
        <div className="left">
          <div className="title">What Users Say</div>
          <div className="sub-title">
            Real stories from our sustainability heroes 💚
            <br />
            <button>Join the Movement</button>
          </div>
        </div>
        <div className="right">
          {reviews.map((review) => (
            <div className="card" key={review._id}>
              <img className="user-img" src={review.img} alt={review.userName} />
              <div className="comment">{review.comment}</div>
              <div className="user">— {review.userName}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Community() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUser, setCurrentUser] = useState({ id: null, name: '' });
  const [showIntro, setShowIntro] = useState(true);

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

    const timeout = setTimeout(() => setShowIntro(false), 10000);
    return () => clearTimeout(timeout);
  }, []);

  const meEntry = leaderboard.find(e => e.user._id === currentUser.id) || {};
  const myPoints = meEntry.totalGreenPoints || 0;

  return (
    <div className="mt-28 p-6 max-w-6xl mx-auto relative z-10">
      {showIntro && (
        <motion.div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DragCards />
        </motion.div>
      )}

      <motion.h1
        style={{ fontFamily: "'Orbitron', sans-serif" }}
        className="text-5xl font-bold mb-10 text-center text-white"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 12 }}
      >
        🌍 Community
      </motion.h1>

      <motion.section
        className="mb-12"
        initial={{ y: 50, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
      >
        <Leaderboard />
      </motion.section>

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

      <motion.section
        className="flex items-center justify-center p-4 rounded-xl bg-gray-900 mb-12"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <MotivationArea greenPoints={myPoints} emissions={0} />
      </motion.section>

      <motion.section
        className="mb-12 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2
          style={{ fontFamily: "'Orbitron', sans-serif" }}
          className="text-6xl font-semibold mb-6 text-white"
        >
          💬 Testimonials
        </h2>
        <ReviewStack />
      </motion.section>

      <motion.section
      className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 border-4 border-green-500 rounded-2xl p-8 mb-10 shadow-xl relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="absolute animate-pulse top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-green-500 to-transparent opacity-10 blur-xl pointer-events-none"></div>

      <h2
        className="text-3xl font-extrabold mb-4 text-lime-300 text-center"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        ✨ Share Your Vibe!
      </h2>
      <p className="text-md text-gray-300 text-center mb-6">
        What’s your green journey like? 🌱 Let your fellow eco-warriors know! 🌍💬
      </p>

      <div className="rounded-xl bg-black/50 backdrop-blur-md p-6 border border-green-300">
        <Reviews />
      </div>

      <div className="text-center mt-6">
        <button className="bg-green-500 text-black px-6 py-2 rounded-full font-semibold text-lg shadow-lg hover:scale-105 hover:bg-lime-400 hover:shadow-green-400 transition duration-300 ease-in-out">
          🌟 Post My Review
        </button>
      </div>
     </motion.section>

    </div>
  );
}
