'use client'

import { motion } from 'framer-motion'
import BackButton from '@/components/ui/BackButton'

export default function BillDetailPage({ params }: { params: { reference: string } }) {
  return (
    <div className="max-w-3xl mx-auto px-4 pt-20">
      <BackButton />
      {/* En-tête de la facture */}
      <section className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl">
            ⚡
          </div>
          <div>
            <h1 className="text-2xl font-bold">Facture Senelec</h1>
            <p className="text-text-muted">Pour Maman • Échéance dans 5 jours</p>
          </div>
        </div>
        
        <div className="bg-white/5 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-text-muted">Montant</span>
            <span className="text-3xl font-bold">
              {new Intl.NumberFormat('fr-FR').format(45000)} FCFA
            </span>
          </div>
          <motion.button
            className="w-full py-4 bg-gradient-to-r from-primary to-accent rounded-lg font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Payer maintenant
          </motion.button>
        </div>
      </section>

      {/* Détails de la facture */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Détails</h2>
        <div className="bg-white/5 rounded-xl p-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-text-muted">Référence</span>
            <span className="font-medium">{params.reference}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Période</span>
            <span className="font-medium">Janvier 2024</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Consommation</span>
            <span className="font-medium">234 kWh</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Compteur</span>
            <span className="font-medium">DK-98765</span>
          </div>
        </div>
      </section>

      {/* Historique des paiements */}
      <section>
        <h2 className="text-xl font-bold mb-4">Historique</h2>
        <div className="space-y-3">
          {[
            { date: 'Déc 2023', amount: 42000 },
            { date: 'Nov 2023', amount: 38000 },
            { date: 'Oct 2023', amount: 41000 },
          ].map((payment, i) => (
            <motion.div
              key={i}
              className="flex justify-between items-center p-4 bg-white/5 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  ✓
                </div>
                <div>
                  <p className="font-medium">Payé</p>
                  <p className="text-sm text-text-muted">{payment.date}</p>
                </div>
              </div>
              <span className="font-medium">
                {new Intl.NumberFormat('fr-FR').format(payment.amount)} FCFA
              </span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
} 