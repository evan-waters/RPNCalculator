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
      })
    })
  });
});