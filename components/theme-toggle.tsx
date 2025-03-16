"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="opacity-0"
        aria-hidden="true"
      >
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="relative overflow-hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isDark ? "dark" : "light"}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-yellow-300" />
            ) : (
              <Moon className="h-5 w-5 text-slate-700" />
            )}
          </motion.div>
        </AnimatePresence>

        <motion.span
          className={`absolute inset-0 rounded-full opacity-0 ${
            isDark ? "bg-yellow-300/20" : "bg-slate-700/10"
          }`}
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.7, opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </Button>
    </motion.div>
  );
}
