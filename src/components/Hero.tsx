const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-balance">
          Diler Zaza
        </h1>
        <p className="text-xl md:text-2xl font-light text-muted-foreground mb-8">
          Software Engineer & Computer Science Student
        </p>
        <p className="text-lg font-light max-w-2xl mx-auto text-balance">
          Building scalable software solutions with experience at AWS and venture capital. 
          Computer Science student at University of Toronto with a passion for full-stack development.
        </p>
      </div>
    </section>
  );
};

export default Hero;