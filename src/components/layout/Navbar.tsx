'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const navigation = [
  { name: 'Services', href: '/services' },
  { name: 'Tarifs', href: '/pricing' },
  { name: 'À propos', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [shake, setShake] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const interval = setInterval(() => {
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Fond avec effets */}
      <div className="absolute inset-0 bg-background/40 backdrop-blur-md" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,107,44,0.1),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,215,0,0.1),transparent_60%)]" />
      </div>
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="container mx-auto px-4 py-3 relative">
        <div className="flex items-center justify-between">
          {/* Logo et titre */}
          <div className="flex items-center gap-5">
            <Link href="/" className="block -mt-2">
              <motion.div
                animate={shake ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, -10, 10, -10, 0],
                } : {}}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut"
                }}
                className="relative w-20 h-20"
                whileHover={{ scale: 1.15 }}
                style={{
                  animation: !shake ? 'breathing 3s ease-in-out infinite' : 'none'
                }}
              >
                <style jsx global>{`
                  @keyframes breathing {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.08); }
                  }
                  @keyframes glow {
                    0%, 100% { box-shadow: 0 0 15px rgba(255,107,44,0.3); }
                    50% { box-shadow: 0 0 25px rgba(255,107,44,0.5); }
                  }
                `}</style>
                <Image
                  src="/logo.png"
                  alt="PCSPAY Logo"
                  width={80}
                  height={80}
                  className="w-20 h-20"
                  style={{ 
                    objectFit: 'contain',
                  }}
                  priority
                />
              </motion.div>
            </Link>
            <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent [text-shadow:0_2px_10px_rgba(255,107,44,0.2)]">
              PCSPAY
            </span>
          </div>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center gap-8 ml-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-text/90 hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Bouton Menu Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text p-2"
            >
              {!isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

          {/* Bouton Commencer Desktop */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-8 py-3 rounded-full font-medium overflow-hidden group shadow-lg hidden md:block"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-accent/90 to-primary/90 bg-size-200 bg-pos-0 group-hover:bg-pos-100 transition-all duration-500"></div>
            <span className="relative text-text font-semibold">
              Commencer
            </span>
          </motion.button>
        </div>

        {/* Menu Mobile */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-4 pb-3 space-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-text/90 hover:text-primary transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
                {/* Bouton Commencer Mobile */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="relative w-full px-8 py-3 mt-4 rounded-full font-medium overflow-hidden group shadow-lg"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-accent/90 to-primary/90 bg-size-200 bg-pos-0 group-hover:bg-pos-100 transition-all duration-500"></div>
                  <span className="relative text-text font-semibold">
                    Commencer
                  </span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
} 