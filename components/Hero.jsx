"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown, Download, Send } from "lucide-react";
import AvailabilityBadge from "@/components/AvailabilityBadge";

// ── Code card content: har line = indent + colored segments ──────────
const CODE_LINES = [
  {
    indent: 0,
    seg: [
      ["const", "text-purple-400"],
      [" developer", "text-yellow-300"],
      [":", "text-white"],
      [" arsalanSher", "text-blue-400"],
      [" = ", "text-white"],
      ["{", "text-cyan-300"],
    ],
  },
  {
    indent: 1,
    seg: [
      ["role", "text-pink-400"],
      [": ", "text-white"],
      ['"MERN Stack Developer"', "text-green-300"],
      [",", "text-white"],
    ],
  },
  {
    indent: 1,
    seg: [
      ["focus", "text-pink-400"],
      [": ", "text-white"],
      ['"Frontend Architecture"', "text-green-300"],
      [",", "text-white"],
    ],
  },
  {
    indent: 1,
    seg: [
      ["techStack", "text-pink-400"],
      [": ", "text-white"],
      ["{", "text-cyan-300"],
    ],
  },
  {
    indent: 2,
    seg: [
      ["frontend", "text-sky-300"],
      [": ", "text-white"],
      ['["React", "Next.js"]', "text-yellow-300"],
      [",", "text-white"],
    ],
  },
  {
    indent: 2,
    seg: [
      ["backend", "text-sky-300"],
      [": ", "text-white"],
      ['["Node.js", "Express"]', "text-yellow-300"],
      [",", "text-white"],
    ],
  },
  {
    indent: 2,
    seg: [
      ["database", "text-sky-300"],
      [": ", "text-white"],
      ['["MongoDB", "Firebase"]', "text-yellow-300"],
      [",", "text-white"],
    ],
  },
  {
    indent: 1,
    seg: [
      ["}", "text-cyan-300"],
      [",", "text-white"],
    ],
  },
  {
    indent: 1,
    seg: [
      ["available", "text-pink-400"],
      [": ", "text-white"],
      ["true", "text-orange-400"],
      [",", "text-white"],
    ],
  },
  {
    indent: 1,
    seg: [
      ["learning", "text-pink-400"],
      [": ", "text-white"],
      ["true", "text-orange-400"],
    ],
  },
  {
    indent: 0,
    seg: [
      ["}", "text-cyan-300"],
      [";", "text-white"],
    ],
  },
];

// har line ke total characters (+1 newline step)
const LINE_LENGTHS = CODE_LINES.map(
  (l) => l.seg.reduce((sum, [t]) => sum + t.length, 0) + 1,
);
const TOTAL_CHARS = LINE_LENGTHS.reduce((a, b) => a + b, 0);

const TYPE_SPEED = 35; // ms per character
const RESTART_DELAY = 3500; // finish hone ke baad pause

function TypewriterCode() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setCount(TOTAL_CHARS);
      return;
    }

    const finished = count >= TOTAL_CHARS;
    const timer = setTimeout(
      () => setCount(finished ? 0 : count + 1),
      finished ? RESTART_DELAY : TYPE_SPEED,
    );
    return () => clearTimeout(timer);
  }, [count]);

  let remaining = count;

  return (
    <div
      className="font-mono text-[10px] sm:text-xs text-left text-gray-300 bg-black/50 p-3 sm:p-4 rounded-2xl border border-white/10 shadow-2xl w-full overflow-hidden backdrop-blur-md"
      aria-label="Developer profile code snippet"
    >
      {/* Window dots */}
      <div className="flex gap-1.5 mb-3">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
      </div>

      {CODE_LINES.map((line, li) => {
        const lineTyped = Math.max(0, Math.min(remaining, LINE_LENGTHS[li]));
        const isCurrent = remaining >= 0 && remaining < LINE_LENGTHS[li];
        let lineRemaining = remaining;
        remaining -= LINE_LENGTHS[li];

        return (
          <div
            key={li}
            className="whitespace-pre leading-relaxed min-h-[1.4em]"
            style={{ paddingLeft: `${line.indent * 1.5}ch` }}
          >
            {line.seg.map(([text, color], si) => {
              const typed = text.slice(0, Math.max(0, lineRemaining));
              const rest = text.slice(typed.length);
              const showCursor =
                isCurrent &&
                rest.length > 0 &&
                typed.length >= 0 &&
                lineRemaining >= 0 &&
                lineRemaining < text.length;
              lineRemaining -= text.length;

              return (
                <span key={si}>
                  <span className={color}>{typed}</span>
                  {showCursor && (
                    <span className="inline-block w-[2px] h-[1em] bg-primary align-middle animate-pulse" />
                  )}
                  <span className="invisible">{rest}</span>
                </span>
              );
            })}
            {/* cursor jab line ka end ho aur next line start na hui ho */}
            {isCurrent && lineTyped >= LINE_LENGTHS[li] - 1 && (
              <span className="inline-block w-[2px] h-[1em] bg-primary align-middle animate-pulse" />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-grid-glow"
    >
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="eyebrow mb-4">Hello, I&apos;m</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Arsalan <span className="text-gradient">Sher</span>
          </h1>

          <div className="mb-5">
            <AvailabilityBadge />
          </div>

          <div className="text-xl sm:text-2xl font-semibold text-muted mb-6 h-10">
            <TypeAnimation
              sequence={[
                "MERN Stack Developer",
                2000,
                "Frontend Developer",
                2000,
                "Web Developer",
                2000,
                "React Developer",
                2000,
                "Next.js Developer",
                2000,
                "Prompt Engineer",
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

        {/* Right Column: Typewriter code card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative flex justify-center"
        >
          <div className="relative w-[19rem] h-[19rem] sm:w-96 sm:h-96 animate-float">
            <div className="absolute inset-0 rounded-[2.5rem] glass border-2 border-primary/30 rotate-6" />
            <div className="absolute inset-0 rounded-[2.5rem] glass border-2 border-secondary/30 -rotate-3 flex items-center justify-center p-4 sm:p-6">
              <TypewriterCode />
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
