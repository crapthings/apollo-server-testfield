import express from 'express'

import { apolloServer } from 'graphql-tools'

import _ from 'lodash'

import faker from 'faker'

import { userClass, postClass } from './data/index'

const server = express()

const schema = `

type User {
	username: String # 这个可以啪啪啪
	age: Int
	desc: String
	type: String
	posts: [Post]
}

type Post {
	title: String
	user: User
}

type RootQuery {
	user: User
	users: [User]
	posts: [Post]
}

schema {
	query: RootQuery
}

`

//

const resolvers = {
	RootQuery: {
		users () {
			return _.times(10, n => {
				return new userClass()
			})
		},
		user () {
			return new userClass()
		},

		posts () {
			return _.times(10, n => {
				return new postClass()
			})
		}
	},
	User: {
		posts () {
			return _.times(10, n => {
				return new userClass()
			})
		}
	},
	Post: {
		user () {
			return new userClass()
		}
	}
}

server.use('/graphql', apolloServer({
	graphiql: true,
	schema,
	resolvers
}))

server.listen(3000)
