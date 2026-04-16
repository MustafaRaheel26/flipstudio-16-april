// src/components/EnhancedPreloader.jsx
import React, { useEffect, useRef, useState } from 'react';
import './EnhancedPreloader.css';
import preloaderVid from '../assets/preloader-vid.mp4';

const EnhancedPreloader = () => {
  const [loading, setLoading] = useState(true);
  const preloaderRef = useRef(null);
  const videoRef = useRef(null);

  const TIMING = {
    FINAL_WORDS_PAUSE: 1500,
    FADE_OUT_DURATION: 2000,
  };

  useEffect(() => {
    document.body.classList.add('preloader-active');

    const video = videoRef.current;
    if (video) {
      video.play().catch(console.error);

      const handleVideoEnd = () => {
        setTimeout(() => {
          if (preloaderRef.current) {
            preloaderRef.current.style.transition = `opacity ${TIMING.FADE_OUT_DURATION}ms ease-in-out`;
            preloaderRef.current.style.opacity = '0';

            setTimeout(() => {
              setLoading(false);
              document.body.classList.remove('preloader-active');
            }, TIMING.FADE_OUT_DURATION);
          }
        }, TIMING.FINAL_WORDS_PAUSE);
      };

      video.addEventListener('ended', handleVideoEnd);

      return () => {
        video.removeEventListener('ended', handleVideoEnd);
      };
    }

    return () => {
      document.body.classList.remove('preloader-active');
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="enhanced-preloader" ref={preloaderRef}>
      <video
        ref={videoRef}
        src={preloaderVid}
        muted
        autoPlay
        style={{ width: '75%', height: '75%', objectFit: 'cover' }}
      />
    </div>
  );
};

export default EnhancedPreloader;