const menu = [
	// {
	// 	label: 'Administración',
	// 	children: [{ name: 'Moradores', href: '', roles: ['ADMIN'] }],
	// },
	{
		label: 'Seguridad',
		children: [
			{
				name: 'Seguimiento Visitas',
				href: '/console/tracking-visits',
				roles: ['SYS', 'ADMIN', 'SECURITY'],
			},
		],
	},
]

export default menu
