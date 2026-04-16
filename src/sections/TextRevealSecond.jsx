// src/sections/TextRevealSecond.jsx - UPDATED VERSION
import React, { useEffect, useRef, useCallback } from "react";
import "./TextRevealSecond.css";

export default function TextRevealSecond() {
  const line2 = "blending creativity, practicality and brand-driven insight into every spatial experience we design.";

  const sectionRef = useRef(null);
  const textBlocksRef = useRef([]);
  const animationIdRef = useRef(null);

  const addToTextBlocksRef = useCallback((el) => {
    if (el && !textBlocksRef.current.includes(el)) {
      textBlocksRef.current.push(el);
    }
  }, []);

  const renderLine = (text, key) => {
    const words = text.split(" ");
    return (
      <div className="tu-text-block" key={key} ref={addToTextBlocksRef}>
        <h2 className="tu-text-line">
          {words.map((word, wIndex) => {
            const wordLength = word.length;
            const splitPoint = Math.floor(wordLength / 2);
            const firstHalf = word.slice(0, splitPoint);
            const lastHalf = word.slice(splitPoint);
            
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
                      data-char-index={cIndex + splitPoint}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                {wIndex < words.length - 1 && <span className="tu-space">&nbsp;</span>}
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

      // Calculate scroll progress
      let progress =
        (window.scrollY - (section.offsetTop - windowHeight * 0.7)) /
        (height * 0.6);
      progress = Math.min(Math.max(progress, 0), 1);

      // Keep background black (no changes to background)
      section.style.backgroundColor = "#000000";

      textBlocksRef.current.forEach((block) => {
        const words = block.querySelectorAll(".tu-word");
        words.forEach((word) => {
          const firstHalf = word.querySelector(".tu-first-half");
          const lastHalf = word.querySelector(".tu-last-half");
          
          const firstHalfChars = Array.from(firstHalf.querySelectorAll(".tu-char"));
          const lastHalfChars = Array.from(lastHalf.querySelectorAll(".tu-char"));
          
          const firstHalfLength = firstHalfChars.length;
          const lastHalfLength = lastHalfChars.length;

          // Animate last half first (0.0 to 0.5 progress)
          const lastHalfProgress = Math.min(Math.max(progress * 2, 0), 1);
          
          // Animate first half after last half (0.5 to 1.0 progress)
          const firstHalfProgress = Math.min(Math.max((progress - 0.5) * 2, 0), 1);

          // Last half animation - letters appear with WHITE color
          lastHalfChars.forEach((char, index) => {
            const letterRevealProgress = Math.min(Math.max(lastHalfProgress * lastHalfLength - index, 0), 1);
            const shouldShow = letterRevealProgress > 0;
            
            // Always use white color for text
            const opacity = shouldShow ? `${0.1 + lastHalfProgress * 0.9}` : "0.1";
            
            char.style.opacity = opacity;
            char.style.color = "#ffffff"; // Always white
          });

          // First half animation - letters appear with WHITE color
          firstHalfChars.forEach((char, index) => {
            const letterRevealProgress = Math.min(Math.max(firstHalfProgress * firstHalfLength - index, 0), 1);
            const shouldShow = letterRevealProgress > 0;
            
            // Always use white color for text
            const opacity = shouldShow ? `${0.1 + firstHalfProgress * 0.9}` : "0.1";
            
            char.style.opacity = opacity;
            char.style.color = "#ffffff"; // Always white
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
    <section className="tu-section-second" ref={sectionRef}>
      {renderLine(line2, 1)}
    </section>
  );
}