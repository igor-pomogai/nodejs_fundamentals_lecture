var User = require('./user/user').User;
var Org = require('./organization/organization').Org;
var fs = require('fs');
var parse = require('xml-parser');

function objectNormalization (obj) {
	result = [];
	var tempUser = {};
	obj.root.children.forEach(function(item, i) {
		item.children.forEach(function(itemIn) {
			tempUser[itemIn.name] = itemIn.content;
		});
		result[i] = new User(tempUser);
	});
	return result;
}

function retrivingOrgs (users) {
	var orgs = [];
	users.forEach(function(user) {
		if (checkOrg(user, orgs)) {
			orgs[checkOrg(user, orgs)-1].users.push(user);
		} else {
			org = new Org(user.company);
			org.users.push(user);
			orgs.push(org);
		}
	});
	return orgs;
}

function checkOrg (user, orgs) {
	var result = false;
	orgs.forEach(function(org, i) {
		if (org.name.toLowerCase() === user.company.toLowerCase()) {
			result = i+1;
		}
	});
	return result;
}

function exportOrgsTxt (orgs) {
	fs.writeFile('organizations.txt', '');

	orgs.forEach(function(org) {
		fs.appendFileSync('organizations.txt', org.name + ' [');
		org.users.forEach(function(user, i) {
			fs.appendFileSync('organizations.txt', user.name);
			if (i + 1 < org.users.length) {
				fs.appendFileSync('organizations.txt', ', ');}
		});
		fs.appendFileSync('organizations.txt', ']\n');		
	});
}

var users = objectNormalization(parse(fs.readFileSync('users.xml', 'utf8')));
var orgs = retrivingOrgs(users);
exportOrgsTxt(orgs);