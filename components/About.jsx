"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";

const stats = [
  { label: "Projects Completed", value: 25, suffix: "+" },
  { label: "Technologies Used", value: 20, suffix: "+" },
  { label: "Years Learning", value: 2, suffix: "+" },
];

export default function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative flex justify-center order-2 lg:order-1"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-2xl" />
            <div className="relative w-full h-full rounded-full glass border border-white/10 flex items-center justify-center">
              <span className="font-display text-6xl font-bold text-gradient">
                {"{ }"}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="order-1 lg:order-2"
        >
          <p className="eyebrow mb-3">About Me</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
            Crafting Interfaces,{" "}
            <span className="text-gradient">Building Stacks</span>
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            I&apos;m a frontend-focused developer who specializes in building
            clean, responsive, and performant interfaces with React and Next.js,
            while staying fully capable across the MERN stack for end-to-end
            product delivery.
          </p>
          <p className="text-muted leading-relaxed mb-8">
            I care deeply about UI/UX, writing clean and maintainable code, and
            continuously learning new tools and patterns. Every project is an
            opportunity to build something that looks great and performs even
            better.
          </p>

          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-2xl p-4 text-center border border-white/5"
              >
                <p className="font-display text-2xl sm:text-3xl font-bold text-gradient">
                  <CountUp
                    end={stat.value}
                    duration={2}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                  {stat.suffix}
                </p>
                <p className="text-xs sm:text-sm text-muted mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
