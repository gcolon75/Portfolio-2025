import React from 'react';
import WritingDetailTemplate from './WritingDetailTemplate';
import { articles } from '../data/writing';
import thumbnailImg from '../assets/writing/chatgpt research/openAILogo.jpg';

const ChatGPTPromptPage = () => {
  const article = {
    ...articles.find(a => a.id === 'chatgpt-prompt'),
    thumbnail: thumbnailImg,
    // Note: DOCX file - may need conversion or different handling
    pdfPath: null
  };

  return <WritingDetailTemplate article={article} />;
};

export default ChatGPTPromptPage;
