import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: '/login',
  },
})

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/pay-bill/:path*',
    '/contacts/:path*',
    '/settings/:path*'
  ]
}