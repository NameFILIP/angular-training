'use strict';

angular.module('teamManagementApp')
  .factory('EmployeeService', ['$resource', function ($resource) {
    return $resource('/data/staff.json');
  }]);