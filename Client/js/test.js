var socket = io();
socket.on('serverMsg', function(data){
  console.log(data.msg);
});
