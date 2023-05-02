const ZKLib = require('node-zklib')
var app = require('express')();
var http = require('http').Server(app);

const port = 3000

app.get('/', (req, res) => {
  res.send("ok")
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
