"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  // ── Client Work ──────────────────────────────────────────

  {
    title: "EthPak Health AI",
    category: "Client Work",
    emoji: "🌍",
    desc: "International collaborative project — AI-powered healthcare and disease risk analysis platform built with a partner from Ethiopia.",
    tech: ["React", "FastAPI", "MongoDB", "Python", "Gemini AI"],
    code: "https://github.com/Iamarslansher",
    live: "https://eth-pak-health-ai.vercel.app/",
  },

  // ── MERN Stack ───────────────────────────────────────────
  {
    title: "Service Booking App",
    category: "MERN Stack",
    emoji: "📅",
    desc: "A full booking platform with auth, scheduling, and admin dashboard.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    code: "https://github.com/Iamarslansher/local-services",
    live: "https://local-services-three.vercel.app/",
  },
  {
    title: "E-Commerce Platform",
    category: "MERN Stack",
    emoji: "🛍️",
    desc: "A complete online store with cart, checkout, and order management.",
    tech: ["React", "Node.js", "MongoDB", "Redux"],
    code: "https://github.com/Iamarslansher/complete-olxWebsite",
    live: "https://olx-mearm-stack.netlify.app/",
  },
  {
    title: "Expense Tracker",
    category: "MERN Stack",
    emoji: "💰",
    desc: "Track income and expenses with charts and category breakdowns.",
    tech: ["React", "Express", "MongoDB"],
    code: "https://github.com/Iamarslansher/finance-tracker-frontend",
    live: "https://arslan-financetracker.netlify.app",
  },
  {
    title: "Todo List",
    category: "MERN Stack",
    emoji: "📝",
    desc: "A simple todo list app with authentication and task management.",
    tech: ["Next.js", "Express.js", "Node.js", "MongoDB"],
    code: "https://github.com/Iamarslansher/todolist-nextjs",
    live: "https://todolist-nextjs-rho.vercel.app/",
  },
  {
    title: "Lab of Code",
    category: "MERN Stack",
    emoji: "🧪",
    desc: "An interactive coding resources and tutorials hub.",
    tech: ["React", "Express.js", "Node.js", "MongoDB"],
    code: "https://github.com/Iamarslansher/coderInstitute-frontend",
    live: "https://labofcode.vercel.app/",
  },

  // ── Frontend ─────────────────────────────────────────────
  {
    title: "Echoes of Independence",
    category: "Frontend",
    emoji: "🇵🇰",
    desc: "An interactive storytelling website celebrating Pakistan's journey through history with immersive animations and cinematic UI.",
    tech: ["React.js", "Vite", "Tailwind CSS", "Framer Motion"],
    code: "https://github.com/Iamarslansher/echoes-of-independence",
    live: "https://echoes-of-independence.vercel.app/",
  },
  {
    title: "Prompt Forge",
    category: "Frontend",
    emoji: "🇵🇰",
    desc: "An interactive platform to learn Prompt Engineering from beginner to advanced through 5 structured chapters and quizzes.",
    tech: ["React.js", "Vite", "Tailwind CSS", "Framer Motion", "localStorage"],
    code: "https://github.com/Iamarslansher/prompt-forge",
    live: "https://prompt-forge-sigma-ten.vercel.app/",
  },
  {
    title: "Luma Social App",
    category: "Frontend",
    emoji: "📱",
    desc: "A social feed UI with posts, likes, comments, and profiles.",
    tech: ["Next.js", "Tailwind CSS", "Firebase", "Cloudinary"],
    code: "https://github.com/Iamarslansher/social-mediaApp",
    live: "https://luma-social-app.vercel.app/",
  },
  {
    title: "Medcare",
    category: "Frontend",
    emoji: "🏥",
    desc: "A healthcare landing experience with appointment booking UI.",
    tech: ["React", "Framer Motion"],
    code: "https://github.com/Iamarslansher/medical-health-care",
    live: "https://arslan-medcare.netlify.app/",
  },
  {
    title: "SchedNova",
    category: "Frontend",
    emoji: "🗓️",
    desc: "A scheduling app with auth, scheduling, and admin dashboard.",
    tech: ["React", "Local Storage"],
    code: "https://github.com/Iamarslansher/SchedNova",
    live: "https://schednova.netlify.app/",
  },
  {
    title: "Pizzeria Web",
    category: "Frontend",
    emoji: "🍕",
    desc: "A restaurant website with menu showcase and ordering UI.",
    tech: ["React", "CSS3", "Redux"],
    code: "https://github.com/Iamarslansher/pizzeria-web-redux",
    live: "https://pizzeria-navy.vercel.app/",
  },
  {
    title: "Coin Tracker Crypto",
    category: "Frontend",
    emoji: "🪙",
    desc: "Live crypto price tracker with charts and watchlists.",
    tech: ["React", "Chart.js"],
    code: "https://github.com/Iamarslansher/coin-tracker",
    live: "https://arsalan-coin-tracker.netlify.app/",
  },
  {
    title: "Weather Forecast App",
    category: "Frontend",
    emoji: "🌤️",
    desc: "A weather forecasting app with real-time updates and alerts.",
    tech: ["React", "Local Storage"],
    code: "https://github.com/Iamarslansher/weather-app",
    live: "https://arslan-weather-app.netlify.app/",
  },
  {
    title: "Sasta Shop App",
    category: "Frontend",
    emoji: "🏪",
    desc: "An e-commerce website for a local shop with product listings and shopping cart.",
    tech: ["React", "Firebase"],
    code: "https://github.com/Iamarslansher/sasta-app",
    live: "https://sasta-app.vercel.app/",
  },
  {
    title: "Task Management App",
    category: "Frontend",
    emoji: "✅",
    desc: "A kanban-style task manager with drag and drop.",
    tech: ["React", "Local Storage"],
    code: "https://github.com/Iamarslansher",
    live: "https://arslan-taskmanagement.netlify.app",
  },
  {
    title: "Personal Portfolio",
    category: "Frontend",
    emoji: "🗂️",
    desc: "A previous personal portfolio iteration showcasing my work.",
    tech: ["Next.js", "Tailwind CSS"],
    code: "https://github.com/Iamarslansher/my_Portfolio",
    live: "#",
  },
];

const filters = ["All", "Client Work", "MERN Stack", "Frontend"];

const categoryColors = {
  "Client Work": "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  "MERN Stack": "text-primary border-primary/30 bg-primary/10",
  Frontend: "text-secondary border-secondary/30 bg-secondary/10",
};

export default function Projects() {
  const [active, setActive] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    const list =
      active === "All"
        ? projects
        : projects.filter((p) => p.category === active);
    return showAll ? list : list.slice(0, 6);
  }, [active, showAll]);

  const totalCount = (f) =>
    f === "All"
      ? projects.length
      : projects.filter((p) => p.category === f).length;

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="eyebrow mb-3">Portfolio</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted text-sm mt-3 max-w-lg mx-auto">
            A mix of client work, full-stack apps, and frontend experiences I've
            designed and built.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => {
                setActive(f);
                setShowAll(false);
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                active === f
                  ? "bg-gradient-to-r from-primary to-secondary text-white border-transparent shadow-[0_0_20px_rgba(6,182,212,0.25)]"
                  : "border-white/15 text-muted hover:border-primary/50 hover:text-white"
              }`}
            >
              {f}
              <span className="ml-2 text-xs opacity-60">{totalCount(f)}</span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                layout
                key={p.title}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.25 }}
                className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-300 group flex flex-col"
              >
                {/* Card top */}
                <div className="h-36 bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center relative overflow-hidden">
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                    {p.emoji}
                  </span>
                  <span
                    className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full border font-medium ${categoryColors[p.category]}`}
                  >
                    {p.category}
                  </span>
                </div>

                {/* Card body */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-semibold text-lg mb-2">
                    {p.title}
                  </h3>
                  <p className="text-muted text-sm mb-4 leading-relaxed flex-1">
                    {p.desc}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-muted border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <a
                      href={p.code || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 text-sm py-2 rounded-full border border-white/15 hover:border-primary/50 hover:text-primary transition-colors"
                    >
                      <Github size={15} /> Code
                    </a>
                    <a
                      href={p.live || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 text-sm py-2 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                    >
                      <ExternalLink size={15} /> Live
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show More / Less */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium hover:scale-105 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-300"
          >
            {showAll ? "Show Less" : "See More Projects"}
          </button>
        </div>
      </div>
    </section>
  );
}
