import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // optional callback for additional logic
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "admin",
    },
  }
)

export const config = { matcher: ["/admin/:path*"] }
