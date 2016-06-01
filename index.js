import express from 'express'

import { apolloServer } from 'graphql-tools'

import _ from 'lodash'

import faker from 'faker'

const server = express()

//

class authorClass {
	constructor (opt) {
		this.id = opt && opt.id || faker.random.uuid()
		this.name = faker.name.findName()
		this.age = faker.random.number()
		this.desc = faker.lorem.sentences()

		this.books = _.times(10, n => {
			return new bookClass({
				id: n + 1,
				authorId: this.id
			})
		})

		opt && _.extend(this, opt)
	}
}

class bookClass {
	constructor (opt) {
		this.id = opt && opt.id || faker.random.uuid()
		this.title = faker.lorem.sentence()
		this.desc = faker.lorem.sentences()
		opt && _.extend(this, opt)
	}
}

const authors = _.times(10, n => {
	return new authorClass({
		id: n + 1
	})
})

const books = _.chain(authors)
	.map(author => { return author.books })
	.flatten()
	.value()

//

const schema = `

schema {
	query: Query
}

type Query {
	authors: [Author]
	author(id: Int, name: String): Author
	randomAuthor: Author
	books: [Book]
}

type Author {
	id: Int
	name: String
	age: Int
	desc: String
	books: [Book]
}

type Book {
	id: Int
	title: String
	authorId: Int
	author: Author
}

`

//

const resolvers = {
	Query: {

		__description: 'haha',
		authors () {
			return authors
		},

		author (root, args) {
			return _.find(authors, args)
		},

		books () {
			return books
		},

		randomAuthor () {
			return _.sample(authors)
		}
	},

	Author: {
		books (author, args) {
			return _.filter(books, book => {
				return author.id == book.authorId
			})
		}
	},

	Book: {
		author (book, args) {
			return _.find(authors, author => {
				return book.authorId == author.id
			})
		}
	}
}

server.use('/graphql', apolloServer({
	graphiql: true,
	pretty: true,
	schema,
	resolvers
}))

server.listen(4000)
