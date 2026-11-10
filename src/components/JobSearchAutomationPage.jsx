import React from 'react';
import ProjectDetailTemplate from './ProjectDetailTemplate';
import { projects } from '../data/projects';

const JobSearchAutomationPage = () => {
  const project = projects.find((p) => p.id === 'job-search-automation');

  return <ProjectDetailTemplate project={project} />;
};

export default JobSearchAutomationPage;
