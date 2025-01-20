'use client'

import { useSession, signOut } from 'next-auth/react'
import { useVisuals } from '@/contexts/VisualContext'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Invoice, Transaction } from '@prisma/client'
import AddInvoiceForm from '@/components/invoices/AddInvoiceForm'
import { FaUserCircle, FaCog, FaSignOutAlt, FaUsers, FaFileInvoiceDollar, FaWallet } from 'react-icons/fa'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'

type DashboardData = {
  pendingInvoices: number
  monthlyTransactions: number
  totalAmount: number
  recentInvoices: Invoice[]
  recentTransactions: Transaction[]
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const { getBackgroundStyle } = useVisuals()
  const { theme } = useTheme()
  const [data, setData] = useState<{
    pendingInvoices: number;
    monthlyTransactions: number;
    totalAmount: number;
    recentInvoices: any[];
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [showAddInvoice, setShowAddInvoice] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  async function fetchDashboardData() {
    try {
      const res = await fetch('/api/invoices')
      const { invoices } = await res.json()

      setData({
        pendingInvoices: invoices.filter((inv: any) => inv.status === 'PENDING').length,
        monthlyTransactions: 0, // À implémenter plus tard
        totalAmount: invoices.reduce((acc: number, inv: any) => acc + inv.amount, 0),
        recentInvoices: invoices.slice(0, 5)
      })
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const refreshData = () => {
    fetchDashboardData()
  }

  if (loading) {
    return <div>Chargement...</div> // On fera un beau loader plus tard
  }

  return (
    <div>
      {/* Background */}
      <div className="fixed inset-0 -z-10">
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

      {/* Contenu existant */}
      <div className="min-h-screen p-4 sm:p-6 lg:p-8 pt-20 sm:pt-24 lg:pt-28">
        {/* Layout flex sous le header */}
        <div className="flex h-[calc(100vh-7rem)]">
          <Sidebar />
          <div className="flex-1 overflow-y-auto pl-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-7xl mx-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">
                  Bienvenue, {session?.user?.name || 'utilisateur'}
                </h1>

                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    <FaUserCircle className="text-xl" />
                    <span className="hidden sm:block">{session?.user?.email}</span>
                  </motion.button>

                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl z-50"
                    >
                      <div className="px-4 py-2 border-b border-white/10">
                        <p className="font-medium">{session?.user?.name}</p>
                        <p className="text-sm opacity-70">{session?.user?.email}</p>
                      </div>
                      
                      <button
                        onClick={() => {/* TODO: Implémenter les paramètres */}}
                        className="w-full text-left px-4 py-2 hover:bg-white/10 transition flex items-center gap-2"
                      >
                        <FaCog className="text-sm" />
                        Paramètres
                      </button>
                      
                      <button
                        onClick={() => signOut()}
                        className="w-full text-left px-4 py-2 hover:bg-white/10 transition flex items-center gap-2 text-red-400"
                      >
                        <FaSignOutAlt className="text-sm" />
                        Se déconnecter
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-8">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-xl bg-white/10 border border-white/20"
                >
                  <h3 className="font-medium mb-2">Factures en attente</h3>
                  <p className="text-2xl font-bold">{data?.pendingInvoices || 0}</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-xl bg-white/10 border border-white/20"
                >
                  <h3 className="font-medium mb-2">Transactions du mois</h3>
                  <p className="text-2xl font-bold">{data?.monthlyTransactions || 0}</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-xl bg-white/10 border border-white/20"
                >
                  <h3 className="font-medium mb-2">Montant total</h3>
                  <p className="text-2xl font-bold">{data?.totalAmount || 0} €</p>
                </motion.div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-semibold">Dernières factures</h2>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowAddInvoice(true)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-medium"
                >
                  Nouvelle facture
                </motion.button>
              </div>

              {/* Dernières factures */}
              <div className="mb-8">
                <div className="bg-white/10 border border-white/20 rounded-xl overflow-hidden">
                  {data?.recentInvoices.length === 0 ? (
                    <p className="p-4 text-center text-sm opacity-70">
                      Aucune facture pour le moment
                    </p>
                  ) : (
                    data?.recentInvoices.map((invoice) => (
                      <div 
                        key={invoice.id}
                        className="p-4 border-b border-white/10 last:border-0"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{invoice.type}</p>
                            <p className="text-sm opacity-70">
                              {new Date(invoice.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{invoice.amount} €</p>
                            <p className={`text-sm ${
                              invoice.status === 'PENDING' ? 'text-yellow-500' :
                              invoice.status === 'PAID' ? 'text-green-500' :
                              'text-red-500'
                            }`}>
                              {invoice.status}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <AddInvoiceForm 
        isOpen={showAddInvoice}
        onClose={() => setShowAddInvoice(false)}
        onSuccess={refreshData}
      />

      <Link 
        href="/friends" 
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition"
      >
        <FaUsers className="text-xl" />
        <span>Amis</span>
      </Link>
    </div>
  )
}