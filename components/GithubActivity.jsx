"use client";

import { motion } from "framer-motion";
import GitHubCalendar from "react-github-calendar";

const GITHUB_USERNAME = "Iamarslansher";

export default function GithubActivity() {
  return (
    <section id="github" className="section-padding">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="eyebrow mb-3">Open Source</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">
            GitHub <span className="text-gradient">Activity</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Showcasing coding consistency, open-source contributions, and
            development activity over the past year.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6 sm:p-10 border border-white/5 overflow-x-auto"
        >
          <GitHubCalendar
            username={GITHUB_USERNAME}
            colorScheme="dark"
            blockSize={12}
            blockMargin={4}
            fontSize={14}
            theme={{
              dark: ["#111827", "#0e3a45", "#0a6f80", "#06B6D4", "#8B5CF6"],
            }}
          />
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 mt-8">
          {[
            { label: "Contribution Streaks", value: "Consistent commits" },
            { label: "Top Languages", value: "JavaScript • React • Node" },
            { label: "Focus", value: "Frontend & MERN Projects" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-2xl p-5 border border-white/5"
            >
              <p className="text-xs text-primary uppercase tracking-wider mb-1">
                {stat.label}
              </p>
              <p className="text-sm text-muted">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
