import React from 'react';
import WritingDetailTemplate from './WritingDetailTemplate';
import { articles } from '../data/writing';

const AIGenZPage = () => {
  const article = articles.find(a => a.id === 'ai-gen-z');
  return <WritingDetailTemplate article={article} />;
};

export default AIGenZPage;
