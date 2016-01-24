/*
auth module.
manages cookie. offers interfaces `login()`` and `getPage()`.
authored by Zhaoyang, Jan 2016.
*/


var superagent = require('superagent');

var urlPrefix = 'https://usereg.tsinghua.edu.cn';
var cookie;

module.exports = {

    login: function(username, password_md5, callback) {

        //dirty fix: usereg.tsinghua.edu.cn's certificate
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

        (function() {
            superagent.post(urlPrefix + '/do.php')
                .type("form")
                .send({
                    action: 'login',
                    user_login_name: username,
                    user_password: password_md5
                })
                .end(function(err, res) {
                    if (err) callback(err);
                    cookie = res.header['set-cookie'][0];
                    callback();
                })
        })();
    },
    getPage: function(url, callback) {
        superagent.get(urlPrefix + url)
            .set("Cookie", cookie)
            .end(function(err, res) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, res.res.text);
                }
            });
    }
}
