"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, RotateCcw, Trash2, X } from "lucide-react";
import { sendChatMessages } from "@/src/services/chatService";
import { portfolioData, suggestedPrompts } from "@/src/data/portfolioData";

const welcomeMessage =
  "Hi! 👋 I'm Arsalan AI, your portfolio assistant. Ask me about Arsalan's projects, technical skills, development experience, or ways to collaborate.";
const initialMessages = [{ role: "assistant", content: welcomeMessage }];

function MessageText({ content }) {
  const linkPattern =
    /\[((?:[^\]])+)\]\(((?:https?:\/\/|mailto:)[^)\s]+)\)|((?:https?:\/\/|mailto:)[^\s)]+)/g;
  const parts = [];
  let lastIndex = 0;

  for (const match of content.matchAll(linkPattern)) {
    if (match.index > lastIndex) {
      parts.push({
        text: content.slice(lastIndex, match.index),
        key: `text-${lastIndex}`,
      });
    }
    parts.push({
      text: match[1] || match[3],
      href: match[2] || match[3],
      key: `link-${match.index}`,
    });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < content.length) {
    parts.push({ text: content.slice(lastIndex), key: `text-${lastIndex}` });
  }

  return parts.map((part) =>
    part.href ? (
      <a
        key={part.key}
        href={part.href}
        target={part.href.startsWith("mailto:") ? undefined : "_blank"}
        rel={part.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
        className="underline underline-offset-2 text-primary break-all"
      >
        {part.text}
      </a>
    ) : (
      part.text.split("\n").map((line, index) => (
        <span key={`${part.key}-${index}`}>
          {line}
          {index < part.text.split("\n").length - 1 && <br />}
        </span>
      ))
    ),
  );
}

function FallbackLinks() {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      <a className="chat-action-link" href="#projects">
        Browse projects
      </a>
      <a className="chat-action-link" href={`mailto:${portfolioData.contact.email}`}>
        Contact Arsalan
      </a>
    </div>
  );
}

export default function PortfolioChatbotPanel({ onClose }) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [retryPrompt, setRetryPrompt] = useState("");
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const launcherRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    inputRef.current?.focus();
    launcherRef.current = document.querySelector(
      'button[aria-label="Close Ask Arsalan AI"]',
    );
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [messages, loading, reduceMotion]);

  const updateMessages = (nextMessages) => {
    setMessages(nextMessages);
  };

  const sendQuestion = async (question, addUserMessage = true) => {
    const normalized = question.trim();
    if (!normalized || loading) return;

    const history = messages
      .filter((message) => !message.failed)
      .slice(-8)
      .map(({ role, content }) => ({ role, content }));
    if (
      !addUserMessage &&
      history[history.length - 1]?.role === "user" &&
      history[history.length - 1]?.content === normalized
    ) {
      history.pop();
    }
    const conversation = [...history, { role: "user", content: normalized }];

    if (addUserMessage) {
      updateMessages([...messages, { role: "user", content: normalized }]);
    }
    setInput("");
    setLoading(true);
    setRetryPrompt(normalized);

    try {
      const reply = await sendChatMessages(conversation);
      updateMessages([
        ...(addUserMessage
          ? [...messages, { role: "user", content: normalized }]
          : messages),
        { role: "assistant", content: reply },
      ]);
      setRetryPrompt("");
    } catch (error) {
      updateMessages([
        ...(addUserMessage
          ? [...messages, { role: "user", content: normalized }]
          : messages),
        {
          role: "assistant",
          content:
            error.message ||
            "The assistant couldn't connect right now. Please try again.",
          failed: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearConversation = () => {
    updateMessages(initialMessages);
    setRetryPrompt("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose();
      launcherRef.current?.focus();
    }
  };

  return (
    <motion.section
      role="dialog"
      aria-label="Ask Arsalan AI chat"
      aria-modal="false"
      initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
      onKeyDown={handleKeyDown}
      className="w-[min(24rem,calc(100vw-2rem))] h-[min(36rem,calc(100dvh-7rem))] min-h-0 glass border border-white/10 rounded-2xl shadow-2xl shadow-black/40 flex flex-col overflow-hidden"
    >
      <header className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10 bg-bg/70">
        <div>
          <h2 className="font-display text-sm font-semibold">Ask Arsalan AI</h2>
          <p className="text-xs text-muted mt-0.5">Portfolio assistant</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={clearConversation}
            disabled={loading}
            aria-label="Clear conversation"
            title="Clear conversation"
            className="chat-icon-button disabled:opacity-40"
          >
            <Trash2 size={16} />
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              launcherRef.current?.focus();
            }}
            aria-label="Close chat"
            className="chat-icon-button"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      <div
        ref={listRef}
        className="flex-1 overflow-y-auto p-4 space-y-3"
        role="log"
        aria-live="polite"
        aria-relevant="additions text"
        aria-label="Conversation"
      >
        {messages.map((message, index) => (
          <div
            key={`${index}-${message.role}`}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                message.role === "user"
                  ? "bg-primary/20 border border-primary/20 text-white rounded-br-sm"
                  : "bg-white/5 border border-white/10 text-gray-100 rounded-bl-sm"
              }`}
            >
              <MessageText content={message.content} />
              {message.failed && (
                <>
                  <FallbackLinks />
                  {retryPrompt && (
                    <button
                      type="button"
                      onClick={() => sendQuestion(retryPrompt, false)}
                      disabled={loading}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs text-primary hover:text-white disabled:opacity-50"
                    >
                      <RotateCcw size={13} /> Try again
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}

        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                disabled={loading}
                onClick={() => sendQuestion(prompt)}
                className="rounded-full border border-white/10 px-3 py-1.5 text-left text-xs text-muted hover:border-primary/40 hover:text-white disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        <AnimatePresence>
          {loading && (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              className="flex items-center gap-1.5 px-3 py-2 text-muted"
              aria-label="Arsalan AI is typing"
              role="status"
            >
              <span className="sr-only">Arsalan AI is typing</span>
              {[0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-primary"
                  animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
                  transition={{
                    duration: 0.7,
                    repeat: Infinity,
                    delay: dot * 0.12,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          sendQuestion(input);
        }}
        className="flex items-center gap-2 p-3 border-t border-white/10 bg-bg/70"
      >
        <label className="sr-only" htmlFor="portfolio-chat-input">
          Ask a question about Arsalan&apos;s portfolio
        </label>
        <input
          ref={inputRef}
          id="portfolio-chat-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          maxLength={1_500}
          placeholder="Ask about projects, skills..."
          disabled={loading}
          className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-60"
        />
        <button
          type="submit"
          aria-label="Send message"
          disabled={loading || !input.trim()}
          className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center disabled:opacity-40"
        >
          <ArrowUp size={18} />
        </button>
      </form>
    </motion.section>
  );
}
