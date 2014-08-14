'use strict';

angular.module('teamManagementApp')
  .service('TeamService', function () {

    // Initial data

    var maria = { 
      id: 2,
      name: 'Maria Sadykov',
      age: 22,
      grade: 'Junior',
      job: 'Java Developer',
    };
    var maxim = { 
      id: 3,
      name: 'Maxim Basisty',
      age: 24,
      grade: 'Junior',
      job: 'QA Engineer'
    };
    var alena = { 
      id: 4,
      name: 'Alena Reshetov',
      age: 26,
      grade: 'Senior',
      job: 'NET Developer'
    };
    var julia = { 
      id: 14,
      name: 'Julia Kupkin',
      age: 21,
      grade: 'Junior',
      job: 'NET Developer',
    };
    var anton = { 
      id: 17,
      name: 'Anton Loginov',
      age: 27,
      grade: 'Middle',
      job: 'Java Developer'
    };
    var teams = [{
      name: 'Java team',
      employees: [maria, maxim, alena]
    },
    {
      name: 'JavaScript team',
      employees: [maria, alena, anton]
    },
    {
      name: 'QA team',
      employees: [julia, alena, maxim]
    }];

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

    // this.countEmployees = function (name) {
    //   var team = getTeam(name);
    //   return team ? team.employees.length : null;
    // };
    
  });
