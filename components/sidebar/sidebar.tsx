import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { user$ } from '@/store/auth.store'

export default function Sidebar() {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { id, email } = user$.getValue()

	const onSignOut = () => {
		setIsLoading(true)
		signOut()
	}

	return (
		<nav className='navbar'>
			<div className='navbar-start'>
				<div className='navbar-item'>{id}</div>
				<div className='navbar-item'>{email}</div>
			</div>

			<div className='navbar-end'>
				<div className='navbar-item'>
					<div className='buttons'>
						<button
							className={isLoading ? 'button is-link is-loading' : 'button is-link'}
							onClick={onSignOut}
						>
							<strong>Cerrar Sesión</strong>
						</button>
					</div>
				</div>
			</div>
		</nav>
	)
}
