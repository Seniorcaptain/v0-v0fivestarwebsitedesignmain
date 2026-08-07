"use client"

import { useRef, useState, type CSSProperties, type ReactNode, type MouseEvent } from "react"

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** Max tilt in degrees at the edge of the card. Keep this subtle — 6-10 reads as premium, 20+ reads as gimmicky. */
  maxTiltDeg?: number
}

const RESET_STYLE: CSSProperties = {
  transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
  transition: "transform 500ms cubic-bezier(0.23, 1, 0.32, 1)",
}

/**
 * Wraps a card so it tilts in 3D toward the cursor on hover — desktop only.
 * Skips touch/coarse pointers (there's no cursor to tilt toward) and anyone
 * with prefers-reduced-motion set.
 */
export function TiltCard({ children, className = "", maxTiltDeg = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<CSSProperties>(RESET_STYLE)

  const supportsTilt = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!supportsTilt()) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - rect.left
    const relY = e.clientY - rect.top
    const rotateY = ((relX - rect.width / 2) / (rect.width / 2)) * maxTiltDeg
    const rotateX = -((relY - rect.height / 2) / (rect.height / 2)) * maxTiltDeg

    setStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 80ms ease-out",
    })
  }

  const handleMouseLeave = () => setStyle(RESET_STYLE)

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`[transform-style:preserve-3d] will-change-transform ${className}`}
    >
      {children}
    </div>
  )
}
