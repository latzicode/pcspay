import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { z } from "zod"

// GET pour récupérer l'historique des messages
export async function GET(req: Request, { params }: { params: { friendId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const messages = await prisma.chatMessage.findMany({
      where: {
        OR: [
          {
            senderId: session.user.id,
            receiverId: params.friendId
          },
          {
            senderId: params.friendId,
            receiverId: session.user.id
          }
        ]
      },
      orderBy: {
        createdAt: 'asc'
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            username: true
          }
        }
      }
    })

    return NextResponse.json({ messages })
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des messages" },
      { status: 500 }
    )
  }
}

// POST pour envoyer un message
const messageSchema = z.object({
  content: z.string().min(1)
})

export async function POST(req: Request, { params }: { params: { friendId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { content } = messageSchema.parse(body)

    const message = await prisma.chatMessage.create({
      data: {
        content,
        senderId: session.user.id,
        receiverId: params.friendId,
        read: false
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            username: true
          }
        }
      }
    })

    return NextResponse.json({ message })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message" },
      { status: 500 }
    )
  }
}