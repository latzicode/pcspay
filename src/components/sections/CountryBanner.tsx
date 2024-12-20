'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const countries = [
  { 
    name: "Sénégal", 
    code: "SN",
    flag: "https://flagcdn.com/w80/sn.png"
  },
  { 
    name: "Mali", 
    code: "ML",
    flag: "https://flagcdn.com/w80/ml.png"
  },
  { 
    name: "Guinée", 
    code: "GN",
    flag: "https://flagcdn.com/w80/gn.png"
  },
  { 
    name: "Côte d'Ivoire", 
    code: "CI",
    flag: "https://flagcdn.com/w80/ci.png"
  },
  { 
    name: "République démocratique du Congo", 
    code: "CD",
    flag: "https://flagcdn.com/w80/cd.png"
  },
  { 
    name: "Cameroun", 
    code: "CM",
    flag: "https://flagcdn.com/w80/cm.png"
  },
  { 
    name: "République du Congo", 
    code: "CG",
    flag: "https://flagcdn.com/w80/cg.png"
  },
  { 
    name: "Bénin", 
    code: "BJ",
    flag: "https://flagcdn.com/w80/bj.png"
  },
  { 
    name: "Togo", 
    code: "TG",
    flag: "https://flagcdn.com/w80/tg.png"
  },
  { 
    name: "Mauritanie", 
    code: "MR",
    flag: "https://flagcdn.com/w80/mr.png"
  },
]

const duplicatedCountries = [...countries, ...countries]

export default function CountryBanner() {
  return (
    <div className="relative w-full overflow-hidden bg-background-light/30 backdrop-blur-sm py-8">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10" />
      
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: ["0%", "-50%"]
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity
        }}
      >
        {duplicatedCountries.map((country, index) => (
          <div
            key={index}
            className="inline-flex flex-col items-center mx-12 space-y-3"
          >
            <div className="relative w-16 h-12">
              <Image
                src={country.flag}
                alt={`Drapeau ${country.name}`}
                fill
                className="object-cover rounded-sm shadow-lg"
              />
            </div>
            <span className="text-text-muted font-medium text-sm">
              {country.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
} 