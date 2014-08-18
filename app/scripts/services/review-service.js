'use strict';

angular.module('teamManagementApp')
  .service('ReviewService', function () {

    this.addReview = function (employee, author, review) {
      var rev = {
        author: author,
        review: review
      };
      if (!employee.reviews) {
        employee.reviews = [];
      }
      employee.reviews.push(rev);
    };

    this.removeReview = function (employee, review) {
      var reviewIndex = employee.reviews.indexOf(review);
      if (reviewIndex > -1) {
        employee.reviews.splice(reviewIndex, 1);
      }
    };
  });
