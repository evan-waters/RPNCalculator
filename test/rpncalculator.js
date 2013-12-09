'use strict';

var rpncalculator = require('..')
  , should = require('should');

describe('rpncalculator', function() {
  
  describe('.calculate', function() {
    
    describe('with invalid input (not numbers or accepted operators)', function() {
      it('should return an error', function(done) {
        rpncalculator.calculate(['4-'], function(err, result) {
          should.exist(err);
          should.not.exist(result);
          done();
        });
      });
    });

    describe('with too few arguments', function() {
      it('should return false', function(done) {
        var expected = 3;

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
        rpncalculator.calculate([1,2], test);
      });
    });
  });
});