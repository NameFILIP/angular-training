'use strict';

/**
 * @ngdoc function
 * @name teamManagementApp.controller:TableCtrl
 * @description
 * # TableCtrl
 * Controller of the teamManagementApp
 */
angular.module('teamManagementApp')
  .controller('TableCtrl', ['$scope', 'TeamService', 'ReviewService', function ($scope, TeamService, ReviewService) {

    $scope.addEmployee = TeamService.addEmployee;
    $scope.addReview = ReviewService.addReview;
    $scope.removeReview = ReviewService.removeReview;

    $scope.sortState = {
      column: 'name',
      reverse: false
    };
    $scope.setSortState = function (column) {
      if ($scope.sortState.column === column) {
        $scope.sortState.reverse = !$scope.sortState.reverse;
      } else {
        $scope.sortState.column = column;
        $scope.sortState.reverse = false;
      }
    };

    $scope.paginationState = {
      totalItems: $scope.employees.length,
      currentPage: 1,
      numPerPage: 10
    };

  }]);
