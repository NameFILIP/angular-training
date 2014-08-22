'use strict';

/**
 * @ngdoc function
 * @name teamManagementApp.controller:TeamCtrl
 * @description
 * # TeamCtrl
 * Controller of the teamManagementApp
 */
angular.module('teamManagementApp')
  .controller('TeamCtrl', ['$scope', '$location', '$resource', 'EmployeeService', 'TeamService', function ($scope, $location, $resource, EmployeeService, TeamService) {
    
    $scope.teams = [];

    // Load initial test data
    $resource('/data/teams.json').query(function (result) {
      TeamService.setTeams(result);
      $scope.teams = TeamService.getTeams();
    });

    EmployeeService.query(function (result) {
      $scope.employees = result;
    });

    $scope.isActive = function(path) {
      return $location.path() === path;
    };

    $scope.selectedTeam = {};
    $scope.selectTeam = function (team) {
      // XXX if clicked on the selectected team - unselect it (collapsed)
      // TODO think about directive that checks if 'in' class is present
      $scope.selectedTeam = $scope.selectedTeam !== team ? team : {};
    };

    // if removing selected team - unselect it
    $scope.removeTeam = function (team) {
      if (team === $scope.selectedTeam) {
        $scope.selectedTeam = {};
      }
      TeamService.removeTeam(team.name);
    };

    $scope.isSelected = function (team) {
      return team === $scope.selectedTeam;
    };

    $scope.addTeam = TeamService.addTeam;
    $scope.removeEmployee = TeamService.removeEmployee;
  }]);
