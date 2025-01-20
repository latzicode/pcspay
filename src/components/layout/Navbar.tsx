'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'

export default function Navbar() {
  const { theme } = useTheme()

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div 
        className="absolute inset-0 backdrop-blur-[2px]"
        style={{
          background: theme === 'dark' 
            ? `radial-gradient(70% 150% at center -40%, rgba(30,41,59,0.8) 0%, rgba(255,107,44,0.1) 100%)`
            : `radial-gradient(70% 150% at center -40%, rgba(255, 192, 120, 0.98) 0%, rgba(248, 215, 229, 0.98) 100%)`
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-b from-black/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-start gap-2 sm:gap-3 group pt-1">
            <motion.div
              className="relative w-12 h-12 sm:w-16 sm:h-16 -mt-1"
              animate={{
                rotate: [0, -35, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                times: [0, 0.05, 1],
                ease: ["circOut", "easeInOut"],
                delay: 1.8
              }}
            >
              <Image
                src="/logor.png"
                alt="MY DIASPO Logo"
                fill
                className="object-contain drop-shadow-lg"
                priority
              />
            </motion.div>

            <div className="flex flex-col relative -ml-1 z-20">
              <div className="overflow-visible h-8 sm:h-10">
                <motion.div
                  animate={{
                    y: [0, -8, -2, -6, -4, -5, -4.5, -5, 0],
                    x: [0, 6, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    times: {
                      y: [0, 0.05, 0.2, 0.4, 0.6, 0.7, 0.8, 0.9, 1],
                      x: [0, 0.05, 1]
                    },
                    ease: ["circOut", "easeInOut"],
                    delay: 1.8
                  }}
                >
                  <motion.span 
                    className="font-display text-lg sm:text-xl md:text-2xl font-bold tracking-tight block"
                    style={{
                      background: 'linear-gradient(to right, #FFC078 0%, #B89F7A 50%, #FFC078 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    MY DIASPO
                  </motion.span>
                </motion.div>
              </div>
              <span 
                className="font-display text-sm sm:text-base md:text-lg font-bold tracking-tight ml-auto -mt-2 relative"
                style={{
                  background: 'linear-gradient(to right, #B89F7A 0%, #FFC078 50%, #B89F7A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  right: '-0.5rem'
                }}
              >
                BY PCS
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            <Link 
              href="/" 
              className="group px-4 py-2 font-display text-sm rounded-full transition-all duration-300
                       bg-gradient-to-r from-primary to-primary/80 
                       text-white shadow-lg hover:shadow-xl flex items-center"
            >
              <span className="inline-flex items-center mr-2 transition-transform duration-300 group-hover:scale-110">
                <svg 
                  className="w-4 h-4"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                  />
                </svg>
              </span>
              Accueil
            </Link>
            <Link 
              href="#services" 
              className="group px-4 py-2 font-display text-sm rounded-full transition-all duration-300
                       bg-gradient-to-r from-primary to-primary/80 
                       text-white shadow-lg hover:shadow-xl flex items-center"
            >
              <span className="inline-flex items-center mr-2 transition-transform duration-300 group-hover:scale-110">
                <svg 
                  className="w-4 h-4"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </span>
              Services
            </Link>
            <Link 
              href="#contact" 
              className="group px-4 py-2 font-display text-sm rounded-full transition-all duration-300
                       bg-gradient-to-r from-primary to-primary/80 
                       text-white shadow-lg hover:shadow-xl flex items-center"
            >
              <span className="inline-flex items-center mr-2 transition-transform duration-300 group-hover:scale-110">
                <svg 
                  className="w-4 h-4"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              Contact
            </Link>
          </div>

          <div className="w-[120px]"></div>
        </div>

      </div>

      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(212,183,143,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_-20%,var(--gradient-start),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_-20%,rgba(248,215,229,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_-20%,var(--gradient-end),transparent_50%)]" />
        <div className="absolute inset-0 backdrop-blur-sm bg-white/80 dark:bg-[#0F172A]/80" />
      </div>
    </header>
  );
} 