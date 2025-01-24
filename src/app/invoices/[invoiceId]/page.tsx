'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { FaFileInvoice, FaCheckCircle, FaTimesCircle, FaArrowLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

export default function InvoiceDetailsPage({ 
  params 
}: { 
  params: { invoiceId: string } 
}) {
  const { data: session } = useSession()
  const router = useRouter()
  const [invoice, setInvoice] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadInvoice() {
      try {
        const res = await fetch(`/api/invoice-details/${params.invoiceId}`)
        if (!res.ok) {
          throw new Error('Failed to load invoice')
        }
        const data = await res.json()
        setInvoice(data.invoice)
      } catch (error) {
        setError('Error loading invoice')
        console.error('Error loading invoice:', error)
      } finally {
        setLoading(false)
      }
    }
    loadInvoice()
  }, [params.invoiceId])

  const handlePayInvoice = async () => {
    try {
      const res = await fetch(`/api/invoices/${params.invoiceId}/pay`, {
        method: 'POST'
      })

      if (res.ok) {
        const data = await res.json()
        setInvoice(data.invoice)
      }
    } catch (error) {
      console.error('Error paying invoice:', error)
    }
  }

  const handleRejectInvoice = async () => {
    try {
      const res = await fetch(`/api/invoices/${params.invoiceId}/reject`, {
        method: 'POST'
      })

      if (res.ok) {
        const data = await res.json()
        setInvoice(data.invoice)
      }
    } catch (error) {
      console.error('Error rejecting invoice:', error)
    }
  }

  if (loading) return <div>Chargement...</div>
  if (!invoice) return <div>Facture non trouvée</div>

  return (
    <div className="min-h-screen p-4 pt-20">
      <div className="container mx-auto max-w-2xl">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-6 text-gray-400 hover:text-white transition"
        >
          <FaArrowLeft />
          Retour
        </button>

        <div className="bg-white/10 rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-3 text-yellow-500">
            <FaFileInvoice size={24} />
            <h1 className="text-2xl font-bold">Détails de la facture</h1>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm opacity-70">Description</p>
              <p className="font-medium">{invoice.description || 'Sans description'}</p>
            </div>

            <div>
              <p className="text-sm opacity-70">Montant</p>
              <p className="text-2xl font-bold">{invoice.amount} FCFA</p>
            </div>

            <div>
              <p className="text-sm opacity-70">Type</p>
              <p className="font-medium">{invoice.type}</p>
            </div>

            <div>
              <p className="text-sm opacity-70">Statut</p>
              <p className={`font-medium ${
                invoice.status === 'PENDING' ? 'text-yellow-500' :
                invoice.status === 'PAID' ? 'text-green-500' :
                'text-red-500'
              }`}>
                {invoice.status}
              </p>
            </div>
          </div>

          {invoice.status === 'PENDING' && invoice.userId !== session?.user.id && (
            <div className="flex gap-3">
              <button
                onClick={handlePayInvoice}
                className="flex-1 py-3 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-500 font-medium transition"
              >
                Payer maintenant
              </button>
              <button
                onClick={handleRejectInvoice}
                className="flex-1 py-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-500 font-medium transition"
              >
                Refuser
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}