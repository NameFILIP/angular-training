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
    'ui.bootstrap',
    'ui.router',
    'ngTagsInput'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to /typeahead
    $urlRouterProvider.otherwise('/typeahead');

    $stateProvider
      .state('team', {
        abstract: true,
        controller: 'TeamCtrl',
        templateUrl: 'views/team.html'
      })
      .state('team.table', {
        url: '/table',
        templateUrl: 'views/team.table.html',
        controller: 'TableCtrl'
      })
      .state('team.typeahead', {
        url: '/typeahead',
        templateUrl: 'views/team.typeahead.html',
        controller: 'TypeaheadCtrl'
      });
  })
  .run(function ($templateCache) {
    // Add employee-details="tag" directive
    $templateCache.put('ngTagsInput/tags-input.html',
      '<div class="host" tabindex="-1" ti-transclude-append=""><div class="tags" ng-class="{focused: hasFocus}"><ul class="tag-list"><li class="tag-item" employee-details="tag" ng-repeat="tag in tagList.items track by track(tag)" ng-class="{ selected: tag == tagList.selected }"><span>{{getDisplayText(tag)}}</span> <a class="remove-button" ng-click="tagList.remove($index)">{{options.removeTagSymbol}}</a></li></ul><input class="input" placeholder="{{options.placeholder}}" tabindex="{{options.tabindex}}" ng-model="newTag.text" ng-change="newTagChange()" ng-trim="false" ng-class="{\'invalid-tag\': newTag.invalid}" ti-autosize=""></div></div>'
    );
  });

$(function () {
  $('body').tooltip({
    selector: '[data-toggle="tooltip"]'
  });
});
