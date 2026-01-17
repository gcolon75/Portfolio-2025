import React, { useState, useMemo, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DocumentViewer from './DocumentViewer';
import './WritingDetailTemplate.css';

const inferFileType = (url) => {
  if (!url) return null;
  const lower = url.toLowerCase();
  if (lower.includes('.pdf')) return 'pdf';
  if (lower.includes('.docx')) return 'docx';
  if (lower.includes('.doc')) return 'doc';
  return null;
};

const WritingDetailTemplate = ({ article }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const doc = useMemo(() => {
    const fileUrl = article?.fileUrl || article?.pdfPath || null;
    const inferred = inferFileType(fileUrl);
    const fileType = inferred || article?.fileType || null;
    const fileName = fileType
      ? `${article?.id || 'document'}.${fileType}`
      : (article?.id || 'document');

    return { fileUrl, fileType, fileName };
  }, [article]);

  const hasDocument = Boolean(doc.fileUrl && doc.fileType);

  // ✅ Bigger than before (less subtraction) + uses 100dvh so it behaves better on modern browsers.
  const viewerHeight = useMemo(
    () => 'clamp(560px, calc(100dvh - 150px), 1800px)',
    []
  );

  return (
    <section className="writing-detail">
      <motion.div
        className="writing-detail-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.button
          className="back-button"
          onClick={() => navigate(-1)}
          variants={itemVariants}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back to Writing
        </motion.button>

        <motion.header className="article-hero" variants={itemVariants}>
          <div className="hero-cover">
            {article.thumbnail && !imageError ? (
              <img
                src={encodeURI(article.thumbnail)}
                alt={article.title}
                className="cover-image"
                onError={() => {
                  setImageError(true);
                  console.warn(`Failed to load thumbnail: ${article.thumbnail}`);
                }}
              />
            ) : (
              <div className="cover-placeholder">
                <span className="cover-icon">📝</span>
              </div>
            )}
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

        <motion.div className="content-grid" variants={itemVariants}>
          <div className="summary-section">
            <h3>Summary</h3>
            <p>{article.fullSummary}</p>

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

        <motion.div className="pdf-section" variants={itemVariants}>
          <h3 className="pdf-section-title">Full Article</h3>

          {hasDocument ? (
            <DocumentViewer
              fileUrl={doc.fileUrl}
              fileType={doc.fileType}
              fileName={doc.fileName}
              height={viewerHeight}
            />
          ) : (
            <div className="pdf-viewer-container">
              <div className="pdf-error">
                <p>No document is linked for this article.</p>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div className="article-footer" variants={itemVariants}>
          <button className="nav-button" onClick={() => navigate(-1)}>
            ← Back to Writing
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WritingDetailTemplate;
