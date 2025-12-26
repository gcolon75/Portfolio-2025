import React from 'react';
import WritingDetailTemplate from './WritingDetailTemplate';
import { articles } from '../data/writing';
import thumbnailImg from '../assets/writing/Whova Competitive Analysis/whova.jpg';
import pdfFile from '../assets/writing/Whova Competitive Analysis/Whova Competetive Analysis.pdf';

const WhovaAnalysisPage = () => {
  const article = {
    ...articles.find(a => a.id === 'whova-analysis'),
    thumbnail: thumbnailImg,
    pdfPath: pdfFile
  };

  return <WritingDetailTemplate article={article} />;
};

export default WhovaAnalysisPage;
