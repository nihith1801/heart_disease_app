import { useEffect, useState } from 'react';
import './cursorEffect.css';

export const CursorEffect = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (!isMobile) {
      const bigBall = document.querySelector('.cursor__ball--big');
      const trailBalls = document.querySelectorAll('.cursor__trail');
      const hoverables = document.querySelectorAll('.hoverable');

      const onMouseMove = (e) => {
        const { clientX, clientY } = e;  // Use clientX and clientY to get cursor relative to the viewport

        // Move the main cursor
        bigBall.style.transform = `translate(${clientX - 15}px, ${clientY - 15}px)`;

        // Create a gooey trail effect
        trailBalls.forEach((trailBall, index) => {
          setTimeout(() => {
            trailBall.style.transform = `translate(${clientX - 15}px, ${clientY - 15}px)`;
          }, index * 40);
        });

        // Check if hoverables are within cursor range
        hoverables.forEach((hoverable) => {
          const rect = hoverable.getBoundingClientRect();
          const inCursorRadius =
            clientX > rect.left &&
            clientX < rect.right &&
            clientY > rect.top &&
            clientY < rect.bottom;

          if (inCursorRadius) {
            hoverable.classList.add('invert');
          } else {
            hoverable.classList.remove('invert');
          }
        });
      };

      // Attach mousemove event
      document.body.addEventListener('mousemove', onMouseMove);

      return () => {
        document.body.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Embedding the SVG filter for the gooey effect */}
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="0" height="0">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 30 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Cursor Elements */}
      <div className="cursor">
        {/* Main Cursor Ball */}
        <div className="cursor__ball cursor__ball--big">
          <svg height="30" width="30">
            <circle cx="15" cy="15" r="12" strokeWidth="0"></circle>
          </svg>
        </div>

        {/* Trail Balls for Gooey Effect */}
        <div className="cursor__trail cursor__trail--1">
          <svg height="20" width="20">
            <circle cx="10" cy="10" r="9" strokeWidth="0"></circle>
          </svg>
        </div>
        <div className="cursor__trail cursor__trail--2">
          <svg height="15" width="15">
            <circle cx="7.5" cy="7.5" r="6.5" strokeWidth="0"></circle>
          </svg>
        </div>
        <div className="cursor__trail cursor__trail--3">
          <svg height="10" width="10">
            <circle cx="5" cy="5" r="4.5" strokeWidth="0"></circle>
          </svg>
        </div>
      </div>
    </>
  );
};
