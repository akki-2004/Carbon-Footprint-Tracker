import React, { useEffect } from "react";
import "./graphIntro.css";
import graphImg from "../assets/graph.png";

const GraphIntro = ({ onFinish }) => {
  useEffect(() => {
    const cardBody = document.querySelector(".card-body");
    const cardContainer = document.querySelector(".card-container");

    const handleMouseMove = (e) => {
      const { left, top, width, height } = cardBody.getBoundingClientRect();
      const x = ((e.clientX - left) / width - 0.5) * 30; // max 30deg for smoother rotation
      const y = -((e.clientY - top) / height - 0.5) * 30;
      cardBody.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    };

    const handleMouseLeave = () => {
      cardBody.style.transition = "transform 0.6s ease";
      cardBody.style.transform = "rotateY(0deg) rotateX(0deg)";
    };

    cardContainer.addEventListener("mousemove", handleMouseMove);
    cardContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cardContainer.removeEventListener("mousemove", handleMouseMove);
      cardContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="card-container">
      <div className="card-body">
        <div className="card-item" style={{ transform: "translateZ(50px)" }}>
          Stat-Dump
        </div>
        <div className="card-item" style={{ transform: "translateZ(60px)" }}>
          Know Your Stats
        </div>
        <div className="card-item" style={{ transform: "translateZ(100px)" }}>
          <img src={graphImg} alt="thumbnail" className="thumbnail" />
        </div>
        <div className="flex-actions">
        <button
  className="card-item"
  style={{
    color: "white",
    backgroundColor: "black",
    borderRadius: "12px",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
  }}
  onClick={onFinish}
>
  LetsGo
</button>

        </div>
      </div>
    </div>
  );
};

export default GraphIntro;
