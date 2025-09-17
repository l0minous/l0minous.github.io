'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AboutFadeGroupProps {
  children: React.ReactNode;
}

// Wraps content and fades each child in on first viewport entry
export const AboutFadeGroup: React.FC<AboutFadeGroupProps> = ({ children }) => {
  const items = React.Children.toArray(children);

  return (
    <motion.div
      className="md:col-span-2 space-y-6"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 1 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.15 },
        },
      }}
    >
      {items.map((child, idx) => (
        <motion.div
          key={idx}
          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};