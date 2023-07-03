import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // by default all pages are set to private by default by the clerk middleware
  // for now, my application doesn't have any private pages
  // so the following line sets them all back to being public pages

  publicRoutes: ["/(.*)"],
});

export const config = {
  // Disable the middleware on the following pages
  // used for static routes and generated files

  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
