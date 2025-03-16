"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import Navbar from "./navbar"
import TextAnimation from "./text-animation"

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorText, setCursorText] = useState("")
  const [cursorVariant, setCursorVariant] = useState("default")

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  // Parallax effect for background elements
  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, 300])
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const bgY3 = useTransform(scrollYProgress, [0, 1], [0, 100])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
    text: {
      height: 150,
      width: 150,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      backgroundColor: "rgba(124, 58, 237, 0.1)",
      mixBlendMode: "difference",
    },
  }

  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Typing effect
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)

  const phrases = ["Creative", "Innovative", "Passionate", "Full-Stack"]

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length
      const fullText = phrases[i]

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1))

      setTypingSpeed(isDeleting ? 75 : 150)

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500)
      } else if (isDeleting && text === "") {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum, typingSpeed, phrases])

  return (
    <div ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      <Navbar />

      {/* Animated background elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-light/20 blur-3xl"
        style={{ y: bgY1 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-teal-light/20 blur-3xl"
        style={{ y: bgY2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-pink-light/20 blur-3xl"
        style={{ y: bgY3 }}
      />

      <motion.div className="container mx-auto px-4 text-center z-10" style={{ opacity, y, scale }}>
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
        >
          <div className="relative inline-block">
            <motion.div
              className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-light via-primary to-pink-light opacity-75 blur-lg"
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <h1 className="relative text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-light via-primary to-pink-light animated-gradient-text">
              <span className="inline-block">{text}</span>
              <span className="inline-block animate-cursor">|</span>
              <span className="ml-2">Developer</span>
            </h1>
          </div>
        </motion.div>

        <TextAnimation
          text="Building beautiful, interactive, and performant web experiences"
          className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto mb-8"
          delay={800}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="space-x-4"
        >
          <Button
            size="lg"
            className="rounded-full px-8 bg-gradient-to-r from-purple-light to-primary hover:shadow-lg hover:shadow-purple/50 transition-all duration-300 transform hover:scale-105"
            onClick={scrollToAbout}
          >
            Explore My Work
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 border-primary text-primary hover:bg-primary/10 transition-all duration-300 transform hover:scale-105"
          >
            Contact Me
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}>
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollToAbout}
            aria-label="Scroll down"
            className="text-primary hover:text-primary/80 hover:bg-primary/10"
          >
            <ArrowDown className="h-6 w-6" />
          </Button>
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background z-0" />
    </div>
  )
}