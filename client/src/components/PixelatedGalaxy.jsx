import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import carbonEarth from "../assets/planet1.png";
import greenEarth from "../assets/planet2.png";
import rocketImg from "../assets/rocket.png";

export default function PixelatedGalaxy() {
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    const images = [
      { src: carbonEarth, img: new Image() },
      { src: greenEarth, img: new Image() },
      { src: rocketImg, img: new Image() },
    ];

    let loadedImages = 0;
    let animationFrameId;

    images.forEach(({ src, img }) => {
      img.src = src;
      img.onload = () => {
        loadedImages++;
        if (loadedImages === images.length) {
          requestAnimationFrame(animate);
        }
      };
    });

    let rocketX = 50;
    let rocketY = canvas.height - 250;
    let rocketDX = (canvas.width - 400 - 50) / 200;
    let rocketDY = (200 - (canvas.height - 250)) / 200;
    let frame = 0;

    const drawStars = () => {
      for (let i = 0; i < 250; i++) {
        ctx.fillStyle = "gold";
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.fillRect(x, y, 6, 6);
      }
    };

    const drawText = () => {
      ctx.fillStyle = "white";
      ctx.font = "bold 80px 'Press Start 2P', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("LETSGOO!!🔥🔥", canvas.width / 2, canvas.height / 2);
    };

    const animate = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawStars();
      drawText();

      const planet1Width = 300;
      const planet1Height = images[0].img.height * (planet1Width / images[0].img.width);
      ctx.drawImage(images[0].img, 25, canvas.height - planet1Height - 50, planet1Width, planet1Height);
      
      const planet2Width = 300;
      const planet2Height = images[1].img.height * (planet2Width / images[1].img.width);
      ctx.drawImage(images[1].img, canvas.width - 400, 100, planet2Width, planet2Height);
      
      ctx.drawImage(images[2].img, rocketX, rocketY, 200, 200);

      if (frame < 200) {
        rocketX += rocketDX;
        rocketY += rocketDY;
        frame++;
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Delay to allow the rocket to settle
        setTimeout(() => {
          navigate("/"); // Redirect to homepage
        }, 1000);
      }
    };

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [navigate]);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
        rel="stylesheet"
      />
      <canvas ref={canvasRef} className="absolute top-0 left-0" />
    </>
  );
}
