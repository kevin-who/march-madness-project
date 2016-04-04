var util = require('util');
var startDate = new Date();
var startTime = startDate.getTime();
var fs = require('fs');
//TIME ELAPSED
function pairs(arr) {
  var groups = [],
    i;
  for (i = 0; i < arr.length; i += 2) {
    groups.push(arr.slice(i, i + 2));
  }
  return groups;
}
var matchTree = JSON.parse(fs.readFileSync('raw32768.json', 'utf8'));
function probabilities(start, results){
  startPairs = pairs(start.split(","))
  results = results.split(",")
  var probArray = []
  for (a=0;a<results.length;a++){
    var denom = parseInt(startPairs[a][0])+parseInt(startPairs[a][1])
    prob = String(denom-parseInt(results[a]))+"/"+String(denom)
    probArray.push(prob)
  }
  return probArray
}
for(i=0;i<matchTree["children"].length;i++){
  round1 = matchTree["children"][i]
  round1["probability"]=probabilities(matchTree["name"],round1["name"])
  for (j=0;j<round1["children"].length;j++){
    round2 = round1["children"][j]
    round2["probability"]=probabilities(round1["name"],round2["name"])
    for (k=0;k<round2["children"].length;k++){
      round3 = round2["children"][k]
      round3["probability"]=probabilities(round2["name"],round3["name"])
      for (l=0;l<round3["children"].length;l++){
        round4 = round3["children"][l]
        round4["probability"]=probabilities(round3["name"],round4["name"])
      }
    }
  }
}
require('fs').writeFile(

  'stringProb32768.json',

  JSON.stringify(matchTree, null, 2),

  function(err) {
    if (err) {
      console.error('¯\_(ツ)_/¯ Stuff happens...');
    }
  }
);
endDate = new Date();
var endTime = endDate.getTime();
console.log("\n  Total time elapsed:" + (endTime - startTime) / 1000 + "s\n");
