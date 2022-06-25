// Serial Port

import {MySerialPort} from "./SerialPort";
import config from "./config";

const sp1 = new MySerialPort(config.serialPort1, function (data) {
	console.log(data)
	if (typeof data === 'object') {
		console.log("Temp is " + data.temp)
		console.log("Humidity is " + data.humidity)
		data = JSON.parse(data)
		// ws.send(data)
	}
})

const sp2 = new MySerialPort(config.serialPort2, function (data) {
	console.log(data)
	if (typeof data === 'object') {
		data = JSON.parse(data)
		console.log("Weight is " + data.weight / 100 + " kgs")
		// ws.send(data)
	} else {
		const serialMessages = [
			{
				value: "Send 't' from serial monitor to set the tare offset.",
				handler: () => {
					sp2.write('t')
				}
			},
			{
				value: "Then send the weight of this mass (i.e. 100.0) from serial monitor.",
				handler: () => {
					sp2.write(config.serialPort2.weightCalibration)
				}
			},
			{
				value: "Save this value to EEPROM adress 0? y/n",
				handler: () => {
					sp2.write("y")
				}
			}
		]
		const find = serialMessages.find(item => item.value === data)
		if (find) {
			find.handler()
		}
	}
})

/* lineStream.on('readable', function () {
  console.log('Data:', port.read())
}) */

/* setInterval(() => {
	port.write('getData', function(err) {
	  if (err) {
	    return console.log('Error on write: ', err.message)
	  }
	})

}, 2000) */


