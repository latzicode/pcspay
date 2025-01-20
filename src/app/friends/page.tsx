'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { useVisuals } from '@/contexts/VisualContext'
import { useTheme } from 'next-themes'
import { FaUserPlus, FaUserCheck, FaUserClock, FaComment } from 'react-icons/fa'
import Link from 'next/link'

type SearchResult = {
  id: string
  username: string
  name: string | null
  friendStatus: 'NONE' | 'FRIEND' | 'PENDING_SENT' | 'PENDING_RECEIVED'
}

type FriendRequest = {
  id: string
  sender: {
    id: string
    name: string | null
    username: string
  }
  createdAt: string
}

export default function FriendsPage() {
  const { data: session } = useSession()
  const { getBackgroundStyle } = useVisuals()
  const { theme } = useTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [pendingRequests, setPendingRequests] = useState<FriendRequest[]>([])
  const [friends, setFriends] = useState<Array<{ id: string; name: string | null; username: string }>>([])

  // Charger les demandes d'amis en attente
  useEffect(() => {
    async function loadPendingRequests() {
      try {
        const res = await fetch('/api/friends/request/pending')
        const data = await res.json()
        setPendingRequests(data.requests)
      } catch (error) {
        console.error('Error loading requests:', error)
      }
    }
    loadPendingRequests()
  }, [])

  // Charger la liste des amis
  useEffect(() => {
    async function loadFriends() {
      try {
        const res = await fetch('/api/friends')
        const data = await res.json()
        setFriends(data.friends)
      } catch (error) {
        console.error('Error loading friends:', error)
      }
    }
    loadFriends()
  }, [])

  // Gérer l'acceptation/refus des demandes
  async function handleRequestResponse(requestId: string, accept: boolean) {
    try {
      const res = await fetch('/api/friends/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, accept }),
      })

      if (res.ok) {
        // Retirer la demande de la liste
        setPendingRequests(prev => 
          prev.filter(request => request.id !== requestId)
        )
      }
    } catch (error) {
      console.error('Response error:', error)
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setLoading(true)
    try {
      const res = await fetch(`/api/users/search?q=${encodeURIComponent(searchQuery)}`)
      const data = await res.json()
      setSearchResults(data.users)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleFriendRequest(userId: string) {
    try {
      const res = await fetch('/api/friends/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receiverId: userId }),
      })

      if (res.ok) {
        // Mettre à jour l'UI
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

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 pt-20 sm:pt-24 lg:pt-28">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute inset-0"
          style={{
            ...getBackgroundStyle('pattern4'),
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

      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Mes amis</h1>

        {/* Liste des amis */}
        {friends && friends.length > 0 ? (
          <div className="mb-8">
            <div className="space-y-3">
              {friends.map((friend) => (
                <motion.div
                  key={friend.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-white/10 border border-white/20"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{friend.name || friend.username}</p>
                      <p className="text-sm opacity-70">@{friend.username}</p>
                    </div>
                    <Link
                      href={`/chat/${friend.id}`}
                      className="px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 transition flex items-center gap-2"
                    >
                      <FaComment className="text-sm" />
                      <span>Message</span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center py-8 text-sm opacity-70 mb-8">
            Vous n'avez pas encore d'amis
          </p>
        )}

        <h2 className="text-xl font-bold mb-6">Rechercher des amis</h2>

        {/* Formulaire de recherche */}
        <form onSubmit={handleSearch} className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par nom d'utilisateur..."
              className="w-full flex-1 p-3 rounded-lg bg-white/10 border border-white/20 focus:border-primary outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-medium disabled:opacity-50"
            >
              {loading ? 'Recherche...' : 'Rechercher'}
            </button>
          </div>
        </form>

        {/* Section des demandes en attente */}
        {pendingRequests && pendingRequests.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Demandes d'amis ({pendingRequests.length})
            </h2>
            <div className="space-y-3">
              {pendingRequests.map((request) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-white/10 border border-white/20"
                >
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div>
                      <p className="font-medium">{request.sender.name || request.sender.username}</p>
                      <p className="text-sm opacity-70">@{request.sender.username}</p>
                      <p className="text-xs opacity-50 mt-1">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => handleRequestResponse(request.id, true)}
                        className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-500 transition"
                      >
                        Accepter
                      </button>
                      <button
                        onClick={() => handleRequestResponse(request.id, false)}
                        className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-500 transition"
                      >
                        Refuser
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Résultats */}
        <div className="space-y-3 sm:space-y-4">
          {searchResults.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg bg-white/10 border border-white/20 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-start sm:items-center"
            >
              <div>
                <p className="font-medium text-lg">{user.name || user.username}</p>
                <p className="text-sm opacity-70">@{user.username}</p>
              </div>

              {user.friendStatus === 'NONE' && (
                <button
                  onClick={() => handleFriendRequest(user.id)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 transition"
                >
                  <FaUserPlus />
                  <span>Ajouter</span>
                </button>
              )}

              {user.friendStatus === 'FRIEND' && (
                <span className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-green-500">
                  <FaUserCheck />
                  <span>Ami</span>
                </span>
              )}

              {user.friendStatus === 'PENDING_SENT' && (
                <span className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-yellow-500">
                  <FaUserClock />
                  <span>En attente</span>
                </span>
              )}
            </motion.div>
          ))}

          {searchResults.length === 0 && searchQuery && !loading && (
            <p className="text-center py-8 text-sm opacity-70">
              Aucun utilisateur trouvé
            </p>
          )}
        </div>
      </div>
    </div>
  )
}