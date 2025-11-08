"use client"

import { useEffect, useState } from "react"

interface AnimatedCounterProps {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
  formatAsK?: boolean
}

export function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
  formatAsK = false,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [target, duration])

  const formatNumber = (num: number) => {
    if (formatAsK && num >= 1000) {
      return (num / 1000).toFixed(0) + "k"
    }
    return num.toLocaleString()
  }

  return (
    <span>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  )
}
