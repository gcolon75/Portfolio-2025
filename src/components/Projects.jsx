import React from 'react';
import { motion } from 'framer-motion';
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
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
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
                  <h3>{project.name}</h3>
                  <span className={`project-status ${project.status.toLowerCase().replace(' ', '-')}`}>
                    {project.status}
                  </span>
                </div>

                <p className="project-description">{project.description}</p>

                <div className="project-tech">
                  {project.tech.map((tech, idx) => (
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
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
