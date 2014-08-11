'use strict';'use strict';

describe('EmployeeService', function () {

  var mockData = [
    {
      "id": 1,
      "name": "Dmitry Lemlekh",
      "age": 21,
      "grade": "Junior",
      "job": "PHP Developer"
    },
    {
      "id": 2,
      "name": "Maria Sadykov",
      "age": 22,
      "grade": "Junior",
      "job": "Java Developer"
    },
    {
      "id": 3,
      "name": "Maxim Basisty",
      "age": 24,
      "grade": "Junior",
      "job": "QA Engineer"
    }
  ];

  var EmployeeService,
    httpBackend;

  beforeEach(function () {
    
    // load the module.
    module('teamManagementApp');
    
    inject(function(_EmployeeService_, $httpBackend) {
      EmployeeService = _EmployeeService_;
      httpBackend = $httpBackend;
    });
  });

  afterEach(function() {    
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });


  it('should send a query request and get valid results', function () {
    httpBackend.expectGET('http://localhost:9000/data/staff.json').respond(mockData);
    EmployeeService.query(function (result) {
      expect(result.length).toBe(3);
      expect(result[0].name).toEqual("Dmitry Lemlekh");
      expect(result[1].job).toEqual("Java Developer");
      expect(result[2].age).toEqual(24);
    });
    httpBackend.flush();
  });

});