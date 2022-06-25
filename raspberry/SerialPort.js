// const SerialPort = require('serialport')
import SerialPort from 'serialport'
// const Readline = require('@serialport/parser-readline')
import Readline from '@serialport/parser-readline'

class MySerialPort {

    serialPort = null

    constructor (config, onDataReceived) {

        this.serialPort = new SerialPort(config.port, {
            baudRate: config.baudRate
        })

        const lineStream = this.serialPort.pipe(new Readline({ delimiter: config.delimiter }))

        lineStream.on('data', function (data) {
            onDataReceived(data)
        })

    }

    write (msg) {
        console.log('Writing ' + msg)
        this.serialPort.write(msg, function(err) {
            if (err) {
                return console.log('Error on write: ', err.message)
            }
        })
    }
}

export { MySerialPort }