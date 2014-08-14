'use strict';

describe('TeamService', function () {

  var TeamService,
    maria, maxim, alena, julia, anton,
    teams;

  beforeEach(function () {
    module('teamManagementApp');

    inject(function (_TeamService_) {
      TeamService = _TeamService_;
    });

    // initialize teams with test data
    maria = { 
      id: 2,
      name: 'Maria Sadykov',
      age: 22,
      grade: 'Junior',
      job: 'Java Developer',
    };
    maxim = { 
      id: 3,
      name: 'Maxim Basisty',
      age: 24,
      grade: 'Junior',
      job: 'QA Engineer'
    };
    alena = { 
      id: 4,
      name: 'Alena Reshetov',
      age: 26,
      grade: 'Senior',
      job: 'NET Developer'
    };
    julia = { 
      id: 14,
      name: 'Julia Kupkin',
      age: 21,
      grade: 'Junior',
      job: 'NET Developer',
    };
    anton = { 
      id: 17,
      name: 'Anton Loginov',
      age: 27,
      grade: 'Middle',
      job: 'Java Developer'
    };
    teams = [{
      name: 'Java team',
      employees: [maria, maxim, alena]
    },
    {
      name: 'JavaScript team',
      employees: [maria, alena, anton]
    },
    {
      name: 'QA team',
      employees: [julia, alena, maxim]
    }];

    
    TeamService.setTeams(teams);
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
      expect(jsTeam.employees).toEqual([maria, alena, anton]);
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
    it('should add employee to the team if it is not present already', function () {
      TeamService.addEmployee('JavaScript team', julia);
      var jsTeam = TeamService.getTeam('JavaScript team');
      expect(jsTeam.employees.length).toBe(4);
      expect(jsTeam.employees).toContain(julia);
    });

    it('should not add employee to the team if it is already there', function () {
      TeamService.addEmployee('JavaScript team', anton);
      var jsTeam = TeamService.getTeam('JavaScript team');
      expect(jsTeam.employees.length).toBe(3);
    });
  });

  describe('removeEmployee', function () {
    it('should remove employee from the team', function () {
      TeamService.removeEmployee('QA team', alena);
      var qaTeam = TeamService.getTeam('QA team');
      expect(qaTeam.employees.length).toBe(2);
      expect(qaTeam.employees).not.toContain(alena);
    });
  });

  // describe('countEmployees', function () {
  //   it('should count employees in a team', function () {
  //     var jsEmployeesSize = TeamService.countEmployees('JavaScript team');
  //     expect(jsEmployeesSize).toBe(3);

  //     TeamService.addEmployee('JavaScript team', 10);

  //     jsEmployeesSize = TeamService.countEmployees('JavaScript team');
  //     expect(jsEmployeesSize).toBe(4);
  //   });

  //   it('should return null if there is no such team', function () {
  //     var otherEmployeesSize = TeamService.countEmployees('Some other team');
  //     expect(otherEmployeesSize).toBeNull();
  //   });
  // });

});