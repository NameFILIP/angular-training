'use strict';

  // Team
  // [{
  //   name: "Team one",
  //   employees: [1, 2, 3]
  // }]

angular.module('teamManagementApp')
  .service('TeamService', function () {

    // Initial data
    var teams = [{
      name: 'Java team',
      employees: [1, 2, 3]
    },
    {
      name: 'JavaScript team',
      employees: [4, 5, 6]
    },
    {
      name: 'QA team',
      employees: [7, 8, 9]
    }];


    this.addTeam = function (name) {
      if (!this.exists(name)) {
        var newTeam = {
          name: name,
          employees: []
        };
        teams.push(newTeam);
      }
      return true;
    };

    this.removeTeam = function (name) {
      for (var i = teams.length - 1; i >= 0; i--) {
        if (teams[i].name === name) {
          teams.splice(i, 1);
          // break if no duplication is allowed
          break;
        }
      }
    };

    this.getTeam = function (name) {
      for (var i = 0; i < teams.length; i++) {
        if (teams[i].name === name) {
          return teams[i];
        }
      }
      return null;
    };

    this.getTeams = function () {
      return teams;
    };

    this.setTeams = function (_teams) {
      teams = _teams;
    };

    this.addEmployee = function (name, employeeId) {
      var team = this.getTeam(name);
      if (team && team.employees.indexOf(employeeId) === -1) {
        team.employees.push(employeeId);
      }
    };

    this.removeEmployee = function (name, employeeId) {
      var team = this.getTeam(name);
      if (team) {
        var employeeIdIndex = team.employees.indexOf(employeeId);
        if (employeeIdIndex > -1) {
          team.employees.splice(employeeIdIndex, 1);
        }
      }
    };

    this.countEmployees = function (name) {
      var team = this.getTeam(name);
      return team ? team.employees.length : null;
    };

    this.exists = function (name) {
      return teams.filter(function (team) {
        return team.name === name;
      }).length > 0;
    };
  });
