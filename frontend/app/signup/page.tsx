"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, Eye, EyeOff } from "lucide-react";
import { register } from "../service/app"; 

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await register({ name, email, password, username }); 

      if (result.token) {
        localStorage.setItem("token", result.token);
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">

      {/* LEFT SIDE (BRANDING) */}
      <div className="hidden md:flex md:w-1/2 bg-foreground text-background flex-col justify-center items-center p-12">
        <div className="max-w-md space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-sm bg-background text-foreground flex items-center justify-center font-black text-xl">
              O
            </div>
            <span className="text-2xl font-black tracking-tight">OPENBOX</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl font-black leading-tight">Clean & Focus.</h1>
            <p className="text-lg text-background/70 leading-relaxed">
              Join the community of teams building great things with zero noise. Just pure collaboration.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE (FORM) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-foreground/20">
          <CardHeader>
            <CardTitle className="text-2xl">Create account</CardTitle>
            <CardDescription>Get started with OpenBox</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">

            {error && (
              <p className="text-red-500 text-sm text-center font-medium">{error}</p>
            )}

            {/* GOOGLE BUTTON */}
            <Button
              type="button"
              variant="outline"
              className="w-full gap-2 bg-transparent border-foreground/20"
              disabled={isLoading}
              onClick={() => {
                import("../service/app").then((m) => {
                  setIsLoading(true);
                  m.googleLogin();
                });
              }}
            >
              <Mail className="w-4 h-4" />
              Continue with Google
            </Button>

            {/* DIVIDER */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-2 text-muted-foreground uppercase tracking-widest">or email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                    className="border-foreground/20"
                  />
                </div>

                {/* Username */}
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="janedoe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isLoading}
                    className="border-foreground/20"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jane@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="border-foreground/20"
                />
              </div>

              {/* Password */}
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

              <Button type="submit" className="w-full font-bold" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Sign up"}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link href="/login" className="font-bold hover:underline">
                Sign in
              </Link>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
