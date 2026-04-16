// src/sections/TextReveal.jsx - SIMPLIFIED FIXED VERSION
import React, { useEffect, useRef, useCallback } from "react";
import "./TextReveal.css";

export default function TextReveal() {
  const lines = [
    "WE FLIP ORDINARY SPACES",
    "INTO EXTRAORDINARY",
    "EXPERIENCES",
  ];

  const sectionRef = useRef(null);
  const textBlocksRef = useRef([]);
  const animationIdRef = useRef(null);

  const addToTextBlocksRef = useCallback((el) => {
    if (el && !textBlocksRef.current.includes(el)) {
      textBlocksRef.current.push(el);
    }
  }, []);

  const splitWordInHalf = (word) => {
    const splitPoint = Math.floor(word.length / 2);
    return {
      firstHalf: word.slice(0, splitPoint),
      lastHalf: word.slice(splitPoint)
    };
  };

  const renderLine = (text, key) => {
    const words = text.split(" ");
    return (
      <div className="tu-text-block" key={key} ref={addToTextBlocksRef}>
        <h2 className="tu-text-line">
          {words.map((word, wIndex) => {
            const { firstHalf, lastHalf } = splitWordInHalf(word);
            
            return (
              <span className="tu-word" key={wIndex}>
                {/* First Half */}
                <span className="tu-word-half tu-first-half">
                  {firstHalf.split("").map((char, cIndex) => (
                    <span
                      key={cIndex}
                      className="tu-char"
                      data-char-index={cIndex}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                
                {/* Last Half */}
                <span className="tu-word-half tu-last-half">
                  {lastHalf.split("").map((char, cIndex) => (
                    <span
                      key={cIndex}
                      className="tu-char"
                      data-char-index={cIndex + firstHalf.length}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                <span className="tu-space">&nbsp;</span>
              </span>
            );
          })}
        </h2>
      </div>
    );
  };

  useEffect(() => {
    let ticking = false;

    const animateTextOnScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const { top, height } = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress through the section
      const sectionCenter = top + height / 2;
      const viewportCenter = windowHeight / 2;
      
      // Distance from viewport center
      const distanceFromCenter = sectionCenter - viewportCenter;
      
      // Normalize to -1 to 1 range
      const normalizedDistance = distanceFromCenter / (windowHeight / 2);
      
      // Convert to progress (0 when at top, 1 when centered, 0 when at bottom)
      let progress = 1 - Math.abs(normalizedDistance);
      progress = Math.min(Math.max(progress, 0), 1);
      
      // Set background gradient based on position
      // Interpolate between black and white based on progress
      const bgRed = Math.round(progress * 255);
      const bgGreen = Math.round(progress * 255);
      const bgBlue = Math.round(progress * 255);
      const bgColor = `rgb(${bgRed}, ${bgGreen}, ${bgBlue})`;
      
      // Update section background ONLY
      section.style.background = bgColor;

      // Animate characters - ONLY OPACITY, NO COLOR CHANGES
      textBlocksRef.current.forEach((block) => {
        const words = block.querySelectorAll(".tu-word");
        words.forEach((word) => {
          const firstHalf = word.querySelector(".tu-first-half");
          const lastHalf = word.querySelector(".tu-last-half");
          
          const firstHalfChars = firstHalf?.querySelectorAll(".tu-char") || [];
          const lastHalfChars = lastHalf?.querySelectorAll(".tu-char") || [];
          
          const firstHalfLength = firstHalfChars.length;
          const lastHalfLength = lastHalfChars.length;

          // Animate halves sequentially
          const lastHalfProgress = Math.min(Math.max(progress * 2, 0), 1);
          const firstHalfProgress = Math.min(Math.max((progress - 0.5) * 2, 0), 1);

          // Animate last half - ONLY OPACITY
          Array.from(lastHalfChars).forEach((char, index) => {
            const charProgress = Math.min(Math.max(lastHalfProgress * lastHalfLength - index, 0), 1);
            const shouldShow = charProgress > 0;
            
            // ONLY SET OPACITY, NO COLOR
            const opacity = shouldShow ? `${0.1 + lastHalfProgress * 0.9}` : "0.1";
            char.style.opacity = opacity;
            // NO color setting here - let CSS handle it
          });

          // Animate first half - ONLY OPACITY
          Array.from(firstHalfChars).forEach((char, index) => {
            const charProgress = Math.min(Math.max(firstHalfProgress * firstHalfLength - index, 0), 1);
            const shouldShow = charProgress > 0;
            
            // ONLY SET OPACITY, NO COLOR
            const opacity = shouldShow ? `${0.1 + firstHalfProgress * 0.9}` : "0.1";
            char.style.opacity = opacity;
            // NO color setting here - let CSS handle it
          });
        });
      });
    };

    const handleScroll = () => {
      if (!ticking) {
        animationIdRef.current = requestAnimationFrame(() => {
          animateTextOnScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    animateTextOnScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <section className="tu-section" ref={sectionRef}>
      {lines.map((line, index) => renderLine(line, index))}
    </section>
  );
}