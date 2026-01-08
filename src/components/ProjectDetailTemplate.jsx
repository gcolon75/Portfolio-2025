import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PDFViewer from './PDFViewer';
import './ProjectDetailTemplate.css';

const ProjectDetailTemplate = ({ project }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  // Scroll to top on mount to ensure project pages start at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Compute hero image with fallback priority:
  // 1. First image from project.assets.images array (if exists)
  // 2. Fallback to project.coverImage (for projects without images array)
  const heroImage = project.assets?.images?.[0] || project.coverImage;

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
    <section className="project-detail">
      <motion.div
        className="project-detail-container"
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
          ← Back to Projects
        </motion.button>

        {/* Hero Section */}
        <motion.header className="project-hero" variants={itemVariants}>
          {heroImage && !imageError ? (
            <div className="hero-image-wrapper">
              <img 
                src={encodeURI(heroImage)} 
                alt={project.title}
                className="hero-image"
                onError={(e) => {
                  setImageError(true);
                  console.warn(`Failed to load image: ${heroImage}`);
                }}
              />
            </div>
          ) : (
            <div className="hero-image-wrapper">
              <div className="hero-placeholder">
                <span className="placeholder-icon">🚀</span>
              </div>
            </div>
          )}
          <div className="hero-content">
            <h1 className="project-title">{project.title}</h1>
            {project.tagline && <p className="project-tagline">{project.tagline}</p>}
            <div className="project-meta">
              <span className="meta-badge role">{project.role}</span>
              <span className="meta-badge date">{project.date}</span>
              <span className={`meta-badge status ${project.status.toLowerCase().replace(' ', '-')}`}>
                {project.status}
              </span>
            </div>
          </div>
        </motion.header>

        {/* Main Content Grid */}
        <motion.div className="project-content-grid" variants={itemVariants}>
          {/* Left Column - Main Content */}
          <div className="content-main">
            {/* Problem-Approach-Result */}
            <div className="content-section">
              <h3 className="section-title">Problem</h3>
              <p className="section-text">{project.problem}</p>
            </div>

            <div className="content-section">
              <h3 className="section-title">Approach</h3>
              <p className="section-text">{project.approach}</p>
            </div>

            <div className="content-section">
              <h3 className="section-title">Result</h3>
              <p className="section-text">{project.result}</p>
            </div>

            {/* What I Specifically Did */}
            {project.whatISpecificallyDid && project.whatISpecificallyDid.length > 0 && (
              <div className="content-section">
                <h3 className="section-title">What I Specifically Did</h3>
                <ul className="contribution-list">
                  {project.whatISpecificallyDid.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Impact */}
            {project.impact && (
              <div className="content-section impact-section">
                <h3 className="section-title">Impact</h3>
                <p className="impact-statement">{project.impact.statement}</p>
                <p className="impact-how"><strong>How:</strong> {project.impact.how}</p>
              </div>
            )}

            {/* Tech Stack moved into main content */}
            {project.tech && project.tech.length > 0 && (
              <div className="content-section sidebar-section">
                <h4 className="sidebar-title">Tech Stack</h4>
                <div className="tag-grid">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Skills moved into main content */}
            {project.skills && project.skills.length > 0 && (
              <div className="content-section sidebar-section">
                <h4 className="sidebar-title">Skills Demonstrated</h4>
                <div className="skill-list">
                  {project.skills.map((skill, index) => (
                    <span key={index} className="skill-badge">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Key Concepts moved into main content */}
            {project.concepts && project.concepts.length > 0 && (
              <div className="content-section sidebar-section">
                <h4 className="sidebar-title">Key Concepts</h4>
                <div className="concept-list">
                  {project.concepts.map((concept, index) => (
                    <span key={index} className="concept-tag">{concept}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column removed and contents moved into main content */}
        </motion.div>

        {/* Assets Section */}
        {(project.assets?.images?.length > 1 || 
          project.assets?.pdfs?.length > 0 || 
          project.assets?.videos?.length > 0 ||
          project.assets?.links?.length > 0) && (
          <motion.div className="assets-section" variants={itemVariants}>
            <h3 className="assets-title">Project Assets</h3>
            
            {/* Image Gallery (excluding hero image) */}
            {project.assets.images?.length > 1 && (
              <div className="image-gallery">
                {project.assets.images.slice(1).map((image, index) => (
                  <div key={index} className="gallery-item">
                    <img src={image} alt={`${project.title} screenshot ${index + 1}`} />
                  </div>
                ))}
              </div>
            )}

            {/* PDF Viewers */}
            {project.assets.pdfs?.map((pdf, index) => (
              <div key={index} className="pdf-wrapper">
                <h4 className="pdf-title">Document {index + 1}</h4>
                <PDFViewer pdfUrl={pdf} fileName={`${project.id}-doc-${index + 1}.pdf`} />
              </div>
            ))}

            {/* External Links */}
            {project.assets.links?.length > 0 && (
              <div className="external-links">
                <h4 className="links-title">External Resources</h4>
                <div className="links-grid">
                  {project.assets.links.map((link, index) => (
                    <a 
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="external-link"
                    >
                      {link.type === 'github' && '🔗 '}
                      {link.type === 'slides' && '📊 '}
                      {link.type === 'spreadsheet' && '📈 '}
                      {link.type === 'website' && '🌐 '}
                      {link.title}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Google Slides or Spreadsheets Embeds */}
            {project.assets.links?.some(link => link.type === 'slides' || link.type === 'spreadsheet') && (
              <div className="google-embeds">
                {project.assets.links
                  .filter(link => link.type === 'slides' || link.type === 'spreadsheet')
                  .map((link, index) => (
                    <div key={index} className="embed-wrapper">
                      <h4 className="embed-title">{link.title}</h4>
                      <iframe
                        src={link.url}
                        className="google-embed"
                        title={link.title}
                        frameBorder="0"
                        allowFullScreen
                      />
                    </div>
                  ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Footer */}
        <motion.div className="project-footer" variants={itemVariants}>
          <button className="nav-button" onClick={() => navigate('/')}>
            ← Back to Projects
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProjectDetailTemplate;
