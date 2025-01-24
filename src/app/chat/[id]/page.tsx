'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useVisuals } from '@/contexts/VisualContext'
import { useTheme } from 'next-themes'
import { FaPaperPlane, FaArrowLeft, FaFileInvoice, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import Link from 'next/link'

type Message = {
  id: string
  content: string
  senderId: string
  receiverId: string
  createdAt: string
  sender: {
    id: string
    name: string | null
    username: string
  }
}

export default function ChatPage() {
  const { data: session } = useSession()
  const { getBackgroundStyle } = useVisuals()
  const { theme } = useTheme()
  const params = useParams()
  const friendId = params.id as string
  const router = useRouter()
  
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [friend, setFriend] = useState<{
    id: string
    name: string | null
    username: string
  } | null>(null)
  const [showInvoiceSelector, setShowInvoiceSelector] = useState(false)
  const [userInvoices, setUserInvoices] = useState<any[]>([])

  // Charger les messages
  useEffect(() => {
    async function loadMessages() {
      try {
        const res = await fetch(`/api/chat/${friendId}`)
        const data = await res.json()
        if (data.messages) {
          setMessages(data.messages)
        }
      } catch (error) {
        console.error('Error loading messages:', error)
      } finally {
        setLoading(false)
      }
    }

    loadMessages()
    const interval = setInterval(loadMessages, 3000)
    return () => clearInterval(interval)
  }, [friendId])

  // Charger les infos de l'ami depuis la liste d'amis
  useEffect(() => {
    async function loadFriend() {
      try {
        const res = await fetch('/api/friends')
        const data = await res.json()
        const currentFriend = data.friends.find((f: any) => f.id === friendId)
        if (currentFriend) {
          setFriend(currentFriend)
        }
      } catch (error) {
        console.error('Error loading friend:', error)
      }
    }
    loadFriend()
  }, [friendId])

  // Charger les factures de l'utilisateur
  useEffect(() => {
    async function loadInvoices() {
      try {
        const res = await fetch('/api/invoices')
        const data = await res.json()
        setUserInvoices(data.invoices)
      } catch (error) {
        console.error('Error loading invoices:', error)
      }
    }
    loadInvoices()
  }, [])

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Envoyer un message
  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!newMessage.trim()) return

    try {
      const res = await fetch(`/api/chat/${friendId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newMessage }),
      })

      if (res.ok) {
        const data = await res.json()
        if (data.message) {
          setMessages(prev => [...prev, data.message])
          setNewMessage('')
        }
      }
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  // Envoyer une facture comme message
  const handleSendInvoice = async (invoiceId: string) => {
    try {
      const invoiceMessage = JSON.stringify({
        type: 'INVOICE',
        invoiceId
      })

      const res = await fetch(`/api/chat/${friendId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: invoiceMessage }),
      })

      if (res.ok) {
        const data = await res.json()
        if (data.message) {
          setMessages(prev => [...prev, data.message])
          setShowInvoiceSelector(false)
        }
      }
    } catch (error) {
      console.error('Error sending invoice:', error)
    }
  }

  // Détecter si un message est une facture
  const isInvoiceMessage = (content: string) => {
    try {
      const data = JSON.parse(content)
      return data.type === 'INVOICE'
    } catch {
      return false
    }
  }

  // Handler pour payer une facture
  const handlePayInvoice = async (invoiceId: string) => {
    try {
      const res = await fetch(`/api/invoices/${invoiceId}/pay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })

      if (res.ok) {
        // Mettre à jour la liste des factures localement
        setUserInvoices(prev => 
          prev.map(inv => 
            inv.id === invoiceId 
              ? { ...inv, status: 'PAID' }
              : inv
          )
        )

        // Envoyer un message de confirmation
        const confirmMessage = JSON.stringify({
          type: 'INVOICE_PAID',
          invoiceId
        })

        await fetch(`/api/chat/${friendId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: confirmMessage })
        })
      }
    } catch (error) {
      console.error('Error paying invoice:', error)
    }
  }

  // Handler pour refuser une facture
  const handleRejectInvoice = async (invoiceId: string) => {
    try {
      const res = await fetch(`/api/invoices/${invoiceId}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })

      if (res.ok) {
        // Mettre à jour la liste des factures localement
        setUserInvoices(prev => 
          prev.map(inv => 
            inv.id === invoiceId 
              ? { ...inv, status: 'REJECTED' }
              : inv
          )
        )

        // Envoyer un message de refus
        const rejectMessage = JSON.stringify({
          type: 'INVOICE_REJECTED',
          invoiceId
        })

        await fetch(`/api/chat/${friendId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: rejectMessage })
        })
      }
    } catch (error) {
      console.error('Error rejecting invoice:', error)
    }
  }

  // Fonction pour parser et afficher une facture
  const renderMessage = (message: any) => {
    if (!message.content.startsWith('{')) {
      return message.content
    }

    try {
      const data = JSON.parse(message.content)
      if (data.type === 'INVOICE') {
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-yellow-500">
              <FaFileInvoice />
              <span className="font-medium">Nouvelle Facture</span>
            </div>
            <Link 
              href={`/invoices/${data.invoiceId}`}
              className="block bg-white/5 hover:bg-white/10 rounded-lg p-3 transition"
            >
              <p className="text-sm opacity-70">Cliquez pour voir les détails</p>
            </Link>
          </div>
        )
      }
      return message.content
    } catch {
      return message.content
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
    </div>
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

      <div className="max-w-4xl mx-auto">
        {/* Bouton de retour */}
        <motion.button
          onClick={() => router.push('/dashboard')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        >
          <FaArrowLeft />
          <span>Retour</span>
        </motion.button>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
          {/* Header avec le nom de l'ami */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                {friend?.name || friend?.username || 'Chargement...'}
              </h2>
              {friend?.name && (
                <p className="text-sm opacity-70">@{friend.username}</p>
              )}
            </div>
          </div>

          {/* Messages avec hauteur ajustée */}
          <div className="h-[calc(60vh-4rem)] overflow-y-auto p-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.senderId === session?.user.id ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div className={`max-w-[70%] ${
                  message.senderId === session?.user.id 
                    ? 'bg-primary/20' 
                    : 'bg-white/20'
                } rounded-xl p-3`}>
                  <p className="text-sm opacity-70 mb-1">
                    {message.sender.name || message.sender.username}
                  </p>
                  {renderMessage(message)}
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowInvoiceSelector(true)}
                className="p-2 rounded-lg bg-primary/20 hover:bg-primary/30 transition"
              >
                <FaFileInvoice className="text-xl" />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Écrivez votre message..."
                className="flex-1 bg-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ring-primary/50"
              />
              <button
                type="submit"
                className="p-2 rounded-lg bg-primary/20 hover:bg-primary/30 transition disabled:opacity-50"
                disabled={!newMessage.trim()}
              >
                <FaPaperPlane className="text-xl" />
              </button>
            </div>
          </form>
        </div>

        {/* Modal sélecteur de factures */}
        {showInvoiceSelector && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-xl p-4 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Sélectionner une facture</h3>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {userInvoices.map((invoice) => (
                  <button
                    key={invoice.id}
                    onClick={() => handleSendInvoice(invoice.id)}
                    className="w-full p-3 rounded-lg bg-white/10 hover:bg-white/20 transition text-left"
                  >
                    <p className="font-medium">{invoice.description}</p>
                    <p className="text-sm opacity-70">{invoice.amount} FCFA</p>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowInvoiceSelector(false)}
                className="mt-4 w-full p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}