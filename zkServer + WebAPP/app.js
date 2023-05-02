const ZKLib = require('node-zklib')
var app = require('express')();
var http = require('http').Server(app);

var path = require('path');
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    var option = {
        root: path.join(__dirname)
    }
    var filename = 'index.html'
    res.sendFile(filename, option);
});
io.on('connection', function (stream) {
    console.log('A User Connected')

    setTimeout(async function () {
        
        let zkInstance = new ZKLib('192.168.0.201', 4370, 10000, 4000);
        try {
            await zkInstance.createSocket()
        } catch (e) {
            console.log(e)
        }
        zkInstance.getRealTimeLogs((data) => {
            stream.emit('empid', data)
        })
    }, 1000);
    stream.on('disconnect', function () {
        console.log('A user Disconnect');
    });
});
http.listen(3000, function () {
    console.log("server running.")
});