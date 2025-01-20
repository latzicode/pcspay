'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaPlus, FaComments, FaFileInvoiceDollar, FaBars } from 'react-icons/fa'
import Link from 'next/link'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useTheme } from 'next-themes'
import InvoiceModal from '@/components/modals/InvoiceModal'

type Friend = {
  id: string
  name: string | null
  username: string
}

export default function Sidebar() {
  const { theme } = useTheme()
  const { data: session } = useSession()
  const [friends, setFriends] = useState<Friend[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null)

  // Fermer la sidebar sur mobile quand on change de page
  useEffect(() => {
    if (isMobile) setIsOpen(false)
  }, [isMobile])

  // Charger les amis
  useEffect(() => {
    async function loadFriends() {
      try {
        const res = await fetch('/api/friends')
        const data = await res.json()
        if (data.friends) setFriends(data.friends)
      } catch (error) {
        console.error('Error loading friends:', error)
      } finally {
        setLoading(false)
      }
    }
    loadFriends()
  }, [])

  // Empêcher le scroll du body quand la sidebar est ouverte sur mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, isMobile])

  const sidebarContent = (
    <div className={`h-full flex flex-col ${theme === 'dark' ? 'bg-gray-900/80' : 'bg-white/80'}`}>
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
        <h2 className="text-lg font-semibold">Contacts</h2>
        <button 
          onClick={() => setIsOpen(false)}
          className={`p-2 ${theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-gray-100'} rounded-lg transition-colors md:hidden`}
        >
          <FaPlus className="rotate-45" />
        </button>
      </div>

      {/* Friends List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary" />
          </div>
        ) : friends.length === 0 ? (
          <div className={`p-4 text-center text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-500'}`}>
            Aucun contact pour le moment
          </div>
        ) : (
          <div className="p-2 space-y-2">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className={`group p-3 rounded-lg ${
                  theme === 'dark' 
                    ? 'hover:bg-white/5' 
                    : 'hover:bg-gray-100'
                } transition-colors`}
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full ${
                    theme === 'dark'
                      ? 'bg-primary/20'
                      : 'bg-primary/10'
                  } flex items-center justify-center text-sm font-medium`}>
                    {friend.name?.[0] || friend.username[0]}
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">
                      {friend.name || friend.username}
                    </p>
                    {friend.name && (
                      <p className={`text-sm truncate ${
                        theme === 'dark' 
                          ? 'text-white/60'
                          : 'text-gray-500'
                      }`}>
                        @{friend.username}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className={`flex gap-1 ${isMobile ? '' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                    <Link href={`/chat/${friend.id}`}>
                      <button className={`p-2 rounded-lg ${
                        theme === 'dark'
                          ? 'hover:bg-white/10'
                          : 'hover:bg-gray-100'
                      } transition-colors`}>
                        <FaComments className="w-4 h-4" />
                      </button>
                    </Link>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedFriend(friend)
                        setShowInvoiceModal(true)
                      }}
                      className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-gray-100'} transition-colors`}
                    >
                      <FaFileInvoiceDollar className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  // Mobile toggle button
  const toggleButton = isMobile && (
    <button
      onClick={() => setIsOpen(true)}
      className={`fixed bottom-6 left-6 p-4 rounded-full ${
        theme === 'dark'
          ? 'bg-primary text-white'
          : 'bg-primary/90 text-white'
      } shadow-lg md:hidden flex items-center gap-2`}
    >
      <FaBars className="w-5 h-5" />
      <span className="text-sm font-medium">Contacts</span>
    </button>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <div className={`hidden md:block w-80 border-r ${
        theme === 'dark'
          ? 'border-white/10 bg-black/20'
          : 'border-gray-200 bg-gray-50'
      }`}>
        {sidebarContent}
      </div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className={`fixed inset-0 ${
                theme === 'dark'
                  ? 'bg-black/60'
                  : 'bg-gray-500/30'
              } backdrop-blur-sm z-40 md:hidden`}
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className={`fixed inset-y-0 left-0 w-80 ${
                theme === 'dark'
                  ? 'bg-gray-900'
                  : 'bg-white'
              } z-50 md:hidden`}
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {toggleButton}

      {/* Modal des factures */}
      {selectedFriend && (
        <InvoiceModal
          isOpen={showInvoiceModal}
          onClose={() => {
            setShowInvoiceModal(false)
            setSelectedFriend(null)
          }}
          friend={selectedFriend}
        />
      )}
    </>
  )
}