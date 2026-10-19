"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

const ChatbotPanel = dynamic(() => import("./PortfolioChatbotPanel"), {
  ssr: false,
});

export default function PortfolioChatbot() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div className="fixed bottom-24 right-6 z-[998] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && <ChatbotPanel onClose={() => setOpen(false)} />}
      </AnimatePresence>
      <motion.button
        type="button"
        aria-label={open ? "Close Ask Arsalan AI" : "Open Ask Arsalan AI"}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        whileHover={reduceMotion ? undefined : { y: -2 }}
        whileTap={reduceMotion ? undefined : { scale: 0.96 }}
        className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-gradient-to-br from-primary to-secondary px-5 text-white shadow-lg shadow-primary/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
        <span className="whitespace-nowrap text-sm font-semibold">
          {open ? "Close chat" : "Ask Arsalan AI"}
        </span>
      </motion.button>
    </div>
  );
}
