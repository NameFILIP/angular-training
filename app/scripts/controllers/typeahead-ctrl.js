'use strict';

/**
 * @ngdoc function
 * @name teamManagementApp.controller:TypeaheadCtrl
 * @description
 * # TypeaheadCtrl
 * Controller of the teamManagementApp
 */
angular.module('teamManagementApp')
  .controller('TypeaheadCtrl', ['$scope', '$q', '$filter', function ($scope, $q, $filter) {
    
    $scope.$watch('selectedTeam', function () {
      $scope.tags = $scope.selectedTeam.employees && $scope.selectedTeam.employees.slice();
    });

    $scope.filterValues = function (query) {
        var deferred = $q.defer();
        var filtered = $filter('filter')($scope.employees, query);
        deferred.resolve(filtered);
        return deferred.promise;
    };

    $scope.refreshTeam = function () {
      $scope.selectedTeam.employees = $scope.tags.slice();
    };

  }]);
