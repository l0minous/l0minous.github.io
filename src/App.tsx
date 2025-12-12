import React, { useState, useEffect, useRef } from 'react';

// Local image assets
const imgGroup132 = "/7b3ec086-8013-4da8-906d-a3c6a7997bca.png";
const imgLayer19Copy21 = "/f698c2cc-1cee-4b52-b769-427dfb99c1c0.png";
const imgMvi332300084806Still0292 = "/a2c8dec3-a482-41ff-9c10-5422d1f59c0d.png";

function Header({ projectsRef }: { projectsRef: React.RefObject<HTMLDivElement> }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [glitchMap, setGlitchMap] = useState<Map<string, string>>(new Map());
  const [isProjectsSliding, setIsProjectsSliding] = useState(false);
  const [isSoftwareEngineerSliding, setIsSoftwareEngineerSliding] = useState(false);
  const [isGithubSliding, setIsGithubSliding] = useState(false);
  const [isUniversitySliding, setIsUniversitySliding] = useState(false);
  const [isGraphicDesignSliding, setIsGraphicDesignSliding] = useState(false);
  const [isAmpersandSliding, setIsAmpersandSliding] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const textElements = [
      'DILER ZAZA',
      'SOFTWARE ENGINEER',
      'DESIGNER',
      'GITHUB',
      'PROJECTS',
      'TORONTO, CANADA',
      'PHOTOGRAPHY',
      'FASHION',
      'GRAPHIC DESIGN',
      'UNIVERSITY OF TORONTO',
      'DILER.ZAZA@MAIL.UTORONTO.CA'
    ];

    const triggerGlitch = () => {
      const randomText = textElements[Math.floor(Math.random() * textElements.length)];
      const randomIndex = Math.floor(Math.random() * randomText.length);
      const originalChar = randomText[randomIndex];
      
      if (originalChar === ' ' || originalChar === '.' || originalChar === '@') return;
      
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const randomChar = chars[Math.floor(Math.random() * chars.length)];
      
      const key = `${randomText}-${randomIndex}`;
      setGlitchMap(prev => new Map(prev).set(key, randomChar));
      
      setTimeout(() => {
        setGlitchMap(prev => {
          const newMap = new Map(prev);
          newMap.delete(key);
          return newMap;
        });
      }, 100 + Math.random() * 200);
    };

    const glitchInterval = setInterval(() => {
      const glitchCount = Math.floor(Math.random() * 4) + 1;
      for (let i = 0; i < glitchCount; i++) {
        setTimeout(() => triggerGlitch(), i * 500);
      }
    }, 5000);

    // Trigger initial glitch after 2 seconds
    setTimeout(() => triggerGlitch(), 2000);

    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    const triggerSlide = () => {
      setIsProjectsSliding(true);
      
      setTimeout(() => {
        setIsProjectsSliding(false);
      }, 5000);
    };

    // Random interval between 5-25 seconds
    const scheduleNextSlide = () => {
      const delay = 5000 + Math.random() * 20000;
      return setTimeout(() => {
        triggerSlide();
        scheduleNextSlide();
      }, delay);
    };

    const timeout = scheduleNextSlide();

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const triggerSlide = () => {
      setIsSoftwareEngineerSliding(true);
      
      // Ampersand slides left 1 second AFTER software engineer starts
      setTimeout(() => {
        setIsAmpersandSliding(true);
      }, 1000);
      
      setTimeout(() => {
        // Ampersand slides back first
        setIsAmpersandSliding(false);
        
        // Software engineer slides back 1 second after ampersand
        setTimeout(() => {
          setIsSoftwareEngineerSliding(false);
        }, 1000);
      }, 5000);
    };

    // Random interval between 7-30 seconds
    const scheduleNextSlide = () => {
      const delay = 7000 + Math.random() * 23000;
      return setTimeout(() => {
        triggerSlide();
        scheduleNextSlide();
      }, delay);
    };

    const timeout = scheduleNextSlide();

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const triggerSlide = () => {
      setIsGithubSliding(true);
      
      setTimeout(() => {
        setIsGithubSliding(false);
      }, 5000);
    };

    // Random interval between 8-22 seconds
    const scheduleNextSlide = () => {
      const delay = 8000 + Math.random() * 14000;
      return setTimeout(() => {
        triggerSlide();
        scheduleNextSlide();
      }, delay);
    };

    const timeout = scheduleNextSlide();

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const triggerSlide = () => {
      setIsUniversitySliding(true);
      
      setTimeout(() => {
        setIsUniversitySliding(false);
      }, 5000);
    };

    // Random interval between 12-28 seconds
    const scheduleNextSlide = () => {
      const delay = 12000 + Math.random() * 16000;
      return setTimeout(() => {
        triggerSlide();
        scheduleNextSlide();
      }, delay);
    };

    const timeout = scheduleNextSlide();

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const triggerSlide = () => {
      setIsGraphicDesignSliding(true);
      
      setTimeout(() => {
        setIsGraphicDesignSliding(false);
      }, 5000);
    };

    // Random interval between 6-24 seconds
    const scheduleNextSlide = () => {
      const delay = 6000 + Math.random() * 18000;
      return setTimeout(() => {
        triggerSlide();
        scheduleNextSlide();
      }, delay);
    };

    const timeout = scheduleNextSlide();

    return () => clearTimeout(timeout);
  }, []);

  const renderGlitchText = (text: string) => {
    return text.split('').map((char, index) => {
      const key = `${text}-${index}`;
      const glitchChar = glitchMap.get(key);
      return (
        <span key={index} className={char === ' ' ? 'inline' : 'inline-block'}>
          {glitchChar || char}
        </span>
      );
    });
  };

  const getSeason = (date: Date) => {
    const month = date.getMonth();
    if (month >= 2 && month <= 4) return 'SPRING';
    if (month >= 5 && month <= 7) return 'SUMMER';
    if (month >= 8 && month <= 10) return 'FALL';
    return 'WINTER';
  };

  const formatDate = (date: Date) => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const season = getSeason(date);
    const year = date.getFullYear();
    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    
    return `${season} ${year}, ${dayName}.${monthName}.${day}`;
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds} EST`;
  };

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative font-['Helvetica:Light',sans-serif] text-[#e0eedf] px-6 py-12 overflow-hidden">
      <div className="max-w-[1512px] mx-auto">
        <h1 className="text-[clamp(12px,1.1vw,16px)] mb-8">{renderGlitchText('DILER ZAZA')}</h1>
        <p className="text-[clamp(12px,1.1vw,16px)] text-right mb-12 whitespace-pre-wrap overflow-hidden">
          <span 
            className="inline-block transition-transform duration-[1500ms] ease-in-out"
            style={{ transform: isSoftwareEngineerSliding ? 'translateX(clamp(-100px, -15vw, -250px))' : 'translateX(0)' }}
          >
            {'    '}{renderGlitchText('SOFTWARE ENGINEER')}
          </span>
          <span 
            className="inline-block transition-transform duration-[1500ms] ease-in-out"
            style={{ transform: isAmpersandSliding ? 'translateX(clamp(-80px, -12vw, -200px))' : 'translateX(0)' }}
          >
            {'                            &               '}
          </span>
          {renderGlitchText('DESIGNER')}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 overflow-hidden">
          <div className="text-[clamp(12px,1.1vw,16px)] overflow-hidden">
            <a 
              href="https://github.com/l0minous" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mb-2 block transition-transform duration-[1500ms] ease-in-out hover:opacity-70"
              style={{ transform: isGithubSliding ? 'translateX(clamp(40px, 8vw, 120px))' : 'translateX(0)' }}
            >
              {renderGlitchText('GITHUB')}
            </a>
          </div>
          <div className="text-[clamp(12px,1.1vw,16px)] overflow-hidden">
            <p 
              onClick={scrollToProjects}
              className="mb-2 cursor-pointer transition-transform duration-[1500ms] ease-in-out hover:opacity-70"
              style={{ transform: isProjectsSliding ? 'translateX(clamp(60px, 12vw, 180px))' : 'translateX(0)' }}
            >
              {renderGlitchText('PROJECTS')}
            </p>
          </div>
          <div className="text-[clamp(12px,1.1vw,16px)] text-right">
            <p className="mb-2">{renderGlitchText('TORONTO, CANADA')}</p>
            <p className="mb-1">{formatDate(currentTime)}</p>
            <p>{formatTime(currentTime)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 overflow-hidden">
          <div className="text-[clamp(12px,1.1vw,16px)]">
            <a 
              href="https://www.instagram.com/keep_____blinking/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mb-2 block hover:opacity-70"
            >
              {renderGlitchText('PHOTOGRAPHY')}
            </a>
          </div>
          <div className="text-[clamp(12px,1.1vw,16px)]">
            <a 
              href="https://www.instagram.com/_lookoverme/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mb-2 block hover:opacity-70"
            >
              {renderGlitchText('FASHION')}
            </a>
          </div>
          <div className="text-[clamp(12px,1.1vw,16px)] overflow-hidden">
            <a 
              href="https://www.behance.net/l0minous" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mb-2 block transition-transform duration-[1500ms] ease-in-out hover:opacity-70"
              style={{ transform: isGraphicDesignSliding ? 'translateX(clamp(40px, 8vw, 120px))' : 'translateX(0)' }}
            >
              {renderGlitchText('GRAPHIC DESIGN')}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="overflow-hidden">
            <p
              className="text-[clamp(12px,1.1vw,16px)] mb-1 transition-transform duration-[1500ms] ease-in-out"
              style={{ transform: isUniversitySliding ? 'translateX(clamp(60px, 12vw, 200px))' : 'translateX(0)' }}
            >
              {renderGlitchText('UNIVERSITY OF TORONTO')}
            </p>
            <p className="text-[clamp(12px,1.1vw,16px)] hover:text-[#1F2E32] transition-colors duration-300 break-all">{renderGlitchText('DILER.ZAZA@MAIL.UTORONTO.CA')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuoteSection() {
  const [isRevealed, setIsRevealed] = useState(false);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
          }
        });
      },
      { threshold: 0.6 }
    );

    if (quoteRef.current) {
      observer.observe(quoteRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const words = [
    { text: 'Perhaps', italic: false },
    { text: 'the', italic: false },
    { text: 'misfortune', italic: true },
    { text: 'you', italic: false },
    { text: 'do', italic: false },
    { text: 'not', italic: false },
    { text: 'like,', italic: false },
    { text: 'leads', italic: false },
    { text: 'you', italic: false },
    { text: 'to', italic: false },
    { text: 'a', italic: false },
    { text: 'beautiful', italic: true },
    { text: 'destiny', italic: true },
    { text: 'that', italic: false },
    { text: 'you', italic: false },
    { text: 'never', italic: false },
    { text: 'dreamed', italic: false },
    { text: 'of', italic: false },
  ];

  return (
    <div ref={quoteRef} className="relative py-20 px-6">
      <div className="max-w-[1512px] mx-auto">
        <p className="text-[clamp(24px,3.2vw,48px)] text-[#e0eedf] font-['Helvetica:Light',sans-serif] text-center px-12">
          {words.map((word, index) => (
            <span
              key={index}
              className={`inline-block mr-[0.2em] transition-all duration-700 ease-out ${
                word.italic ? "font-['Austin:Hairline_Italic',sans-serif] italic" : ""
              } ${
                isRevealed 
                  ? 'opacity-100 blur-0 translate-y-0' 
                  : 'opacity-0 blur-md translate-y-8'
              }`}
              style={{
                transitionDelay: isRevealed ? `${index * 100}ms` : '0ms'
              }}
            >
              {word.text}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

function ExperienceCard({ 
  company, 
  location, 
  role, 
  description, 
  image,
  index
}: { 
  company: string; 
  location: string; 
  role: string; 
  description: string;
  image: string;
  index: number;
}) {
  return (
    <div className="sticky top-0 w-full min-h-[35vw] h-auto" style={{ zIndex: 10 + index }}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img 
          alt="" 
          className="w-full h-full object-cover rotate-180 scale-y-[-1]" 
          src={image} 
        />
      </div>
      
      {/* Text Content Overlay */}
      <div className="relative z-10 px-6 pt-8 pb-8 h-full">
        <div className="max-w-[1512px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          <div className="text-[#e0eedf]">
            <h2 className="text-[clamp(32px,6.3vw,96px)] font-['Helvetica:Light',sans-serif] leading-tight mb-4 whitespace-pre-wrap">{company}</h2>
            <p className="text-[clamp(12px,1.1vw,16px)] font-['Helvetica:Light',sans-serif]">{location}</p>
          </div>
          <div className="text-[#e0eedf] overflow-hidden">
            <p className="text-[clamp(12px,1.1vw,16px)] font-['Helvetica:Light_Oblique',sans-serif] italic mb-4">{role}</p>
            <p className="text-[clamp(12px,1.1vw,16px)] font-['Helvetica:Light',sans-serif] leading-relaxed break-words">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="relative">
      <div className="bg-gradient-to-b from-[#0f0f0f] to-[#090909] rounded-xl p-8 min-h-[29vw] h-auto flex flex-col justify-end transition-all duration-300 border border-transparent hover:border-white cursor-pointer" style={{ borderWidth: '1px' }}>
        <p className="text-[clamp(14px,1.6vw,24px)] font-['Helvetica:Light_Oblique',sans-serif] italic text-[#e0eedf] mb-3">{title}</p>
        <p className="text-[clamp(12px,1.1vw,16px)] font-['Helvetica:Light',sans-serif] text-[#e0eedf] leading-relaxed break-words">{description}</p>
      </div>
    </div>
  );
}

function ProjectsSection() {
  return (
    <div className="relative px-6 py-12">
      <div className="max-w-[1512px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ProjectCard 
            title="Terminal Text Editor"
            description="A C-based text editor with core editing functionalities"
          />
          <ProjectCard 
            title="Time Series Forecasting"
            description="Stock prices prediction through time series analysis and deep learning models."
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProjectCard 
            title="Real-Time Trading Backtesting Engine"
            description="Real-time backtesting with built-in risk analytics, and live P&L tracking."
          />
          <ProjectCard 
            title="Terminal Text Editor"
            description="A C-based text editor with core editing functionalities"
          />
        </div>
      </div>
    </div>
  );
}

function CreativeWorkSection() {
  const [isRevealed, setIsRevealed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
          }
        });
      },
      { threshold: 0.6 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const words = ['CREATIVE', 'WORK'];

  return (
    <div className="relative px-6 py-12">
      <div className="max-w-[1512px] mx-auto">
        <div ref={sectionRef} className="relative w-full mb-12">
          <img 
            alt="Creative work" 
            className="w-full h-auto object-cover" 
            src={imgMvi332300084806Still0292} 
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-[clamp(32px,6.3vw,96px)] font-['Helvetica:Light',sans-serif] text-[#e0eedf]">
              {words.map((word, index) => (
                <span
                  key={index}
                  className={`inline-block mr-[0.3em] transition-all duration-700 ease-out ${
                    isRevealed 
                      ? 'opacity-100 blur-0 translate-y-0' 
                      : 'opacity-0 blur-md translate-y-8'
                  }`}
                  style={{
                    transitionDelay: isRevealed ? `${index * 150}ms` : '0ms'
                  }}
                >
                  {word}
                </span>
              ))}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="relative px-6 py-12">
      <div className="max-w-[1512px] mx-auto flex justify-between items-center">
        <p className="text-[clamp(12px,1.1vw,16px)] font-['Helvetica:Light',sans-serif] text-[#e0eedf]">THANK YOU FOR VIEWING</p>
        <p className="text-[clamp(12px,1.1vw,16px)] font-['Helvetica:Light',sans-serif] text-[#e0eedf]">L0MINOUS.GITHUB.IO</p>
      </div>
    </div>
  );
}

export default function App() {
  const projectsRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen w-full bg-black" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 100%)" }}>
      {/* Hero Section with Background */}
      <div className="relative w-full min-h-[51vw] h-auto">
        {/* Hero Image */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img 
            alt="Hero" 
            className="w-full h-full object-cover" 
            src={imgLayer19Copy21} 
          />
        </div>
        
        {/* Header overlaid on hero image */}
        <div className="relative z-10">
          <Header projectsRef={projectsRef} />
        </div>
      </div>

      <QuoteSection />

      <div className="relative">
        <ExperienceCard 
          company="AMAZON WEB SERVICES"
          location="Vancouver, BC"
          role="Software Development Engineer Intern"
          description="Contributed to the AWS Toolkit for VS Code by migrating Step Functions console capabilities into the extension, enabling developers to start local executions and inspect state machine details locally inside VS Code. Associated with a 4× increase in hourly usage."
          image={imgGroup132}
          index={0}
        />

        <ExperienceCard 
          company={`TRANSFORM\nVENTURE\nCAPITAL`}
          location="San Francisco, CA"
          role="Analyst Intern"
          description="Worked closely with founders across sectors, leading due diligence through founder interviews, market sizing, competitive analysis. Automated deal evaluation with Python/SQL and refreshed the website. Supported fundraising growing AUM to ~$35M."
          image={imgGroup132}
          index={1}
        />

        <ExperienceCard 
          company="SPORTS UP"
          location="Toronto, ON"
          role="Software Developer"
          description="Helped launch a tournament‑organizing iOS app using React Native and Firebase. Integrated ratings and built core features: match booking and results, messaging, and real‑time data sync."
          image={imgGroup132}
          index={2}
        />
      </div>

      <div ref={projectsRef}>
        <ProjectsSection />
      </div>
      <CreativeWorkSection />
      <Footer />
    </div>
  );
}