import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
// ...existing imports if needed...

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    // ...validate details...
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }
    await prisma.user.create({
      data: { email, password } // ...hash password in production...
    })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Error creating user" }, { status: 500 })
  }
}
