'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type AddInvoiceFormProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function AddInvoiceForm({ isOpen, onClose, onSuccess }: AddInvoiceFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    
    try {
      const res = await fetch('/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Number(formData.get('amount')),
          type: formData.get('type'),
          description: formData.get('description'),
        }),
      })

      if (!res.ok) {
        throw new Error('Erreur lors de la création de la facture')
      }

      onSuccess()
      onClose()
    } catch (error) {
      setError('Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6">Nouvelle facture</h2>
            
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label htmlFor="type" className="block text-sm font-medium mb-2">
                  Type de facture
                </label>
                <select
                  id="type"
                  name="type"
                  required
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-primary outline-none"
                >
                  <option value="ELECTRICITY">Électricité</option>
                  <option value="WATER">Eau</option>
                  <option value="SCHOOL">École</option>
                  <option value="MEDICAL">Médical</option>
                  <option value="OTHER">Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium mb-2">
                  Montant (€)
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  required
                  min="0"
                  step="0.01"
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-primary outline-none"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Description (optionnelle)
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-primary outline-none"
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg hover:bg-white/10 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-medium disabled:opacity-50"
                >
                  {loading ? 'Création...' : 'Créer la facture'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}