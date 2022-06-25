// Web socket

import config from "./config";

const WebSocket = require('ws')
const ws = new WebSocket(`ws://${config.wss.ip}:${config.wss.port}`);

ws.on('open', function open() {
 // ws.send('something');
});

ws.on('message', function message(data) {
  console.log('received: %s', data);
});


port.on('error', function(err) {
  console.log('Error: ', err.message)
})


port.on('open', function(e) {
  console.log('Opened port')
})

export { ws }
