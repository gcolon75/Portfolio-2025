import React from 'react';
import ProjectDetailTemplate from './ProjectDetailTemplate';
import { projects } from '../data/projects';

const TowerOfGreedPage = () => {
  const project = projects.find(p => p.id === 'tower-of-greed');
  return <ProjectDetailTemplate project={project} />;
};

export default TowerOfGreedPage;
