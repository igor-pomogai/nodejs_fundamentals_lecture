function User (item) {
	this.id = item.id;
	this.name = item.name;
	this.company = item.company;
	this.gender = item.gender;
	this.age = item.age;
}

module.exports = {User: User};