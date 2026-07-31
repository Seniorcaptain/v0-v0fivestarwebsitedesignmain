"use client"

import { useState, useEffect } from "react"
import { MegaMenu } from "@/components/mega-menu"

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return <MegaMenu isScrolled={isScrolled} />
}
