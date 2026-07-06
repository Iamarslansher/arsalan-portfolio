"use client";

import { motion } from "framer-motion";
import {
  SiHtml5,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiBootstrap,
  SiTailwindcss,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiPython,
  SiC,
  SiCplusplus,
  SiFramer,
  SiGreensock,
  SiSwiper,
  SiAxios,
  SiReacthookform,
  SiChartdotjs,
  SiNotepadplusplus,
  SiCodeblocks,
  SiPostman,
  SiNpm,
  SiGit,
  SiGithub,
  SiVercel,
  SiNetlify,
  SiHostinger,
} from "react-icons/si";
import { FaDatabase, FaServer, FaCss3Alt, FaCode } from "react-icons/fa";

const rows = [
  {
    items: [
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
      { name: "Redux", icon: SiRedux, color: "#764ABC" },
      { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
      { name: "GSAP", icon: SiGreensock, color: "#88CE02" },
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
    ],
    direction: "left",
  },
  {
    items: [
      { name: "VS Code", icon: FaCode, color: "#007ACC" },
      { name: "Cursor", icon: FaCode, color: "#3B82F6" },
      { name: "Windsurf", icon: FaServer, color: "#00BFFF" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "npm", icon: SiNpm, color: "#CB3837" },
      { name: "Notepad++", icon: SiNotepadplusplus, color: "#90E59A" },
      { name: "Code::Blocks", icon: SiCodeblocks, color: "#00AEEF" },
      { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
      { name: "Netlify", icon: SiNetlify, color: "#00C7B7" },
      { name: "Hostinger", icon: SiHostinger, color: "#673DE6" },
      { name: "Swiper.js", icon: SiSwiper, color: "#6332F6" },
      { name: "Axios", icon: SiAxios, color: "#5A29E4" },
      { name: "C++", icon: SiCplusplus, color: "#00599C" },
      { name: "C", icon: SiC, color: "#A8B9CC" },
    ],
    direction: "right",
  },
];

const animClasses = {
  left: "animate-[marquee-left_35s_linear_infinite]",
  right: "animate-[marquee-right_35s_linear_infinite]",
};

function TechCard({ tech }) {
  const Icon = tech.icon;
  return (
    <div className="group/card flex flex-col items-center justify-center gap-3 min-w-[130px] mx-2.5 glass rounded-2xl py-5 px-4 border border-white/5 hover:border-primary/40 hover:-translate-y-1.5 hover:shadow-[0_0_18px_rgba(6,182,212,0.18)] transition-all duration-300 cursor-default select-none">
      <Icon
        size={34}
        style={{ color: tech.color }}
        className="group-hover/card:scale-110 transition-transform duration-300"
      />
      <span className="text-xs text-muted whitespace-nowrap font-medium">
        {tech.name}
      </span>
    </div>
  );
}

function MarqueeRow({ items, direction }) {
  const doubled = [...items, ...items];
  const animClass = animClasses[direction];

  return (
    <div className="relative overflow-hidden">
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

      <div className="group/row flex w-max">
        <div
          className={`flex ${animClass} group-hover/row:[animation-play-state:paused]`}
        >
          {doubled.map((tech, i) => (
            <TechCard tech={tech} key={`a-${tech.name}-${i}`} />
          ))}
        </div>
        <div
          className={`flex ${animClass} group-hover/row:[animation-play-state:paused]`}
          aria-hidden="true"
        >
          {doubled.map((tech, i) => (
            <TechCard tech={tech} key={`b-${tech.name}-${i}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section id="skills" className="section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="eyebrow mb-3">Tech Stack</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            Tools I <span className="text-gradient">Work With</span>
          </h2>
          <p className="text-muted text-sm mt-3 max-w-lg mx-auto">
            A curated set of technologies across frontend, backend, tools, and
            deployment that I use to build modern web products.
          </p>
        </motion.div>
      </div>

      <div className="space-y-5">
        {rows.map((row, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 }}
          >
            <MarqueeRow items={row.items} direction={row.direction} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
