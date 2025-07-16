import { Mail, Github, Linkedin } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-20 px-6 bg-secondary">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
        <p className="text-lg font-light mb-12 max-w-2xl mx-auto">
          Open to software engineering opportunities, internships, and collaborative projects. 
          Let's connect and build something impactful together.
        </p>
        
        <div className="flex justify-center space-x-8 mb-12">
          <a 
            href="mailto:diler.zaza@mail.utoronto.ca" 
            className="flex items-center space-x-2 transition-smooth hover:text-muted-foreground"
          >
            <Mail size={20} />
            <span className="font-light">diler.zaza@mail.utoronto.ca</span>
          </a>
        </div>

        <div className="flex justify-center space-x-6">
          <a 
            href="https://github.com/dilerzaza" 
            className="transition-smooth hover:text-muted-foreground"
            aria-label="GitHub Profile"
          >
            <Github size={24} />
          </a>
          <a 
            href="https://www.linkedin.com/in/diler-zaza/" 
            className="transition-smooth hover:text-muted-foreground"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
