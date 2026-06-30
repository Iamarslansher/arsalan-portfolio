"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Service Booking App",
    category: "MERN Stack",
    desc: "A full booking platform with auth, scheduling, and admin dashboard.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    code: "https://github.com/Iamarslansher/ServiceSmart",
    live: "https://servicesmart.vercel.app/",
  },
  {
    title: "E-Commerce Platform",
    category: "MERN Stack",
    desc: "A complete online store with cart, checkout, and order management.",
    tech: ["React", "Node.js", "MongoDB", "Redux"],
    code: "https://github.com/Iamarslansher/complete-olxWebsite",
    live: "https://olx-mearm-stack.netlify.app/",
  },
  {
    title: "Social Media Platform",
    category: "Frontend",
    desc: "A social feed UI with posts, likes, comments, and profiles.",
    tech: ["Next.js", "Tailwind CSS", "Firebase"],
    code: "https://github.com/Iamarslansher/social-mediaApp",
    live: "",
  },
  {
    title: "Expense Tracker",
    category: "MERN Stack",
    desc: "Track income and expenses with charts and category breakdowns.",
    tech: ["React", "Express", "MongoDB"],
    code: "https://github.com/Iamarslansher/finance-tracker-frontend",
    live: "https://arslan-financetracker.netlify.app",
  },
  {
    title: "Todo List",
    category: "MERN Stack",
    desc: "A simple todo list app with authentication and task management.",
    tech: ["Next.js", "express.js", "Node.js", "MongoDB"],
    code: "https://github.com/Iamarslansher/todolist-nextjs",
    live: "https://todolist-nextjs-rho.vercel.app/",
  },
  {
    title: "Lab of Code",
    category: "MERN Stack",
    desc: "An interactive coding resources and tutorials hub.",
    tech: ["React", "express.js", "Node.js", "MongoDB"],
    code: "https://github.com/Iamarslansher/coderInstitute-frontend",
    live: "https://labofcode.vercel.app/",
  },
  {
    title: "YouthSpark",
    category: "Frontend",
    desc: "A youth empowerment platform with event and program listings.",
    tech: ["React", "Tailwind CSS"],
    code: "https://github.com/Iamarslansher/youth-website",
    live: "https://youthspark.vercel.app/",
  },
  {
    title: "Medcare",
    category: "Frontend",
    desc: "A healthcare landing experience with appointment booking UI.",
    tech: ["React", "Framer Motion"],
    code: "https://github.com/Iamarslansher/medical-health-care",
    live: "https://arslan-medcare.netlify.app/",
  },
  {
    title: "Pizzeria Web",
    category: "Frontend",
    desc: "A restaurant website with menu showcase and ordering UI.",
    tech: ["React", "CSS3", "Redux"],
    code: "https://github.com/Iamarslansher/pizzeria-web-redux",
    live: "https://pizzeria-navy.vercel.app/",
  },
  {
    title: "Coin Tracker Crypto",
    category: "Frontend",
    desc: "Live crypto price tracker with charts and watchlists.",
    tech: ["React", "Chart.js"],
    code: "https://github.com/Iamarslansher/coin-tracker",
    live: "https://arsalan-coin-tracker.netlify.app/",
  },
  {
    title: "Personal Portfolio",
    category: "Frontend",
    desc: "A previous personal portfolio iteration showcasing my work.",
    tech: ["Next.js", "Tailwind CSS"],
    code: "https://github.com/Iamarslansher/my_Portfolio",
    live: "",
  },
  {
    title: "Task Management App",
    category: "Frontend",
    desc: "A kanban-style task manager with drag and drop.",
    tech: ["React", "Local Storage"],
    code: "hhtps://github.com/Iamarslansher",
    live: "https://arslan-taskmanagement.netlify.app",
  },
  {
    title: "SchedNova",
    category: "Frontend",
    desc: "A scheduling app with auth, scheduling, and admin dashboard.",
    tech: ["React", "Local Storage"],
    code: "https://github.com/Iamarslansher/SchedNova",
    live: "https://schednova.netlify.app/",
  },
  {
    title: "Weather Forecast App",
    category: "Frontend",
    desc: "A weather forecasting app with real-time updates and alerts.",
    tech: ["React", "Local Storage"],
    code: "https://github.com/Iamarslansher/weather-app",
    live: "https://arslan-weather-app.netlify.app/",
  },
  {
    title: "Sasta Shop App",
    category: "Frontend",
    desc: "A e-commerce website for a local shop with product listings and shopping cart.",
    tech: ["React", "Firebase"],
    code: "https://github.com/Iamarslansher/sasta-app",
    live: "https://sasta-app.vercel.app/",
  },
];

const filters = ["All", "Frontend", "MERN Stack"];

export default function Projects() {
  const [active, setActive] = useState("All");
  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-7xl mx-auto px-6">
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
        </motion.div>

        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                active === f
                  ? "bg-gradient-to-r from-primary to-secondary text-white border-transparent"
                  : "border-white/15 text-muted hover:border-primary/50 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                layout
                key={p.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-primary/40 transition-all duration-300 group"
              >
                <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative overflow-hidden">
                  <span className="font-display text-3xl font-bold text-white/30 group-hover:scale-110 transition-transform">
                    {p.title
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 3)}
                  </span>
                  <span className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full bg-bg/70 text-primary border border-primary/30">
                    {p.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-semibold text-lg mb-2">
                    {p.title}
                  </h3>
                  <p className="text-muted text-sm mb-4 leading-relaxed">
                    {p.desc}
                  </p>
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
                  <div className="flex gap-3">
                    <a
                      href={p.code || "#"}
                      target="_blank"
                      className="flex-1 flex items-center justify-center gap-2 text-sm py-2 rounded-full border border-white/15 hover:border-primary/50 hover:text-primary transition-colors"
                    >
                      <Github size={20} /> Code
                    </a>
                    <a
                      href={p.live || "#"}
                      target="_blank"
                      className="flex-1 flex items-center justify-center gap-2 text-sm py-2 rounded-full bg-gradient-to-r from-primary to-secondary"
                    >
                      <ExternalLink size={20} /> Live
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
