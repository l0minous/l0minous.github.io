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

function Header({ onOpenCreativeWork }: { onOpenCreativeWork: () => void }) {
  const isMobile = useIsMobile();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);

  // Refs for measuring text and cell bounds
  const headerContainerRef = useRef<HTMLDivElement>(null);
  const githubSpanRef = useRef<HTMLSpanElement>(null);
  const githubCellRef = useRef<HTMLDivElement>(null);
  const universitySpanRef = useRef<HTMLSpanElement>(null);
  const universityCellRef = useRef<HTMLDivElement>(null);
  const playgroundSpanRef = useRef<HTMLSpanElement>(null);
  const playgroundCellRef = useRef<HTMLDivElement>(null);
  const creativeWorkSpanRef = useRef<HTMLSpanElement>(null);
  const creativeWorkCellRef = useRef<HTMLDivElement>(null);
  const seSpanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const renderGlitchText = (text: string) => text;

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

  return (
    <div className="relative font-['Helvetica:Light',sans-serif] text-black px-6 py-12 overflow-hidden">
      <div ref={headerContainerRef} className="max-w-[1512px] mx-auto">
        <h1 className="mb-8" style={{ fontSize: 'clamp(0.875rem, 1.1vw, 18px)' }}>{renderGlitchText('DILER ZAZA')}</h1>
        <p className={`${isMobile ? '' : 'text-right whitespace-pre-wrap'} mb-12`} style={{ fontSize: 'clamp(0.875rem, 1.1vw, 18px)' }}>
          <span ref={seSpanRef} className="inline-block">
            {isMobile ? '' : '    '}{renderGlitchText('SOFTWARE ENGINEER')}
          </span>
          <span className="inline-block">
            {isMobile ? '\u00A0&\u00A0' : '                            &               '}
          </span>
          {renderGlitchText('DESIGNER')}
        </p>
        
        <div className="grid grid-cols-2 gap-8 mb-12" style={isMobile ? { gridTemplateColumns: '1fr', gap: '0.75rem' } : undefined}>
          <div ref={githubCellRef} style={{ fontSize: 'clamp(0.875rem, 1.1vw, 18px)' }}>
            <a
              href="https://github.com/l0minous"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 block header-hover-accent"
            >
              <span ref={githubSpanRef}>{renderGlitchText('GITHUB')}</span>
            </a>
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
              className="mb-2 block header-hover-accent"
            >
              {renderGlitchText('PHOTOGRAPHY')}
            </a>
          </div>
          <div style={{ fontSize: 'clamp(0.875rem, 1.1vw, 18px)' }}>
            <a
              href="https://www.instagram.com/_lookoverme/"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 block header-hover-accent"
            >
              {renderGlitchText('FASHION')}
            </a>
          </div>
          <div ref={creativeWorkCellRef} style={{ fontSize: 'clamp(0.875rem, 1.1vw, 18px)' }}>
            <p
              onClick={onOpenCreativeWork}
              className="mb-2 block cursor-pointer header-hover-accent"
              style={{ fontSize: 'inherit' }}
            >
              <span ref={creativeWorkSpanRef}>{renderGlitchText('CREATIVE WORK')}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8" style={isMobile ? { gridTemplateColumns: '1fr', gap: '0.75rem' } : undefined}>
          <div ref={universityCellRef}>
            <p
              className="mb-1"
              style={{
                fontSize: 'clamp(0.875rem, 1.1vw, 18px)',
              }}
            >
              <span ref={universitySpanRef}>{renderGlitchText('UNIVERSITY OF TORONTO')}</span>
            </p>
            <p className="header-hover-accent" style={{ fontSize: 'clamp(0.875rem, 1.1vw, 18px)' }}>{renderGlitchText('DILER.ZAZA@MAIL.UTORONTO.CA')}</p>
          </div>
          <div ref={playgroundCellRef} style={{ fontSize: 'clamp(0.875rem, 1.1vw, 18px)', textAlign: isMobile ? 'left' : 'right' }}>
            <p
              onClick={() => setIsPlaygroundOpen(true)}
              className="playground-label cursor-pointer"
              style={{
                fontSize: 'clamp(0.875rem, 1.1vw, 18px)',
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
        <p className="text-black font-['Helvetica:Light',sans-serif] text-center" style={{ fontSize: 'clamp(1.5rem, 3.2vw, 48px)', padding: isMobile ? '0 0.5rem' : '0 3rem' }}>
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
    <div
      className="sticky top-0 w-full overflow-hidden"
      style={{
        zIndex: 10 + index,
        height: isMobile ? 'auto' : '100vh',
        minHeight: isMobile ? '350px' : '100vh',
        paddingBottom: isMobile ? '2rem' : undefined,
        backgroundImage:
          'linear-gradient(90deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.05) 100%), linear-gradient(90deg, rgb(221, 222, 206) 0%, rgb(221, 222, 206) 100%)',
      }}
    >
      {/* Text Content */}
      <div className="relative z-10 px-6 pt-8 h-full">
        <div className="max-w-[1512px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          <div className="text-black overflow-hidden">
            <h2 
              className="font-['Helvetica:Light',sans-serif] leading-tight mb-4 whitespace-pre-wrap overflow-hidden break-words"
              style={{ fontSize: 'clamp(2rem, 6.3vw, 95px)' }}
            >{company}</h2>
            <p 
              className="font-['Helvetica:Light',sans-serif]"
              style={{ fontSize: 'clamp(0.875rem, 1.1vw, 18px)' }}
            >{location}</p>
          </div>
          <div className="text-black">
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
        color: '#000000',
        fontSize: '16px',
        marginBottom: '8px'
      }}>
        {title}
      </h3>
      {/* Description */}
      <p style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        color: 'rgba(0,0,0,0.7)',
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
          color: '#000000',
          fontSize: '14px',
          textDecoration: 'none',
          marginBottom: '16px'
        }}
      >
        {linkText}
      </a>
      {/* Image placeholder box */}
      <div style={{
        backgroundColor: 'rgba(0,0,0,0.08)',
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
          className="relative mb-12 bg-[#DDDECE] cursor-pointer overflow-hidden"
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

          {/* Click Overlay (text removed) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              aria-label="Open creative work"
              onClick={onOpen}
              className="absolute inset-0"
              style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
            />
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
        <p className="font-['Helvetica:Light',sans-serif] text-black" style={{ fontSize: 'clamp(0.875rem, 1.1vw, 18px)' }}>THANK YOU FOR VIEWING</p>
        <p className="font-['Helvetica:Light',sans-serif] text-black" style={{ fontSize: 'clamp(0.875rem, 1.1vw, 18px)' }}>L0MINOUS.GITHUB.IO</p>
      </div>
    </div>
  );
}

export default function App() {
  const [showCreativeWork, setShowCreativeWork] = useState(false);

  if (showCreativeWork) {
    return <CreativeWorkPage onBack={() => setShowCreativeWork(false)} />;
  }

  return (
    <div
      className="min-h-screen w-full bg-[#DDDECE] text-black"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.05) 100%), linear-gradient(90deg, rgb(221, 222, 206) 0%, rgb(221, 222, 206) 100%)",
      }}
    >
      {/* Hero Section */}
      <div className="relative w-full mb-20">
        <Header onOpenCreativeWork={() => setShowCreativeWork(true)} />
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

      <CreativeWorkSection onOpen={() => setShowCreativeWork(true)} />
      <Footer />
    </div>
  );
}