'use client'

import { useEffect, useState } from 'react'
import { user$ } from '@/store/auth.store'
import Footer from '@/components/footer/footer'
import { useSession } from 'next-auth/react'
import Sidebar from '@/components/sidebar/sidebar'
import { LoadingFullPage } from '@/components/loading/loading'

export default function ConsoleLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const [isLoading, setIsLoading] = useState(true)
	const { status, data } = useSession()

	useEffect(() => {
		if (status === 'loading') {
			setIsLoading(true)
		} else {
			if (status === 'authenticated') {
				if (data.user) {
					user$.next(data.user)
				}
			}
			setIsLoading(false)
		}
	}, [status, data])

	return isLoading ? (
		<LoadingFullPage />
	) : (
		<>
			<Sidebar />
			{children}
			<Footer />
		</>
	)
}
