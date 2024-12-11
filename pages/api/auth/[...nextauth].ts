// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginUser } from '../../../src/app/services/loginService';


export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const user = await loginUser(credentials?.email || '', credentials?.password || '');
          if (user) {
            return user; // Return user object for session management
          }
          return null;
        } catch (error) {
          console.error('Error in login:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin', // Customize sign-in page if necessary
  },
  session: {
    strategy: 'jwt', // Use JWT strategy for session
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Save the JWT properties in the token
        token.id = user.id;
        token.name = user.name;
        token.accessToken = user.accessToken;
        token.role = user.role;
      }
      console.log("JWT Callback: ", token);
      return token;
    },
    async session({ session, token }) {
      // Add JWT data to the session object
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.accessToken = token.accessToken;
      session.user.role = token.role;
      console.log("Session Callback: ", session);
      return session;
    },
  },
});
