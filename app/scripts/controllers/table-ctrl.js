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

    $scope.totalItems = $scope.employees.length;
    $scope.currentPage = 1;
    $scope.numPerPage = 10;

    $scope.paginate = function(value) {
      var begin, end, index;
      begin = ($scope.currentPage - 1) * $scope.numPerPage;
      end = begin + $scope.numPerPage;
      index = $scope.employees.indexOf(value);
      return (begin <= index && index < end);
    };

  }]);
