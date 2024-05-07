'use client'

import React from 'react'

interface ModalCardProps {
	children: React.ReactNode
	title: string
	isActive: boolean
	onClose: () => void
}

export default function ModalCard({ children, title, isActive = false, onClose }: ModalCardProps) {
	if (!isActive) {
		return null
	}

	return (
		<div className='modal is-active'>
			<div className='modal-background'></div>
			<div className='modal-card'>
				<header className='modal-card-head'>
					<p className='modal-card-title'>{title}</p>
					<button className='button is-danger has-text-white' onClick={onClose}>
						X
					</button>
				</header>
				<section className='modal-card-body'>{children}</section>
				<footer className='modal-card-foot'></footer>
			</div>
		</div>
	)
}
