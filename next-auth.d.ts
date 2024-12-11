// src/app/utils/next-auth.d.ts
import { Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

// Extend the default NextAuth types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      accessToken: string;
      role: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    accessToken: string;
    role: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    name: string;
    email: string;
    accessToken: string;
    role: string;
  }
}
