const Skills = () => {
  const skillCategories = [
    {
      title: "Languages",
      skills: ["Python", "JavaScript", "TypeScript", "Java", "C", "C++", "SQL", "R", "Kotlin", "Assembly"]
    },
    {
      title: "Frameworks & Libraries",
      skills: ["React", "React Native", "TailwindCSS", "Node.js", "Vue.js", "PyTorch", "TensorFlow", "Firebase"]
    },
    {
      title: "Tools & Platforms",
      skills: ["AWS", "Git", "Webpack", "VS Code", "Figma", "CodePipeline", "Brasil", "Keras Tuner"]
    }
  ];

  return (
    <section className="py-20 px-6 bg-secondary">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">Skills</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index}>
              <h3 className="text-xl font-bold mb-4">{category.title}</h3>
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="font-light">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;