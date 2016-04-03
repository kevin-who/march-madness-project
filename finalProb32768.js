var util = require('util');
var startDate = new Date();
var startTime = startDate.getTime();
var fs = require('fs');

var probTree = JSON.parse(fs.readFileSync('cumulative32768.json', 'utf8'));

var validProbs = [];

for (i = 0; i < probTree["children"].length; i++) {
  round1 = probTree["children"][i]
  round1Prob = round1["probability"]
  for (j = 0; j < round1["children"].length; j++) {
    round2 = round1["children"][j]
    round2Prob = round2["probability"]
    for (k = 0; k < round2["children"].length; k++) {
      round3 = round2["children"][k]
      round3Prob = round3["probability"]
      for (l = 0; l < round3["children"].length; l++) {
        round4 = round3["children"][l]
        if (round4["name"] === '16') {
          round4Prob = round4["probability"]
          console.log(round4Prob)
          console.log(round4["name"])
          console.log(round3["name"])
          console.log("////")
          validProbs.push(round1Prob * round2Prob * round3Prob * round4Prob);
        }
      }
    }
  }
}

console.log(validProbs);
console.log(validProbs.length)
console.log(validProbs.reduce(function(a, b) {
  return a + b;
}))
endDate = new Date();
var endTime = endDate.getTime();
console.log("\n  Total time elapsed:" + (endTime - startTime) / 1000 + "s\n");
