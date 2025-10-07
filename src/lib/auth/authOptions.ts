/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );

          const data = await res.json();

          if (!res.ok || !data) return null;

          return {
            ...data.data.user,
            id: data.data.user._id,
            email: data.data.user.email,
            role: data.data.user.role,
            accessToken: data.data.token,
            provider: 'credentials',
          };
        } catch (err) {
          console.error('Login failed:', err);
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account?.provider === 'google' && profile) {
        const p = profile as import('next-auth').Profile;
        token.id = p.sub as string;
        token.name = p.name;
        token.email = p.email;
        token.image = p.picture;
        token.email_verified = Boolean((p as any).email_verified); // cast to boolean
        token.provider = 'google';
      }

      if (user?.provider === 'credentials') {
        token.id = user.id!;
        token.email = user.email!;
        token.role = user.role!;
        token.accessToken = user.accessToken!;
        token.provider = 'credentials';
      }

      return token;
    },

    async session({ session, token }) {
      // Assert token type to our JWT
      const t = token as {
        id: string;
        provider: 'credentials' | 'google';
        email?: string;
        role?: string;
        accessToken?: string;
        name?: string;
        image?: string;
        email_verified?: boolean;
      };

      if (!t.id || !t.provider) throw new Error('Invalid session token');

      if (t.provider === 'credentials') {
        session.user = {
          id: t.id,
          provider: t.provider,
          email: t.email!,
          role: t.role!,
          accessToken: t.accessToken!,
        };
      } else if (t.provider === 'google') {
        session.user = {
          id: t.id,
          provider: t.provider,
          name: t.name!,
          email: t.email!,
          image: t.image,
          email_verified: t.email_verified,
        };
      }

      return session;
    },
  },

  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: '/login' },
};
