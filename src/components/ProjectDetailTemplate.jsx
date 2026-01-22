// src/components/ProjectDetailTemplate.jsx
import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PDFViewer from './PDFViewer';
import './ProjectDetailTemplate.css';

function titleFromPath(url = '') {
  try {
    const clean = url.split('?')[0];
    const last = clean.split('/').pop() || 'Document';
    return decodeURIComponent(last).replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
  } catch {
    return 'Document';
  }
}

function normalizePdfs(pdfs) {
  if (!Array.isArray(pdfs)) return [];
  return pdfs
    .map(item => {
      if (!item) return null;
      if (typeof item === 'string') {
        return { title: titleFromPath(item), url: item };
      }
      if (typeof item === 'object') {
        const url = item.url || '';
        return { title: item.title || titleFromPath(url), url };
      }
      return null;
    })
    .filter(x => x && typeof x.url === 'string' && x.url.trim().length > 0);
}

function normalizeLinks(links) {
  if (!Array.isArray(links)) return [];
  return links
    .map(item => {
      if (!item) return null;
      if (typeof item === 'string') return { title: item, url: item };
      if (typeof item === 'object') return { title: item.title || item.url, url: item.url };
      return null;
    })
    .filter(x => x && x.url && String(x.url).trim().length > 0);
}

function normalizeImages(images) {
  if (!Array.isArray(images)) return [];
  return images.filter(Boolean);
}

const ProjectDetailTemplate = ({ project }) => {
  const navigate = useNavigate();
  const [lightboxSrc, setLightboxSrc] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const heroImage = useMemo(() => {
    if (!project) return null;
    if (project.coverImage) return project.coverImage;
    const imgs = project.assets?.images;
    if (Array.isArray(imgs) && imgs.length > 0) return imgs[0];
    return null;
  }, [project]);

  const images = useMemo(() => normalizeImages(project?.assets?.images), [project]);
  const pdfs = useMemo(() => normalizePdfs(project?.assets?.pdfs), [project]);
  const links = useMemo(() => normalizeLinks(project?.assets?.links), [project]);

  const hasAssets = (images && images.length > 0) || (pdfs && pdfs.length > 0) || (links && links.length > 0);

  if (!project) {
    return (
      <section className="project-detail">
        <div className="project-detail-container">
          <button className="back-button" onClick={() => navigate('/projects')}>
            ← Back
          </button>
          <div className="content-section">
            <h2 className="section-title">Project not found</h2>
            <p className="section-text">This route points to a missing project id in your projects.js.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="project-detail">
      <div className="project-detail-container">
        <button className="back-button" onClick={() => navigate('/projects')}>
          ← Back
        </button>

        {/* HERO */}
        <div className="project-hero">
          {heroImage ? (
            <div className="hero-image-wrapper">
              <img src={heroImage} alt={project.title} className="hero-image" />
            </div>
          ) : (
            <div className="hero-placeholder">
              <div className="placeholder-icon">🎮</div>
            </div>
          )}
          <div className="hero-content">
            <h1 className="project-title">{project.title}</h1>
            {project.tagline && <div className="project-tagline">{project.tagline}</div>}
            <div className="project-meta">
              <div className={`meta-badge status ${String(project.status || '').toLowerCase().replace(/\s+/g, '-')}`}>
                {project.status}
              </div>
              {project.date && <div className="meta-badge">{project.date}</div>}
              {project.category && <div className="meta-badge">{project.category}</div>}
            </div>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="project-content-grid">
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

            {Array.isArray(project.whatISpecificallyDid) && project.whatISpecificallyDid.length > 0 && (
              <div className="content-section">
                <h3 className="section-title">What I Specifically Did</h3>
                <ul className="contribution-list">
                  {project.whatISpecificallyDid.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.impact?.statement && (
              <div className="content-section impact-section">
                <h3 className="section-title">Impact</h3>
                <p className="impact-statement">{project.impact.statement}</p>
                {project.impact.how && <p className="impact-how">{project.impact.how}</p>}
              </div>
            )}
          </div>
        </div>

        {/* DESIGN NOTES */}
        {project.designNotes && (
          <div className="design-notes-section">
            <h3 className="design-notes-title">{project.designNotes.title}</h3>
            {project.designNotes.subtitle && (
              <p className="design-notes-subtitle">{project.designNotes.subtitle}</p>
            )}
            {project.designNotes.caption && (
              <p className="design-notes-caption">{project.designNotes.caption}</p>
            )}
            {project.designNotes.bullets && (
              <ul className="design-notes-bullets">
                {project.designNotes.bullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* ASSETS */}
        {hasAssets && (
          <section className="assets-section">
            <h3 className="assets-title">Assets</h3>

            {/* Screenshots */}
            {images.length > 0 && (
              <div className="assets-block">
                <h4 className="assets-subtitle">Images</h4>
                <div className="image-gallery">
                  {images.map((src, i) => (
                    <button
                      key={i}
                      className="gallery-item"
                      onClick={() => setLightboxSrc(src)}
                      aria-label="Open image"
                      type="button"
                    >
                      <img src={src} alt={`${project.title} screenshot ${i + 1}`} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* PDFs */}
            {pdfs.length > 0 && (
              <div className="assets-block">
                <h4 className="assets-subtitle">Documents & PDFs</h4>
                {pdfs.map((pdf, i) => (
                  <div key={i} className="pdf-wrapper">
                    <div className="pdf-title">{pdf.title}</div>
                    <div className="pdf-embed-shell">
                      <PDFViewer url={pdf.url} />
                    </div>
                    <div className="pdf-note">View or download: <code>{pdf.url}</code></div>
                  </div>
                ))}
              </div>
            )}

            {/* Links */}
            {links.length > 0 && (
              <div className="assets-block">
                <h4 className="assets-subtitle">Links</h4>
                <ul>
                  {links.map((l, i) => (
                    <li key={i}><a href={l.url} target="_blank" rel="noreferrer">{l.title || l.url}</a></li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* SMALL LIGHTBOX */}
        {lightboxSrc && (
          <div
            className="lightbox-overlay"
            onClick={() => setLightboxSrc(null)}
            role="dialog"
            aria-modal="true"
          >
            <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
              <button className="nav-button" onClick={() => setLightboxSrc(null)}>Close</button>
              <img src={lightboxSrc} alt="Preview" style={{ width: '100%', height: 'auto', marginTop: '1rem' }} />
            </div>
          </div>
        )}

        <div className="project-footer">
          <button className="nav-button" onClick={() => navigate('/projects')}>Back to Projects</button>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetailTemplate;