let express = require('express');
let app = express();

let server = require('http').Server(app);

let io = require('socket.io')(server);

let nameObj = {};
let initChat = [];

PORT - process.env.PORT || 5000;
/*
console.log(app);
console.log();
console.log(server);
console.log();
console.log(io);
console.log();
*/


app.use('/', express.static('./public'));


io.on('connection', function (socket) {
    console.log();
    console.log(socket.id);


    socket.on('name', function (data) {
        console.log(data);
        nameObj[socket.id] = data;
        console.log('name');
        console.log(nameObj);
        io.sockets.emit('initConnect', nameObj);
    });


    socket.emit('chat', initChat);

    socket.on('message', function (data) {
        socket.broadcast.emit('reciveData', data);
        console.log(data);
        initChat.push(data);
    })

    socket.on('disconnect', function () {
        delete nameObj[socket.id];
        console.log('disconnect');
        console.log(nameObj);
        io.sockets.emit('initConnect', nameObj);

    })
});




server.listen(PORT, function () {
    console.log('Server is listening on port ' + PORT);
});
