function User (item) {
 	this.id = item.id.join();
 	this.name = item.name.join();
 	this.company = item.company.join();
 	this.gender = item.gender.join();
	this.age = item.age.join();
 }

 module.exports = {User: User};
