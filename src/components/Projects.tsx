import { Github, ExternalLink } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Terminal Text Editor",
      description: "Full-featured terminal-based text editor in C with syntax highlighting, incremental search, and real-time rendering. Optimized for sub-2ms latency on 100KB files.",
      tech: ["C", "Terminal Control", "File I/O"],
      github: "#",
      live: ""
    },
    {
      title: "Time Series Forecasting",
      description: "Advanced hybrid forecasting engine using ARIMA, GARCH, and LSTM models for stock price prediction. Implemented trading strategies with performance evaluation.",
      tech: ["Python", "TensorFlow", "Keras Tuner", "yfinance"],
      github: "#",
      live: ""
    },
    {
      title: "Sports Up Mobile App",
      description: "iOS application with 100+ downloads featuring real-time data synchronization. Redesigned UI/UX resulting in 20% increase in download rates.",
      tech: ["React Native", "Firebase", "iOS"],
      github: "#",
      live: ""
    },
    {
      title: "CNN Digit Recognition",
      description: "High-accuracy convolutional neural network for MNIST digit recognition using PyTorch. Sophisticated architecture with CPU/GPU compatibility.",
      tech: ["Python", "PyTorch", "CNN", "MNIST"],
      github: "#",
      live: ""
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">Featured Projects</h2>
        <div className="space-y-12">
          {projects.map((project, index) => (
            <div key={index} className="border-b border-border pb-12 last:border-b-0">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <h3 className="text-2xl font-bold mb-2 md:mb-0">{project.title}</h3>
                <div className="flex space-x-4">
                  <a 
                    href={project.github} 
                    className="transition-smooth hover:text-muted-foreground"
                    aria-label="View source code"
                  >
                    <Github size={20} />
                  </a>
                  <a 
                    href={project.live} 
                    className="transition-smooth hover:text-muted-foreground"
                    aria-label="View live demo"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
              <p className="font-light leading-relaxed mb-4 max-w-3xl">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, techIndex) => (
                  <span 
                    key={techIndex} 
                    className="px-3 py-1 bg-secondary text-sm font-light rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;