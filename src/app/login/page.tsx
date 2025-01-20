'use client'

import LoginForm from '@/components/auth/LoginForm'
import { useVisuals } from '@/contexts/VisualContext'
import { useTheme } from 'next-themes'

export default function LoginPage() {
  const { getBackgroundStyle } = useVisuals()
  const { theme } = useTheme()

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background avec pattern */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute inset-0"
          style={{
            ...getBackgroundStyle('pattern2'),
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
      
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Connexion
        </h1>
        <LoginForm />
      </div>
    </div>
  )
}