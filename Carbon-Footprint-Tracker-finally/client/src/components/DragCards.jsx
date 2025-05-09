import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

export const DragCards = () => {
  return (
    <section className="relative grid min-h-screen w-full place-content-center overflow-hidden bg-neutral-950">
      <h2 className="relative z-0 text-[20vw] font-black text-neutral-800 md:text-[200px] pointer-events-none select-none">
        ENGAGE<span className="text-indigo-500">.</span>
      </h2>

      <h3
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
          fontSize: '1.25rem',
          zIndex: 50,
        }}
      >
        Wait for it... 🚀
      </h3>

      <Cards />
    </section>
  );
};

const flyOutDirections = [
  { x: "-120vw", y: "-100vh" },
  { x: "100vw", y: "-90vh" },
  { x: "-110vw", y: "100vh" },
  { x: "120vw", y: "110vh" },
  { x: "0vw", y: "-120vh" },
  { x: "100vw", y: "0vh" },
];

const getRandomPosition = () => {
  const top = Math.floor(Math.random() * 60) + 10;  // 10% to 70%
  const left = Math.floor(Math.random() * 70) + 10; // 10% to 80%
  return { top: `${top}%`, left: `${left}%` };
};

const Cards = () => {
  const cardConfigs = [
    { src: "../reviews/img1.jpg", rotate: "6deg", size: "w-36 md:w-56" },
    { src: "../reviews/img2.jpg", rotate: "12deg", size: "w-24 md:w-48" },
    { src: "../reviews/img3.jpg", rotate: "-6deg", size: "w-52 md:w-80" },
    { src: "../reviews/img4.jpg", rotate: "8deg", size: "w-48 md:w-72" },
    { src: "../reviews/img5.jpg", rotate: "18deg", size: "w-40 md:w-64" },
    { src: "../reviews/img6.jpg", rotate: "-3deg", size: "w-24 md:w-48" },
  ];

  return (
    <div className="absolute inset-0 z-10">
      {cardConfigs.map((card, index) => (
        <FlyOutCard key={index} index={index} {...card} />
      ))}
    </div>
  );
};

const FlyOutCard = ({ src, alt = "", rotate, size, index }) => {
  const [flyAway, setFlyAway] = useState(false);
  const [position] = useState(getRandomPosition());

  useEffect(() => {
    const timer = setTimeout(() => {
      setFlyAway(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.img
      initial={{
        position: "absolute",
        top: position.top,
        left: position.left,
        rotate,
      }}
      animate={
        flyAway
          ? {
              x: flyOutDirections[index % flyOutDirections.length].x,
              y: flyOutDirections[index % flyOutDirections.length].y,
              opacity: 0,
            }
          : {}
      }
      transition={{
        duration: 1.5,
        ease: "easeInOut",
      }}
      className={twMerge(
        "rounded-xl shadow-lg bg-neutral-200 p-1 pb-4",
        size
      )}
      src={src}
      alt={alt}
    />
  );
};

