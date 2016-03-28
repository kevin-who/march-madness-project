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
for (i = 0; i < round1.length; i++) {
  var bitCombos = [];
  for (j = 0; j < 256; j++) {
    var binRep = dec2bin(j);
    if (binRep.length < 8) {
      padZeroes = "0".repeat(8 - binRep.length);
      binRep = padZeroes + binRep;
    };
    bitCombos.push(binRep);
  }

}

for (k = 0; k < bitCombos.length; k++) {
  var possibleR1Result = [];
  for (l = 0; l < bitCombos[k].length; l++) {
    var matchResult = round1[l];
    possibleR1Result.push(matchResult[parseInt(bitCombos[k][l])]);
  }
  round2.push(possibleR1Result);
}

var groups = arr.map( function(e,i,chunkSize){
    return i%chunkSize===0 ? arr.slice(i,i+chunkSize) : null;
}).filter(function(e){ return e; });

for(j=0;j<round2.length;j++){

}


console.log(round2);
console.log(round2.length)
