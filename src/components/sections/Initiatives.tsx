'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useVisuals } from '../../contexts/VisualContext'

const initiatives = [
  {
    title: "Construction d'un Puits",
    description: "Offrez à un village l'accès à l'eau potable. En soutenant ce projet, vous réduisez les maladies et facilitez la vie quotidienne des familles. Ensemble, rendons l'eau accessible à tous.",
    image: "/initiative/puit.png",
    gradient: "from-blue-500/80 to-blue-600/80",
    delay: 0.2
  },
  {
    title: "Financement d'un Orphelinat",
    description: "Aidez à créer un foyer pour les enfants sans famille. Votre soutien leur offre un toit, une éducation et une chance de rêver d'un avenir meilleur.",
    image: "/initiative/orphelinat.png",
    gradient: "from-primary/80 to-accent/80",
    delay: 0.4
  },
  {
    title: "Contribuez à la construction d'un Terrain de Foot",
    description: "Faites du sport un moteur de changement. En finançant ce terrain, vous donnez aux jeunes un espace sûr pour se rassembler, jouer et grandir.",
    image: "/initiative/footballfield.png",
    gradient: "from-green-500/80 to-green-600/80",
    delay: 0.6
  }
]

export default function Initiatives() {
  const containerRef = useRef(null)
  const { theme } = useTheme()
  const { getBackgroundStyle } = useVisuals()
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background avec pattern et gradients */}
      <div className="absolute inset-0 -z-10">
        {/* Pattern avec fondu */}
        <div 
          className="absolute inset-0"
          style={{
            ...getBackgroundStyle('pattern2'),
            opacity: theme === 'dark' ? 0.3 : 0.4,
            maskImage: `linear-gradient(to bottom, 
              transparent 0%, 
              black 15%, 
              black 85%, 
              transparent 100%
            )`,
            WebkitMaskImage: `linear-gradient(to bottom, 
              transparent 0%, 
              black 15%, 
              black 85%, 
              transparent 100%
            )`
          }}
        />

        {/* Gradients */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(255,107,44,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_-20%,rgba(255,107,44,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,rgba(255,215,0,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_120%,rgba(255,215,0,0.1),transparent_50%)]" />
        </div>

        {/* Overlay de base */}
        <div 
          className="absolute inset-0 transition-colors duration-300"
          style={{
            background: theme === 'dark' 
              ? 'rgba(15,23,42,0.85)'
              : 'rgba(253,251,247,0.85)'
          }}
        />
      </div>

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ y }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ y: 30 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Initiatives
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              MY DIASPO
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-text-muted max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Ensemble, construisons un avenir meilleur pour l'Afrique
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initiatives.map((initiative, index) => (
            <motion.div
              key={initiative.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: initiative.delay }}
              className="group relative"
            >
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <Image
                  src={initiative.image}
                  alt={initiative.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${initiative.gradient} opacity-60 transition-opacity duration-300 group-hover:opacity-70`} />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {initiative.title}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {initiative.description}
                  </p>
                </div>
              </div>

              <motion.div 
                className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: theme === 'dark' 
                    ? 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)'
                    : 'radial-gradient(circle at center, rgba(0,0,0,0.1) 0%, transparent 70%)'
                }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <a 
            href="/initiatives"
            className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Découvrir toutes nos initiatives
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
} 