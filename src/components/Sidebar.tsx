'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { AnimatePresence, motion, useDragControls } from 'framer-motion'
import { FaPlus, FaComments, FaFileInvoiceDollar, FaBars, FaSearch, FaUserPlus, FaUserCheck, FaUserClock, FaTimes } from 'react-icons/fa'
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
  const [isMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768)
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null)
  const dragControls = useDragControls()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [pendingRequests, setPendingRequests] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

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

  // Charger les demandes en attente
  useEffect(() => {
    async function loadPendingRequests() {
      try {
        const res = await fetch('/api/friends/request/pending')
        const data = await res.json()
        setPendingRequests(data.requests || [])
      } catch (error) {
        console.error('Error loading requests:', error)
        setPendingRequests([])
      }
    }
    loadPendingRequests()
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

  const handleSwipe = (event: TouchEvent) => {
    if (event.touches[0].clientX < window.innerWidth - 100) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('touchmove', handleSwipe)
      return () => document.removeEventListener('touchmove', handleSwipe)
    }
  }, [isOpen])

  // Recherche d'amis
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }
    setIsSearching(true)
    try {
      const res = await fetch(`/api/users/search?q=${encodeURIComponent(searchQuery)}`)
      const data = await res.json()
      setSearchResults(data.users)
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  // Recherche à chaque frappe
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch()
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Envoyer une demande d'ami
  const handleSendRequest = async (userId: string) => {
    try {
      const res = await fetch('/api/friends/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receiverId: userId }),
      })

      if (res.ok) {
        setSearchResults(prev => 
          prev.map(user => 
            user.id === userId 
              ? { ...user, friendStatus: 'PENDING_SENT' }
              : user
          )
        )
      }
    } catch (error) {
      console.error('Friend request error:', error)
    }
  }

  // Répondre à une demande d'ami
  const handleRequestResponse = async (requestId: string, accept: boolean) => {
    try {
      const res = await fetch('/api/friends/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, accept }),
      })

      if (res.ok) {
        setPendingRequests(prev => prev.filter(req => req.id !== requestId))
      }
    } catch (error) {
      console.error('Response error:', error)
    }
  }

  const sidebarContent = (
    <div className={`h-full flex flex-col pt-[72px] sm:pt-0 ${theme === 'dark' ? 'bg-gray-900/80' : 'bg-white/80'}`}>
      {/* Section Mes Contacts */}
      <div className="flex-shrink-0 p-4 border-b border-white/10">
        <h2 className="text-lg font-semibold mb-4">Mes Contacts</h2>
        <div className="space-y-2">
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

      {/* Nouvelle Section */}
      <div className="flex-1 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Nouveaux Amis</h2>
        
        {/* Barre de recherche */}
        <div className="relative mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un utilisateur..."
            className="w-full p-2 pl-8 rounded-lg bg-white/10 border border-white/20"
          />
          <FaSearch className="absolute left-2.5 top-3 text-white/50" />
          {isSearching && (
            <div className="absolute right-2.5 top-3 text-white/50">
              <span className="loading loading-spinner loading-xs"></span>
            </div>
          )}
        </div>

        {/* Résultats de recherche */}
        {searchResults.length > 0 && (
          <div className="space-y-2 mb-6">
            {searchResults.map((user) => (
              <div 
                key={user.id}
                className="p-3 rounded-lg bg-white/5 border border-white/10 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{user.name || user.username}</p>
                  <p className="text-sm opacity-70">@{user.username}</p>
                </div>

                {user.friendStatus === 'NONE' && (
                  <button
                    onClick={() => handleSendRequest(user.id)}
                    className="p-2 rounded-lg bg-primary/20 hover:bg-primary/30 transition"
                  >
                    <FaUserPlus />
                  </button>
                )}

                {user.friendStatus === 'FRIEND' && (
                  <span className="p-2 text-green-500">
                    <FaUserCheck />
                  </span>
                )}

                {user.friendStatus === 'PENDING_SENT' && (
                  <span className="p-2 text-yellow-500">
                    <FaUserClock />
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Demandes en attente */}
        {pendingRequests.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium mb-2 opacity-70">Demandes en attente</h3>
            {pendingRequests.map((request) => (
              <div
                key={request.id}
                className="p-3 rounded-lg bg-white/5 border border-white/10 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{request.sender.name || request.sender.username}</p>
                  <p className="text-sm opacity-70">@{request.sender.username}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRequestResponse(request.id, true)}
                    className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 transition"
                  >
                    <FaUserCheck />
                  </button>
                  <button
                    onClick={() => handleRequestResponse(request.id, false)}
                    className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition"
                  >
                    <FaTimes />
                  </button>
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