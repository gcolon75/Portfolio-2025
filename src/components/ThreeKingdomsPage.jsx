import React from 'react';
import ProjectDetailTemplate from './ProjectDetailTemplate';
import { projects } from '../data/projects';
import titleImg from '../assets/projects/3 Kingdoms/3KingdomsTitleScreen.png';
import mapImg from '../assets/projects/3 Kingdoms/3KingdomsMap.JPG';

const ThreeKingdomsPage = () => {
  const project = {
    ...projects.find(p => p.id === '3kingdoms'),
    assets: {
      ...projects.find(p => p.id === '3kingdoms').assets,
      images: [titleImg, mapImg]
    }
  };

  return <ProjectDetailTemplate project={project} />;
};

export default ThreeKingdomsPage;
