/*
parses page
authored by Zhaoyang, Jan 2016.
*/

var cheerio = require('cheerio');

var trafficTranslation = require('./traffic');

exports.list = function(html) {
    var $ = cheerio.load(html);

    var items = [];

    var fields = [{
        name: 'timeStart',
        index: 2
    }, {
        name: 'timeEnd',
        index: 3
    }, {
        name: 'trafficIn',
        index: 5,
        func: trafficTranslation
    }, {
        name: 'trafficOut',
        index: 6,
        func: trafficTranslation
    }, {
        name: 'OS',
        index: 12
    }];

    $('table.maintab table tr').each(function(i, e) {
        if (i <= 1 /*MAGIC*/ ) return;
        var tds = $(e).find('td');
        var item = {};

        fields.forEach(function(e) {
            var f = e.func;
            if (!f) f = function(x) {
                return x;
            };
            item[e.name] = f($(tds[e.index]).text());
        })

        items.push(item);
    });
    return items;
};
exports.statistics = function(html) {
    var $ = cheerio.load(html);
    var items = [];

    var fields = [{
        name: 'time',
        index: 0,
        func: function(s) {
            /* in:  '2015-04-01 ~ 2015-04-30'
               out: '2015-04'  */
            return s.match(/\d{4}-\d{2}/)[0];
        }
    }, {
        name: 'wirelessIn',
        index: 1,
        func: trafficTranslation
    }, {
        name: 'wirelessOut',
        index: 2,
        func: trafficTranslation
    }, {
        name: 'wirelessCount',
        index: 5,
    }, {
        name: 'wiredIn',
        index: 7,
        func: trafficTranslation
    }, {
        name: 'wiredOut',
        index: 8,
        func: trafficTranslation
    }, {
        name: 'wiredCount',
        index: 11,
    }];

    $('table.maintab table tr').each(function(i, e) {
        if (i <= 2 /*MAGIC*/ ) return;
        var tds = $(e).find('td');
        var item = {};

        fields.forEach(function(e) {
            var f = e.func;
            if (!f) f = function(x) {
                return x;
            };
            item[e.name] = f($(tds[e.index]).text());
        })
        if(item.wirelessCount !=0 || item.wiredCount !=0)
            items.push(item);
    });
    return items;
};
