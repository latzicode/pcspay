'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import BackButton from '@/components/ui/BackButton'

export default function PayBillPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-20">
      <BackButton />
      {/* Section Contacts */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">
          Payer pour un proche
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {['Maman', 'Papa', 'Fatou', 'Amadou'].map((contact, index) => (
            <motion.a
              key={contact}
              href={`/contact/${index + 1}`}
              className="group p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative w-16 h-16 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                👤
              </div>
              <p className="text-center font-medium">{contact}</p>
              <p className="text-sm text-text-muted text-center">En ligne</p>
            </motion.a>
          ))}
          <motion.button
            className="p-4 rounded-xl border-2 border-dashed border-white/20 hover:border-white/40 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/5 flex items-center justify-center">
              <span className="text-2xl">+</span>
            </div>
            <p className="text-center font-medium">Ajouter</p>
            <p className="text-sm text-text-muted text-center">un contact</p>
          </motion.button>
        </div>
      </section>

      {/* Section Factures Récentes */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">
          Factures récentes
        </h2>
        <div className="grid gap-4">
          {[
            { type: 'electricity', provider: 'Senelec', amount: 45000, contact: 'Maman', reference: 'SN45678' },
            { type: 'water', provider: 'SDE', amount: 28000, contact: 'Papa', reference: 'SDE34567' },
            { type: 'school', provider: 'École ABC', amount: 150000, contact: 'Fatou', reference: 'ABC12345' },
          ].map((bill, i) => (
            <motion.a
              key={i}
              href={`/pay-bill/${bill.reference}`}
              className="group p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors block"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  {bill.type === 'electricity' && '⚡'}
                  {bill.type === 'water' && '💧'}
                  {bill.type === 'school' && '📚'}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{bill.provider}</p>
                  <p className="text-sm text-text-muted">Pour {bill.contact}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{new Intl.NumberFormat('fr-FR').format(bill.amount)} FCFA</p>
                  <p className="text-sm text-text-muted">À payer</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Section Nouvelle Facture */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          Nouvelle facture
        </h2>
        <motion.button
          className="w-full p-6 rounded-xl bg-gradient-to-r from-primary to-accent text-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="text-4xl mb-3">📱</div>
          <p className="font-medium text-lg mb-1">Scanner une facture</p>
          <p className="text-sm opacity-80">Prenez en photo ou importez une facture</p>
        </motion.button>
      </section>
    </div>
  )
}
