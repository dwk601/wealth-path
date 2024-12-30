"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const SignupPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSignup = async () => {
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({ email, password })
      })
      if (res.ok) router.push("/login")
    } catch {
      // ...handle errors...
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl font-bold tracking-tight text-center">
              Create Account
            </CardTitle>
            <p className="text-sm text-muted-foreground text-center">
              Start your financial journey with Wealth Path
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
                  placeholder="Create a password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <Button
                onClick={handleSignup}
                className="w-full font-semibold"
                size="lg"
              >
                Create Account
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link 
                  href="/login" 
                  className="font-medium text-primary hover:underline underline-offset-4"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default SignupPage
