import React from 'react';
import WritingDetailTemplate from './WritingDetailTemplate';
import { articles } from '../data/writing';

const HumanityInMediaPage = () => {
  const article = articles.find(a => a.id === 'humanity-media');
  return <WritingDetailTemplate article={article} />;
};

export default HumanityInMediaPage;
