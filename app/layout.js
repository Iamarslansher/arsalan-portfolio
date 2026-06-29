import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://arsalansher.dev"),
  title: "Arsalan Sher | Frontend-Focused MERN Stack Developer",
  description:
    "Arsalan Sher is a Frontend-Focused MERN Stack Developer building modern, responsive, scalable, and user-friendly web applications with React, Next.js, and the MERN Stack.",
  keywords: [
    "Arsalan Sher",
    "Frontend Developer",
    "React Developer",
    "MERN Stack Developer",
    "Next.js Developer",
    "Web Developer Karachi",
  ],
  authors: [{ name: "Arsalan Sher" }],
  openGraph: {
    title: "Arsalan Sher | Frontend-Focused MERN Stack Developer",
    description:
      "Building modern, responsive, scalable, and user-friendly web applications with React, Next.js, and the MERN Stack.",
    url: "https://arsalansher.dev",
    siteName: "Arsalan Sher Portfolio",
    images: ["/og-image.jpg"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arsalan Sher | Frontend-Focused MERN Stack Developer",
    description:
      "Building modern, responsive, scalable, and user-friendly web applications with React, Next.js, and the MERN Stack.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="bg-bg text-text antialiased noise-bg">{children}</body>
    </html>
  );
}
