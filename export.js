var util = require('util');
var startDate = new Date();
var startTime = startDate.getTime();
var fs = require('fs');

function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}
var round0 = [1, 16, 8, 9]
round0 = [1, 16, 8, 9, 5, 12, 4, 13]
  //round0 = [1,16,8,9,5,12,4,13,6,11,3,14,7,10,2,15]
var round0Pairs = pairs(round0)
var round1 = [];

function nullHash(array) {
  var hash = new Object();
  for (i = 0; i < array.length; i++) {
    hash[array[i]] = null;
  }
  return hash
}

function pairs(arr) {
  var groups = [],
    i;
  for (i = 0; i < arr.length; i += 2) {
    groups.push(arr.slice(i, i + 2));
  }
  return groups;
}
Array.prototype.flatten = function() {
  var ret = [];
  for (var i = 0; i < this.length; i++) {
    if (Array.isArray(this[i])) {
      ret = ret.concat(this[i].flatten());
    } else {
      ret.push(this[i]);
    }
  }
  return ret;
};

function roundResults(startTeams) {
  var endTeams = [];
  for (i = 0; i < startTeams.length; i++) {
    var bitCombos = [];
    var comboNum = Math.pow(2, startTeams.length);
    for (j = 0; j < comboNum; j++) {
      var binRep = dec2bin(j);
      if (binRep.length < startTeams.length) {
        padZeroes = "0".repeat(startTeams.length - binRep.length);
        binRep = padZeroes + binRep;
      };
      bitCombos.push(binRep);
    }

  }

  for (k = 0; k < bitCombos.length; k++) {
    var possibleR1Result = [];
    for (l = 0; l < bitCombos[k].length; l++) {
      var matchResult = startTeams[l];
      possibleR1Result.push(matchResult[parseInt(bitCombos[k][l])]);
    }
    endTeams.push(possibleR1Result);
  }
  return endTeams;
}


round1 = roundResults(round0Pairs);


var resultsTree = nullHash(round1);

var round1Pairs = round1.map(function(teamList) {
  return pairs(teamList)
});

for (var round0Match in resultsTree) {

  keyArray = round0Match.split(",")

  round1Match = nullHash(roundResults(pairs(keyArray)));
  for (var round2Match in round1Match){
    keyArray = round2Match.split(",")
    round3Match = nullHash(roundResults(pairs(keyArray)));
    round1Match[round2Match] = round3Match;
  }
  resultsTree[round0Match] = round1Match
}

console.log(resultsTree)

//console.log(resultsTree)
//WRITE TO JSON FILE
require('fs').writeFile(

  'combinations.json',

  JSON.stringify(round0, null, 2),

  function(err) {
    if (err) {
      console.error('¯\_(ツ)_/¯ Stuff happens...');
    }
  }
);
//TIME ELAPSED
endDate = new Date();
var endTime = endDate.getTime();
console.log("\n  Total time elapsed:" + (endTime - startTime) / 1000 + "s\n");
