"use client"

import { useRef } from "react"
import { motion, useTransform, useScroll } from "framer-motion"

export default function ParallaxEffect() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "300%"])

  return (
    <div ref={ref} className="relative h-screen w-full overflow-hidden bg-background">
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-[url('/circuit.svg')] bg-center bg-cover opacity-50"
      />
    </div>
  )
}

