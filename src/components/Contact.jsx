import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from 'react-icons/fa';
import './Contact.css';

// ✅ If your filename has spaces, rename it like below.
// Put it at: src/assets/Gabriel-Colon-2026-Resume.pdf
import resumePdf from '../assets/Gabriel Colon 2026 Resume.pdf';

const EMAIL = 'ghawk075@gmail.com';

// ✅ Recommended: Formspree (works on any static host)
// Create a form on Formspree and paste your endpoint here:
// https://formspree.io/f/XXXXYYYY
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/XXXXYYYY'; // <-- replace

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    // Fallback (older browsers)
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleEmailCopy = async () => {
    const ok = await copyText(EMAIL);
    setStatus({
      type: ok ? 'success' : 'error',
      message: ok ? `Copied: ${EMAIL}` : 'Could not copy email (your browser said “no”).',
    });
    setTimeout(() => setStatus({ type: '', message: '' }), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If you haven’t set up Formspree yet, don’t silently “pretend”:
    if (FORMSPREE_ENDPOINT.includes('XXXX')) {
      setStatus({
        type: 'error',
        message: 'Form not configured yet. Add your Formspree endpoint in Contact.jsx.',
      });
      return;
    }

    setIsSending(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Bad response');

      setStatus({ type: 'success', message: 'Message sent! I’ll get back to you soon.' });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({
        type: 'error',
        message: 'Failed to send. Please try again or copy my email and message me directly.',
      });
    } finally {
      setIsSending(false);
      setTimeout(() => setStatus({ type: '', message: '' }), 3500);
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FaGithub />,
      url: 'https://github.com/gcolon75',
      color: 'var(--light-gray)',
      type: 'link',
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      url: 'https://www.linkedin.com/in/gabriel-colon-3b4487253/',
      color: '#0077b5',
      type: 'link',
    },
    {
      name: 'Email (Copy)',
      icon: <FaEnvelope />,
      onClick: handleEmailCopy,
      color: 'var(--rocket-red)',
      type: 'button',
    },
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

                  <button type="submit" className="submit-button" disabled={isSending}>
                    <span className="button-text">
                      {isSending ? 'TRANSMITTING…' : 'TRANSMIT MESSAGE'}
                    </span>
                    <span className="button-arrow">→</span>
                  </button>

                  {status.message && (
                    <motion.div
                      className={`status-message ${status.type}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <span className="status-icon">{status.type === 'success' ? '✓' : '!'}</span>
                      {status.message}
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
                Let’s build something cool. Or at least something that doesn’t 404.
              </p>

              <div className="social-links">
                {socialLinks.map((link) =>
                  link.type === 'link' ? (
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
                  ) : (
                    <motion.button
                      key={link.name}
                      type="button"
                      onClick={link.onClick}
                      className="social-link"
                      style={{ '--link-color': link.color }}
                      whileHover={{ scale: 1.1, x: 10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="social-icon">{link.icon}</span>
                      <span className="social-name">{link.name}</span>
                    </motion.button>
                  )
                )}
              </div>

              {/* Resume button */}
              <motion.a
                className="resume-download"
                href={resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaFileDownload />
                <span>Open Resume</span>
              </motion.a>

              {/* Contact details (includes resume + email copy) */}
              <div className="contact-details">
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
}
