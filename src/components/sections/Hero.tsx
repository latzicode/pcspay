'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'
import { useEffect } from 'react'
import ScrollCTA from '@/components/ui/ScrollCTA'

export default function Hero() {
  // Gestion de la souris
  const mouseX = useSpring(useMotionValue(0), { damping: 25, stiffness: 300 })
  const mouseY = useSpring(useMotionValue(0), { damping: 25, stiffness: 300 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      
      mouseX.set(-(clientX - centerX) / 20)
      mouseY.set((clientY - centerY) / 20)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section className="relative min-h-[calc(100vh-5rem)] pt-20 md:pt-28 pb-0 flex flex-col">
      {/* Container principal avec padding adaptatif */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Colonne de gauche : Texte */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 pt-16 sm:pt-8 md:pt-0">
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="block">Simplifiez vos</span>
              <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                paiements en Afrique
              </span>
            </motion.h1>

            <motion.p 
              className="text-lg sm:text-xl text-text-muted max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Gérez vos transferts d'argent et paiements de factures en toute simplicité avec PCSPAY
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <a 
                href="/demo"
                className="px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-text rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow"
              >
                Commencer maintenant
              </a>
              <a 
                href="/contact"
                className="px-8 py-4 bg-background-light/30 text-text rounded-full font-medium hover:bg-background-light/40 transition-colors"
              >
                En savoir plus
              </a>
            </motion.div>
          </div>

          {/* Colonne de droite : Image avec animation */}
          <div className="w-full lg:w-1/2 relative" style={{ perspective: 1000 }}>
            <motion.div
              className="relative w-full max-w-lg mx-auto"
              style={{
                transformStyle: "preserve-3d",
                transform: "perspective(1000px)",
                rotateX: mouseY,
                rotateY: mouseX,
              }}
            >
              <div 
                className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl"
                style={{ transform: "translateZ(-100px)" }}
              />
              <Image
                src="/hero-image.png"
                alt="PCSPAY App Interface"
                width={600}
                height={600}
                className="w-full h-auto relative z-10"
                style={{ transform: "translateZ(50px)" }}
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Zone dédiée au CTA de scroll */}
      <div className="w-full bg-gradient-to-t from-background to-transparent mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollCTA />
        </div>
      </div>

      {/* Patterns avec animation CSS pure */}
      <style jsx>{`
        @keyframes fadeInOut1 {
          0%, 100% { opacity: 0.02; }
          50% { opacity: 0; }
        }
        @keyframes fadeInOut2 {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.02; }
        }
        .pattern1 {
          animation: fadeInOut1 4s infinite;
        }
        .pattern2 {
          animation: fadeInOut2 4s infinite;
        }
      `}</style>
    </section>
  )
} 