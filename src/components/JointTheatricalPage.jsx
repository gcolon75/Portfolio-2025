import React from 'react';
import ProjectDetailTemplate from './ProjectDetailTemplate';
import { projects } from '../data/projects';

const JointTheatricalPage = () => {
  const project = projects.find(p => p.id === 'joint-theatrical-ventures');

  return <ProjectDetailTemplate project={project} />;
};

export default JointTheatricalPage;
