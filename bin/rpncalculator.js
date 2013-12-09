#!/usr/bin/env node

var rpnCalculator = require('..')
  , util = require('util')
  , inputArgs = [];

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (data) {
  var re = /q/i;
  data = data.toString().trim();

  // exit if input is q or Q
  if (re.test(data)) {
    return done();
  }

  inputArgs.push(data);

  rpnCalculator.calculate(inputArgs, function(err, result) {
    if (err) {
      console.log(err.message);
      console.log('Input has been reset.');
      inputArgs = [];
    }

    if (result) {
      console.log('= ' + result);
      inputArgs = [result];
    }
  });
});

function done() {
  console.log('Goodbye');
  process.exit();
}