export const groups = [
  {
    cuid: 'cld3p8xk10023qwgud5yq2dwe',
    name: 'Administrators',
    description: 'Can CRUD all records.',
    GroupRole: {
      create: {
        role: 'admin',
      },
    },
  },
]

export const properties = [
  {
    entity: 'email',
    type: 'string',
    value: 'inactive',
  },
  {
    entity: 'MAILGUN_DOMAIN',
    type: 'string',
    value: 'replaceMe',
  },
  {
    entity: 'MAILGUN_API_KEY',
    type: 'string',
    value: 'replaceMe',
  },
]
