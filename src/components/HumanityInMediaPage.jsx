import React from 'react';
import WritingDetailTemplate from './WritingDetailTemplate';
import { articles } from '../data/writing';
import thumbnailImg from '../assets/writing/Humanity in Media/HumanityArticleTitle.webp';

const HumanityInMediaPage = () => {
  const article = {
    ...articles.find(a => a.id === 'humanity-media'),
    thumbnail: thumbnailImg,
    // Note: DOCX file - may need conversion or different handling
    pdfPath: null
  };

  return <WritingDetailTemplate article={article} />;
};

export default HumanityInMediaPage;
