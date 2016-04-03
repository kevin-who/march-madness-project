var util = require('util');
var startDate = new Date();
var startTime = startDate.getTime();
var fs = require('fs');
endDate = new Date();
var endTime = endDate.getTime();
console.log("\n  Total time elapsed:" + (endTime - startTime) / 1000 + "s\n");
