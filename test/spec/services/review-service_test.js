'use strict';

describe('ReviewService', function () {

  var ReviewService,
    maria, maxim,
    paulReview, jackReview, addyReview;

  beforeEach(function () {
    module('teamManagementApp');

    inject(function (_ReviewService_) {
      ReviewService = _ReviewService_;
    });

    // initialize teams with test data
    
    maxim = { 
      id: 3,
      name: 'Maxim Basisty',
      age: 24,
      grade: 'Junior',
      job: 'QA Engineer'
    };

    paulReview = {
      author: 'Paul Irish',
      review: 'Hello, World!'
    };
    jackReview = {
      author: 'Jack Dorsey',
      review: 'Tweet, tweet'
    };
    addyReview = {
      author: 'Addy Osmani',
      review: 'Not as good as me'
    };

    maria = { 
      id: 2,
      name: 'Maria Sadykov',
      age: 22,
      grade: 'Junior',
      job: 'Java Developer',
      reviews: [paulReview, jackReview, addyReview]
    };
    

  });

  describe('addReview', function () {
    it('should initialize reviews if undefined and then add a first review', function () {
      expect(maxim.reviews).toBeUndefined();
      ReviewService.addReview(maxim, 'Anonymous', 'He is a cool guy!');
      expect(maxim.reviews.length).toBe(1);
    });

    it('should add as much reviews as user wants', function () {
      ReviewService.addReview(maxim, 'Anonymous', 'He is a cool guy!');
      expect(maxim.reviews[0].author).toEqual('Anonymous');
      
      ReviewService.addReview(maxim, 'Jack Dorsey', 'Best of the best!');
      expect(maxim.reviews[1].review).toEqual('Best of the best!');

      ReviewService.addReview(maxim, 'Addy Osmani', 'Not as good as me');
      expect(maxim.reviews.length).toBe(3);
    });
  });

  describe('removeReview', function () {
    it('should remove a given review', function () {
      expect(maria.reviews.length).toBe(3);
      expect(maria.reviews).toContain(addyReview);
      ReviewService.removeReview(maria, addyReview);
      expect(maria.reviews).not.toContain(addyReview);
      expect(maria.reviews.length).toBe(2);
    });
  });

});
