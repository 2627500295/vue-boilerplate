import * as http from 'http';
import * as socket from 'socket.io';

const app = http.createServer(function(req, res) {

});
const io = socket(app);

// io.on('connection', function(client){
//   client.on('event', function(data){});
//   client.on('disconnect', function(){});
// });

io.on('connection', function (socket) {
  // 发送消息
  socket.emit('news', { hello: 'world' });

  setInterval(() => {
    socket.emit('news', {
      hello: Math.random() * 10,
      floor: Math.floor(12.510),
      ceil: Math.ceil(12.510)
    });
  }, 1000);

  // 接收消息
  socket.on('my other event', function (data) {
    console.log(data);
  });

  // 停止连接
  socket.on('disconnect', function(){});
});

app.listen(3000, function() {
  console.log(`App runing`);
});