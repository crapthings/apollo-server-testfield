import _ from 'lodash'

import faker from 'faker'

export class post {
	constructor (opt) {
		this.title = faker.lorem.sentence()
	}
}