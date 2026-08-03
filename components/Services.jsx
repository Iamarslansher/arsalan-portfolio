"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Globe,
  Briefcase,
  ShoppingCart,
  LayoutDashboard,
  Smartphone,
  Database,
  Rocket,
  UserSquare2,
  Wrench,
  Users,
  Paintbrush,
  ShieldCheck,
} from "lucide-react";
const services = [
  {
    icon: Code2,
    title: "Frontend Development",
    desc: "Building modern, responsive, and user-friendly web interfaces using React.js, Next.js, Tailwind CSS, Bootstrap, and JavaScript.",
  },

  {
    icon: Globe,
    title: "MERN Stack Development",
    desc: "Developing full-stack web applications using MongoDB, Express.js, React.js, and Node.js with secure authentication and REST APIs.",
  },

  {
    icon: Briefcase,
    title: "Business Websites",
    desc: "Creating professional business websites that strengthen your online presence and help convert visitors into customers.",
  },

  {
    icon: ShoppingCart,
    title: "E-Commerce Websites",
    desc: "Building responsive online stores with product management, shopping carts, authentication, and secure checkout experiences.",
  },

  {
    icon: LayoutDashboard,
    title: "Admin Dashboards",
    desc: "Developing responsive admin dashboards with analytics, authentication, CRUD operations, and data visualization.",
  },

  {
    icon: Smartphone,
    title: "Responsive Web Design",
    desc: "Designing websites that deliver a seamless experience across desktops, tablets, and mobile devices.",
  },

  {
    icon: Database,
    title: "REST API Integration",
    desc: "Integrating REST APIs, Firebase services, and backend systems to build dynamic and data-driven applications.",
  },

  {
    icon: Rocket,
    title: "Website Deployment",
    desc: "Deploying and managing web applications on Vercel, Netlify, and Hostinger with performance optimization.",
  },

  {
    icon: Paintbrush,
    title: "UI Implementation",
    desc: "Converting modern Figma or Adobe XD designs into clean, responsive, and pixel-perfect web interfaces.",
  },

  {
    icon: ShieldCheck,
    title: "Performance & SEO",
    desc: "Optimizing website speed, accessibility, metadata, and technical SEO for a better user experience.",
  },

  {
    icon: UserSquare2,
    title: "Portfolio Websites",
    desc: "Designing unique portfolio websites with modern UI, smooth animations, and fully responsive layouts.",
  },

  {
    icon: Users,
    title: "Team Collaboration",
    desc: "Working effectively with designers, developers, and project managers using Git, GitHub, Agile workflows, and version control.",
  },

  {
    icon: Wrench,
    title: "Website Maintenance",
    desc: "Providing bug fixes, feature updates, performance improvements, and ongoing website maintenance.",
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
                <h3 className="font-display text-lg font-semibold mb-2">
                  {s.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
