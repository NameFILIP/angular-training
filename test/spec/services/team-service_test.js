'use strict';

describe('TeamService', function () {

  var TeamService;

  beforeEach(function () {
    module('teamManagementApp');

    inject(function (_TeamService_) {
      TeamService = _TeamService_;
    });

    // initialize teams with test data
    TeamService.teams = [{
      name: "Java team",
      employees: [1, 2, 3]
    },
    {
      name: "JavaScript team",
      employees: [4, 5, 6]
    },
    {
      name: "QA team",
      employees: [7, 8, 9]
    }];;
  });

  describe('contains', function () {
    it('should return true if teams array contains a team with the given name', function () {
      expect(TeamService.contains("Java team")).toBe(true);
      expect(TeamService.contains("Some other team")).toBe(false);
    });
  });

  
  describe('create', function () {
    it('should add a new team', function () {
      TeamService.create("Android team");
      expect(TeamService.teams.length).toBe(4);
      expect(TeamService.teams[3].name).toEqual("Android team");
      expect(TeamService.teams[3].employees).toEqual([]);
    });
  });

  describe('remove', function () {
    it('should remove a team by name', function () {
      TeamService.remove("QA team");
      expect(TeamService.teams.length).toBe(2);
      expect(TeamService.contains("QA team")).toBeFalsy();
    });
  });

  describe('get', function () {
    it('should get a team by name', function () {
      var jsTeam = TeamService.get("JavaScript team");
      expect(jsTeam.employees.length).toBe(3);
      expect(jsTeam.employees).toEqual([4, 5, 6]);
    });

    it('should get null if the team is not found', function () {
      var someOtherTeam = TeamService.get("Some other team");
      expect(someOtherTeam).toBeNull();
    });
  });

  describe('addEmployee', function () {
    it('should add employee\'s id to the team if it is not present already', function () {
      TeamService.addEmployee("JavaScript team", 2);
      var jsTeam = TeamService.get("JavaScript team");
      expect(jsTeam.employees.length).toBe(4);
      expect(jsTeam.employees).toContain(2);
    });

    it('should not add employee\'s id to the team if it is already there', function () {
      TeamService.addEmployee("JavaScript team", 5);
      var jsTeam = TeamService.get("JavaScript team");
      expect(jsTeam.employees.length).toBe(3);
    });
  });

  describe('removeEmployee', function () {
    it('should remove employee\'s id from the team', function () {
      TeamService.removeEmployee("QA team", 8);
      var qaTeam = TeamService.get("QA team");
      expect(qaTeam.employees.length).toBe(2);
      expect(qaTeam.employees).not.toContain(8);
    });
  });

  describe('countEmployees', function () {
    it('should count employees in a team', function () {
      var jsEmployeesSize = TeamService.countEmployees("JavaScript team");
      expect(jsEmployeesSize).toBe(3);

      TeamService.addEmployee("JavaScript team", 10);

      jsEmployeesSize = TeamService.countEmployees("JavaScript team");
      expect(jsEmployeesSize).toBe(4);
    });

    it('should return null if there is no such team', function () {
      var otherEmployeesSize = TeamService.countEmployees("Some other team");
      expect(otherEmployeesSize).toBeNull();
    });
  });

});