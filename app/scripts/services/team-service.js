'use strict';

  // Team
  // [{
  //   name: "Team one",
  //   employees: [1, 2, 3]
  // }]

angular.module('teamManagementApp')
  .service('TeamService', ['$resource', function () {

    this.teams = [];

    this.create = function (name) {
      if (!this.contains(name)) {
        var newTeam = {
          name: name,
          employees: []
        };
        this.teams.push(newTeam);
      }
    };

    this.remove = function (name) {
      for (var i = this.teams.length - 1; i >= 0; i--) {
        if (this.teams[i].name === name) {
          this.teams.splice(i, 1);
          // break if no duplication is allowed
          break;
        }
      }
    };

    this.get = function (name) {
      for (var i = 0; i < this.teams.length; i++) {
        if (this.teams[i].name === name) {
          return this.teams[i];
        }
      }
      return null;
    };

    // this.getAll = function () {

    // };

    this.addEmployee = function (name, employeeId) {
      var team = this.get(name);
      if (team && team.employees.indexOf(employeeId) === -1) {
        team.employees.push(employeeId);
      }
    };

    this.removeEmployee = function (name, employeeId) {
      var team = this.get(name);
      if (team) {
        var employeeIdIndex = team.employees.indexOf(employeeId);
        if (employeeIdIndex > -1) {
          team.employees.splice(employeeIdIndex, 1);
        }
      }
    };

    this.countEmployees = function (name) {
      var team = this.get(name);
      return team ? team.employees.length : null;
    };

    this.contains = function (name) {
      return this.teams.filter(function (team) {
        return team.name === name;
      }).length > 0;
    };

  }]);
