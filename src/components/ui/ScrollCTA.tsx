'use client'

import { motion } from 'framer-motion'

export default function ScrollCTA() {
  return (
    <motion.div 
      className="flex flex-col items-center gap-4 py-8 relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
    >
      <span className="text-text-muted text-lg font-medium text-center">
        Découvrez nos pays partenaires
      </span>
      
      {/* Souris animée */}
      <motion.div 
        className="w-6 h-10 border-2 border-text-muted rounded-full p-1 hidden sm:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.div 
          className="w-1.5 h-1.5 bg-primary rounded-full mx-auto"
          animate={{ 
            y: [0, 12, 0],
            opacity: [1, 0.5, 1]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Flèche qui pulse */}
      <motion.div
        className="text-text-muted text-2xl"
        animate={{ 
          y: [0, 4, 0],
          opacity: [1, 0.5, 1]
        }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2
        }}
      >
        ↓
      </motion.div>
    </motion.div>
  )
} 