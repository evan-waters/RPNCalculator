'use strict';

var _ = require('underscore')
  , acceptedOperators = ['+', '-', '*', '/'];

exports.calculate = function(inputArgs, cb) {
  if (_.difference(inputArgs, acceptedOperators).length === inputArgs.length) {
    if (_.chain(inputArgs).map(function(argument) {
      return /\d{1,}$/.test(argument) === false && !_.contains(acceptedOperators, argument);
    }).uniq().contains(true).value()) {
      return cb(new Error("Operator is Invalid."));
    }
    return cb(null, false);
  }
};