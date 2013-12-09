'use strict';

var _ = require('underscore')
  , acceptedOperators = ['+', '-', '*', '/'];

var calculate = exports.calculate = function(inputArgs, cb) {
  var refinedArgs = []
    , argument, token, n1, n2;

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

    if (_.contains(acceptedOperators, argument)) {
      token = refinedArgs.pop();
      n2 = refinedArgs.pop();
      n1 = refinedArgs.pop();
      refinedArgs.push(eval(n1 + token + ' ' + n2));
    }
  }

  if (refinedArgs.length > 1) {
    calculate(refinedArgs, cb);
  } else {
    return cb(null, refinedArgs[0]);
  }
};