import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { z } from "zod"

const responseSchema = z.object({
  requestId: z.string(),
  accept: z.boolean()
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { requestId, accept } = responseSchema.parse(body)

    const request = await prisma.friendRequest.findUnique({
      where: { id: requestId },
      include: { sender: true }
    })

    if (!request || request.receiverId !== session.user.id) {
      return NextResponse.json(
        { error: "Demande d'ami non trouvée" },
        { status: 404 }
      )
    }

    if (accept) {
      // Accepter la demande et créer la relation d'amitié
      await prisma.$transaction([
        prisma.friendRequest.update({
          where: { id: requestId },
          data: { status: 'ACCEPTED' }
        }),
        prisma.user.update({
          where: { id: session.user.id },
          data: {
            friends: {
              connect: { id: request.senderId }
            }
          }
        }),
        prisma.user.update({
          where: { id: request.senderId },
          data: {
            friends: {
              connect: { id: session.user.id }
            }
          }
        })
      ])
    } else {
      // Refuser la demande
      await prisma.friendRequest.update({
        where: { id: requestId },
        data: { status: 'REJECTED' }
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json(
      { error: "Erreur lors de la réponse à la demande" },
      { status: 500 }
    )
  }
}