'use client'

import { useEffect, useState } from 'react'
import { user$ } from '@/store/auth.store'
import Footer from '@/components/footer/footer'
import { useSession } from 'next-auth/react'

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
			setIsLoading(false)
		}
	}, [status])

	return isLoading ? (
		<p>loading..</p>
	) : (
		<>
			<div>Sidebar</div>
			{children}
			<Footer />
		</>
	)
}
