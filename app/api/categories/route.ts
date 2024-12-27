import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const category = await prisma.category.create({
      data: {
        userId: body.userId,
        name: body.name,
        type: body.type,
        icon: body.icon
      }
    })
    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ error: 'Error creating category' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    
    const categories = await prisma.category.findMany({
      where: { userId: userId! }
    })
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching categories' }, { status: 500 })
  }
}
