'use strict';

angular.module('teamManagementApp')
  .filter('pagination', function() {
    return function(input, paginationState) {

      paginationState.totalItems = input.length;

      // reset current page to 1 if out of range
      if((paginationState.currentPage - 1) * paginationState.numPerPage > paginationState.totalItems) {
        paginationState.currentPage = 1;
      }

      var paginate = function(value) {
        var begin, end, index;
        begin = (paginationState.currentPage - 1) * paginationState.numPerPage;
        end = begin + paginationState.numPerPage;
        index = input.indexOf(value);
        return (begin <= index && index < end);
      }; 
      return input.filter(paginate);
    };
  });