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
    // prefer explicit coverImage if used by other projects
    if (project.coverImage) return project.coverImage;

    const imgs = project.assets?.images;
    if (Array.isArray(imgs) && imgs.length > 0) return imgs[0];
    return null;
  }, [project]);

  const images = useMemo(() => normalizeImages(project?.assets?.images), [project]);
  const pdfs = useMemo(() => normalizePdfs(project?.assets?.pdfs), [project]);
  const links = useMemo(() => normalizeLinks(project?.assets?.links), [project]);

  const hasAssets = (images && images.length > 0) || (pdfs && pdfs.length > 0) || (links && links.length > 0) || !!project?.designProof;

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
          <div className="hero-image-wrapper">
            {heroImage ? (
              <img className="hero-image" src={heroImage} alt={project.title} />
            ) : (
              <div className="hero-placeholder">
                <div className="placeholder-icon">🧩</div>
              </div>
            )}
          </div>

          <div className="hero-content">
            <h1 className="project-title">{project.title}</h1>
            {project.tagline && <p className="project-tagline">{project.tagline}</p>}

            <div className="project-meta">
              {project.role && <span className="meta-badge">{project.role}</span>}
              {project.year && <span className="meta-badge">{project.year}</span>}
              {project.status && (
                <span className={`meta-badge status ${String(project.status).toLowerCase().replace(' ', '-')}`}>
                  {project.status}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="project-content-grid">
          <div className="content-main">

            {project.problem && (
              <div className="content-section">
                <h3 className="section-title">Problem</h3>
                <p className="section-text">{project.problem}</p>
              </div>
            )}

            {project.approach && (
              <div className="content-section">
                <h3 className="section-title">Approach</h3>
                <p className="section-text">{project.approach}</p>
              </div>
            )}

            {project.result && (
              <div className="content-section">
                <h3 className="section-title">Result</h3>
                <p className="section-text">{project.result}</p>
              </div>
            )}

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

        {/* ASSETS */}
        {hasAssets && (
          <section className="assets-section">
            <h3 className="assets-title">Assets</h3>

            {/* PROOF OF GAME DESIGN (SAFE: kept inside assets only) */}
            {project.designProof && (
              <div className="assets-block">
                <h4 className="assets-subtitle">Proof of Game Design</h4>

                <div className="proof-grid">
                  <div className="proof-media">
                    <div className="proof-image-shell">
                      <img
                        src={project.designProof.image}
                        alt={project.designProof.imageAlt || 'Gameplay system proof'}
                        className="proof-image"
                        onClick={() => setLightboxSrc(project.designProof.image)}
                      />
                    </div>
                    <div className="proof-caption">
                      {project.designProof.caption || 'In-development combat UI. AI-generated concept art. Animation pending.'}
                    </div>
                  </div>

                  <div className="proof-text">
                    {Array.isArray(project.designProof.notes) && project.designProof.notes.length > 0 && (
                      <ul className="proof-notes">
                        {project.designProof.notes.map((n, i) => <li key={i}>{n}</li>)}
                      </ul>
                    )}

                    {Array.isArray(project.designProof.breakdown) && project.designProof.breakdown.length > 0 && (
                      <div className="proof-breakdown">
                        {project.designProof.breakdown.map((row, i) => (
                          <div key={i} className="proof-row">
                            <div className="proof-label">{row.label}</div>
                            <div className="proof-body">{row.text}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

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
                    <h4 className="pdf-title">{pdf.title}</h4>
                    <PDFViewer pdfUrl={pdf.url} />
                  </div>
                ))}
              </div>
            )}

            {/* Links */}
            {links.length > 0 && (
              <div className="assets-block">
                <h4 className="assets-subtitle">Links</h4>
                <div className="links-list">
                  {links.map((l, i) => (
                    <a key={i} className="asset-link" href={l.url} target="_blank" rel="noreferrer">
                      {l.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Lightbox */}
        {lightboxSrc && (
          <div className="lightbox" onClick={() => setLightboxSrc(null)} role="button" tabIndex={0}>
            <button className="lightbox-close" onClick={() => setLightboxSrc(null)} type="button" aria-label="Close">
              ×
            </button>
            <img className="lightbox-image" src={lightboxSrc} alt="Expanded preview" />
          </div>
        )}

        <div className="project-footer">
          <button className="nav-button" onClick={() => navigate('/projects')}>
            ← Back to Projects
          </button>
        </div>

      </div>
    </section>
  );
};

export default ProjectDetailTemplate;
