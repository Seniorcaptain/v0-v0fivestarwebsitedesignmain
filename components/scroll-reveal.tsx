"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  /** Stagger delay in ms — use to cascade multiple ScrollReveals in the same section. */
  delayMs?: number
}

/**
 * Wraps content that should "swoop up from depth" as it scrolls into view —
 * a 3D rotateX + translateY + fade, rather than a flat opacity fade.
 * Fires once per mount. Falls back to an instant, un-animated reveal for
 * anyone with prefers-reduced-motion set.
 */
export function ScrollReveal({ children, className = "", delayMs = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [visible])

  return (
    <div ref={ref} className={`[perspective:1200px] ${className}`}>
      <div
        style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
        className={`transition-all duration-700 ease-out [transform-style:preserve-3d] ${
          visible
            ? "opacity-100 [transform:rotateX(0deg)_translateY(0px)]"
            : "opacity-0 [transform:rotateX(14deg)_translateY(36px)]"
        }`}
      >
        {children}
      </div>
    </div>
  )
}
