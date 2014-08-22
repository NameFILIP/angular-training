"use strict";angular.module("teamManagementApp",["ngResource","ngRoute","ui.bootstrap","ngTagsInput"]).config(["$routeProvider",function(a){a.when("/typeahead",{templateUrl:"views/typeahead.html",controller:"TypeaheadCtrl"}).when("/table",{templateUrl:"views/table.html",controller:"TableCtrl"}).otherwise({redirectTo:"/typeahead"})}]).run(["$templateCache",function(a){a.put("ngTagsInput/tags-input.html",'<div class="host" tabindex="-1" ti-transclude-append=""><div class="tags" ng-class="{focused: hasFocus}"><ul class="tag-list"><li class="tag-item" employee-details="tag" ng-repeat="tag in tagList.items track by track(tag)" ng-class="{ selected: tag == tagList.selected }"><span>{{getDisplayText(tag)}}</span> <a class="remove-button" ng-click="tagList.remove($index)">{{options.removeTagSymbol}}</a></li></ul><input class="input" placeholder="{{options.placeholder}}" tabindex="{{options.tabindex}}" ng-model="newTag.text" ng-change="newTagChange()" ng-trim="false" ng-class="{\'invalid-tag\': newTag.invalid}" ti-autosize=""></div></div>')}]),$(function(){$("body").tooltip({selector:'[data-toggle="tooltip"]'})}),angular.module("teamManagementApp").controller("TeamCtrl",["$scope","$location","EmployeeService","TeamService",function(a,b,c,d){a.isActive=function(a){return b.path()===a},c.query(function(b){a.employees=b}),a.teams=d.getTeams(),a.selectedTeam="",a.selectTeam=function(b){a.selectedTeam=a.selectedTeam!==b?b:""},a.removeTeam=function(b){b===a.selectedTeam&&(a.selectedTeam=""),d.removeTeam(b.name)},a.isSelected=function(b){return b===a.selectedTeam},a.addTeam=d.addTeam,a.removeEmployee=d.removeEmployee}]),angular.module("teamManagementApp").controller("TypeaheadCtrl",["$scope","$q","$filter",function(a,b,c){a.$watch("selectedTeam",function(){a.tags=a.selectedTeam&&a.selectedTeam.employees.slice()}),a.filterValues=function(d){var e=b.defer(),f=c("filter")(a.employees,d);return e.resolve(f),e.promise},a.refreshTeam=function(){a.selectedTeam.employees=a.tags.slice()}}]),angular.module("teamManagementApp").controller("TableCtrl",["$scope","TeamService","ReviewService",function(a,b,c){a.addEmployee=b.addEmployee,a.addReview=c.addReview,a.removeReview=c.removeReview,a.sortState={column:"name",reverse:!1},a.setSortState=function(b){a.sortState.column===b?a.sortState.reverse=!a.sortState.reverse:(a.sortState.column=b,a.sortState.reverse=!1)},a.paginationState={totalItems:a.employees.length,currentPage:1,numPerPage:10}}]),angular.module("teamManagementApp").directive("employeeDetails",function(){return{restrict:"A",scope:{employee:"=employeeDetails"},link:{pre:function(a,b){b.attr("data-delay","250"),b.attr("data-html","true"),b.attr("data-placement","bottom"),b.attr("data-toggle","tooltip"),b.attr("title","Grade: "+a.employee.grade+"<br>Job title: "+a.employee.job)}}}}),angular.module("teamManagementApp").filter("pagination",function(){return function(a,b){b.totalItems=a.length,(b.currentPage-1)*b.numPerPage>b.totalItems&&(b.currentPage=1);var c=function(c){var d,e,f;return d=(b.currentPage-1)*b.numPerPage,e=d+b.numPerPage,f=a.indexOf(c),f>=d&&e>f};return a.filter(c)}}),angular.module("teamManagementApp").factory("EmployeeService",["$resource",function(a){return a("/data/staff.json")}]),angular.module("teamManagementApp").service("TeamService",function(){var a={id:2,name:"Maria Sadykov",age:22,grade:"Junior",job:"Java Developer"},b={id:3,name:"Maxim Basisty",age:24,grade:"Junior",job:"QA Engineer"},c={id:4,name:"Alena Reshetov",age:26,grade:"Senior",job:"NET Developer"},d={id:14,name:"Julia Kupkin",age:21,grade:"Junior",job:"NET Developer"},e={id:17,name:"Anton Loginov",age:27,grade:"Middle",job:"Java Developer"},f=[{name:"Java team",employees:[a,b,c]},{name:"JavaScript team",employees:[a,c,e]},{name:"QA team",employees:[d,c,b]}],g=function(a){return f.filter(function(b){return b.name===a}).length>0},h=function(a){for(var b=0;b<f.length;b++)if(f[b].name===a)return f[b];return null};this.getTeam=h,this.exists=g,this.addTeam=function(a){if(!g(a)){var b={name:a,employees:[]};f.push(b)}return!0},this.removeTeam=function(a){for(var b=f.length-1;b>=0;b--)if(f[b].name===a){f.splice(b,1);break}},this.getTeams=function(){return f},this.setTeams=function(a){f=a},this.addEmployee=function(a,b){var c=h(a);c&&0===c.employees.filter(function(a){return a.id===b.id}).length&&c.employees.push(b)},this.removeEmployee=function(a,b){var c=h(a);if(c){var d=c.employees.indexOf(b);d>-1&&c.employees.splice(d,1)}}}),angular.module("teamManagementApp").service("ReviewService",function(){this.addReview=function(a,b,c){var d={author:b,review:c};a.reviews||(a.reviews=[]),a.reviews.push(d)},this.removeReview=function(a,b){var c=a.reviews.indexOf(b);c>-1&&a.reviews.splice(c,1)}});