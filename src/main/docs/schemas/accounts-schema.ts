export const accountsSchema = {
  type: 'array',
  items: {
    schema: {
      $ref: '#/schemas/account'
    }
  }
}
