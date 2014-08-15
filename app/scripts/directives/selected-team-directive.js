'use strict';

angular.module('teamManagementApp')
  .directive('selectedTeam', function() {
    return function(scope, element) {
        scope.clazz = element.attr('class');
        scope.$watch(function() {
          return element.attr('class').indexOf('in') > -1; 
        }, function(newValue){
          console.log(element[0].id + ' : ' + newValue);
        });
      };

  });