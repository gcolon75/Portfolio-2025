import React, { Suspense, lazy } from 'react';
import { MotionConfig } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Writing from './components/Writing';
import SkillTree from './components/SkillTree';
import Contact from './components/Contact';
import VIChat from './components/VIChat';
import './index.css';

// Detail pages load on demand so the home page does not download them.
const AIGenZPage = lazy(() => import('./components/AIGenZPage'));
const ChatGPTPromptPage = lazy(() => import('./components/ChatGPTPromptPage'));
const HumanityInMediaPage = lazy(() => import('./components/HumanityInMediaPage'));
const WhovaAnalysisPage = lazy(() => import('./components/WhovaAnalysisPage'));
const TowerOfGreedPage = lazy(() => import('./components/TowerOfGreedPage'));
const JointTheatricalPage = lazy(() => import('./components/JointTheatricalPage'));
const AmadeusPage = lazy(() => import('./components/AmadeusPage'));
const ThreeKingdomsPage = lazy(() => import('./components/ThreeKingdomsPage'));
const AxlePage = lazy(() => import('./components/AxlePage'));
const GoaleePage = lazy(() => import('./components/GoaleePage'));
const TritonGoPlusPage = lazy(() => import('./components/TritonGoPlusPage'));
const VolleyballPage = lazy(() => import('./components/VolleyballPage'));
const PCIAutomationPage = lazy(() => import('./components/PCIAutomationPage'));
const JobSearchAutomationPage = lazy(() => import('./components/JobSearchAutomationPage'));

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
    <MotionConfig reducedMotion="user">
      <Router basename="/Portfolio-2025">
        <div className="App">
          <Header />
          <main>
            <Suspense fallback={<div className="route-loading" aria-busy="true" />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                {/* Writing Routes */}
                <Route path="/writing/ai-and-gen-z" element={<AIGenZPage />} />
                <Route path="/writing/chatgpt-prompt-case-study" element={<ChatGPTPromptPage />} />
                <Route path="/writing/humanity-in-media" element={<HumanityInMediaPage />} />
                <Route path="/writing/whova-competitive-analysis" element={<WhovaAnalysisPage />} />
                {/* Project Routes */}
                <Route path="/projects/tower-of-greed" element={<TowerOfGreedPage />} />
                <Route path="/projects/joint-theatrical-ventures" element={<JointTheatricalPage />} />
                <Route path="/projects/amadeus" element={<AmadeusPage />} />
                <Route path="/projects/3kingdoms" element={<ThreeKingdomsPage />} />
                <Route path="/projects/axle" element={<AxlePage />} />
                <Route path="/projects/goalee" element={<GoaleePage />} />
                <Route path="/projects/tritongoplus" element={<TritonGoPlusPage />} />
                <Route path="/projects/volleyball" element={<VolleyballPage />} />
                <Route path="/projects/pci-qa-automation" element={<PCIAutomationPage />} />
                <Route path="/projects/job-search-automation" element={<JobSearchAutomationPage />} />
              </Routes>
            </Suspense>
          </main>
          <footer className="footer">
            <div className="container">
              <p>&copy; {new Date().getFullYear()} Gabriel Colon. Built with React, Framer Motion, and a Claude-powered VI.</p>
            </div>
          </footer>
          <VIChat />
        </div>
      </Router>
    </MotionConfig>
  );
}

export default App;
