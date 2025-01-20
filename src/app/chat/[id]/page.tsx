'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useVisuals } from '@/contexts/VisualContext'
import { useTheme } from 'next-themes'
import { FaPaperPlane } from 'react-icons/fa'

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
  
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

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
        <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
          {/* Messages */}
          <div className="h-[60vh] overflow-y-auto p-4">
            {messages && messages.map((message) => (
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
                  <p>{message.content}</p>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10">
            <div className="flex gap-2">
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
      </div>
    </div>
  )
}