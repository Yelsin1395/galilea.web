const menu = [
	{
		label: 'Administración',
		children: [{ name: 'Moradores', href: '', roles: ['ADMIN'] }],
	},
	{
		label: 'Seguridad',
		children: [
			{
				name: 'Seguimiento Visitas',
				href: '/console/tracking-visits',
				roles: ['ADMIN', 'VIGILANT'],
			},
		],
	},
]

export default menu
