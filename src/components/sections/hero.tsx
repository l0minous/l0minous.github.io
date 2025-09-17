export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-background overflow-hidden p-4">
      {/* Background Grid */}
      {/* Subtle background gradient shapes */}
      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-primary">
            Diler Zaza
          </h1>
          <h2 className="text-base sm:text-lg md:text-xl font-medium text-muted-foreground">
            Software Engineer & Computer Science Student
          </h2>
          <p className="max-w-3xl mx-auto text-xs sm:text-sm md:text-base text-muted-foreground">
            Building scalable software solutions with experience at AWS and venture capital. Computer Science student at University of Toronto with a passion for full-stack development.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <a 
              href="#projects" 
              className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-base font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              View Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}