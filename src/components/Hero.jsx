import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const roles = useMemo(() => ['UX Designer', 'Frontend Developer', 'Project Manager', 'AI Enthusiast'], []);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentRole.length) {
          setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((currentRoleIndex + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, currentRoleIndex, isDeleting, roles]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Create stars
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 3 + 2
  }));

  return (
    <section id="home" className="hero">
      <div className="stars-container">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="hero-greeting">Hello, I'm</p>
          <h1 className="hero-name glow">Gabriel Colon</h1>
          <div className="hero-role-container">
            <span className="hero-role">{displayedText}</span>
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
            onClick={() => window.open('/resume.pdf', '_blank')}
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
