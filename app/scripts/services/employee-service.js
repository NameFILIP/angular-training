'use strict';

angular.module('teamManagementApp')
  .factory('EmployeeService', ['$resource', function ($resource) {
    return $resource('http://localhost:9000/data/staff.json');
  }]);