"use client";

import { motion } from "framer-motion";
import { Code2, Globe, Briefcase, ShoppingCart, UserSquare2 } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Frontend Development",
    desc: "Building fast, responsive, and accessible interfaces with React and Next.js.",
  },
  {
    icon: Globe,
    title: "Web Development",
    desc: "End-to-end web applications using the MERN stack, from API to UI.",
  },
  {
    icon: Briefcase,
    title: "Business Websites",
    desc: "Professional, conversion-focused websites that represent your brand well.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Websites",
    desc: "Online stores with smooth checkout flows and clean product experiences.",
  },
  {
    icon: UserSquare2,
    title: "Personal Portfolio Websites",
    desc: "Unique, animated portfolios that help you stand out and get hired.",
  },
];

export default function Services() {
  return (
    <section id="services" className="section-padding">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="eyebrow mb-3">What I Offer</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            Services <span className="text-gradient">I Provide</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-8 border border-white/5 hover:border-primary/40 hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="text-primary" size={26} />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
