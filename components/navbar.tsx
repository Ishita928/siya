"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Star } from "lucide-react";
import ThemeToggle from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "About", href: "#about", color: "from-purple-500 to-blue-500" },
  { name: "Projects", href: "#projects", color: "from-pink-500 to-rose-500" },
  { name: "Skills", href: "#skills", color: "from-teal-500 to-emerald-500" },
  { name: "Contact", href: "#contact", color: "from-amber-500 to-orange-500" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [logoHover, setLogoHover] = useState(false);
  const [randomAnimation, setRandomAnimation] = useState(false);
  const [isClient, setIsClient] = useState(false); // Track if component is on the client
  const animationTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsClient(true); // Set isClient to true when component mounts on the client
  }, []);

  useEffect(() => {
    if (!isClient) return; // Exit if not on the client

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isClient]);

  // Trigger random animations periodically
  useEffect(() => {
    if (!isClient) return; // Exit if not on the client

    const triggerRandomAnimation = () => {
      setRandomAnimation(true);
      setTimeout(() => setRandomAnimation(false), 800);

      // Set next animation timeout randomly between 4-10 seconds
      const nextTimeout = Math.floor(Math.random() * 6000) + 4000;
      animationTimeout.current = setTimeout(triggerRandomAnimation, nextTimeout);
    };

    // Start the animation cycle
    animationTimeout.current = setTimeout(triggerRandomAnimation, 5000);

    return () => {
      if (animationTimeout.current) clearTimeout(animationTimeout.current);
    };
  }, [isClient]);

  const scrollToSection = (sectionId: string, itemName: string) => {
    setMobileMenuOpen(false);
    setActiveItem(itemName);
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }

    // Reset active item after 2 seconds
    setTimeout(() => setActiveItem(""), 2000);
  };

  // Random sparkle animation for logo
  const logoVariants = {
    normal: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        yoyo: Infinity, // Ignore cSpell warning
        ease: "easeInOut",
      },
    },
    animate: {
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0],
      transition: { type: "keyframes", duration: 0.8 }, // Use keyframes for multiple keyframes
    },
  };

  // Menu button animation
  const menuButtonVariants = {
    initial: { rotate: 0 },
    animate: { rotate: mobileMenuOpen ? 90 : 0 },
  };

  if (!isClient) return null; // Render nothing on the server

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div
          className="relative text-2xl font-bold"
          variants={logoVariants}
          animate={randomAnimation ? "animate" : logoHover ? "hover" : "normal"}
          onMouseEnter={() => setLogoHover(true)}
          onMouseLeave={() => setLogoHover(false)}
        >
          <div className="relative z-10">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              Shreyanshi
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-500">
              {" "}
              Rathi
            </span>
          </div>
          {(logoHover || randomAnimation) && (
            <motion.div
              className="absolute inset-0 -z-10 opacity-75 rounded-full blur-sm bg-gradient-to-r from-purple-500/50 to-teal-500/50"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 0.5 }}
              transition={{ duration: 0.8 }}
            />
          )}
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <div className="flex space-x-2">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                initial={{ y: 0 }}
                whileHover={{
                  y: -2,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "relative overflow-hidden text-foreground/80 hover:text-foreground",
                    activeItem === item.name && "font-medium"
                  )}
                  onClick={() => scrollToSection(item.href, item.name)}
                >
                  <span className="relative z-10">{item.name}</span>
                  <motion.span
                    className={cn(
                      "absolute inset-0 -z-10 bg-gradient-to-r",
                      item.color,
                      "opacity-0 hover:opacity-20"
                    )}
                    initial={{ y: "100%" }}
                    whileHover={{
                      y: 0,
                      opacity: 0.2,
                      transition: { duration: 0.3 },
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  {activeItem === item.name && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                      style={{
                        background: `linear-gradient(to right, ${item.color
                          .replace("from-", "")
                          .replace("to-", "")})`,
                      }}
                    />
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
          <motion.div
            whileHover={{ rotate: 15 }} // Use only two keyframes for spring animations
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <ThemeToggle />
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden space-x-2">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <ThemeToggle />
          </motion.div>
          <motion.div
            variants={menuButtonVariants}
            animate="animate"
            initial="initial"
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="relative overflow-hidden hover:bg-primary/10"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileMenuOpen ? "close" : "menu"}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileMenuOpen ? <X /> : <Menu />}
                </motion.div>
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-background/95 backdrop-blur-md border-t border-border/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start group relative overflow-hidden"
                    onClick={() => scrollToSection(item.href, item.name)}
                  >
                    <span className="relative z-10 group-hover:text-foreground">
                      {item.name}
                    </span>
                    <motion.div
                      className={cn(
                        "absolute inset-0 -z-10 bg-gradient-to-r",
                        item.color,
                        "opacity-0 group-hover:opacity-20"
                      )}
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Random sparkle animation elements */}
      <AnimatePresence>
        {randomAnimation && (
          <>
            <motion.div
              className="absolute top-0 right-0 text-primary/50"
              initial={{ opacity: 0, scale: 0, x: 20, y: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Sparkles size={16} />
            </motion.div>
            <motion.div
              className="absolute bottom-0 left-1/4 text-teal-500/50"
              initial={{ opacity: 0, scale: 0, x: -20, y: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Star size={12} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}