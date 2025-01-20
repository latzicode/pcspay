import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { z } from "zod"

const requestSchema = z.object({
  receiverId: z.string()
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { receiverId } = requestSchema.parse(body)

    // Vérifier si une demande existe déjà
    const existingRequest = await prisma.friendRequest.findUnique({
      where: {
        senderId_receiverId: {
          senderId: session.user.id,
          receiverId
        }
      }
    })

    if (existingRequest) {
      return NextResponse.json(
        { error: "Une demande d'ami existe déjà" },
        { status: 400 }
      )
    }

    // Créer la demande d'ami
    const friendRequest = await prisma.friendRequest.create({
      data: {
        senderId: session.user.id,
        receiverId,
        status: 'PENDING'
      }
    })

    return NextResponse.json({ friendRequest })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json(
      { error: "Erreur lors de la création de la demande d'ami" },
      { status: 500 }
    )
  }
}