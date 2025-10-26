export const accountSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'Internal account identifier'
    },
    iban: {
      type: 'string',
      description: 'International Bank Account Number'
    },
    name: {
      type: 'string',
      description: 'Account name or description'
    }
  },
  required: ['id', 'iban', 'name']
};

export const accountsListSchema = {
  type: 'array',
  items: accountSchema,
  description: 'List of bank accounts'
};