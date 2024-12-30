"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
// ...existing imports...

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
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Log In</h1>
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
          onClick={handleLogin}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          className="bg-green-500 text-white px-4 py-2 rounded"
          tabIndex={0}
        >
          Log In
        </button>
      </div>
    </main>
  )
}

export default LoginPage
