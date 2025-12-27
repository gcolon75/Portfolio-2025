import React from 'react';
import ProjectDetailTemplate from './ProjectDetailTemplate';
import { projects } from '../data/projects';

const VolleyballPage = () => {
  const project = projects.find(p => p.id === 'volleyball');
  return <ProjectDetailTemplate project={project} />;
};

export default VolleyballPage;
