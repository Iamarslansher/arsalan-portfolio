export async function sendChatMessages(messages, { signal } = {}) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
    signal,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || "The assistant could not respond.");
    error.fallback = data.fallback === true;
    throw error;
  }

  if (typeof data.reply !== "string" || !data.reply.trim()) {
    throw new Error("The assistant returned an empty response.");
  }
  return data.reply;
}
