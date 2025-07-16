import { useState, useEffect } from "react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
      isScrolled ? 'bg-background/80 backdrop-blur-sm border-b border-border' : 'bg-transparent'
    }`}>
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => scrollToSection('hero')}
            className="font-bold text-lg transition-smooth hover:text-muted-foreground"
          >
            DZ
          </button>
          
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="font-light transition-smooth hover:text-muted-foreground"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('skills')}
              className="font-light transition-smooth hover:text-muted-foreground"
            >
              Skills
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="font-light transition-smooth hover:text-muted-foreground"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="font-light transition-smooth hover:text-muted-foreground"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
