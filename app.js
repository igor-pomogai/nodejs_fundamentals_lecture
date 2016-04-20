// Module dependencies
var xml2js = require('xml2js');
var fs = require('fs');
var _ = require('lodash');
var users = require('./user/userTemplate');
var orgs = require('./org/orgTemplate');


var parser = new xml2js.Parser();
var LoadsOfUsers = [];
var LoadsOfOrgs = [];
//TODO: use sync fileread / parser and get the data logic out of the 'fs' function
fs.readFile(__dirname + '/users.xml', function (err, body) {

    parser.parseString(body, function (err, rawXMLdata) {
        var rawUserData = rawXMLdata.users.user;
        try {
            _.forOwn(rawUserData, function (value) {
                var temp = new users.User(value.id, value.name, value.company, value.gender, value.age);
                LoadsOfUsers.push(temp);
            });
            // console.log(LoadsOfUsers);
        }
        catch (e) {
            console.log(e);
        }

        try {
            _.forOwn(LoadsOfUsers, function (value) {
                var selectedOrg = _.findIndex(LoadsOfOrgs, org => org.name === value.company
                )
                ;
                if (-1 === selectedOrg) {
                    LoadsOfOrgs.push(new orgs.Org(value.company));
                    LoadsOfOrgs[LoadsOfOrgs.length - 1].workers.push(value);
                }
                else {
                    LoadsOfOrgs[selectedOrg].workers.push(value);
                }
            });
            // console.log(LoadsOfOrgs);
        }
        catch (e) {
            console.log(e);
        }

        try {
            var data = '';
            _.forOwn(LoadsOfOrgs, function (value) {
                data += ' <'+value.name+'> [';
                _.forOwn(value.workers, function (nestedVal) {
                    data += ' <'+nestedVal.name+'>,';
                });
                data = data.slice(0, -1); //remove that annoying last comma
                data += ' ]';
            });
            // console.log(data);
            fs.writeFile('organizations.txt', data);
        }
        catch (e) {
            console.log(e);
        }
    });
});