import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { z } from "zod"

// Schéma de validation
const createInvoiceSchema = z.object({
  amount: z.number().positive(),
  type: z.enum(["ELECTRICITY", "WATER", "SCHOOL", "MEDICAL", "OTHER"]),
  description: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    // 1. Vérifier l'auth
    const session = await getServerSession(authOptions)
    console.log('Session:', session) // Debug
    
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // 2. Parser le body
    const body = await req.json()
    console.log('Request body:', body) // Debug

    // 3. Valider les données
    const { amount, type, description } = createInvoiceSchema.parse(body)
    console.log('Validated data:', { amount, type, description }) // Debug

    // 4. Créer la facture
    const invoice = await prisma.invoice.create({
      data: {
        amount,
        type,
        ...(description ? { description } : {}), // N'ajoute description que si non vide
        status: "PENDING",
        userId: session.user.id,
      },
    })
    console.log('Created invoice:', invoice) // Debug

    return NextResponse.json({ invoice })
  } catch (error) {
    // Log complet de l'erreur
    console.error('Detailed error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    })

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }

    return NextResponse.json(
      { error: "Erreur lors de la création de la facture", details: error.message },
      { status: 500 }
    )
  }
}

export async function GET() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  const invoices = await prisma.invoice.findMany({
    where: {
      userId: session.user.id
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return NextResponse.json({ invoices })
}