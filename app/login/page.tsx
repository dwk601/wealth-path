"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async () => {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password
    })
    if (result?.ok) router.push("/")
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl font-bold tracking-tight text-center">
              Welcome back
            </CardTitle>
            <p className="text-sm text-muted-foreground text-center">
              Continue managing your finances
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  aria-label="Email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="space-y-2">
                <Input
                  aria-label="Password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <Button
                onClick={handleLogin}
                className="w-full font-semibold"
                size="lg"
              >
                Sign in
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                New to Wealth Path?{" "}
                <Link 
                  href="/signup" 
                  className="font-medium text-primary hover:underline underline-offset-4"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default LoginPage
