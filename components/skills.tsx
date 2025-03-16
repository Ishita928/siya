"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const skills = [
  { name: "React / Next.js", level: 95, color: "from-purple-500 to-indigo-600" },
  { name: "TypeScript", level: 90, color: "from-teal-500 to-cyan-400" },
  { name: "Tailwind CSS", level: 85, color: "from-pink-500 to-rose-400" },
  { name: "Framer Motion", level: 80, color: "from-amber-500 to-yellow-400" },
  { name: "Node.js", level: 75, color: "from-purple-500 to-violet-600" },
  { name: "Three.js", level: 70, color: "from-teal-500 to-emerald-400" },
];

const tools = [
  { name: "VS Code", icon: "💻", color: "from-purple-600 to-indigo-500" },
  { name: "Git", icon: "🔄", color: "from-teal-500 to-emerald-400" },
  { name: "Figma", icon: "🎨", color: "from-pink-500 to-red-400" },
  { name: "Docker", icon: "🐳", color: "from-blue-500 to-cyan-400" },
  { name: "Vercel", icon: "▲", color: "from-violet-600 to-purple-400" },
  { name: "GitHub Actions", icon: "🔄", color: "from-green-500 to-emerald-400" },
];

const education = [
  {
    title: "BTech. Computer Science And Engineering",
    institution: "Maharaja Surajmal Institute of Technology",
    period: "8.93",
    description: "Pursuing B.Tech in CSE with a strong foundation in software development, algorithms, and problem-solving. Passionate about building scalable solutions and exploring emerging technologies",
    color: "from-purple-600 to-indigo-500"
  },
  {
    title: "Microsoft Student Ambassador - Beta",
    institution: "Microsoft",
    period: "2022",
    description: "As a former MLSA, I engaged with a global community of tech enthusiasts, organized events, and shared knowledge on Microsoft technologies. I honed my leadership, public speaking, and technical skills while fostering innovation and collaboration among students.",
    color: "from-teal-500 to-emerald-400"
  }
];

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [activeEducation, setActiveEducation] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="skills" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/10 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 30, 0], rotate: [0, 45, 0] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-gradient-to-tr from-teal-500/15 to-cyan-500/10 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, -30, 0], rotate: [0, -45, 0] }}
        transition={{ duration: 24, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-96 rounded-full bg-gradient-to-r from-pink-500/5 to-purple-500/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
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
              whileHover={{ scale: 1.05, rotate: [0, 1, -1, 0] }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-teal-500 via-purple-500 to-blue-500 opacity-75 blur-sm animate-pulse" />
              <h2 className="relative text-3xl md:text-4xl font-bold px-6 py-2 rounded-lg bg-background/80 backdrop-blur-sm">
                My <span className="bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">Skills</span>
              </h2>
            </motion.div>
          </div>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and the tools I use to build exceptional web experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Technical Skills Section */}
          <div>
            <h3 className="text-xl font-semibold mb-6 bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">Technical Skills</h3>
            <motion.div
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-6"
            >
              {skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  onMouseEnter={() => setActiveSkill(skill.name)}
                  onMouseLeave={() => setActiveSkill(null)}
                  className="group"
                >
                  <div className="flex justify-between mb-2">
                    <motion.span
                      className={`font-medium ${activeSkill === skill.name ? "bg-gradient-to-r " + skill.color + " bg-clip-text text-transparent" : ""}`}
                      animate={{
                        scale: activeSkill === skill.name ? 1.05 : 1,
                        x: activeSkill === skill.name ? 5 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {skill.name}
                    </motion.span>
                    <motion.span 
                      className={`bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}
                      animate={{ scale: activeSkill === skill.name ? 1.1 : 1 }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                  <div className="relative h-2 rounded-full bg-slate-800/50">
                    <motion.div
                      className={`absolute inset-0 h-full rounded-full bg-gradient-to-r ${skill.color}`}
                      style={{ width: `${skill.level}%` }}
                      initial={{ width: "0%" }}
                      animate={{ 
                        width: isInView ? `${skill.level}%` : "0%",
                        boxShadow: activeSkill === skill.name ? "0 0 20px rgba(139, 92, 246, 0.7)" : "none",
                      }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                    {activeSkill === skill.name && (
                      <motion.div
                        className="absolute top-0 w-4 h-4 rounded-full bg-white shadow-lg"
                        style={{ left: `calc(${skill.level}% - 8px)` }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        layoutId="skillIndicator"
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Tools & Software Section */}
          <div>
            <h3 className="text-xl font-semibold mb-6 bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">Tools & Software</h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {tools.map((tool) => (
                <motion.div
                  key={tool.name}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    rotate: [0, 2, -2, 0],
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  onMouseEnter={() => setActiveTool(tool.name)}
                  onMouseLeave={() => setActiveTool(null)}
                  className="bg-card/80 backdrop-blur-sm rounded-lg p-5 text-center shadow-lg relative overflow-hidden"
                >
                  {/* Gradient background effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0`}
                    animate={{ opacity: activeTool === tool.name ? 0.15 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.div 
                    className="text-3xl mb-3 relative z-10"
                    animate={{ 
                      y: activeTool === tool.name ? [0, -5, 0] : 0,
                      scale: activeTool === tool.name ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.5, repeat: activeTool === tool.name ? 1 : 0 }}
                  >
                    {tool.icon}
                  </motion.div>
                  
                  <p className={`font-medium relative z-10 ${activeTool === tool.name ? `bg-gradient-to-r ${tool.color} bg-clip-text text-transparent` : ''}`}>
                    {tool.name}
                  </p>
                  
                  {/* Bottom border accent */}
                  <motion.div 
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${tool.color}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeTool === tool.name ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Education & Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
          className="mt-20"
        >
          <h3 className="text-xl font-semibold mb-6 bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent text-center">Education & Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ 
                  scale: 1.03,
                  y: -5,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                onMouseEnter={() => setActiveEducation(item.title)}
                onMouseLeave={() => setActiveEducation(null)}
                className="bg-card/80 backdrop-blur-sm rounded-lg p-6 shadow-xl border border-transparent relative"
              >
                {/* Background glow effect */}
                <motion.div 
                  className={`absolute inset-0 rounded-lg bg-gradient-to-br ${item.color} opacity-0`}
                  animate={{ opacity: activeEducation === item.title ? 0.1 : 0 }}
                  transition={{ duration: 0.4 }}
                />
                
                {/* Corner accent */}
                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${item.color} opacity-10 rounded-bl-3xl`}></div>
                
                <h4 className={`text-lg font-medium mb-1 ${activeEducation === item.title ? `bg-gradient-to-r ${item.color} bg-clip-text text-transparent` : ''}`}>
                  {item.title}
                </h4>
                <p className="text-foreground/80 font-medium">{item.institution}, <span className="text-foreground/60">{item.period}</span></p>
                
                <motion.div 
                  className={`w-12 h-1 bg-gradient-to-r ${item.color} my-3 rounded-full`}
                  animate={{ width: activeEducation === item.title ? "50%" : "3rem" }}
                  transition={{ duration: 0.5 }}
                />
                
                <p className="mt-2 text-foreground/80">{item.description}</p>
                
                {/* Border effect on hover */}
                <motion.div 
                  className="absolute inset-0 rounded-lg"
                  animate={{ 
                    boxShadow: activeEducation === item.title ? 
                      "inset 0 0 0 1px rgba(139, 92, 246, 0.3), 0 10px 30px -10px rgba(139, 92, 246, 0.2)" : 
                      "inset 0 0 0 0 transparent"
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    zIndex: 0,
                    pointerEvents: "none"
                  }}
                />

                {/* Animated glow effect */}
                <motion.div
                  className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600/20 via-transparent to-teal-500/20 opacity-0 blur-sm"
                  animate={{ 
                    opacity: activeEducation === item.title ? 0.7 : 0,
                    rotate: activeEducation === item.title ? [0, 5, -5, 0] : 0
                  }}
                  transition={{ 
                    opacity: { duration: 0.4 },
                    rotate: { duration: 6, repeat: Infinity, repeatType: "reverse" }
                  }}
                />

                {/* Corner highlight */}
                <motion.div
                  className="absolute top-0 right-0 w-3 h-3 bg-gradient-to-bl from-white to-transparent rounded-full opacity-0"
                  animate={{ 
                    opacity: activeEducation === item.title ? 0.7 : 0,
                    scale: activeEducation === item.title ? [1, 1.2, 1] : 1
                  }}
                  transition={{ 
                    opacity: { duration: 0.3 },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}