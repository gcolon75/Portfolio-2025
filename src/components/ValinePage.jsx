import React from 'react';
import ProjectDetailTemplate from './ProjectDetailTemplate';
import { projects } from '../data/projects';

const ValinePage = () => {
  const project = projects.find(p => p.id === 'project-valine');

  return <ProjectDetailTemplate project={project} />;
};

export default ValinePage;
