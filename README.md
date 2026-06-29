# Arsalan Sher — Portfolio

A modern, animated personal portfolio built with Next.js App Router, Tailwind CSS,
Framer Motion, GSAP, and more — designed for Frontend / React / MERN Stack job
opportunities.

## Tech Stack

- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion + GSAP
- React Type Animation
- Lenis smooth scroll
- React Icons / Lucide React
- EmailJS
- React CountUp
- react-github-calendar

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Setup Notes

1. **Resume**: add your PDF resume at `public/resume.pdf` (the Hero "Download Resume"
   button links here).
2. **EmailJS**: in `components/Contact.jsx`, replace `YOUR_SERVICE_ID`,
   `YOUR_TEMPLATE_ID`, and `YOUR_PUBLIC_KEY` with your EmailJS credentials.
3. **GitHub username**: in `components/GithubActivity.jsx`, set `GITHUB_USERNAME`
   to your real GitHub handle.
4. **Social links**: update the links in `components/Contact.jsx` and
   `components/Footer.jsx` with your real profiles (GitHub, LinkedIn, Instagram,
   Facebook, WhatsApp).
5. **Contact info**: update email, phone, and location in `components/Contact.jsx`.
6. **OG image**: add `public/og-image.jpg` (1200x630) for social share previews.
7. **Project links**: in `components/Projects.jsx`, replace the placeholder `#`
   GitHub/Live links with your actual repo and deployment URLs, and swap in real
   project screenshots if you'd like images instead of the abstract gradient cards.

## Folder Structure

```
app/
  layout.js       — root layout, fonts, SEO metadata
  page.js          — composes all sections
  globals.css      — global styles & utility classes
components/
  Loader, Navbar, Hero, About, TechStack, Services,
  Projects, Education, GithubActivity, Contact, Footer,
  SmoothScrollProvider
```

## Deployment

Optimized for [Vercel](https://vercel.com). Just push to GitHub and import the repo.
