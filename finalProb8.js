var util = require('util');
var startDate = new Date();
var startTime = startDate.getTime();
var fs = require('fs');

var probTree = JSON.parse(fs.readFileSync('cumulative8.json', 'utf8'));

var validProbs = [];

for(i=0;i<probTree["children"].length;i++){
  round1 = probTree["children"][i]
  round1Prob = round1["probability"]
  for(j=0;j<round1["children"].length;j++){
    round2 = round1["children"][j]
    if(round2["name"] === '1'){
      round2Prob = round2["probability"]
      console.log(round2Prob)
      console.log(round1Prob)
      validProbs.push(round1Prob*round2Prob);
    }
  }
}

console.log(validProbs);
console.log(validProbs.reduce(function(a,b){return a+b;}))
endDate = new Date();
var endTime = endDate.getTime();
console.log("\n  Total time elapsed:" + (endTime - startTime) / 1000 + "s\n");
