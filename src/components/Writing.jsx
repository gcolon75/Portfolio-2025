import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { articles } from '../data/writing';
import './Writing.css';

const pad2 = (n) => String(n).padStart(2, '0');

export default function Writing() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="writing" className="writing">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Terminal //Writing
        </motion.h2>

        <motion.div
          className="terminal-window"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
        >
          <div className="terminal-header">
            <div className="terminal-buttons">
              <span className="terminal-button red" />
              <span className="terminal-button yellow" />
              <span className="terminal-button green" />
            </div>
            <div className="terminal-title">gabriel@portfolio:~/writings</div>
          </div>

          <div className="terminal-body">
            <div className="terminal-prompt">
              <span className="prompt-symbol">$</span>
              <span className="prompt-text">ls -la articles/</span>
            </div>

            <div className="articles-list">
              {articles.map((article, idx) => {
                const onClick = article.route ? () => navigate(article.route) : undefined;
                const isClickable = Boolean(article.route);

                return (
                  <motion.div
                    key={article.id}
                    className={`article-item ${isClickable ? 'clickable' : ''}`}
                    variants={itemVariants}
                    whileHover={isClickable ? { scale: 1.01 } : undefined}
                    whileTap={isClickable ? { scale: 0.99 } : undefined}
                    onClick={onClick}
                    role={isClickable ? 'button' : undefined}
                    tabIndex={isClickable ? 0 : undefined}
                    onKeyDown={(e) => {
                      if (!isClickable) return;
                      if (e.key === 'Enter' || e.key === ' ') onClick?.();
                    }}
                  >
                    <div className="article-header">
                      <span className="article-index">[{pad2(idx + 1)}]</span>
                      <span className="article-title">{article.title}</span>

                      <div className="article-right" aria-hidden="true">
                        <div className="article-thumb-wrap">
                          {article.thumbnail ? (
                            <img
                              src={encodeURI(article.thumbnail)}
                              alt=""
                              className="article-thumb"
                              loading="lazy"
                              onError={(e) => {
                                // If a thumbnail is missing, keep layout but hide the broken img icon.
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="article-thumb-placeholder">📝</div>
                          )}
                        </div>
                        <span className="article-arrow">→</span>
                      </div>
                    </div>

                    <div className="article-meta">
                      <span className="article-category">{article.category}</span>
                      <span className="article-divider">|</span>
                      <span className="article-date">{article.date}</span>
                      <span className="article-divider">|</span>
                      <span className="article-read-time">{article.readTime}</span>
                    </div>

                    <p className="article-description">{article.description}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="terminal-cursor">
              <span className="prompt-symbol">$</span>
              <span className="cursor-blink">_</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
