# Welcome to LyteStack

## Table of Contents

- [What's Here?](#whats-here)
-

<br />
<br />

<div align="center">
  <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXVvZXFidzJtbzRoZ291MGRzZHFpdHM2MzQ1aXR4NmdiYmtkcDdpMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2UndXEgN5iBwc/giphy.gif" width="100%" alt="animated cassette spinning in radio">
</div>

LyteStack is a starter pack to create an SPA quickly and deploy to Vercel. If you want something fun, light, and fast with a type-safe API, you've arrived.

## What's Here?

- [Vite-based React](https://vite.dev/guide/) with...
  - [TypeScript](https://www.typescriptlang.org/) and
  - [SWC](https://swc.rs/)
- [tRPC](https://trpc.io/)
- [Express](https://expressjs.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Router](https://reactrouter.com/)
- [Zod](https://zod.dev/)

## Get Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/internetdrew/lyte-stack.git
   cd lytestack
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development servers**

   ```bash
   # From the root directory
   npm run dev
   ```

   This will start both the client (Vite) and server (Express) in development mode.

4. **Build for production**
   ```bash
   npm run build
   ```

## Development

- Client runs on `http://localhost:5173`
- Server runs on `http://localhost:3000`

## Deployment

This stack is optimized for deployment on Vercel. Simply connect your repository to Vercel and it will automatically detect the build settings.

## Usage and Structure

### Notes on Deployment

- The key difference between making this work locally and making it work in deployment is the `vercel.json` file in the root directory. This configuration file tells Vercel how to build and serve your application:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/index.ts",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "rewrites": [
    { "source": "/trpc/:path*", "destination": "/server/index.ts" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Here's what each part does:

1. **Builds Configuration**:

   - First build: Uses `@vercel/node` to build the Express server from `server/index.ts`
   - Second build: Uses `@vercel/static-build` to build the client-side React application, outputting to the `dist` directory

2. **Rewrites Configuration**:
   - `/trpc/:path*`: Routes all tRPC API requests to the server
   - `/(.*)`: Routes all other requests to `index.html` for client-side routing

### Notes on Development Server

The development environment uses Vite's dev server with a proxy configuration to seamlessly connect the frontend and backend:

1. **Vite Dev Server**:

   - Runs on `http://localhost:5173`
   - Handles hot module replacement (HMR) for React components
   - Serves static assets and handles client-side routing

2. **Express Server**:

   - Runs on `http://localhost:3000`
   - Handles tRPC API requests
   - Manages server-side logic and database connections

3. **Proxy Configuration**:
   The connection between Vite and Express is handled through Vite's proxy configuration in `vite.config.ts`:
   ```typescript
   {
     proxy: {
       '/trpc': {
         target: 'http://localhost:3000',
         changeOrigin: true,
       }
     }
   }
   ```
   This configuration:
   - Forwards all `/trpc/*` requests to the Express server
   - Enables seamless API calls during development (nodemon watches server files)
   - Maintains type safety through tRPC
