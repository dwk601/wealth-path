import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"


const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // ...check for missing credentials...
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email }
        })
        // ...compare password securely...
        if (!user) return null
        return { id: user.id, email: user.email }
      }
    })
  ]
})

export { handler as GET, handler as POST }
