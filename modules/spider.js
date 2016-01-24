/*
爬取 “上网明细”(list) 和 “上网明细统计”(stat) 数据
usereg.tsinghua.edu.cn

authored by Zhaoyang, Jan 2016.
*/
var auth = require('./auth');
var parser = require('./parser');
module.exports = function(username, password_md5, listCallback, statCallback) {
    auth.login(username, password_md5, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('login successful.');
        }
        if (listCallback) {
            var listURL = '/user_detail_list.php?offset=';
            var list = [];
            auth.getPage(listURL + '1', function(err, html) {
                //get total count of items
                var total = parseInt(html.toString().match(/\[1\/(\d+)\]/)[1]);
                console.log('counting %d detail items', total);
                auth.getPage(listURL + (total + 2), function(err, html) {
                    list = list.concat(parser.list(html));
                    //deal with list
                    listCallback(list);
                });
            });
        }
        if (statCallback) {
            var statURL = '/user_detail_statistics.php?month=-1&year=';
            var stat = [];
            var years = [2011, 2012, 2013, 2014, 2015, 2016];
            var cntPages = years.length;
            years.forEach(function(year) {
                auth.getPage((statURL + year), function(err, html) {
                    cntPages--;
                    stat = stat.concat(parser.statistics(html));
                    if (cntPages == 0) {
                        //deal with stat
                        statCallback(stat);
                    }
                });
            });
        }
    });
};
