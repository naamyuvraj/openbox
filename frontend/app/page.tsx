"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Code,
  Zap,
  Shield,
  GitBranch,
  Clock,
  Users,
  BarChart3,
  Sparkles,
  Star,
  Folder,
} from "lucide-react";
import LetterGlitch from "@/components/LetterGlitch";
import ResizableNavbar from "@/components/ResizeNav";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <div className=" bg-background text-foreground">
      <ResizableNavbar />
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
      <section
        id="why"
        className="py-28 bg-black border-t border-white/20 relative overflow-hidden"
      >
        {/* Soft blueprint grid */}
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/grid.svg')] bg-center"></div>

        <div className="relative max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">
              Your Code. Your History. One Unified Workspace.
            </h2>
            <p className="text-lg text-white/50">
              OpenBox connects editing, version tracking, and project structure
              into one lightweight foundation — built to grow with both visual
              and command-line workflows.
            </p>
          </div>

          {/* GUI-Layer Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
            {/* Editor */}
            <div className="relative group p-1 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-primary/40 transition-all">
              <div className="rounded-xl bg-black/40 p-5 space-y-4">
                <div className="flex items-center gap-2 text-white/40 text-sm mb-3">
                  <span className="w-3 h-3 bg-red-500/50 rounded-full"></span>
                  <span className="w-3 h-3 bg-yellow-500/50 rounded-full"></span>
                  <span className="w-3 h-3 bg-green-500/50 rounded-full"></span>
                  <span className="ml-2">editor.js — Monaco Editor</span>
                </div>

                <pre className="text-[13px] text-white/60 leading-relaxed">
                  <span className="text-blue-400">function</span>{" "}
                  <span className="text-emerald-400">startEditor</span>() {"{"}
                  console.log(
                  <span className="text-amber-300">"Monaco ready"</span>);
                  {"}"}
                </pre>

                <h3 className="text-2xl font-semibold text-white">
                  Integrated Monaco Editor
                </h3>
                <p className="text-white/50">
                  A familiar coding experience built directly into the
                  workspace, designed to keep context switching to a minimum.
                </p>
              </div>
            </div>

            {/* Commits */}
            <div className="relative group p-1 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-primary/40 transition-all">
              <div className="rounded-xl bg-black/40 p-5 space-y-4">
                <div className="flex justify-between text-white/40 text-sm mb-2">
                  <span>Commit Preview</span>
                  <span>v0.3</span>
                </div>

                <div className="bg-black/60 p-3 rounded-lg text-sm space-y-1 text-white/70">
                  <div className="text-emerald-400">+ Added new component</div>
                  <div className="text-emerald-400">
                    + Updated workspace layout
                  </div>
                  <div className="text-red-400">- Removed unused imports</div>
                </div>

                <h3 className="text-2xl font-semibold text-white">
                  Version Control Made Understandable
                </h3>
                <p className="text-white/50">
                  A clear commit flow that helps you see what changed and why —
                  adaptable for both visual and future CLI-driven workflows.
                </p>
              </div>
            </div>

            {/* Repo Management */}
            <div className="relative group p-1 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-primary/40 transition-all md:col-span-2">
              <div className="rounded-xl bg-black/40 p-7 grid md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold text-white">
                    Lightweight Project Management
                  </h3>
                  <p className="text-white/50">
                    Navigate your files and versions with a simple, structured
                    view — built on a clean architecture that works seamlessly
                    across interfaces.
                  </p>
                </div>

                <div className="bg-black/60 p-4 rounded-lg text-sm text-white/60">
                  <div>📁 src/</div>
                  <div className="ml-4">components/</div>
                  <div className="ml-4">utils/</div>
                  <div>📁 configs/</div>
                  <div>📄 README.md</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-black border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">
            Everything you need to succeed
          </h2>
          <p className="text-lg text-white/50">
            All the essential tools, beautifully integrated
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4">
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
                className="p-8 rounded-xl border border-white/20 bg-black/10 hover:shadow-lg hover:border-primary/50 transition-all duration-300"
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
      <div className="border-t  border-border bg-black">
        <Footer />

        <div className="border-t border-border py-4">
          {/* Developed by  4 members so i want their name along with guthub*/}
          <p className="text-center text-md text-muted-foreground py-4">
            Developed by Oashe Mehta , Nihal C , Yuvraj and Sumit Nayak
          </p>
        </div>
      </div>
    </div>
  );
}
