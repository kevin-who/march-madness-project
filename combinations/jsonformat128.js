var util = require('util');
var startDate = new Date();
var startTime = startDate.getTime();
var fs = require('fs');
function pairs(arr) {
  var groups = [],
    i;
  for (i = 0; i < arr.length; i += 2) {
    groups.push(arr.slice(i, i + 2));
  }
  return groups;
}
var unformatTree = JSON.parse(fs.readFileSync('combinations128.json', 'utf8'));
var name = "1,16,8,9,5,12,4,13"
var children = []
for (var round1 in unformatTree) {
  var hash = {}
  hash[round1] = unformatTree[round1]
  children.push(hash);
  delete unformatTree[round1]
}
unformatTree["name"] = ("[" + pairs(name.split(",")).join("] [") + "]").replace(/,/g," vs ")
unformatTree["children"] = children;

for (i = 0; i < unformatTree["children"].length; i++) {
  unformatTree["children"][i]["name"] = ("[" + pairs(Object.keys(unformatTree["children"][i])[0].split(",")).join("] [") + "]").replace(/,/g," vs ")
  children1 = []
  childrenHash = unformatTree["children"][i][Object.keys(unformatTree["children"][i])[0]]
  for(round3 in childrenHash){
    var hash = {}
    hash["name"] = ("[" + pairs(round3.split(",")).join("] [") + "]").replace(/,/g," vs ")
    hash["children"] = []
    for( round4 in childrenHash[round3]){
        nameHash = {}
        nameHash["name"] = ("[" + pairs(round4.split(",")).join("] [") + "]").replace(/,/g," vs ")
    }
    children1.push(nameHash)
  }
  unformatTree["children"][i]["children"] = children1
  delete unformatTree["children"][i][Object.keys(unformatTree["children"][i])[0]];
}
formatTree = unformatTree
//WRITE TO JSON FILE
require('fs').writeFile(

  'raw128.json',

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
