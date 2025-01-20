import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('q')

    if (!query) {
      return NextResponse.json({ users: [] })
    }

    // Recherche des utilisateurs
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: query, mode: 'insensitive' } },
          { name: { contains: query, mode: 'insensitive' } }
        ],
        NOT: {
          id: session.user.id // Exclure l'utilisateur actuel
        }
      },
      select: {
        id: true,
        username: true,
        name: true,
      }
    })

    // Récupérer les statuts d'amitié pour chaque utilisateur
    const usersWithStatus = await Promise.all(
      users.map(async (user) => {
        // Vérifier si déjà amis
        const friendship = await prisma.user.findFirst({
          where: {
            AND: [
              { id: session.user.id },
              { friends: { some: { id: user.id } } }
            ]
          }
        })

        if (friendship) {
          return { ...user, friendStatus: 'FRIEND' }
        }

        // Vérifier les demandes d'amitié en attente
        const pendingRequest = await prisma.friendRequest.findFirst({
          where: {
            OR: [
              {
                senderId: session.user.id,
                receiverId: user.id,
                status: 'PENDING'
              },
              {
                senderId: user.id,
                receiverId: session.user.id,
                status: 'PENDING'
              }
            ]
          }
        })

        if (pendingRequest) {
          return {
            ...user,
            friendStatus: pendingRequest.senderId === session.user.id
              ? 'PENDING_SENT'
              : 'PENDING_RECEIVED'
          }
        }

        return { ...user, friendStatus: 'NONE' }
      })
    )

    return NextResponse.json({ users: usersWithStatus })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: "Erreur lors de la recherche" },
      { status: 500 }
    )
  }
}