'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

interface LeafTransitionProps {
  className?: string
}

export default function LeafTransition({ className = '' }: LeafTransitionProps) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Configuration des feuilles avec 5 de chaque type
  const leaves = [
    // Premier type de feuille
    { src: '/leaves/baobableave.png', initialX: -500 },
    { src: '/leaves/baobableave.png', initialX: -300 },
    { src: '/leaves/baobableave.png', initialX: -100 },
    { src: '/leaves/baobableave.png', initialX: 100 },
    { src: '/leaves/baobableave.png', initialX: 300 },
    // Deuxième type de feuille
    { src: '/leaves/baobableaves2.png', initialX: -400 },
    { src: '/leaves/baobableaves2.png', initialX: -200 },
    { src: '/leaves/baobableaves2.png', initialX: 0 },
    { src: '/leaves/baobableaves2.png', initialX: 200 },
    { src: '/leaves/baobableaves2.png', initialX: 400 },
  ]

  const createLeafTransforms = (initialX: number, index: number) => ({
    x: useTransform(
      scrollYProgress, 
      [0, 1], 
      [initialX, initialX + (index % 2 === 0 ? -300 : 300)]
    ),
    y: useTransform(
      scrollYProgress, 
      [0, 1], 
      [0, -150 - (index * 30)]
    ),
    rotate: useTransform(
      scrollYProgress, 
      [0, 1], 
      [0, (index % 2 === 0 ? -360 : 360)]
    ),
  })

  return (
    <div 
      ref={containerRef} 
      className={`relative h-12 sm:h-16 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 flex items-center justify-center -mt-4">
        {leaves.map((leaf, index) => (
          <motion.div
            key={index}
            style={createLeafTransforms(leaf.initialX, index)}
            className="absolute"
          >
            <Image
              src={leaf.src}
              alt="Leaf decoration"
              width={0}
              height={0}
              sizes="(max-width: 640px) 16px, (max-width: 1024px) 24px, 32px"
              className="w-[16px] sm:w-[24px] lg:w-[32px] h-auto opacity-50 dark:opacity-30"
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}