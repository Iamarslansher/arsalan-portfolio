"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown, Download, Send } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-grid-glow"
    >
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="eyebrow mb-4">Hello, I&apos;m</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Arsalan <span className="text-gradient">Sher</span>
          </h1>

          <div className="text-xl sm:text-2xl font-semibold text-muted mb-6 h-10">
            <TypeAnimation
              sequence={[
                "Frontend Developer",
                2000,
                "React Developer",
                2000,
                "MERN Stack Developer",
                2000,
                "Next.js Developer",
                2000,
              ]}
              wrapper="span"
              speed={50}
              className="text-gradient"
              repeat={Infinity}
            />
          </div>

          <p className="text-muted max-w-xl mb-8 leading-relaxed">
            Passionate developer focused on building modern, responsive,
            scalable, and user-friendly web applications using React, Next.js,
            and the MERN Stack.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="btn-primary flex items-center gap-2">
              View Projects
            </a>
            <a
              href="/resume.pdf"
              className="btn-outline flex items-center gap-2"
            >
              <Download size={18} /> Download Resume
            </a>
            <a href="#contact" className="btn-outline flex items-center gap-2">
              <Send size={18} /> Hire Me
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative flex justify-center"
        >
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 animate-float">
            <div className="absolute inset-0 rounded-[2.5rem] glass border-2 border-primary/30 rotate-6" />
            <div className="absolute inset-0 rounded-[2.5rem] glass border-2 border-secondary/30 -rotate-3 flex items-center justify-center">
              <span className="font-display text-7xl sm:text-8xl font-bold text-gradient">
                {/* AS */}
                <span className="text-gradient">{"<AS"}</span>
                <span className="text-white">{" />"}</span>
                {/*  */}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        aria-label="Scroll down"
      >
        <ArrowDown size={26} />
      </motion.a>
    </section>
  );
}
