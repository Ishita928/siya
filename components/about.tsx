"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="relative">
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
              <Image src="/mine.jpg" alt="Developer portrait" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 h-48 w-48 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -top-6 -left-6 h-48 w-48 bg-primary/10 rounded-full blur-3xl" />
          </motion.div>

          <div>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6">
              About <span className="text-primary">Me</span>
            </motion.h2>

            <motion.p variants={itemVariants} className="text-foreground/80 mb-6">
              I'm a passionate frontend developer with expertise in creating engaging and interactive web experiences.
              With a strong foundation in React, Next.js, and modern web technologies, I build applications that are
              not only visually appealing but also performant and accessible.
            </motion.p>

            <motion.p variants={itemVariants} className="text-foreground/80 mb-8">
              My approach combines technical excellence with creative problem-solving, ensuring that each project I work
              on delivers exceptional user experiences. I'm constantly exploring new technologies and techniques to push
              the boundaries of what's possible on the web.
            </motion.p>

            <motion.div variants={itemVariants}>
  <Button className="rounded-full" asChild>
    <a href="/My Resume.pdf" target="_blank" rel="noopener noreferrer">
      <FileText className="mr-2 h-4 w-4" />
      Download Resume
    </a>
  </Button>
</motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
