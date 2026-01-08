import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PDFViewer from './PDFViewer';
import './ProjectDetailTemplate.css';

const ProjectDetailTemplate = ({ project }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState(null);

  // Scroll to top on mount to ensure project pages start at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Compute hero image with fallback priority:
  // 1. First image from project.assets.images array (if exists)
  // 2. Fallback to project.coverImage (for projects without images array)
  const heroImage = project.assets?.images?.[0] || project.coverImage;

  // Screenshots = everything except hero if hero comes from images[0]
  const screenshots = useMemo(() => {
    const imgs = project.assets?.images || [];
    if (!imgs.length) return [];
    if (heroImage && imgs[0] === heroImage) return imgs.slice(1);
    return imgs;
  }, [project.assets?.images, heroImage]);

  const pdfs = project.assets?.pdfs || [];

  // Only embeds we keep (no external link buttons):
  const embeds = useMemo(() => {
    const links = project.assets?.links || [];
    return links.filter((l) => l.type === 'slides' || l.type === 'spreadsheet');
  }, [project.assets?.links]);

  const hasAssets = screenshots.length > 0 || pdfs.length > 0 || embeds.length > 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const closeLightbox = () => setLightboxSrc(null);

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
          onClick={() => navigate(-1)}
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
                onError={() => {
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
          <div className="content-main">
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

            {project.impact && (
              <div className="content-section impact-section">
                <h3 className="section-title">Impact</h3>
                <p className="impact-statement">{project.impact.statement}</p>
                <p className="impact-how"><strong>How:</strong> {project.impact.how}</p>
              </div>
            )}

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
        </motion.div>

        {/* Assets Section (clean + structured) */}
        {hasAssets && (
          <motion.div className="assets-section" variants={itemVariants}>
            <h3 className="assets-title">Assets</h3>

            {/* Screenshots */}
            {screenshots.length > 0 && (
              <div className="assets-block">
                <h4 className="assets-subtitle">Screenshots</h4>
                <div className="image-gallery">
                  {screenshots.map((image, index) => (
                    <button
                      key={index}
                      type="button"
                      className="gallery-item"
                      onClick={() => setLightboxSrc(image)}
                      aria-label={`Open screenshot ${index + 1}`}
                    >
                      <img src={encodeURI(image)} alt={`${project.title} screenshot ${index + 1}`} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Documents */}
            {pdfs.length > 0 && (
              <div className="assets-block">
                <h4 className="assets-subtitle">Documents</h4>

                <div className="docs-stack">
                  {pdfs.map((pdf, index) => (
                    <details key={index} className="doc-item" open={index === 0}>
                      <summary className="doc-summary">
                        Document {index + 1}
                      </summary>
                      <div className="doc-body">
                        <PDFViewer pdfUrl={pdf} fileName={`${project.id}-doc-${index + 1}.pdf`} />
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* Decks & Models (embedded only, no external buttons) */}
            {embeds.length > 0 && (
              <div className="assets-block">
                <h4 className="assets-subtitle">Models & Decks</h4>

                <div className="embed-grid">
                  {embeds.map((link, index) => (
                    <div key={index} className="embed-wrapper">
                      <h4 className="embed-title">{link.title}</h4>
                      <iframe
                        src={link.url}
                        className="google-embed"
                        title={link.title}
                        frameBorder="0"
                        // Lock it down: no popups, no top navigation, no new tabs
                        sandbox="allow-scripts allow-same-origin allow-forms"
                        referrerPolicy="no-referrer"
                        allow="fullscreen"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxSrc && (
            <motion.div
              className="lightbox-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <motion.div
                className="lightbox-panel"
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.98, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="lightbox-close"
                  onClick={closeLightbox}
                  aria-label="Close image"
                >
                  ×
                </button>
                <img
                  src={encodeURI(lightboxSrc)}
                  alt="Screenshot preview"
                  className="lightbox-image"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div className="project-footer" variants={itemVariants}>
          <button className="nav-button" onClick={() => navigate(-1)}>
            ← Back to Projects
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProjectDetailTemplate;
