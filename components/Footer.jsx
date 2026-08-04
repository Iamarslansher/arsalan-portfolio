"use client";
import { useEffect, useState } from "react";
import {
  Github,
  Linkedin,
  Instagram,
  Facebook,
  ArrowUp,
  Eye,
} from "lucide-react";

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

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
  const [visitors, setVisitors] = useState(null);

useEffect(() => {
  const updateVisitors = async () => {
    try {
      const visitorRef = doc(db, "portfolio", "visitors");

      const alreadyVisited = localStorage.getItem("portfolio-visited");

      if (!alreadyVisited) {
        const snapshot = await getDoc(visitorRef);

        if (snapshot.exists()) {
          await updateDoc(visitorRef, {
            count: increment(1),
          });
        } else {
          await setDoc(visitorRef, {
            count: 1,
          });
        }

        localStorage.setItem("portfolio-visited", "true");
      }

      const latest = await getDoc(visitorRef);

      if (latest.exists()) {
        setVisitors(latest.data().count);
      }
    } catch (err) {
      console.error(err);
    }
  };

  updateVisitors();
}, []);
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

      <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-white/5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left */}
          <p className="text-xs text-muted text-center sm:text-left">
            © {new Date().getFullYear()} Arsalan Sher. All rights reserved.
          </p>

          {/* Right */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Status */}
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
              </span>

              <span className="text-xs text-muted whitespace-nowrap">
                • Freelance • Collaborations
              </span>
<div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
  <Eye size={15} className="text-primary" />

  <span className="text-xs text-muted whitespace-nowrap">
    {visitors === null
      ? "Loading..."
      : `${visitors.toLocaleString()} Visitors`}
  </span>
</div>
            </div>
            <a
              href="#home"
              className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center hover:-translate-y-1 transition-transform"
              aria-label="Back to top"
            >
              <ArrowUp size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
