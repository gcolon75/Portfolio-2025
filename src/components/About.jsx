import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaUniversity, FaEnvelope, FaPhone } from 'react-icons/fa';
import './About.css';

const About = () => {
  const stats = [
    { name: 'UX Design', level: 95, color: 'var(--plasma-green)' },
    { name: 'Frontend Dev', level: 90, color: 'var(--starlight-gold)' },
    { name: 'Project Management', level: 85, color: 'var(--nebula-purple)' },
    { name: 'AI Integration', level: 80, color: 'var(--rocket-red)' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section id="about" className="about">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Mission Control Dashboard
        </motion.h2>

        <div className="about-grid">
          <motion.div
            className="about-card bio-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>About Me</h3>
            <p className="bio-text">
              I'm a creative technologist with a passion for crafting exceptional digital experiences. 
              With a background in Cognitive Science from UCSD, I blend UX design principles with 
              technical expertise to build innovative solutions. My work spans from designing intuitive 
              interfaces to developing robust web applications and exploring the frontiers of AI automation.
            </p>
            
            <div className="info-grid">
              <div className="info-item">
                <FaMapMarkerAlt className="info-icon" />
                <span>San Diego, CA</span>
              </div>
              <div className="info-item">
                <FaUniversity className="info-icon" />
                <span>UCSD B.S. Cognitive Science</span>
              </div>
              <div className="info-item">
                <FaEnvelope className="info-icon" />
                <span>ghawk075@gmail.com</span>
              </div>
              <div className="info-item">
                <FaPhone className="info-icon" />
                <span>(847) 778-1274</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-card stats-card"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3>RPG Stats</h3>
            <div className="stats-container">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.name}
                  className="stat-item"
                  variants={itemVariants}
                >
                  <div className="stat-header">
                    <span className="stat-name">{stat.name}</span>
                    <span className="stat-value">{stat.level}%</span>
                  </div>
                  <div className="stat-bar-container">
                    <motion.div
                      className="stat-bar"
                      style={{ backgroundColor: stat.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stat.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
