import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
 

const AboutUs = () => {
  const [activeCard, setActiveCard] = useState(null);

  const cards = [
    {
      id: 1,
      title: "Crunch Your Carbon",
      description: "Track your daily carbon footprint effortlessly with our intuitive calculator. Simply input your daily activities, and we'll break down your emissions with detailed insights. Our goal is to provide you with real-time data on your carbon impact, helping you make sustainable choices every day.",
      img: "/image1.jpg",
    },
    {
      id: 2,
      title: "Eco Hustle Insights",
      description: "Analyze your past week's environmental impact with in-depth statistics and visual graphs. See your progress over time, compare weekly trends, and identify key areas where you can improve. Our analytics give you actionable recommendations tailored to your lifestyle.",
      img: "/image2.jpg",
    },
    {
      id: 3,
      title: "Earn Green Points",
      description: "Turn sustainability into a rewarding game! Earn points for eco-friendly actions, challenge friends, and climb the leaderboard. Redeem points for discounts on green products and get recognized as an Eco-Warrior. Join a thriving community committed to making a difference!",
      img: "/image3.jpg",
    },
  ];

  return (
    <div className="relative">
      <Navbar />
      <div className="min-h-screen bg-black text-white flex flex-col items-center p-10 mt-20">
        <h1 className="text-6xl font-bold mb-12 text-green-400">The Tea 🌎☕</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full px-10">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className="bg-gray-800 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform cursor-pointer p-8 w-full h-full flex flex-col justify-between items-center"
              onClick={() => setActiveCard(card.id)}
              whileHover={{ scale: 1.05 }}
            >
              <img src={card.img} alt={card.title} className="w-full h-64 object-cover rounded-md" />
              <h2 className="text-4xl font-semibold text-green-400 mt-6">{card.title}</h2>
              <p className="mt-4 text-lg text-center flex-grow">{card.description.slice(0, 100)}...</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center max-w-4xl">
          <h2 className="text-5xl font-bold text-green-400 mb-6">Why Track Your Carbon Footprint? 🌱</h2>
          <p className="text-lg leading-relaxed">
            Every small action adds up! 🚶‍♂️🚲 Switching to sustainable habits can reduce your impact on the planet, 
            save energy, and even cut down costs. Imagine if every coffee run, commute, or meal choice 
            came with an eco-score—well, now it does! 🌍💚 . 
          </p>
          <p className="text-2xl mt-6 font-semibold text-green-300">Because saving the planet is always in style. 😉✨</p>
        </div>

        {activeCard !== null && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 p-5">
            <motion.div 
              className="bg-gray-900 text-white p-8 rounded-xl max-w-3xl relative shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button
                className="absolute top-4 right-6 text-3xl text-red-400 hover:text-red-600"
                onClick={() => setActiveCard(null)}
              >
                ✖
              </button>
              <h2 className="text-4xl mb-6 font-bold text-green-400">{cards[activeCard - 1].title}</h2>
              <p className="text-lg leading-relaxed">{cards[activeCard - 1].description}</p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutUs;
