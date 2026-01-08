import React from 'react';
import ProjectDetailTemplate from './ProjectDetailTemplate';
import { projects } from '../data/projects';

/**
 * Page component for the Tower of Greed project.
 *
 * This wrapper component finds the project entry with id 'tower-of-greed'
 * from the projects data and renders it using the shared ProjectDetailTemplate.
 * Having a dedicated page component ensures the route defined in `projects.js`
 * works correctly without causing a 404.
 */
const TowerOfGreedPage = () => {
  const project = projects.find(p => p.id === 'tower-of-greed');
  return <ProjectDetailTemplate project={project} />;
};

export default TowerOfGreedPage;