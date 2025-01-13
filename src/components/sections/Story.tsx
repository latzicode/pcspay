'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, animate, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const stats = [
  { value: "500K+", label: "Transactions réussies" },
  { value: "15+", label: "Pays africains connectés" },
  { value: "99.0%", label: "Taux de satisfaction" }
]

export default function Story() {
  const containerRef = useRef(null)
  const numberRefs = useRef([])
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 1080])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -1080])
  const rotate3 = useTransform(scrollYProgress, [0, 1], [0, 2160])

  const [hasAnimated, setHasAnimated] = useState(false)

  const animateNumbers = () => {
    if (hasAnimated) return
    
    numberRefs.current.forEach((ref, index) => {
      const value = stats[index].value
      const num = value.includes('%') 
        ? 99 
        : parseInt(value.replace(/[^0-9]/g, ''))
      
      animate(0, num, {
        duration: 1.5,
        onUpdate: (latest) => {
          if (ref) {
            if (value.includes('K+')) {
              ref.textContent = `${Math.floor(latest)}K+`
            } else if (value.includes('+')) {
              ref.textContent = `${Math.floor(latest)}+`
            } else if (value.includes('%')) {
              ref.textContent = `${latest.toFixed(1)}%`
            } else {
              ref.textContent = Math.floor(latest)
            }
          }
        },
        onComplete: () => setHasAnimated(true)
      })
    })
  }

  const values = [
    {
      title: "Simplicité",
      description: "Gérez les dépenses familiales en quelques clics",
      icon: "🌟",
      rotate: rotate1
    },
    {
      title: "Connexion",
      description: "Renforcez les liens malgré la distance",
      icon: "❤️",
      rotate: rotate2
    },
    {
      title: "Impact",
      description: "Contribuez au développement local",
      icon: "🌍",
      rotate: rotate3
    }
  ]

  const stories = [
    {
      name: "Fatou",
      title: "L'histoire de Fatou",
      story: "Grâce à MY DIASPO, je peux facilement payer les frais scolaires de mon petit frère au Sénégal. L'application me permet de rester proche de ma famille et de contribuer à leur bien-être, même à des milliers de kilomètres de distance. C'est plus qu'un service de paiement, c'est un lien direct avec mes proches.",
      image: "/stories/story1.jpg",
      gradient: "from-[#FF6B2C] to-[#FF6B2C]"
    },
    {
      name: "Mamadou",
      title: "Membre de la diaspora",
      story: "MY DIASPO m'a permis de payer la scolarité de mes enfants restés au Sénégal en quelques clics. C'est un vrai soulagement. Je peux suivre leurs dépenses et m'assurer que tout est en ordre sans stress. La tranquillité d'esprit n'a pas de prix.",
      image: "/stories/story2.jpg",
      gradient: "from-[#FFD700] to-[#FFD700]"
    },
    {
      name: "Aïcha",
      title: "Membre de la diaspora",
      story: "Grâce à MY DIASPO, j'ai pu aider ma mère à rénover sa maison en Côte d'Ivoire. La famille, c'est sacré. Avec cette application, je peux gérer tous les aspects financiers à distance, comme si j'étais sur place. C'est une vraie révolution pour nous tous.",
      image: "/stories/story3.jpg",
      gradient: "from-[#FF6B2C] to-[#FFD700]"
    }
  ]

  const testimonials = [
    {
      name: "Mamadou",
      role: "Membre de la diaspora",
      quote: "MY DIASPO m'a permis de payer la scolarité de mes enfants restés au Sénégal en quelques clics. C'est un vrai soulagement.",
    },
    {
      name: "Aïcha",
      role: "Membre de la diaspora",
      quote: "Grâce à MY DIASPO, j'ai pu aider ma mère à rénover sa maison en Côte d'Ivoire. La famille, c'est sacré.",
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const imageParallax = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    [0, 0, -50]
  )

  const textParallax = useTransform(
    scrollYProgress,
    [0, 0.5],
    [0, -300]
  )

  const carouselParallax = useTransform(
    scrollYProgress,
    [0.3, 0.8],
    [0, -300]
  )

  return (
    <section ref={containerRef} className="relative py-20 overflow-hidden">
      {/* Transition douce depuis la Hero */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>

      <motion.div className="max-w-7xl mx-auto px-4">
        {/* Stats en premier pour une meilleure transition */}
        <div className="flex flex-row justify-between max-w-5xl mx-auto mb-16 sm:mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="w-[25%] p-2 sm:p-6 rounded-xl bg-background-light/20 backdrop-blur-sm"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onViewportEnter={animateNumbers}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl" />
              <div className="relative text-center">
                <div 
                  ref={el => numberRefs.current[index] = el}
                  className="text-lg sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1 sm:mb-2"
                >
                  {stat.value}
                </div>
                <div className="text-primary text-xs sm:text-base">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Titre avec apparition plus douce */}
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
            Pourquoi choisir
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              MY DIASPO ?
            </span>
          </motion.h2>
        </motion.div>

        {/* Histoire principale avec image + texte + carousel */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image avec parallaxe lent */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative lg:sticky lg:top-24"
            style={{ y: imageParallax }}
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src="/story/family.png"
                alt="Famille connectée grâce à PCSPAY"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
          </motion.div>

          {/* Colonne de droite avec texte + carousel */}
          <div className="space-y-12">
            {/* Texte avec parallaxe rapide */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
              style={{ y: textParallax }}
            >
              <p className="text-xl text-text-muted">
                <span className="text-primary font-semibold">La diaspora africaine</span> en France maintient des liens forts avec leurs familles malgré la distance. Chaque jour, des milliers de personnes cherchent à soutenir leurs proches restés au pays.
              </p>
              <p className="text-xl text-text-muted">
                Que ce soit pour <span className="text-accent font-semibold">l'éducation des enfants</span>, les factures quotidiennes ou le soutien aux initiatives locales, la distance ne devrait jamais être un obstacle.
              </p>
            </motion.div>

            {/* Carousel avec même vitesse que le texte */}
            <motion.div
              style={{ y: carouselParallax }}
            >
              <div className="relative h-[300px] perspective-1000">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={currentIndex}
                    initial={{ 
                      rotateY: 90,
                      x: 200,
                      opacity: 0 
                    }}
                    animate={{ 
                      rotateY: 0,
                      x: 0,
                      opacity: 1,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 20
                      }
                    }}
                    exit={{ 
                      rotateY: -90,
                      x: -200,
                      opacity: 0,
                      transition: { duration: 0.3 }
                    }}
                    className="absolute inset-0"
                  >
                    <div className="
                      relative p-8 rounded-2xl 
                      bg-background-light/30 backdrop-blur-sm 
                      border border-white/5
                      h-full
                      transform-style-3d
                      shadow-xl
                    ">
                      <div className="mb-6">
                        <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          {testimonials[currentIndex].name}
                        </div>
                        <div className="text-text-muted">
                          {testimonials[currentIndex].role}
                        </div>
                      </div>
                      <p className="text-text-muted text-lg italic leading-relaxed">
                        "{testimonials[currentIndex].quote}"
                      </p>

                      {/* Indicateurs de navigation */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                        {testimonials.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`
                              w-2 h-2 rounded-full transition-all
                              ${idx === currentIndex 
                                ? 'bg-primary w-6' 
                                : 'bg-text-muted/30'}
                            `}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Histoire de Fatou avec effet de révélation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-32 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{
                x: ["100%", "-100%"],
                transition: {
                  repeat: Infinity,
                  duration: 3,
                  ease: "linear"
                }
              }}
            />
          </div>
          <div className="relative p-8 md:p-12 rounded-2xl border border-white/10 overflow-hidden">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <motion.div 
                className="w-24 h-24 relative rounded-full overflow-hidden border-2 border-primary/30"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Image
                  src="/story/fatou.png"
                  alt="Fatou"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  L'histoire de Fatou
                </h3>
                <p className="text-text-muted leading-relaxed">
                  "Grâce à MY DIASPO, je peux facilement payer les frais scolaires de mon petit frère au Sénégal..."
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Impact social avec emojis rotatifs */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {[
            {
              title: "Simplicité",
              description: "Gérez les dépenses familiales en quelques clics",
              icon: "🌟",
              rotate: rotate1
            },
            {
              title: "Connexion",
              description: "Renforcez les liens malgré la distance",
              icon: "❤️",
              rotate: rotate2
            },
            {
              title: "Impact",
              description: "Contribuez au développement local",
              icon: "🌍",
              rotate: rotate3
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center p-6"
            >
              <motion.div 
                className="text-4xl mb-4 inline-block"
                style={{ rotate: item.rotate }}
              >
                {item.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {item.title}
              </h3>
              <p className="text-text-muted">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
} 