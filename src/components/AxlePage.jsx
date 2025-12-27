import React from 'react';
import ProjectDetailTemplate from './ProjectDetailTemplate';
import { projects } from '../data/projects';

const AxlePage = () => {
  const project = projects.find(p => p.id === 'axle');
  return <ProjectDetailTemplate project={project} />;
};

export default AxlePage;
