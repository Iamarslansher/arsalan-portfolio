"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Layers,
  Briefcase,
  ShoppingCart,
  LayoutDashboard,
  Plug,
  Rocket,
  Wrench,
  Search,
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Frontend Development",
    desc: "Building modern, responsive, and user-friendly interfaces using React.js, Next.js, Tailwind CSS, and JavaScript.",
  },
  {
    icon: Layers,
    title: "MERN Stack Development",
    desc: "Full-stack web applications with MongoDB, Express.js, React.js, and Node.js, including secure authentication and REST APIs.",
  },
  {
    icon: Briefcase,
    title: "Business Websites",
    desc: "Professional business websites that strengthen your online presence and turn visitors into customers.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Development",
    desc: "Responsive online stores with product management, shopping carts, authentication, and smooth checkout flows.",
  },
  {
    icon: LayoutDashboard,
    title: "Admin Dashboards",
    desc: "Clean admin panels with analytics, authentication, CRUD operations, and data visualization.",
  },
  {
    icon: Plug,
    title: "API Integration",
    desc: "Connecting REST APIs, Firebase services, and third-party tools to build dynamic, data-driven applications.",
  },
];

const supporting = [
  { icon: Rocket, label: "Deployment (Vercel, Netlify, Hostinger)" },
  { icon: Wrench, label: "Website Maintenance" },
  { icon: Search, label: "Performance & SEO" },
];

export default function Services() {
  return (
    <section id="services" className="section-padding">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
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

        {/* Main 6 services */}
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
                <h3 className="font-display text-lg font-semibold mb-2">
                  {s.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Supporting capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-muted/70 mb-5">
            Also included
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {supporting.map((item) => {
              const Icon = item.icon;
              return (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-sm text-muted hover:border-primary/40 hover:text-white transition-colors"
                >
                  <Icon size={15} className="text-primary" />
                  {item.label}
                </span>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
