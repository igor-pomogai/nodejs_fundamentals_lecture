"use strict";

exports.Org = function (nameIn) {
    this.name = nameIn;
    this.workers = [];
};
// exports.Org.prototype.getOrgName = function() {
//     return this.name;
// };
//
// exports.Org.prototype.setWorkers = function (workersIn) {
//     var that = this.workers;
//     _.forEach(workersIn, function (value) {
//         that.push(value);
//     })
// };