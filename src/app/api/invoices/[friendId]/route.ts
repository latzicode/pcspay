import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function GET(
  request: Request,
  { params }: { params: { friendId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new Response('Unauthorized', { status: 401 })
    }

    const invoices = await prisma.invoice.findMany({
      where: {
        userId: params.friendId  // Uniquement les factures créées par l'ami
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return Response.json({ invoices })
  } catch (error) {
    console.error('Error fetching invoices:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
} 