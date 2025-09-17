import React from 'react';

interface SkillCategoryProps {
  title: string;
  skills: string[];
}

const skillsData = {
  languages: [
    "Python", "JavaScript", "TypeScript", "Java", "C", "C++", 
    "SQL", "R", "Kotlin", "Assembly"
  ],
  frameworks: [
    "React", "React Native", "TailwindCSS", "Node.js", "Vue.js", 
    "PyTorch", "TensorFlow", "Firebase"
  ],
  tools: [
    "AWS", "Git", "Webpack", "VS Code", "Figma", 
    "CodePipeline", "Brasil", "Keras Tuner"
  ],
};

const SkillCategory: React.FC<SkillCategoryProps> = ({ title, skills }) => {
  return (
    <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
      <h3 className="text-xl font-semibold tracking-tight text-primary mb-5">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill) => (
          <div
            key={skill}
            className="cursor-default bg-secondary text-secondary-foreground py-1 px-2.5 rounded-md text-sm font-medium transition-colors hover:bg-border"
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

const SkillsSection: React.FC = () => {
  return (
    <section className="bg-secondary py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-primary">Skills</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A showcase of my technical expertise across languages, frameworks, libraries, and tools.
            </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <SkillCategory title="Languages" skills={skillsData.languages} />
          <SkillCategory title="Frameworks & Libraries" skills={skillsData.frameworks} />
          <SkillCategory title="Tools & Platforms" skills={skillsData.tools} />
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;