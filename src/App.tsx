import { useState, useEffect, useRef } from 'react';
import { MacPaintApp } from './components/playground/MacPaintApp';
import { CreativeWorkPage } from './components/creative-work/CreativeWorkPage';

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener('change', handler);
  }, [breakpoint]);
  return isMobile;
}

function Header({ projectsRef, onOpenCreativeWork }: { projectsRef: React.RefObject<HTMLDivElement>; onOpenCreativeWork: () => void }) {
  const isMobile = useIsMobile();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [glitchMap, setGlitchMap] = useState<Map<string, string>>(new Map());
  const [isProjectsSliding, setIsProjectsSliding] = useState(false);
  const [isSoftwareEngineerSliding, setIsSoftwareEngineerSliding] = useState(false);
  const [isGithubSliding, setIsGithubSliding] = useState(false);
  const [isUniversitySliding, setIsUniversitySliding] = useState(false);
  const [isCreativeWorkSliding, setIsCreativeWorkSliding] = useState(false);
  const [isAmpersandSliding, setIsAmpersandSliding] = useState(false);
  const [isPlaygroundSliding, setIsPlaygroundSliding] = useState(false);
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);

  // Refs for measuring text and cell bounds
  const headerContainerRef = useRef<HTMLDivElement>(null);
  const githubSpanRef = useRef<HTMLSpanElement>(null);
  const githubCellRef = useRef<HTMLDivElement>(null);
  const projectsSpanRef = useRef<HTMLSpanElement>(null);
  const projectsCellRef = useRef<HTMLDivElement>(null);
  const universitySpanRef = useRef<HTMLSpanElement>(null);
  const universityCellRef = useRef<HTMLDivElement>(null);
  const playgroundSpanRef = useRef<HTMLSpanElement>(null);
  const playgroundCellRef = useRef<HTMLDivElement>(null);
  const creativeWorkSpanRef = useRef<HTMLSpanElement>(null);
  const creativeWorkCellRef = useRef<HTMLDivElement>(null);
  const seSpanRef = useRef<HTMLSpanElement>(null);

  const [safeOffsets, setSafeOffsets] = useState({
    github: 120,
    projects: 180,
    university: 200,
    playground: 120,
    creativeWork: 120,
    softwareEngineer: 250,
    ampersand: 200,
  });

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
      'CREATIVE WORK',
      'UNIVERSITY OF TORONTO',
      'DILER.ZAZA@MAIL.UTORONTO.CA',
      'PLAYGROUND'
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
      setIsCreativeWorkSliding(true);
      
      setTimeout(() => {
        setIsCreativeWorkSliding(false);
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

  useEffect(() => {
    const triggerSlide = () => {
      setIsPlaygroundSliding(true);

      setTimeout(() => {
        setIsPlaygroundSliding(false);
      }, 5000);
    };

    // Random interval between 9-26 seconds
    const scheduleNextSlide = () => {
      const delay = 9000 + Math.random() * 17000;
      return setTimeout(() => {
        triggerSlide();
        scheduleNextSlide();
      }, delay);
    };

    const timeout = scheduleNextSlide();

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const compute = () => {
      const gap = 4;
      const maxRight = (span: HTMLElement | null, cell: HTMLElement | null, desired: number) => {
        if (!span || !cell) return desired;
        return Math.max(0, Math.min(desired, cell.getBoundingClientRect().right - span.getBoundingClientRect().right - gap));
      };
      const maxLeft = (span: HTMLElement | null, cell: HTMLElement | null, desired: number) => {
        if (!span || !cell) return desired;
        return Math.max(0, Math.min(desired, span.getBoundingClientRect().left - cell.getBoundingClientRect().left - gap));
      };

      const mobile = window.innerWidth < 768;
      const o = {
        github: maxRight(githubSpanRef.current, githubCellRef.current, mobile ? 40 : 120),
        projects: maxRight(projectsSpanRef.current, projectsCellRef.current, mobile ? 60 : 180),
        university: maxRight(universitySpanRef.current, universityCellRef.current, mobile ? 60 : 200),
        playground: maxLeft(playgroundSpanRef.current, playgroundCellRef.current, mobile ? 40 : 120),
        creativeWork: maxRight(creativeWorkSpanRef.current, creativeWorkCellRef.current, mobile ? 40 : 120),
        softwareEngineer: maxLeft(seSpanRef.current, headerContainerRef.current, mobile ? 80 : 250),
        ampersand: mobile ? 80 : 200,
      };
      o.ampersand = Math.min(mobile ? 80 : 200, o.softwareEngineer);
      setSafeOffsets(o);
    };

    requestAnimationFrame(compute);
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
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
      <div ref={headerContainerRef} className="max-w-[1512px] mx-auto">
        <h1 className="mb-8" style={{ fontSize: 'clamp(0.875rem, 1.1vw, 18px)' }}>{renderGlitchText('DILER ZAZA')}</h1>
        <p className={`${isMobile ? '' : 'text-right'} mb-12 whitespace-pre-wrap`} style={{ fontSize: 'clamp(0.875rem, 1.1vw, 18px)' }}>
          <span
            ref={seSpanRef}
            className="inline-block transition-transform duration-[1500ms] ease-in-out"
            style={{ transform: isSoftwareEngineerSliding ? `translateX(-${safeOffsets.softwareEngineer}px)` : 'translateX(0)' }}
          >
            {'    '}{renderGlitchText('SOFTWARE ENGINEER')}
          </span>
          <span
            className="inline-block transition-transform duration-[1500ms] ease-in-out"
            style={{ transform: isAmpersandSliding ? `translateX(-${safeOffsets.ampersand}px)` : 'translateX(0)' }}
          >
            {isMobile ? ' & ' : '                            &               '}
          </span>
          {renderGlitchText('DESIGNER')}
        </p>
        
        <div className="grid grid-cols-3 gap-8 mb-12" style={isMobile ? { gridTemplateColumns: '1fr', gap: '0.75rem' } : undefined}>
          <div ref={githubCellRef} style={{ fontSize: 'clamp(0.875rem, 1.1vw, 18px)' }}>
            <a
              href="https://github.com/l0minous"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 block transition-transform duration-[1500ms] ease-in-out hover:opacity-70"
              style={{ transform: isGithubSliding ? `translateX(${safeOffsets.github}px)` : 'translateX(0)' }}
            >
              <span ref={githubSpanRef}>{renderGlitchText('GITHUB')}</span>
            </a>
          </div>
          <div ref={projectsCellRef} style={{ fontSize: 'clamp(0.875rem, 1.1vw, 18px)' }}>
            <p
              onClick={scrollToProjects}
              className="mb-2 cursor-pointer transition-transform duration-[1500ms] ease-in-out hover:opacity-70"
              style={{ fontSize: 'clamp(0.875rem, 1.1vw, 18px)', transform: isProjectsSliding ? `translateX(${safeOffsets.projects}px)` : 'translateX(0)' }}
            >
              <span ref={projectsSpanRef}>{renderGlitchText('PROJECTS')}</span>
            </p>
          </div>
          <div style={{ fontSize: 'clamp(0.875rem, 1.1vw, 18px)', textAlign: isMobile ? 'left' : 'right' }}>
            <p className="mb-2" style={{ fontSize: 'clamp(0.875rem, 1.1vw, 18px)' }}>{renderGlitchText('TORONTO, CANADA')}</p>
            <p className="mb-1" style={{ fontSize: 'clamp(0.875rem, 1.1vw, 18px)' }}>{formatDate(currentTime)}</p>
            <p style={{ fontSize: 'clamp(0.875rem, 1.1vw, 18px)' }}>{formatTime(currentTime)}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 mb-12" style={isMobile ? { gridTemplateColumns: '1fr', gap: '0.75rem' } : undefined}>
          <div style={{ fontSize: 'clamp(0.875rem, 1.1vw, 18px)' }}>
            <a
              href="https://www.instagram.com/keep_____blinking/"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 block hover:opacity-70"
            >
              {renderGlitchText('PHOTOGRAPHY')}
            </a>
          </div>
          <div style={{ fontSize: 'clamp(0.875rem, 1.1vw, 18px)' }}>
            <a
              href="https://www.instagram.com/_lookoverme/"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 block hover:opacity-70"
            >
              {renderGlitchText('FASHION')}
            </a>
          </div>
          <div ref={creativeWorkCellRef} style={{ fontSize: 'clamp(0.875rem, 1.1vw, 18px)' }}>
            <p
              onClick={onOpenCreativeWork}
              className="mb-2 block cursor-pointer transition-transform duration-[1500ms] ease-in-out hover:opacity-70"
              style={{ transform: isCreativeWorkSliding ? `translateX(${safeOffsets.creativeWork}px)` : 'translateX(0)' }}
            >
              <span ref={creativeWorkSpanRef}>{renderGlitchText('CREATIVE WORK')}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8" style={isMobile ? { gridTemplateColumns: '1fr', gap: '0.75rem' } : undefined}>
          <div ref={universityCellRef}>
            <p
              className="mb-1 transition-transform duration-[1500ms] ease-in-out"
              style={{
                fontSize: 'clamp(0.875rem, 1.1vw, 18px)',
                transform: isUniversitySliding ? `translateX(${safeOffsets.university}px)` : 'translateX(0)'
              }}
            >
              <span ref={universitySpanRef}>{renderGlitchText('UNIVERSITY OF TORONTO')}</span>
            </p>
            <p className="hover:text-[#1F2E32] transition-colors duration-300" style={{ fontSize: 'clamp(0.875rem, 1.1vw, 18px)' }}>{renderGlitchText('DILER.ZAZA@MAIL.UTORONTO.CA')}</p>
          </div>
          <div ref={playgroundCellRef} style={{ fontSize: 'clamp(0.875rem, 1.1vw, 18px)', textAlign: isMobile ? 'left' : 'right' }}>
            <p
              onClick={() => setIsPlaygroundOpen(true)}
              className="playground-label cursor-pointer transition-transform duration-[1500ms] ease-in-out"
              style={{
                fontSize: 'clamp(0.875rem, 1.1vw, 18px)',
                transform: isPlaygroundSliding ? `translateX(-${safeOffsets.playground}px)` : 'translateX(0)',
              }}
            >
              <span ref={playgroundSpanRef}>{renderGlitchText('PLAYGROUND')}</span>
            </p>
          </div>
        </div>
      </div>

      {isPlaygroundOpen && (
        <MacPaintApp onClose={() => setIsPlaygroundOpen(false)} />
      )}
    </div>
  );
}

function QuoteSection() {
  const isMobile = useIsMobile();
  const [revealedCount, setRevealedCount] = useState(0);
  const quoteRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      if (!quoteRef.current) return;
      const rect = quoteRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Reveal starts when section top reaches 70% down the viewport,
      // fully revealed when section top reaches 20% down
      const start = windowH * 0.7;
      const end = windowH * 0.2;
      const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
      const count = Math.round(progress * words.length);
      setRevealedCount(count);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [words.length]);

  return (
    <div ref={quoteRef} className="relative py-20 px-6" style={{ marginTop: isMobile ? '60px' : '175px', marginBottom: isMobile ? '60px' : '149px' }}>
      <div className="max-w-[1512px] mx-auto">
        <p className="text-[#e0eedf] font-['Helvetica:Light',sans-serif] text-center" style={{ fontSize: 'clamp(1.5rem, 3.2vw, 48px)', padding: isMobile ? '0 0.5rem' : '0 3rem' }}>
          {words.map((word, index) => {
            const revealed = index < revealedCount;
            return (
              <span
                key={index}
                className={`inline-block mr-[0.2em] transition-all duration-500 ease-out ${
                  word.italic ? "font-['Austin:Hairline_Italic',sans-serif] italic" : ""
                } ${
                  revealed
                    ? 'opacity-100 blur-0 translate-y-0'
                    : 'opacity-0 blur-md translate-y-8'
                }`}
              >
                {word.text}
              </span>
            );
          })}
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
  index
}: {
  company: string;
  location: string;
  role: string;
  description: string;
  index: number;
}) {
  const isMobile = useIsMobile();
  return (
    <div className="sticky top-0 w-full bg-black" style={{ zIndex: 10 + index, height: isMobile ? 'auto' : 'clamp(400px, 35vw, 600px)', minHeight: isMobile ? '350px' : undefined, paddingBottom: isMobile ? '2rem' : undefined }}>
      {/* Text Content */}
      <div className="relative z-10 px-6 pt-8 h-full">
        <div className="max-w-[1512px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          <div className="text-[#e0eedf] overflow-hidden">
            <h2 
              className="font-['Helvetica:Light',sans-serif] leading-tight mb-4 whitespace-pre-wrap overflow-hidden break-words"
              style={{ fontSize: 'clamp(2rem, 6.3vw, 95px)' }}
            >{company}</h2>
            <p 
              className="font-['Helvetica:Light',sans-serif]"
              style={{ fontSize: 'clamp(0.875rem, 1.1vw, 18px)' }}
            >{location}</p>
          </div>
          <div className="text-[#e0eedf]">
            <p 
              className="font-['Helvetica:Light_Oblique',sans-serif] italic mb-4"
              style={{ fontSize: 'clamp(0.875rem, 1.1vw, 18px)' }}
            >{role}</p>
            <p 
              className="font-['Helvetica:Light',sans-serif] leading-relaxed"
              style={{ fontSize: 'clamp(0.875rem, 1.1vw, 18px)' }}
            >{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ title, description, link, linkText }: { title: string; description: string; link: string; linkText: string }) {
  const isMobile = useIsMobile();
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Title */}
      <h3 style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontWeight: 600,
        color: '#ffffff',
        fontSize: '16px',
        marginBottom: '8px'
      }}>
        {title}
      </h3>
      {/* Description */}
      <p style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        color: 'rgba(255,255,255,0.6)',
        fontSize: '14px',
        marginBottom: '12px',
        lineHeight: 1.4
      }}>
        {description}
      </p>
      {/* Link */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: '#ffffff',
          fontSize: '14px',
          textDecoration: 'none',
          marginBottom: '16px'
        }}
      >
        {linkText}
      </a>
      {/* Image placeholder box */}
      <div style={{
        backgroundColor: '#1a1a1a',
        borderRadius: '8px',
        height: isMobile ? '200px' : '280px',
        width: '100%'
      }}>
        {/* Images will go here */}
      </div>
    </div>
  );
}

function ProjectsSection() {
  const isMobile = useIsMobile();
  return (
    <div style={{ padding: '48px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? '32px' : '16px'
        }}>
          <ProjectCard
            title="Terminal Text Editor"
            description="A C-based text editor with core editing functionalities."
            link="https://github.com/l0minous"
            linkText="Learn more →"
          />
          <ProjectCard
            title="Time Series Forecasting"
            description="Stock prediction through deep learning models."
            link="https://github.com/l0minous"
            linkText="Learn more →"
          />
          <ProjectCard
            title="Backtesting Engine"
            description="Real-time backtesting with risk analytics."
            link="https://github.com/l0minous"
            linkText="Learn more →"
          />
        </div>
      </div>
    </div>
  );
}

function CreativeWorkSection({ onOpen }: { onOpen: () => void }) {
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);

  const words = ['CREATIVE', 'WORK'];
  const showText = isMobile || isHovered;

  return (
    <div className="relative py-12" style={{ padding: isMobile ? '3rem 16px' : undefined, paddingLeft: isMobile ? '16px' : '5rem', paddingRight: isMobile ? '16px' : '5rem' }}>
      <div className="max-w-[1512px] mx-auto flex justify-center items-center">
        <div
          className="relative mb-12 bg-black cursor-pointer overflow-hidden"
          style={{
            width: isMobile ? '100%' : '1100px',
            height: isMobile ? `min(56.25vw, 300px)` : '619px',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Video Background */}
          <iframe
            src="https://www.youtube.com/embed/LX6S7IWIV2Q?autoplay=1&mute=1&loop=1&playlist=LX6S7IWIV2Q&controls=0&showinfo=0&rel=0&modestbranding=1&disablekb=1&iv_load_policy=3&vq=hd1080&hd=1"
            style={{
              width: isMobile ? '177.78%' : '1300px',
              height: isMobile ? '177.78%' : '800px',
              maxWidth: 'none',
              border: 'none',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none'
            }}
            allow="autoplay; encrypted-media"
          />

          {/* Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={onOpen}
              className="font-['Helvetica',sans-serif] font-bold text-[#e0eedf]"
              style={{ fontSize: 'clamp(2rem, 6.3vw, 95px)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {words.map((word, index) => (
                <span
                  key={index}
                  className={`inline-block mr-[0.3em] transition-all duration-700 ease-out ${
                    showText
                      ? 'opacity-100 blur-0 translate-y-0'
                      : 'opacity-0 blur-md translate-y-8'
                  }`}
                  style={{
                    transitionDelay: showText ? `${index * 150}ms` : '0ms'
                  }}
                >
                  {word}
                </span>
              ))}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const isMobile = useIsMobile();
  return (
    <div className="relative px-6 py-12">
      <div className="max-w-[1512px] mx-auto flex justify-between items-center" style={isMobile ? { flexDirection: 'column', gap: '0.5rem', textAlign: 'center' } : undefined}>
        <p className="font-['Helvetica:Light',sans-serif] text-[#e0eedf]" style={{ fontSize: 'clamp(0.875rem, 1.1vw, 18px)' }}>THANK YOU FOR VIEWING</p>
        <p className="font-['Helvetica:Light',sans-serif] text-[#e0eedf]" style={{ fontSize: 'clamp(0.875rem, 1.1vw, 18px)' }}>L0MINOUS.GITHUB.IO</p>
      </div>
    </div>
  );
}

export default function App() {
  const projectsRef = useRef<HTMLDivElement>(null);
  const [showCreativeWork, setShowCreativeWork] = useState(false);

  if (showCreativeWork) {
    return <CreativeWorkPage onBack={() => setShowCreativeWork(false)} />;
  }

  return (
    <div className="min-h-screen w-full bg-black" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 100%)" }}>
      {/* Hero Section */}
      <div className="relative w-full mb-20">
        <Header projectsRef={projectsRef} onOpenCreativeWork={() => setShowCreativeWork(true)} />
      </div>

      <QuoteSection />

      <div className="relative">
        <ExperienceCard 
          company="AMAZON WEB SERVICES"
          location="Vancouver, BC"
          role="Software Development Engineer Intern"
          description="Contributed to the AWS Toolkit for VS Code by migrating Step Functions console capabilities into the extension, enabling developers to start local executions and inspect state machine details locally inside VS Code. Associated with a 4× increase in hourly usage."
          index={0}
        />

        <ExperienceCard 
          company={`TRANSFORM\nVC`}
          location="San Francisco, CA"
          role="Analyst Intern"
          description="Worked closely with founders across sectors, leading due diligence through founder interviews, market sizing, competitive analysis. Automated deal evaluation with Python/SQL and refreshed the website. Supported fundraising growing AUM to ~$35M."
          index={1}
        />

        <ExperienceCard 
          company="SPORTS UP"
          location="Toronto, ON"
          role="Software Developer"
          description="Helped launch a tournament‑organizing iOS app using React Native and Firebase. Integrated ratings and built core features: match booking and results, messaging, and real‑time data sync."
          index={2}
        />
      </div>

      <div ref={projectsRef}>
        <ProjectsSection />
      </div>
      <CreativeWorkSection onOpen={() => setShowCreativeWork(true)} />
      <Footer />
    </div>
  );
}