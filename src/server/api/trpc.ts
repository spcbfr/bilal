/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */
import {
  currentUser,
  getAuth,
} from "@clerk/nextjs/dist/types/server-helpers.server";
import { TRPCError, initTRPC } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import next from "next/types";
import superjson from "superjson";
import { ZodError } from "zod";
import { prisma } from "~/server/db";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see {@link https://trpc.io/docs/context}
 */
export const createTRPCContext = (opts: CreateNextContextOptions) => {
  const req = opts.req;
  const sesh = getAuth(req);
  const user = sesh.user;
  return {
    prisma,
    currentUser: user,
  };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see {@link https://trpc.io/docs/router}
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.currentUser) {
    throw new TRPCError({ code: "UNAUTHORIZED", cause: "Not Authenticated" });
  }
  return next({
    ctx: {
      currentUser: currentUser,
    },
  });
});

/**
 * @description Private (authenticated) procedure
 * When using this procedure you can be sure that a user session exists, i.e. a user is autthenticated
 * so you can access the User Object safely
 *
 * @throws TRPC error if no user exists
 * @see {@link enforceUserIsAuthed} for the auth checking implementation
 */
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
