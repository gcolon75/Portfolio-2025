import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillTree } from '../data/skills';
import './SkillTree.css';

const SkillTree = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);

  const renderStars = (level) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < level ? 'filled' : ''}`}>★</span>
    ));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const classVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="skills" className="skill-tree">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          RPG Skill Tree
        </motion.h2>

        <motion.div
          className="skill-tree-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skillTree.map((skillClass, classIndex) => (
            <motion.div
              key={skillClass.id}
              className="skill-class"
              variants={classVariants}
              style={{ '--class-color': skillClass.color }}
            >
              <div className="class-header">
                <span className="class-icon">{skillClass.icon}</span>
                <h3 className="class-name">{skillClass.class}</h3>
              </div>

              <div className="skills-container">
                {skillClass.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={`${skillClass.id}-${skillIndex}`}
                    className="skill-item"
                    onClick={() => setSelectedSkill(skill)}
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="skill-name-container">
                      <span className="skill-name">{skill.name}</span>
                      <div className="skill-stars">
                        {renderStars(skill.level)}
                      </div>
                    </div>
                    
                    {skillIndex < skillClass.skills.length - 1 && (
                      <svg className="skill-connector" width="2" height="30">
                        <line 
                          x1="1" 
                          y1="0" 
                          x2="1" 
                          y2="30" 
                          stroke={skillClass.color} 
                          strokeWidth="2"
                          strokeDasharray="4,4"
                        >
                          <animate
                            attributeName="stroke-dashoffset"
                            from="0"
                            to="8"
                            dur="1s"
                            repeatCount="indefinite"
                          />
                        </line>
                      </svg>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Connecting lines between classes */}
              {classIndex < skillTree.length - 1 && (
                <svg className="class-connector" width="100%" height="50">
                  <line 
                    x1="50%" 
                    y1="0" 
                    x2="50%" 
                    y2="50" 
                    stroke="var(--plasma-green)" 
                    strokeWidth="2"
                    strokeDasharray="4,4"
                    opacity="0.3"
                  />
                </svg>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Skill Detail Modal */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              className="skill-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSkill(null)}
            >
              <motion.div
                className="skill-modal"
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="modal-close"
                  onClick={() => setSelectedSkill(null)}
                  aria-label="Close modal"
                >
                  ×
                </button>
                <h3>{selectedSkill.name}</h3>
                <div className="modal-stars">
                  {renderStars(selectedSkill.level)}
                </div>
                <p>{selectedSkill.description}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SkillTree;
