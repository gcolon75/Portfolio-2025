import React from 'react';
import ProjectDetailTemplate from './ProjectDetailTemplate';
import { projects } from '../data/projects';

const ThreeKingdomsPage = () => {
  const project = projects.find(p => p.id === '3kingdoms');
  return <ProjectDetailTemplate project={project} />;
};

export default ThreeKingdomsPage;
