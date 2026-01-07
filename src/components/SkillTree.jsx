import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillTree } from '../data/skills';
import './SkillTree.css';

// Layout constants for radial skill tree (as ratios of canvas size)
const CLASS_NODE_RADIUS_RATIO = 0.35; // Distance from center for class nodes (35% of canvas half-size)
const SKILL_BASE_DISTANCE_RATIO = 0.225; // Distance from class node for skills (22.5% of canvas half-size)
const SKILL_SPREAD_ANGLE = Math.PI / 4; // 45 degrees spread for skills
const DEFAULT_CANVAS_SIZE = 800; // Default canvas size before measurement

const SkillTree = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [canvasSize, setCanvasSize] = useState(DEFAULT_CANVAS_SIZE);
  const containerRef = useRef(null);

  // Measure container size and update canvas size
  useEffect(() => {
    let resizeTimeout;
    
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setCanvasSize(rect.width);
      }
    };

    const debouncedUpdateSize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateSize, 100);
    };

    updateSize();
    window.addEventListener('resize', debouncedUpdateSize);
    return () => {
      window.removeEventListener('resize', debouncedUpdateSize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedSkill) {
        setSelectedSkill(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [selectedSkill]);

  const renderStars = (level) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < level ? 'filled' : ''}`}>★</span>
    ));
  };

  // Calculate positions for radial layout based on canvas size
  const halfSize = canvasSize / 2;
  const CLASS_NODE_RADIUS = halfSize * CLASS_NODE_RADIUS_RATIO;
  const SKILL_BASE_DISTANCE = halfSize * SKILL_BASE_DISTANCE_RATIO;

  const getClassPosition = (index, total) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2; // Start from top
    const x = Math.cos(angle) * CLASS_NODE_RADIUS;
    const y = Math.sin(angle) * CLASS_NODE_RADIUS;
    return { x, y, angle };
  };

  const getSkillPosition = (skillIndex, totalSkills, classAngle) => {
    const angleOffset = ((skillIndex - (totalSkills - 1) / 2) * SKILL_SPREAD_ANGLE) / Math.max(totalSkills - 1, 1);
    const angle = classAngle + angleOffset;
    const x = Math.cos(angle) * SKILL_BASE_DISTANCE;
    const y = Math.sin(angle) * SKILL_BASE_DISTANCE;
    return { x, y };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const classVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.6,
        type: 'spring',
        stiffness: 100
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.4,
        type: 'spring'
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
          ref={containerRef}
          className="skill-tree-radial"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Connection lines between classes */}
          <svg className="connection-lines" viewBox={`${-halfSize} ${-halfSize} ${canvasSize} ${canvasSize}`}>
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {skillTree.map((_, index) => {
              const nextIndex = (index + 1) % skillTree.length;
              const pos1 = getClassPosition(index, skillTree.length);
              const pos2 = getClassPosition(nextIndex, skillTree.length);
              return (
                <line
                  key={`connection-${index}`}
                  x1={pos1.x}
                  y1={pos1.y}
                  x2={pos2.x}
                  y2={pos2.y}
                  stroke="var(--plasma-green)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  opacity="0.3"
                  filter="url(#glow)"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="10"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </line>
              );
            })}
          </svg>

          {/* Center circle */}
          <div className="center-circle">
            <div className="center-content">
              <span className="center-icon">⚡</span>
              <span className="center-text">Skills</span>
            </div>
          </div>

          {/* Class nodes and their skills */}
          {skillTree.map((skillClass, classIndex) => {
            const classPos = getClassPosition(classIndex, skillTree.length);
            
            return (
              <div key={skillClass.id} className="class-node-wrapper">
                {/* Class node */}
                <motion.div
                  className="class-node"
                  variants={classVariants}
                  style={{
                    '--class-color': skillClass.color,
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${classPos.x}px), calc(-50% + ${classPos.y}px))`
                  }}
                >
                  <div className="class-node-content">
                    <span className="class-icon">{skillClass.icon}</span>
                    <h3 className="class-name">{skillClass.class}</h3>
                  </div>
                </motion.div>

                {/* Skills radiating from class */}
                {skillClass.skills.map((skill, skillIndex) => {
                  const skillPos = getSkillPosition(skillIndex, skillClass.skills.length, classPos.angle);
                  const totalX = classPos.x + skillPos.x;
                  const totalY = classPos.y + skillPos.y;

                  return (
                    <React.Fragment key={`${skillClass.id}-skill-${skillIndex}`}>
                      {/* Connection line from class to skill */}
                      <svg 
                        className="skill-connection-line" 
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          pointerEvents: 'none',
                          overflow: 'visible',
                          width: '1px',
                          height: '1px'
                        }}
                      >
                        <line
                          x1={classPos.x}
                          y1={classPos.y}
                          x2={totalX}
                          y2={totalY}
                          stroke={skillClass.color}
                          strokeWidth="2"
                          strokeDasharray="3,3"
                          opacity="0.4"
                          filter="url(#glow)"
                        >
                          <animate
                            attributeName="stroke-dashoffset"
                            from="0"
                            to="6"
                            dur="1.5s"
                            repeatCount="indefinite"
                          />
                        </line>
                      </svg>

                      {/* Skill node */}
                      <motion.div
                        className="skill-node"
                        variants={skillVariants}
                        onClick={() => setSelectedSkill(skill)}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          '--skill-color': skillClass.color,
                          left: '50%',
                          top: '50%',
                          transform: `translate(calc(-50% + ${totalX}px), calc(-50% + ${totalY}px))`
                        }}
                      >
                        <div className="skill-node-name">{skill.name}</div>
                        <div className="skill-node-stars">
                          {renderStars(skill.level)}
                        </div>
                      </motion.div>
                    </React.Fragment>
                  );
                })}
              </div>
            );
          })}
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
