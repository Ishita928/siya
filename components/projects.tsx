"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Jewel Zone",
    description: "A full-featured online store with cart functionality, user authentication, and payment processing.",
    image: "/jewel.jpeg",
    tags: ["Next.js", "Tailwind CSS", "Stripe", "Prisma"],
    liveUrl: "#",
    githubUrl: "#",
    color: "purple",
  },
  {
    id: 2,
    title: "Hospital Website (Ongoing)",
    description: "A comprehensive hospital management system with patient records, appointment scheduling, and staff management features.",
    image: "/hosp.png",
    tags: ["React", "TypeScript", "Redux", "Firebase"],
    liveUrl: "#",
    githubUrl: "#",
    color: "teal",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "A creative portfolio website with animations and interactive elements.",
    image: "/port.png",
    tags: ["Next.js", "Framer Motion", "Three.js", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
    color: "pink",
  },
];

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="projects" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background -z-10" />

      <motion.div
        className="absolute top-20 right-10 w-64 h-64 rounded-full bg-purple/10 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-teal/10 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
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
            <motion.div className="relative" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple via-primary to-pink opacity-75 blur-sm" />
              <h2 className="relative text-3xl md:text-4xl font-bold px-4 py-1 rounded-lg bg-background">
                Featured <span className="text-gradient">Projects</span>
              </h2>
            </motion.div>
          </div>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            A selection of my recent work, showcasing my skills in web development, design, and problem-solving.
          </p>
        </motion.div>

        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        <div className="md:hidden">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div key={currentIndex} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.5 }} className="w-full">
                <ProjectCard project={projects[currentIndex]} />
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-6">
              <Button variant="outline" size="icon" onClick={prevProject} className="rounded-full border-primary text-primary hover:bg-primary/10">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex space-x-2">
                {projects.map((_, index) => (
                  <button key={index} className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-primary" : "bg-primary/30"}`} onClick={() => setCurrentIndex(index)} />
                ))}
              </div>
              <Button variant="outline" size="icon" onClick={nextProject} className="rounded-full border-primary text-primary hover:bg-primary/10">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <motion.div className="group h-full" whileHover={{ y: -10, transition: { type: "spring", stiffness: 300 } }}>
      <Card className="overflow-hidden h-full border-none shadow-lg bg-card relative">
        <div className="relative h-48 overflow-hidden">
          <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
        </div>
        <CardHeader>
          <CardTitle className={`text-gradient-${project.color}`}>{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map((tag) => (
              <motion.span key={tag} className={`px-2 py-1 text-xs rounded-full bg-${project.color}/10 text-${project.color}`} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                {tag}
              </motion.span>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
