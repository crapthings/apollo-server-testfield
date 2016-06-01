export default class userClass {
	constructor (opt) {
		this.username = faker.name.findName()
		this.age = faker.random.number()
		this.desc = this.username + this.age
		opt && _.extend(this, opt)
	}
}
