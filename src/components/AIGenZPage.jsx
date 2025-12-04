import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
// import PDFViewer from './PDFViewer';
import './AIGenZPage.css';

const AIGenZPage = () => {
  const navigate = useNavigate();

  const skills = [
    'Technical Writing',
    'AI Research',
    'Critical Thinking',
    'UX Research',
    'Ethical Design',
    'Data Synthesis',
    'Generational Studies'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="writing-detail">
      <motion.div
        className="writing-detail-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back Button */}
        <motion.button
          className="back-button"
          onClick={() => navigate('/')}
          variants={itemVariants}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back to Writing
        </motion.button>

        {/* Hero Section - Horizontal Layout */}
        <motion.header className="article-hero" variants={itemVariants}>
          <div className="hero-cover">
            <div className="cover-placeholder">
              <span className="cover-icon">🤖</span>
            </div>
          </div>
          <div className="hero-content">
            <h1 className="article-title">AI and Gen Z: A Generation Growing Up With an Algorithm</h1>
            <div className="article-meta">
              <span className="meta-author">Gabriel Colón</span>
              <span className="meta-divider">•</span>
              <span className="meta-date">Aug 6, 2025</span>
              <span className="meta-divider">•</span>
              <span className="meta-read-time">15 min</span>
            </div>
          </div>
        </motion.header>

        {/* Content Grid - Summary Left, Skills Right */}
        <motion.div className="content-grid" variants={itemVariants}>
          {/* Summary Section - 60% */}
          <div className="summary-section">
            <h3>Summary</h3>
            <p>
              This groundbreaking analysis explores how Generation Z is navigating unprecedented territory as the first generation 
              to grow up with AI as an integral part of their emotional, educational, and social development. Through autoethnographic 
              reflection and data-driven research, the article examines the profound implications of AI integration on mental health, 
              learning methodologies, and ethical considerations for the future.
            </p>
            {/* Key Themes inline */}
            <div className="theme-tags">
              <span className="theme-tag">Emotional AI Dependency</span>
              <span className="theme-tag">Educational Transformation</span>
              <span className="theme-tag">Ethical Concerns</span>
              <span className="theme-tag">Generational Impact</span>
            </div>
          </div>

          {/* Skills Section - 40% */}
          <div className="skills-section">
            <h3>Skills Demonstrated</h3>
            <div className="skills-list">
              {skills.map((skill, index) => (
                <span key={index} className="skill-badge">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer Section - Compact */}
        <motion.div className="article-footer" variants={itemVariants}>
          <button className="pdf-button" onClick={() => alert('PDF coming soon!')}>
            📄 View Full Article (PDF)
          </button>
          <button className="nav-button" onClick={() => navigate('/')}>
            ← Back to Writing
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AIGenZPage;
