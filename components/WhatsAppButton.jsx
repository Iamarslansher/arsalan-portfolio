"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { X } from "lucide-react";

const PHONE = "923072973307";
const MESSAGE =
  "Hi Arsalan! I visited your portfolio and I'd like to connect. 👋";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappURL = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3">
      {/* Tooltip bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative glass border border-white/10 rounded-2xl px-4 py-3 shadow-xl max-w-[220px]"
          >
            {/* Close button */}
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X size={10} />
            </button>

            <p className="text-xs font-medium text-white mb-0.5">
              Hi there! 👋
            </p>
            <p className="text-[11px] text-muted leading-relaxed">
              Need a developer? Let&apos;s talk on WhatsApp!
            </p>

            {/* Triangle arrow */}
            <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white/10" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <div className="relative">
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-20 animate-ping [animation-delay:0.4s]" />

        <motion.a
          href={whatsappURL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-shadow hover:shadow-[0_0_30px_rgba(37,211,102,0.6)]"
          style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp size={28} color="#fff" />
        </motion.a>
      </div>
    </div>
  );
}
