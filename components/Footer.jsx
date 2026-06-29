"use client";

import { Github, Linkedin, Instagram, Facebook, ArrowUp } from "lucide-react";

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const socials = [
  { icon: Github, href: "https://github.com/Iamarslansher" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/arsalan-sher-0bb9b32a8/",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/azlan_chudhary",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/arslan.salloo",
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <a href="#home" className="font-display text-2xl font-bold">
            <span className="text-gradient">{"<AS"}</span>
            <span className="text-white">{" />"}</span>
          </a>
          <p className="text-muted text-sm mt-3 max-w-xs">
            Frontend-Focused MERN Stack Developer building modern, scalable web
            experiences.
          </p>
        </div>

        <ul className="flex flex-wrap gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-muted hover:text-primary transition-colors"
              >
                {l.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex gap-4">
          {socials.map((s, i) => {
            const Icon = s.icon;
            return (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center hover:border-primary/50 transition-colors"
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} Arsalan Sher. All rights reserved.
        </p>
        <a
          href="#home"
          className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center hover:-translate-y-1 transition-transform"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </a>
      </div>
    </footer>
  );
}
