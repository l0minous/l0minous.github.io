import React from 'react';
import { AboutFadeGroup } from '@/components/sections/about-fade-group';
import { SectionTitle } from '@/components/sections/section-title';

const AboutSection = () => {
  return (
    <section id="about" className="w-full bg-background py-20 lg:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <SectionTitle className="text-3xl font-bold tracking-tight text-primary sm:text-4xl mb-12">About</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 lg:gap-x-16 gap-y-10">
            {/* Main Content (Left) */}
            {/* convert content to fade-in on first view using Motion without changing overall layout */}
            {/* client-safe wrapper */}
            <AboutFadeGroup>
              <p className="text-base text-muted-foreground leading-relaxed">
                I'm a Computer Science student at the University of Toronto who enjoys turning ideas into polished, performant products. My internships and project work have given me a strong engineering foundation and a practical sense for building things that people actually use.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                At AWS, I worked on developer tooling that lives inside VS Code, while my time at a venture capital firm sharpened my product thinking and understanding of the business side of tech. I love working where engineering, design, and strategy intersect.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                I'm currently deepening my full‑stack focus with an emphasis on front‑end craft, cloud‑native backends, and developer experience.
              </p>

              {/* Fun facts */}
              <div className="pt-2">
                <h3 className="font-semibold text-lg text-primary mb-2">Some fun facts</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>
                    I started and run a clothing brand: <a href="https://www.instagram.com/_lookoverme/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">LOOKOVERME</a>.
                  </li>
                  <li>
                    I also do photography (<a href="https://www.instagram.com/keep_____blinking/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Instagram</a>).
                  </li>
                  <li>
                    I used to do graphic, web, and motion design, collaborating with teams like <a href="https://x.com/misfitsgg" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Misfits Gaming</a>, <a href="https://x.com/flmayhem?lang=en" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Florida Mayhem</a>, and <a href="https://x.com/pubg" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">PUBG</a>. That design background heavily influences my front‑end and brand work today.
                  </li>
                </ul>
              </div>
            </AboutFadeGroup>

            {/* Additional Info (Right) */}
            <div className="space-y-10">
              {/* Photo above education */}
              <div className="w-40 h-40 rounded-full bg-muted mx-auto md:mx-0 overflow-hidden">
                <img
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/IMG_3841-1758087209925.JPG"
                  alt="Diler Zaza headshot"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div>
                <h3 className="font-semibold text-xl text-primary mb-4">Education</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-foreground">University of Toronto</p>
                    <p className="text-sm text-muted-foreground">Bachelor of Science, Computer Science</p>
                    <p className="text-sm text-muted-foreground">Minor in Math &amp; Statistics</p>
                    <p className="text-sm text-muted-foreground">Certificate in Business Fundamentals</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-xl text-primary mb-4">Experience Highlights</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-foreground">Software Development Engineer Intern</p>
                    <p className="text-sm text-muted-foreground">Amazon Web Services (AWS)</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Analyst Intern</p>
                    <p className="text-sm text-muted-foreground">Transform VC</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Front‑end &amp; Branding</p>
                    <p className="text-sm text-muted-foreground">Blending design craft with engineering.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;