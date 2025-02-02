'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useVisuals } from '@/contexts/VisualContext'

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
  const { theme } = useTheme()
  const { getBackgroundStyle } = useVisuals()

  return (
    <div className="relative w-full pt-8 pb-8 overflow-hidden">
      {/* Pattern en fond avec gradients de fondu */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          ...getBackgroundStyle('pattern1'),
          opacity: theme === 'dark' ? 0.4 : 0.6,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
          maskImage: `linear-gradient(to bottom, 
            transparent 0%, 
            black 15%, 
            black 85%, 
            transparent 100%
          )`,
          WebkitMaskImage: `linear-gradient(to bottom, 
            transparent 0%, 
            black 15%, 
            black 85%, 
            transparent 100%
          )`
        }}
      />
      
      {/* Fond avec transparence */}
      <div 
        className="absolute inset-0 -z-10 transition-colors duration-300"
        style={{
          background: theme === 'dark' 
            ? 'rgba(15,23,42,0.80)'
            : 'rgba(253,251,247,0.75)'
        }}
      />

      {/* Contenu existant */}
      <div className="flex">
        <div className="animate-infinite-scroll flex whitespace-nowrap">
          {countries.map((country, index) => (
            <div
              key={index}
              className="inline-flex flex-col items-center mx-8 sm:mx-12 space-y-2 sm:space-y-3"
            >
              <div className="relative w-12 sm:w-16 h-8 sm:h-12">
                <Image
                  src={country.flag}
                  alt={`Drapeau ${country.name}`}
                  fill
                  className="object-cover rounded-sm shadow-lg"
                />
              </div>
              <span className={`
                text-xs sm:text-sm font-medium
                ${theme === 'dark' 
                  ? 'text-slate-300' 
                  : 'text-text-muted'
                }
                transition-colors duration-300
              `}>
                {country.name}
              </span>
            </div>
          ))}
        </div>
        <div className="animate-infinite-scroll flex whitespace-nowrap" aria-hidden="true">
          {countries.map((country, index) => (
            <div
              key={index}
              className="inline-flex flex-col items-center mx-8 sm:mx-12 space-y-2 sm:space-y-3"
            >
              <div className="relative w-12 sm:w-16 h-8 sm:h-12">
                <Image
                  src={country.flag}
                  alt={`Drapeau ${country.name}`}
                  fill
                  className="object-cover rounded-sm shadow-lg"
                />
              </div>
              <span className={`
                text-xs sm:text-sm font-medium
                ${theme === 'dark' 
                  ? 'text-slate-300' 
                  : 'text-text-muted'
                }
                transition-colors duration-300
              `}>
                {country.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 