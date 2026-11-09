import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';
import { askVI, viMode } from '../vi/viClient';
import { SUGGESTED_QUESTIONS, VI_LONG_NAME, VI_NAME } from '../vi/knowledge';
import './VIChat.css';

const GREETING = {
  role: 'assistant',
  content: `${VI_NAME} online. I'm Gabriel's virtual intelligence. Ask me about his work, skills, projects, or how to hire him.`
};

const VIChat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState(viMode);
  const logRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages, busy]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const send = async (text) => {
    const question = text.trim();
    if (!question || busy) return;
    const next = [...messages, { role: 'user', content: question }];
    setMessages(next);
    setInput('');
    setBusy(true);
    // The greeting is UI only, so it is not sent as conversation history.
    const reply = await askVI(next.slice(1));
    setMode(reply.mode);
    setMessages((m) => [...m, { role: 'assistant', content: reply.text }]);
    setBusy(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    send(input);
  };

  const showSuggestions = messages.length === 1 && !busy;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.section
            className="vi-panel"
            role="dialog"
            aria-label={`${VI_NAME}, ${VI_LONG_NAME}`}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            <header className="vi-header">
              <div className="vi-avatar" aria-hidden="true">
                <span className="vi-avatar-core" />
              </div>
              <div className="vi-title">
                <strong>{VI_NAME}</strong>
                <span className="vi-subtitle">
                  <span className={`vi-status-dot ${mode}`} aria-hidden="true" />
                  {mode === 'online' ? 'VI online' : 'VI local mode'}
                </span>
              </div>
              <button className="vi-close" onClick={() => setOpen(false)} aria-label="Close VI chat">
                <FaTimes />
              </button>
            </header>

            <div className="vi-log" ref={logRef} aria-live="polite">
              {messages.map((m, i) => (
                <div key={i} className={`vi-msg ${m.role}`}>
                  {m.content}
                </div>
              ))}
              {busy && (
                <div className="vi-msg assistant vi-typing" aria-label="VI is responding">
                  <span />
                  <span />
                  <span />
                </div>
              )}
              {showSuggestions && (
                <div className="vi-suggestions">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button key={q} className="vi-chip" onClick={() => send(q)}>
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form className="vi-input-row" onSubmit={onSubmit}>
              <label htmlFor="vi-input" className="sr-only">
                Ask the VI a question
              </label>
              <input
                id="vi-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Gabriel..."
                maxLength={500}
                autoComplete="off"
              />
              <button type="submit" disabled={busy || !input.trim()} aria-label="Send">
                <FaPaperPlane />
              </button>
            </form>
            <p className="vi-disclaimer">A VI, not Gabriel. For anything important, email him.</p>
          </motion.section>
        )}
      </AnimatePresence>

      {!open && (
        <motion.button
          className="vi-launcher"
          onClick={() => setOpen(true)}
          aria-label={`Open ${VI_NAME}, Gabriel's virtual intelligence`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="vi-launcher-orb" aria-hidden="true" />
          <span className="vi-launcher-label">Ask my VI</span>
        </motion.button>
      )}
    </>
  );
};

export default VIChat;
