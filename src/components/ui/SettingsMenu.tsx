'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'

export default function SettingsMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  // Éviter le flash pendant l'hydratation
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Bouton principal */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full bg-[var(--primary)] shadow-lg flex items-center justify-center text-[var(--background)]"
      >
        <span className="text-xl">⚙️</span>
      </motion.button>

      {/* Menu déployable */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-16 right-0 bg-[var(--background-light)] rounded-lg shadow-xl p-4 min-w-[200px] border border-[var(--primary)]/10"
          >
            {/* Thème */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-[var(--text-muted)] mb-2">Thème</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setTheme('light')}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    theme === 'light' 
                      ? 'bg-[var(--primary)] text-[var(--background)]' 
                      : 'bg-[var(--primary)]/10 text-[var(--text-muted)] hover:bg-[var(--primary)]/20'
                  }`}
                >
                  ☀️ Clair
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    theme === 'dark' 
                      ? 'bg-[var(--primary)] text-[var(--background)]' 
                      : 'bg-[var(--primary)]/10 text-[var(--text-muted)] hover:bg-[var(--primary)]/20'
                  }`}
                >
                  🌙 Sombre
                </button>
              </div>
            </div>

            {/* Langue */}
            <div>
              <h3 className="text-sm font-medium text-[var(--text-muted)] mb-2">Langue</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => router.push('/fr')}
                  className="px-3 py-1 rounded-full text-sm bg-[var(--primary)]/10 text-[var(--text-muted)] hover:bg-[var(--primary)]/20 transition-colors"
                >
                  🇫🇷 Français
                </button>
                <button
                  onClick={() => router.push('/en')}
                  className="px-3 py-1 rounded-full text-sm bg-[var(--primary)]/10 text-[var(--text-muted)] hover:bg-[var(--primary)]/20 transition-colors"
                >
                  🇬🇧 English
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 