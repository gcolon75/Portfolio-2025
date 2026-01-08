import React from 'react';
import ProjectDetailTemplate from './ProjectDetailTemplate';
import { projects } from '../data/projects';

/**
 * Page component for the 3 Kingdoms project.
 *
 * This wrapper selects the project with id '3kingdoms' from the projects list
 * and passes it to the ProjectDetailTemplate for rendering. Creating this
 * separate component ensures the route defined in your router properly
 * resolves to a page rather than falling back to a not-found or default view.
 */
const ThreeKingdomsPage = () => {
  const project = projects.find(p => p.id === '3kingdoms');
  return <ProjectDetailTemplate project={project} />;
};

export default ThreeKingdomsPage;