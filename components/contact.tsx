"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send, Github, Twitter, Linkedin, Instagram } from "lucide-react"

interface ContactCardProps {
  icon: React.ReactNode
  title: string
  content: string
  color: string
}

const ContactCard: React.FC<ContactCardProps> = ({ icon, title, content, color }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: `0 10px 30px -15px rgba(0, 0, 0, 0.2)` }}
      className={`bg-${color}/10 rounded-lg border border-${color}/20 overflow-hidden group`}
    >
      <CardContent className="flex flex-row items-start space-x-4 p-6">
        <motion.div
          whileHover={{ rotate: [0, 15, 0, -15, 0] }}
          transition={{ duration: 0.5 }}
          className={`text-${color}`}
        >
          {icon}
        </motion.div>
        <div>
          <h4 className={`font-medium leading-none group-hover:text-${color} transition-colors duration-300`}>
            {title}
          </h4>
          <p className="text-sm text-foreground/80 mt-2">{content}</p>
        </div>
      </CardContent>
      <motion.div
        className={`h-1 bg-gradient-${color} w-0 group-hover:w-full transition-all duration-300`}
        initial={{ width: "0%" }}
        whileHover={{ width: "100%" }}
      />
    </motion.div>
  )
}

interface SocialButtonProps {
  href: string
  "aria-label": string
  children: React.ReactNode
  color: string
}

const SocialButton: React.FC<SocialButtonProps> = ({ href, "aria-label": ariaLabel, children, color }) => {
  return (
    <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
      <Button
        asChild
        variant="ghost"
        size="icon"
        className={`bg-${color}/10 text-${color} hover:bg-${color}/20 hover:text-${color}`}
      >
        <a href={href} aria-label={ariaLabel}>
          {children}
        </a>
      </Button>
    </motion.div>
  )
}

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Reset form
    setFormState({ name: "", email: "", message: "" })
    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset submitted state after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
    }, 3000)

    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formState)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background -z-10" />

      <motion.div
        className="absolute top-20 right-10 w-64 h-64 rounded-full bg-purple/10 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-teal/10 blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-pink via-primary to-purple opacity-75 blur-sm" />
              <h2 className="relative text-3xl md:text-4xl font-bold px-4 py-1 rounded-lg bg-background">
                Get In <span className="text-gradient">Touch</span>
              </h2>
            </motion.div>
          </div>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Have a project in mind or want to discuss potential opportunities? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <motion.h3 variants={itemVariants} className="text-2xl font-semibold mb-6 text-gradient">
              Contact Information
            </motion.h3>

            <div className="space-y-6">
              <motion.div variants={itemVariants}>
                <ContactCard
                  icon={<Mail className="h-5 w-5" />}
                  title="Email"
                  content="rathi1.shreyanshi.com"
                  color="purple"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <ContactCard
                  icon={<Phone className="h-5 w-5" />}
                  title="Phone"
                  content="8700407153"
                  color="teal"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <ContactCard
                  icon={<MapPin className="h-5 w-5" />}
                  title="Location"
                  content="New Delhi"
                  color="pink"
                />
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="mt-12">
              <h3 className="text-2xl font-semibold mb-6 text-gradient">Follow Me</h3>
              <div className="flex space-x-4">
                <SocialButton href="https://github.com/rathishreya" aria-label="GitHub" color="purple">
                  <Github className="h-5 w-5" />
                </SocialButton>
                <SocialButton href="https://github.com/rathishreya" aria-label="Twitter" color="teal">
                  <Twitter className="h-5 w-5" />
                </SocialButton>
                <SocialButton href="https://www.linkedin.com/in/shreyanshi-rathi-1b413224b/" aria-label="LinkedIn" color="pink">
                  <Linkedin className="h-5 w-5" />
                </SocialButton>
                <SocialButton href="https://www.linkedin.com/in/shreyanshi-rathi-1b413224b/" aria-label="Instagram" color="amber">
                  <Instagram className="h-5 w-5" />
                </SocialButton>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            <motion.div
              className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple via-primary to-pink opacity-75 blur-sm"
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
            <motion.div
              variants={itemVariants}
              className="bg-background/80 backdrop-blur-sm rounded-xl p-8 relative z-10 border border-white/20 dark:border-white/10"
            >
              <motion.h3 variants={itemVariants} className="text-2xl font-semibold mb-6 text-gradient">
                Send a Message
              </motion.h3>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-green-500/20 text-green-500 p-4 rounded-lg text-center"
                  >
                    <p className="font-medium">Message sent successfully!</p>
                    <p className="text-sm mt-1">I'll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <motion.div variants={itemVariants}>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="bg-white/10 border-white/20 focus:border-primary focus:ring-primary transition-all duration-300"
                      />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="bg-white/10 border-white/20 focus:border-primary focus:ring-primary transition-all duration-300"
                      />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Textarea
                        name="message"
                        placeholder="Your Message"
                        value={formState.message}
                        onChange={handleChange}
                        rows={4}
                        required
                        className="bg-white/10 border-white/20 focus:border-primary focus:ring-primary transition-all duration-300"
                      />
                    </motion.div>
                    <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button
                        disabled={isSubmitting}
                        className="w-full bg-gradient-purple hover:shadow-lg hover:shadow-purple/50 transition-all duration-300"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

