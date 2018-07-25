var socket = io();
var data={};
var users=[];
var curr_room;
var createRoomInput = document.getElementById('createRoomInput');
function createRoom(){
    document.getElementById('output').innerHTML="";
    data.userName = createRoomInput.value;
    console.log('createroom',data);
    socket.emit('createroom',data);
}

function joinRoom (){
    let data={}
    data.userName=document.getElementById('nameInput').value;
    data.room=document.getElementById('codeInput').value;
    console.log('joinRoom',data)
    socket.emit('adduser', data);
}

function doPost(){
    let msg =document.getElementById('message').value;
    socket.emit('sendchat',msg);
}

function get_data(event){
    alert(event.target.value);
    document.getElementById('output').innerHTML=localStorage.getItem(event.target.value);
}

socket.on('updatechat',(username,data,room)=>{
var user={};
user.userName=username;
user.message=data;
user.date=new Date().getTime();
users.push(user);
document.getElementById('output').innerHTML +="<p><strong>"+username+": </strong>"+data+"</p>" ;
localStorage.setItem(room,document.getElementById('output').value)
console.log('update chat room',room);
console.log('users',users);
})

socket.on('roomcreated',(data)=>{
    console.log('data.room',data.room);
        let room = data.room;
        let node = document.createElement('input');
        // let textnode = document.createTextNode(data.room);
        // node.appendChild(textnode);
        node.setAttribute('type','button');
        node.setAttribute('value',data.room);
        node.setAttribute('onclick','get_data(event)');
        document.getElementById('room_list').appendChild(node);
    
    socket.emit('adduser', data);
})

socket.on('notconnected',()=>{
    alert('not connected')
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