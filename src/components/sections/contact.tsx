'use client';

import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { SectionTitle } from '@/components/sections/section-title';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/l0minous',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/diler-zaza/',
    icon: Linkedin,
  },
];

const ContactSection = () => {
  return (
    <section id="contact" className="relative w-full bg-background py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <SectionTitle className="text-4xl font-semibold tracking-tight text-primary sm:text-5xl">Get In Touch</SectionTitle>
          <p className="mt-4 text-base sm:text-lg leading-7 text-muted-foreground">
            Open to software engineering opportunities, internships, and collaborative projects. Let&apos;s connect and
            build something impactful together.
          </p>
        </div>

        <div className="mx-auto max-w-3xl flex flex-col items-center text-center gap-6">
          <a
            href="mailto:diler.zaza@mail.utoronto.ca"
            className="inline-flex items-center gap-3 text-lg font-medium text-foreground transition-colors hover:text-primary group"
          >
            <Mail className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
            <span>diler.zaza@mail.utoronto.ca</span>
          </a>

          <div className="flex items-center gap-6 pt-2">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label={`My ${social.name} profile`}
              >
                <social.icon className="h-6 w-6" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* subtle glass glow */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(45%_45%_at_50%_50%,black,transparent)] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.06),transparent_60%)]" />
    </section>
  );
};

export default ContactSection;