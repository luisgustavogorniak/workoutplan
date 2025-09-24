# WorkoutPlan - AI Powered Workout Planning

## About

WorkoutPlan is a modern SaaS application built with Next.js that generates personalized workout plans using AI. Get professional training guidance tailored to your goals and needs.

## Core Technologies

- **Frontend:** Next.js 14 with App Router
- **UI:** TailwindCSS + [Geist](https://vercel.com/font) font
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** Clerk
- **Payments:** Stripe Integration
- **AI:** OpenAI/OpenRouter API

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Set up your environment variables:

```bash
cp .env.example .env
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

```env
DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
OPENAI_API_KEY=
```

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Authentication](https://clerk.dev/docs)
- [Stripe Payments](https://stripe.com/docs)
- [Prisma ORM](https://www.prisma.io/docs)

## Deploy

Deploy easily using [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).
