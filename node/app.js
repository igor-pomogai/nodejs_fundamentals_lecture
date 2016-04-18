var User = require('./user/user').User;
var Organization = require('./organization/organization').Organization;
var fs = require('fs');
var parser = require('parser-xml');

parser.parseFile('user.xml', function (err, res) {
  if (err) { throw err; }

  writeFile(userBuilding(res));
});

function writeFile(arrObj) {
	  fs.writeFile('organization.txt','');

	  arrObj.forEach(function(elem, index) {
	  	fs.appendFile('organization.txt',
	  		elem.name +
	  		'[' + elem.users.join()+']\n');
	  });
}


function userBuilding(data) {

	var useru = [];
	data.users.user.forEach(function(elem) {
		var tmp = new User(elem);
		useru.push(tmp);
	});

	return orgBuilding(useru);
}

var tmpOrg = [];

function orgBuilding(arr) {
		var firstElem = new Organization(arr[0].company);
			firstElem.users.push(arr[0].name);
			tmpOrg.push(firstElem);

		for(var i = 1; i < arr.length; i++) {
			var index = nameEquality(arr[i].company);

			if (index) {
				tmpOrg[index].users.push(arr[i].name);

			} else {
				var orgArray = new Organization(arr[i].company);
				orgArray.users.push(arr[i].name);
				tmpOrg.push(orgArray);
			}
		}
		return tmpOrg;
}

function nameEquality(name) {
	var triger = false;
	tmpOrg.forEach(function(elem, index) {
		if (elem.name === name) {
			triger = index;
		}
	});
	return triger;
}
