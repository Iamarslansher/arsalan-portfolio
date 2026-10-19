"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { portfolioData } from "@/src/data/portfolioData";

const filters = ["All", "AI Agent", "MERN Stack", "Frontend"];
const categoryColors = {
  "AI Agent": "text-orange-400 border-orange-400/30 bg-orange-400/10",
  "MERN Stack": "text-primary border-primary/30 bg-primary/10",
  Frontend: "text-secondary border-secondary/30 bg-secondary/10",
};

export default function Projects() {
  const [active, setActive] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(() => {
    const list =
      active === "All"
        ? portfolioData.projects
        : portfolioData.projects.filter((project) => project.category === active);
    return showAll ? list : list.slice(0, 6);
  }, [active, showAll]);

  const count = (filter) =>
    filter === "All"
      ? portfolioData.projects.length
      : portfolioData.projects.filter((project) => project.category === filter)
          .length;

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="eyebrow mb-3">Portfolio</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted text-sm mt-3 max-w-lg mx-auto">
            A mix of AI agents, full-stack applications, and frontend projects.
          </p>
        </motion.div>

        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              aria-pressed={active === filter}
              onClick={() => {
                setActive(filter);
                setShowAll(false);
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                active === filter
                  ? "bg-gradient-to-r from-primary to-secondary text-white border-transparent shadow-[0_0_20px_rgba(6,182,212,0.25)]"
                  : "border-white/15 text-muted hover:border-primary/50 hover:text-white"
              }`}
            >
              {filter}
              <span className="ml-2 text-xs opacity-60">{count(filter)}</span>
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                layout={!reduceMotion}
                key={project.title}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: reduceMotion ? 0 : 0.25 }}
                className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-300 group flex flex-col"
              >
                <div className="h-36 bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center relative overflow-hidden">
                  <span aria-hidden="true" className="text-5xl group-hover:scale-110 transition-transform duration-300">
                    {project.emoji}
                  </span>
                  <span
                    className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full border font-medium ${categoryColors[project.category]}`}
                  >
                    {project.category}
                  </span>
                  {project.localOnly && (
                    <span className="absolute top-3 left-3 text-[10px] px-2.5 py-1 rounded-full bg-green-400/10 border border-green-400/30 text-green-400 font-medium">
                      Runs locally
                    </span>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-semibold text-lg mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted text-sm mb-4 leading-relaxed flex-1">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.map((technology) => (
                      <span
                        key={technology}
                        className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-muted border border-white/10"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.code ? (
                      <a
                        href={project.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 text-sm py-2 rounded-full border border-white/15 hover:border-primary/50 hover:text-primary transition-colors"
                      >
                        <Github size={15} />
                        {project.privateRepo ? "GitHub profile" : "Code"}
                      </a>
                    ) : (
                      <span className="flex-1 flex items-center justify-center text-sm py-2 rounded-full border border-white/10 text-muted">
                        Private project
                      </span>
                    )}
                    {project.live ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 text-sm py-2 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                      >
                        <ExternalLink size={15} /> Live
                      </a>
                    ) : (
                      <span className="flex-1 flex items-center justify-center text-sm py-2 rounded-full bg-white/5 border border-white/10 text-muted">
                        Not published
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-12">
          <button
            type="button"
            onClick={() => setShowAll((previous) => !previous)}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium hover:scale-105 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-300"
          >
            {showAll ? "Show Less" : "See More Projects"}
          </button>
        </div>
      </div>
    </section>
  );
}
