'use client'

import { useVisuals } from '@/contexts/VisualContext'
import { motion } from 'framer-motion'

interface SectionProps {
  backgroundType: 'hero' | 'story' | 'pattern1' | 'pattern2' | 'pattern3' | 'pattern4'
  children: React.ReactNode
  className?: string
}

export default function Section({ backgroundType, children, className = '' }: SectionProps) {
  const { getSectionStyle } = useVisuals()

  return (
    <section className={`relative overflow-hidden ${className}`}>
      <motion.div 
        className="absolute inset-0 -z-10 transition-colors duration-300"
        style={getSectionStyle(backgroundType)}
      />
      {children}
    </section>
  )
}