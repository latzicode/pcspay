'use client'

import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const testimonials = [
  {
    content: "PCSPAY a révolutionné la façon dont je gère mes paiements. Le service est rapide, fiable et vraiment pratique !",
    author: "Aminata D.",
    role: "Développeuse Web à Paris",
    image: "/testimonials/avatar1.png",
    rating: 5,
    location: "🇫🇷 France",
  },
  {
    content: "Grâce à PCSPAY, je peux facilement payer les factures de ma famille au Mali. C'est un vrai gain de temps !",
    author: "Ibrahim K.",
    role: "Ingénieur à Londres",
    image: "/testimonials/avatar2.png",
    rating: 5,
    location: "🇬🇧 Royaume-Uni",
  },
  {
    content: "Le service client de PCSPAY est exceptionnel. Ils sont toujours là pour nous aider et les tarifs sont transparents.",
    author: "Michelle O.",
    role: "Médecin à Montréal",
    image: "/testimonials/avatar3.png",
    rating: 5,
    location: "🇨🇦 Canada",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => (prev + newDirection + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Ce que disent nos utilisateurs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            Découvrez les expériences de notre communauté internationale
          </motion.p>
        </div>

        <div className="relative h-[500px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(_: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
                const swipe = swipePower(offset.x, velocity.x)

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1)
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1)
                }
              }}
              className="absolute w-full"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mx-auto max-w-4xl">
                <div className="flex flex-col items-center">
                  <div className="relative w-20 h-20 mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-lg opacity-50" />
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white dark:border-gray-700">
                      <Image
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].author}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="text-yellow-400 text-2xl"
                      >
                        ⭐
                      </motion.span>
                    ))}
                  </div>

                  <blockquote className="text-xl text-gray-900 dark:text-white text-center mb-6">
                    "{testimonials[currentIndex].content}"
                  </blockquote>

                  <div className="text-center">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonials[currentIndex].author}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonials[currentIndex].role}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                      {testimonials[currentIndex].location}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(-1)}
              className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg backdrop-blur-sm pointer-events-auto"
            >
              <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(1)}
              className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg backdrop-blur-sm pointer-events-auto"
            >
              <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
              }}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex
                  ? 'bg-primary'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
} 