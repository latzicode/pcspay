import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const user = await prisma.$transaction(async (tx) => {
      return await tx.user.findUnique({
        where: { id: session.user.id },
        include: {
          friends: {
            select: {
              id: true,
              name: true,
              username: true
            }
          }
        }
      })
    })

    return NextResponse.json({ friends: user?.friends || [] })
  } catch (error) {
    console.error('Error fetching friends:', error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des amis" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}