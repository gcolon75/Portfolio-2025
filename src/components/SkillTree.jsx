import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillTree } from '../data/skills';
import './SkillTree.css';

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

export default function SkillTree() {
  const [activeClassId, setActiveClassId] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [canvasSize, setCanvasSize] = useState(900);

  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;
    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      const size = Math.floor(Math.min(rect.width, rect.height));
      setCanvasSize(clamp(size, 680, 1150));
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setSelectedSkill(null);
        setActiveClassId(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const half = canvasSize / 2;

  // ✅ Larger center + larger subskills (per your request)
  const CENTER_SIZE = clamp(Math.round(canvasSize * 0.215), 175, 255);
  const CLASS_SIZE = clamp(Math.round(canvasSize * 0.20), 155, 195);
  const SKILL_SIZE = clamp(Math.round(canvasSize * 0.152), 106, 140);

  const CLASS_HALF = CLASS_SIZE / 2;
  const SKILL_HALF = SKILL_SIZE / 2;

  // --------------------------------------------
  // ✅ NEW: enforce "skills never touch category"
  // and auto-adjust radii if canvas is tight.
  // --------------------------------------------
  const maxOuterRadius = half - SKILL_HALF - 22;

  // minimum center-to-center distance so circles don't touch:
  // parent radius + child radius + padding
  const PARENT_CLEARANCE = CLASS_HALF + SKILL_HALF + 28;

  // Base main ring radius
  const classRadiusBase = clamp(half * 0.50, 220, half * 0.60);

  // If we’re cramped, pull the class ring inward so subskills can sit farther out
  const classRadius = clamp(
    Math.min(classRadiusBase, maxOuterRadius - PARENT_CLEARANCE),
    170,
    classRadiusBase
  );

  // Base subskill gap (how far beyond the class ring we want)
  const outerRingGapBase = clamp(canvasSize * 0.24, 210, 300);

  // Ensure gap is always at least clearance (+ extra breathing room)
  const outerRingGap = Math.max(outerRingGapBase, PARENT_CLEARANCE + 18);

  // Final outer radius (never off-canvas)
  const outerRadius = Math.min(maxOuterRadius, classRadius + outerRingGap);

  const rootStyle = useMemo(
    () => ({
      '--canvas': `${canvasSize}px`,
      '--center-size': `${CENTER_SIZE}px`,
      '--class-size': `${CLASS_SIZE}px`,
      '--skill-size': `${SKILL_SIZE}px`,
    }),
    [canvasSize, CENTER_SIZE, CLASS_SIZE, SKILL_SIZE]
  );

  const classes = useMemo(() => skillTree, []);

  const getClassPosition = (index, total) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    return { angle, x: Math.cos(angle) * classRadius, y: Math.sin(angle) * classRadius };
  };

  const getArcSpread = (count) => {
    if (count <= 1) return 0;

    // Chord-based spacing so bubbles don't collide (between skills)
    const minSpacing = SKILL_SIZE + 25;
    const safe = clamp(minSpacing / (2 * outerRadius), 0.06, 0.45);
    const step = 2 * Math.asin(safe);
    const spread = step * (count - 1);

    return clamp(spread, 1.1, 1.8);
  };

  // ------------------------------------------------------------
  // ✅ "Centered + consistent" arc solver
  // ------------------------------------------------------------
  const arcPenalty = (centerAngle, count) => {
    const spread = getArcSpread(count);
    const margin = SKILL_HALF + 16;

    const minX = -half + margin;
    const maxX = half - margin;
    const minY = -half + margin;
    const maxY = half - margin;

    let penalty = 0;

    for (let i = 0; i < count; i++) {
      const t = count === 1 ? 0.5 : i / (count - 1);
      const a = centerAngle - spread / 2 + t * spread;
      const x = Math.cos(a) * outerRadius;
      const y = Math.sin(a) * outerRadius;

      const dx = x < minX ? minX - x : x > maxX ? x - maxX : 0;
      const dy = y < minY ? minY - y : y > maxY ? y - maxY : 0;

      penalty += dx * dx + dy * dy;
    }

    return penalty;
  };

  const getArcCenterAngleForClass = (classPos, count) => {
    const base = classPos.angle;
    if (count <= 1) return base;

    const step = Math.PI / 36; // 5 degrees
    const max = Math.PI / 2; // up to 90 degrees

    let bestAngle = base;
    let bestPenalty = arcPenalty(base, count);

    if (bestPenalty === 0) return base;

    for (let d = step; d <= max; d += step) {
      const a1 = base + d;
      const a2 = base - d;

      const p1 = arcPenalty(a1, count);
      if (p1 < bestPenalty) {
        bestPenalty = p1;
        bestAngle = a1;
        if (bestPenalty === 0) break;
      }

      const p2 = arcPenalty(a2, count);
      if (p2 < bestPenalty) {
        bestPenalty = p2;
        bestAngle = a2;
        if (bestPenalty === 0) break;
      }
    }

    return bestAngle;
  };

  const getSkillAbsolutePosition = (skillIndex, totalSkills, arcCenterAngle) => {
    if (totalSkills <= 1) {
      return { x: Math.cos(arcCenterAngle) * outerRadius, y: Math.sin(arcCenterAngle) * outerRadius };
    }

    const spread = getArcSpread(totalSkills);
    const t = skillIndex / (totalSkills - 1);
    const angle = arcCenterAngle - spread / 2 + t * spread;

    return { x: Math.cos(angle) * outerRadius, y: Math.sin(angle) * outerRadius };
  };

  const getFittedLabelStyle = (label) => {
    const text = (label || '').toString();
    const len = text.length;

    let fontSize = 0.78;
    let letterSpacing = 0.9;

    if (len >= 11) {
      fontSize = 0.72;
      letterSpacing = 0.55;
    }
    if (len >= 13) {
      fontSize = 0.68;
      letterSpacing = 0.45;
    }
    if (len >= 15) {
      fontSize = 0.64;
      letterSpacing = 0.35;
    }

    return {
      fontSize: `${fontSize}rem`,
      letterSpacing: `${letterSpacing}px`,
    };
  };

  const activeClass = activeClassId ? classes.find((c) => c.id === activeClassId) : null;
  const hudColor = selectedSkill?.classColor || activeClass?.color || '#4a9eff';

  const onClassClick = (cls) => {
    const next = activeClassId === cls.id ? null : cls.id;
    setActiveClassId(next);
    setSelectedSkill(null);
  };

  const onSkillClick = (skill, cls) => {
    setSelectedSkill({
      ...skill,
      classId: cls.id,
      className: cls.class,
      classIcon: cls.icon,
      classColor: cls.color,
    });
  };

  return (
    <section id="skills" className="skill-tree">
      <div className="container">
        <motion.h2
          className="skill-tree-title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          RPG Skill Tree
        </motion.h2>

        <div className="skill-tree-radial" ref={containerRef} style={rootStyle}>
          <svg
            className="connection-lines"
            viewBox={`${-half} ${-half} ${canvasSize} ${canvasSize}`}
            aria-hidden="true"
          >
            <defs>
              <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="2.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {classes.map((cls, i) => {
                const j = (i + 1) % classes.length;
                const p1 = getClassPosition(i, classes.length);
                const p2 = getClassPosition(j, classes.length);
                return (
                  <linearGradient
                    key={`seg-grad-${i}`}
                    id={`seg-grad-${i}`}
                    gradientUnits="userSpaceOnUse"
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                  >
                    <stop offset="0%" stopColor={cls.color} stopOpacity="0.55" />
                    <stop offset="100%" stopColor={classes[j].color} stopOpacity="0.55" />
                  </linearGradient>
                );
              })}
            </defs>

            {classes.map((_, i) => {
              const j = (i + 1) % classes.length;
              const p1 = getClassPosition(i, classes.length);
              const p2 = getClassPosition(j, classes.length);
              return (
                <line
                  key={`ring-${i}`}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke={`url(#seg-grad-${i})`}
                  strokeWidth="2"
                  strokeDasharray="6 7"
                  opacity="0.55"
                  filter="url(#glow)"
                />
              );
            })}

            {classes.map((cls, i) => {
              const p = getClassPosition(i, classes.length);
              return (
                <line
                  key={`ray-${cls.id}`}
                  x1={0}
                  y1={0}
                  x2={p.x}
                  y2={p.y}
                  stroke={cls.color}
                  strokeWidth="2"
                  strokeDasharray="3 10"
                  opacity="0.18"
                  filter="url(#glow)"
                />
              );
            })}

            {activeClass &&
              (() => {
                const classIndex = classes.findIndex((c) => c.id === activeClass.id);
                const classPos = getClassPosition(classIndex, classes.length);
                const arcCenter = getArcCenterAngleForClass(classPos, activeClass.skills.length);

                return activeClass.skills.map((_, si) => {
                  const sp = getSkillAbsolutePosition(si, activeClass.skills.length, arcCenter);
                  return (
                    <line
                      key={`skill-link-${activeClass.id}-${si}`}
                      x1={classPos.x}
                      y1={classPos.y}
                      x2={sp.x}
                      y2={sp.y}
                      stroke={activeClass.color}
                      strokeWidth="2"
                      strokeDasharray="5 7"
                      opacity="0.35"
                      filter="url(#glow)"
                    />
                  );
                });
              })()}
          </svg>

          {/* Center HUD */}
          <motion.button
            type="button"
            className={`center-circle ${selectedSkill ? 'is-active' : ''}`}
            style={{ '--hud-color': hudColor }}
            onClick={() => {
              if (selectedSkill) setSelectedSkill(null);
              else if (activeClassId) setActiveClassId(null);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {!selectedSkill ? (
              <div className="center-content">
                <div className="center-icon">⚡</div>
                <div className="center-text">SKILLS</div>
                <div className="center-subtext">
                  {activeClassId ? 'Click to collapse' : 'Click a class to expand'}
                </div>
              </div>
            ) : (
              <div className="hud-content">
                <div className="hud-topline">
                  <span className="hud-class">{selectedSkill.className}</span>
                  <span className="hud-chip" style={{ borderColor: hudColor }}>
                    {selectedSkill.classIcon} {selectedSkill.name}
                  </span>
                </div>
                <div className="hud-body">{selectedSkill.description}</div>
                <div className="hud-hint">ESC to reset</div>
              </div>
            )}
          </motion.button>

          {/* Class nodes */}
          {classes.map((cls, idx) => {
            const pos = getClassPosition(idx, classes.length);
            const isActive = activeClassId === cls.id;

            return (
              <motion.button
                key={cls.id}
                type="button"
                className={`class-node ${isActive ? 'active' : ''}`}
                style={{
                  '--class-color': cls.color,
                  left: '50%',
                  top: '50%',
                  marginLeft: -CLASS_HALF,
                  marginTop: -CLASS_HALF,
                  x: pos.x,
                  y: pos.y,
                }}
                onClick={() => onClassClick(cls)}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 120, damping: 14 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="class-node-content">
                  <div className="class-icon" aria-hidden="true">
                    {cls.icon}
                  </div>
                  <div className="class-name">{cls.class}</div>
                </div>
              </motion.button>
            );
          })}

          {/* Skill nodes */}
          <AnimatePresence>
            {activeClass &&
              (() => {
                const classIndex = classes.findIndex((c) => c.id === activeClass.id);
                const classPos = getClassPosition(classIndex, classes.length);
                const arcCenter = getArcCenterAngleForClass(classPos, activeClass.skills.length);

                return (
                  <motion.div
                    key={`skills-${activeClass.id}`}
                    className="skill-node-layer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {activeClass.skills.map((skill, si) => {
                      const sp = getSkillAbsolutePosition(si, activeClass.skills.length, arcCenter);
                      const isSelected =
                        selectedSkill?.name === skill.name && selectedSkill?.classId === activeClass.id;

                      return (
                        <motion.button
                          key={`${activeClass.id}-${skill.name}-${si}`}
                          type="button"
                          className={`skill-node ${isSelected ? 'selected' : ''}`}
                          style={{
                            '--skill-color': activeClass.color,
                            left: '50%',
                            top: '50%',
                            marginLeft: -SKILL_HALF,
                            marginTop: -SKILL_HALF,
                            x: sp.x,
                            y: sp.y,
                          }}
                          onClick={() => onSkillClick(skill, activeClass)}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.35, type: 'spring', stiffness: 140, damping: 16 }}
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.98 }}
                          title={skill.description}
                          aria-label={`${skill.name}: ${skill.description}`}
                        >
                          <div className="skill-node-name" style={getFittedLabelStyle(skill.name)}>
                            {skill.name}
                          </div>
                        </motion.button>
                      );
                    })}
                  </motion.div>
                );
              })()}
          </AnimatePresence>
        </div>

        <div className="skill-tree-helper">
          Tip: Click a class to expand. Click a skill to load details into the center HUD. Press ESC to reset.
        </div>
      </div>
    </section>
  );
}
