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

    $scope.selectedTeam = $scope.teams.length > 0 ? $scope.teams[0].name : '';
    $scope.selectTeam = function (name) {
      // XXX if clicked on the selectected team - unselect it (collapsed)
      // TODO think about directive that checks if 'in' class is present
      $scope.selectedTeam = $scope.selectedTeam !== name ? name : '';
    };

    // if removing selected team - unselect it
    $scope.removeTeam = function (name) {
      if (name === $scope.selectedTeam) {
        $scope.selectedTeam = '';
      }
      TeamService.removeTeam(name);
    };
    $scope.addTeam = TeamService.addTeam;
    $scope.removeEmployee = TeamService.removeEmployee;
  }]);
