import React from 'react';
import ProjectDetailTemplate from './ProjectDetailTemplate';
import { projects } from '../data/projects';
import titleImg from '../assets/projects/Volleyball Mobile/VolleyballMobileTitle.JPG';
import pdfFile from '../assets/projects/Volleyball Mobile/Volleyball Mobile.pdf';

const VolleyballPage = () => {
  const project = {
    ...projects.find(p => p.id === 'volleyball'),
    assets: {
      ...projects.find(p => p.id === 'volleyball').assets,
      images: [titleImg],
      pdfs: [pdfFile]
    }
  };

  return <ProjectDetailTemplate project={project} />;
};

export default VolleyballPage;
