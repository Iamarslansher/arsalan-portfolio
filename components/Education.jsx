"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";

const items = [
  {
    type: "education",
    title: "BSCS",
    date: "2023 - Present",
    place: "Federal Urdu University of Arts, Science & Technology (FUUAST), Karachi",
    desc: "Currently pursuing a Bachelor's degree in Computer Science with focus on software development, web technologies, and problem-solving.",
  },
  {
    type: "education",
    title: "Intermediate (Super ICS)",
    date: "2018 - 2020",
    place: "Superior College Jahanian",
    desc: "Major subjects: Physics, Mathematics, Computer Science. Built strong foundations in computing, mathematics, and analytical thinking.",
  },
  {
    type: "certification",
    title: "MERN Stack Development",
    date: "2023 - 2024",
    place: "Expertizo University Karachi",
    desc: "Learned full-stack web application development using MongoDB, Express.js, React.js, and Node.js.",
  },
  {
    type: "certification",
    title: "Frontend Development",
    date: "2023 - 2024",
    place: "Expertizo University Karachi",
    desc: "Focused on responsive web design, JavaScript, React.js, UI/UX, and frontend best practices.",
  },
];

export default function Education() {
  return (
    <section id="education" className="section-padding">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="eyebrow mb-3">My Journey</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            Education & <span className="text-gradient">Certifications</span>
          </h2>
        </motion.div>

        <div className="relative pl-10 sm:pl-12">
          <div className="absolute left-4 sm:left-5 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-secondary to-transparent" />

          {items.map((item, i) => {
            const Icon = item.type === "education" ? GraduationCap : Award;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative mb-10"
              >
                <div className="absolute -left-10 sm:-left-12 top-1 w-8 h-8 rounded-full glass border border-primary/40 flex items-center justify-center">
                  <Icon size={16} className="text-primary" />
                </div>
                <div className="glass rounded-2xl p-6 border border-white/5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="font-display font-semibold text-lg">{item.title}</h3>
                    <span className="text-xs px-3 py-1 rounded-full bg-white/5 text-primary border border-primary/20">
                      {item.date}
                    </span>
                  </div>
                  <p className="text-sm text-secondary mb-2">{item.place}</p>
                  <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
