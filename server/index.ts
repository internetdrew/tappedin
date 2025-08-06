import { createExpressMiddleware } from "@trpc/server/adapters/express";
import express from "express";
import cors from "cors";
import { publicProcedure, router, createContext } from "./trpc";
import { z } from "zod";
import dotenv from "dotenv";
import path from "path";
import compression from "compression";
import helmet from "helmet";
import { generateLinkedInPost } from "./generateLinkedInPost";
import Redis from "ioredis";
import { TRPCError } from "@trpc/server";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

if (!process.env.REDIS_URL) {
  throw new Error("REDIS_URL is not set");
}

const redisClient = new Redis(process.env.REDIS_URL);

export async function checkRedisForLimit(
  key: string,
  max = 10,
  windowSeconds = 60 * 60 * 24,
): Promise<boolean> {
  const redisKey = `rate_limit:${key}`;

  const current = await redisClient.incr(redisKey);

  if (current === 1) {
    await redisClient.expire(redisKey, windowSeconds);
  }

  return current > max;
}

export const appRouter = router({
  generatePost: publicProcedure
    .input(
      z.object({
        content: z
          .string()
          .min(500, "Your blog post must be at least 500 characters")
          .max(10000, "Your blog post must be less than 10,000 characters"),
        tone: z.string(),
        poster: z.string(),
        audience: z.string(),
        callToAction: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { content, tone, callToAction, poster, audience } = input;
      const isLimited = await checkRedisForLimit(
        ctx.req.ip ?? "unknown",
        process.env.NODE_ENV === "development" ? 100 : 10,
        86400,
      );

      if (isLimited) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message:
            "You've hit your generation limit. Please try again in 24 hours.",
        });
      }
      const linkedInPost = await generateLinkedInPost({
        poster,
        audience,
        content,
        tone,
        callToAction,
      });
      return linkedInPost;
    }),
});

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

const app = express();

app.use(compression());
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;

export type AppRouter = typeof appRouter;
