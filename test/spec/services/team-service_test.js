'use strict';

describe('TeamService', function () {

  var TeamService;

  beforeEach(function () {
    module('teamManagementApp');

    inject(function (_TeamService_) {
      TeamService = _TeamService_;
    });

    // initialize teams with test data
    TeamService.setTeams([{
      name: 'Java team',
      employees: [1, 2, 3]
    },
    {
      name: 'JavaScript team',
      employees: [4, 5, 6]
    },
    {
      name: 'QA team',
      employees: [7, 8, 9]
    }]);
  });

  describe('exists', function () {
    it('should return true if a team with the given name exists', function () {
      expect(TeamService.exists('Java team')).toBeTruthy();
      expect(TeamService.exists('Some other team')).toBeFalsy();
    });
  });

  
  describe('addTeam', function () {
    it('should add a new team', function () {
      TeamService.addTeam('Android team');
      expect(TeamService.getTeams().length).toBe(4);
      expect(TeamService.getTeams()[3].name).toEqual('Android team');
      expect(TeamService.getTeams()[3].employees).toEqual([]);
    });
  });

  describe('removeTeam', function () {
    it('should remove a team by name', function () {
      TeamService.removeTeam('QA team');
      expect(TeamService.getTeams().length).toBe(2);
      expect(TeamService.exists('QA team')).toBeFalsy();
    });
  });

  describe('getTeam', function () {
    it('should get a team by name', function () {
      var jsTeam = TeamService.getTeam('JavaScript team');
      expect(jsTeam.employees.length).toBe(3);
      expect(jsTeam.employees).toEqual([4, 5, 6]);
    });

    it('should get null if the team is not found', function () {
      var someOtherTeam = TeamService.getTeam('Some other team');
      expect(someOtherTeam).toBeNull();
    });
  });

  describe('getTeams', function () {
    it('should get all teams', function() {
      expect(TeamService.getTeams().length).toBe(3);
      TeamService.addTeam('iOS team');
      expect(TeamService.getTeams().length).toBe(4);
    });
  });

  describe('setTeams', function () {
    it('should set teams to the specified value', function() {
      expect(TeamService.getTeams().length).toBe(3);
      var newData = [{name: 'New team', employees: [1, 4]}];
      TeamService.setTeams(newData);
      expect(TeamService.getTeams().length).toBe(1);
    });
  });

  describe('addEmployee', function () {
    it('should add employee\'s id to the team if it is not present already', function () {
      TeamService.addEmployee('JavaScript team', 2);
      var jsTeam = TeamService.getTeam('JavaScript team');
      expect(jsTeam.employees.length).toBe(4);
      expect(jsTeam.employees).toContain(2);
    });

    it('should not add employee\'s id to the team if it is already there', function () {
      TeamService.addEmployee('JavaScript team', 5);
      var jsTeam = TeamService.getTeam('JavaScript team');
      expect(jsTeam.employees.length).toBe(3);
    });
  });

  describe('removeEmployee', function () {
    it('should remove employee\'s id from the team', function () {
      TeamService.removeEmployee('QA team', 8);
      var qaTeam = TeamService.getTeam('QA team');
      expect(qaTeam.employees.length).toBe(2);
      expect(qaTeam.employees).not.toContain(8);
    });
  });

  describe('countEmployees', function () {
    it('should count employees in a team', function () {
      var jsEmployeesSize = TeamService.countEmployees('JavaScript team');
      expect(jsEmployeesSize).toBe(3);

      TeamService.addEmployee('JavaScript team', 10);

      jsEmployeesSize = TeamService.countEmployees('JavaScript team');
      expect(jsEmployeesSize).toBe(4);
    });

    it('should return null if there is no such team', function () {
      var otherEmployeesSize = TeamService.countEmployees('Some other team');
      expect(otherEmployeesSize).toBeNull();
    });
  });

});