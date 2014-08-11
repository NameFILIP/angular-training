'use strict';

/**
 * @ngdoc function
 * @name teamManagementApp.controller:TableCtrl
 * @description
 * # TableCtrl
 * Controller of the teamManagementApp
 */
angular.module('teamManagementApp')
  .controller('TableCtrl', ['$scope', 'EmployeeService', function ($scope, EmployeeService) {
    EmployeeService.query(function (result) {
      $scope.employees = result;
    });
  }]);
