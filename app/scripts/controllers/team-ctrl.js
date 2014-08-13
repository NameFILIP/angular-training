'use strict';

/**
 * @ngdoc function
 * @name teamManagementApp.controller:TeamCtrl
 * @description
 * # TeamCtrl
 * Controller of the teamManagementApp
 */
angular.module('teamManagementApp')
  .controller('TeamCtrl', ['$scope', '$location', 'EmployeeService', 'TeamService', function ($scope, $location, EmployeeService, TeamService) {
    
    $scope.isActive = function(path) {
      return $location.path() === path;
    };

    EmployeeService.query(function (result) {
      $scope.employees = result;
    });

    $scope.teams = TeamService.getTeams();

    $scope.addTeam = function (name) {
      TeamService.addTeam(name);
    };

    $scope.removeTeam = function (name) {
      TeamService.removeTeam(name);
    };
  }]);
