'use strict';

angular.module('teamManagementApp')
  .directive('employeeDetails', function() {
    return {
      restrict: 'A',
      scope: {
        employee: '=employeeDetails'
      },
      link: {
        pre: function (scope, element) {
          element.attr('data-html', 'true');
          element.attr('data-placement', 'bottom');
          element.attr('data-toggle', 'tooltip');
          element.attr('title', 'Grade: ' +  scope.employee.grade + '<br>Job title: ' + scope.employee.job);
        }
      }
    };
  });