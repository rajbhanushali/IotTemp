

var http = require('http');
var fs = require('fs');
var querystring = require("querystring");

var temp = "no temperature data";
var prevData = [];
var info;
var postdata;

server = http.createServer( function(req, res) {
    console.dir(req.param);

    if (req.method == 'POST') {
        console.log("POST");
        var body = '';
        req.on('data', function (data) {
            body += data;
            console.log("Partial body: " + body);
        });

        req.on('end', function () {
            console.log("Body: " + body);
            info = querystring.parse(body);
            console.log(info);
            temp = info.temp;
            postdata = temp + "," + info.humidity;
            prevData.push(info);

            if(prevData.length > 10){
            	prevData.splice(1, 1);
            }

            console.log(prevData);
        });

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('post received');
    }
    
    else
    {
        console.log("GET");
        console.log(postdata);
        //var html = fs.readFileSync('index.html');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(postdata);
    }

});

port = 3000;
host = '127.0.0.1';
server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);