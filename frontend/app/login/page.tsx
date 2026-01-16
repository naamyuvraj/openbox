"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, Eye, EyeOff } from "lucide-react";

// api idhar se ayega
import { login, googleLogin } from "../service/app";

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      router.push("/dashboard");
    }
  }, [searchParams, router]);

  // ---
  // normal login form
  // ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await login({ email, password });

      if (result.token) {
        localStorage.setItem("token", result.token);
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  // ---
  // google wala login
  // ---
  const handleGoogleOAuth = () => {
    setIsLoading(true);
    googleLogin(); // Redirects to backend Google OAuth route
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">

      {/* left ka hissa */}
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

      {/* form idhar hai */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-foreground/20">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome</CardTitle>
            <CardDescription>Sign in to your OpenBox account</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">

            {/* error message aya toh */}
            {error && <p className="text-red-500 text-center text-sm">{error}</p>}

            {/* google button hai */}
            <Button
              type="button"
              variant="outline"
              className="w-full gap-2 bg-transparent"
              disabled={isLoading}
              onClick={handleGoogleOAuth}
            >
              <Mail className="w-4 h-4" />
              Continue with Google
            </Button>

            {/* line banaya beech mein */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-2 text-muted-foreground">Email</span>
              </div>
            </div>

            {/* actual form shuru */}
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
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="border-foreground/20 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            {/* neeche ka part */}
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link href="/signup" className="font-bold hover:underline">Sign up</Link>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex flex-col items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
