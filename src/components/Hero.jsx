import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import './Hero.css';

// Generated once at module load so re-renders never move the stars.
// Twinkle runs in CSS (opacity and transform only), so it stays on the compositor.
const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  duration: Math.random() * 3 + 2,
  delay: Math.random() * -5
}));

const Starfield = React.memo(() => (
  <div className="stars-container" aria-hidden="true">
    {STARS.map((star) => (
      <div
        key={star.id}
        className="star"
        style={{
          left: `${star.x}%`,
          top: `${star.y}%`,
          width: `${star.size}px`,
          height: `${star.size}px`,
          animationDuration: `${star.duration}s`,
          animationDelay: `${star.delay}s`
        }}
      />
    ))}
  </div>
));
Starfield.displayName = 'Starfield';

// Owns the typing state so each keystroke re-renders only this span, not the whole hero.
const Typewriter = ({ roles }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    let delay = isDeleting ? 50 : 100;
    let step;

    if (!isDeleting && displayedText === currentRole) {
      delay = 2000;
      step = () => setIsDeleting(true);
    } else if (isDeleting && displayedText === '') {
      delay = 500;
      step = () => {
        setIsDeleting(false);
        setCurrentRoleIndex((i) => (i + 1) % roles.length);
      };
    } else {
      step = () =>
        setDisplayedText(currentRole.substring(0, displayedText.length + (isDeleting ? -1 : 1)));
    }

    const timer = setTimeout(step, delay);
    return () => clearTimeout(timer);
  }, [displayedText, currentRoleIndex, isDeleting, roles]);

  return <span className="hero-role">{displayedText}</span>;
};

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="hero">
      <Starfield />

      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="hero-greeting">Hello, I'm</p>
          <h1 className="hero-name glow">Gabriel Colon</h1>
          <div className="hero-role-container">
            <Typewriter roles={profile.roles} />
            <span className="cursor">|</span>
          </div>
        </motion.div>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button 
            className="cta-button primary"
            onClick={() => scrollToSection('projects')}
            aria-label="View Projects"
          >
            View Projects
          </button>
          <button 
            className="cta-button secondary"
            onClick={() => {
              const link = document.createElement('a');
              link.href = `${process.env.PUBLIC_URL}/resume.pdf`;
              link.target = '_blank';
              link.rel = 'noopener noreferrer';
              link.click();
            }}
            aria-label="Download Resume"
          >
            Download Resume
          </button>
          <button 
            className="cta-button tertiary"
            onClick={() => scrollToSection('contact')}
            aria-label="Contact Me"
          >
            Contact Me
          </button>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="scroll-arrow"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
