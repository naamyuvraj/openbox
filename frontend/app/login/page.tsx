"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Github, Mail } from "lucide-react"

// ADD: login + googleLogin import
import { login, googleLogin } from "../service/app"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  // FINAL UPDATED LOGIN HANDLER
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await login({ email, password })

      if (result.token) {
        localStorage.setItem("token", result.token)
      }

      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  // UPDATED OAUTH HANDLER
  const handleOAuth = (provider: string) => {
    setIsLoading(true)

    if (provider === "google") {
      googleLogin()        // redirect to backend OAuth route
      return
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Left side - Branding */}
      <div className="hidden md:flex md:w-1/2 bg-foreground text-background flex-col justify-center items-center p-12">
        <div className="max-w-md space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-sm bg-background text-foreground flex items-center justify-center font-black text-xl">
              O
            </div>
            <span className="text-2xl font-black tracking-tight">OPENBOX</span>
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl font-black leading-tight">Minimal project management.</h1>
            <p className="text-lg text-background/70 leading-relaxed">
              The simplest way to manage projects with your team. Zero complexity. Pure productivity.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-foreground/20">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome</CardTitle>
            <CardDescription>Sign in to your OpenBox account</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* ERROR MESSAGE */}
            {error && (
              <p className="text-red-500 text-center text-sm">{error}</p>
            )}

            {/* OAuth buttons */}
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full gap-2 bg-transparent"
                disabled={isLoading}
                onClick={() => handleOAuth("google")}
              >
                <Mail className="w-4 h-4" />
                Continue with Google
              </Button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-2 text-muted-foreground">Or email</span>
              </div>
            </div>

            {/* Login form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="border-foreground/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="border-foreground/20"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            {/* Footer links */}
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link href="/signup" className="font-bold hover:underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
