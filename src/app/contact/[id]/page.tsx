'use client'

import { motion } from 'framer-motion'
import BackButton from '@/components/ui/BackButton'

export default function ContactProfilePage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-3xl mx-auto px-4 pt-20">
      <BackButton />
      {/* En-tête du profil */}
      <section className="mb-8 text-center">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-4xl">
          👤
        </div>
        <h1 className="text-2xl font-bold mb-1">Maman</h1>
        <p className="text-text-muted">Dakar, Sénégal</p>
        <div className="mt-6 flex justify-center gap-4">
          <motion.button
            className="px-6 py-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Appeler
          </motion.button>
          <motion.button
            className="px-6 py-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Message
          </motion.button>
        </div>
      </section>

      {/* Stats rapides */}
      <section className="mb-8 grid grid-cols-3 gap-4">
        <div className="bg-white/5 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold mb-1">12</p>
          <p className="text-sm text-text-muted">Factures payées</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold mb-1">3</p>
          <p className="text-sm text-text-muted">En attente</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold mb-1">450k</p>
          <p className="text-sm text-text-muted">Total FCFA</p>
        </div>
      </section>

      {/* Factures en attente */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Factures en attente</h2>
        <div className="space-y-3">
          {[
            { type: 'electricity', provider: 'Senelec', amount: 45000, dueDate: '15 Feb' },
            { type: 'water', provider: 'SDE', amount: 28000, dueDate: '20 Feb' },
          ].map((bill, i) => (
            <motion.a
              key={i}
              href={`/pay-bill/REF${i}`}
              className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                  {bill.type === 'electricity' ? '⚡' : '💧'}
                </div>
                <div>
                  <p className="font-medium">{bill.provider}</p>
                  <p className="text-sm text-text-muted">Échéance {bill.dueDate}</p>
                </div>
              </div>
              <p className="font-medium">
                {new Intl.NumberFormat('fr-FR').format(bill.amount)} FCFA
              </p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Tendances */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Tendances mensuelles</h2>
        <div className="bg-white/5 rounded-xl p-6">
          <div className="h-48 flex items-end justify-between gap-2">
            {[35, 42, 28, 45, 38, 41].map((height, i) => (
              <motion.div
                key={i}
                className="w-full bg-primary/40 rounded-t"
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: i * 0.1 }}
              />
            ))}
          </div>
          <div className="mt-4 flex justify-between text-sm text-text-muted">
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
            <span>Jan</span>
            <span>Feb</span>
          </div>
        </div>
      </section>

      {/* Historique récent */}
      <section>
        <h2 className="text-xl font-bold mb-4">Activité récente</h2>
        <div className="space-y-3">
          {[
            { action: 'Facture payée', details: 'Senelec - Janvier', amount: 45000, date: 'Il y a 2j' },
            { action: 'Message', details: 'A envoyé un reçu', date: 'Il y a 3j' },
            { action: 'Facture payée', details: 'SDE - Janvier', amount: 28000, date: 'Il y a 5j' },
          ].map((activity, i) => (
            <motion.div
              key={i}
              className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  {activity.amount ? '💰' : '💬'}
                </div>
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-text-muted">{activity.details}</p>
                </div>
              </div>
              <div className="text-right">
                {activity.amount && (
                  <p className="font-medium">
                    {new Intl.NumberFormat('fr-FR').format(activity.amount)} FCFA
                  </p>
                )}
                <p className="text-sm text-text-muted">{activity.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
} 