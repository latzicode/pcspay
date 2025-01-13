// types/models.ts
interface User {
    id: string
    name: string
    email: string
    role: 'diaspora' | 'beneficiary'
    country: string
  }
  
  interface Bill {
    id: string
    reference: string
    amount: number
    type: 'electricity' | 'water' | 'school'
    status: 'pending' | 'paid'
    provider: string
    beneficiaryId: string
    dueDate: Date
    createdAt: Date
  }
  
  interface Transaction {
    id: string
    billId: string
    senderId: string
    amount: number
    status: 'completed' | 'failed'
    createdAt: Date
  }