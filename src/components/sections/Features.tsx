'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const features = [
  {
    title: 'Paiement rapide',
    description: 'Effectuez vos paiements en quelques secondes avec notre interface intuitive.',
    icon: '⚡',
  },
  {
    title: 'Sécurité maximale',
    description: 'Vos transactions sont protégées par les dernières technologies de sécurité.',
    icon: '🔒',
  },
  {
    title: 'Support 24/7',
    description: 'Notre équipe est disponible à tout moment pour vous aider.',
    icon: '📞',
  },
]

const cardVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 },
  },
}

export default function Features() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-background-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Les avantages
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              MY DIASPO
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-text-muted max-w-2xl mx-auto"
          >
            Découvrez les fonctionnalités qui rendent notre service unique
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-primary/5 via-accent/10 to-primary/15 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-primary/10"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent text-white text-2xl mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                {feature.title}
              </h3>
              <p className="text-text-muted">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 