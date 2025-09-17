'use client'

import React from 'react'
import { motion } from 'framer-motion'

type SectionTitleProps = {
  className?: string
  children: React.ReactNode
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ className = '', children }) => {
  return (
    <motion.h2
      className={className}
      initial={{ opacity: 0, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.h2>
  )
}