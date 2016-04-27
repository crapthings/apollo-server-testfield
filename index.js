import express from 'express'

import { apolloServer } from 'graphql-tools'

import _ from 'lodash'

import faker from 'faker'

const server = express()

//

class user {
	constructor (opt) {
		this.username = faker.name.findName()
		this.age = faker.random.number()
		this.desc = this.username + this.age
		opt && _.extend(this, opt)
	}
}

class post {
	constructor (opt) {
		this.title = faker.lorem.sentence()
	}
}

//

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
				return new user()
			})
		},
		user () {
			return new user()
		},

		posts () {
			return _.times(10, n => {
				return new post()
			})
		}
	},
	User: {
		posts () {
			return _.times(10, n => {
				return new post()
			})
		}
	},
	Post: {
		user () {
			return new user()
		}
	}
}

server.use('/graphql', apolloServer({
	graphiql: true,
	schema,
	resolvers
}))

server.listen(3000)
