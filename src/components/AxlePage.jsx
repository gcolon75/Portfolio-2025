import React from 'react';
import ProjectDetailTemplate from './ProjectDetailTemplate';
import { projects } from '../data/projects';
import heroImg from '../assets/projects/Axle/axleImage.JPG';
import homepageImg from '../assets/projects/Axle/axle-homepage.JPG';
import aboutImg from '../assets/projects/Axle/axle-about.JPG';
import mechanicImg from '../assets/projects/Axle/axle-becomeMechanic.JPG';
import slidesPdf from '../assets/projects/Axle/axle-slides.pdf';

const AxlePage = () => {
  const project = {
    ...projects.find(p => p.id === 'axle'),
    assets: {
      ...projects.find(p => p.id === 'axle').assets,
      images: [heroImg, homepageImg, aboutImg, mechanicImg],
      pdfs: [slidesPdf]
    }
  };

  return <ProjectDetailTemplate project={project} />;
};

export default AxlePage;
