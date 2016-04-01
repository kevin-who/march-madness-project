var util = require('util');
var startDate = new Date();
var startTime = startDate.getTime();
var fs = require('fs');

var unformatTree = JSON.parse(fs.readFileSync('combinations128.json', 'utf8'));
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
      hash["children"].push(hash1)
    }
    children1.push(hash)
  }
  unformatTree["children"][i]["children"] = children1
  delete unformatTree["children"][i][Object.keys(unformatTree["children"][i])[0]];
}

console.log(util.inspect(unformatTree, false, null));
//TIME ELAPSED
endDate = new Date();
var endTime = endDate.getTime();
console.log("\n  Total time elapsed:" + (endTime - startTime) / 1000 + "s\n");
