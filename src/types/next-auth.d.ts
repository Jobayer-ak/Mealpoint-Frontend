import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string; // backend ID or Google sub
      provider: 'credentials' | 'google';
      role?: string; // only for credentials
      accessToken?: string; // backend JWT
      name?: string; // only for Google
      email_verified?: boolean; // only for Google
      image?: string; // only for Google
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    id: string;
    provider: 'credentials' | 'google';
    role?: string; // only credentials
    accessToken?: string; // backend JWT
    name?: string; // only Google
    email_verified?: boolean; // only Google
    image?: string; // only Google
  }

  interface Profile {
    sub?: string; // Google user ID
    name?: string;
    email?: string;
    picture?: string;
    email_verified?: boolean;
  }

  interface JWT {
    id: string;
    provider: 'credentials' | 'google';
    role?: string;
    accessToken?: string;
    name?: string;
    email?: string;
    image?: string;
    email_verified?: boolean;
  }
}
