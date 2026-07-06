// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
//   theme: {
//     extend: {
//       colors: {
//         bg: "#0B1120",
//         card: "#111827",
//         primary: "#06B6D4",
//         secondary: "#8B5CF6",
//         text: "#FFFFFF",
//         muted: "#CBD5E1",
//       },
//       fontFamily: {
//         poppins: ["var(--font-poppins)"],
//         inter: ["var(--font-inter)"],
//       },
//       backgroundImage: {
//         "grid-glow":
//           "radial-gradient(circle at 20% 20%, rgba(6,182,212,0.15), transparent 40%), radial-gradient(circle at 80% 30%, rgba(139,92,246,0.15), transparent 40%)",
//       },

//       keyframes: {
//         marquee: {
//           "0%": { transform: "translateX(0%)" },
//           "100%": { transform: "translateX(-50%)" },
//         },
//         float: {
//           "0%,100%": { transform: "translateY(0px)" },
//           "50%": { transform: "translateY(-14px)" },
//         },
//         glow: {
//           "0%,100%": { opacity: 0.5 },
//           "50%": { opacity: 1 },
//         },
//       },
//       animation: {
//         marquee: "marquee 30s linear infinite",
//         float: "float 6s ease-in-out infinite",
//         glow: "glow 3s ease-in-out infinite",
//       },
//     },
//   },
//   plugins: [],
// };

// ===============
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0B1120",
        card: "#111827",
        primary: "#06B6D4",
        secondary: "#8B5CF6",
        text: "#FFFFFF",
        muted: "#CBD5E1",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
        inter: ["var(--font-inter)"],
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(circle at 20% 20%, rgba(6,182,212,0.15), transparent 40%), radial-gradient(circle at 80% 30%, rgba(139,92,246,0.15), transparent 40%)",
      },
      keyframes: {
        "marquee-left": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        glow: {
          "0%,100%": { opacity: 0.5 },
          "50%": { opacity: 1 },
        },
      },
      animation: {
        "marquee-left": "marquee-left 28s linear infinite",
        "marquee-right": "marquee-right 28s linear infinite",
        "marquee-left-slow": "marquee-left 40s linear infinite",
        "marquee-right-slow": "marquee-right 40s linear infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
