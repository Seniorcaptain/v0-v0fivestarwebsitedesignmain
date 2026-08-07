"use client"

import { useEffect, useRef, useState } from "react"
import { branches } from "@/lib/branches"

interface Stat {
  value: number
  suffix: string
  label: string
  isNumeric: boolean
}

const stats: Stat[] = [
  { value: 20000, suffix: "+", label: "Students Trained", isNumeric: true },
  { value: branches.length, suffix: "", label: "Branch Locations", isNumeric: true },
  { value: 0, suffix: "NTSA", label: "Certified Driving School", isNumeric: false },
]

function useCountUp(target: number, enabled: boolean, durationMs = 1400) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!enabled) return
    let start: number | null = null
    let frame: number

    const tick = (timestamp: number) => {
      if (start === null) start = timestamp
      const progress = Math.min((timestamp - start) / durationMs, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [enabled, target, durationMs])

  return value
}

function StatItem({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [inView])

  const count = useCountUp(stat.value, inView && stat.isNumeric)

  return (
    <div className="[perspective:1200px]">
      <div
        ref={ref}
        style={{ transitionDelay: inView ? `${index * 120}ms` : "0ms" }}
        className={`text-center px-4 transition-all duration-700 ease-out [transform-style:preserve-3d] ${
          inView ? "opacity-100 [transform:rotateX(0deg)_translateY(0px)]" : "opacity-0 [transform:rotateX(14deg)_translateY(28px)]"
        }`}
      >
        <div className="text-4xl md:text-5xl font-bold text-white tabular-nums">
          {stat.isNumeric ? count.toLocaleString() : stat.suffix}
          {stat.isNumeric && <span className="text-red-500">{stat.suffix}</span>}
        </div>
        <div className="mt-2 text-sm md:text-base font-medium text-gray-400 uppercase tracking-wide">
          {stat.label}
        </div>
      </div>
    </div>
  )
}

export function TrustStatsBar() {
  return (
    <section className="bg-gray-950 border-y border-white/10 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <StatItem key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
