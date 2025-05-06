// api/trpc/index.ts

import express from 'express';
import cors from 'cors';

// Create an Express app
const app = express();

// Enable CORS for all routes
app.use(
  cors({
    // origin: 'http://localhost:5173',
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// API routes
app.get('/api', (req, res) => {
  res.json({ message: 'Hello World' });
});

// Mount tRPC on /trpc
// app.use(
//   '/trpc',
//   createExpressMiddleware({
//     router: appRouter,
//     createContext,
//   })
// );

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
