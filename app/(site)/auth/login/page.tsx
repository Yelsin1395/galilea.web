'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

export default function Login() {
	const [credentials, setCredentials] = useState({ email: '', password: '' })
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useRouter()

	const onChangeInput = (e: any) => {
		setCredentials({
			...credentials,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault()

		try {
			setIsLoading(true)
			const response = await signIn('credentials', {
				email: credentials.email,
				password: credentials.password,
				redirect: false,
			})

			if (response?.error) {
				toast.error(response.error)
			} else {
				navigate.push('/console')
			}
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<section className='section'>
			<section className='hero is-link'>
				<nav className='level'>
					<div className='level-left'>
						<div className='level-item'>
							<div className='hero-body'>
								<p className='title is-size-5-mobile'>Iniciar consola administrador</p>
								<p className='subtitle is-size-7-mobile'>
									Ingresa tu correo electrónico y contraseña para <br /> acceder a la consola de
									administrador.
								</p>
								<hr />
								<Link className='button is-info' href='/'>
									Ir a inicio
								</Link>
							</div>
						</div>
					</div>

					<div className='level-right'>
						<div className='level-item'>
							<div className='hero-body'>
								<form className='box' onSubmit={handleSubmit}>
									<div className='field'>
										<label className='label'>Correo electrónico</label>
										<div className='control'>
											<input
												className='input'
												name='email'
												type='email'
												placeholder='Ingresa tu correo'
												onChange={onChangeInput}
											/>
										</div>
									</div>

									<div className='field'>
										<label className='label'>Constraseña</label>
										<div className='control'>
											<input
												className='input'
												name='password'
												type='password'
												placeholder='Ingresa tu contraseña'
												onChange={onChangeInput}
											/>
										</div>
									</div>

									<button
										className={isLoading ? 'button is-primary is-loading' : 'button is-primary'}
										type='submit'
									>
										Ingrear
									</button>
								</form>
							</div>
						</div>
					</div>
				</nav>
			</section>
		</section>
	)
}
