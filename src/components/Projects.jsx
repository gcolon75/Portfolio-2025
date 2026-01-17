import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import './Projects.css';

const Projects = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.8, rotateY: -15 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  // ✅ Joint is the featured “starred” project
  const featuredId = 'joint-theatrical-ventures';

  // ✅ Keep Joint first, then sort by year (desc)
  const orderedProjects = [...projects].sort((a, b) => {
    if (a.id === featuredId) return -1;
    if (b.id === featuredId) return 1;

    const ay = typeof a.year === 'number' ? a.year : 0;
    const by = typeof b.year === 'number' ? b.year : 0;
    return by - ay;
  });

  const getThumbnail = (project) =>
    project.cardImage || project.coverImage || project.assets?.images?.[0] || null;

  const statusClass = (status) =>
    String(status || '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-');

  return (
    <section id="projects" className="projects">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Mission Archives
        </motion.h2>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {orderedProjects.map((project, index) => {
            const ProjectWrapper = project.route ? Link : 'div';
            const wrapperProps = project.route ? { to: project.route } : {};

            const isFeatured = project.id === featuredId;
            const thumb = getThumbnail(project);
            const thumbSrc = thumb ? encodeURI(thumb) : null;

            return (
              <ProjectWrapper
                key={project.id}
                {...wrapperProps}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <motion.div
                  className={`project-card ${project.route ? 'clickable' : ''} ${
                    isFeatured ? 'featured' : ''
                  }`}
                  variants={cardVariants}
                  whileHover={{
                    scale: 1.05,
                    rotateZ: 2,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="project-orbit" style={{ animationDelay: `${index * 0.5}s` }} />

                  <div className="project-content">
                    <div className="project-header">
                      <div className="project-title-wrap">
                        <div className="project-card-thumb" aria-hidden="true">
                          {thumbSrc && (
                            <img
                              src={thumbSrc}
                              alt=""
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.parentElement?.classList.add('is-broken');
                              }}
                            />
                          )}
                          <div className="project-card-thumb-placeholder">🗂️</div>
                        </div>

                        <h3>
                          {project.name}
                          {isFeatured && (
                            <span className="project-featured-star" title="Flagship">
                              ★
                            </span>
                          )}
                        </h3>
                      </div>
                    </div>

                    <p className="project-description">{project.description}</p>

                    <div className="project-tech">
                      {(project.tech || []).slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="project-footer">
                      <div className="project-footer-left">
                        <span className="project-category">{project.category}</span>
                        <span className="project-date">{project.date}</span>
                      </div>

                      <span className={`project-status ${statusClass(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <div className="project-glow" />
                </motion.div>
              </ProjectWrapper>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
