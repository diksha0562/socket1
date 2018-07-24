var socket = io();
var data={};
var users=[];
var createRoomInput = document.getElementById('createRoomInput');
function createRoom(){
    data.userName = createRoomInput.value;
    console.log('createroom',data);
socket.emit('createroom',data);
}

function joinRoom (){
    let data={}
    data.username=document.getElementById('nameInput').value;
    data.room=document.getElementById('codeInput').value;
    console.log('joinRoom',data)
    socket.emit('adduser', data);
}

function doPost(){
    let msg =document.getElementById('message').value;
    socket.emit('sendchat',msg);
}

socket.on('updatechat',(username,data)=>{
var user={};
user.userName=username;
user.message=data;
user.date=new Date().getTime();
users.push(user);
console.log('users',users);
})

socket.on('roomcreated',(data)=>{
    socket.emit('adduser', data);
})
























// app.controller('AppCtrl', function ($scope, socket) {

//     $scope.users = [];
//     $scope.curtrentUser = '';
//     socket.on('connect', function () { });
  
//     socket.on('updatechat', function (username, data) {
//       var user = {};
//       user.username = username;
//       user.message = data;
//       user.date = new Date().getTime();
//       user.image = 'http://dummyimage.com/250x250/000/fff&text=' + username.charAt(0).toUpperCase();
//       $scope.users.push(user);
//     });
  
//     socket.on('roomcreated', function (data) {
//       socket.emit('adduser', data);
//     });
  
//     $scope.createRoom = function (data) {
//       $scope.curtrentUser = data.username;
//       socket.emit('createroom', data);
//     }
  
//     $scope.joinRoom = function (data) {
//       $scope.curtrentUser = data.username;
//       socket.emit('adduser', data);
//     }
  
//     $scope.doPost = function (message) {
//       socket.emit('sendchat', message);
//     }
//   });