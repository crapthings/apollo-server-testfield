import { makeExecutableSchema } from 'graphql-tools'

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`

const RootQuery = `
  type RootQuery {
    User: User
  }
`
