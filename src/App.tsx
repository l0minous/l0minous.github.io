import { useState, useEffect, useRef } from 'react';
import { MacPaintApp } from './components/playground/MacPaintApp';
import { CreativeWorkPage } from './components/creative-work/CreativeWorkPage';
import { prepareGallery } from './components/creative-work/gallery-loader';
import './paper.css';

const experiences = [
  { company: 'ADA CX', location: 'Toronto, ON', role: 'Software Engineer Intern', description: 'Improved multi-step LLM agent reasoning across email and chat, eliminating high-stakes failures in branch execution, response gating, and slot filling. Built per-turn observability into the voice reasoning pipeline with LangSmith distributed tracing, collapsing orphaned model-call spans into a single clean trace per inference turn.' },
  { company: 'SENTRI AI', location: 'Toronto, ON', role: 'AI Engineer Intern', description: 'Built an AI evaluation platform with reviewer UIs and real-time agent reruns, reducing evaluation review time from hours to a single click. Engineered an LLM parsing pipeline improving accuracy from 61.5% to 100% across 10 questionnaire formats, and shipped full-stack automation management features with CosmosDB, FastAPI, and React.' },
  { company: 'AMAZON WEB SERVICES', location: 'Vancouver, BC', role: 'Software Development Engineer Intern', description: 'Contributed to the AWS Toolkit for VS Code by migrating Step Functions console capabilities into the extension, enabling developers to start local executions and inspect state machine details locally inside VS Code. Associated with a 4× increase in hourly usage.' },
  { company: 'TRANSFORM VC', location: 'San Francisco, CA', role: 'Analyst Intern', description: 'Worked closely with founders across sectors, leading due diligence through founder interviews, market sizing, competitive analysis. Automated deal evaluation with Python/SQL and refreshed the website. Supported fundraising growing AUM to ~$35M.' },
  { company: 'SPORTS UP', location: 'Toronto, ON', role: 'Software Developer', description: 'Helped launch a tournament-organizing iOS app using React Native and Firebase. Integrated ratings and built core features: match booking and results, messaging, and real-time data sync.' },
];

function Flourish({ className = '' }: { className?: string }) {
  return <svg className={`paper-flourish ${className}`} aria-hidden="true" viewBox="0 0 600 140" fill="none">
    <path d="M300 38C260 5 218 4 209 31c-14 43 71 43 91 7 20 36 105 36 91-7-9-27-51-26-91 7Zm0 0c-17 77-118 96-163 67-45-29-19-73 10-58 23 12 2 40-15 22M300 38c17 77 118 96 163 67 45-29 19-73-10-58-23 12-2 40 15 22" />
    <path d="M285 60C241 106 193 124 126 109 58 94 54 24 23 38 4 46 18 69 35 56M315 60c44 46 92 64 159 49 68-15 72-85 103-71 19 8 5 31-12 18M196 102c-17 35-59 41-69 19-11-26 32-26 34-7m243-12c17 35 59 41 69 19 11-26-32-26-34-7M270 96c-18 43 18 54 30 18 12 36 48 25 30-18" />
    <path d="M293 12h14m-7-7v14M80 74l-8 8m448-8 8 8" />
  </svg>;
}

function SheetHeader({ label }: { label: string }) {
  return <div className="sheet-top"><span>Diler Zaza</span><span className="section-label">{label}</span></div>;
}

const torontoTime = new Intl.DateTimeFormat('en-GB', { timeZone: 'America/Toronto', timeStyle: 'medium' });

function TorontoClock() {
  const [time, setTime] = useState(() => torontoTime.format(new Date()));
  useEffect(() => {
    const timer = window.setInterval(() => setTime(torontoTime.format(new Date())), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return <>{time}</>;
}

export default function App() {
  const [showCreativeWork, setShowCreativeWork] = useState(false);
  const [showPlayground, setShowPlayground] = useState(false);
  const stackRef = useRef<HTMLElement>(null);
  const returnScroll = useRef(0);
  const filmRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => { void prepareGallery(); }, 500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const film = filmRef.current;
    if (!film) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) film.play().catch(() => {});
      else film.pause();
    }, { threshold: 0.05 });
    observer.observe(film);
    return () => { observer.disconnect(); film.pause(); };
  }, [showCreativeWork]);

  useEffect(() => {
    if (showCreativeWork) return;
    const stack = stackRef.current;
    if (!stack) return;
    const layers = Array.from(stack.querySelectorAll<HTMLElement>('.sheet-ink'), ink => ({
      ink,
      sheet: ink.parentElement!,
      mask: '',
    }));
    let previousView: {
      width: number;
      height: number;
      scale: number;
      sheetHeight: number;
      progress: number;
      atStart: boolean;
      atEnd: boolean;
    } | undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const root = document.documentElement;
      const width = root.clientWidth;
      const height = root.clientHeight;
      const scale = window.devicePixelRatio;
      const sheetHeight = layers[0].sheet.getBoundingClientRect().height;
      let scroll = window.scrollY;
      const stackTop = stack.getBoundingClientRect().top + scroll;
      const maxScroll = root.scrollHeight - height;
      const resized = previousView && (
        sheetHeight !== previousView.sheetHeight ||
        (height !== previousView.height && (width !== previousView.width || scale !== previousView.scale))
      );
      if (previousView && resized) {
        // A fixed scroll offset can land on another sheet after browser zoom.
        const target = stackTop + previousView.progress * sheetHeight - height / 2;
        window.scrollTo({
          top: previousView.atStart ? 0 : previousView.atEnd ? maxScroll : target,
          behavior: 'instant',
        });
        scroll = window.scrollY;
      }
      previousView = {
        width, height, scale, sheetHeight,
        progress: (scroll + height / 2 - stackTop) / sheetHeight,
        atStart: scroll <= 1,
        atEnd: scroll >= maxScroll - 1,
      };

      // Measure the whole stack before changing any styles.
      const inset = parseFloat(getComputedStyle(layers[0].sheet).top) || 0;
      const bounds = layers.map(({ sheet }) => sheet.getBoundingClientRect());
      layers.forEach((layer, i) => {
        const next = bounds[i + 1];
        if (!next) return;
        const { top, height } = bounds[i];
        const edge = next.top - top;
        const start = edge + height * 0.06;
        // The exposed page needs no mask. Once covered, its fade stays in place.
        const mask = start < height
          ? `linear-gradient(to bottom, #000 ${start}px, rgb(0 0 0 / .28) ${edge + height * 0.30}px)`
          : '';
        if (mask !== layer.mask) {
          layer.ink.style.setProperty('--ink-mask', mask);
          layer.mask = mask;
        }
        const covered = next.top <= inset + 1;
        if (layer.sheet.inert !== covered) layer.sheet.inert = covered;
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [showCreativeWork]);

  const goToSheet = (index: number) => {
    const sheets = Array.from(stackRef.current?.querySelectorAll<HTMLElement>('.paper-sheet') ?? []);
    const target = Math.max(0, Math.min(index, sheets.length - 1));
    const top = sheets.slice(0, target).reduce((height, sheet) => height + sheet.offsetHeight, 0);
    window.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  const openCreative = () => { returnScroll.current = window.scrollY; setShowCreativeWork(true); window.scrollTo(0, 0); };
  const closeCreative = () => {
    setShowCreativeWork(false);
    requestAnimationFrame(() => window.scrollTo(0, returnScroll.current));
  };

  if (showCreativeWork) return <CreativeWorkPage onBack={closeCreative} />;

  return <>
    <svg className="paper-ink-defs" aria-hidden="true" width="0" height="0"><defs>
      <filter id="paper-ink" x="-6%" y="-6%" width="112%" height="112%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.035 0.16" numOctaves="3" seed="13" result="fibres" />
        <feDisplacementMap in="SourceGraphic" in2="fibres" scale="1.15" xChannelSelector="R" yChannelSelector="G" result="printed" />
        <feMorphology in="printed" operator="dilate" radius="0.32" result="spread" />
        <feGaussianBlur in="spread" stdDeviation="0.42" result="soft" />
        <feColorMatrix in="soft" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 .50 0" result="bleed" />
        <feMerge><feMergeNode in="bleed" /><feMergeNode in="printed" /></feMerge>
      </filter>
      <filter id="paper-name-ink" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.07 0.22" numOctaves="2" seed="27" result="fibres" />
        <feDisplacementMap in="SourceGraphic" in2="fibres" scale="0.32" xChannelSelector="R" yChannelSelector="G" result="printed" />
        <feMorphology in="printed" operator="dilate" radius="0.10" result="spread" />
        <feGaussianBlur in="spread" stdDeviation="0.18" result="soft" />
        <feColorMatrix in="soft" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 .24 0" result="bleed" />
        <feMerge><feMergeNode in="bleed" /><feMergeNode in="printed" /></feMerge>
      </filter>
      <filter id="paper-ornament-ink" x="-5%" y="-6%" width="110%" height="112%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.08 0.24" numOctaves="2" seed="11" result="fibres" />
        <feDisplacementMap in="SourceGraphic" in2="fibres" scale="0.28" xChannelSelector="R" yChannelSelector="G" result="printed" />
        <feGaussianBlur in="printed" stdDeviation="0.14" result="soft" />
        <feColorMatrix in="soft" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 .18 0" result="bleed" />
        <feMerge><feMergeNode in="bleed" /><feMergeNode in="printed" /></feMerge>
      </filter>
    </defs></svg>
    <a className="paper-skip" href="#experience" onClick={(e) => { e.preventDefault(); goToSheet(2); }}>Skip to experience</a>
    <main ref={stackRef} className="paper-stack" aria-label="Diler Zaza portfolio">
      <section className="paper-sheet cover-sheet" aria-labelledby="portfolio-title">
        <div className="sheet-ink cover-ink">
          <SheetHeader label="" />
          <div className="cover-meta">
            <span>Software engineer<br />& designer</span>
            <div className="cover-location">
              <span>Toronto, Canada<br /><TorontoClock /></span>
              <div className="cover-contact">
                <span>University of Toronto</span>
                <a href="mailto:zazadiler7@gmail.com">zazadiler7@gmail.com</a>
              </div>
            </div>
          </div>
          <div className="cover-navigation">
            <nav aria-label="Portfolio">
              <button className="nav-experience" onClick={() => goToSheet(2)}>Experience</button>
              <button className="nav-creative" onPointerEnter={() => { void prepareGallery(); }} onFocus={() => { void prepareGallery(); }} onClick={openCreative}>Creative work</button>
              <button className="nav-playground" onClick={() => setShowPlayground(true)}>Playground</button>
              <a className="nav-fashion" href="https://www.instagram.com/_lookoverme/" target="_blank" rel="noopener noreferrer">Fashion</a>
            </nav>
          </div>
          <div className="cover-ghost" aria-hidden="true">A collection<br />of things.</div>
          <div className="cover-title"><h1 id="portfolio-title">Diler Zaza</h1><Flourish /><p>Engineering, images, and everything between.</p></div>
          <nav className="cover-social-links" aria-label="Social profiles">
            <a href="https://github.com/l0minous" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.instagram.com/keep_____blinking/" target="_blank" rel="noopener noreferrer">Photography</a>
          </nav>
        </div>
      </section>
      <section className="paper-sheet quote-sheet" aria-label="Quotation">
        <div className="sheet-ink quote-ink"><SheetHeader label="" />
          <blockquote>Perhaps the misfortune<br className="desktop-break" /> you do not like, leads you<br className="desktop-break" /> to a beautiful destiny<br className="desktop-break" /> that you never dreamed of.</blockquote>
          <Flourish />
        </div>
      </section>
      {experiences.map((item, index) => <section key={item.company} id={index === 0 ? 'experience' : undefined} className={`paper-sheet experience-sheet experience-${index}`} aria-labelledby={`company-${index}`}>
        <div className="sheet-ink experience-ink"><SheetHeader label="Selected experience" />
          <div className="experience-heading"><span className="experience-location">{item.location}</span><h2 id={`company-${index}`}>{item.company}</h2></div>
          <div className="experience-description"><p className="experience-role">{item.role}</p><p>{item.description}</p></div>
          <div className="experience-imprint" aria-hidden="true">{item.company}</div><Flourish />
        </div>
      </section>)}
      <section className="paper-sheet creative-sheet" aria-label="Creative work">
        <div className="sheet-ink creative-ink"><SheetHeader label="" />
          <div className="paper-video">
            <video ref={filmRef} aria-hidden="true" src="/films/portfolio-loop.mp4" muted loop playsInline preload="none" controls={false} disablePictureInPicture disableRemotePlayback controlsList="nodownload nofullscreen noremoteplayback" />
            <div className="closing-note"><span>Thank you for viewing.</span></div>
          </div>
        </div>
      </section>
    </main>
    {showPlayground && <MacPaintApp onClose={() => setShowPlayground(false)} />}
  </>;
}
