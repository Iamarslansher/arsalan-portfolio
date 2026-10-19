"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { subscribeToPortfolioPresence } from "@/src/services/presenceService";

const labels = {
  connecting: "Checking connection",
  online: "Currently online",
  offline: "Currently offline",
  unavailable: "Presence not configured",
  "auth-disabled": "Enable Firebase Anonymous Auth",
  "permission-denied": "Check Firebase Database Rules",
  error: "Presence temporarily unavailable",
};

export default function AvailabilityBadge() {
  const [status, setStatus] = useState("connecting");
  const reduceMotion = useReducedMotion();

  useEffect(
    () => subscribeToPortfolioPresence(setStatus),
    [],
  );

  const isOnline = status === "online";
  const known = status === "online" || status === "offline";

  return (
    <div
      className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-2"
      role="status"
      aria-live="polite"
      aria-label={`${labels[status]}. This reflects active portfolio connections, not personal availability.`}
      title="Shows active portfolio connections, not personal availability."
    >
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        {isOnline && !reduceMotion && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-emerald-400"
            animate={{ opacity: [0.35, 0], scale: [1, 1.8] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <motion.span
          aria-hidden="true"
          className={`relative h-2.5 w-2.5 rounded-full ${
            isOnline ? "bg-emerald-400" : "bg-gray-500"
          }`}
          animate={{ scale: reduceMotion ? 1 : [0.9, 1] }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
        />
      </span>
      <span className="text-xs sm:text-sm text-muted whitespace-nowrap">
        {labels[status]}
      </span>
      {!known && <span className="sr-only">Status is not confirmed.</span>}
    </div>
  );
}
