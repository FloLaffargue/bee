export default {
    wss: {
        ip: '152.228.214.176',
        port: 3003
    },
    serialPort1: {
        port: '/dev/ttyUSB0',
        baudRate: 9600,
        delimiter: "\r\n"
    },
    serialPort2: {
        port: '/dev/ttyACM0',
        baudRate: 57600,
        delimiter: "\r\n",
        weightCalibration: '190'
    }
}