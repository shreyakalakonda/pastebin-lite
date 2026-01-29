This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

# Pastebin Lite

A simple Pastebin-like application built using Next.js and Redis (Upstash KV).

---

## Deployed URL

https://pastebin-lite-two-xi.vercel.app

---

## GitHub Repository

https://github.com/shreyakalakonda/pastebin-lite.git

---

## How to run the app locally

1. Clone the repository:
   git clone https://github.com/shreyakalakonda/pastebin-lite.git

2. Go into the project folder:
   cd pastebin-lite

3. Install dependencies:
   npm install

4. Create a .env.local file and add Redis credentials.

5. Run the app:
   npm run dev

6. Open browser:
   http://localhost:3000


Persistence Layer:

This application uses Upstash Redis (Vercel KV) as its persistence layer.

Why Upstash Redis?

-Serverless-friendly
-Data persists across requests
-Works reliably with Vercel deployments
-Suitable for automated grading environments
-All paste data (content, expiry time, view count) is stored in Redis.