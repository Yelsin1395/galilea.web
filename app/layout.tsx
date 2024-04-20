import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
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
			<body className={nunito.className}>{children}</body>
		</html>
	)
}
