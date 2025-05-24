"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function TextAnimationSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Set up intersection observer to detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  // Use scroll position to control text movement
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Transform scroll progress into x position values
  // First text moves left as user scrolls down
  const firstTextX = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])

  // Second text moves right as user scrolls down
  const secondTextX = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <div
      ref={containerRef}
      className="bg-[url('/assets/fac-bg.jpg')] bg-cover bg-center md:bg-fixed min-h-screen flex items-center justify-center flex-col relative"
    >
      <div className="bg-black/20 backdrop-blur-[5px] w-full py-8 overflow-hidden">
        <div className="relative w-full overflow-hidden">
          <motion.div className="flex justify-center items-center" style={{ x: firstTextX }}>
            <div className="text-white/90 text-[32px] md:text-[64px] font-sans whitespace-nowrap px-4">
              Bridging Innovation and Communication – Explore, Engage, Elevate
            </div>
          </motion.div>
        </div>

        <div className="relative w-full overflow-hidden mt-4">
          <motion.div className="flex justify-center items-center" style={{ x: secondTextX }}>
            <div className="text-white/90 text-[32px] md:text-[64px] font-sans whitespace-nowrap px-4">
              Capturing Excellence, Inspiring Innovation - We are REF Media
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
