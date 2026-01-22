'use client'

import { useEffect, useRef } from 'react'

// ============================================
// QUANTUM INSIGHTS - AMBIENT BACKGROUND
// Premium subtle background effects for hero sections
// ============================================

interface AmbientBackgroundProps {
  enableParallax?: boolean
  className?: string
}

export function AmbientBackground({ enableParallax = true, className }: AmbientBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enableParallax) return

    // Subtle parallax on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      const xPercent = (clientX / innerWidth - 0.5) * 20
      const yPercent = (clientY / innerHeight - 0.5) * 20

      const orbs = containerRef.current.querySelectorAll('.gradient-orb')
      orbs.forEach((orb, index) => {
        const element = orb as HTMLElement
        const multiplier = index === 0 ? 1 : -1
        element.style.transform = `translate(${xPercent * multiplier}px, ${yPercent * multiplier}px)`
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [enableParallax])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className || ''}`}
      aria-hidden="true"
    >
      {/* Cyan orb - top left */}
      <div
        className="gradient-orb gradient-orb-cyan absolute -top-48 -left-48 transition-transform duration-700 ease-out"
        style={{ opacity: 0.3 }}
      />

      {/* Violet orb - bottom right */}
      <div
        className="gradient-orb gradient-orb-violet absolute -bottom-32 -right-32 transition-transform duration-700 ease-out"
        style={{ opacity: 0.25 }}
      />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
    </div>
  )
}

// Simpler version without parallax for dashboard
export function StaticAmbientBackground({ className }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className || ''}`}
      aria-hidden="true"
    >
      {/* Subtle top-left glow */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[120px]"
        style={{
          background: 'rgba(0, 212, 255, 0.05)',
        }}
      />
    </div>
  )
}
