import React from 'react';
import ProjectDetailTemplate from './ProjectDetailTemplate';
import { projects } from '../data/projects';

const AmadeusPage = () => {
  const project = projects.find(p => p.id === 'amadeus');

  return <ProjectDetailTemplate project={project} />;
};

export default AmadeusPage;
