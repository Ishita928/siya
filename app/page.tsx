import Hero from "@/components/hero";
import About from "@/components/about";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Contact from "@/components/contact";
import AnimatedBackground from "@/components/animated-background";
import CursorEffect from "@/components/cursor-effect";

export default function Home() {
  return (
    <main className="min-h-screen">
      <CursorEffect />
      <AnimatedBackground />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}