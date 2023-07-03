import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // Most .env variabes should go here by default

    NODE_ENV: z.enum(["development", "test", "production"]),
    DATABASE_URL: z.string().url(),
    CLERK_SECRET_KEY: z.string().min(1),
  },
  client: {
    // Client .env variables go here
    // usually client .env variables are denoted
    // with a framework specific prefix
    // in this case that's `NEXT_PUBLIC`

    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  },
  runtimeEnv: {
    // destructure all .env variables used above here
    // this is needed because of a bug in nextJS caching
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
