'use strict';

/**
 * @ngdoc function
 * @name teamManagementApp.controller:TableCtrl
 * @description
 * # TableCtrl
 * Controller of the teamManagementApp
 */
angular.module('teamManagementApp')
  .controller('TableCtrl', ['$scope', '$filter', 'TeamService', function ($scope, $filter, TeamService) {

    $scope.addEmployee = TeamService.addEmployee;

    $scope.paginationState = {
      totalItems: $scope.employees.length,
      currentPage: 1,
      numPerPage: 10
    };
  }]);
