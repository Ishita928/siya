'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

// theme-toggle.tsx
'use client'

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="opacity-0"
        aria-label="Loading theme toggle"
      >
        <div className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {resolvedTheme === "dark" ? (
          <Sun className="h-5 w-5 text-yellow-300" />
        ) : (
          <Moon className="h-5 w-5 text-slate-700" />
        )}
      </Button>
    </motion.div>
  )
}
