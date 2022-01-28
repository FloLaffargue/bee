// Serial Port

const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('/dev/ttyACM0', {
  baudRate: 9600
})
const lineStream = port.pipe(new Readline({ delimiter: "\r\n" }))


// Web socket

const WebSocket = require('ws')
const ws = new WebSocket('ws://192.168.1.84:3003');

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

/* lineStream.on('readable', function () {
  console.log('Data:', port.read())
}) */

lineStream.on('data', function (data) {
	ws.send(data)
	data = JSON.parse(data)
	console.log("Temp is " + data.temp)
	console.log("Humidity is " + data.humidity)
//	console.log('Data:', data)

})

setInterval(() => {
	port.write('getData', function(err) {
	  if (err) {
	    return console.log('Error on write: ', err.message)
	  } 
	})

}, 2000)



