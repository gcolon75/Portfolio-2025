import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
// import PDFViewer from './PDFViewer';
import './AIGenZPage.css';

const AIGenZPage = () => {
  const navigate = useNavigate();

  const skills = [
    'Technical Writing',
    'AI Research & Analysis',
    'Critical Thinking',
    'UX Research Methods',
    'Ethical Design',
    'Data Synthesis',
    'Generational Studies'
  ];

  const workflowSteps = [
    {
      title: 'Research Phase',
      description: 'Autoethnographic reflection, survey data analysis, academic source synthesis'
    },
    {
      title: 'Drafting',
      description: 'Personal narrative combined with data-driven insights'
    },
    {
      title: 'Revision',
      description: 'AI-assisted editing (ChatGPT collaboration mentioned in article)'
    },
    {
      title: 'Publication',
      description: 'Final formatting and citation verification'
    }
  ];

  const keyQuotes = [
    {
      quote: "AI is no longer a tool we use—it's becoming a companion we trust, sometimes more than the people around us.",
      context: "On emotional AI dependency"
    },
    {
      quote: "For Gen Z, AI isn't the future. It's the present. It's in our classrooms, our conversations, and increasingly, our emotional lives.",
      context: "On generational AI integration"
    },
    {
      quote: "The question isn't whether AI belongs in our lives, but how we can integrate it thoughtfully, ethically, and sustainably.",
      context: "Call to action"
    }
  ];

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="writing-detail">
      <motion.div
        className="writing-detail-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back Button */}
        <motion.button
          className="back-button"
          onClick={() => navigate('/')}
          variants={itemVariants}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back to Portfolio
        </motion.button>

        {/* Header Section */}
        <motion.header className="article-header" variants={itemVariants}>
          <div className="article-cover">
            <div className="article-cover-placeholder">
              <span className="cover-icon">🤖</span>
              <p className="cover-note">Cover image: AI-GenZ-Cover.png (to be added to assets folder)</p>
            </div>
          </div>
          <h1 className="article-title">AI and Gen Z: A Generation Growing Up With an Algorithm</h1>
          <h2 className="article-subtitle">How Emotional Support, Learning, and Connection Are Being Rewired by Technology</h2>
          <div className="article-meta">
            <span className="article-author">Gabriel Colón</span>
            <span className="meta-divider">•</span>
            <span className="article-date">August 6, 2025</span>
            <span className="meta-divider">•</span>
            <span className="article-read-time">15 min read</span>
          </div>
        </motion.header>

        {/* Summary Section */}
        <motion.section className="article-summary" variants={itemVariants}>
          <h3>Summary</h3>
          <p>
            This groundbreaking analysis explores how Generation Z is navigating unprecedented territory as the first generation 
            to grow up with AI as an integral part of their emotional, educational, and social development. Through autoethnographic 
            reflection and data-driven research, the article examines the profound implications of AI integration on mental health, 
            learning methodologies, and ethical considerations for the future.
          </p>
          <div className="key-themes">
            <h4>Key Themes</h4>
            <div className="theme-tags">
              <span className="theme-tag">Emotional AI Dependency</span>
              <span className="theme-tag">Educational Transformation</span>
              <span className="theme-tag">Ethical Concerns</span>
              <span className="theme-tag">Generational Impact</span>
            </div>
          </div>
        </motion.section>

        {/* Skills & Interests */}
        <motion.section className="article-skills" variants={itemVariants}>
          <h3>Skills & Interests Demonstrated</h3>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="skill-badge"
                whileHover={{ scale: 1.05, y: -3 }}
                transition={{ duration: 0.2 }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Workflow Section */}
        <motion.section className="article-workflow" variants={itemVariants}>
          <h3>Writing Process</h3>
          <div className="workflow-steps">
            {workflowSteps.map((step, index) => (
              <div key={index} className="workflow-step">
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* PDF Viewer */}
        <motion.section className="article-pdf" variants={itemVariants}>
          <h3>Read the Full Article</h3>
          <p className="pdf-note">
            <strong>Note:</strong> Please add "AI and Gen Z Final Draft.pdf" to the{' '}
            <code>/src/assets/writing/ai-gen-z/</code> folder to view the PDF here.
          </p>
          {/* PDF will be shown once the file is added */}
          {/* <PDFViewer 
            pdfUrl="/assets/writing/ai-gen-z/AI and Gen Z Final Draft.pdf" 
            fileName="AI-and-Gen-Z.pdf"
          /> */}
        </motion.section>

        {/* Key Quotes Section */}
        <motion.section className="article-quotes" variants={itemVariants}>
          <h3>Key Insights</h3>
          <div className="quotes-grid">
            {keyQuotes.map((item, index) => (
              <motion.div
                key={index}
                className="quote-card"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="quote-mark">"</div>
                <p className="quote-text">{item.quote}</p>
                <p className="quote-context">— {item.context}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Back Navigation */}
        <motion.div className="article-nav" variants={itemVariants}>
          <button
            className="nav-button primary"
            onClick={() => navigate('/')}
          >
            ← Return to Writing Section
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AIGenZPage;
