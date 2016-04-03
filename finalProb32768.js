var util = require('util');
var startDate = new Date();
var startTime = startDate.getTime();
var fs = require('fs');

var probTree = JSON.parse(fs.readFileSync('cumulative32768.json', 'utf8'));

var validProbs = [];
var probSum = 0;
for(i=0;i<probTree["children"].length;i++){
  round1 = probTree["children"][i]
  probSum+=round1["probability"]
}
console.log(probSum)
endDate = new Date();
var endTime = endDate.getTime();
console.log("\n  Total time elapsed:" + (endTime - startTime) / 1000 + "s\n");
