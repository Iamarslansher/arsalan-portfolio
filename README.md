# Arsalan Sher — Portfolio

The portfolio is built on the existing Next.js 14 App Router app with React,
Tailwind CSS, Framer Motion, Firebase, and React Icons. It includes anonymous
Firebase Realtime Database presence and an optional server-side AI portfolio
assistant.

## Requirements and local development

- Node.js 18.17 or later
- npm

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The portfolio works
without Firebase or an AI provider configured; presence then shows as
unavailable and chat supplies contact/project links instead of pretending a
live AI reply was generated.

The project intentionally remains on Next.js rather than being rebuilt as
Vite. The API route and the existing App Router components use Next.js.

## Firebase presence setup

1. Create or select a Firebase project and register a web app.
2. Copy its web-app config values into the `NEXT_PUBLIC_FIREBASE_*` entries in
   `.env.local`. These Firebase web configuration values are public client
   identifiers; do not put an AI provider key in a `NEXT_PUBLIC_` variable.
3. In Firebase Authentication, enable **Anonymous** sign-in.
4. Create a Realtime Database and set `NEXT_PUBLIC_FIREBASE_DATABASE_URL` to
   the exact database URL shown in Firebase Console (including its region and
   host).
5. In Realtime Database → Rules, publish the contents of
   [`firebase.database.rules.json`](./firebase.database.rules.json).
6. Add your deployed hostname to Firebase Authentication's authorized domains.

The rules allow public reads of connection booleans so each visitor can see
whether any portfolio connection is active. Anonymous authenticated clients
can write only their own connection booleans under their Firebase UID. Each
tab uses a unique connection key, registers server-side `onDisconnect`
removal before writing its active record, and writes no visitor profile or
device details. Firebase anonymous UIDs are used only to enforce ownership of
these connection records.

The indicator represents active connections to the portfolio site, not
Arsalan's personal availability. Firebase Auth/Realtime Database need to be
configured and reachable for a confirmed Online/Offline status. If the badge
says **Enable Firebase Anonymous Auth**, enable the Anonymous provider in the
project's Authentication → Sign-in method settings, then restart the app. If
it says **Check Firebase Database Rules**, publish the rules above and verify
that the configured Realtime Database belongs to the same Firebase project.

## Gemini AI assistant configuration

The chat API is `app/api/chat/route.js`. It uses Google's OpenAI-compatible
Gemini endpoint with the **Gemini 3.8 Flash** model by default. Google lists
this model's standard input and output as free of charge in the free tier,
subject to Google's account eligibility, usage limits, and availability. If
Gemini 3.8 Flash returns a temporary overload (503), the API retries once with
Gemini 3.5 Flash-Lite.

1. Create a Gemini API key in [Google AI Studio](https://aistudio.google.com/apikey).
2. Set `GEMINI_API_KEY` to that key in `.env.local` for local development and
   in your deployment provider's server-side environment settings. For
   compatibility, the server also accepts the existing `LLM_API_KEY` name.
3. `GEMINI_MODEL` defaults to `gemini-3.8-flash`; `GEMINI_BASE_URL` defaults to
   `https://generativelanguage.googleapis.com/v1beta/openai`.

Copy `.env.example` to `.env.local` and replace the placeholders. Never prefix
the Gemini key with `NEXT_PUBLIC_`. The server retrieves portfolio facts from
[`src/data/portfolioData.js`](./src/data/portfolioData.js), selects likely
relevant projects, validates and bounds input, limits requests in memory, and
does not persist chat history. Google's free-tier terms state that submitted
content may be used to improve its products; do not send private information
to this portfolio assistant.

The built-in limit is 8 requests per minute per detected client address per
running server instance. In-memory limits are best-effort and are not shared
between serverless instances; use a shared rate-limit service for stronger
production abuse protection. The provider request has a 20-second timeout.
Missing Gemini configuration and provider errors return helpful setup/contact
information instead of a fabricated AI answer.

## Run, lint, and build

```bash
npm run dev
npm run lint
npm run build
npm start
```

There is no separate test suite configured in this repository. For production,
run the lint and build commands above.

## Deploy

Deploy the existing Next.js app to Vercel or another Next.js-compatible host.
Configure all required `NEXT_PUBLIC_FIREBASE_*` variables and the server-only
`GEMINI_API_KEY` (and optionally `GEMINI_MODEL` or `GEMINI_BASE_URL`) in the
host's project environment settings for each environment, then redeploy. Publish the
Realtime Database rules and authorize the deployed hostname in Firebase as
described above. The chat route runs as a serverless function on Vercel.

Gemini API references: [OpenAI compatibility](https://ai.google.dev/gemini-api/docs/openai),
[models](https://ai.google.dev/gemini-api/docs/models), and
[pricing/free tier](https://ai.google.dev/gemini-api/docs/pricing).

## Portfolio content

Keep verified portfolio facts in [`src/data/portfolioData.js`](./src/data/portfolioData.js).
Unavailable experience details and project links are intentionally left
empty rather than inferred. The existing resume remains at `public/resume.pdf`.
Email contact and other social links are listed in the same data file; the
existing contact form continues to use its current EmailJS integration.
