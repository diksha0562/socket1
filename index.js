// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

// app.get('/', (req, res)=>{
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', (socket)=>{
//   console.log('a user connected');
//   socket.on('chat message',(msg)=>{console.log('message ',msg)
//   io.emit('chat message',msg);
// })

// });

// http.listen(5000,()=>{
//   console.log('listening on *:5000');
// });

var express = require('express');
var app = express();
var server = app.listen(5000, () => { console.log('port 5000') });
var socket = require('socket.io');
var io = socket(server);
app.use(express.static(__dirname + '/public'));
var rooms = [];
var usernames = {};
io.on('connection', (socket) => {
  console.log('connection established');


  socket.on('createroom', (data) => {
    var new_room = ("" + Math.random()).substring(2, 7);
    rooms.push(new_room);
    data.room = new_room;
    socket.emit('updatechat', 'SERVER', 'Your room is ready, invite someone using this ID:' + new_room);
    // socket.emit('roomcreated', data);
  })

  socket.on('adduser', (data) => {
    console.log('adduser',data)
    var username = data.userName;
    var room = data.room;
    console.log('rooms',rooms)
    if (rooms.indexOf(room) != -1) {
      socket.username = username;
      socket.room = room;
      usernames[username] = username;
      socket.join(room);
      console.log('socket.room',socket.room);
      socket.emit('updatechat', 'SERVER', 'You are connected. Start chatting');
      socket.broadcast.to(room).emit('updatechat', 'SERVER', username + ' has connected to this room');
    } else {
      socket.emit('updatechat', 'SERVER', 'Please enter valid code.');
    }
  })

  socket.on('sendchat',(msg)=> {
    io.sockets.emit('updatechat', socket.username, msg);
  });

  socket.on('disconnect',() => {
    delete usernames[socket.username];
    io.sockets.emit('updateusers', usernames);
    if (socket.username !== undefined) {
        socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
        socket.leave(socket.room);
    }
})
});
