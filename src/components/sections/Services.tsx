'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const services = [
  {
    title: 'Paiement de Factures',
    description: 'Avec PCSPAY, réglez vos factures d\'électricité, d\'eau et de télécommunications en quelques clics, partout en Afrique.',
    image: '/services/bills.png',
    gradient: 'from-primary/80 via-accent/40 to-primary/80',
    delay: 0.2
  },
  {
    title: 'Transfert d\'Argent',
    description: 'Envoyez de l\'argent à vos proches instantanément avec PCSPAY. Simple, rapide et sécurisé, où que vous soyez.',
    image: '/services/transfer.png',
    gradient: 'from-accent/80 via-primary/40 to-accent/80',
    delay: 0.4
  },
  {
    title: 'Recharge Mobile',
    description: 'Rechargez les forfaits mobiles de vos proches directement depuis l\'application PCSPAY. Une solution pratique pour rester connecté.',
    image: '/services/mobile.png',
    gradient: 'from-primary/80 via-accent/40 to-primary/80',
    delay: 0.6
  },
]

export default function Services() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(255,107,44,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,rgba(255,215,0,0.1),transparent_50%)]" />
        <Image
          src="/patterns/pattern1.png"
          alt="PCSPAY Pattern"
          fill
          className="object-cover opacity-5"
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Solutions PCSPAY
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