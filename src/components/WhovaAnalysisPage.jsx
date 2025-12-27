import React from 'react';
import WritingDetailTemplate from './WritingDetailTemplate';
import { articles } from '../data/writing';

const WhovaAnalysisPage = () => {
  const article = articles.find(a => a.id === 'whova-analysis');
  return <WritingDetailTemplate article={article} />;
};

export default WhovaAnalysisPage;
