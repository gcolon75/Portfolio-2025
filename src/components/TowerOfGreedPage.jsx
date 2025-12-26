import React from 'react';
import ProjectDetailTemplate from './ProjectDetailTemplate';
import { projects } from '../data/projects';
import heroImg from '../assets/projects/Tower of Greed/TowerOfGreedThumb.png';

const TowerOfGreedPage = () => {
  const project = {
    ...projects.find(p => p.id === 'tower-of-greed'),
    assets: {
      ...projects.find(p => p.id === 'tower-of-greed').assets,
      images: [heroImg]
    }
  };

  return <ProjectDetailTemplate project={project} />;
};

export default TowerOfGreedPage;
