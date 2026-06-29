"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-bg"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
          <motion.div
            className="font-display text-5xl md:text-7xl font-bold tracking-wide"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="text-gradient">{"<"}</span>
            <span className="text-white">AS</span>
            <span className="text-gradient">{" />"}</span>
          </motion.div>

          <div className="mt-8 h-[3px] w-40 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full w-full bg-gradient-to-r from-primary to-secondary"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
          </div>

          <motion.p
            className="mt-4 text-sm text-muted tracking-[0.3em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Loading Portfolio
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
