import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { login } from '@/services/auth.service'

const handler = NextAuth({
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials) {
				const { email, password } = credentials as {
					email: string
					password: string
				}

				if (!email || !password) {
					throw new Error('Please enter both email and password.')
				}

				const { data, error } = await login(email, password)

				if (error?.message) {
					throw new Error(error.message)
				} else if (!data?.user) {
					throw new Error('Invalid credentials')
				}

				return data.user
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }: { token: any; user: any }) {
			if (user) {
				token.user = user
			}
			return token
		},
		async session({ session, token }: { session: any; token: any }) {
			if (token?.user) {
				session.user = token.user
			}
			return session
		},
	},
	pages: {
		signIn: '/auth/login',
	},
})

export { handler as GET, handler as POST }
