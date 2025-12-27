import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const SUCCESS_MESSAGE = 'Message sent successfully! (Demo mode - not actually sent)';

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(SUCCESS_MESSAGE);
    setTimeout(() => {
      setStatus('');
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FaGithub />,
      url: 'https://github.com/gcolon75',
      color: 'var(--light-gray)'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      url: 'https://www.linkedin.com/in/gabriel-colon',
      color: '#0077b5'
    },
    {
      name: 'Email',
      icon: <FaEnvelope />,
      url: 'mailto:ghawk075@gmail.com',
      color: 'var(--rocket-red)'
    }
  ];

  return (
    <section id="contact" className="contact">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Contact Terminal
        </motion.h2>

        <div className="contact-grid">
          <motion.div
            className="contact-form-container"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="terminal-form">
              <div className="terminal-header">
                <div className="terminal-buttons">
                  <span className="terminal-button red"></span>
                  <span className="terminal-button yellow"></span>
                  <span className="terminal-button green"></span>
                </div>
                <div className="terminal-title">message_transmission.sh</div>
              </div>

              <div className="terminal-body">
                <div className="terminal-prompt">
                  <span className="prompt-symbol">$</span>
                  <span className="prompt-text">./send_message.sh</span>
                </div>

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">
                      <span className="label-symbol">&gt;</span> NAME:
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your name..."
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      <span className="label-symbol">&gt;</span> EMAIL:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">
                      <span className="label-symbol">&gt;</span> MESSAGE:
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      placeholder="Type your message here..."
                    />
                  </div>

                  <button type="submit" className="submit-button">
                    <span className="button-text">TRANSMIT MESSAGE</span>
                    <span className="button-arrow">→</span>
                  </button>

                  {status && (
                    <motion.div
                      className="status-message"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <span className="status-icon">✓</span> {status}
                    </motion.div>
                  )}
                </form>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="info-card">
              <h3>Connect With Me</h3>
              <p className="info-description">
                Let's collaborate on exciting projects! Reach out through any of these channels.
              </p>

              <div className="social-links">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    style={{ '--link-color': link.color }}
                    whileHover={{ scale: 1.1, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="social-icon">{link.icon}</span>
                    <span className="social-name">{link.name}</span>
                  </motion.a>
                ))}
              </div>

              <motion.button
                className="resume-download"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = `${process.env.PUBLIC_URL}/resume.pdf`;
                  link.target = '_blank';
                  link.rel = 'noopener noreferrer';
                  link.click();
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaFileDownload />
                <span>Download Resume</span>
              </motion.button>

              <div className="contact-details">
                <div className="detail-item">
                  <span className="detail-label">Email:</span>
                  <a href="mailto:ghawk075@gmail.com">ghawk075@gmail.com</a>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Phone:</span>
                  <a href="tel:+18477781274">(847) 778-1274</a>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Location:</span>
                  <span>San Diego, CA</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
