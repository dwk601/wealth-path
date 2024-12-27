import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const budget = await prisma.budget.create({
      data: {
        userId: body.userId,
        categoryId: body.categoryId,
        amount: body.amount,
        period: body.period,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate)
      }
    })
    return NextResponse.json(budget)
  } catch (error) {
    return NextResponse.json({ error: 'Error creating budget' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    
    const budgets = await prisma.budget.findMany({
      where: { userId: userId! },
      include: { category: true }
    })
    return NextResponse.json(budgets)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching budgets' }, { status: 500 })
  }
}
