// Serial Port

import {MySerialPort} from "./SerialPort.js";
import config from "./config.js";
import {ws} from "./ws_client.js";

let wssData = {
	humidity: 0,
	temp: 0,
	weight: 0
}

const sp1 = new MySerialPort(config.serialPort1, function (data) {
	try {
		const { temp, humidity } = JSON.parse(data)
		console.log(`Temp : ${temp} °C, Humidity : ${humidity}%`)
		wssData.temp = temp
		wssData.humidity = humidity
	} catch (e) {
		console.log(e.message)
	}
})

setInterval(() => {
	sp1.write('getData')
}, 2000)

setInterval(() => {
	console.log('Sending data ' + JSON.stringify(wssData))
	ws.send(JSON.stringify(wssData))
}, 5000)

const sp2 = new MySerialPort(config.serialPort2, function (data) {
	// console.log(data)
	try {
		const { weight } = JSON.parse(data)
		wssData.weight = weight
		console.log("Weight is " + weight / 1000 + " kgs")
	} catch (e) {
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
