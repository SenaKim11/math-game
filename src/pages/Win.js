import React, { useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CongratulationsPage() {
  useEffect(() => {
    createFireworks();
  }, []);

  const createFireworks = () => {
    const fireworkContainer = document.getElementById("firework-container");
    if (!fireworkContainer) return;

    const addFirework = () => {
      const firework = document.createElement("div");
      firework.classList.add("firework");
      firework.style.width = `${Math.random() * 50 + 30}px`;
      firework.style.height = firework.style.width;
      firework.style.backgroundColor = getRandomColor();
      firework.style.top = `${Math.random() * 100}vh`;
      firework.style.left = `${Math.random() * 100}vw`;
      fireworkContainer.appendChild(firework);

      setTimeout(() => {
        firework.remove();
      }, 1500);
    };

    const getRandomColor = () =>
      `hsl(${Math.floor(Math.random() * 360)}, 100%, 70%)`;

    setInterval(addFirework, 500);
  };

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center bg-gradient"
      style={{ height: "100vh", background: "linear-gradient(135deg, #ff9a9e, #fad0c4)" }}
    >
      <h1 className="text-black fw-bold display-2 text-center">
        🎉🎉🎉 Congratulations! 🎉🎉🎉
      </h1>
      <p className="text-black fs-2 text-center">
        Dahil dyan! Sasama ka sa QuizBEE!!
      </p>
      <Button variant="dark" size="lg" as={Link} to="/">
        Home
      </Button>
      <div
        id="firework-container"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          zIndex: 0,
        }}
      ></div>
      <style>
        {`
          .firework {
            position: absolute;
            border-radius: 50%;
            animation: explode 1.5s ease-out forwards;
            pointer-events: none;
            opacity: 0.8;
          }

          @keyframes explode {
            0% {
              transform: scale(0);
              opacity: 1;
            }
            50% {
              transform: scale(1.5);
              opacity: 0.9;
            }
            100% {
              transform: scale(0);
              opacity: 0;
            }
          }
        `}
      </style>
    </Container>
  );
}