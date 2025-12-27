import React from 'react';
import ProjectDetailTemplate from './ProjectDetailTemplate';
import { projects } from '../data/projects';

const GoaleePage = () => {
  const project = projects.find(p => p.id === 'goalee');
  return <ProjectDetailTemplate project={project} />;
};

export default GoaleePage;
