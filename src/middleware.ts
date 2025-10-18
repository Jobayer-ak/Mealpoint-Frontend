// middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/auth/login', // redirect here when not authenticated
  },
});

export const config = {
  matcher: ['/(protected)/(.*)'],
};
