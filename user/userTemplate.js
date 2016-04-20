"use strict";

var _ = require('lodash');

exports.User = function (id , name, org, sex, age) {
    this.id = _.trim(id);
    this.name = _.trim(name);
    this.company = _.trim(org);
    this.gender = _.trim(sex);
    this.age = _.trim(age);
};
//
// exports.User.prototype.getName = function () {
//     return this.name;
// };
//
// exports.User.prototype.getUserOrg = function() {
//     return this.company;
// };