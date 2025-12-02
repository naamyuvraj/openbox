"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Code, Zap, Shield, GitBranch, Clock, Users, BarChart3, Sparkles, Star, Folder } from "lucide-react";
import LetterGlitch from "@/components/LetterGlitch";
import ResizableNavbar  from "@/components/ResizeNav";

export default function LandingPage() {
  return (
    <div className=" bg-background text-foreground">

      <ResizableNavbar/>
      {/* Hero Section */}
      <section className="relative w-full h-[95vh] overflow-hidden"> 

        {/* LetterGlitch Background */}
        <div className="absolute inset-0  h-[95vh] flex items-center justify-center opacity-10">
          <LetterGlitch />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-32 text-center space-y-8 relative">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary">
              <Sparkles className="w-3.5 h-3.5" />
              Lightweight • Fast • Effortless
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Project management
              <span className="block text-primary mt-2">made effortless</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Skip the chaos. OpenBox gives you powerful tools wrapped in
              effortless simplicity — so you stay focused on building, not
              battling your workflow.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/signup">
              <Button size="lg" className="px-8 gap-2 text-base">
                Start Free Today
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="px-8 text-base">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why OpenBox Section */}
      <section id="why" className="py-24 bg-muted/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              Why teams choose OpenBox
            </h2>
            <p className="text-lg text-muted-foreground">
              We've reimagined project management from the ground up,
              eliminating the pain points that slow teams down
            </p>
          </div>

          {/* Why Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {[
              {
                icon: <Clock className="w-8 h-8 text-primary" />,
                title: "Save Hours Every Week",
                desc: "No more endless meetings or status update emails. OpenBox keeps everyone on the same page automatically, giving you time back for actual work.",
                highlight: "3+ hours saved weekly",
              },
              {
                icon: <Sparkles className="w-8 h-8 text-primary" />,
                title: "Delightful to Use",
                desc: "Project management shouldn't feel like a chore. Our beautiful, intuitive interface makes organizing work genuinely enjoyable.",
                highlight: "Love at first click",
              },
              {
                icon: <Users className="w-8 h-8 text-primary" />,
                title: "Built for Remote Teams",
                desc: "Whether you're across the hall or across the world, collaborate seamlessly with real-time updates and instant notifications.",
                highlight: "Work from anywhere",
              },
              {
                icon: <Zap className="w-8 h-8 text-primary" />,
                title: "Lightning Fast Performance",
                desc: "Tired of slow, laggy tools? OpenBox is engineered for speed. Every click, every update happens instantly—no waiting around.",
                highlight: "Sub-second response",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative p-8 rounded-xl border border-border bg-card hover:shadow-lg transition-all duration-300 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                <div className="relative">
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {item.desc}
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {item.highlight}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              Everything you need to succeed
            </h2>
            <p className="text-lg text-muted-foreground">
              All the essential tools, beautifully integrated
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Folder className="w-6 h-6 text-primary" />,
                title: "Smart Organization",
                desc: "Organize projects, tasks, and files exactly how you want. Flexible structure that adapts to your workflow.",
              },
              {
                icon: <GitBranch className="w-6 h-6 text-primary" />,
                title: "Real-Time Collaboration",
                desc: "See updates instantly as your team works. No refresh needed. Stay in sync effortlessly.",
              },
              {
                icon: <Shield className="w-6 h-6 text-primary" />,
                title: "Secure & Private",
                desc: "Bank-level encryption keeps your data safe. Your projects stay private and protected.",
              },
              {
                icon: <BarChart3 className="w-6 h-6 text-primary" />,
                title: "Progress Tracking",
                desc: "Visualize project progress with elegant charts and timelines. Know exactly where things stand.",
              },
              {
                icon: <Star className="w-6 h-6 text-primary" />,
                title: "Priority Management",
                desc: "Focus on what matters most. Smart prioritization helps you tackle the right tasks first.",
              },
              {
                icon: <Code className="w-6 h-6 text-primary" />,
                title: "Developer Friendly",
                desc: "Clean API, keyboard shortcuts, and markdown support. Built by developers, for everyone.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 rounded-xl border border-border bg-card hover:shadow-lg hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-muted/30 border-t border-border">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              Get started in minutes
            </h2>
            <p className="text-lg text-muted-foreground">
              Simple setup. No complicated onboarding. Start managing projects
              right away.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Create Account",
                desc: "Sign up in seconds. No credit card needed, no commitments.",
              },
              {
                step: "2",
                title: "Add Your Projects",
                desc: "Create your first project and invite team members instantly.",
              },
              {
                step: "3",
                title: "Start Collaborating",
                desc: "Begin managing tasks, tracking progress, and delivering results.",
              },
            ].map((item, i) => (
              <div key={i} className="relative text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
                {i < 2 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 w-8 h-8 text-muted-foreground/30" />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/signup">
              <Button size="lg" className="px-10 gap-2">
                Start Your Journey
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left side - Content */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold leading-tight">
                Stop juggling tools. Start getting things done.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                OpenBox brings everything together in one place. No more
                switching between apps, searching through emails, or losing
                track of important updates.
              </p>
              <ul className="space-y-4">
                {[
                  "Single source of truth for all projects",
                  "Eliminate status update meetings",
                  "Never miss a deadline again",
                  "Reduce tool fatigue and confusion",
                  "Get everyone aligned instantly",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/signup">
                <Button size="lg" className="mt-4">
                  Try OpenBox Free
                </Button>
              </Link>
            </div>

            {/* Right side - Visual */}
            <div className="relative">
              <div className="border border-border rounded-xl bg-card p-8 shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Folder className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="h-4 bg-primary/20 rounded w-2/3 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/3"></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors cursor-pointer">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="h-3 bg-muted rounded flex-1"></div>
                      <div className="w-6 h-6 rounded-full bg-primary/20"></div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors cursor-pointer">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="h-3 bg-muted rounded flex-1"></div>
                      <div className="w-6 h-6 rounded-full bg-primary/20"></div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors cursor-pointer">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <div className="h-3 bg-muted rounded flex-1"></div>
                      <div className="w-6 h-6 rounded-full bg-primary/20"></div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors cursor-pointer">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div className="h-3 bg-muted rounded flex-1"></div>
                      <div className="w-6 h-6 rounded-full bg-primary/20"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">Fast</div>
              <p className="text-muted-foreground">Sub-second response times</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">Simple</div>
              <p className="text-muted-foreground">2-minute setup process</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">Secure</div>
              <p className="text-muted-foreground">
                Enterprise-grade encryption
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to transform how you work?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Join forward-thinking teams who've already made the switch. Start
              managing projects the smart way—with OpenBox.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/signup">
              <Button size="lg" className="px-10 gap-2 text-base">
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="px-10 text-base">
                Sign In
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground pt-4">
            <CheckCircle2 className="w-4 h-4 inline mr-1 text-primary" />
            No credit card required • Free forever plan available
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link
                href="/"
                className="flex items-center gap-2 font-bold text-lg"
              >
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                  O
                </div>
                OpenBox
              </Link>
              <p className="text-sm text-muted-foreground">
                Project management made effortless. Focus on what matters.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-sm">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="#features"
                    className="hover:text-foreground transition"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#why"
                    className="hover:text-foreground transition"
                  >
                    Why OpenBox
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="hover:text-foreground transition"
                  >
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-sm">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/docs"
                    className="hover:text-foreground transition"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="hover:text-foreground transition"
                  >
                    Support
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-foreground transition"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-sm">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-foreground transition"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-foreground transition"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-foreground transition"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} OpenBox. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}