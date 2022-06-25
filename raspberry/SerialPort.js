const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')

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
        this.serialPort.write(msg, function(err) {
            if (err) {
                return console.log('Error on write: ', err.message)
            }
        })
    }
}

export { MySerialPort }