import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    
    const settings = await prisma.settings.findUnique({
      where: { userId: userId! }
    })
    return NextResponse.json(settings)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching settings' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const settings = await prisma.settings.update({
      where: { userId: body.userId },
      data: {
        currency: body.currency,
        theme: body.theme,
        notifications: body.notifications
      }
    })
    return NextResponse.json(settings)
  } catch (error) {
    return NextResponse.json({ error: 'Error updating settings' }, { status: 500 })
  }
}
