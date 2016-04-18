// ------------NODE MODULES------------
var fs = require("fs");
var inspect = require("util").inspect;
// -----------NPM MODULES--------------
var parse  = require('xml-parser');
// -----------CUSTOM MODULES-----------
var User = require("./user/user");
var Organization = require("./organization/organization");




var xml = fs.readFileSync('users.xml', 'utf8');


var arrOrg = [];
var arrUsers =[];


var obj = parse(xml); // Parsing  xml file

// Pushing our users to array
for(var i = 0;i<obj.root.children.length;i++){
    var temp = new User(
        obj.root.children[i].children[0].content,
        obj.root.children[i].children[1].content,
        obj.root.children[i].children[2].content,
        obj.root.children[i].children[3].content,
        obj.root.children[i].children[4].content
    )
    arrUsers.push(temp);
}

//------- function to compare user company and organization name
function bull(user) {
     var org = false;
     arrOrg.forEach(function(item, i){
         if(user.company === item.Organization){
            org = i +1;
         }
    })
    return org;
}

//------- function to pushing users to each organizations and creating new organization if it doesn't exist
arrUsers.forEach(function(item){
    if(bull(item)){
        arrOrg[bull(item)-1].users.push(item.name);
    }
    else{
        var org = new Organization(item.company);
        org.users.push(item.name);
        arrOrg.push(org);
    }
})

//----- Write organizations and their members
arrOrg.forEach(function(item){
    fs.appendFileSync('organizations.txt', item.Organization + ": [" + item.users + "]" + "\n");
})
