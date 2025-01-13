'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  FaWallet, 
  FaFileInvoiceDollar, 
  FaCheckCircle, 
  FaHome 
} from 'react-icons/fa'
import { useRef } from 'react'
import Image from 'next/image'

const steps = [
  {
    number: "01",
    title: "Alimentez votre compte",
    description: "Créez et alimentez votre compte MY DIASPO en quelques clics...",
    Icon: FaWallet,
    gradient: "from-primary to-accent",
    delay: 0.2
  },
  {
    number: "02",
    title: "Sélectionnez la facture",
    description: "Choisissez parmi nos services : électricité, eau, scolarité, frais médicaux et plus encore.",
    Icon: FaFileInvoiceDollar,
    gradient: "from-accent to-primary",
    delay: 0.4
  },
  {
    number: "03",
    title: "Validez le paiement",
    description: "Confirmez le montant et validez la transaction en toute simplicité.",
    Icon: FaCheckCircle,
    gradient: "from-primary to-accent",
    delay: 0.6
  },
  {
    number: "04",
    title: "Facture réglée",
    description: "La facture de votre famille est instantanément payée, en toute transparence.",
    Icon: FaHome,
    gradient: "from-accent to-primary",
    delay: 0.8
  }
]

export default function Fonctionnement() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  return (
    <section ref={containerRef} className="relative py-20 lg:py-32 overflow-hidden mt-[-2rem] lg:mt-0 pt-32">
      <motion.div 
        className="max-w-7xl mx-auto px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Comment ça
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              fonctionne ?
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-text-muted max-w-2xl mx-auto"
          >
            Découvrez comment MY DIASPO simplifie vos transactions
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: step.delay }}
              className="relative group"
            >
              {/* Ligne de connexion créative */}
              {index < steps.length - 1 && (
                <>
                  {/* Vertical line for small screens */}
                  <motion.div
                    className="lg:hidden absolute top-full left-1/2 -translate-x-1/2 w-1"
                    initial={{ height: 0 }}
                    whileInView={{ height: 'calc(100% + 2rem)' }}
                    viewport={{ once: true }}
                    transition={{ delay: step.delay + 0.3, duration: 0.5, ease: "easeInOut" }}
                  >
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-primary to-accent"
                        initial={{ y: '-100%' }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: step.delay + 0.3, duration: 0.5, ease: "easeInOut" }}
                      />
                    </div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full transform -translate-y-1/2" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-accent rounded-full transform translate-y-1/2" />
                  </motion.div>

                  {/* Horizontal line for large screens */}
                  <motion.div
                    className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-full w-full h-1 rounded-full overflow-hidden"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1, originX: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: step.delay + 0.3, duration: 0.5, ease: "easeInOut" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent" />
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2" />
                    <div className="absolute top-1/2 -translate-y-1/2 right-0 w-4 h-4 bg-accent rounded-full transform translate-x-1/2" />
                  </motion.div>
                </>
              )}
              
              <motion.div
                className="relative p-6 rounded-2xl bg-background-light/30 backdrop-blur-sm border border-white/5 group-hover:border-primary/20 transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  rotateX: 10,
                  rotateY: 10,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Numéro de l'étape avec animation */}
                <motion.div 
                  className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-background-light/50 border border-white/10 flex items-center justify-center"
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 360,
                    transition: { duration: 0.5 }
                  }}
                >
                  <span className={`text-lg font-bold bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                    {step.number}
                  </span>
                </motion.div>

                {/* Icône avec animation */}
                <div className="mb-6">
                  <motion.div 
                    className="relative w-16 h-16"
                    whileHover={{ 
                      scale: 1.2,
                      transition: { 
                        duration: 0.3,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }
                    }}
                  >
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${step.gradient} rounded-xl opacity-20 blur-xl`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <div className="relative w-full h-full rounded-xl border border-white/10 p-4 bg-background-light/50 group-hover:border-primary/20 transition-colors duration-300">
                      <step.Icon className={`w-full h-full text-primary group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                  </motion.div>
                </div>

                {/* Contenu avec animation */}
                <motion.h3 
                  className="text-xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  {step.title}
                </motion.h3>
                <p className="text-text-muted group-hover:text-text transition-colors duration-300">
                  {step.description}
                </p>

                {/* Effet de brillance créatif */}
                <motion.div 
                  className="absolute inset-0 -z-10 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-2xl" 
                  style={{
                    background: `linear-gradient(120deg, transparent, transparent, rgba(255,255,255,0.2), transparent, transparent)`
                  }}
                  animate={{
                    backgroundPosition: ['200% 50%', '-200% 50%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="/demo" 
            target="_blank"
            className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-text rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow"
          >
            <span className="inline-block mr-2">▶️</span>
            Voir la démo
          </a>
        </div>
      </motion.div>
    </section>
  )
}
