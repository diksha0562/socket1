var socket = io();
var data = {};
var users = [];
let rooms = [];
var createRoomInput = document.getElementById('createRoomInput');
function createRoom() {
    document.getElementById('output').innerHTML = "";
    data.userName = createRoomInput.value;
    console.log('createroom', data);
    socket.emit('createroom', data);
}

function joinRoom() {
    let data = {}
    data.userName = document.getElementById('nameInput').value;
    data.room = document.getElementById('codeInput').value;
    console.log('joinRoom', data)
    socket.emit('adduser', data);
}

function doPost() {
    alert('Hey');
    let msg = document.getElementById('message').value;
    socket.emit('sendchat', msg);
}

function get_data(room) {
    // alert(room);
    document.getElementById('output').innerHTML=localStorage.getItem(room);
    // document.getElementById('output_room').innerHTML=localStorage.getItem(room);
    document.getElementById('container').style.display = 'none';
    document.getElementById('listing').style.display = 'block';
}

function back_click() {
    document.getElementById('container').style.display = 'block';
    document.getElementById('listing').style.display = 'none';
}

socket.on('updatechat', (username, data, room) => {
    var user = {};

    user.userName = username;
    user.message = data;
    user.room = room;
    user.date = new Date().getTime();
    users.push(user);
    if (!rooms.includes(room) && room != undefined) {
        rooms.push(room)
        let node = document.createElement('a');
        let textnode = document.createTextNode(room);
        node.appendChild(textnode);
        node.setAttribute('href', '#');
        // node.setAttribute('value',data.room);
        // node.setAttribute('onclick','get_data(event)');
        node.onclick = function () { get_data(room) };
        document.getElementById('room_list').appendChild(node);
    }
  
    document.getElementById('output').innerHTML += "<p><strong>" + username + ": </strong>" + data + "</p>";
   
    localStorage.setItem(room, document.getElementById('output').innerHTML);
    console.log('update chat room', room);
    console.log('users', users);
})

socket.on('roomcreated', (data) => {
    console.log('data.room', data.room);
    // document.getElementById('output').innerHTML='';
    // let room = data.room;
    // let node = document.createElement('a');
    // let textnode = document.createTextNode(data.room);
    // node.appendChild(textnode);
    // node.setAttribute('href','#');
    // // node.setAttribute('value',data.room);
    // // node.setAttribute('onclick','get_data(event)');
    // node.onclick = function() { get_data(room) };
    // document.getElementById('room_list').appendChild(node);

    socket.emit('adduser', data);
})

socket.on('notconnected', () => {
    alert('not connected')
})