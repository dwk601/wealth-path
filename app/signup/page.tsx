"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
// ...existing imports...

const SignupPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSignup = async () => {
    try {
      // ...basic form validation...
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
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <div className="flex flex-col mt-4">
        <input
          aria-label="Email"
          type="email"
          className="mb-2 p-2 border"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          tabIndex={0}
        />
        <input
          aria-label="Password"
          type="password"
          className="mb-2 p-2 border"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          tabIndex={0}
        />
        <button
          onClick={handleSignup}
          onKeyDown={(e) => e.key === "Enter" && handleSignup()}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          tabIndex={0}
        >
          Sign Up
        </button>
      </div>
    </main>
  )
}

export default SignupPage
