import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PDFViewer from './PDFViewer';
import './WritingDetailTemplate.css';

const WritingDetailTemplate = ({ article }) => {
  const navigate = useNavigate();

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
            {article.thumbnail ? (
              <img 
                src={article.thumbnail} 
                alt={article.title}
                className="cover-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                  console.warn(`Failed to load thumbnail: ${article.thumbnail}`);
                }}
              />
            ) : null}
            <div className="cover-placeholder" style={{ display: article.thumbnail ? 'none' : 'flex' }}>
              <span className="cover-icon">📝</span>
            </div>
          </div>
          <div className="hero-content">
            <h1 className="article-title">{article.title}</h1>
            <div className="article-meta">
              <span className="meta-author">{article.author}</span>
              <span className="meta-divider">•</span>
              <span className="meta-date">{article.date}</span>
              <span className="meta-divider">•</span>
              <span className="meta-read-time">{article.readTime}</span>
            </div>
          </div>
        </motion.header>

        {/* Content Grid - Summary Left, Skills Right */}
        <motion.div className="content-grid" variants={itemVariants}>
          {/* Summary Section - 60% */}
          <div className="summary-section">
            <h3>Summary</h3>
            <p>{article.fullSummary}</p>
            {/* Key Themes inline */}
            {article.themes && article.themes.length > 0 && (
              <div className="theme-tags">
                {article.themes.map((theme, index) => (
                  <span key={index} className="theme-tag">
                    {theme}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Skills Section - 40% */}
          <div className="skills-section">
            <h3>Skills Demonstrated</h3>
            <div className="skills-list">
              {article.skills && article.skills.map((skill, index) => (
                <span key={index} className="skill-badge">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* PDF Viewer Section */}
        {article.pdfPath && (
          <motion.div className="pdf-section" variants={itemVariants}>
            <h3 className="pdf-section-title">Full Article</h3>
            <PDFViewer 
              pdfUrl={article.pdfPath} 
              fileName={`${article.id}.pdf`}
            />
          </motion.div>
        )}

        {/* Footer Section - Compact */}
        <motion.div className="article-footer" variants={itemVariants}>
          {article.pdfPath && (
            <a 
              href={article.pdfPath} 
              download
              className="pdf-button"
            >
              📄 Download Article (PDF)
            </a>
          )}
          <button className="nav-button" onClick={() => navigate('/')}>
            ← Back to Writing
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WritingDetailTemplate;
