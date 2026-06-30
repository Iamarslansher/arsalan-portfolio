"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "GitHub", href: "#github" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", onScroll);

    const sections = links
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      {
        threshold: 0.4,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (href) => {
    setOpen(false);

    setTimeout(() => {
      const section = document.querySelector(href);

      if (section) {
        const navbarHeight = 90;

        const sectionTop =
          section.getBoundingClientRect().top +
          window.pageYOffset -
          navbarHeight;

        window.scrollTo({
          top: sectionTop,
          behavior: "smooth",
        });
      }
    }, 250);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "glass backdrop-blur-xl shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("#home")}
          className="font-display text-2xl font-bold"
        >
          <span className="text-gradient">{"<AS"}</span>
          <span className="text-white">{" />"}</span>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                className={`relative text-sm font-medium transition-colors ${
                  active === link.href
                    ? "text-primary"
                    : "text-muted hover:text-white"
                }`}
              >
                {link.name}

                {active === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-2 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-primary to-secondary"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Hire Me Button */}
        <button
          onClick={() => handleNavClick("#contact")}
          className="hidden lg:inline-flex btn-primary text-sm"
        >
          Hire Me
        </button>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass overflow-hidden"
          >
            <ul className="flex flex-col px-6 py-4">
              {links.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={`w-full text-left py-3 border-b border-white/10 transition-colors ${
                      active === link.href
                        ? "text-primary"
                        : "text-muted hover:text-white"
                    }`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
