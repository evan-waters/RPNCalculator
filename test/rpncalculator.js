'use strict';

var rpncalculator = require('..')
  , should = require('should');

describe('rpncalculator', function() {
  
  describe('.calculate', function() {
    
    describe('with invalid input (not numbers or accepted operators)', function() {
      it('should return an error', function(done) {
        rpncalculator.calculate(['4-'], function(err, result) {
          should.exist(err);
          should.equal(err.message, "Operator is Invalid.");
          should.not.exist(result);
          done();
        });
      });
    });

    describe('with too few arguments', function() {
      it('should return false', function(done) {
        // Number of expected tests
        var expected = 3;

        // Only call done() when all tests have completed
        function checkDone() {
          expected--;
          if (expected === 0) {
            done();
          }
        }

        var test = function(err, result) {
          should.not.exist(err);
          result.should.be.false;
          checkDone();
        };

        rpncalculator.calculate([], test);
        rpncalculator.calculate([1],test);
        rpncalculator.calculate([1,'+'], test);
      });
    });

    describe('with no operators', function() {
      it('should return false', function(done) {
        rpncalculator.calculate([1,2,3,4,5], function(err, result) {
          should.not.exist(err);
          result.should.be.false;
          done();
        });
      });
    });

    describe('with incorrectly formatted statement', function() {
      it('should return an error', function(done) {
        rpncalculator.calculate([1,'+',1], function(err, result) {
          should.exist(err);
          should.equal(err.message, "Statement is Invalid.");
          should.not.exist(result);
          done();
        });
      });
    });

    // describe('with correctly formatted statement', function() {
    //   it('should return a number', function(done) {
    //     rpncalculator.calculate([1,1,'+'], function(err, result) {
    //       should.not.exist(err);
    //       result.should.be.a.Number;
    //       done();
    //     })
    //   });
    // });
  });
});