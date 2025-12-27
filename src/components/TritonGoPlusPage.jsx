import React from 'react';
import ProjectDetailTemplate from './ProjectDetailTemplate';
import { projects } from '../data/projects';

const TritonGoPlusPage = () => {
  const project = projects.find(p => p.id === 'tritongoplus');
  return <ProjectDetailTemplate project={project} />;
};

export default TritonGoPlusPage;
