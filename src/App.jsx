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
import ChatGPTPromptPage from './components/ChatGPTPromptPage';
import HumanityInMediaPage from './components/HumanityInMediaPage';
import WhovaAnalysisPage from './components/WhovaAnalysisPage';
import TowerOfGreedPage from './components/TowerOfGreedPage';
import ValinePage from './components/ValinePage';
import AmadeusPage from './components/AmadeusPage';
import ThreeKingdomsPage from './components/ThreeKingdomsPage';
import AxlePage from './components/AxlePage';
import GoaleePage from './components/GoaleePage';
import TritonGoPlusPage from './components/TritonGoPlusPage';
import VolleyballPage from './components/VolleyballPage';
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
            {/* Writing Routes */}
            <Route path="/writing/ai-and-gen-z" element={<AIGenZPage />} />
            <Route path="/writing/chatgpt-prompt-case-study" element={<ChatGPTPromptPage />} />
            <Route path="/writing/humanity-in-media" element={<HumanityInMediaPage />} />
            <Route path="/writing/whova-competitive-analysis" element={<WhovaAnalysisPage />} />
            {/* Project Routes */}
            <Route path="/projects/tower-of-greed" element={<TowerOfGreedPage />} />
            <Route path="/projects/valine" element={<ValinePage />} />
            <Route path="/projects/amadeus" element={<AmadeusPage />} />
            <Route path="/projects/3kingdoms" element={<ThreeKingdomsPage />} />
            <Route path="/projects/axle" element={<AxlePage />} />
            <Route path="/projects/goalee" element={<GoaleePage />} />
            <Route path="/projects/tritongoplus" element={<TritonGoPlusPage />} />
            <Route path="/projects/volleyball" element={<VolleyballPage />} />
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
