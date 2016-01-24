/*
tests
authored by Zhaoyang, Jan 2016.
*/

var parser = require('./../modules/parser');
var fs = require('fs');
console.log(parser.list(fs.readFileSync('user_detail_list.php.html')));
console.log(parser.statistics(fs.readFileSync('user_detail_statistics.php.html')));
