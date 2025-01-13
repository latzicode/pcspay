'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function BackButton() {
  const router = useRouter()

  return (
    <motion.button
      onClick={() => router.back()}
      className="fixed top-36 sm:top-24 left-4 sm:left-8 z-40 p-2 sm:p-3 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 shadow-lg transition-all"
      whileHover={{ scale: 1.05, x: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
    >
      <span className="text-lg sm:text-2xl text-primary">←</span>
    </motion.button>
  )
} 