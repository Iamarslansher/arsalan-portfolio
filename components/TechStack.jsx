"use client";

import { motion } from "framer-motion";
import {
  SiHtml5, SiJavascript, SiReact, SiNextdotjs, SiBootstrap, SiTailwindcss,
  SiPython, SiC, SiCplusplus, SiNodedotjs, SiExpress, SiMongodb, SiFirebase, SiRedux,
  SiNotepadplusplus, SiGit, SiGithub, SiVercel, SiNetlify,
} from "react-icons/si";
import { FaDatabase, FaServer, FaCss3Alt, FaCode } from "react-icons/fa";

const techs = [
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "React.js", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "C", icon: SiC, color: "#A8B9CC" },
  { name: "C++", icon: SiCplusplus, color: "#00599C" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  { name: "Redux", icon: SiRedux, color: "#764ABC" },
  { name: "Local Storage", icon: FaDatabase, color: "#8B5CF6" },
  { name: "Notepad++", icon: SiNotepadplusplus, color: "#90E59A" },
  { name: "VS Code", icon: FaCode, color: "#007ACC" },
  { name: "Cursor", icon: FaCode, color: "#06B6D4" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
  { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
  { name: "Netlify", icon: SiNetlify, color: "#00C7B7" },
  { name: "Hostinger", icon: FaServer, color: "#673DE6" },
];

function TechCard({ tech }) {
  const Icon = tech.icon;
  return (
    <div className="flex flex-col items-center justify-center gap-3 min-w-[140px] mx-3 glass rounded-2xl py-6 px-4 border border-white/5 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
      <Icon size={38} style={{ color: tech.color }} />
      <span className="text-sm text-muted whitespace-nowrap">{tech.name}</span>
    </div>
  );
}

export default function TechStack() {
  const doubled = [...techs, ...techs];

  return (
    <section id="skills" className="section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="eyebrow mb-3">Tech Stack</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            Tools I <span className="text-gradient">Work With</span>
          </h2>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-bg to-transparent z-10" />
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-bg to-transparent z-10" />

        <div className="group flex w-max">
          <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
            {doubled.map((tech, i) => (
              <TechCard tech={tech} key={`${tech.name}-${i}`} />
            ))}
          </div>
          <div className="flex animate-marquee group-hover:[animation-play-state:paused]" aria-hidden="true">
            {doubled.map((tech, i) => (
              <TechCard tech={tech} key={`dup-${tech.name}-${i}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
