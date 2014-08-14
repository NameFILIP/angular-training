'use strict';

/**
 * @ngdoc function
 * @name teamManagementApp.controller:TableCtrl
 * @description
 * # TableCtrl
 * Controller of the teamManagementApp
 */
angular.module('teamManagementApp')
  .controller('TableCtrl', ['$scope', 'TeamService', function ($scope, TeamService) {

    $scope.addEmployee = TeamService.addEmployee;

  }]);
