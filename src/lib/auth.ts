import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { NextAuthOptions } from 'next-auth';

// Note: Prisma adapter would be used in production
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma), // Uncomment for production
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    // Add Solana wallet adapter here in the future
  ],
  callbacks: {
    async session({ session, token, user }) {
      if (session.user) {
        session.user.id = token.sub || user.id;
        session.user.name = token.name || user.name;
        session.user.email = token.email || user.email;
        session.user.image = token.picture || user.image;
        
        // Add wallet address if connected
        if (user.walletAddress) {
          session.user.walletAddress = user.walletAddress;
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        if (user.walletAddress) {
          token.walletAddress = user.walletAddress;
        }
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user, account, profile }) {
      // Handle account linking logic
      console.log('Account linked:', account.provider, 'for user:', user.id);
    },
  },
};

export default NextAuth(authOptions);