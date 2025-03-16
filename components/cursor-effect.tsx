"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorEffect() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set isClient to true when the component mounts on the client
  }, []);

  useEffect(() => {
    if (!isClient) return; // Exit if not on the client

    const cursor = cursorRef.current;
    if (!cursor) return;

    const updateCursorPosition = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      });
    };

    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const createParticles = (e: MouseEvent) => {
      const colors = ["#8B5CF6", "#7C3AED", "#6D28D9", "#EC4899", "#2DD4BF"];

      for (let i = 0; i < 8; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        particle.style.width = `${Math.random() * 20 + 10}px`;
        particle.style.height = particle.style.width;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.position = "absolute";
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        particle.style.pointerEvents = "none";
        particle.style.transition = "transform 1s ease-out, opacity 1s ease-out";
        particle.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0)`;
        particle.style.opacity = "0";

        document.body.appendChild(particle);

        setTimeout(() => {
          if (particle.parentNode) {
            document.body.removeChild(particle);
          }
        }, 1000);
      }
    };

    window.addEventListener("mousemove", updateCursorPosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", createParticles);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", createParticles);
    };
  }, [isClient]);

  if (!isClient) return null; // Render nothing on the server

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor transition-transform duration-75 ${
        isActive ? "active" : ""
      }`}
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: isVisible ? 1 : 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}