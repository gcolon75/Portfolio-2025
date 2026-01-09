import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PDFViewer from './PDFViewer';
import './ProjectDetailTemplate.css';

const ProjectDetailTemplate = ({ project }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ✅ Hero should prefer coverImage
  const heroImage = project.coverImage || project.assets?.images?.[0] || null;

  // If hero came from assets (only when coverImage missing), exclude it from screenshots
  const screenshots = useMemo(() => {
    const imgs = project.assets?.images || [];
    const heroCameFromAssets = !project.coverImage && imgs.length > 0 && heroImage === imgs[0];
    return heroCameFromAssets ? imgs.slice(1) : imgs;
  }, [project.assets?.images, project.coverImage, heroImage]);

  // Support both:
  // - legacy: ["...pdfUrl.pdf", "..."]
  // - preferred: [{ title, url }, ...]
  const pdfs = project.assets?.pdfs || [];

  // Keep embeds, but NO external link buttons
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

  if (!project) {
    return (
      <section className="project-detail">
        <div className="project-detail-container">
          <button className="back-button" onClick={() => navigate('/')}>
            ← Back to Projects
          </button>
          <div className="content-section">
            <h3 className="section-title">Project not found</h3>
            <p className="section-text">This project is missing from your projects data.</p>
          </div>
        </div>
      </section>
    );
  }

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
                onError={() => {
                  setImageError(true);
                  console.warn(`Failed to load hero image: ${heroImage}`);
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

        {/* Main Content */}
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

            {project.whatISpecificallyDid?.length > 0 && (
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
                <p className="impact-how">
                  <strong>How:</strong> {project.impact.how}
                </p>
              </div>
            )}

            {project.tech?.length > 0 && (
              <div className="content-section sidebar-section">
                <h4 className="sidebar-title">Tech Stack</h4>
                <div className="tag-grid">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            )}

            {project.skills?.length > 0 && (
              <div className="content-section sidebar-section">
                <h4 className="sidebar-title">Skills Demonstrated</h4>
                <div className="skill-list">
                  {project.skills.map((skill, index) => (
                    <span key={index} className="skill-badge">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {project.concepts?.length > 0 && (
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

        {/* Assets (bottom) */}
        {hasAssets && (
          <motion.div className="assets-section" variants={itemVariants}>
            <h3 className="assets-title">Assets</h3>

            {screenshots.length > 0 && (
              <>
                <h4 className="pdf-title">Screenshots</h4>
                <div className="image-gallery">
                  {screenshots.map((image, index) => (
                    <div key={index} className="gallery-item">
                      <img src={encodeURI(image)} alt={`${project.title} screenshot ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </>
            )}

            {pdfs.map((item, index) => {
              const url = typeof item === 'string' ? item : item?.url;
              const title = typeof item === 'string' ? `Document ${index + 1}` : (item?.title || `Document ${index + 1}`);
              if (!url) return null;

              return (
                <div key={`${project.id}-pdf-${index}`} className="pdf-wrapper">
                  <h4 className="pdf-title">{title}</h4>
                  <PDFViewer
                    pdfUrl={url}
                    title={title}
                    fileName={`${project.id}-doc-${index + 1}.pdf`}
                  />
                </div>
              );
            })}

            {embeds.length > 0 && (
              <>
                <h4 className="pdf-title">Models & Decks</h4>
                <div className="google-embeds">
                  {embeds.map((link, index) => (
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
              </>
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
