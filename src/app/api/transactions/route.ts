import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { z } from "zod"

const transactionSchema = z.object({
  amount: z.number().positive(),
  currencyId: z.string(),
  invoiceId: z.string().optional(),
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { amount, currencyId, invoiceId } = transactionSchema.parse(body)

    const transaction = await prisma.transaction.create({
      data: {
        amount,
        currencyId,
        userId: session.user.id,
        status: "PENDING",
        invoiceId,
      },
      include: {
        currency: true,
        invoice: true,
      }
    })

    return NextResponse.json({ transaction })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json(
      { error: "Erreur lors de la création de la transaction" },
      { status: 500 }
    )
  }
}

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: session.user.id
    },
    include: {
      currency: true,
      invoice: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return NextResponse.json({ transactions })
}