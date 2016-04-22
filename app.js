var fs = require('fs');
var parse = require('xml-parser');
var inspect = require('util').inspect;

var User = require('./user');
var Organization = require('./organization');

//read xml file
var xml = fs.readFileSync('users.xml', 'utf8',
	function(err, data) {
    if (err) throw err;
    console.log(data);
  });

var obj = parse(xml);

//console.log(inspect(obj, { colors: true, depth: Infinity }));

  function createUser(obj) {
	  var values = obj.children;
	  var user = {};
	  for (var i = 0; i < values.length; i++) {
		  user[values[i].name] = values[i].content.trim();
	  }
	  return user;
  };

  function findOrg(array, name) {
  	
  	return null;
  }

	var users = obj.root.children;

  
	function createOrgsArray(users) {
		var companies = [];
		var user, org;

		for (var i = 0; i < users.length; i++) {
			user = createUser(users[i]);
	    org = null;
	    //search if org already exist
	    for (var j = 0; j < companies.length; j++) {
  			if (companies[j].name == user.company) {
  				org = companies[j];
  				break;
  			}
  		}
  		//orgs not exist yet - create new one
	    if (org == null) {
	    	org = new Organization(user.company)
	    	companies.push(org)
	    }

	    org.users.push(user);
		}

		return companies;
  }


console.log(inspect(createOrgsArray(users), {depth: Infinity}));

// function writeOrgFile(orgs) {
	
// 	fs.writeFile('organizations.txt', '', function (err) {
// 	  if (err) throw err;	});

// 	orgs.forEach(function(org){
		
// 	})
// }