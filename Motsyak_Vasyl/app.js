var fs = require('fs');
var parseString = require('xml2js').parseString;
var User = require('./User/User');
var Organization = require('./Organization/Organization');
var fileXML = fs.readFileSync('users.xml', 'utf8');
var fileOut = new fs.WriteStream('organizations.txt');


parseString(fileXML, function (err, result) {
	var orgs = [];
	var users = result.users.user;
	for (var i = 0; i < users.length; i++) {
		var newUser = new User(users[i]);
		findOrganization(newUser,orgs);
	}
	for(var i=0; i < orgs.length; i ++) {
		var usersNameArray = orgs[i].users.map(function(user) {
			return user.name;
		})
		fileOut.write(orgs[i].name + ': ' + usersNameArray + '\n');
	}
	fileOut.end();
});


function findOrganization(user, orgs) {
	for (var i = 0 ; i < orgs.length; i++) {
		if (orgs[i].name == user.company) {
			orgs[i].users.push(user);
			return;
		} 
	}
	var newOrg = new Organization(user.company);
	newOrg.users.push(user);
	orgs.push(newOrg);
}
