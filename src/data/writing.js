// src/data/writing.js

// ✅ Thumbnails
import aiGenZThumb from '../assets/writing/ai-gen-z/AI-GenZ-Cover.png';
import promptThumb from '../assets/writing/chatgpt research/openAILogo.jpg';
import humanityThumb from '../assets/writing/Humanity in Media/HumanityArticleTitle.webp';
import whovaThumb from '../assets/writing/Whova Competitive Analysis/whova.jpg';

// ✅ Documents (use EXACT filenames)
import aiGenZFile from '../assets/writing/ai-gen-z/AI and Gen Z Final Draft.pdf';
import promptFile from '../assets/writing/chatgpt research/Prompt Engineering.docx';
import humanityFile from '../assets/writing/Humanity in Media/Humanity in Media.docx';
import whovaFile from '../assets/writing/Whova Competitive Analysis/Whova Competetive Analysis.pdf';

export const articles = [
  {
    id: 'ai-gen-z',
    title: 'AI & Gen Z: A Generation Growing Up With an Algorithm',
    description:
      'An in-depth analysis exploring how Generation Z interacts with and shapes AI technology',
    fullSummary:
      "This groundbreaking analysis explores how Generation Z is navigating unprecedented territory as the first generation to grow up with AI as an integral part of their emotional, educational, and social development. Through autoethnographic reflection and data-driven research, this article examines the profound implications of AI integration on mental health, learning methodologies, and ethical considerations for the future. It investigates how this generation's relationship with artificial intelligence is fundamentally reshaping human-technology interaction patterns and societal norms.",
    date: 'Aug 6, 2025',
    readTime: '15 min',
    author: 'Gabriel Colón',
    category: 'AI Analysis',
    route: '/writing/ai-and-gen-z',
    skills: [
      'Technical Writing',
      'AI Research',
      'Critical Thinking',
      'UX Research',
      'Ethical Design',
      'Data Synthesis',
      'Generational Studies'
    ],
    themes: ['Emotional AI Dependency', 'Educational Transformation', 'Ethical Concerns', 'Generational Impact'],
    thumbnail: aiGenZThumb,
    fileUrl: aiGenZFile,
    fileType: 'pdf'
  },

  {
    id: 'chatgpt-prompt',
    title: 'ChatGPT Prompt Engineering: A Case Study',
    description: 'Comprehensive exploration of effective prompt engineering techniques and best practices',
    fullSummary:
      'An in-depth exploration of prompt engineering methodologies for ChatGPT and large language models. This comprehensive case study examines practical techniques for crafting effective prompts, understanding model behavior patterns, and optimizing AI interactions for various use cases ranging from creative writing to technical problem-solving.',
    date: '2024',
    readTime: '6 min',
    author: 'Gabriel Colón',
    category: 'AI',
    route: '/writing/chatgpt-prompt-case-study',
    skills: ['Prompt Engineering', 'AI Research', 'Technical Writing', 'Case Study Analysis', 'Critical Thinking'],
    themes: ['Prompt Optimization', 'AI Interaction Design', 'Best Practices', 'Use Case Analysis'],
    thumbnail: promptThumb,
    fileUrl: promptFile,
    fileType: 'docx'
  },

  {
    id: 'humanity-media',
    title: 'Humanity in Media: The Digital Connection',
    description: 'Critical analysis exploring how digital media maintains human connection in a virtual world',
    fullSummary:
      'A thoughtful examination of how digital media platforms and technologies preserve, enhance, or diminish human connection in an increasingly virtual world.',
    date: '2023',
    readTime: '7 min',
    author: 'Gabriel Colón',
    category: 'Media Analysis',
    route: '/writing/humanity-in-media',
    skills: ['Media Analysis', 'Critical Thinking', 'Cultural Studies', 'Digital Anthropology', 'Communication Theory'],
    themes: ['Digital Connection', 'Human Authenticity', 'Media Evolution', 'Social Impact'],
    thumbnail: humanityThumb,
    fileUrl: humanityFile,
    fileType: 'docx'
  },

  {
    id: 'whova-analysis',
    title: 'Whova Competitive Analysis',
    description: 'Comprehensive comparative study of event management platform UX design approaches',
    fullSummary:
      'A comprehensive competitive analysis of the Whova event management platform, examining UX design methodologies, feature sets, user flows, and market positioning strategies.',
    date: '2023',
    readTime: '10 min',
    author: 'Gabriel Colón',
    category: 'UX Research',
    route: '/writing/whova-competitive-analysis',
    skills: ['Competitive Analysis', 'UX Research', 'Market Research', 'Feature Comparison', 'Strategic Thinking'],
    themes: ['Platform Analysis', 'UX Best Practices', 'Market Positioning', 'Innovation Opportunities'],
    thumbnail: whovaThumb,
    fileUrl: whovaFile,
    fileType: 'pdf'
  }
];
