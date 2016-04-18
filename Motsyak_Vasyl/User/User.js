function User (userObj) {
	this.id = userObj.id.join();
	this.name = userObj.name.join();
	this.company = userObj.company.join();
	this.gender = userObj.gender.join();
	this.age = userObj.age.join();
}

module.exports = User;