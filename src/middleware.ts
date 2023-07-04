import { authMiddleware } from "@clerk/nextjs";

/**
 * by default all pages are set to private by default by the clerk middleware
 * for now, my application doesn't have any private pages
 * so the following line sets them all back to being public pages
 */

export default authMiddleware({
  publicRoutes: ["/(.*)"],
});

/**
 * Disable the middleware on the following pages
 * used for static routes and generated files
 * @see https://clerk.com/docs/nextjs/middleware
 */

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
