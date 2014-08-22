"use strict";angular.module("teamManagementApp",["ngResource","ui.bootstrap","ui.router","ngTagsInput"]).config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/typeahead"),a.state("team",{"abstract":!0,controller:"TeamCtrl",templateUrl:"views/team.html"}).state("team.table",{url:"/table",templateUrl:"views/team.table.html",controller:"TableCtrl"}).state("team.typeahead",{url:"/typeahead",templateUrl:"views/team.typeahead.html",controller:"TypeaheadCtrl"})}]).run(["$templateCache",function(a){a.put("ngTagsInput/tags-input.html",'<div class="host" tabindex="-1" ti-transclude-append=""><div class="tags" ng-class="{focused: hasFocus}"><ul class="tag-list"><li class="tag-item" employee-details="tag" ng-repeat="tag in tagList.items track by track(tag)" ng-class="{ selected: tag == tagList.selected }"><span>{{getDisplayText(tag)}}</span> <a class="remove-button" ng-click="tagList.remove($index)">{{options.removeTagSymbol}}</a></li></ul><input class="input" placeholder="{{options.placeholder}}" tabindex="{{options.tabindex}}" ng-model="newTag.text" ng-change="newTagChange()" ng-trim="false" ng-class="{\'invalid-tag\': newTag.invalid}" ti-autosize=""></div></div>')}]),$(function(){$("body").tooltip({selector:'[data-toggle="tooltip"]'})}),angular.module("teamManagementApp").controller("TeamCtrl",["$scope","$location","$resource","EmployeeService","TeamService",function(a,b,c,d,e){a.teams=[],c("/data/teams.json").query(function(b){e.setTeams(b),a.teams=e.getTeams()}),d.query(function(b){a.employees=b}),a.isActive=function(a){return b.path()===a},a.selectedTeam={},a.selectTeam=function(b){a.selectedTeam=a.selectedTeam!==b?b:{}},a.removeTeam=function(b){b===a.selectedTeam&&(a.selectedTeam={}),e.removeTeam(b.name)},a.isSelected=function(b){return b===a.selectedTeam},a.addTeam=e.addTeam,a.removeEmployee=e.removeEmployee}]),angular.module("teamManagementApp").controller("TypeaheadCtrl",["$scope","$q","$filter",function(a,b,c){a.$watch("selectedTeam",function(){a.tags=a.selectedTeam.employees&&a.selectedTeam.employees.slice()}),a.filterValues=function(d){var e=b.defer(),f=c("filter")(a.employees,d);return e.resolve(f),e.promise},a.refreshTeam=function(){a.selectedTeam.employees=a.tags.slice()}}]),angular.module("teamManagementApp").controller("TableCtrl",["$scope","TeamService","ReviewService",function(a,b,c){a.addEmployee=b.addEmployee,a.addReview=c.addReview,a.removeReview=c.removeReview,a.sortState={column:"name",reverse:!1},a.setSortState=function(b){a.sortState.column===b?a.sortState.reverse=!a.sortState.reverse:(a.sortState.column=b,a.sortState.reverse=!1)},a.paginationState={totalItems:a.employees&&a.employees.length,currentPage:1,numPerPage:10}}]),angular.module("teamManagementApp").directive("employeeDetails",function(){return{restrict:"A",scope:{employee:"=employeeDetails"},link:{pre:function(a,b){b.attr("data-delay","250"),b.attr("data-html","true"),b.attr("data-placement","bottom"),b.attr("data-toggle","tooltip"),b.attr("title","Grade: "+a.employee.grade+"<br>Job title: "+a.employee.job)}}}}),angular.module("teamManagementApp").filter("pagination",function(){return function(a,b){if(a){b.totalItems=a.length,(b.currentPage-1)*b.numPerPage>b.totalItems&&(b.currentPage=1);var c=function(c){var d,e,f;return d=(b.currentPage-1)*b.numPerPage,e=d+b.numPerPage,f=a.indexOf(c),f>=d&&e>f};return a.filter(c)}}}),angular.module("teamManagementApp").factory("EmployeeService",["$resource",function(a){return a("/data/staff.json")}]),angular.module("teamManagementApp").service("TeamService",function(){var a=[],b=function(b){return a.filter(function(a){return a.name===b}).length>0},c=function(b){for(var c=0;c<a.length;c++)if(a[c].name===b)return a[c];return null};this.getTeam=c,this.exists=b,this.addTeam=function(c){if(!b(c)){var d={name:c,employees:[]};a.push(d)}return!0},this.removeTeam=function(b){for(var c=a.length-1;c>=0;c--)if(a[c].name===b){a.splice(c,1);break}},this.getTeams=function(){return a},this.setTeams=function(b){a=b},this.addEmployee=function(a,b){var d=c(a);d&&0===d.employees.filter(function(a){return a.id===b.id}).length&&d.employees.push(b)},this.removeEmployee=function(a,b){var d=c(a);if(d){var e=d.employees.indexOf(b);e>-1&&d.employees.splice(e,1)}}}),angular.module("teamManagementApp").service("ReviewService",function(){this.addReview=function(a,b,c){var d={author:b,review:c};a.reviews||(a.reviews=[]),a.reviews.push(d)},this.removeReview=function(a,b){var c=a.reviews.indexOf(b);c>-1&&a.reviews.splice(c,1)}});