import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(
  request: Request,
  { params }: { params: { friendId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const invoiceId = params.friendId // On utilise friendId comme invoiceId
    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId }
    })

    if (!invoice) {
      return new NextResponse('Invoice not found', { status: 404 })
    }

    // Mettre à jour le statut de la facture
    const updatedInvoice = await prisma.invoice.update({
      where: { id: invoiceId },
      data: { status: 'PAID' }
    })

    return NextResponse.json({ invoice: updatedInvoice })
  } catch (error) {
    console.error('Error paying invoice:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}