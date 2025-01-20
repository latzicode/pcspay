'use client'

import { signOut, useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'

export default function UserMenu() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  if (!session) return null

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition"
      >
        <FaUserCircle className="text-xl" />
        <span className="hidden sm:block">{session.user?.name || session.user?.email}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl"
          >
            <div className="px-4 py-2 border-b border-white/10">
              <p className="font-medium">{session.user?.name}</p>
              <p className="text-sm opacity-70">{session.user?.email}</p>
            </div>
            
            <button
              onClick={() => signOut()}
              className="w-full text-left px-4 py-2 hover:bg-white/10 transition"
            >
              Se déconnecter
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}