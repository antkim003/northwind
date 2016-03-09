var http = require('http');
var server = http.createServer();


server.on('request', require('./app'));
var port = process.env.PORT || 3001;
server.listen(port , function () {
    console.log('Server is listening on port ' + port + '!');
});