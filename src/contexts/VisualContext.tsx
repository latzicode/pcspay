'use client'

import { createContext, useContext } from 'react'
import { useTheme } from 'next-themes'

type BackgroundType = 'hero' | 'story'
type PatternType = 'pattern1' | 'pattern2' | 'pattern3' | 'pattern4'
type VisualType = BackgroundType | PatternType

interface VisualAssets {
  backgrounds: Record<BackgroundType, string>
  patterns: Record<PatternType, string>
  gradients: {
    light: {
      primary: string
      overlay: string
      pattern: string
    }
    dark: {
      primary: string
      overlay: string
      pattern: string
    }
  }
}

const visualAssets: VisualAssets = {
  backgrounds: {
    hero: '/baobab.png',
    story: '/baobabforest.png'
  },
  patterns: {
    pattern1: '/patterns/pattern1.png',
    pattern2: '/patterns/pattern2.png',
    pattern3: '/patterns/patern3.png',
    pattern4: '/patterns/pattern4.png'
  },
  gradients: {
    light: {
      primary: 'rgba(253,251,247,0.95)',
      overlay: 'rgba(255,255,255,0.1)',
      pattern: 'rgba(255,255,255,0.05)'
    },
    dark: {
      primary: 'rgba(15,23,42,0.95)',
      overlay: 'rgba(0,0,0,0.2)',
      pattern: 'rgba(0,0,0,0.1)'
    }
  }
}

// Hook personnalisé pour la gestion des visuels
export function useVisuals() {
  const { theme } = useTheme()
  
  const getBackgroundStyle = (type: VisualType) => {
    const isPattern = type.includes('pattern')
    return {
      backgroundImage: isPattern 
        ? `url(${visualAssets.patterns[type as PatternType]})`
        : `url(${visualAssets.backgrounds[type as BackgroundType]})`,
      opacity: theme === 'dark' ? 0.1 : 0.05,
      backgroundBlendMode: 'overlay'
    }
  }

  const getSectionStyle = (type: VisualType) => ({
    background: theme === 'dark' 
      ? visualAssets.gradients.dark.primary
      : visualAssets.gradients.light.primary,
    ...getBackgroundStyle(type)
  })

  return { getBackgroundStyle, getSectionStyle, visualAssets }
}