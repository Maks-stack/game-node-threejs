import express from 'express'
var http = require('http');
var app = express();
var server =  http .createServer(app);
var PORT = process.env.PORT || 2000;
var qrImage = require('qr-image');
var fs = require('fs');

qrImage
    .image("http://nodejs.org", {type: 'png', size:20})
    .pipe(fs.createWriteStream("MyQRCode.png"));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/src/index.html');
});
app.use('/', express.static(__dirname));

server.listen(PORT);
console.log("server started on: " + PORT);

var desktopSocket;
var mobileSockets = {};

var io = require('socket.io')(server,{});
io.sockets.on('connection', function(socket){
    socket.on('mobile-connection', function(response){
        socket.id = Math.random();
        mobileSockets[socket.id] = socket;
        console.log("mobile connection");
        desktopSocket.emit('player-connect', {id: socket.id});
    });
    socket.on('desktop-connection', function(response){
        desktopSocket = socket;
        console.log("desktop connection");
    });
    socket.on('generate-QR', function(response, cb){
        var imagePath = "qrLink.png";
        fs.unlink("qrLink.png");
        qrImage
            .image(response.url, {type: 'png', size:20})
            .pipe(fs.createWriteStream(imagePath));
            cb(imagePath);
    });
    socket.on('update-position-device', function(response){
        if(desktopSocket)
            desktopSocket.emit('update-position-server', {x: response.posX, y: response.posY, id: socket.id})
    });
});
