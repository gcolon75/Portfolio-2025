import React from 'react';
import ProjectDetailTemplate from './ProjectDetailTemplate';
import { projects } from '../data/projects';
import titleImg from '../assets/projects/Triton Go/TritonGoTitle.JPG';

const TritonGoPlusPage = () => {
  const project = {
    ...projects.find(p => p.id === 'tritongoplus'),
    assets: {
      ...projects.find(p => p.id === 'tritongoplus').assets,
      images: [titleImg],
      links: projects.find(p => p.id === 'tritongoplus').assets.links
    }
  };

  return <ProjectDetailTemplate project={project} />;
};

export default TritonGoPlusPage;
