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
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -180 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  // Pin your best/primary project to the top
  const featuredId = 'project-valine';
  const sortedProjects = [...projects].sort((a, b) => {
    const aFeatured = a.id === featuredId;
    const bFeatured = b.id === featuredId;
    if (aFeatured !== bFeatured) return aFeatured ? -1 : 1;

    const ay = Number(a.year || 0);
    const by = Number(b.year || 0);
    if (by !== ay) return by - ay;
    return String(a.name).localeCompare(String(b.name));
  });

  return (
    <section id="projects" className="projects">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Galaxy Projects
        </motion.h2>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {sortedProjects.map((project, index) => {
            const ProjectWrapper = project.route ? Link : 'div';
            const wrapperProps = project.route ? { to: project.route } : {};

            const thumbnail =
              project.cardImage ||
              project.coverImage ||
              (project.assets?.images?.length ? project.assets.images[0] : null);

            const isFeatured = project.id === featuredId;
            
            return (
              <ProjectWrapper key={project.id} {...wrapperProps} style={{ textDecoration: 'none', display: 'block' }}>
                <motion.div
                  className={`project-card ${project.route ? 'clickable' : ''} ${isFeatured ? 'featured' : ''}`}
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateZ: 2,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="project-orbit" style={{ animationDelay: `${index * 0.5}s` }}></div>
                  
                  <div className="project-content">
                    <div className="project-header">
                      <div className="project-title-wrap">
                        <div className="project-card-thumb" aria-hidden="true">
                          {thumbnail ? (
                            <img src={encodeURI(thumbnail)} alt="" />
                          ) : (
                            <div className="project-card-thumb-placeholder">🪐</div>
                          )}
                        </div>
                        <h3>
                          {project.name}
                          {isFeatured && <span className="project-featured-star">★</span>}
                        </h3>
                      </div>
                      <span className={`project-status ${project.status.toLowerCase().replace(' ', '-')}`}>
                        {project.status}
                      </span>
                    </div>

                    <p className="project-description">{project.description}</p>

                    <div className="project-tech">
                      {project.tech.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="tech-tag">{tech}</span>
                      ))}
                    </div>

                    <div className="project-footer">
                      <span className="project-category">{project.category}</span>
                      <span className="project-date">{project.date}</span>
                    </div>
                  </div>

                  <div className="project-glow"></div>
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
