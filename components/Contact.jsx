"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Facebook,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const socials = [
  { icon: Github, href: "https://github.com/Iamarslansher", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/arsalan-sher-0bb9b32a8/",
    label: "LinkedIn",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/azlan_chudhary",
    label: "Instagram",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/arslan.salloo",
    label: "Facebook",
  },
  { icon: FaWhatsapp, href: "https://wa.me/923072973307", label: "WhatsApp" },
];

export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    // "service_j06z94o", services_ID
    // template_06rc2uv template_ID
    // lrTBGBUj8GvY5mDMc public_key
    emailjs
      .sendForm(
        "service_j06z94o",
        "template_06rc2uv",
        formRef.current,
        "lrTBGBUj8GvY5mDMc",
      )
      .then(() => {
        setStatus("success");
        formRef.current.reset();
      })
      .catch(() => setStatus("error"));
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="eyebrow mb-3">Get In Touch</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            Let&apos;s Build Something{" "}
            <span className="text-gradient">Great</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          <motion.form
            ref={formRef}
            onSubmit={sendEmail}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 border border-white/5 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <input
                // name="user_name"
                name="name"
                required
                placeholder="Your Name"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
              />
              <input
                // name="user_email"
                name="email"
                type="email"
                required
                placeholder="Your Email"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <input
              name="subject"
              required
              placeholder="Subject"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
            />
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Your Message"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none"
            />
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
            {status === "success" && (
              <p className="text-sm text-primary">Message sent successfully!</p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-400">
                Something went wrong. Try again.
              </p>
            )}
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-6 border border-white/5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
                <Mail className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-wider">
                  Email
                </p>
                <p className="text-sm">iamarslansher@gmail.com</p>
              </div>
            </div>
            <div className="glass rounded-2xl p-6 border border-white/5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center">
                <Phone className="text-secondary" size={20} />
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-wider">
                  Phone
                </p>
                <p className="text-sm">+92 307 2973307</p>
              </div>
            </div>
            <div className="glass rounded-2xl p-6 border border-white/5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
                <MapPin className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-wider">
                  Location
                </p>
                <p className="text-sm">Karachi, Pakistan</p>
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
