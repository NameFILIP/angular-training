'use strict';

/**
 * @ngdoc overview
 * @name teamManagementApp
 * @description
 * # teamManagementApp
 *
 * Main module of the application.
 */
angular
  .module('teamManagementApp', [
    'ngResource',
    'ngRoute',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/typeahead', {
        templateUrl: 'views/typeahead.html',
        controller: 'TypeaheadCtrl'
      })
      .when('/table', {
        templateUrl: 'views/table.html',
        controller: 'TableCtrl'
      })
      .otherwise({
        redirectTo: '/typeahead'
      });
  });
