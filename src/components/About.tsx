const About = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">About</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-lg font-light leading-relaxed mb-6">
              I'm a Computer Science student with hands-on experience in software engineering 
              at AWS and venture capital analytics. My journey spans from enhancing developer 
              tools to building financial models and mobile applications.
            </p>
            <p className="text-lg font-light leading-relaxed">
              I thrive on solving complex problems through code, whether it's optimizing 
              AWS Console features, developing predictive models, or creating intuitive 
              user experiences across platforms.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Education</h3>
            <p className="font-light mb-2">University of Toronto</p>
            <p className="text-muted-foreground font-light mb-2">Bachelor of Science in Computer Science</p>
            <p className="text-muted-foreground font-light mb-6">Minor in Math & Statistics, Certificate in Business Fundamentals</p>
            
            <h3 className="text-xl font-bold mb-4">Experience</h3>
            <ul className="space-y-2 font-light">
              <li>• AWS Software Development Engineer Intern</li>
              <li>• Transform VC Analyst Intern</li>
              <li>• Full-Stack Development</li>
              <li>• Financial Analysis & Modeling</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;