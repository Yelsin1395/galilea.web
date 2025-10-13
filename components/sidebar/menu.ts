const menu = [
  {
    label: 'Moradores',
    enabled: true,
    children: [
      {
        name: 'Propietarios',
        href: '/console/owner',
        roles: ['SYS', 'ADMIN']
      }
    ],
  },
  {
    label: 'Seguridad',
    enabled: true,
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
