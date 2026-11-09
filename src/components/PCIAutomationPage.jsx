import React from 'react';
import ProjectDetailTemplate from './ProjectDetailTemplate';
import { projects } from '../data/projects';

const PCIAutomationPage = () => {
  const project = projects.find((p) => p.id === 'pci-qa-automation');

  return <ProjectDetailTemplate project={project} />;
};

export default PCIAutomationPage;
