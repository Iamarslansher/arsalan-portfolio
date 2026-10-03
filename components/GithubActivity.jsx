"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GitHubCalendar from "react-github-calendar";
import CountUp from "react-countup";
import {
  Star,
  GitFork,
  BookOpen,
  Users,
  Flame,
  Zap,
  AlertCircle,
} from "lucide-react";

const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME;

const LANG_COLORS = {
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  CSS: "#8B5CF6",
  HTML: "#E34F26",
  Python: "#3776AB",
  "Jupyter Notebook": "#F97316",
  "C++": "#00599C",
  C: "#A8B9CC",
  Shell: "#89E051",
  Vue: "#42B883",
};

function FadeIn({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.55 }}
    >
      {children}
    </motion.div>
  );
}

function Skeleton({ className = "" }) {
  return <div className={`animate-pulse bg-white/5 rounded-lg ${className}`} />;
}

export default function GithubActivity() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rateLimited, setRateLimited] = useState(false);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [userRes, repoRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`),
          fetch(
            `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed`,
          ),
        ]);

        // ✅ Rate limit check
        if (userRes.status === 403 || repoRes.status === 403) {
          setRateLimited(true);
          setLoading(false);
          return;
        }

        if (!userRes.ok || !repoRes.ok) throw new Error("GitHub API error");

        const userData = await userRes.json();
        const repoData = await repoRes.json();

        setUser(userData);
        setRepos(repoData);

        const top15 = repoData.filter((r) => !r.fork).slice(0, 15);

        const langResults = await Promise.all(
          top15.map((r) =>
            fetch(r.languages_url)
              .then((res) => {
                if (res.status === 403) throw new Error("rate limited"); // ✅
                return res.json();
              })
              .catch(() => ({})),
          ),
        );

        const langMap = {};
        langResults.forEach((langObj) => {
          Object.entries(langObj).forEach(([lang, bytes]) => {
            langMap[lang] = (langMap[lang] || 0) + bytes;
          });
        });

        const totalBytes = Object.values(langMap).reduce((a, b) => a + b, 0);
        const sorted = Object.entries(langMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, bytes]) => ({
            name,
            percent: ((bytes / totalBytes) * 100).toFixed(1),
            color: LANG_COLORS[name] || "#06B6D4",
          }));

        setLanguages(sorted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);
  const totalForks = repos.reduce((acc, r) => acc + r.forks_count, 0);

  const statCards = [
    {
      label: "Public Repos",
      value: user?.public_repos ?? 0,
      icon: BookOpen,
      color: "#06B6D4",
    },
    { label: "Total Stars", value: totalStars, icon: Star, color: "#F7DF1E" },
    {
      label: "Total Forks",
      value: totalForks,
      icon: GitFork,
      color: "#8B5CF6",
    },
    {
      label: "Followers",
      value: user?.followers ?? 0,
      icon: Users,
      color: "#10B981",
    },
  ];

  return (
    <section id="github" className="section-padding">
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Header ── */}
        <FadeIn>
          <div className="text-center mb-14">
            <p className="eyebrow mb-3">Open Source</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">
              GitHub <span className="text-gradient">Activity</span>
            </h2>
            <p className="text-muted max-w-xl mx-auto text-sm">
              Live GitHub data contributions, languages & stats, updated in real
              time. ✨
            </p>
          </div>
        </FadeIn>

        {/* ✅ Rate Limit Warning */}
        {rateLimited && (
          <FadeIn>
            <div className="flex items-center justify-center gap-2 mb-6 text-xs text-yellow-400/90 bg-yellow-400/5 border border-yellow-400/20 rounded-xl px-4 py-3 max-w-sm mx-auto">
              <AlertCircle size={14} className="flex-shrink-0" />
              GitHub API rate limit reached — refresh after a minute.
            </div>
          </FadeIn>
        )}

        {/* ── Row 1: Quick Stat Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statCards.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <FadeIn key={stat.label} delay={i * 0.07}>
                <div className="glass rounded-2xl p-5 border border-white/5 flex items-center gap-4 hover:border-primary/30 transition-colors">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${stat.color}18` }}
                  >
                    <Icon size={20} style={{ color: stat.color }} />
                  </div>
                  <div>
                    <span className="block text-xs text-muted mb-0.5">
                      {stat.label}
                    </span>
                    <div className="font-display text-xl font-bold">
                      {loading ? (
                        <Skeleton className="h-5 w-8" />
                      ) : (
                        <CountUp
                          end={stat.value}
                          duration={2}
                          enableScrollSpy
                          scrollSpyOnce
                        />
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* ── Row 2: Languages + Streak ── */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Most Used Languages */}
          <FadeIn delay={0.1}>
            <div className="glass rounded-2xl p-6 border border-white/5 h-full">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-lg">💻</span>
                <h3 className="font-display font-semibold">
                  Most Used Languages
                </h3>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-8 w-full" />
                  ))}
                </div>
              ) : (
                <>
                  <div className="flex rounded-full overflow-hidden h-3 mb-5">
                    {languages.map((lang) => (
                      <div
                        key={lang.name}
                        style={{
                          width: `${lang.percent}%`,
                          background: lang.color,
                        }}
                        title={`${lang.name}: ${lang.percent}%`}
                      />
                    ))}
                  </div>
                  <div className="space-y-3">
                    {languages.map((lang) => (
                      <div
                        key={lang.name}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ background: lang.color }}
                          />
                          <span className="text-sm text-muted">
                            {lang.name}
                          </span>
                        </div>
                        <span className="text-sm font-semibold tabular-nums">
                          {lang.percent}%
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </FadeIn>

          {/* GitHub Streak */}
          <FadeIn delay={0.15}>
            <div className="glass rounded-2xl p-6 border border-white/5 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-5">
                <Flame size={20} className="text-orange-400" />
                <h3 className="font-display font-semibold">GitHub Streak</h3>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <img
                  src={`https://streak-stats.demolab.com/?user=${USERNAME}&theme=tokyonight&hide_border=true&background=111827&stroke=1e293b&ring=06B6D4&fire=8B5CF6&currStreakLabel=06B6D4&sideLabels=CBD5E1&dates=CBD5E1&currStreakNum=ffffff&sideNums=ffffff`}
                  alt="GitHub Streak Stats"
                  className="w-full max-w-sm mx-auto rounded-xl"
                  loading="lazy"
                />
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── Row 3: GitHub Stats Card ── */}
        <FadeIn delay={0.2}>
          <div className="glass rounded-2xl p-6 border border-white/5 mb-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-lg">📊</span>
              <h3 className="font-display font-semibold">
                Arsalan Sher&apos;s GitHub Stats
              </h3>
            </div>
            <div className="flex justify-center">
              <img
                src={`https://github-readme-stats.vercel.app/api?username=${USERNAME}&show_icons=true&theme=tokyonight&hide_border=true&bg_color=111827&title_color=06B6D4&icon_color=8B5CF6&text_color=CBD5E1&rank_icon=github`}
                alt="GitHub Stats"
                className="w-full max-w-lg rounded-xl"
                loading="lazy"
              />
            </div>
          </div>
        </FadeIn>

        {/* ── Row 4: Contribution Calendar ── */}
        <FadeIn delay={0.25}>
          <div className="glass rounded-2xl p-6 sm:p-8 border border-white/5 overflow-x-auto mb-6">
            <div className="flex items-center gap-2 mb-6">
              <Zap size={20} className="text-primary" />
              <h3 className="font-display font-semibold">Contribution Graph</h3>
            </div>
            <div className="flex justify-center">
              <GitHubCalendar
                username={USERNAME}
                colorScheme="dark"
                blockSize={13}
                blockMargin={4}
                fontSize={13}
                theme={{
                  dark: ["#111827", "#0e3a45", "#0a6f80", "#06B6D4", "#8B5CF6"],
                }}
              />
            </div>
          </div>
        </FadeIn>

        {/* ── Profile Button ── */}
        <FadeIn delay={0.3}>
          <div className="text-center">
            <a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              View Full GitHub Profile
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
