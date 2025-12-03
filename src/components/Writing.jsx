import React from 'react';
import { motion } from 'framer-motion';
import { articles } from '../data/writing';
import './Writing.css';

const Writing = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
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
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="terminal-header">
            <div className="terminal-buttons">
              <span className="terminal-button red"></span>
              <span className="terminal-button yellow"></span>
              <span className="terminal-button green"></span>
            </div>
            <div className="terminal-title">gabriel@portfolio:~/writings</div>
          </div>

          <div className="terminal-body">
            <div className="terminal-prompt">
              <span className="prompt-symbol">$</span>
              <span className="prompt-text">ls -la articles/</span>
            </div>

            <motion.div
              className="articles-list"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {articles.map((article, index) => (
                <motion.div
                  key={article.id}
                  className="article-item"
                  variants={itemVariants}
                  whileHover={{ x: 10, backgroundColor: 'rgba(0, 255, 136, 0.05)' }}
                >
                  <div className="article-header">
                    <span className="article-index">[{String(index + 1).padStart(2, '0')}]</span>
                    <span className="article-title">{article.title}</span>
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
              ))}
            </motion.div>

            <div className="terminal-cursor">
              <span className="prompt-symbol">$</span>
              <span className="cursor-blink">_</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Writing;
