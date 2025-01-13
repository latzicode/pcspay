'use client'

import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ScrollCTA from "@/components/ui/ScrollCTA";
import FinancialFlow from '@/components/ui/FinancialFlow';

// Icône de doigt qui pointe
const TapIcon = () => (
  <motion.div
    className="absolute inset-0 flex items-center justify-center text-white/90"
    animate={{
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7]
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <svg 
      className="w-12 h-12" 
      viewBox="0 0 24 24" 
      fill="none"
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={1.5}
        d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
      />
    </svg>
    <div className="absolute mt-16 text-center font-medium">
      Payer une facture
    </div>
  </motion.div>
);

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Animation au curseur plus sensible
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  // Animation de flottement
  const floatY = useMotionValue(0);
  
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMouseX(((e.clientX - window.innerWidth / 2) / window.innerWidth) * 60);
      setMouseY(((e.clientY - window.innerHeight / 2) / window.innerHeight) * -60);
    };

    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // État pour le carousel
  const [currentImage, setCurrentImage] = useState(2)
  
  // En haut avec les autres states
  const [direction, setDirection] = useState(1);

  // Auto-rotation toutes les 7 secondes au lieu de 3
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentImage((prev) => (prev >= 5 ? 2 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Parallaxe simplifié
  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', '20%']  // Réduit l'amplitude pour plus de douceur
  );

  // Zoom progressif
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.15]  // Zoom subtil de 1 à 1.15
  );

  return (
    <section ref={containerRef} className="relative min-h-[calc(100vh-5rem)] pt-20 md:pt-28 pb-0 flex flex-col bg-background overflow-hidden">
      {/* Background avec parallaxe simplifié */}
      <motion.div 
        className="absolute inset-0 w-full h-[140vh]" // Hauteur réduite
        style={{ y: backgroundY }}
      >
        <motion.div
          className="relative w-full h-full"
          style={{ scale }}
        >
          <Image
            src="/baobab.png"
            alt="Baobab Background"
            fill
            className="object-cover object-top opacity-95"
            priority
            quality={100}
          />
          {/* Overlay inchangé car il fonctionne bien */}
          <div className="
            absolute inset-0 
            bg-gradient-to-b from-background/75 via-background/85 to-background/95
            backdrop-blur-[1px]
          " />
        </motion.div>
      </motion.div>

      {/* Contenu principal */}
      <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animation centrée en background */}
        <div className="
          absolute inset-0 
          hidden sm:flex  // Caché sur mobile (<640px), visible sur sm et au-delà
          items-center 
          justify-center 
          pointer-events-none
        ">
          <div className="w-[600px] h-[500px] relative">
            {/* Europe - centrée horizontalement, en haut */}
            <div 
              className="absolute"
              style={{ 
                left: '50%',
                top: '25%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <Image
                src="/continents/digitaleurope.png"
                alt="Digital Europe"
                width={150}
                height={150}
                className="opacity-80"
              />
            </div>

            {/* Afrique - même axe vertical, plus bas et plus grande */}
            <div 
              className="absolute"
              style={{ 
                left: '50%',
                top: '75%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <Image
                src="/continents/digitalafrica.png"
                alt="Digital Africa"
                width={200}
                height={200}
                className="opacity-80"
              />
            </div>

            <FinancialFlow 
              mouseX={mouseX} 
              mouseY={mouseY}
              containerWidth={600}
            />
          </div>
        </div>

        <div className="
          h-full 
          flex flex-col lg:flex-row 
          items-center 
          justify-center lg:justify-between 
          relative
        ">
          {/* Bloc texte */}
          <div className="
            w-full lg:w-5/12 
            flex flex-col 
            items-center lg:items-start 
            text-center lg:text-left 
            space-y-8
            pt-8 lg:pt-0
          ">
            <h1 className="
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
              font-bold 
              font-display
              max-w-[18ch] sm:max-w-none
            ">
              <div className="overflow-hidden h-[3.6em] sm:h-[2.4em] md:h-[3.2em]">
                <motion.div
                  animate={{
                    y: ["0%", "-50%", "-50%", "0%", "0%"]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    times: [0, 0.2, 0.7, 0.9, 1],
                    ease: "easeInOut"
                  }}
                  className="space-y-[1.2em]"
                >
                  <span className="block bg-gradient-to-r from-primary via-primary-dark to-primary bg-clip-text text-transparent">
                    Simplifiez vos paiements
                  </span>
                  <span className="block bg-gradient-to-r from-primary via-primary-dark to-primary bg-clip-text text-transparent">
                    Payez les factures de vos proches
                  </span>
                </motion.div>
              </div>
              <span className="block bg-gradient-to-r from-primary via-primary-dark to-primary bg-clip-text text-transparent mt-2">
                en Afrique
              </span>
            </h1>

            <div className="
              overflow-hidden 
              h-[3.8em] sm:h-[2.4em] md:h-[3.2em]
              text-[9px] sm:text-lg lg:text-xl
              w-full
            ">
              <motion.div
                animate={{
                  y: ["0%", "-50%", "-50%", "0%", "0%"]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  times: [0, 0.2, 0.7, 0.9, 1],
                  ease: "easeInOut"
                }}
                className="space-y-6"
              >
                <p className="font-display text-[11px] sm:text-lg lg:text-xl max-w-2xl relative"
                   style={{
                     color: 'rgba(246, 150, 190, 0.98)',
                     textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                   }}
                >
                  <span className="relative z-10">
                    Gérez vos transferts d'argent et paiements de factures en toute simplicité avec MY DIASPO
                  </span>
                  <span className="absolute inset-0 -z-10 bg-[rgba(255,192,120,0.35)] rounded-lg" />
                </p>
                <p className="font-display text-[11px] sm:text-lg lg:text-xl max-w-2xl relative"
                   style={{
                     color: 'rgba(246, 146, 188, 0.98)',
                     textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                   }}
                >
                  <span className="relative z-10">
                    Électricité, eau, scolarité... <span className="hidden sm:inline">en quelques clics depuis chez vous</span><span className="inline sm:hidden">en quelques clics</span>
                  </span>
                  <span className="absolute inset-0 -z-10 bg-[rgba(255,192,120,0.35)] rounded-lg" />
                </p>
              </motion.div>
            </div>

            {/* Bloc des CTAs - uniquement visible sur desktop */}
            <div className="hidden lg:flex flex-wrap gap-4 justify-center lg:justify-start">
              <a 
                href="/pay-bill"
                className="group px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
              >
                <span className="inline-flex items-center mr-3 transition-transform duration-300 group-hover:scale-110">
                  <svg 
                    className="w-[1.2em] h-[1.2em]"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                    />
                  </svg>
                </span>
                <span>Payer une facture</span>
              </a>
              <a 
                href="/contact"
                className="px-8 py-4 bg-gradient-soft backdrop-blur-sm text-text rounded-full font-medium hover:bg-gradient-metallic hover:text-white transition-all"
              >
                En savoir plus
              </a>
            </div>
          </div>

          {/* Mockup interactif */}
          <div className="
            w-full sm:w-[70%] lg:w-5/12
            relative
            mt-12 lg:mt-0
          ">
            <div className="
              relative 
              w-[66%] sm:w-[300px]
              mx-auto 
              perspective-[1200px]
            ">
              {/* Container avec effet permanent sur mobile */}
              <motion.div 
                className="
                  relative
                  rounded-[2rem]
                  overflow-hidden
                  !border-[1px] !border-solid !border-white/40
                  bg-gradient-to-br from-white/10 via-white/5 to-transparent
                  backdrop-blur-sm
                  p-[1px]
                  group
                  cursor-pointer sm:cursor-default
                  transition-all duration-300
                  active:scale-[0.98]
                "
                onClick={() => {
                  if (window.innerWidth < 640) { // 640px est le breakpoint 'sm' de Tailwind
                    window.location.href = '/pay-bill'
                  }
                }}
              >
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={currentImage}
                    initial={{ 
                      rotateY: 90,
                      x: 100,
                      opacity: 0,
                    }}
                    animate={{ 
                      rotateY: 0,
                      x: 0,
                      opacity: 1,
                    }}
                    exit={{ 
                      rotateY: -90,
                      x: -100,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <Image
                      src={`/mockups/mockup${currentImage}.png`}
                      alt="MY DIASPO Interface"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Overlay permanent avec icône sur mobile */}
                <div className="
                  absolute inset-0
                  bg-black/40
                  block sm:hidden
                ">
                  <TapIcon />
                </div>

                {/* Message "Payer une facture" */}
                <div className="
                  absolute bottom-0 left-0 right-0
                  bg-gradient-to-t from-black/50 to-transparent
                  p-4
                  text-center
                  text-white
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                  block sm:hidden
                ">
                  Payer une facture
                </div>

                {/* Effet de halo animé */}
                <div className="
                  absolute -inset-[1px]
                  bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20
                  rounded-[2rem]
                  -z-[1]
                  animate-gradient-x
                "/>
              </motion.div>

              {/* Indicateurs */}
              <div className="
                absolute -bottom-6 
                left-1/2 -translate-x-1/2 
                flex gap-2
                mt-4 sm:mt-0           // Ajusté l'espacement des indicateurs
              ">
                {[2,3,4,5].map((index) => (
                  <div 
                    key={index}
                    className={`
                      h-[2px]
                      transition-all duration-300
                      ${currentImage === index 
                        ? 'w-8 bg-gradient-to-r from-primary/60 via-accent/60 to-primary/60' 
                        : 'w-2 bg-white/20'
                      }
                    `}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ScrollCTA />

      {/* Boutons CTA - visible uniquement sur desktop */}
      <div className="hidden sm:flex flex-row gap-4 mt-8">
        <button className="btn-primary">
          Payer une facture
        </button>
        <button className="btn-outline">
          En savoir plus
        </button>
      </div>
    </section>
  );
} 