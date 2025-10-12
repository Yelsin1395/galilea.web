'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import navLinks from './navLinks'
import { comparePathComplete } from '@/common/helpers'

export default function Navbar() {
	const [isActive, setIsActive] = useState(false)
	const pathName = usePathname()

	return (
		<nav className='navbar' role='navigation' aria-label='main navigation'>
			<div className='navbar-brand'>
				<a className='navbar-item' href='/'>
          <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="600" height="600" fill="white"/>

            <circle cx="280" cy="180" r="50" fill="#FFD700"/>
            <path d="M280 130L280 100M280 230L280 260M230 180L200 180M330 180L360 180M245 145L220 120M315 215L340 240M245 215L220 240M315 145L340 120" stroke="#FFD700" strokeWidth="8" strokeLinecap="round"/>

            <path d="M220 280L380 280L300 180L220 280Z" fill="#F4511E"/>
            <path d="M300 180L380 280L380 380L300 380L300 180Z" fill="#757575"/>
            <path d="M220 280L300 380L220 380L220 280Z" fill="#BDBDBD"/>

            <path d="M180 400C220 390 260 390 300 400C340 410 380 410 420 400" stroke="#8BC34A" strokeWidth="4" fill="none"/>
            <path d="M190 410C230 400 270 400 310 410C350 420 390 420 430 410" stroke="#8BC34A" strokeWidth="4" fill="none"/>

            <path d="M150 350C160 300 200 290 220 300C210 330 180 350 150 350Z" fill="#8BC34A"/>
            <path d="M450 350C440 300 400 290 380 300C390 330 420 350 450 350Z" fill="#8BC34A"/>

            <text x="300" y="100" fontFamily="Times New Roman, serif" fontSize="40" fill="black" textAnchor="middle" transform="rotate(-20 300 100)">Urbanización</text>
            <text x="300" y="100" fontFamily="Times New Roman, serif" fontSize="40" fill="black" textAnchor="middle" transform="rotate(20 300 100)">Vista Alegre</text>

            <text x="300" y="500" fontFamily="Times New Roman, serif" fontSize="30" fill="black" textAnchor="middle">José Leonardo Ortiz</text>
          </svg>
				</a>

				<a
					role='button'
					className={isActive ? 'navbar-burger is-active' : 'navbar-burger'}
					aria-label='menu'
					aria-expanded='false'
					data-target='navbarBasicExample'
					onClick={() => setIsActive(!isActive)}
				>
					<span aria-hidden='true'></span>
					<span aria-hidden='true'></span>
					<span aria-hidden='true'></span>
					<span aria-hidden='true'></span>
				</a>
			</div>

			<div id='navbarBasicExample' className={isActive ? 'navbar-menu is-active' : 'navbar-menu'}>
				<div className='navbar-start'>
					{navLinks.map((link) => {
						const isActive = comparePathComplete(pathName, link.href)

						return (
							<Link
								key={link.name}
								className={
									isActive
										? 'navbar-item has-background-danger-light has-text-weight-bold'
										: 'navbar-item'
								}
								href={link.href}
							>
								{link.name}
							</Link>
						)
					})}
				</div>

				<div className='navbar-end'>
					<div className='navbar-item'>
						<div className='buttons'>
							<Link className='button is-primary has-text-weight-bold' href='/auth/login'>
								Consola
							</Link>
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}
