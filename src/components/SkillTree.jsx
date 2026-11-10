import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { skillTree } from '../data/skills';
import { projects } from '../data/projects';
import { profile } from '../data/profile';
import './SkillTree.css';

// Character sheet: ability scores pick a class, the class shows its talent tree,
// and the selected talent shows its rank, description, and the projects it was earned in.

const MAX_RANK = 5;
const RANK_TITLES = ['Initiate', 'Adept', 'Veteran', 'Expert', 'Master'];
const ROMAN = ['I', 'II', 'III', 'IV', 'V'];

const projectById = Object.fromEntries(projects.map((p) => [p.id, p]));

// Score works like a tabletop ability score: 10 is average, each rank above 3 per skill adds one.
const classScore = (cls) => 10 + cls.skills.reduce((sum, s) => sum + s.level, 0) - cls.skills.length * 3;
const modifier = (score) => {
  const m = Math.floor((score - 10) / 2);
  return m >= 0 ? `+${m}` : `${m}`;
};

// Original line-art emblems, one per class.
function Sigil({ id }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (id) {
    case 'ai-builder':
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path {...common} d="M24 4l17 10v20L24 44 7 34V14z" />
          <circle {...common} cx="24" cy="24" r="6" />
          <path {...common} d="M24 10v8M24 30v8M12 17l7 4M29 27l7 4M36 17l-7 4M19 27l-7 4" />
        </svg>
      );
    case 'data-migration':
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <ellipse {...common} cx="24" cy="11" rx="14" ry="5" />
          <path {...common} d="M10 11v26c0 2.8 6.3 5 14 5s14-2.2 14-5V11" />
          <path {...common} d="M10 20c0 2.8 6.3 5 14 5s14-2.2 14-5M10 29c0 2.8 6.3 5 14 5s14-2.2 14-5" />
        </svg>
      );
    case 'frontend-dev':
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path {...common} d="M16 14L6 24l10 10M32 14l10 10-10 10M27 9l-6 30" />
        </svg>
      );
    case 'project-strategist':
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <circle {...common} cx="24" cy="24" r="18" />
          <path {...common} d="M24 6v5M24 37v5M6 24h5M37 24h5" />
          <path {...common} d="M30 18l-4 10-8 2 4-10z" />
        </svg>
      );
    case 'ux-designer':
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path {...common} d="M24 5l12 14-12 24L12 19z" />
          <path {...common} d="M24 5v17M12 19h24" />
          <circle {...common} cx="24" cy="25" r="3" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <circle {...common} cx="24" cy="24" r="16" />
        </svg>
      );
  }
}

function RankBar({ level, color, size = 'sm', animateKey }) {
  return (
    <div className={`cs-rankbar cs-rankbar--${size}`} style={{ '--c': color }} aria-hidden="true">
      {Array.from({ length: MAX_RANK }, (_, i) => (
        <span
          key={`${animateKey}-${i}`}
          className={`cs-pip ${i < level ? 'is-on' : ''}`}
          style={{ animationDelay: `${i * 70}ms` }}
        />
      ))}
    </div>
  );
}

export default function SkillTree() {
  const classes = skillTree;
  const [classId, setClassId] = useState(classes[0].id);
  const cls = classes.find((c) => c.id === classId) || classes[0];
  const [talentName, setTalentName] = useState(cls.skills[0].name);
  const talent = cls.skills.find((s) => s.name === talentName) || cls.skills[0];

  useEffect(() => {
    setTalentName(cls.skills[0].name);
  }, [cls]);

  const { spent, max, level } = useMemo(() => {
    const all = classes.flatMap((c) => c.skills);
    const s = all.reduce((sum, k) => sum + k.level, 0);
    return { spent: s, max: all.length * MAX_RANK, level: Math.floor(s / MAX_RANK) };
  }, [classes]);

  const title = profile.experience?.[0]?.title || profile.roles?.[0] || '';
  const quests = (talent.quests || []).map((id) => projectById[id]).filter(Boolean);

  const onTabKey = (e, idx) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (idx + (e.key === 'ArrowRight' ? 1 : -1) + classes.length) % classes.length;
    setClassId(classes[next].id);
    document.getElementById(`cs-tab-${classes[next].id}`)?.focus();
  };

  return (
    <section id="skills" className="cs">
      <div className="container">
        <motion.h2
          className="cs-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Character Sheet
        </motion.h2>

        <motion.div
          className="cs-frame"
          style={{ '--c': cls.color }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <span className="cs-corner cs-corner--tl" aria-hidden="true" />
          <span className="cs-corner cs-corner--tr" aria-hidden="true" />
          <span className="cs-corner cs-corner--bl" aria-hidden="true" />
          <span className="cs-corner cs-corner--br" aria-hidden="true" />

          {/* Identity and experience */}
          <header className="cs-hero">
            <div className="cs-crest" aria-hidden="true">
              <span>GC</span>
            </div>
            <div className="cs-id">
              <div className="cs-eyebrow">
                Level {level} <span className="cs-dot">◆</span> {title}
              </div>
              <div className="cs-name">{profile.name}</div>
              <div
                className="cs-xp"
                role="progressbar"
                aria-label="Skill ranks earned"
                aria-valuenow={spent}
                aria-valuemin={0}
                aria-valuemax={max}
              >
                <motion.span
                  className="cs-xp-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(spent / max) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                />
              </div>
              <div className="cs-xp-label">
                <span>{spent} / {max} ranks</span>
                <span>{max - spent} to max</span>
              </div>
            </div>
          </header>

          {/* Ability scores double as class selectors */}
          <div className="cs-abilities" role="tablist" aria-label="Skill classes">
            {classes.map((c, idx) => {
              const score = classScore(c);
              const active = c.id === cls.id;
              return (
                <button
                  key={c.id}
                  id={`cs-tab-${c.id}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="cs-panel"
                  tabIndex={active ? 0 : -1}
                  className={`cs-ability ${active ? 'is-active' : ''}`}
                  style={{ '--c': c.color }}
                  onClick={() => setClassId(c.id)}
                  onKeyDown={(e) => onTabKey(e, idx)}
                >
                  <span className="cs-ability-abbr">{c.abbr}</span>
                  <span className="cs-ability-score">{score}</span>
                  <span className="cs-ability-mod">{modifier(score)}</span>
                  <span className="cs-ability-name">{c.class}</span>
                </button>
              );
            })}
          </div>

          <div className="cs-body" id="cs-panel" role="tabpanel" aria-labelledby={`cs-tab-${cls.id}`}>
            {/* Talent tree */}
            <div className="cs-tree">
              <div className="cs-tree-head">
                <span className="cs-sigil">
                  <Sigil id={cls.id} />
                </span>
                <div>
                  <div className="cs-tree-kicker">Talent tree</div>
                  <h3 className="cs-tree-title">{cls.class}</h3>
                </div>
              </div>

              <ol className="cs-talents">
                {cls.skills.map((s, i) => {
                  const selected = s.name === talent.name;
                  return (
                    <li key={`${cls.id}-${s.name}`}>
                      <motion.button
                        type="button"
                        className={`cs-talent ${selected ? 'is-selected' : ''}`}
                        onClick={() => setTalentName(s.name)}
                        aria-pressed={selected}
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                      >
                        <span className="cs-node" aria-hidden="true">
                          <span>{ROMAN[s.level - 1]}</span>
                        </span>
                        <span className="cs-talent-main">
                          <span className="cs-talent-name">{s.name}</span>
                          <span className="cs-talent-rank">{RANK_TITLES[s.level - 1]}</span>
                        </span>
                        <RankBar level={s.level} color={cls.color} animateKey={cls.id} />
                      </motion.button>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Talent detail */}
              <motion.aside
                key={`${cls.id}-${talent.name}`}
                className="cs-detail"
                aria-live="polite"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
              >
                <div className="cs-detail-kicker">{cls.class}</div>
                <h4 className="cs-detail-name">{talent.name}</h4>
                <div className="cs-detail-rank">
                  Rank {ROMAN[talent.level - 1]} <span className="cs-dot">◆</span> {RANK_TITLES[talent.level - 1]}
                </div>
                <RankBar level={talent.level} color={cls.color} size="lg" animateKey={`${cls.id}-${talent.name}`} />
                <p className="cs-detail-desc">{talent.description}</p>

                <div className="cs-quests">
                  <div className="cs-quests-label">Earned in</div>
                  {quests.length ? (
                    <ul>
                      {quests.map((p) => (
                        <li key={p.id}>
                          <Link to={p.route} className="cs-quest">
                            <span className="cs-quest-mark" aria-hidden="true">✦</span>
                            {p.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="cs-quests-none">Used in day-to-day work. Not featured in a portfolio project yet.</p>
                  )}
                </div>
              </motion.aside>
          </div>
        </motion.div>

        <p className="cs-hint">Pick an ability to open its talent tree. Pick a talent to see where it was earned.</p>
      </div>
    </section>
  );
}
