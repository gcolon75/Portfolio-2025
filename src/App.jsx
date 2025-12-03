import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Writing from './components/Writing';
import SkillTree from './components/SkillTree';
import Contact from './components/Contact';
import AIGenZPage from './components/AIGenZPage';
import './index.css';

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Writing />
      <SkillTree />
      <Contact />
    </>
  );
}

function App() {
  return (
    <Router basename="/Portfolio-2025">
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/writing/ai-and-gen-z" element={<AIGenZPage />} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="container">
            <p>&copy; 2025 Gabriel Colon. Built with React & Framer Motion.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
