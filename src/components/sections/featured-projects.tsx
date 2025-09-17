'use client'

import React from 'react';
import { Github } from 'lucide-react';
import { motion } from 'framer-motion';

type Project = {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
};

const projects: Project[] = [
  {
    title: "Terminal Text Editor",
    description: "A C-based text editor with syntax highlighting and core editing functionalities, designed for performance in the terminal.",
    technologies: ["C"],
    githubUrl: "https://github.com/l0minous/Milo",
  },
  {
    title: "Time Series Forecasting", 
    description: "A Python and TensorFlow-based system for predicting stock prices through time series analysis and deep learning models.",
    technologies: ["Python", "TensorFlow"],
    githubUrl: "https://github.com/l0minous/Time_Series_Forecasting",
  },
  {
    title: "Real-Time Trading Backtesting Engine",
    description: "A Python/FastAPI, React, and PostgreSQL-based engine for real-time backtesting with sub-100ms WebSocket updates, built-in risk analytics, and live P&L tracking.",
    technologies: ["Python", "FastAPI", "React", "PostgreSQL", "Redis", "Docker"],
    githubUrl: "https://github.com/l0minous/Trading-Backtesting-Engine",
  },
];

const TechBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block bg-white/10 text-white/80 text-xs font-medium px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
    {children}
  </span>
);

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="flex flex-col h-full rounded-lg border border-white/10 bg-white/5 backdrop-blur-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:border-white/20">
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold text-white mb-3">{project.title}</h3>
        <p className="text-white/70 text-base mb-6 flex-grow">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <TechBadge key={tech}>{tech}</TechBadge>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-auto">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white border border-white/20 rounded-md hover:bg-white/10 transition-colors"
          >
            <Github size={16} className="mr-2" />
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

const FeaturedProjects = () => {
  return (
    <section id="projects" className="relative bg-black py-[120px]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2
            className="text-4xl font-semibold text-white"
            initial={{ opacity: 0, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Featured Projects
          </motion.h2>
          <p className="text-body-large mt-4 text-white/70">
            A curated selection of my work, demonstrating expertise across different technologies and platforms.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
      {/* Liquid glass glow */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(50%_50%_at_50%_50%,black,transparent)] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_60%)]" />
    </section>
  );
};

export default FeaturedProjects;