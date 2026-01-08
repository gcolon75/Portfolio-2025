import React from 'react';
import ProjectDetailTemplate from './ProjectDetailTemplate';
import { projects } from '../data/projects';

/**
 * Page component for the TritonGo+ project.
 *
 * Finds the project with id 'tritongoplus' in the projects array and
 * renders it using the ProjectDetailTemplate. This wrapper ensures
 * your router can mount a dedicated page for this project when
 * navigating to the associated route.
 */
const TritonGoPlusPage = () => {
  const project = projects.find(p => p.id === 'tritongoplus');
  return <ProjectDetailTemplate project={project} />;
};

export default TritonGoPlusPage;