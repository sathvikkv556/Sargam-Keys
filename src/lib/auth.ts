import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('Auth attempt for:', credentials?.email);
        
        if (!credentials?.email || !credentials?.password) {
          console.error('Missing credentials');
          throw new Error('Please enter an email and password');
        }

        try {
          await connectDB();
          console.log('Connected to DB for auth');

          const user = await User.findOne({ email: credentials.email }).select('+password');

          if (!user) {
            console.error('User not found:', credentials.email);
            throw new Error('No user found with this email');
          }

          console.log('User found, checking password...');
          const isPasswordCorrect = await user.comparePassword(credentials.password);

          if (!isPasswordCorrect) {
            console.error('Invalid password for:', credentials.email);
            throw new Error('Invalid password');
          }

          console.log('Login successful:', credentials.email);
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image,
          };
        } catch (error: any) {
          console.error('Auth error:', error.message);
          throw new Error(error.message || 'Authentication failed');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'emergency-secret-key-123',
};
