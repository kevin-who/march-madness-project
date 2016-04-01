var util = require('util');
var startDate = new Date();
var startTime = startDate.getTime();
var fs = require('fs');

var unformatTree = JSON.parse(fs.readFileSync('combinations32768.json', 'utf8'));
var name = "1,16,8,9,5,12,4,13,6,11,3,14,7,10,2,15"
var children = []
for (var round1 in unformatTree) {
  var hash = {}
  hash[round1] = unformatTree[round1]
  children.push(hash);
  delete unformatTree[round1]
}
unformatTree["name"] = name;
unformatTree["children"] = children;

for (i = 0; i < unformatTree["children"].length; i++) {
  unformatTree["children"][i]["name"] = Object.keys(unformatTree["children"][i])[0]
  children1 = []
  childrenHash = unformatTree["children"][i][Object.keys(unformatTree["children"][i])[0]]
  for(round3 in childrenHash){
    var hash = {}
    hash["name"] = round3
    hash["children"] = []
    for( round4 in childrenHash[round3]){
      var hash1 = {}
      hash1["name"] = round4
      hash1["children"]=[]
      for (round5 in childrenHash[round3][round4]){
        nameHash = {}
        nameHash["name"] = round5
        hash1["children"].push(nameHash)
      }
      hash["children"].push(hash1)
    }
    children1.push(hash)
  }
  unformatTree["children"][i]["children"] = children1
  delete unformatTree["children"][i][Object.keys(unformatTree["children"][i])[0]];
}
formatTree = [unformatTree]
//WRITE TO JSON FILE
require('fs').writeFile(

  'circle32768.json',

  JSON.stringify(formatTree, null, 2),

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
