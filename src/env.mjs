import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
/** @see https://env.t3.gg/docs/nextjs */
export const env = createEnv({
  /** Most .env variabes should go here by default  */

  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    DATABASE_URL: z.string().url(),
    CLERK_SECRET_KEY: z.string().min(1),
  },
  /**
   * Client .env variables go here
   * usually client .env variables are denoted
   * with a framework specific prefix
   *  in this case that's `NEXT_PUBLIC`
   */

  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  },
  /**
   * destructure all .env variables used above here
   * this is needed because of a bug in nextJS caching
   */

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
