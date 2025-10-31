import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { AnimatedCounter } from "@/components/ui/animated-counter"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background sticky top-0 z-50">
        <div className="container-safe max-w-7xl mx-auto h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-base tracking-tight">
            <div className="w-8 h-8 rounded-sm bg-foreground text-background flex items-center justify-center font-black text-sm">
              O
            </div>
            <span>OPENBOX</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/login">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto py-20 px-3 md:px-4 space-y-10">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-balance">
            Manage projects the right way.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            A minimal, powerful project manager. No noise. No distractions. Just pure project management.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link href="/login">
            <Button size="lg" className="gap-2 px-6 md:px-8">
              Try Demo
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="gap-2 px-6 md:px-8 bg-transparent">
              Learn More
            </Button>
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 pt-12 md:pt-16 border-t border-border">
          {[
            { title: "Zero Bloat", description: "Clean interface with only essential features" },
            { title: "Fast & Smooth", description: "Lightning-quick interactions and instant feedback" },
            { title: "Built to Scale", description: "Manage projects of any size effortlessly" },
          ].map((feature, i) => (
            <div key={i} className="space-y-2">
              <h3 className="font-bold text-base md:text-lg">{feature.title}</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-background py-16 md:py-20 w-full">
        <div className="w-full max-w-6xl mx-auto px-3 md:px-4">
          <div className="text-center space-y-3 mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Trusted by teams worldwide</h2>
            <p className="text-base md:text-lg text-muted-foreground">Real-time stats from OpenBox users</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {[
              { label: "Active Users", target: 50000, formatAsK: true },
              { label: "Projects Managed", target: 10000, formatAsK: true },
              { label: "Commits Tracked", target: 500000, formatAsK: true },
              { label: "Teams Collaborating", target: 100, formatAsK: true },
            ].map((stat, i) => (
              <div
                key={i}
                className="border border-border rounded-lg p-4 md:p-6 text-center space-y-2 hover:bg-muted transition-colors"
              >
                <div className="text-4xl md:text-5xl font-black text-foreground">
                  <AnimatedCounter target={stat.target} formatAsK={stat.formatAsK} suffix="+" />
                </div>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mt-8 md:mt-10">
            {[
              { label: "Uptime", target: 99.9, suffix: "%", formatAsK: false },
              { label: "Files Managed", target: 50, suffix: "M+", formatAsK: false },
              { label: "Daily Commits", target: 100000, formatAsK: true },
            ].map((stat, i) => (
              <div
                key={i}
                className="border border-border rounded-lg p-4 md:p-6 text-center space-y-2 hover:bg-muted transition-colors"
              >
                <div className="text-4xl md:text-5xl font-black text-foreground">
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    duration={2500}
                    formatAsK={stat.formatAsK}
                  />
                </div>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted py-12 md:py-16 mt-12 md:mt-16 w-full">
        <div className="w-full max-w-2xl mx-auto px-3 md:px-4 text-center space-y-4 md:space-y-6">
          <h2 className="text-3xl md:text-4xl font-black">Ready to simplify?</h2>
          <p className="text-muted-foreground text-base md:text-lg">Join teams managing projects the minimal way.</p>
          <Link href="/login" className="inline-block">
            <Button size="lg">Start Using OpenBox</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
