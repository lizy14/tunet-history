/*
in:  '20M'
out: 20,971,520
authored by Zhaoyang, Jan 2016.
*/
module.exports = function(traffic){
    var val = parseFloat(traffic.substr(0, traffic.length - 1));
    var unit = traffic.charAt(traffic.length - 1).toUpperCase();
    var units = {
        'B': 1,
        'K': 1e3,
        'M': 1e6,
        'G': 1e9
    };
    return Math.round(val * units[unit]);
}
