import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { ToasterProvider } from '@/providers/toasterProvider'
import { NextAuthProvider } from '@/providers/NextAuthProvider'
import '@/scss/global.scss'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Vista Alegre',
	description: 'Unidos por el cambio',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={nunito.className}>
				<ToasterProvider />
				<NextAuthProvider>{children}</NextAuthProvider>
			</body>
		</html>
	)
}
