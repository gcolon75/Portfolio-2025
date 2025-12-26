import React from 'react';
import WritingDetailTemplate from './WritingDetailTemplate';
import { articles } from '../data/writing';
import thumbnailImg from '../assets/writing/ai-gen-z/AI-GenZ-Cover.png';
import pdfFile from '../assets/writing/ai-gen-z/AI and Gen Z Final Draft.pdf';

const AIGenZPage = () => {
  const article = {
    ...articles.find(a => a.id === 'ai-gen-z'),
    thumbnail: thumbnailImg,
    pdfPath: pdfFile
  };

  return <WritingDetailTemplate article={article} />;
};

export default AIGenZPage;
