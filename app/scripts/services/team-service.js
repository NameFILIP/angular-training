'use strict';

angular.module('teamManagementApp')
  .service('TeamService', function () {

    var teams = [];

    // Helper functions

    var exists = function (name) {
      return teams.filter(function (team) {
        return team.name === name;
      }).length > 0;
    };

    var getTeam = function (name) {
      for (var i = 0; i < teams.length; i++) {
        if (teams[i].name === name) {
          return teams[i];
        }
      }
      return null;
    };

    // Service's functions

    this.getTeam = getTeam;

    this.exists = exists;

    this.addTeam = function (name) {
      if (!exists(name)) {
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

    this.getTeams = function () {
      return teams;
    };

    this.setTeams = function (_teams) {
      teams = _teams;
    };

    this.addEmployee = function (name, employee) {
      var team = getTeam(name);    
      // if (team && team.employees.indexOf(employee) === -1) {
      //   team.employees.push(employee);
      // }
      if (team && team.employees.filter(function (emp) {
          return emp.id === employee.id;
        }).length === 0) {
        team.employees.push(employee);
      }
    };

    this.removeEmployee = function (name, employee) {
      var team = getTeam(name);
      if (team) {
        // No need for id check, since the passed object is taken from the array
        var employeeIndex = team.employees.indexOf(employee);
        if (employeeIndex > -1) {
          team.employees.splice(employeeIndex, 1);
        }
      }
    };
  });
