import express from 'express'

import { apolloServer } from 'graphql-tools'

const server = express()

const schema = `

type RootQuery {
	lala: String
}

schema {
	query: RootQuery
}

`

const resolvers = {
	RootQuery: {
		lala () {
			return 'haha'
		}
	}
}

server.use('/graphql', apolloServer({
	graphiql: true,
	schema,
	resolvers
}))

server.listen(3000)
