'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { animate } from "framer-motion"

const stats = [
  { value: 10000, label: "Utilisateurs actifs", suffix: "+" },
  { value: 15, label: "Millions d'euros transférés", suffix: "M€" },
  { value: 12, label: "Pays africains connectés", suffix: "" }
]

const AnimatedStat = ({ value, label, suffix }: { value: number, label: string, suffix: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!isInView || !nodeRef.current) return

    const node = nodeRef.current

    const controls = animate(0, value, {
      duration: 2,
      onUpdate(value) {
        const displayValue = Number.isFinite(value) ? Math.round(value).toLocaleString() : '0'
        node.textContent = `${displayValue}${suffix}`
      },
      ease: "easeOut"
    })

    return () => controls.stop()
  }, [value, suffix, isInView])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      onViewportEnter={() => setIsInView(true)}
      className="text-center p-6 relative group"
    >
      {/* Effet de pulse en arrière-plan */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl -z-10"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <span 
        ref={nodeRef}
        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent inline-block"
      >
        0{suffix}
      </span>
      
      <motion.div 
        className="text-text-muted mt-2"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {label}
      </motion.div>
    </motion.div>
  )
}

export default function Story() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])

  // Beaucoup plus de rotations pour chaque emoji
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 1400])    // 2 tours complets
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, 2000])   // 3 tours complets
  const rotate3 = useTransform(scrollYProgress, [0, 1], [0, 3000])   // 4 tours complets

  return (
    <section ref={containerRef} className="relative py-20 overflow-hidden">
      {/* Fond avec effet de parallaxe */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,107,44,0.05),transparent_70%)]"
          style={{ opacity }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <motion.div 
        className="max-w-7xl mx-auto px-4"
        style={{ y }}
      >
        {/* Introduction émotionnelle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="block">Connecter les</span>
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              cœurs et les familles
            </span>
          </motion.h2>
        </motion.div>

        {/* Histoire principale */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
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

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-xl text-text-muted">
              <span className="text-primary font-semibold">La diaspora africaine</span> en France maintient des liens forts avec leurs familles malgré la distance. Chaque jour, des milliers de personnes cherchent à soutenir leurs proches restés au pays.
            </p>
            <p className="text-xl text-text-muted">
              Que ce soit pour <span className="text-accent font-semibold">l'éducation des enfants</span>, les factures quotidiennes ou le soutien aux initiatives locales, la distance ne devrait jamais être un obstacle.
            </p>
          </motion.div>
        </div>

        {/* Histoire de Fatou */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl" />
          <div className="relative p-8 md:p-12 rounded-2xl border border-white/10">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-24 h-24 relative rounded-full overflow-hidden border-2 border-primary/30">
                <Image
                  src="/story/fatou.png"
                  alt="Fatou"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  L'histoire de Fatou
                </h3>
                <p className="text-text-muted">
                  "Grâce à PCSPAY, je peux facilement payer les frais scolaires de mon petit frère au Sénégal. L'application me permet de rester proche de ma famille et de contribuer à leur bien-être, même à des milliers de kilomètres de distance."
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Témoignages supplémentaires */}
        <div className="grid md:grid-cols-2 gap-8 mt-20">
          {[
            {
              name: "Mamadou",
              quote: "PCS Pay m'a permis de payer la scolarité de mes enfants restés au Sénégal en quelques clics. C'est un vrai soulagement.",
            },
            {
              name: "Aïcha",
              quote: "Grâce à PCS Pay, j'ai pu aider ma mère à rénover sa maison en Côte d'Ivoire. La famille, c'est sacré.",
            }
          ].map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative p-8 rounded-2xl bg-background-light/30 backdrop-blur-sm border border-white/5"
            >
              <div className="mb-4">
                <div className="text-xl font-bold">{testimonial.name}</div>
                <div className="text-text-muted">Membre de la diaspora</div>
              </div>
              <p className="text-text-muted italic">"{testimonial.quote}"</p>
            </motion.div>
          ))}
        </div>

        {/* Chiffres clés */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold mb-8">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              PCS Pay en chiffres
            </span>
          </h3>
          <div className="grid sm:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <AnimatedStat key={index} {...stat} />
            ))}
          </div>
        </div>

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