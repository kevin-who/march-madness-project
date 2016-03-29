var combine = function(a) {
  var fn = function(n, src, got, all) {
    if (n == 0) {
      if (got.length > 0) {
        all[all.length] = got;
      }
      return;
    }
    for (var j = 0; j < src.length; j++) {
      fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
    }
    return;
  }
  var all = [];
  for (var i = 0; i < a.length; i++) {
    fn(i, a, [], all);
  }
  all.push(a);
  return all;
}

function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

var round1 = [
  [1, 16],
  [8, 9],
  [5, 12],
  [4, 13],
  [6, 11],
  [3, 14],
  [7, 10],
  [2, 15]
];
var round2 = [];

function pairs(arr) {
  var groups = [],
    i;
  for (i = 0; i < arr.length; i += 2) {
    groups.push(arr.slice(i, i + 2));
  }
  return groups;
}

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
round2 = roundResults(round1);

var round2Pairs = round2.map(function(teamList) {
  return pairs(teamList)
});

var round3 = []

for (m = 0; m < round2Pairs.length; m++) {
  console.log(m);
  var round2Result = [];
  round2Result = roundResults(round2Pairs[m]);
  round3.push(round2Result);
}

console.log(round3);
