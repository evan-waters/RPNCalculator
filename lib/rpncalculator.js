'use strict';

var _ = require('underscore')
  , acceptedOperators = ['+', '-', '*', '/'];

exports.calculate = function(inputArgs, cb) {
  var refinedArgs = []
    , argument;

  if (_.difference(inputArgs, acceptedOperators).length === inputArgs.length) {
    if (_.chain(inputArgs).map(function(argument) {
      return /\d{1,}$/.test(argument) === false && !_.contains(acceptedOperators, argument);
    }).uniq().contains(true).value()) {
      return cb(new Error("Operator is Invalid."));
    }
    return cb(null, false);
  }

  if (inputArgs.length <= 2) return cb(null, false);

  for (var i=0, l=inputArgs.length; i<l; i++) {
    argument = inputArgs[i];
    refinedArgs.push(argument);
    if (_.contains(acceptedOperators, argument) && refinedArgs.length < 3) {
      return cb(new Error("Statement is Invalid."));
    }
  }
};