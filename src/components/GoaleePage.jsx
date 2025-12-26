import React from 'react';
import ProjectDetailTemplate from './ProjectDetailTemplate';
import { projects } from '../data/projects';
import homescreenImg from '../assets/projects/Goalee/GoaleeHomescreen.JPG';
import posterImg from '../assets/projects/Goalee/GoaleePoster.jpg';
import titleImg from '../assets/projects/Goalee/GoaleeTitle.JPG';
import figmaPdf from '../assets/projects/Goalee/GoaleeFigma.pdf';

const GoaleePage = () => {
  const project = {
    ...projects.find(p => p.id === 'goalee'),
    assets: {
      ...projects.find(p => p.id === 'goalee').assets,
      images: [homescreenImg, posterImg, titleImg],
      pdfs: [figmaPdf],
      links: projects.find(p => p.id === 'goalee').assets.links
    }
  };

  return <ProjectDetailTemplate project={project} />;
};

export default GoaleePage;
