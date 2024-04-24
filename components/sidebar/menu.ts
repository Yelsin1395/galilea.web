const menu = [
	{
		label: 'Administración',
		children: [{ name: 'Moradores', href: '/console/inhabitants', roles: ['ADMIN'] }],
	},
	{
		label: 'Seguridad',
		children: [{ name: 'Visitas', href: '/console/visits', roles: ['ADMIN', 'VIGILANT'] }],
	},
]

export default menu
