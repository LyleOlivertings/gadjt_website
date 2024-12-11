import { clerkMiddleware, createRouteMatcher  } from "@clerk/nextjs/server";


const isProtectedRoute = createRouteMatcher(['/:path*'])
 
export default clerkMiddleware (async (auth, req) =>{
 if (isProtectedRoute(req)) await auth.protect()
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};