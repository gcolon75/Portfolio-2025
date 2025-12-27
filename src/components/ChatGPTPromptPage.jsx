import React from 'react';
import WritingDetailTemplate from './WritingDetailTemplate';
import { articles } from '../data/writing';

const ChatGPTPromptPage = () => {
  const article = articles.find(a => a.id === 'chatgpt-prompt');
  return <WritingDetailTemplate article={article} />;
};

export default ChatGPTPromptPage;
