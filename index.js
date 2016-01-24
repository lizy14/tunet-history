var csv = require('csv');
var fs = require('fs');


var outputDir = './output/'

var listHandler = function(list) {
    list.sort(function(a, b) {
        return (new Date(a.timeStart)).getTime() - (new Date(b.timeStart)).getTime();
    });
    csv.stringify(list, {
        header: true
    }, function(err, data) {
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
            console.log('created directory ' + outputDir);
        }
        fs.writeFile(outputDir + 'verbose.csv', data);
        console.log('data written into '+ outputDir + 'verbose.csv.');
    })
};

var statHandler = function(stat) {
    stat.sort(function(a, b) {
        return a.time.localeCompare(b.time);
    });
    csv.stringify(stat, {
        header: true
    }, function(err, data) {
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
            console.log('created directory ' + outputDir);
        }
        fs.writeFile(outputDir + 'monthly.csv', data);
        console.log('data written into '+ outputDir + 'monthly.csv.');
    })
}

function md5(str) {
    var md5sum = require('crypto').createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
};


const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

var username;
var password;

rl.question('Username: ', function(answer) {
    username = answer;
    rl.question('Password: ', function(answer) {
        password = answer;
        require('./modules/spider')(username, md5(password), listHandler, statHandler)
        rl.close();
    });
});
