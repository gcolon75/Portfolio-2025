import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Writing from './components/Writing';
import SkillTree from './components/SkillTree';
import Contact from './components/Contact';
import './index.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Writing />
        <SkillTree />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Gabriel Colon. Built with React & Framer Motion.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
