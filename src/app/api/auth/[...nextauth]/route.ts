import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  session: {
    strategy: 'jwt', // use JWT instead of DB sessions
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // 🔥 Call your backend API (already deployed in Vercel)
        const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const user = await res.json();

        if (res.ok && user) {
          // return user object (NextAuth will create JWT for it)
          return user;
        }
        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // First time login → attach user data
    //   if (user) {
    //     token.id = user.id;
    //     token.role = user.role;
    //   }
    //   return token;
    // },
    // async session({ session, token }) {
    //   // Expose JWT fields to session
    //   if (token) {
    //     session.user.id = token.id;
    //     session.user.role = token.role;
    //   }
    //   return session;
    // },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
