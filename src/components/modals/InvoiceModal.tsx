'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { FaTimes, FaFileInvoiceDollar } from 'react-icons/fa'

type Friend = {
  id: string
  name: string | null
  username: string
}

type Invoice = {
  id: string
  amount: number
  status: 'PENDING' | 'PAID'
  dueDate: string
  createdAt: string
  type: string
  description?: string
}

type InvoiceModalProps = {
  isOpen: boolean
  onClose: () => void
  friend: Friend
}

export default function InvoiceModal({ isOpen, onClose, friend }: InvoiceModalProps) {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending')
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadInvoices() {
      try {
        const res = await fetch(`/api/invoices/${friend.id}`)
        const data = await res.json()
        if (data.invoices) {
          setInvoices(data.invoices)
        }
      } catch (error) {
        console.error('Error loading invoices:', error)
      } finally {
        setLoading(false)
      }
    }

    if (isOpen) {
      loadInvoices()
    }
  }, [friend.id, isOpen])

  async function handlePayment(invoiceId: string) {
    try {
      const res = await fetch(`/api/invoices/${invoiceId}/pay`, {
        method: 'POST',
      })
      
      if (res.ok) {
        // Mettre à jour la liste des factures
        setInvoices(prev => 
          prev.map(inv => 
            inv.id === invoiceId 
              ? { ...inv, status: 'PAID' as const } 
              : inv
          )
        )
      }
    } catch (error) {
      console.error('Payment error:', error)
    }
  }

  const filteredInvoices = invoices.filter(inv => 
    activeTab === 'pending' 
      ? inv.status === 'PENDING'
      : inv.status === 'PAID'
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal - MOBILE FIRST */}
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className={`
              fixed bottom-0 left-0 right-0 
              h-[85vh] 
              md:h-auto md:max-h-[85vh]
              md:w-[90vw] md:max-w-2xl
              md:left-1/2 md:top-1/2 
              md:-translate-x-1/2 md:-translate-y-1/2
              ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}
              rounded-t-2xl md:rounded-2xl 
              shadow-xl z-50
              overflow-hidden
            `}
          >
            {/* Header avec bouton de fermeture en haut à droite */}
            <div className={`
              sticky top-0 z-10
              p-4 md:p-6 
              border-b ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}
              flex items-center justify-between
              bg-inherit
            `}>
              <div className="flex items-center gap-3">
                <div className={`
                  w-10 h-10 rounded-full
                  ${theme === 'dark' ? 'bg-primary/20' : 'bg-primary/10'}
                  flex items-center justify-center
                `}>
                  <FaFileInvoiceDollar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">
                    Factures de {friend.name || friend.username}
                  </h2>
                  <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-500'}`}>
                    @{friend.username}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className={`
                  p-2 rounded-lg
                  ${theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-gray-100'}
                  transition-colors
                `}
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs collés au header */}
            <div className={`
              sticky top-[73px] z-10
              flex p-3 gap-2 
              border-b ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}
              bg-inherit
            `}>
              <button
                onClick={() => setActiveTab('pending')}
                className={`
                  flex-1 py-2 px-4 rounded-lg text-sm font-medium
                  transition-colors
                  ${activeTab === 'pending'
                    ? theme === 'dark'
                      ? 'bg-white/10'
                      : 'bg-gray-100'
                    : ''
                  }
                `}
              >
                En attente
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`
                  flex-1 py-2 px-4 rounded-lg text-sm font-medium
                  transition-colors
                  ${activeTab === 'history'
                    ? theme === 'dark'
                      ? 'bg-white/10'
                      : 'bg-gray-100'
                    : ''
                  }
                `}
              >
                Historique
              </button>
            </div>

            {/* Contenu scrollable - CORRECTION HAUTEUR DESKTOP */}
            <div className="
              overflow-y-auto 
              p-3 
              space-y-3
              h-[calc(85vh-140px)] 
              md:max-h-[calc(70vh-140px)]
              md:h-auto
            ">
              {loading ? (
                <div className="flex justify-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary" />
                </div>
              ) : filteredInvoices.length === 0 ? (
                <p className={`text-center py-8 text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-500'}`}>
                  Aucune facture {activeTab === 'pending' ? 'en attente' : 'dans l\'historique'}
                </p>
              ) : (
                <div className="space-y-3 pb-4">
                  {filteredInvoices.map((invoice) => (
                    <motion.div
                      key={invoice.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`
                        p-4 rounded-xl
                        ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}
                      `}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{invoice.type}</h3>
                        <span className={`
                          px-2 py-1 rounded-full text-xs
                          ${invoice.status === 'PENDING'
                            ? theme === 'dark'
                              ? 'bg-amber-500/20 text-amber-300'
                              : 'bg-amber-100 text-amber-800'
                            : theme === 'dark'
                              ? 'bg-green-500/20 text-green-300'
                              : 'bg-green-100 text-green-800'
                          }
                        `}>
                          {invoice.status === 'PENDING' ? 'En attente' : 'Payée'}
                        </span>
                      </div>
                      
                      <p className={`
                        text-sm mb-4
                        ${theme === 'dark' ? 'text-white/60' : 'text-gray-500'}
                      `}>
                        {invoice.status === 'PENDING'
                          ? `Échéance le ${new Date(invoice.dueDate).toLocaleDateString()}`
                          : `Payée le ${new Date(invoice.createdAt).toLocaleDateString()}`
                        }
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold">
                          {new Intl.NumberFormat('fr-FR').format(invoice.amount)} FCFA
                        </p>
                        {invoice.status === 'PENDING' && (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePayment(invoice.id)}
                            className={`
                              px-4 py-2 rounded-lg text-sm font-medium
                              ${theme === 'dark'
                                ? 'bg-primary/20 hover:bg-primary/30'
                                : 'bg-primary/10 hover:bg-primary/20'
                              }
                              transition-colors
                            `}
                          >
                            Payer maintenant
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}