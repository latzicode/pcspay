'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useVisuals } from '@/contexts/VisualContext'

const services = [
  {
    title: "Transfert d'argent",
    description: "MY DIASPO vous permet d'envoyer de l'argent à vos proches en toute sécurité et en quelques clics seulement. Profitez des meilleurs taux de change.",
    gradient: "from-primary/90 via-primary/90 to-primary/90",
    image: "/services/transfer.png",
    delay: 0.2
  },
  {
    title: "Paiement de factures",
    description: "Avec MY DIASPO, réglez facilement les factures de vos proches en Afrique. Eau, électricité, internet, tout est possible !",
    gradient: "from-accent/90 via-accent/90 to-accent/90",
    image: "/services/bills.png",
    delay: 0.4
  },
  {
    title: "Recharge mobile",
    description: "MY DIASPO vous permet de recharger le crédit téléphonique de vos proches en quelques secondes.",
    gradient: "from-primary/90 via-accent/90 to-primary/90",
    image: "/services/mobile.png",
    delay: 0.6
  }
]

export default function Services() {
  const { theme } = useTheme()
  const { getBackgroundStyle } = useVisuals()

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute inset-0"
          style={{
            ...getBackgroundStyle('pattern3'),
            opacity: theme === 'dark' ? 0.25 : 0.35,
          }}
        />
        <div 
          className="absolute inset-0 transition-colors duration-300"
          style={{
            background: theme === 'dark' 
              ? 'rgba(15,23,42,0.92)'
              : 'rgba(253,251,247,0.92)'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4">
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
            Les services
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
            Des solutions de paiement innovantes pour simplifier votre quotidien
          </motion.p>
        </motion.div>

        <div className="grid gap-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: service.delay }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-12`}
            >
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-3xl font-bold text-text mb-4">
                  {service.title}
                </h3>
                <p className="text-lg text-text-muted mb-8">
                  {service.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-8 py-3 rounded-full font-medium overflow-hidden group shadow-lg"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} bg-size-200 bg-pos-0 group-hover:bg-pos-100 transition-all duration-500`}></div>
                  <span className="relative text-text font-semibold">
                    En savoir plus
                  </span>
                </motion.button>
              </div>

              <motion.div
                className="flex-1"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-80 h-80 mx-auto">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl blur-2xl opacity-30`}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm bg-background/30">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-contain p-8"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 